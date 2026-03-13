import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Thư viện',
  description: 'Thư viện hình ảnh và video về các hoạt động, sự kiện của Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh.',
  keywords: ['thư viện ảnh FIT HCMUTE', 'hình ảnh sự kiện khoa CNTT', 'video FIT HCMUTE', 'album ảnh 25 năm HCMUTE', 'gallery khoa công nghệ thông tin'],
  url: '/thu-vien',
});

export default function ThuVienLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
