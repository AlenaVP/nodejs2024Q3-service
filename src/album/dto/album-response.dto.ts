import { AlbumBase } from '../album.interface';

export class AlbumResponseDto implements AlbumBase {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
