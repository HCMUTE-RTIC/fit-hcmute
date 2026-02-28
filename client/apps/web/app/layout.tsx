import { Inter, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import "../styles/theme.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fontSans = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
