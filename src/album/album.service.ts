import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const album = await this.prismaService.album.create({ data: createAlbumDto });

      return plainToClass(Album, album);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003' // "Foreign key constraint failed on the field: {field_name}"
      ) {
        throw new UnknownIdException('artistId');
      }

      throw err;
    }
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.prismaService.album.findMany();

    return albums.map((album) => plainToClass(Album, album));
  }

  async findOne(id: string): Promise<Album | null> {
    const album = this.prismaService.album.findUnique({ where: { id } });

    if (!album) {
      return null;
    }

    return plainToClass(Album, album);
  }

  async updateInfo(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    try {
      const updatedAlbum = await this.prismaService.album.update({
        where: { id },
        data: updateAlbumDto,
      });

      return plainToClass(Album, updatedAlbum);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          // record not found
          return null;
        } else if (err.code === 'P2003') {
          // "Foreign key constraint failed on the field: {field_name}"
          throw new UnknownIdException('artistId');
        }
      }
      throw err;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.album.delete({ where: { id } });

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
