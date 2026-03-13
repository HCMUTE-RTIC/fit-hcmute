import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Kỷ niệm 25 năm thành lập (2001–2026)',
  description: 'Trang web kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin, Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh. Hành trình phát triển, thành tựu và tri ân.',
  url: '/home',
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
