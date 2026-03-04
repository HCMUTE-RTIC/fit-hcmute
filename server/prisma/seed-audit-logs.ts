import { PrismaClient, Prisma } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
    let user = await prisma.user.findFirst({
        where: { role: 'SUPER_ADMIN' },
    });

    if (!user) {
        user = await prisma.user.findFirst();
    }

    if (!user) {
        console.log("No users found in the database. Please create a user first.");
        return;
    }

    console.log(`Seeding audit logs for user: ${user.email} (${user.id})`);

    await prisma.auditLog.create({
        data: {
            userId: user.id,
            action: 'CREATE',
            entity: 'Article',
            entityId: crypto.randomUUID(),
            oldValues: Prisma.JsonNull,
            newValues: {
                title: 'Chào mừng kỷ niệm 25 năm FIT HCMUTE',
                status: 'PUBLISHED',
                authorId: user.id
            } as Prisma.JsonObject,
            ipAddress: '192.168.1.100',
        }
    });

    await prisma.auditLog.create({
        data: {
            userId: user.id,
            action: 'UPDATE',
            entity: 'User',
            entityId: crypto.randomUUID(),
            oldValues: {
                role: 'EDITOR',
                isActive: true
            } as Prisma.JsonObject,
            newValues: {
                role: 'SUPER_ADMIN',
                isActive: true
            } as Prisma.JsonObject,
            ipAddress: '192.168.1.101',
        }
    });

    await prisma.auditLog.create({
        data: {
            userId: user.id,
            action: 'DELETE',
            entity: 'Album',
            entityId: crypto.randomUUID(),
            oldValues: {
                title: 'Hình ảnh cũ không dùng nữa',
                mediaCount: 15
            } as Prisma.JsonObject,
            newValues: Prisma.JsonNull,
            ipAddress: '192.168.1.102',
        }
    });

    console.log('Successfully seeded 3 mock audit logs!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
