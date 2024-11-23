import { ApiProperty } from '@nestjs/swagger';
import { UUID_VERSION } from '@shared/constants/uuid';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsDefined,
  IsInt,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { AlbumBase } from '../album.interface';

export class AlbumResponseDto implements AlbumBase {
  @ApiProperty({
    description: 'album ID (uuid v4)',
    example: 'd95faac5-4418-4c92-8381-c2fba34504d1',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'album name',
    example: 'Flaming Pie',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'album year',
    example: 1997,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  year: number;

  @ApiProperty({
    description: 'ID of the artist who created this album (or null)',
    example: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
  })
  @IsUUID(UUID_VERSION, { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
