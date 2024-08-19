import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto implements User {
  constructor(user: User) {
    Object.assign(this, user);
  }
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Exclude()
  passwordDigest: string;
}
