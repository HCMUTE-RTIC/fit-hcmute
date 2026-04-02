import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import type { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Helmet — bảo mật HTTP headers (XSS, clickjacking, MIME sniffing, ...)
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Cho phép load media cross-origin
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'no-store');
    }

    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://25nam.fit.hcmute.edu.vn',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
