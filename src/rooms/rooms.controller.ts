import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateItemDto } from './dto/update-room.dto';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Room } from './entities/rooms.entity';
import { RoomAssetsService } from './room-assets.service';
import { RoomAssets } from './entities/room_assets.entity';
import { StorageService } from 'src/storage/storage.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomService: RoomsService,
    private readonly roomAssetsService: RoomAssetsService,
    private readonly storageService: StorageService,
  ) {}

  @UseGuards(OwnerGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @Request() req,
    @UploadedFiles() images: Array<Express.Multer.File>,
    ) {
    const {user} = req;
    createRoomDto.userId = user.id;

    const createdRoom: Room = await this.roomService.create(createRoomDto);

    if (images) {
      const roomAssetsPromises: Promise<RoomAssets>[] = images.map(async (img) => {
        const {
          buffer,
          originalname,
          filename,
          size,
          mimetype
        } = img;

        const asset: RoomAssets = new RoomAssets();
        asset.fileName = originalname;
        asset.fileSize = size;

        const filePath = `rooms/${originalname}`;
        const [_, extendsion] = originalname.split('.');
        const params = this.storageService.prepareParams({
          body: buffer,
          key: filePath,
        });

        const uploadedFile = await this.storageService.upload(params);
        const fileUrl = this.storageService.preparePublicURL({
          key: originalname,
          group: 'rooms',
        });

        asset.url = fileUrl;
        asset.fileExtendsion = extendsion;
        asset.roomId = createdRoom.id;

        return asset;
      });

      const roomAssets: RoomAssets[] = await Promise.all(roomAssetsPromises);

      createdRoom.assets = await this.roomAssetsService.bulkCreate(roomAssets);
    }

    return {
      room: createdRoom,
    }
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.roomService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
