import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorMessage } from '@shared/constants/enums';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly uuidService: UuidService,
  ) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album', ErrorMessage.NOT_FOUND);
    }

    return album;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const updatedAlbum = this.albumService.updateInfo(id, updateAlbumDto);

    if (!updatedAlbum) {
      throw new NotFoundException('Album', ErrorMessage.NOT_FOUND);
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const result = this.albumService.remove(id);

    if (!result) {
      throw new NotFoundException('Album', ErrorMessage.NOT_FOUND);
    }
  }
}
