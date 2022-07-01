import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';

import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const newSetting = await this.settingsRepository.create(createSettingDto);
    return this.settingsRepository.save(newSetting);
  }

  async findAll(filters: any): Promise<Setting[]> {
    const defaultFilter = {
      isActive: true,
    }
    return this.settingsRepository.find({...defaultFilter, ...filters});
  }

  async findOne(filters: any): Promise<Setting> {
    return this.settingsRepository.findOne(filters);
  }

  async update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting> {
    return this.settingsRepository.save({
      id,
      ...updateSettingDto
    });
  }

  async remove(id: number): Promise<Setting> {
    return this.settingsRepository.save({
      id,
      isActive: false,
    });
  }
}
