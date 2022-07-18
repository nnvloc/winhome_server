import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';

import { RoomsModule } from 'src/rooms/rooms.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    StorageModule,
    RoomsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
