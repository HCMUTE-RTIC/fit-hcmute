import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CountdownBar from "@/components/countdown/CountdownBar";
import SplashWrapper from "@/components/splash/SplashWrapper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SplashWrapper>
      <CountdownBar />
      <Navbar />
      {children}
      <Footer />
    </SplashWrapper>
  );
}
