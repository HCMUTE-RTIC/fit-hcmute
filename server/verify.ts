import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Testing Prisma Database Connection...');

    try {
        const userCount = await prisma.user.count();
        console.log(`Connection successful! Found ${userCount} user(s) in the database.`);

        const admin = await prisma.user.findUnique({
            where: { email: 'admin@fit.hcmute.edu.vn' }
        });

        if (admin) {
            console.log('✅ Admin user verified:');
            console.log(admin);
        } else {
            console.log('❌ Admin user NOT found!');
        }
    } catch (error) {
        console.error('❌ Failed to connect to database using Prisma:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
