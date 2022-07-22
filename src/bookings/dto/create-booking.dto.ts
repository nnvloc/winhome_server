import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BookingDto } from './booking.dto';

export class CreateBookingDto extends PartialType(BookingDto) {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  itemPrice: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  serviceFee?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  tax?: number;
}
