import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user login',
    example: 'Joe Doe',
  })
  @IsNotEmpty()
  @IsString()
  login = '';

  @ApiProperty({
    description: 'user password',
    example: 'passWord321',
  })
  @IsNotEmpty()
  @IsString()
  password = '';
}
