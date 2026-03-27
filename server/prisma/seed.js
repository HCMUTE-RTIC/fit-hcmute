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

  // Seed loi-chuc form (idempotent)
  const existingForm = await prisma.formDefinition.findUnique({ where: { slug: 'loi-chuc' } });
  if (!existingForm) {
    const loiChucForm = await prisma.formDefinition.create({
      data: {
        title: 'Gửi lời chúc',
        slug: 'loi-chuc',
        description: 'Form gửi lời chúc mừng kỷ niệm 25 năm thành lập Khoa CNTT',
        active: true,
        fields: {
          create: [
            { name: 'full_name',       label: 'Họ và tên',                         type: 'TEXT',     required: true,  order: 0 },
            { name: 'email',           label: 'Email',                             type: 'EMAIL',    required: true,  order: 1 },
            { name: 'graduation_year', label: 'Khóa/Năm tốt nghiệp',              type: 'TEXT',     required: false, order: 2 },
            { name: 'message',         label: 'Lời chúc mừng / Chia sẻ kỷ niệm', type: 'TEXTAREA', required: true,  order: 3 },
          ],
        },
      },
    });
    console.log('loi-chuc form created: ' + loiChucForm.id);
  } else {
    console.log('loi-chuc form already exists: ' + existingForm.id);
  }

  // Seed site config defaults (idempotent)
  const configDefaults = [
    { key: 'ky_yeu_enabled', value: 'true' },
    { key: 'ky_yeu_pdf_url', value: '' },
  ];
  for (const cfg of configDefaults) {
    await prisma.siteConfig.upsert({
      where: { key: cfg.key },
      update: {},
      create: cfg,
    });
  }
  console.log('Site config seeded');

  // Seed chia-se-ky-niem form (idempotent)
  const existingMemoryForm = await prisma.formDefinition.findUnique({ where: { slug: 'chia-se-ky-niem' } });
  if (!existingMemoryForm) {
    const memoryForm = await prisma.formDefinition.create({
      data: {
        title: 'Chia sẻ kỷ niệm',
        slug: 'chia-se-ky-niem',
        description: 'Form chia sẻ kỷ niệm kèm ảnh cho trang kỷ yếu 25 năm Khoa CNTT',
        active: true,
        fields: {
          create: [
            { name: 'full_name', label: 'Họ và tên',            type: 'TEXT',     required: true,  order: 0 },
            { name: 'email',     label: 'Email',                type: 'EMAIL',    required: true,  order: 1 },
            { name: 'caption',   label: 'Lời bình / Kỷ niệm',  type: 'TEXTAREA', required: true,  order: 2 },
            { name: 'image',     label: 'Ảnh kỷ niệm',         type: 'FILE',     required: true,  order: 3 },
          ],
        },
      },
    });
    console.log('chia-se-ky-niem form created: ' + memoryForm.id);
  } else {
    console.log('chia-se-ky-niem form already exists: ' + existingMemoryForm.id);
  }

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
