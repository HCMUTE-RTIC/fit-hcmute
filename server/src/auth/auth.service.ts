import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        // Since seed.ts used SHA256, locally here I will fallback to a raw comparison if you run seed instead of actual bcrypt.
        // In production, we assume user.password is hashed by bcrypt.
        if (user && user.password) {
            // Quick workaround: if password is a 64 length hex string from seed.ts
            if (user.password.length === 64) {
                const crypto = await import('crypto');
                const hash = crypto.createHash('sha256').update(pass).digest('hex');
                if (user.password === hash) {
                    const { password, ...result } = user;
                    return result;
                }
            } else {
                // Standard Bcrypt flow
                const isMatch = await bcrypt.compare(pass, user.password);
                if (isMatch) {
                    const { password, ...result } = user;
                    return result;
                }
            }
        }
        return null;
    }

    async login(user: any) {
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
