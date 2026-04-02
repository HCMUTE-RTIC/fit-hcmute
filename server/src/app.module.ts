import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from './common/redis-cache/redis-cache.module';
import { ArticlesModule } from './articles/articles.module';
import { AlbumsModule } from './albums/albums.module';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { FormsModule } from 'src/forms/forms.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { BullModule } from '@nestjs/bullmq';
import { MailModule } from './mail/mail.module';
import { SettingsModule } from './settings/settings.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate limiting global — mặc định 60 request / 60 giây mỗi IP
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60_000,
        limit: 60,
      },
    ]),

    // BullMQ Global – dùng chung Redis connection cho tất cả queue
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>(
            'REDIS_PASSWORD',
            'dev_redis_pass_123',
          ),
        },
      }),
      inject: [ConfigService],
    }),

    RedisCacheModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    MediaModule,
    ArticlesModule,
    AlbumsModule,
    FormsModule,
    AuditLogsModule,
    MailModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
