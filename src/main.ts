import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@shared/filters/global-exception/global-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? process.env.PORT;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription(
      'Home Library Service: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(port);
}
bootstrap();
