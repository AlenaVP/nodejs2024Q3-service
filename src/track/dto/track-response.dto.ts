import {
  IsNotEmpty,
  IsUUID,
  IsString,
  ValidateIf,
  IsDefined,
  IsInt,
  IsPositive,
} from 'class-validator';
import { TrackBase } from '../track.interface';

export class TrackResponseDto implements TrackBase {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID('4', { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsUUID('4', { message: 'albumId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
