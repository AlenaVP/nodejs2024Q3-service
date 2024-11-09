import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { ArtistBase } from '../artist.interface';

export class CreateArtistDto implements Omit<ArtistBase, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
