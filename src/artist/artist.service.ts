import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InMemoryDbService } from '@shared/service/in-memory-db/in-memory-db.service';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly trackService: TrackService,
    private readonly uuidService: UuidService,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      ...createArtistDto,
      id: this.uuidService.generate(),
    };
    this.inMemoryDbService.artists.add(newArtist.id, newArtist);

    return plainToClass(Artist, newArtist);
  }

  findAll(): Artist[] {
    const artists = this.inMemoryDbService.artists.findAll();

    return artists.map((artist) => plainToClass(Artist, artist));
  }

  findOne(id: string): Artist | null {
    const artist = this.inMemoryDbService.artists.findOne(id);

    if (!artist) {
      return null;
    }

    return plainToClass(Artist, artist);
  }

  updateInfo(id: string, updateArtistDto: UpdateArtistDto): Artist | null {
    const artist = this.inMemoryDbService.artists.findOne(id);

    if (!artist) {
      return null;
    }

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.inMemoryDbService.artists.add(artist.id, updatedArtist);

    return plainToClass(Artist, updatedArtist);
  }

  remove(id: string): boolean {
    if (this.inMemoryDbService.artists.has(id)) {
      this.albumService.handleArtistRemoval(id);
      this.trackService.handleArtistRemoval(id);

      return this.inMemoryDbService.artists.delete(id);
    }

    return false;
  }
}
