
import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { User } from '../user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  async signup(@Body() signupUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(signupUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful login with provided login and password',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'DTO is invalid (no login or password, or they are not a strings)',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Incorrect login or password',
  })
  async login(@Body() loginUserDto: CreateUserDto): Promise<LoginResponseDto> {
    const response = await this.authService.login(loginUserDto);

    if (!response) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return response;
  }

  @Post('refresh')
  async refresh() { }
}
