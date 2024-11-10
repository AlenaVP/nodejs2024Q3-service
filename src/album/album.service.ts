import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private albumDb = new Map<string, Album>();
  static instance: AlbumService;

  constructor(private readonly uuidService: UuidService) {
    if (!!AlbumService.instance) {
      return AlbumService.instance;
    }

    AlbumService.instance = this;

    return this;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      ...createAlbumDto,
      id: this.uuidService.generate(),
    };
    this.albumDb.set(newAlbum.id, newAlbum);

    return plainToClass(Album, newAlbum);
  }

  findAll(): Album[] {
    return [...this.albumDb.values()].map((album) =>
      plainToClass(Album, album),
    );
  }

  findOne(id: string): Album | null {
    const album = this.albumDb.get(id);

    if (!album) {
      return null;
    }

    return plainToClass(Album, album);
  }

  updateInfo(id: string, updateAlbumDto: UpdateAlbumDto): Album | null {
    const album = this.albumDb.get(id);

    if (!album) {
      return null;
    }

    const updatedAlbum: Album = {
      ...album,
      ...updateAlbumDto,
    };

    this.albumDb.set(album.id, updatedAlbum);

    return plainToClass(Album, updatedAlbum);
  }

  remove(id: string): boolean {
    if (this.albumDb.has(id)) {
      this.albumDb.delete(id);
      return true;
    }

    return false;
  }

  cleanupWithArtistDeletion(artistId: string): void {
    this.albumDb.forEach((album) => {
      console.log(`album id: ${album.id}`);
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
