import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                        },
                    },
                },
            }),
            this.prisma.auditLog.count(),
        ]);

        return {
            data: logs,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
