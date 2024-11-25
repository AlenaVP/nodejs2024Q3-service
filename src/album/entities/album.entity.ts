import { AlbumBase } from '../album.interface';

export class Album implements AlbumBase {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
