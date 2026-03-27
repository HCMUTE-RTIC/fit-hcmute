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

  // 2. Create Dummy Albums
  const album1 = await prisma.mediaAlbum.upsert({
    where: { slug: 'ky-niem-25-nam-thanh-lap-khoa' },
    update: {},
    create: {
      title: 'Kỷ niệm 25 năm thành lập khoa CNTT',
      slug: 'ky-niem-25-nam-thanh-lap-khoa',
      description: 'Chùm ảnh kỷ niệm chặng đường 25 năm xây dựng và phát triển.',
      createdBy: adminUser.id,
    }
  });

  const album2 = await prisma.mediaAlbum.upsert({
    where: { slug: 'hoi-thao-cong-nghe-ai-2025' },
    update: {},
    create: {
      title: 'Hội thảo Công nghệ AI 2025',
      slug: 'hoi-thao-cong-nghe-ai-2025',
      description: 'Những khoảnh khắc tại hội thảo AI do sinh viên và giảng viên khoa tổ chức.',
      createdBy: adminUser.id,
    }
  });

  console.log(`✅ Dummy Albums created`);

  // 3. Create Dummy Articles
  await prisma.article.upsert({
    where: { slug: 'chao-mung-ky-niem-25-nam' },
    update: {},
    create: {
      title: 'Chào mừng kỷ niệm 25 năm thành lập khoa CNTT',
      slug: 'chao-mung-ky-niem-25-nam',
      summary: 'Hoạt động hướng tới kỷ niệm 25 năm thành lập Khoa Công Nghệ Thông Tin (2001 - 2026).',
      content: '<p>Chi tiết bài viết kỷ niệm 25 năm thành lập...</p>',
      category: 'NEWS',
      status: 'PUBLISHED',
      authorId: adminUser.id,
      viewCount: 1250,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop'
    }
  });

  await prisma.article.upsert({
    where: { slug: 'danh-sach-sinh-vien-tieu-bieu-2026' },
    update: {},
    create: {
      title: 'Danh sách sinh viên tiêu biểu niên khóa 2022-2026',
      slug: 'danh-sach-sinh-vien-tieu-bieu-2026',
      summary: 'Vinh danh các sinh viên xuất sắc.',
      content: '<p>Danh sách các sinh viên đạt thành tích cao...</p>',
      category: 'EVENT',
      status: 'PUBLISHED',
      authorId: adminUser.id,
      viewCount: 342,
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop'
    }
  });

  await prisma.article.upsert({
    where: { slug: 'lich-nghi-tet-nguyen-dan-2027' },
    update: {},
    create: {
      title: 'Thông báo lịch nghỉ Tết Nguyên Đán 2027',
      slug: 'lich-nghi-tet-nguyen-dan-2027',
      summary: 'Lịch nghỉ Tết cho sinh viên toàn trường.',
      content: '<p>Sinh viên sẽ được nghỉ Tết từ ngày...</p>',
      category: 'NEWS',
      status: 'DRAFT',
      authorId: adminUser.id,
      viewCount: 0,
    }
  });

  console.log(`✅ Dummy Articles created`);

  // 4. Seed loi-chuc form (idempotent)
  const existingForm = await prisma.formDefinition.findUnique({ where: { slug: 'loi-chuc' } });
  if (!existingForm) {
    const loiChucForm = await prisma.formDefinition.create({
      data: {
        title: 'Gửi lời chúc & Đăng ký tham dự',
        slug: 'loi-chuc',
        description: 'Form gửi lời chúc mừng kỷ niệm 25 năm thành lập Khoa CNTT',
        active: true,
        fields: {
          create: [
            { name: 'full_name',       label: 'Họ và tên',                         type: 'TEXT',     required: true,  order: 0 },
            { name: 'email',           label: 'Email',                             type: 'EMAIL',    required: true,  order: 1 },
            { name: 'graduation_year', label: 'Khóa/Năm tốt nghiệp',              type: 'TEXT',     required: false, order: 2 },
            { name: 'attend_event',    label: 'Bạn có tham dự sự kiện không?',     type: 'SELECT',   required: true,  options: ['Không', 'Có'], order: 3 },
            { name: 'message',         label: 'Lời chúc mừng / Chia sẻ kỷ niệm', type: 'TEXTAREA', required: true,  order: 4 },
          ],
        },
      },
    });
    console.log(`✅ loi-chuc form created: ${loiChucForm.id}`);
  } else {
    console.log(`✅ loi-chuc form already exists: ${existingForm.id}`);
  }
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
