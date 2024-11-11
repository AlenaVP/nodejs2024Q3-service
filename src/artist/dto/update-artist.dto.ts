import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ArtistBase } from '../artist.interface';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto
  extends PartialType(CreateArtistDto)
  implements Omit<ArtistBase, 'id'>
{
  @ApiProperty({
    description: 'artist name',
    example: 'Taylor Swift',
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
