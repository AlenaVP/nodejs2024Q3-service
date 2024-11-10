import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [SharedModule, AlbumModule, TrackModule],
  exports: [ArtistService],
})
export class ArtistModule {}
