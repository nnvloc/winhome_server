import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';

import { HTTPAPIKeyAuthGuard } from '../auth/guards/auth-header-api-key.guard';

import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

import { Setting } from './entities/setting.entity';

@ApiTags('settings')
@Controller('settings')
@UseGuards(HTTPAPIKeyAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOkResponse({
    description: "Created setting.",
    type: Setting
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {
    const name: string = createSettingDto.name;
    const existedSetting: Setting = await this.settingsService.findOne({name});

    if (existedSetting) {
      throw new BadRequestException('Setting existed');
    }

    const createdSetting = await this.settingsService.create(createSettingDto);
    return {
      setting: createdSetting,
    }
  }

  @Get()
  async findAll() {
    const settings: Setting[] = await this.settingsService.findAll(null);
    return {
      settings,
    }
  }

  @ApiOkResponse({
    description: "Founded setting.",
    type: Setting
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const setting = await this.settingsService.findOne({id});
    return {
      setting,
    }
  }

  @ApiOkResponse({
    description: "Created setting.",
    type: Setting
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    const existedSetting = await this.settingsService.findOne({id});
    if (!existedSetting) {
      throw new NotFoundException('Not found!');
    }
    const updatedSetting =  await this.settingsService.update(+id, updateSettingDto);
    return {
      setting: updatedSetting,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existedSetting = await this.settingsService.findOne({id});
    if (!existedSetting) {
      throw new NotFoundException('Not found!');
    }

    await this.settingsService.remove(+id);
    return {
      success: true,
    }
  }
}
