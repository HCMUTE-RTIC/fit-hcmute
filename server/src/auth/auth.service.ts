import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAttemptsService } from './login-attempts.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private loginAttemptsService: LoginAttemptsService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (!user) return null;

    let isMatch = false;
    if (user.password.length === 64) {
      const hash = crypto.createHash('sha256').update(pass).digest('hex');
      if (user.password === hash) isMatch = true;
    } else {
      isMatch = await bcrypt.compare(pass, user.password);
    }
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pw, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  assertCanAttemptLogin(ip: string, email: string) {
    this.loginAttemptsService.assertCanAttempt(ip, email.trim().toLowerCase());
  }

  recordFailedLogin(ip: string, email: string) {
    this.loginAttemptsService.recordFailure(ip, email.trim().toLowerCase());
  }

  recordSuccessfulLogin(ip: string, email: string) {
    this.loginAttemptsService.recordSuccess(ip, email.trim().toLowerCase());
  }
}
