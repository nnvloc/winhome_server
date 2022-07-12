import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    const createdRoom: Room = await this.roomsRepository.create(createRoomDto);
    await this.roomsRepository.save(createdRoom);
    return createdRoom;
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number, options?: any): Promise<Room> {
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
    return this.roomsRepository.findOne({
      where: query,
      ...opts
    });
  }

  async update(room: Room): Promise<Room> {
    // return `This action updates a #${id} item`;
    return this.roomsRepository.save(room);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
