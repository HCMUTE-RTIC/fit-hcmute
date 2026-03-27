import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() body: LoginDto) {
    const clientIp = this.extractClientIp(req);
    const normalizedEmail = body.email.trim().toLowerCase();

    this.authService.assertCanAttemptLogin(clientIp, normalizedEmail);

    const user = await this.authService.validateUser(
      normalizedEmail,
      body.password,
    );

    if (!user) {
      this.authService.recordFailedLogin(clientIp, normalizedEmail);
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid email or password',
        errorCode: 'AUTH_001',
      });
    }

    this.authService.recordSuccessfulLogin(clientIp, normalizedEmail);
    return this.authService.login(user);
  }

  private extractClientIp(req: Request) {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
      return forwardedFor.split(',')[0]!.trim();
    }

    return req.ip || req.socket.remoteAddress || 'unknown';
  }
}
