import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { UpdateUserPasswordError } from '@shared/constants/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: userDto,
    });

    return plainToClass(User, user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return plainToClass(User, user);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<User | UpdateUserPasswordError> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return UpdateUserPasswordError.UserNotFound;
    }

    if (user.password !== oldPassword) {
      return UpdateUserPasswordError.WrongPassword;
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: { version: user.version + 1, password: newPassword },
      });

      return plainToClass(User, updatedUser);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return UpdateUserPasswordError.UserNotFound;
      }

      throw err;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.user.delete({ where: { id } });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return false;
      }

      throw err;
    }
  }
}
