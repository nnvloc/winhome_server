import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  receivers: string | string[];

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  message?: string;
}
