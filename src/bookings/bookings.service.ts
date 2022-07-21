import { Between, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as dayjs from 'dayjs';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Booking } from './entities/booking.entity';
import { BookingDto } from './dto/booking.dto';
import { BOOKING_STATUS } from 'src/config';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repository: Repository<Booking>,
  ) {}

  async create(bookingDto: BookingDto) {
    const createdBooking: Booking = await this.repository.create(bookingDto);
    await this.repository.save(createdBooking);
    return createdBooking;
  }

  async findAll(filter: any) : Promise<Booking[]> {
    return this.repository.find(filter);
  }

  findOne(id?: number, options?: any): Promise<Booking> {
    const defaultWhere = {
      id
    };
    let query = {...defaultWhere};
    const { where, ...opts } = options || {};
    if (where) {
      query = {
        ...defaultWhere,
        ...where,
      }
    }
    return this.repository.findOne({
      where: query,
      ...opts
    });
  }

  async update(booking: Booking): Promise<Booking> {
    return this.repository.save(booking);
  }

  async validateBooking(booking: BookingDto) {
    const { startDate, endDate } = booking;

    const existedBooking = await this.repository.findOne({
      where: [
        {
          status: BOOKING_STATUS.ACTIVE,
          startDate: Between(startDate, endDate),
        },
        {
          status: BOOKING_STATUS.ACTIVE,
          endDate: Between(startDate, endDate),
        }
      ]
    });

    if (existedBooking) {
      return {
        errors: 'This item is not available for this date',
        success: false,
      }
    }
    
    return { 
      errors: null,
      success: false,
    }
  }

  async paginate(options: IPaginationOptions, filter: any): Promise<Pagination<Booking>> {
    const relations = ['item', 'user'];
    const finalFilter = {
      relations,
      order: {
        createdAt: "DESC",
      },
      ...filter
    }
    return paginate<Booking>(this.repository, options, finalFilter);
  }
}
