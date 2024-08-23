import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtDto, SignInDto } from './auth.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { ApiGenericResponse, StatusMessage } from '../app.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiTags('auth')
  @ApiExtraModels(StatusMessage<JwtDto>)
  async signIn(@Body() data: SignInDto) {
    const user = await this.authService.signIn(data);

    return {
      data: user,
      message: 'User signed in successfully',
      success: true,
    };
  }

  @Get()
  @ApiTags('auth')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiGenericResponse(JwtDto)
  async validateJwt(@Req() req: Request) {
    return {
      data: req.user,
      message: 'Token is valid',
      success: true,
    };
  }
}
