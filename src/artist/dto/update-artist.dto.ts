import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ArtistBase } from '../artist.interface';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto
  extends PartialType(CreateArtistDto)
  implements Omit<ArtistBase, 'id'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
