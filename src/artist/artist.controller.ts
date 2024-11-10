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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly uuidService: UuidService,
  ) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist', ErrorMessage.NOT_FOUND);
    }

    return artist;
  }

  @Put(':id')
  updateInfo(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const updatedArtist = this.artistService.updateInfo(id, updateArtistDto);

    if (!updatedArtist) {
      throw new NotFoundException('Artist', ErrorMessage.NOT_FOUND);
    }

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const result = this.artistService.remove(id);

    if (!result) {
      throw new NotFoundException('Artist', ErrorMessage.NOT_FOUND);
    }
  }
}
