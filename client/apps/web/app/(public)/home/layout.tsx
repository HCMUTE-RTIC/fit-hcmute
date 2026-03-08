import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Trang chủ',
  description: 'Khoa Công nghệ Thông tin - Đại học Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Đào tạo chất lượng cao, nghiên cứu sáng tạo, phát triển nguồn nhân lực IT chuyên nghiệp.',
  url: '/home',
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
