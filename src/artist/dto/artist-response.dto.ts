import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ArtistBase } from '../artist.interface';

export class ArtistResponseDto implements ArtistBase {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
