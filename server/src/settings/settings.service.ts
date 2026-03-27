import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(key: string): Promise<string | null> {
    const config = await this.prisma.siteConfig.findUnique({ where: { key } });
    return config?.value ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    await this.prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  async getAll(): Promise<Record<string, string>> {
    const configs = await this.prisma.siteConfig.findMany();
    const result: Record<string, string> = {};
    for (const c of configs) {
      result[c.key] = c.value;
    }
    return result;
  }

  async setBulk(data: Record<string, string>): Promise<void> {
    const ops = Object.entries(data).map(([key, value]) =>
      this.prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    );
    await this.prisma.$transaction(ops);
  }
}
