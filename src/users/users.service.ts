import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PartialType } from '@nestjs/mapped-types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user.toJSON();
  }

  async findAll(filters: any): Promise<User[]> {
    return this.usersRepository.find(filters);
  }

  async findById(id: number) {
    return this.usersRepository.findOne({id});
  }

  findOne(filters: any): Promise<User> {
    return this.usersRepository.findOne(filters);
  }

  async update(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
