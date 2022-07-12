import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { RoomAssets } from './entities/room_assets.entity';
import { Room } from './entities/rooms.entity';

@Injectable()
export class RoomAssetsService {
  constructor(
    @InjectRepository(RoomAssets)
    private roomAssetsRepository: Repository<RoomAssets>,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    // const createdRoom: Room = await this.roomAssetsRepository.create(createRoomDto);
    // await this.roomAssetsRepository.save(createdRoom);
    // return createdRoom;
  }

  async bulkCreate(data: RoomAssets[]) {
    const createdAssets = await this.roomAssetsRepository.create(data);
    await this.roomAssetsRepository.save(createdAssets);
    return createdAssets;
  }

  async uploadRoomAsset(file: File, room: Room, path: string = 'rooms' ) {
    if (!room || !room.id) {
      return;
    }

    const { id } = room || {};

  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number, options?: any) {
    const defaultWhere = {
      id,
    }
    let query = { ...defaultWhere };
    const { where, ...opts } = options || {};
    if (options && options.where) {
      query = {
        ...defaultWhere,
        ...where,
      }
    }

    return this.roomAssetsRepository.findOne({
      where: query,
      ...opts,
    });

  }

  delete(id: number) {
    return this.roomAssetsRepository.delete(id);
  }
}
