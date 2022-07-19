import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RoomFilterDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  price?: any;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  rooms?: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  building?: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  status?: number;
}
