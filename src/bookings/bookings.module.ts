import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';

import { RoomsModule } from 'src/rooms/rooms.module';

import { Booking } from './entities/booking.entity';
import { BookingController } from './bookings.controller';

import { BookingsService } from './bookings.service';
import { InvoicesModule } from 'src/invoices/invoices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    StorageModule,
    forwardRef(() => RoomsModule),
    InvoicesModule,
  ],
  controllers: [BookingController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingModule {}
