import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';
import { InMemoryDbService } from '@shared/service/in-memory-db/in-memory-db.service';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly trackService: TrackService,
    private readonly uuidService: UuidService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    if (
      createAlbumDto.artistId &&
      !this.inMemoryDbService.artists.has(createAlbumDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    const newAlbum: Album = {
      ...createAlbumDto,
      id: this.uuidService.generate(),
    };
    this.inMemoryDbService.albums.add(newAlbum.id, newAlbum);

    return plainToClass(Album, newAlbum);
  }

  findAll(): Album[] {
    const albums = this.inMemoryDbService.albums.findAll();

    return albums.map((album) => plainToClass(Album, album));
  }

  findOne(id: string): Album | null {
    const album = this.inMemoryDbService.albums.findOne(id);

    if (!album) {
      return null;
    }

    return plainToClass(Album, album);
  }

  updateInfo(id: string, updateAlbumDto: UpdateAlbumDto): Album | null {
    if (
      updateAlbumDto.artistId &&
      !this.inMemoryDbService.artists.has(updateAlbumDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    const album = this.inMemoryDbService.albums.findOne(id);

    if (!album) {
      return null;
    }

    const updatedAlbum: Album = {
      ...album,
      ...updateAlbumDto,
    };

    this.inMemoryDbService.albums.add(album.id, updatedAlbum);

    return plainToClass(Album, updatedAlbum);
  }

  remove(id: string): boolean {
    if (this.inMemoryDbService.albums.has(id)) {
      this.trackService.handleAlbumRemoval(id);

      return this.inMemoryDbService.albums.delete(id);
    }

    return false;
  }

  handleArtistRemoval(id: string): void {
    this.inMemoryDbService.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
