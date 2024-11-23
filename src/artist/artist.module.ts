import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [SharedModule],
  exports: [ArtistService],
})
export class ArtistModule {}
