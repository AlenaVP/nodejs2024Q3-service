import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword = '';

  @IsNotEmpty()
  @IsString()
  newPassword = '';
}
