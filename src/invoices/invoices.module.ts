import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';

import { RoomsModule } from 'src/rooms/rooms.module';
import { BookingModule } from 'src/bookings/bookings.module';

import { Invoice } from './entities/invoice.entity';
import { InvoicesController } from './invoices.controller';

import { InvoicesService } from './invoices.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
