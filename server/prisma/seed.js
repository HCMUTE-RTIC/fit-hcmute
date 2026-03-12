'use strict';
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Starting database seeding...');

  const superAdminEmail = 'admin@fit.hcmute.edu.vn';
  const defaultPassword = 'SysAdmin@Fit25Years!';
  const hashedPassword = hashPassword(defaultPassword);

  const adminUser = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      email: superAdminEmail,
      name: 'He Thong Quan Tri',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Super Admin created: ' + adminUser.email);
  console.log('Default Password: ' + defaultPassword);

  const album1 = await prisma.mediaAlbum.upsert({
    where: { slug: 'ky-niem-25-nam-thanh-lap-khoa' },
    update: {},
    create: {
      title: 'Ky niem 25 nam thanh lap khoa CNTT',
      slug: 'ky-niem-25-nam-thanh-lap-khoa',
      description: 'Chum anh ky niem chang duong 25 nam xay dung va phat trien.',
      createdBy: adminUser.id,
    },
  });

  console.log('Albums created');

  await prisma.article.upsert({
    where: { slug: 'chao-mung-ky-niem-25-nam' },
    update: {},
    create: {
      title: 'Chao mung ky niem 25 nam thanh lap khoa CNTT',
      slug: 'chao-mung-ky-niem-25-nam',
      summary: 'Hoat dong huong toi ky niem 25 nam thanh lap Khoa Cong Nghe Thong Tin (2001 - 2026).',
      content: '<p>Chi tiet bai viet ky niem 25 nam thanh lap...</p>',
      category: 'NEWS',
      status: 'PUBLISHED',
      authorId: adminUser.id,
      viewCount: 0,
    },
  });

  console.log('Articles created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed successfully.');
  })
  .catch(async (e) => {
    console.error('Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
