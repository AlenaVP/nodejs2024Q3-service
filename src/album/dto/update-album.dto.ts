import { PartialType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { AlbumBase } from '../album.interface';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto
  extends PartialType(CreateAlbumDto)
  implements Omit<AlbumBase, 'id'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  year: number;

  @IsUUID('4', { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
