import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [ConfigModule],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
