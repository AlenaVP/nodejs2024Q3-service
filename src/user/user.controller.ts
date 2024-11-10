import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorMessage, UpdateUserPasswordError } from '@shared/constants/enums';
import { UUID_VERSION } from '@shared/constants/uuid';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users have been successfully retrieved',
    type: UserResponseDto,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'user id (uuid v4)',
    example: '7b30a163-ed21-4f4a-b867-c00c3177940b',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully retrieved',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided user id is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with provided id was not found',
  })
  findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User's password has been successfully updated",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided user id is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with provided id was not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Provided user's password is wrong",
  })
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = this.userService.updatePassword(id, updateUserDto);

    if (result === UpdateUserPasswordError.UserNotFound) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }

    if (result === UpdateUserPasswordError.WrongPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_PASSWORD);
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'user id (uuid v4)',
    example: '7b30a163-ed21-4f4a-b867-c00c3177940b',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided user id is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with provided id was not found',
  })
  remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = this.userService.remove(id);

    if (!result) {
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);
    }
  }
}
