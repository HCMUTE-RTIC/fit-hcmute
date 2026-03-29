"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Lightbulb,
  Award,
  GraduationCap,
  Target,
  Heart,
} from "lucide-react";

// ─── Training Programs ─────────────────────────────────────────────────────────
const programs = [
  {
    level: "Đại học",
    description:
      "Chương trình đào tạo đại học với các ngành công nghệ thông tin hiện đại.",
    items: [
      {
        name: "Ngành Công nghệ Thông tin",
        link: "https://fit.hcmute.edu.vn/ArticleId/df646c13-b76f-444d-a1d1-95ccdfd50b47/",
      },
      {
        name: "Ngành Kỹ thuật Dữ liệu",
        link: "https://fit.hcmute.edu.vn/ArticleId/3be2b17b-a93d-4f25-b4ed-160a9469c456/",
      },
      {
        name: "Ngành An toàn Thông tin",
        link: "https://fit.hcmute.edu.vn/ArticleId/3a56cbbc-1696-49dd-a3ca-7404e617520b/",
      },
      {
        name: "Các môn tương đương",
        link: "https://fit.hcmute.edu.vn/ArticleId/2fdffaed-c283-4ebe-81d2-bd911f8a66be/bang-mon-hoc-tuong-duong-ctdt-150tc-ctdt-132tc",
      },
    ],
  },
  {
    level: "Sau đại học",
    description:
      "Chương trình đào tạo sau đại học với định hướng nghiên cứu chuyên sâu.",
    items: [
      {
        name: "Thạc sĩ Khoa học Máy tính",
        link: "https://fit.hcmute.edu.vn/ArticleId/dc18ed59-d8ea-4c6c-8e41-d42d3e17f29b/",
      },
      {
        name: "Tiến sĩ Khoa học Máy tính",
        link: "https://fit.hcmute.edu.vn/ArticleId/3cdce6fb-53ec-4556-abfa-726e9b9aab35/chuong-trinh-dao-tao-ts-khmt",
      },
    ],
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: "25", label: "Năm thành lập", suffix: "+" },
  { value: "5000", label: "Sinh viên & Cựu SV", suffix: "+" },
  { value: "60", label: "Giảng viên", suffix: "+" },
  { value: "3", label: "Chương trình ĐH", suffix: "" },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GioiThieu() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Full-width photo + overlay text
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/CuuSV24-1.jpg"
            alt="Khoa Công nghệ Thông tin HCMUTE"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "rgba(147,197,253,0.9)" }}
            >
              Trường Đại học Công Nghệ Kỹ thuật TP.HCM
            </p>
            <h1
              className="font-extrabold leading-tight mb-4"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                color: "white",
              }}
            >
              Khoa Công nghệ Thông tin
            </h1>
            <p
              className="max-w-2xl leading-relaxed"
              style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}
            >
              Thành lập năm 2001 — 25 năm đào tạo nguồn nhân lực CNTT chất
              lượng cao, phát triển nghiên cứu khoa học ứng dụng và hội nhập
              quốc tế.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1e3a8a" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-10"
                style={{
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                }}
              >
                <p
                  className="font-extrabold mb-1"
                  style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "white" }}
                >
                  {s.value}
                  {s.suffix && (
                    <span style={{ color: "rgba(147,197,253,0.8)" }}>
                      {s.suffix}
                    </span>
                  )}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SỨ MỆNH & TẦM NHÌN — 2 col with image
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 20px 50px -12px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src="/gioi-thieu/CNTT_1.jpg"
                alt="Khoa Công nghệ Thông tin"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p
                className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#2563eb" }}
              >
                Về chúng tôi
              </p>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  color: "#1e293b",
                }}
              >
                Sứ mệnh & Tầm nhìn
              </h2>

              <div className="space-y-6">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#dbeafe" }}
                    >
                      <Target size={20} style={{ color: "#2563eb" }} />
                    </div>
                    <h3
                      className="font-bold"
                      style={{ fontSize: 18, color: "#1e293b" }}
                    >
                      Sứ mệnh
                    </h3>
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}
                  >
                    Đào tạo nguồn nhân lực công nghệ thông tin chất lượng cao,
                    có năng lực chuyên môn vững vàng, tư duy sáng tạo và khả
                    năng thích ứng với sự phát triển không ngừng của công nghệ.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#dbeafe" }}
                    >
                      <Globe size={20} style={{ color: "#2563eb" }} />
                    </div>
                    <h3
                      className="font-bold"
                      style={{ fontSize: 18, color: "#1e293b" }}
                    >
                      Tầm nhìn
                    </h3>
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}
                  >
                    Trở thành đơn vị đào tạo và nghiên cứu CNTT hàng đầu khu
                    vực, hội nhập quốc tế, đóng góp tích cực vào sự phát triển
                    công nghệ và chuyển đổi số quốc gia.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          GIÁ TRỊ CỐT LÕI — 3 cards
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#f8fafc",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "#2563eb" }}
            >
              Triết lý giáo dục
            </p>
            <h2
              className="font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "#1e293b",
              }}
            >
              Giá trị cốt lõi
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: 16, color: "#64748b" }}>
              Ba giá trị nền tảng định hình nên thế hệ kỹ sư FIT-HCMUTE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Nhân bản",
                subtitle: "Lấy con người làm trung tâm",
                description:
                  "Đặt con người và giá trị con người lên hàng đầu. Không chỉ đào tạo tri thức mà còn hình thành nhân cách toàn diện: đạo đức, trách nhiệm xã hội và ý thức công dân.",
                accent: "#dc2626",
                bg: "#fef2f2",
              },
              {
                icon: Lightbulb,
                title: "Sáng tạo",
                subtitle: "Động lực của đổi mới",
                description:
                  "Thúc đẩy tư duy đổi mới thông qua học đi đôi với hành, nghiên cứu khoa học và khởi nghiệp. Sinh viên được khuyến khích biến ý tưởng thành sản phẩm thực tế.",
                accent: "#2563eb",
                bg: "#eff6ff",
              },
              {
                icon: Globe,
                title: "Hội nhập",
                subtitle: "Vươn tầm quốc tế",
                description:
                  "Đào tạo theo chuẩn quốc tế, tăng cường hợp tác với các trường đại học và doanh nghiệp toàn cầu. Trang bị ngoại ngữ, kỹ năng mềm và trải nghiệm đa văn hóa.",
                accent: "#1e3a8a",
                bg: "#eef2ff",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="bg-white rounded-2xl p-8 flex flex-col"
                style={{
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px -4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: card.bg }}
                >
                  <card.icon
                    size={28}
                    style={{ color: card.accent }}
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-bold mb-1"
                  style={{ fontSize: 22, color: "#1e293b" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: card.accent }}
                >
                  {card.subtitle}
                </p>

                {/* Description */}
                <p
                  className="leading-relaxed flex-1"
                  style={{ fontSize: 15, lineHeight: 1.7, color: "#64748b" }}
                >
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ĐIỂM NỔI BẬT — Horizontal cards
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "#2563eb" }}
            >
              Tại sao chọn FIT
            </p>
            <h2
              className="font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "#1e293b",
              }}
            >
              Điểm nổi bật
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "Chương trình đào tạo",
                desc: "Cập nhật liên tục theo xu hướng công nghệ mới nhất, đạt chuẩn AUN-QA.",
              },
              {
                icon: Users,
                title: "Đội ngũ giảng viên",
                desc: "Giàu kinh nghiệm, nhiều tiến sĩ được đào tạo tại các trường đại học hàng đầu thế giới.",
              },
              {
                icon: Globe,
                title: "Hợp tác quốc tế",
                desc: "Liên kết với các trường đại học và doanh nghiệp công nghệ hàng đầu trong và ngoài nước.",
              },
              {
                icon: Award,
                title: "Nghiên cứu & Đổi mới",
                desc: "Nhiều đề tài nghiên cứu ứng dụng, sáng kiến công nghệ được công nhận trong và ngoài nước.",
              },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl"
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  <h.icon size={24} style={{ color: "#2563eb" }} />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: 16, color: "#1e293b" }}
                  >
                    {h.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}
                  >
                    {h.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CHƯƠNG TRÌNH ĐÀO TẠO — Dark section with bg image
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/2.jpg"
            alt="Chương trình đào tạo"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,58,138,0.88) 100%)",
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "rgba(147,197,253,0.8)" }}
            >
              Đào tạo
            </p>
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "white",
              }}
            >
              Chương trình đào tạo
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}
            >
              Khám phá các chương trình đào tạo kỹ sư chất lượng cao.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {programs.map((prog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap
                    size={20}
                    style={{ color: "rgba(147,197,253,0.9)" }}
                  />
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "rgba(147,197,253,0.9)" }}
                  >
                    Chương trình
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-white mb-2"
                  style={{ fontSize: 28 }}
                >
                  {prog.level}
                </h3>
                <p
                  className="mb-6"
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  {prog.description}
                </p>

                {/* Links */}
                <ul className="space-y-3">
                  {prog.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group transition-all duration-200"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "white")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.8)")
                        }
                      >
                        <ArrowRight
                          size={14}
                          className="shrink-0"
                          style={{ color: "rgba(147,197,253,0.7)" }}
                        />
                        <span
                          className="font-medium"
                          style={{ fontSize: 15 }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA — Liên hệ
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center rounded-3xl py-16 px-8"
            style={{
              backgroundColor: "#f0f9ff",
              border: "1px solid #dbeafe",
            }}
          >
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#1e293b",
              }}
            >
              Tìm hiểu thêm về Khoa CNTT
            </h2>
            <p
              className="max-w-xl mx-auto mb-8"
              style={{ fontSize: 16, color: "#64748b" }}
            >
              Khám phá hành trình 25 năm phát triển, những thành tựu nổi bật và
              các hoạt động đào tạo của Khoa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/hanh-trinh-25-nam"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#2563eb",
                  fontSize: 15,
                  boxShadow: "0 4px 14px -3px rgba(37,99,235,0.4)",
                }}
              >
                Hành trình 25 năm
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/thanh-tuu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "white",
                  color: "#1e293b",
                  fontSize: 15,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px -2px rgba(0,0,0,0.06)",
                }}
              >
                Thành tựu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
