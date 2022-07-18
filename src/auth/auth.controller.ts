import * as bcrypt from 'bcryptjs';
import { Controller, Post, Put, Body, Res} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { EmailService } from '../email/email.service';
import { EmailMessage } from '../email/email.interfaces';

import { UserRole } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('admin/login')
  async adminLogin(
    @Body() authLoginDto: AuthLoginDto
  ) {
    return this.authService.adminLogin(authLoginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const {email} = forgotPasswordDto;
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new Error('Not found!');
    }

    // Prepare resetcode
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    user.resetCode = resetCode.toString();
    await this.userService.update(user);

    // Send forgot password email
    const params = {
      receivers: user.email,
      subject: 'Forgot password',
      html: `This is your reset password code: ${resetCode}`,
    };
    const emailMessage: EmailMessage = this.emailService.prepareEmailMessage({ ...params });
    const {success, error} = await this.emailService.sendEmail(emailMessage);
    if (success) {
      return {
        success,
      }
    } else {
      return {
        success,
        error
      }
    }
  }

  @Put('reset-password')
  async resetPassword(@Body() params: ResetPasswordDto) {
    const { email, password, resetCode } = params;

    const user = await this.userService.findOne({ email });

    if (!user || user.resetCode !== resetCode ) {
      throw new Error('Unthorization!');
    }

    user.password = await bcrypt.hash(password, 8);

    const result = await this.userService.update(user);

    return result.toJSON();
  }
}
