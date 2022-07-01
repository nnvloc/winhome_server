import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsNumberString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  parentCategoryId: Number;

  @IsOptional()
  image: String;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  status: Number | String;
}
