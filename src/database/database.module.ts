import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from '../users/entities/user.entity';
import { Room } from '../rooms/entities/rooms.entity';

import Subscribers from '../subscribers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get('database.url');
        // Caution: Do not use extra ssl for production
        const extraOpts = JSON.parse(configService.get('database.extra'));
        if (dbUrl) {
          return Object.assign({
            type: 'postgres',
            url: dbUrl,
            autoLoadEntities: true,
            logging: ["query", "error"],
            subscribers: Object.values(Subscribers),
            synchronize: configService.get('database.synchronize'),
            ssl: true,
          }, extraOpts);
        }

        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: +configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          autoLoadEntities: true,
          logging: ["query", "error"],
          synchronize: configService.get('database.synchronize'),
          subscribers: Object.values(Subscribers),
        } 
      },
    }),
  ]
})

export class DatabaseModule {}
