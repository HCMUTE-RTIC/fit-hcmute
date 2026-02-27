"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Lightbulb,
} from "lucide-react";

const imgKyKetHopTac = "/temp.jpg";

// ─── Gallery images ────────────────────────────────────────────────────────────
const galleryImages = [
  {
    src: imgKyKetHopTac,
    alt: "Ký kết hợp tác với Google Cloud về đào tạo Cloud Computing",
    badge: "Hợp tác",
  },
  {
    src: "/temp.jpg",
    alt: "Sinh viên Khoa CNTT",
    badge: "Đào tạo",
  },
  {
    src: "/temp.jpg",
    alt: "Phòng thực hành CNTT",
    badge: "Nghiên cứu",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "27,000", label: "Sinh viên tốt nghiệp" },
  { value: "52", label: "Giảng viên" },
  { value: "15", label: "Phòng thí nghiệm" },
  { value: "500", label: "Đề tài nghiên cứu" },
];

// ─── Highlights ────────────────────────────────────────────────────────────────
const highlights = [
  {
    Icon: BookOpen,
    title: "Chương trình đào tạo",
    desc: "Cập nhật liên tục theo xu hướng công nghệ mới, chuẩn quốc tế ABET",
  },
  {
    Icon: Users,
    title: "Đội ngũ giảng viên",
    desc: "Giàu kinh nghiệm, nhiều tiến sĩ, thạc sĩ được đào tạo tại nước ngoài",
  },
  {
    Icon: Globe,
    title: "Hợp tác quốc tế",
    desc: "Liên kết với các trường đại học hàng đầu Mỹ, Úc, Nhật, Hàn Quốc",
  },
  {
    Icon: Lightbulb,
    title: "Nghiên cứu & Đổi mới",
    desc: "Nhiều đề tài nghiên cứu ứng dụng, sáng kiến công nghệ được công nhận",
  },
];

// ─── Training Programs ─────────────────────────────────────────────────────────
const programs = [
  {
    level: "Đại học",
    items: [
      "Công nghệ Thông tin",
      "Khoa học Máy tính",
      "Kỹ thuật Phần mềm",
      "Hệ thống Thông tin",
    ],
  },
  {
    level: "Thạc sĩ",
    items: ["Công nghệ Thông tin", "Khoa học Máy tính", "Khoa học Dữ liệu"],
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GioiThieu() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = galleryImages.length;

  const prev = () => setCurrentSlide((c) => (c - 1 + total) % total);
  const next = () => setCurrentSlide((c) => (c + 1) % total);

  // Visible 3 images in a rotating window
  const visible = [0, 1, 2].map((offset) => galleryImages[(currentSlide + offset) % total]);

  return (
    <div className="min-h-screen" style={{ paddingTop: "140px" }}>
      {/* ─── Section 1: Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#f0f9ff",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1
              className="font-extrabold mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: "72px",
                color: "#1e3a8a",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              VỀ KHOA CÔNG NGHỆ THÔNG TIN
            </h1>
            <p
              className="max-w-3xl mx-auto leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "29.25px",
                color: "#64748b",
              }}
            >
              Được thành lập năm 2000, Khoa Công nghệ Thông tin - Trường Đại học Công nghệ Kỹ
              thuật TP.HCM là một trong những đơn vị đào tạo công nghệ thông tin hàng đầu tại Việt
              Nam, với sứ mệnh đào tạo nguồn nhân lực chất lượng cao và phát triển nghiên cứu khoa
              học ứng dụng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Đôi Nét Về Khoa ────────────────────────────────── */}
      <section
        className="bg-white overflow-hidden"
        style={{ paddingTop: "var(--spacing-section)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-bold text-center mb-12"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "72px", color: "#1e3a8a" }}
          >
            ĐÔI NÉT VỀ KHOA
          </motion.h2>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-0"
          >
            {/* Prev Arrow */}
            <button
              onClick={prev}
              className="flex-shrink-0 flex items-center justify-center border rounded-full hover:bg-gray-50 transition-colors"
              style={{ width: 48, height: 48, borderColor: "#918383" }}
            >
              <ChevronLeft size={24} style={{ color: "#918383" }} />
            </button>

            {/* 3 images */}
            <div className="flex gap-4 flex-1 overflow-hidden">
              {visible.map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-1 rounded-[17px] overflow-hidden"
                  style={{ height: 218 }}
                >
                  {img && (
                    <>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                      {/* Badge */}
                      <span
                        className="absolute left-4 top-4 px-3 py-1 rounded-full text-white font-semibold z-10"
                        style={{ fontSize: 14, backgroundColor: "#2563eb" }}
                      >
                        {img.badge}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={next}
              className="flex-shrink-0 flex items-center justify-center border rounded-full hover:bg-gray-50 transition-colors"
              style={{ width: 48, height: 48, borderColor: "#918383" }}
            >
              <ChevronRight size={24} style={{ color: "#918383" }} />
            </button>
          </motion.div>
        </div>

        {/* ── Bottom Row: Button + Stats ── */}
        <div className="flex items-stretch mt-8" style={{ minHeight: 100 }}>
          {/* "Khám phá các cột mốc" button — rounded top-right corner */}
          <Link
            href="/hanh-trinh-25-nam"
            className="flex items-center gap-2 px-8 font-extrabold hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#c3d7ff",
              borderRadius: "0 56px 0 0",
              fontSize: 20,
              background:
                "linear-gradient(to bottom right, #c3d7ff, #dce8ff)",
              minWidth: 280,
              flexShrink: 0,
            }}
          >
            <ArrowRight
              size={24}
              style={{
                background: "linear-gradient(to right, #1d4ed8, #7e22ce)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
            <span
              style={{
                background: "linear-gradient(to right, #1d4ed8, #7e22ce)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Khám phá các cột mốc
            </span>
          </Link>

          {/* Stats bar */}
          <div
            className="flex-1 flex items-center justify-around"
            style={{
              backgroundColor: "#ebf2ff",
              borderRadius: "56px 0 0 0",
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center px-4 py-6"
              >
                <div className="flex items-baseline">
                  <span
                    className="font-extrabold"
                    style={{
                      fontSize: "clamp(32px, 4vw, 48px)",
                      lineHeight: 1,
                      background: "linear-gradient(to right, #1d4ed8, #7e22ce)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-extrabold ml-0.5"
                    style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "#dc2626", lineHeight: 1 }}
                  >
                    +
                  </span>
                </div>
                <p
                  className="mt-1 text-center"
                  style={{ fontSize: 16, color: "#64748b" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Lý Tưởng ────────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-bold text-center mb-12"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "72px", color: "#1e3a8a" }}
          >
            LÝ TƯỞNG
          </motion.h2>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            style={{
              backgroundColor: "#f9f4f4",
              borderRadius: 49,
              overflow: "hidden",
            }}
          >
            {/* Left column: Sứ mệnh + Giá trị cốt lõi */}
            <div className="p-12 border-b lg:border-b-0 lg:border-r border-gray-200">
              {/* Sứ mệnh */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-20 h-1 rounded"
                    style={{ backgroundColor: "#dc2626" }}
                  />
                </div>
                <p
                  className="font-bold mb-4"
                  style={{ fontSize: 14, color: "#1e3a8a", letterSpacing: "0.05em" }}
                >
                  SỨ MỆNH
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 18, color: "#64748b", lineHeight: "27.2px" }}
                >
                  Đào tạo nguồn nhân lực công nghệ thông tin chất lượng cao, có năng lực
                  chuyên môn vững vàng, kỹ năng thực hành tốt và đạo đức nghề nghiệp cao,
                  đáp ứng nhu cầu phát triển của xã hội.
                </p>
              </div>

              {/* Giá trị cốt lõi */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-20 h-1 rounded"
                    style={{ backgroundColor: "#dc2626" }}
                  />
                </div>
                <p
                  className="font-bold mb-4"
                  style={{ fontSize: 14, color: "#1e3a8a", letterSpacing: "0.05em" }}
                >
                  GIÁ TRỊ CỐT LÕI
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 18, color: "#64748b", lineHeight: "27.2px" }}
                >
                  Nhân bản - Đặt con người làm trung tâm. Sáng tạo - Khuyến khích đổi mới
                  và tư duy sáng tạo. Hội nhập - Định hướng quốc tế và kết nối toàn cầu.
                </p>
              </div>
            </div>

            {/* Right column: Tầm nhìn */}
            <div className="p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-20 h-1 rounded"
                  style={{ backgroundColor: "#dc2626" }}
                />
              </div>
              <p
                className="font-bold mb-6"
                style={{ fontSize: 14, color: "#1e3a8a", letterSpacing: "0.05em" }}
              >
                TẦM NHÌN
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 18, color: "#64748b", lineHeight: "27.2px" }}
              >
                Trở thành đơn vị đào tạo công nghệ thông tin hàng đầu khu vực, được công
                nhận về chất lượng đào tạo, nghiên cứu khoa học và đóng góp cho sự phát
                triển của ngành CNTT Việt Nam.
              </p>

              {/* Gradient badge */}
              <div className="mt-10">
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{
                    background: "linear-gradient(to right, #1d4ed8, #7e22ce)",
                  }}
                >
                  <Users size={40} color="white" />
                  <span
                    className="font-bold text-white"
                    style={{ fontSize: 16 }}
                  >
                    Định hướng phát triển bền vững
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Điểm Nổi Bật ────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#f0f9ff",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "72px", color: "#1e3a8a" }}
            >
              ĐIỂM NỔI BẬT
            </h2>
            <p style={{ fontSize: 20, color: "#64748b" }}>
              Những yếu tố tạo nên sức mạnh của Khoa CNTT
            </p>
          </motion.div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow flex flex-col items-center"
                style={{ boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
              >
                {/* Icon circle */}
                <div
                  className="flex items-center justify-center rounded-full mb-6"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#f0f9ff",
                  }}
                >
                  <h.Icon size={32} style={{ color: "#2563eb" }} />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: 18, color: "#1e3a8a" }}
                >
                  {h.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 16, color: "#64748b" }}
                >
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: Chương Trình Đào Tạo ───────────────────────────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "72px", color: "#1e3a8a" }}
            >
              CHƯƠNG TRÌNH ĐÀO TẠO
            </h2>
            <p style={{ fontSize: 20, color: "#64748b" }}>
              Đa dạng bậc học và chuyên ngành
            </p>
          </motion.div>

          {/* 2 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="rounded-2xl p-8"
                style={{
                  border: "2px solid #2563eb",
                  boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  className="font-bold mb-6"
                  style={{ fontSize: 24, color: "#1e3a8a" }}
                >
                  {prog.level}
                </h3>
                <ul className="space-y-4">
                  {prog.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div
                        className="rounded-full flex-shrink-0"
                        style={{ width: 8, height: 8, backgroundColor: "#dc2626" }}
                      />
                      <span style={{ fontSize: 16, color: "#64748b" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
