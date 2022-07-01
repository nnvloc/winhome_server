import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  baseUrl: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  note?: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  level?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
