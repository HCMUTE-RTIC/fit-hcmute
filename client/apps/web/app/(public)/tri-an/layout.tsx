import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Tri ân',
  description: 'Tri ân các thầy cô, cựu sinh viên và những người đã đóng góp cho sự phát triển của Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh.',
  keywords: ['tri ân thầy cô FIT HCMUTE', 'cựu sinh viên khoa CNTT', 'alumni FIT HCMUTE', 'kết nối cựu sinh viên HCMUTE', 'tri ân 25 năm FIT'],
  url: '/tri-an',
});

export default function TriAnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
