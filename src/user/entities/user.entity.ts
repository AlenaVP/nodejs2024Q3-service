import { Exclude } from 'class-transformer';
import { UserBase } from '../user.interface';

export class User implements UserBase {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
