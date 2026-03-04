
"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronUp, Lightbulb, Globe, Award } from "lucide-react";
import { useState, useEffect } from "react";

const imgImageHcmuteCampus = "/temp.jpg";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#f0f9ff" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imgImageHcmuteCampus}
            alt="HCMUTE Campus"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div
                className="px-8 py-3 rounded-full font-bold text-sm tracking-wider"
                style={{
                  backgroundColor: "#d4af37",
                  color: "#1e3a8a",
                  boxShadow: "0px 4px 20px 0px rgba(212, 175, 55, 0.4)",
                }}
              >
                2000 - 2025
              </div>
            </motion.div>

            {/* Main Heading */}
            <h1
              className="font-extrabold mb-6 leading-tight text-white"
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                letterSpacing: "-0.02em",
              }}
            >
              Vững Bước Vươn Xa
            </h1>

            {/* Subtitle */}
            <p
              className="mb-12 max-w-3xl mx-auto leading-relaxed text-white/90"
              style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
            >
              Kỷ niệm 25 năm hình thành và phát triển Khoa Công nghệ Thông tin
              <br />
              Trường Đại học Công nghệ Kỹ thuật TP.HCM
            </p>

            {/* CTA Button */}
            <Link
              href="/tri-an"
              className="inline-flex items-center justify-center rounded-lg text-white font-bold uppercase text-base tracking-wider hover:opacity-90 transition-all group"
              style={{
                backgroundColor: "#1e3a8a",
                padding: "16px 40px",
                borderRadius: "10px",
                boxShadow: "0px 25px 50px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              ĐĂNG KÝ THAM DỰ
              <ArrowRight
                className="ml-3 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Triết lý đào tạo Section ─────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
          backgroundColor: "#f0f9ff",
        }}
      >
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 58, 138, 0.1) 0.13966%, rgba(0,0,0,0) 0.13966%),
              linear-gradient(90deg, rgba(30, 58, 138, 0.1) 0%, rgba(0,0,0,0) 0%)
            `,
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                color: "#1e3a8a",
              }}
            >
              Triết lý đào tạo
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "18px", color: "#64748b" }}
            >
              Ba giá trị cốt lõi định hình nên thế hệ kỹ sư CNTT chất lượng cao
            </p>
          </motion.div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Lightbulb,
                title: "Sáng tạo",
                description:
                  "Khuyến khích tư duy đổi mới, sáng tạo và nghiên cứu khoa học ứng dụng thực tiễn.",
                iconColor: "#2563EB",
              },
              {
                icon: Award,
                title: "Nhân bản",
                description:
                  "Đào tạo không chỉ kiến thức mà còn đạo đức, trách nhiệm xã hội và tinh thần cống hiến.",
                iconColor: "#DC2626",
              },
              {
                icon: Globe,
                title: "Hội nhập",
                description:
                  "Chương trình đào tạo chuẩn quốc tế, kết nối với các trường đại học hàng đầu thế giới.",
                iconColor: "#1E3A8A",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "16px",
                  border: "2px solid #1b5bdb",
                  padding: "31px",
                  minHeight: "296px",
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center mb-6"
                  style={{ width: "80px", height: "80px" }}
                >
                  <card.icon
                    size={48}
                    style={{ color: card.iconColor }}
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-bold mb-4"
                  style={{
                    fontSize: "24px",
                    lineHeight: "36px",
                    color: "#1e3a8a",
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: "16px",
                    lineHeight: "26px",
                    color: "#64748b",
                  }}
                >
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
          backgroundColor: "white",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="font-bold mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: "72px",
                color: "#1e3a8a",
              }}
            >
              Cùng kết nối và chia sẻ
            </h2>
            <p
              className="mb-8 max-w-3xl mx-auto"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#64748b",
              }}
            >
              Hãy cùng chúng tôi tạo nên những kỷ niệm đẹp trong dịp kỷ niệm
              25 năm thành lập
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/hanh-trinh-25-nam"
                className="inline-flex items-center justify-center rounded-xl font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  padding: "16px 32px",
                  fontSize: "16px",
                  borderRadius: "14px",
                }}
              >
                Xem hành trình 25 năm
              </Link>
              <Link
                href="/tri-an"
                className="inline-flex items-center justify-center font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: "white",
                  color: "#1e3a8a",
                  padding: "16px 34px",
                  border: "2px solid #2563eb",
                  fontSize: "16px",
                  borderRadius: "14px",
                }}
              >
                Gửi lời chúc mừng
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll To Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-all z-40"
          style={{ backgroundColor: "var(--color-primary-900)" }}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
}
