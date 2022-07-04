import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  rooms: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  lat: number

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  lng: number
}
