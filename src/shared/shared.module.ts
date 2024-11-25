import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggingService } from './services/custom-logger/custom-logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PrismaService, LoggingService],
  imports: [ConfigModule],
  exports: [PrismaService, LoggingService],
})
export class SharedModule {}
