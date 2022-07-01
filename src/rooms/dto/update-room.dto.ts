import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateItemDto extends PartialType(CreateRoomDto) {}
