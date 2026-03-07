import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Giới thiệu',
  description: 'Giới thiệu về Khoa Công nghệ Thông tin - Đại học Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Chương trình đào tạo chất lượng cao, đội ngũ giảng viên giàu kinh nghiệm, hợp tác quốc tế.',
  url: '/gioi-thieu',
});

export default function GioiThieuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
