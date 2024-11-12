import { ArtistBase } from '../artist.interface';

export class Artist implements ArtistBase {
  id: string;
  name: string;
  grammy: boolean;
}
