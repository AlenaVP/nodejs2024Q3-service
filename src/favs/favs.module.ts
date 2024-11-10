import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [SharedModule],
  exports: [FavsService],
})
export class FavsModule {}
