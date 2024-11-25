import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async signup(signupUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(signupUserDto);
  }
}
