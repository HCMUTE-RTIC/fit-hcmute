import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Tri ân',
  description: 'Tri ân các thầy cô, cựu sinh viên và những người đã đóng góp cho sự phát triển của Khoa Công nghệ Thông tin - ĐH SPKT TP.HCM.',
  url: '/tri-an',
});

export default function TriAnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
