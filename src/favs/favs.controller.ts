import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ErrorMessage } from '@shared/constants/enums';
import { UUID_VERSION } from '@shared/constants/uuid';
import { FavsResponseDto } from './dto/favs-response.dto';
import { FavsService } from './favs.service';

@ApiTags('favs')
@ApiBearerAuth()
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Favorites have been successfully retrieved',
    type: FavsResponseDto,
  })
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('album/:id')
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'd95faac5-4418-4c92-8381-c2fba34504d1',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album has been successfully added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Album with provided id not found',
  })
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Album with provided id not found',
      );
    }

    return result;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'd95faac5-4418-4c92-8381-c2fba34504d1',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found in the favorites',
  })
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.removeAlbum(id);

    if (!result) {
      throw new NotFoundException(ErrorMessage.ALBUM_NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Artist with provided id not found',
  })
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Artist with provided id not found',
      );
    }

    return result;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'artist id (uuid v4)',
    example: 'bc5efebd-6ab9-4135-934c-d4379a24ed58',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with provided id was not found in the favorites',
  })
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.removeArtist(id);

    if (!result) {
      throw new NotFoundException(ErrorMessage.ARTIST_NOT_FOUND);
    }
  }

  @Post('track/:id')
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'fcdb3612-74fe-4d41-a645-3f107c4cd29e',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The track has been successfully added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Track with provided id not found',
  })
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException(
        'Track with provided id not found',
      );
    }

    return result;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'track id (uuid v4)',
    example: 'fcdb3612-74fe-4d41-a645-3f107c4cd29e',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track has been successfully deleted from the favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of track is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with provided id was not found in the favorites',
  })
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.favsService.removeTrack(id);

    if (!result) {
      throw new NotFoundException(ErrorMessage.TRACK_NOT_FOUND);
    }
  }
}
