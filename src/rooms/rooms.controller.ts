import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles, Req, Put, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Room } from './entities/rooms.entity';
import { RoomAssetsService } from './room-assets.service';
import { RoomAssets } from './entities/room_assets.entity';
import { StorageService } from 'src/storage/storage.service';
import { ROOM_ASSETS_STATUS, ROOM_STATUS } from 'src/config';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomService: RoomsService,
    private readonly roomAssetsService: RoomAssetsService,
    private readonly storageService: StorageService,
  ) {}

  @UseGuards(JwtAuthGuard)
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
      this.createRoomAssets(images, createdRoom);
    }

    return {
      room: createdRoom,
    }
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status', new DefaultValuePipe(ROOM_ASSETS_STATUS.ACTIVE), ParseIntPipe) status: number = ROOM_STATUS.ACTIVE,
  ) {
    return this.roomService.paginate(
      {
        page,
        limit,
      },
      {
        where: {
          status: status,
        }
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-rooms')
  async getMyRooms(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('status', new DefaultValuePipe(ROOM_ASSETS_STATUS.ACTIVE), ParseIntPipe) status: number = ROOM_STATUS.ACTIVE,
  ) {
    const { user } = req;
    return this.roomService.paginate(
      {
        page,
        limit,
      },
      {
        where: {
          status: status,
          userId: user.id
        }
      }
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
    @Request() req,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const { user } = req;
    const room = await this.roomService.findOne(id);
    if (!room || room.userId !== user.id) {
      throw new Error('Not found.');
    }

    const updatedRoom: Room = {
      ...room,
      ...updateRoomDto,
    }

    if (images) {
      this.createRoomAssets(images, updatedRoom);
    }

    await this.roomService.update(updatedRoom);

    return {
      room: updatedRoom,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/assets/:assetsId')
  async deleteAsset(
    @Param('id') id: number,
    @Param('assetsId') assetsId: number,
    @Request() req,
  ) {
    const { user } = req;

    const room = await this.roomService.findOne(id, {where: { userId: user.id }});
    if (!room) {
      throw new Error('Not found.');
    }

    const asset = await this.roomAssetsService.findOne(assetsId, { where: { roomId: room.id } });
    if (!asset) {
      throw new Error('Not found.');
    }

    // Remove file from storage
    const removedFile = await this.storageService.deleteObject({
      key: `rooms/${asset.fileName}`
    });

    await this.roomAssetsService.delete(asset.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Request() req,
  ) {
    const { user } = req;
    const room = await this.roomService.findOne(id, { where: { userId: user.id } });
    if (!room) {
      throw new Error('Not found.');
    }
    room.status = ROOM_STATUS.DISABLED;
    // return this.roomService.remove(+id);
    return await this.roomService.update(room);
  }

  async createRoomAssets(images: Array<Express.Multer.File>, room: Room) : Promise<RoomAssets[]> {
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
      asset.roomId = room.id;

      return asset;
    });

    const roomAssets: RoomAssets[] = await Promise.all(roomAssetsPromises);
    const assets = await this.roomAssetsService.bulkCreate(roomAssets);
    return assets;
  }
}
