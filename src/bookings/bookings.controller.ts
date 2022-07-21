import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles, Req, Put, Query, DefaultValuePipe, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Between } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StorageService } from 'src/storage/storage.service';
import { BOOKING_STATUS } from 'src/config';
import { BookingDto } from './dto/booking.dto';
import { Booking } from './entities/booking.entity';
import { RoomsService } from 'src/rooms/rooms.service';



@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingsService,
    private readonly storageService: StorageService,
    private readonly roomsService: RoomsService
  ) {}

  @Get()
  async find(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status') status?: number,
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

    const bookings = await this.bookingService.paginate(
      {
        page,
        limit,
      },
      {
        where: filters
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
    const bookings = await this.bookingService.paginate(
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
    const bookings = await this.bookingService.paginate(
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
    @Body() bookingDto: BookingDto,
    @Request() req,
    ) {
    const { user } = req;
    bookingDto.userId = user.id;

    const room = await this.roomsService.findOne(bookingDto.itemId);
    if (!room) {
      throw new NotFoundException();
    }

    const { errors, success } = await this.bookingService.validateBooking(bookingDto);
    if (!success) {
      throw new BadRequestException(errors);
    }

    bookingDto.itemOwnerId = room.userId;
    bookingDto.amount = 0;
    bookingDto.totalAmount = 0;
    bookingDto.tax = 0;

    const createdBooking: Booking = await this.bookingService.create(bookingDto);

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

    const booking = await this.bookingService.findOne(id);
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
    const booking = await this.bookingService.findOne(id, {
      relations: ['user', 'item']
    });

    if (!booking || (booking.userId != user.id && booking.itemOwnerId !== user.id)) {
      throw new NotFoundException();
    }

    return booking;
  }
}
