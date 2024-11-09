import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService, UuidService],
})
export class AppModule {}
