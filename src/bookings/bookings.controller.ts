import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles, Req, Put, Query, DefaultValuePipe, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Between } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

import {
  Pagination,
} from 'nestjs-typeorm-paginate';

import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StorageService } from 'src/storage/storage.service';
import { BOOKING_STATUS } from 'src/config';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingDto } from './dto/booking.dto';
import { InvoicesService } from 'src/invoices/invoices.service';
import { InvoiceDto } from 'src/invoices/dto/invoice.dto';
import { InvoiceAmountDto } from 'src/invoices/dto/amount.dto';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Room } from 'src/rooms/entities/rooms.entity';


@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingsService,
    private readonly storageService: StorageService,
    private readonly roomsService: RoomsService,
    private readonly invoicesService: InvoicesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/blocks')
  async find(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status', new DefaultValuePipe(BOOKING_STATUS.ACTIVE), ParseIntPipe) status: number = BOOKING_STATUS.ACTIVE,
    @Query('itemId') itemId?: number,
  ) {
    const start = dayjs(startDate).startOf('month');
    const end = dayjs(endDate || startDate).endOf('month');

    const filters: any = [
      {
        startDate: Between(start, end),
      },
      {
        endDate: Between(start, end),
      }
    ]
    if (status && status > 0) {
      filters[0].status = status;
      filters[1].status = status;
    }

    if (itemId && itemId > 0) {
      filters[0].itemId = itemId;
      filters[1].itemId = itemId;
    }

    const bookings : Booking[] = await this.bookingService.findAll(
      {
        where: filters,
        select: ['startDate', 'endDate'],
      }
    )

    return bookings;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-bookings')
  async getMyBookings(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status') status?: number,
  ) {
    const { user } = req;
    const filters: any = {};
    if (status && status > 0) {
      filters.status = status;
    }
    const bookings : Pagination<Booking> = await this.bookingService.paginate(
      {
        page,
        limit,
      },
      {
        where: {
          userId: user.id,
          ...filters
        },
      }
    )

    return bookings;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-reservations')
  async getMyReservations(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status') status?: number,
  ) {
    const { user } = req;
    const filters: any = {};
    if (status && status > 0) {
      filters.status = status;
    }
    const bookings : Pagination<Booking> = await this.bookingService.paginate(
      {
        page,
        limit,
      },
      {
        where: {
          itemOwnerId: user.id,
          ...filters
        },
      }
    )

    return bookings;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
    ) {
    const { user } = req;
    const {
      itemId,
      startDate,
      endDate,
      numberOfGuests,
      itemPrice,
      serviceFee,
      tax,
      note,
      description,
    } = createBookingDto;

    const room : Room = await this.roomsService.findOne(itemId);
    if (!room) {
      throw new NotFoundException();
    }

    const newBooking: BookingDto = {
      userId: user.id,
      itemId,
      itemOwnerId: room.userId,
      startDate,
      endDate,
      numberOfGuests,
      note,
      description,
    }

    const { errors, success } = await this.bookingService.validateBooking(newBooking);
    if (!success) {
      throw new BadRequestException(errors);
    }

    const createdBooking: Booking = await this.bookingService.create(newBooking);

    const { amount, totalAmount } : InvoiceAmountDto = this.invoicesService.calculateInvoice(createdBooking, itemPrice, serviceFee, tax);

    const newInvoice: InvoiceDto = {
      userId: user.id,
      itemId,
      itemOwnerId: room.userId,
      bookingId: createdBooking.id,
      itemPrice,
      serviceFee,
      tax,
      amount,
      totalAmount
    }

    const invoice : Invoice = await this.invoicesService.create(newInvoice);
    createdBooking.invoice = invoice;

    return {
      booking: createdBooking,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/change-status')
  async changeBookingStatus (
    @Param('id') id: number,
    @Request() req,
  ) {
    const { user } = req;
    const { status } = req.body;

    if (!status) {
      throw new BadRequestException('Missing params');
    }

    const booking : Booking = await this.bookingService.findOne(id);
    if (!booking || booking.itemOwnerId !== user.id) {
      throw new NotFoundException()
    }

    booking.status = status;
    return await this.bookingService.update(booking);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBooking(
    @Param('id') id: number,
    @Request() req,
  ) {
    const { user } = req;
    const booking : Booking = await this.bookingService.findOne(id, {
      relations: ['user', 'item', 'invoice']
    });

    if (!booking || (booking.userId != user.id && booking.itemOwnerId !== user.id)) {
      throw new NotFoundException();
    }

    return booking;
  }
}
