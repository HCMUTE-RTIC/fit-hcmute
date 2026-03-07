import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Thành tựu',
  description: 'Thành tựu nổi bật của Khoa Công nghệ Thông tin - ĐH SPKT TP.HCM. Giải thưởng, nghiên cứu khoa học và đóng góp cho cộng đồng.',
  url: '/thanh-tuu',
});

export default function ThanhTuuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
