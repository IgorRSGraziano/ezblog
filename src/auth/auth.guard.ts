import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthService } from './auth.service';

function extractTokenFromHeader(request: Request): string | undefined {
  const tokenStr =
    request.headers.authorization ?? request.cookies?.['authorization'];
  const [type, token] = tokenStr?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    const user = await this.authService.validateJwt(token);

    if (!user) throw new UnauthorizedException();

    request.user = user;

    return true;
  }
}
