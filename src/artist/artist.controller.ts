import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ErrorMessage } from '@shared/constants/enums';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { ArtistService } from './artist.service';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly uuidService: UuidService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully created',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Artists have been successfully retrieved',
    type: ArtistResponseDto,
    isArray: true,
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '7b06da94-6e57-4641-8baa-6f6d975c70aa',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been successfully retrieved',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found',
  })
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
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '70083ecc-00e2-45fd-b7fb-1a7b58eab45f',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Artist's info has been successfully updated",
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found',
  })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: '25f82d5b-e19f-405d-bafa-191930b0577b',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found',
  })
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
