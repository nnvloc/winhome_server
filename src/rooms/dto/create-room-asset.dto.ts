import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateRoomAssetDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  roomId: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  type: number;

  @IsString()
  @IsOptional()
  fileName: string;

  @IsOptional()
  @IsString()
  fileSize: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  status: number;

  @IsOptional()
  @IsString()
  fileExtendsion: string
}
