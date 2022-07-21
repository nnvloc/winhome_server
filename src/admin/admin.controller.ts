import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles, Req, Put, Query, DefaultValuePipe, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Room } from 'src/rooms/entities/rooms.entity';
import { RoomAssetsService } from 'src/rooms/room-assets.service';
import { StorageService } from 'src/storage/storage.service';
import { ROOM_ASSETS_STATUS, ROOM_STATUS } from 'src/config';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly roomService: RoomsService,
    private readonly roomAssetsService: RoomAssetsService,
    private readonly storageService: StorageService,
  ) {}

  @UseGuards(AdminGuard)
  @Get('rooms')
  async getRooms(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status') status?: number,
  ) {
    let filter: any = {}
    if (status && status > 0) {
      filter.status= status
    }

    return this.roomService.paginate(
      {
        page,
        limit,
      },
      {
        where: {
          ...filter
        }
      }
    );
  }

  @UseGuards(AdminGuard)
  @Put('rooms/:id/approve')
  async approveRoom(
    @Param('id') id: number,
  ) {
    const room = await this.roomService.findOne(id);
    if (!room) {
      throw new NotFoundException()
    }

    room.status = ROOM_STATUS.ACTIVE;
    return await this.roomService.update(room);
  }

  @UseGuards(AdminGuard)
  @Put('rooms/:id/status')
  async changeRoomStatus (
    @Param('id') id: number,
    @Request() req,
  ) {
    const { status } = req.body;
    if (!status) {
      throw new BadRequestException('Missing params');
    }

    const room = await this.roomService.findOne(id);
    if (!room) {
      throw new NotFoundException()
    }

    room.status = status;
    return await this.roomService.update(room);
  }
}
