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
import { AlbumBase } from '../album.interface';

export class CreateAlbumDto implements Omit<AlbumBase, 'id'> {
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
