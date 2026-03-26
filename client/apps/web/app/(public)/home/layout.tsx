import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Kỷ niệm 25 năm thành lập (2001–2026)',
  description: 'Trang web kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin, Đại học Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Hành trình phát triển, thành tựu và tri ân.',
  keywords: ['FIT HCMUTE 25 năm', 'kỷ niệm 25 năm khoa CNTT', 'HCMUTE 2026', 'Khoa Công nghệ Thông tin Công Nghệ Kỹ thuật', '25 năm thành lập FIT'],
  url: '/home',
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
