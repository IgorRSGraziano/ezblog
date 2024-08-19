import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtDto, SignInDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiTags('auth')
  async signIn(@Body() data: SignInDto): Promise<StatusMessage<JwtDto>> {
    const user = await this.authService.signIn(data);

    return {
      data: user,
      message: 'User signed in successfully',
      success: true,
    };
  }
}
