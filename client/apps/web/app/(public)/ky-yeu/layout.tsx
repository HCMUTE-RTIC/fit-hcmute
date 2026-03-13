import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Kỷ yếu',
  description: 'Kỷ yếu và tưởng nhớ các thế hệ sinh viên Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh.',
  keywords: ['kỷ yếu FIT HCMUTE', 'kỷ yếu 25 năm khoa CNTT', 'yearbook FIT HCMUTE', 'kỷ yếu sinh viên công nghệ thông tin HCMUTE'],
  url: '/ky-yeu',
});

export default function KyYeuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
