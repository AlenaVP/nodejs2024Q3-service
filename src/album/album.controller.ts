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
import { AlbumService } from './album.service';
import { AlbumResponseDto } from './dto/album-response.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly uuidService: UuidService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album has been successfully created',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Request body does not contain required fields or artistId in DTO is invalid or points to non-existing entity',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Albums have been successfully retrieved',
    type: AlbumResponseDto,
    isArray: true,
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: '0a91b6a8-d1af-4556-80e0-f482e33232a0',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been successfully retrieved',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found',
  })
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
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'ab00a15e-86c9-4ed1-84e0-3234eb315b2b',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Album's info has been successfully updated",
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Provided id of album is invalid (not uuid) or artistId in DTO is invalid or points to non-existing entity',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found',
  })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'album id (uuid v4)',
    example: 'a868adda-61a6-4d4f-9ba9-43629fa73147',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided id of album is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with provided id was not found',
  })
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
