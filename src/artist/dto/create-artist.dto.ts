import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArtistBase } from '../artist.interface';

export class CreateArtistDto implements Omit<ArtistBase, 'id'> {
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
