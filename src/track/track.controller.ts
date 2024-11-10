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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private uuidService: UuidService,
  ) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const track = this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track', ErrorMessage.NOT_FOUND);
    }

    return track;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const updatedTrack = this.trackService.updateInfo(id, updateTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException('Track', ErrorMessage.NOT_FOUND);
    }

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const result = this.trackService.remove(id);

    if (!result) {
      throw new NotFoundException('Track', ErrorMessage.NOT_FOUND);
    }
  }
}
