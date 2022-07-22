import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class InvoiceDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  userId: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  itemId: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  itemOwnerId?: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  bookingId: number;

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

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  amount: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  totalAmount: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  status?: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
