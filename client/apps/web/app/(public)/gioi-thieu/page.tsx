"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Lightbulb,
} from "lucide-react";

// ─── Highlights ────────────────────────────────────────────────────────────────
const highlights = [
  {
    Icon: BookOpen,
    title: "Chương trình đào tạo",
    desc: "Cập nhật liên tục theo xu hướng công nghệ mới",
  },
  {
    Icon: Users,
    title: "Đội ngũ giảng viên",
    desc: "Giàu kinh nghiệm, nhiều tiến sĩ, thạc sĩ được đào tạo tại nước ngoài",
  },
  {
    Icon: Globe,
    title: "Hợp tác quốc tế",
    desc: "Liên kết với các trường đại học và doanh nghiệp hàng đầu Việt Nam và khu vực",
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
    description: "Chương trình đào tạo đại học với các ngành công nghệ thông tin hiện đại",
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
    description: "Chương trình đào tạo sau đại học với định hướng nghiên cứu chuyên sâu",
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

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GioiThieu() {
  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* ─── Section 1: Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/CuuSV24-1.jpg"
            alt="Giới thiệu Khoa CNTT"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 w-full relative z-10">
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
                color: "#ffffff",
              }}
            >
              VỀ KHOA CÔNG NGHỆ THÔNG TIN
            </h1>
            <p
              className="max-w-3xl mx-auto leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "29.25px",
                color: "#e2e8f0",
              }}
            >
              Được thành lập năm 2001, Khoa Công Nghệ Thông Tin - Trường Đại học Công nghệ Kỹ
              thuật TP.HCM là một trong những đơn vị đào tạo công nghệ thông tin hàng đầu tại Việt
              Nam, với sứ mệnh đào tạo nguồn nhân lực chất lượng cao và phát triển nghiên cứu khoa
              học ứng dụng
            </p>
          </motion.div>
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
                    className="w-24 h-2 rounded-full"
                    style={{ backgroundColor: "#dc2626" }}
                  />
                </div>
                <p
                  className="font-extrabold mb-4"
                  style={{ fontSize: 24, color: "#1e3a8a", letterSpacing: "0.02em" }}
                >
                  SỨ MẠNG
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 18, color: "#64748b", lineHeight: "1.6" }}
                >
                  Khoa Công nghệ Thông tin, trường Đại học Công nghệ Kỹ thuật TP. HCM là nơi cung cấp nguồn nhân lực chất lượng cao đáp ứng nhu cầu của thị trường lao động, thực hiện nghiên cứu khoa học và chuyển giao công nghệ về công nghệ thông tin và các lĩnh vực liên quan.
                </p>
              </div>

              {/* Giá trị CORE */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-24 h-2 rounded-full"
                    style={{ backgroundColor: "#dc2626" }}
                  />
                </div>
                <p
                  className="font-extrabold mb-4"
                  style={{ fontSize: 24, color: "#1e3a8a", letterSpacing: "0.02em" }}
                >
                  CÁC GIÁ TRỊ CƠ BẢN
                </p>
                <div
                  className="leading-relaxed space-y-2 text-[#64748b]"
                  style={{ fontSize: 16 }}
                >
                  <p>Các giá trị cơ bản của một nền giáo dục tiên tiến; hiện đại đã, đang và sẽ được Trường Đại học Công nghệ Kỹ thuật TPHCM tôn vinh, gìn giữ, phát huy một cách sáng tạo:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Gìn giữ và phát huy các giá trị truyền thống nhân văn của dân tộc Việt Nam</li>
                    <li>Nâng đỡ tài năng và tính sáng tạo; chú trọng đào tạo kỹ năng và trách nhiệm nghề nghiệp</li>
                    <li>Tôn trọng lợi ích của người học và của cộng đồng. Xây dựng xã hội học tập</li>
                    <li>Đề cao chất lượng, hiệu quả và sự đổi mới trong các hoạt động. Hội nhập, hợp tác và chia sẻ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right column: Tầm nhìn */}
            <div className="p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-24 h-2 rounded-full"
                  style={{ backgroundColor: "#dc2626" }}
                />
              </div>
              <p
                className="font-extrabold mb-6"
                style={{ fontSize: 24, color: "#1e3a8a", letterSpacing: "0.02em" }}
              >
                TẦM NHÌN
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 18, color: "#64748b", lineHeight: "1.6" }}
              >
                Khoa Công nghệ Thông tin, trường Đại học Công nghệ Kỹ thuật TP. HCM sẽ trở thành đơn vị đào tạo, nghiên cứu khoa học và đổi mới sáng tạo hàng đầu Việt Nam trong lĩnh vực Công nghệ Thông tin, từng bước vươn đến tầm khu vực và thế giới.
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
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/2.jpg"
            alt="Chương trình đào tạo"
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4 text-white"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "72px" }}
            >
              CHƯƠNG TRÌNH ĐÀO TẠO
            </h2>
            <p className="text-white/80" style={{ fontSize: 20 }}>
              Khám phá các chương trình đào tạo kỹ sư chất lượng cao của FIT-HCMUTE
            </p>
          </motion.div>

          {/* 2 Program Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {programs.map((prog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                <div
                  className="rounded-3xl p-8 h-full"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Level Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                    style={{
                      backgroundColor: "rgba(37, 99, 235, 0.9)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <BookOpen size={20} color="white" />
                    <span className="font-bold text-white" style={{ fontSize: 14 }}>
                      CHƯƠNG TRÌNH
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-white mb-3"
                    style={{ fontSize: 36, lineHeight: "1.2" }}
                  >
                    {prog.level}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-white/90 mb-6"
                    style={{ fontSize: 16, lineHeight: "1.6" }}
                  >
                    {prog.description}
                  </p>

                  {/* Items List - Clickable */}
                  <ul className="space-y-3">
                    {prog.items.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-white/90 hover:text-white group transition-all duration-300 hover:translate-x-2"
                        >
                          <ArrowRight size={16} className="flex-shrink-0 text-blue-400 group-hover:text-blue-300" />
                          <span
                            className="transition-all"
                            style={{ fontSize: 15, fontWeight: 500 }}
                          >
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
