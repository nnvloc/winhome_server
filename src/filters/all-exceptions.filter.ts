import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private NODE_ENV: string;
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private configService: ConfigService) {
    this.NODE_ENV = this.configService.get('NODE_ENV');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (this.NODE_ENV === 'development') {
      console.log(exception);
    }

    const message = exception.message;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(message);

    const responseData = exception.getResponse
      ? exception.getResponse()
      : {
        statusCode: status,
        message,
      };

    response.status(status).send(responseData);
  }
}
