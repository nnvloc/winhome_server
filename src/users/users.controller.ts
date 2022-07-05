import { Controller, Get, Post, Put, Body, Patch, Param, Delete, Logger, Res, UseGuards, UseInterceptors, Request, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import {FileInterceptor}  from '@nestjs/platform-express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

import { UsersService } from './users.service';
import { StorageService } from 'src/storage/storage.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  async findAll(
    @Res() res
  ): Promise<void> {
    const users = await this.usersService.findAll(null);
    res.json({
      success: true,
      users: users.map(item => item.toJSON()),
    });
  }

  // User profile
  @ApiOkResponse({
    description: "Get user's profile succesfully.",
    type: UserResponseDto
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const {user} = req;
    return user.toJSON();
  }
  // End User profile

  // Update user profile
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const {user} = req;
    const {
      buffer,
      originalname,
      filename,
      size,
      mimetype
    } = file;
    const params = this.storageService.prepareParams({
      body: buffer,
      key: originalname,
    });

    await this.storageService.upload(params);
    const fileURL = this.storageService.preparePublicURL({key: originalname});
    return {
      success: true,
      user: {
        ...user.toJSON(),
        avatar: fileURL,
      }
    };
  }
  
  // End Update user profile

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
