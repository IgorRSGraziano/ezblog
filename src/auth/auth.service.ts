import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { JwtDto, SignInDto } from './auth.dto';
import * as crypto from 'crypto';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(data: SignInDto) {
    const passwordDigest = crypto
      .createHash('md5')
      .update(data.password)
      .digest('hex');

    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
        passwordDigest,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    const userDto = new UserDto(user);

    const jwtDto = new JwtDto();

    jwtDto.authorization = token;
    jwtDto.user = userDto;

    return jwtDto;
  }

  async validateJwt(token: string): Promise<UserDto> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw new ForbiddenException('Invalid token');
      }

      return new UserDto(user);
    } catch {
      throw new ForbiddenException('Invalid token');
    }
  }
}
