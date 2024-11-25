import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [SharedModule],
  exports: [TrackService],
})
export class TrackModule {}
