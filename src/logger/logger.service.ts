import * as winston from 'winston';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

winston.addColors({
  info: 'green',
  error: 'red',
  warn: 'yellow',
});

export class CustomLogger implements LoggerService {
  private logger;

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        )}),
      ]
    });
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}
