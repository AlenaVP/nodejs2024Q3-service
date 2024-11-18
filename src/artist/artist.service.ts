import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.prismaService.artist.create({ data: createArtistDto });

    return plainToClass(Artist, newArtist);
  }

  async findAll(): Promise<Artist[]> {
    const artists = await this.prismaService.artist.findMany();

    return artists.map((artist) => plainToClass(Artist, artist));
  }

  async findOne(id: string): Promise<Artist | null> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      return null;
    }

    return plainToClass(Artist, artist);
  }

  async updateInfo(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    try {
      const updatedArtist = await this.prismaService.artist.update({
        where: { id },
        data: updateArtistDto,
      });

      return plainToClass(Artist, updatedArtist);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return null;
      }

      throw err;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.artist.delete({
        where: { id },
      });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return false;
      }

      throw err;
    }
  }
}
