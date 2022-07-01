import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
