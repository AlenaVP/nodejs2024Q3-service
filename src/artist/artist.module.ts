import { Module } from '@nestjs/common';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, AlbumService, UuidService],
  exports: [ArtistService],
})
export class ArtistModule {}
