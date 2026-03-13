import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Tin tức',
  description: 'Tin tức và sự kiện mới nhất của Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Cập nhật hoạt động, thành tích và các chương trình đào tạo.',
  keywords: ['tin tức FIT HCMUTE', 'sự kiện khoa CNTT', 'thông báo HCMUTE', 'hoạt động sinh viên FIT', 'tin tức công nghệ thông tin SPKT'],
  url: '/tin-tuc',
});

export default function TinTucLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
