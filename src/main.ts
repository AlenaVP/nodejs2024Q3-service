import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@shared/filters/global-exception/global-exception.filter';
import { EnvironmentVariables } from '@shared/interfaces/env-config';
import { LoggingService } from '@shared/services/custom-logger/custom-logger.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(LoggingService);
  app.useLogger(logger);
  app.enableCors();
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const port = +configService.get('PORT', { infer: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription(
      'Home Library Service: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md',
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${JSON.stringify(err)}`);
  });

  process.on('uncaughtException', (err) => {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    logger.error(`Uncaught Exception: ${message}`);
  });

  await app.listen(port);
}
bootstrap();
