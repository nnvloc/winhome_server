import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

import { CreateSettingDto } from './create-setting.dto';


export class UpdateSettingDto extends PartialType(CreateSettingDto) {}
