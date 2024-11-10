import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';
import { InMemoryDbService } from '@shared/service/in-memory-db/in-memory-db.service';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly favsService: FavsService,
    private readonly uuidService: UuidService,
  ) {}

  create(createTrackDto: CreateTrackDto): Track {
    if (
      createTrackDto.artistId &&
      !this.inMemoryDbService.artists.has(createTrackDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    if (
      createTrackDto.albumId &&
      !this.inMemoryDbService.albums.has(createTrackDto.albumId)
    ) {
      throw new UnknownIdException('albumId');
    }

    const newTrack: Track = {
      ...createTrackDto,
      id: this.uuidService.generate(),
    };
    this.inMemoryDbService.tracks.add(newTrack.id, newTrack);

    return plainToClass(Track, newTrack);
  }

  findAll(): Track[] {
    const tracks = this.inMemoryDbService.tracks.findAll();

    return tracks.map((track) => plainToClass(Track, track));
  }

  findOne(id: string): Track | null {
    const track = this.inMemoryDbService.tracks.findOne(id);

    if (!track) {
      return null;
    }

    return plainToClass(Track, track);
  }

  findMany(ids: string[]): Track[] {
    const tracks = this.inMemoryDbService.tracks.findMany(ids);

    return tracks.map((track) => plainToClass(Track, track));
  }

  isExists(id: string): boolean {
    return this.inMemoryDbService.tracks.has(id);
  }

  updateInfo(id: string, updateTrackDto: UpdateTrackDto): Track | null {
    if (
      updateTrackDto.artistId &&
      !this.inMemoryDbService.artists.has(updateTrackDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    if (
      updateTrackDto.albumId &&
      !this.inMemoryDbService.albums.has(updateTrackDto.albumId)
    ) {
      throw new UnknownIdException('albumId');
    }

    const track = this.inMemoryDbService.tracks.findOne(id);

    if (!track) {
      return null;
    }

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.inMemoryDbService.tracks.add(track.id, updatedTrack);

    return plainToClass(Track, updatedTrack);
  }

  remove(id: string): boolean {
    this.favsService.removeTrack(id);

    return this.inMemoryDbService.tracks.delete(id);
  }

  handleAlbumRemoval(id: string): void {
    this.inMemoryDbService.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  handleArtistRemoval(id: string): void {
    this.inMemoryDbService.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }
}
