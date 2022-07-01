import {
  IsEmail,
  IsNotEmpty,
  IsString
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  phoneCode: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  dob: Date;

  @ApiProperty({
    type: String,
  })
  email: string

  @ApiProperty({
    type: Boolean,
  })
  isActive?: boolean = true;

  @ApiProperty({
    type: String,
  })
  role?: string = UserRole.USER;
}
