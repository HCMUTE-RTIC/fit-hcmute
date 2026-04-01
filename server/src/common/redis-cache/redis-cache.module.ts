import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST') || 'localhost';
        const port = configService.get<string>('REDIS_PORT') || '6379';
        const password =
          configService.get<string>('REDIS_PASSWORD') || 'dev_redis_pass_123';

        // Keyv URL string format: redis://:pass@host:port
        const redisUrl = `redis://:${password}@${host}:${port}`;

        return {
          store: createKeyv(redisUrl),
          ttl: 60 * 60 * 1000, // Default cache is 1 Hour
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
