import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'old password of the user',
    example: 'passWord321',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword = '';

  @ApiProperty({
    description: 'new password of the user',
    example: 'uv7gdsa8OIHf54G$',
  })
  @IsNotEmpty()
  @IsString()
  newPassword = '';
}
