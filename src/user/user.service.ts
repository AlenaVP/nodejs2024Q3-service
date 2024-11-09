import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UpdateUserPasswordError } from '@shared/constants/enums';
import { UuidService } from '@shared/service/uuid/uuid.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userDb = new Map<string, User>();

  constructor(private readonly uuidService: UuidService) {}

  create(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    const date = Date.now();
    const newUser: User = {
      id: this.uuidService.generate(),
      login,
      password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.userDb.set(newUser.id, newUser);

    return plainToClass(User, newUser);
  }

  findAll(): User[] {
    return [...this.userDb.values()].map((user) => plainToClass(User, user));
  }

  findOne(id: string): User | null {
    const user = this.userDb.get(id);

    if (!user) {
      return null;
    }

    return plainToClass(User, user);
  }

  updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): User | UpdateUserPasswordError {
    const user = this.userDb.get(id);

    if (!user) {
      return UpdateUserPasswordError.UserNotFound;
    }

    if (user.password !== oldPassword) {
      return UpdateUserPasswordError.WrongPassword;
    }

    const updatedUser: User = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.userDb.set(id, updatedUser);

    return plainToClass(User, updatedUser);
  }

  remove(id: string): boolean {
    if (this.userDb.has(id)) {
      this.userDb.delete(id);
      return true;
    }

    return false;
  }
}
