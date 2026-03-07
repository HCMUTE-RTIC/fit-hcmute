import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Thư viện',
  description: 'Thư viện hình ảnh và video về các hoạt động, sự kiện của Khoa Công nghệ Thông tin - ĐH SPKT TP.HCM.',
  url: '/thu-vien',
});

export default function ThuVienLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
