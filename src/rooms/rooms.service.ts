import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/rooms.entity';
import { ROOM_ASSETS_STATUS } from 'src/config';

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

  async findAll(filter: any) : Promise<Room[]> {
    return this.roomsRepository.find(filter);
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
    console.log('query: ', query);
    console.log('...opts: ', opts);
    return this.roomsRepository.findOne({
      where: query,
      ...opts
    });
  }

  async update(room: Room): Promise<Room> {
    return this.roomsRepository.save(room);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  async paginate(options: IPaginationOptions, filter: any): Promise<Pagination<Room>> {
    const relations = ['assets'];
    const finalFilter = {
      relations,
      order: {
        priorityAt: "DESC",
        createdAt: "DESC",
      },
      ...filter
    }
    return paginate<Room>(this.roomsRepository, options, finalFilter);
  }
}
