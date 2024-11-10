import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavsResponseDto {
  @ApiProperty({
    description: 'List of favorite artists',
    example: [
      {
        id: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
        name: 'Paul McCartney',
        grammy: true,
      },
    ],
  })
  @IsArray()
  artists: Artist[];

  @ApiProperty({
    description: 'List of favorite albums',
    example: [
      {
        id: 'd95faac5-4418-4c92-8381-c2fba34504d1',
        name: 'Flaming Pie',
        year: 1997,
        artistId: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
      },
    ],
  })
  @IsArray()
  albums: Album[];

  @ApiProperty({
    description: 'List of favorite tracks',
    example: [
      {
        id: 'fcdb3612-74fe-4d41-a645-3f107c4cd29e',
        name: 'If You Wanna',
        artistId: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
        albumId: 'd95faac5-4418-4c92-8381-c2fba34504d1',
        duration: 277,
      },
    ],
  })
  @IsArray()
  tracks: Track[];
}
