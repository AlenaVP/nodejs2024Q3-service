import { Module } from '@nestjs/common';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, UuidService],
  exports: [TrackService],
})
export class TrackModule {}
