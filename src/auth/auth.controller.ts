import { Body, Controller, Post } from '@nestjs/common';
import { JwtDto, SignInDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Post()
  @ApiTags('auth')
  async signIn(@Body() data: SignInDto): Promise<StatusMessage<JwtDto>> {
    throw new Error('Not implemented');
  }
}
