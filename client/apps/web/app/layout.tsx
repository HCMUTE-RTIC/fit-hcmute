import { Inter, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "@workspace/ui/globals.css";
import "../styles/theme.css";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";

const fontSans = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0066cc',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://25nam.fit.hcmute.edu.vn'),
  title: {
    default: 'Kỷ niệm 25 năm Khoa CNTT - ĐH Sư phạm Kỹ thuật TP.HCM',
    template: '%s | FIT-HCMUTE 25 năm'
  },
  description: 'Trang web kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin (2001–2026), Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh. Hành trình phát triển, thành tựu và tri ân.',
  keywords: ['FIT HCMUTE', 'Khoa Công nghệ Thông tin', 'HCMUTE', '25 năm', 'kỷ niệm', 'Đại học Sư phạm Kỹ thuật', 'Công nghệ Thông tin'],
  authors: [{ name: 'FIT HCMUTE' }],
  creator: 'FIT HCMUTE',
  publisher: 'FIT HCMUTE',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://25nam.fit.hcmute.edu.vn',
    siteName: 'Kỷ niệm 25 năm Khoa CNTT - FIT HCMUTE',
    title: 'Kỷ niệm 25 năm Khoa CNTT - ĐH Sư phạm Kỹ thuật TP.HCM',
    description: 'Trang web kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin (2001–2026), Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh. Hành trình phát triển, thành tựu và tri ân.',
    images: [
      {
        url: 'https://25nam.fit.hcmute.edu.vn/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kỷ niệm 25 năm Khoa CNTT - FIT HCMUTE',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kỷ niệm 25 năm Khoa CNTT - ĐH Sư phạm Kỹ thuật TP.HCM',
    description: 'Trang web kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin (2001–2026), Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh',
    images: ['https://25nam.fit.hcmute.edu.vn/twitter-image'],
  },
  alternates: {
    canonical: '/',
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

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Khoa Công nghệ Thông tin - FIT HCMUTE',
  url: 'https://25nam.fit.hcmute.edu.vn',
  description: 'Website kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin, Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh',
  inLanguage: 'vi',
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Khoa Công nghệ Thông tin - HCMUTE',
    url: 'https://fit.hcmute.edu.vn',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Khoa Công nghệ Thông tin - Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh',
  alternateName: 'FIT HCMUTE',
  url: 'https://fit.hcmute.edu.vn',
  logo: {
    '@type': 'ImageObject',
    url: 'https://25nam.fit.hcmute.edu.vn/opengraph-image',
    width: 1200,
    height: 630,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '01 Võ Văn Ngân, Phường Linh Chiểu',
    addressLocality: 'TP. Thủ Đức',
    addressRegion: 'TP. Hồ Chí Minh',
    addressCountry: 'VN',
  },
  telephone: '+84-28-37221223',
  email: 'kcntt@hcmute.edu.vn',
  foundingDate: '2000',
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh',
    alternateName: 'HCMUTE',
    url: 'https://hcmute.edu.vn',
  },
  sameAs: [
    'https://fit.hcmute.edu.vn',
    'https://www.facebook.com/fit.hcmute.edu.vn',
    'https://youtube.com/@khoacongnghethongtin4401',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="m-0 p-0">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased m-0 p-0`}
      >
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            async
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
