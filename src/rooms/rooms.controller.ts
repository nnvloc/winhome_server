import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateItemDto } from './dto/update-room.dto';
import { OwnerGuard } from 'src/auth/guards/owner.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly itemsService: RoomsService) {}

  @UseGuards(OwnerGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.itemsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
