import { Module } from '@nestjs/common';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService, UuidService],
  exports: [AlbumService],
})
export class AlbumModule {}
