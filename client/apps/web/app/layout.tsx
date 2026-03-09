import { Inter, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import "../styles/theme.css";
import { Providers } from "@/components/providers";

const fontSans = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://25nam.fit.hcmute.edu.vn'),
  title: {
    default: 'Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh',
    template: '%s | FIT-HCMUTE'
  },
  description: 'Khoa Công nghệ Thông tin - Đại học Công Nghệ Kỹ thuật Thành phố Hồ Chí Minh. Đào tạo chất lượng cao về Công nghệ Thông tin, Kỹ thuật Dữ liệu, An toàn Thông tin.',
  keywords: ['FIT HCMUTE', 'Khoa Công nghệ Thông tin', 'HCMUTE', 'Đại học Công Nghệ Kỹ thuật', 'Công nghệ Thông tin', 'IT', 'Kỹ thuật Dữ liệu'],
  authors: [{ name: 'FIT HCMUTE' }],
  creator: 'FIT HCMUTE',
  publisher: 'FIT HCMUTE',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://25nam.fit.hcmute.edu.vn',
    siteName: 'Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh',
    title: 'Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh',
    description: 'Khoa Công nghệ Thông tin - Đại học Công Nghệ Kỹ thuật Thành phố Hồ Chí Minh. Đào tạo chất lượng cao về Công nghệ Thông tin, Kỹ thuật Dữ liệu, An toàn Thông tin.',
    images: [
      {
        url: 'https://25nam.fit.hcmute.edu.vn/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Khoa Công nghệ Thông tin - FIT HCMUTE',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh',
    description: 'Khoa Công nghệ Thông tin - Đại học Công Nghệ Kỹ thuật Thành phố Hồ Chí Minh',
    images: ['https://25nam.fit.hcmute.edu.vn/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="m-0 p-0">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased m-0 p-0`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
