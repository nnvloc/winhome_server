import {
  IsEmail,
  IsNotEmpty,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phoneCode: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  dob: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  isActive?: boolean = true;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  role?: string = UserRole.USER;
}
