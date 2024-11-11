import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from '@shared/constants/uuid';
import { CreateTrackDto } from './create-track.dto';
import { TrackBase } from '../track.interface';

export class UpdateTrackDto
  extends PartialType(CreateTrackDto)
  implements Omit<TrackBase, 'id'>
{
  @ApiProperty({
    description: 'track name',
    example: 'Flaming Pie',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the artist who created this track (or null)',
    example: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
  })
  @IsUUID(UUID_VERSION, { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album this track belongs to (or null)',
    example: 'd95faac5-4418-4c92-8381-c2fba34504d1',
  })
  @IsUUID(UUID_VERSION, { message: 'albumId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @ApiProperty({
    description: 'track duration in seconds',
    example: 150,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
