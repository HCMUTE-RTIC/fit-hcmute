import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Tin tức',
  description: 'Tin tức và sự kiện mới nhất của Khoa Công nghệ Thông tin - ĐH SPKT TP.HCM. Cập nhật hoạt động, thành tích và các chương trình đào tạo.',
  url: '/tin-tuc',
});

export default function TinTucLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
