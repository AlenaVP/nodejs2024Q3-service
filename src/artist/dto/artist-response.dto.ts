import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID_VERSION } from '@shared/constants/uuid';
import { ArtistBase } from '../artist.interface';

export class ArtistResponseDto implements ArtistBase {
  @ApiProperty({
    description: 'artist ID (uuid v4)',
    example: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'artist name',
    example: 'Paul McCartney',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Does artist have Grammy awards?',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
