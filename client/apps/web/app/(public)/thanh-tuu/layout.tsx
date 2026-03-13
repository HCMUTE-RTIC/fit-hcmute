import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Thành tựu',
  description: 'Thành tựu nổi bật của Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Giải thưởng, nghiên cứu khoa học và đóng góp cho cộng đồng.',
  keywords: ['thành tựu FIT HCMUTE', 'giải thưởng khoa CNTT', 'nghiên cứu khoa học HCMUTE', 'thành tích sinh viên FIT', 'xuất sắc công nghệ thông tin HCMUTE'],
  url: '/thanh-tuu',
});

export default function ThanhTuuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
