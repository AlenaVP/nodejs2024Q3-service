import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsDefined,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';
import { UUID_VERSION } from '@shared/constants/uuid';
import { User } from '../entities/user.entity';

export class UserResponseDto implements Omit<User, 'password'> {
  @ApiProperty({
    description: 'user ID (uuid v4)',
    example: '7b30a163-ed21-4f4a-b867-c00c3177940b',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'user login',
    example: 'Joe Doe',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'user version (integer number, increments on update)',
    example: 1,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  version: number;

  @ApiProperty({
    description: 'timestamp of user creation',
    example: 1731249957916,
  })
  @IsDefined()
  @IsDate()
  createdAt: number;

  @ApiProperty({
    description: 'timestamp of last user update',
    example: 1731249982321,
  })
  @IsDefined()
  @IsDate()
  updatedAt: number;
}
