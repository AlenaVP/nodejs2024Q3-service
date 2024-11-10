import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackBase } from './track.interface';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private trackDb = new Map<string, TrackBase>();
  static instance: TrackService;

  constructor(private readonly uuidService: UuidService) {
    if (!!TrackService.instance) {
      return TrackService.instance;
    }

    TrackService.instance = this;

    return this;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      ...createTrackDto,
      id: this.uuidService.generate(),
    };
    this.trackDb.set(newTrack.id, newTrack);

    return plainToClass(Track, newTrack);
  }

  findAll(): Track[] {
    return [...this.trackDb.values()].map((track) =>
      plainToClass(Track, track),
    );
  }

  findOne(id: string): Track | null {
    const track = this.trackDb.get(id);

    if (!track) {
      return null;
    }

    return plainToClass(Track, track);
  }

  updateInfo(id: string, updateTrackDto: UpdateTrackDto): Track | null {
    const track = this.trackDb.get(id);

    if (!track) {
      return null;
    }

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.trackDb.set(track.id, updatedTrack);

    return plainToClass(Track, updatedTrack);
  }

  remove(id: string): boolean {
    if (this.trackDb.has(id)) {
      this.trackDb.delete(id);
      return true;
    }

    return false;
  }

  cleanupWithAlbumDeletion(albumId: string): void {
    this.trackDb.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  cleanupWithArtistDeletion(artistId: string): void {
    this.trackDb.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}
