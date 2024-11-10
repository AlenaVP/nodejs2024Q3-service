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
import { ApiProperty } from '@nestjs/swagger';
import { UUID_VERSION } from '@shared/constants/uuid';

export class TrackResponseDto implements TrackBase {
  @ApiProperty({
    description: 'track ID (uuid v4)',
    example: 'fcdb3612-74fe-4d41-a645-3f107c4cd29e',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'track name',
    example: 'If You Wanna',
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
    example: 277,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
