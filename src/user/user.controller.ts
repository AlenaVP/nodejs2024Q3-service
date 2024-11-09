import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorMessage, UpdateUserPasswordError } from '@shared/constants/enums';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uuidService: UuidService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new BadRequestException(
        ErrorMessage.LOGIN_AND_PASSWORD_ARE_REQUIRED,
      );
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User', ErrorMessage.NOT_FOUND);
    }

    return user;
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const result = this.userService.updatePassword(id, updateUserDto);

    if (result === UpdateUserPasswordError.UserNotFound) {
      throw new NotFoundException('User', ErrorMessage.NOT_FOUND);
    }

    if (result === UpdateUserPasswordError.WrongPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_PASSWORD);
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException(ErrorMessage.INVALID_ID);
    }

    const result = this.userService.remove(id);

    if (!result) {
      throw new NotFoundException('User', ErrorMessage.NOT_FOUND);
    }
  }
}
