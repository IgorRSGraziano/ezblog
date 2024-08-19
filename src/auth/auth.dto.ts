import { IsEmail, IsString } from 'class-validator';
import { UserDto } from 'src/user/user.dto';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class JwtDto {
  authorization: string;
  user: UserDto;
}
