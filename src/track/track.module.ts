import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SharedModule } from '@shared/shared.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [SharedModule, FavsModule],
  exports: [TrackService],
})
export class TrackModule {}
