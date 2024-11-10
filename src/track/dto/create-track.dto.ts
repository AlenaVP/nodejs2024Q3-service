import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { TrackBase } from '../track.interface';

export class CreateTrackDto implements Omit<TrackBase, 'id'> {
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