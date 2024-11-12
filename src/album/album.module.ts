import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [SharedModule, TrackModule, FavsModule],
  exports: [AlbumService],
})
export class AlbumModule {}
