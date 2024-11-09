import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PORT } from '@shared/constants/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? PORT;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);
}
bootstrap();
