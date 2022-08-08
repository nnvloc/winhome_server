import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';

import { Room } from './entities/rooms.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomAssetsService } from './room-assets.service';
import { RoomAssets } from './entities/room_assets.entity';
import { BookingModule } from 'src/bookings/bookings.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RoomAssets]),
    StorageModule,
    UsersModule,
    forwardRef(() => BookingModule),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomAssetsService],
  exports: [RoomsService, RoomAssetsService],
})
export class RoomsModule {}
