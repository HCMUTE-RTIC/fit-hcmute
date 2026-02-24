import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: Record<string, string>) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException({
                success: false,
                message: 'Invalid email or password',
                data: null,
                errorCode: 'AUTH_001',
            });
        }
        return this.authService.login(user);
    }
}
