import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenResponseDto {
  @ApiProperty({
    description: 'JWT access token',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
