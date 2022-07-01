import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    const test = {}['abc']['xyz'];
    return 'Hello NestJs!';
  }
}
