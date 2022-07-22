import { Between, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as dayjs from 'dayjs';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Invoice } from './entities/invoice.entity';
import { INVOICE_STATUS } from 'src/config';
import { Booking } from 'src/bookings/entities/booking.entity';
import { InvoiceAmountDto } from './dto/amount.dto';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private repository: Repository<Invoice>,
  ) {}

  async create(invoiceDto: InvoiceDto) {
    const cratedInvoice: Invoice = await this.repository.create(invoiceDto);
    await this.repository.save(cratedInvoice);
    return cratedInvoice;
  }

  calculateInvoice(booking: Booking, itemPrice: number = 0, serviceFee: number = 0, tax: number = 0) : InvoiceAmountDto {
    let amount = 0;
    let totalAmount = 0;
    const { startDate, endDate } = booking;
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const nights = end.diff(start, 'd');
    amount = itemPrice * nights;
    totalAmount = amount + serviceFee + tax;
    return {
      amount,
      totalAmount,
    };
  }
}
