import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomLogger } from './logger.service';

@Injectable()
@Module({
  imports: [ConfigModule],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
