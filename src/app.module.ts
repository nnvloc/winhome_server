import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config';
import { DatabaseModule } from './database/database.module';

import { CustomLoggerModule } from './logger/logger.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module';
import { StorageModule } from './storage/storage.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CustomLoggerModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    SettingsModule,
    EmailModule,
    // StorageModule,
    NotificationModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
