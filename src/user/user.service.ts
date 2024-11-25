import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UpdateUserPasswordError } from '@shared/constants/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvironmentVariables } from '@shared/interfaces/env-config';
import { DEFAULT_SALT_ROUNDS } from './constants';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly prismaService: PrismaService,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    const saltRounds = +this.configService.get(
      'CRYPT_SALT',
      DEFAULT_SALT_ROUNDS,
      { infer: true },
    );
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await this.prismaService.user.create({
      data: { login, password: passwordHash },
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

  async findOneByLogin(login: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (!user) {
      return null;
    }

    return plainToClass(User, user);
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

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<User | UpdateUserPasswordError> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return UpdateUserPasswordError.UserNotFound;
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
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

  async verifyPassword(id: string, password: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return false;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    return isPasswordCorrect;
  }
}
