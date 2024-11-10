import { Module } from '@nestjs/common';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, AlbumService, TrackService, UuidService],
  exports: [ArtistService],
})
export class ArtistModule {}
