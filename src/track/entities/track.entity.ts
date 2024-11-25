import { TrackBase } from '../track.interface';

export class Track implements TrackBase {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
