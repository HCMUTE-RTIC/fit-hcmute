import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Hành trình 25 năm',
  description: 'Hành trình 25 năm phát triển của Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Những cột mốc quan trọng và thành tựu đáng tự hào.',
  keywords: ['lịch sử khoa CNTT HCMUTE', 'hành trình 25 năm FIT', 'timeline FIT HCMUTE', 'cột mốc lịch sử khoa công nghệ thông tin', '25 năm phát triển HCMUTE'],
  url: '/hanh-trinh-25-nam',
});

export default function HanhTrinh25NamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
