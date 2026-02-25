import { PrismaClient } from '@prisma/client';
// Using standard crypto algorithm to simulate bcrypt without extra dependencies for now
import * as crypto from 'crypto';

const prisma = new PrismaClient();

// This is a simple hash simulation since we don't have bcrypt yet in the clean server folder.
// When NestJS is initialized with the auth module, this should use bcrypt.hash()
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('🌱 Starting database seeding...');

  const superAdminEmail = 'admin@fit.hcmute.edu.vn';
  const defaultPassword = 'SysAdmin@Fit25Years!';
  const hashedPassword = hashPassword(defaultPassword);

  // 1. Create SUPER_ADMIN
  const adminUser = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      email: superAdminEmail,
      name: 'Hệ Thống Quản Trị',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log(`✅ Super Admin created: ${adminUser.email}`);
  console.log(`🔑 Default Password (SHA256 for now): ${defaultPassword}`);
  console.log('⚠️ REMEMBER TO CHANGE THIS PASSWORD IN PRODUCTION!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('🎉 Seeding completed successfully.');
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
