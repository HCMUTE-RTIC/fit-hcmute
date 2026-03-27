import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginAttemptsService } from './login-attempts.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: getJwtSecret(configService),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '12h') as any,
          issuer: configService.get<string>('JWT_ISSUER', 'fit-hcmute-api'),
          audience: configService.get<string>('JWT_AUDIENCE', 'fit-hcmute-admin'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LoginAttemptsService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

function getJwtSecret(configService: ConfigService) {
  const configuredSecret = configService.get<string>('JWT_SECRET');
  if (configuredSecret) return configuredSecret;

  if (configService.get<string>('NODE_ENV') === 'production') {
    throw new Error('JWT_SECRET must be configured in production.');
  }

  console.warn(
    '[AuthModule] JWT_SECRET is not set. Falling back to an unsafe development secret.',
  );
  return 'fit_hcmute_dev_only_secret_change_me';
}
