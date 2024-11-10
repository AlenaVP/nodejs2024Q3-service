import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  private artistDb = new Map<string, Artist>();
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly uuidService: UuidService,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      ...createArtistDto,
      id: this.uuidService.generate(),
    };
    this.artistDb.set(newArtist.id, newArtist);

    return plainToClass(Artist, newArtist);
  }

  findAll(): Artist[] {
    return [...this.artistDb.values()].map((artist) =>
      plainToClass(Artist, artist),
    );
  }

  findOne(id: string): Artist | null {
    const artist = this.artistDb.get(id);

    if (!artist) {
      return null;
    }

    return plainToClass(Artist, artist);
  }

  updateInfo(id: string, updateArtistDto: UpdateArtistDto): Artist | null {
    const artist = this.artistDb.get(id);

    if (!artist) {
      return null;
    }

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.artistDb.set(artist.id, updatedArtist);

    return plainToClass(Artist, updatedArtist);
  }

  remove(id: string): boolean {
    if (this.artistDb.has(id)) {
      this.artistDb.delete(id);
      this.albumService.cleanupWithArtistDeletion(id);
      this.trackService.cleanupWithArtistDeletion(id);
      return true;
    }

    return false;
  }
}
