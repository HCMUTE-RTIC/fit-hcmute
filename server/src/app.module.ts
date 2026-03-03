import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { RedisCacheModule } from './common/redis-cache/redis-cache.module';
import { ArticlesModule } from './articles/articles.module';
import { AlbumsModule } from './albums/albums.module';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisCacheModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    MediaModule,
    ArticlesModule,
    AlbumsModule,
    FormsModule,
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
