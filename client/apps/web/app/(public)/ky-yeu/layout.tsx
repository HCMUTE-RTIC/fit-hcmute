import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Kỷ yếu',
  description: 'Kỷ yếu và tưởng nhớ các thế hệ sinh viên Khoa Công nghệ Thông tin - ĐH SPKT TP.HCM.',
  url: '/ky-yeu',
});

export default function KyYeuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
