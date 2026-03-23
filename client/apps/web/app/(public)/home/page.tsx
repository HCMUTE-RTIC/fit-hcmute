
"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronUp, Lightbulb, Globe, Award } from "lucide-react";
import { useState, useEffect } from "react";

const imgImageHcmuteCampus = "/trang-chu-home/banner_trangchu.jpg";

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
    <div className="min-h-[calc(100vh-96px)]">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
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
          {/* No Overlay to keep original image brightness */}
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

      {/* ─── Kỷ Yếu & Lời Tri Ân Section ─────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "calc(var(--spacing-section) * 0.5)",
          backgroundColor: "#f0f9ff",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                borderRadius: "24px",
                border: "4px solid white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src="/ky-yeu/banner_kyyeu.jpg"
                alt="25 năm thành lập Khoa CNTT"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(32px, 4vw, 42px)",
                  color: "#1e3a8a",
                }}
              >
                Kỷ niệm 25 năm thành lập FIT-HCMUTE
              </h2>
              <p
                className="mb-8"
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#475569",
                }}
              >
                Năm 2026 đánh dấu cột mốc ¼ thế kỷ hình thành và phát triển của Khoa Công nghệ Thông tin (2001 - 2026). Một chặng đường đầy tự hào với những thế hệ kỹ sư công nghệ tài năng, nhiệt huyết đã và đang góp phần xây dựng đất nước.
              </p>

              <div
                className="relative p-8 rounded-2xl bg-white shadow-sm border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div
                  className="absolute -top-4 -left-2 text-6xl opacity-20"
                  style={{ color: "#2563EB", fontFamily: "serif" }}
                >
                  "
                </div>
                <p
                  className="italic mb-6 relative z-10"
                  style={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    color: "#334155",
                  }}
                >
                  Nhân dịp kỷ niệm 25 năm thành lập, thay mặt Ban chủ nhiệm Khoa, xin gửi lời tri ân sâu sắc đến các thế hệ giảng viên, sinh viên và đối tác. Chúc mừng sự kiện trọng đại này của chúng ta. Hãy cùng nhau viết tiếp nên những trang sử mới đầy tự hào của FIT-HCMUTE!
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-1 rounded-full"
                    style={{ backgroundColor: "#2563EB" }}
                  />
                  <div>
                    <p className="font-bold text-lg" style={{ color: "#1e3a8a" }}>
                      Trưởng Khoa
                    </p>
                    <p style={{ color: "#64748b", fontSize: "14px" }}>
                      TS. Lê Văn Vinh
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "calc(var(--spacing-section) * 0.5)",
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
              Kết nối và chia sẻ
            </h2>
            <p
              className="mb-8 max-w-5xl mx-auto"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#64748b",
              }}
            >
              Hãy cùng tạo nên những kỷ niệm đẹp trong dịp kỷ niệm 25 năm thành lập FIT-HCMUTE
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
