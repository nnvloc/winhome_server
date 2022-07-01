import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { OwnerStrategy } from './strategies/owner.strategy';
import { HeaderApiKeyStrategy } from './strategies/auth-header-api-key.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, HeaderApiKeyStrategy, OwnerStrategy],
  exports: [AuthService],
})
export class AuthModule {}
