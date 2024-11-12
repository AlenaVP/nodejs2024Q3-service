import { Injectable } from '@nestjs/common';
import { Database } from '@shared/db';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favs/favorites.interface';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InMemoryDbService {
  albums = new Database<Album>();
  artists = new Database<Artist>();
  tracks = new Database<Track>();
  users = new Database<User>();
  favAlbums = new Set<string>();
  favArtists = new Set<string>();
  favTracks = new Set<string>();
  private static instance: InMemoryDbService;

  constructor() {
    if (!!InMemoryDbService.instance) {
      return InMemoryDbService.instance;
    }

    InMemoryDbService.instance = this;

    return this;
  }

  getFavorites(): Favorites {
    const albums = [...this.favAlbums.values()];
    const artists = [...this.favArtists.values()];
    const tracks = [...this.favTracks.values()];

    return {
      albums,
      artists,
      tracks,
    };
  }
}
