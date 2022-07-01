import { NestFactory } from '@nestjs/core';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { CustomLogger } from './logger/logger.service';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  try {
    // This is for init the server with fastify.
    // const app = await NestFactory.create<NestFastifyApplication>(
    //   AppModule,
    //   new FastifyAdapter(),
    //   {
    //     logger: false,
    //     cors: true,
    //   }
    // );

    const app = await NestFactory.create(
      AppModule,
      {
        logger: true,
        // cors: true,
      }
    );

    app.enableCors();

    // Get the configs
    const configService = app.get(ConfigService);
    const NODE_ENV = configService.get('NODE_ENV');
    // Register exception filter as global error handler
    app.useGlobalFilters(new AllExceptionsFilter(configService));

    // Register logger with dependency injection method
    app.useLogger(app.get(CustomLogger));

    // Register validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      disableErrorMessages: false,            // If set to true, validation errors will not be returned to the client.
      whitelist: true,                        // If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
      forbidNonWhitelisted: false,            // If set to true, instead of stripping non-whitelisted properties validator will throw an exception.
      forbidUnknownValues: true,              // If set to true, attempts to validate unknown objects fail immediately.
      validationError: {
        target: NODE_ENV === 'development',   // Indicates if target should be exposed in ValidationError
        value: NODE_ENV === 'development',     // Indicates if validated value should be exposed in ValidationError
      }
    }));

    const options = new DocumentBuilder()
      .setTitle('Winhome')
      .setDescription('Winhome API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
    const PORT = configService.get('PORT') || 3000;
    await app.listen(PORT, '0.0.0.0');
  } catch(err) {
    console.log('err: ', err);
  }
}
bootstrap();
