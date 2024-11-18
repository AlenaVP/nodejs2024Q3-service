import { Exclude, Transform } from 'class-transformer';
import { UserBase } from '../user.interface';

export class User implements UserBase {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
