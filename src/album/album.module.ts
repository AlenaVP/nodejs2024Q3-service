import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [SharedModule],
  exports: [AlbumService],
})
export class AlbumModule {}
