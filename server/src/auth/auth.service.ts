import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    let isMatch = false;
    if (user.password.length === 64) {
      const hash = crypto.createHash('sha256').update(pass).digest('hex');
      if (user.password === hash) isMatch = true;
    } else {
      isMatch = await bcrypt.compare(pass, user.password);
    }
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      success: true,
      message: 'Login successful',
      data: {
        access_token: this.jwtService.sign(payload),
        user,
      },
      errorCode: null,
    };
  }
}
