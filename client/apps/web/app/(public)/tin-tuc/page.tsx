"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const imgFeatured = "/temp.jpg";
const imgGoogleCloud = "/temp.jpg";
const imgIoT = "/temp.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Article {
  id: number;
  image: string;
  badge: string;
  date: string;
  readTime: string;
  title: string;
  excerpt?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const featured: Article = {
  id: 1,
  image: imgFeatured,
  badge: "Sự kiện",
  date: "20/02/2026",
  readTime: "5 phút đọc",
  title: "Khoa CNTT tổ chức Lễ kỷ niệm 25 năm thành lập long trọng",
  excerpt:
    "Sự kiện kỷ niệm 25 năm thành lập Khoa CNTT sẽ diễn ra vào ngày 15/03/2025 với sự tham dự của lãnh đạo nhà trường, cựu sinh viên và đối tác...",
};

const secondary: Article = {
  id: 2,
  image: imgIoT,
  badge: "Cơ sở vật chất",
  date: "10/02/2026",
  readTime: "4 phút đọc",
  title: "Khai trương Phòng thí nghiệm IoT và Smart City hiện đại",
  excerpt:
    "Phòng lab mới với trang thiết bị hiện đại nhất, phục vụ nghiên cứu và đào tạo về Internet of Things...",
};

const smallArticles: Article[] = [
  {
    id: 3,
    image: imgGoogleCloud,
    badge: "Hợp tác",
    date: "12/02/2026",
    readTime: "6 phút đọc",
    title: "Ký kết hợp tác với Google Cloud về đào tạo Cloud Computing",
    excerpt:
      "Chương trình đào tạo sẽ trang bị cho sinh viên những kỹ năng thực tế về điện toán đám mây, được chứng nhận bởi Google...",
  },
  {
    id: 4,
    image: imgGoogleCloud,
    badge: "Hợp tác",
    date: "12/02/2026",
    readTime: "6 phút đọc",
    title: "Ký kết hợp tác với Google Cloud về đào tạo Cloud Computing",
    excerpt:
      "Chương trình đào tạo sẽ trang bị cho sinh viên những kỹ năng thực tế về điện toán đám mây, được chứng nhận bởi Google...",
  },
  {
    id: 5,
    image: imgGoogleCloud,
    badge: "Hợp tác",
    date: "12/02/2026",
    readTime: "6 phút đọc",
    title: "Ký kết hợp tác với Google Cloud về đào tạo Cloud Computing",
    excerpt:
      "Chương trình đào tạo sẽ trang bị cho sinh viên những kỹ năng thực tế về điện toán đám mây, được chứng nhận bởi Google...",
  },
];

// ─── Shared icon components ───────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.33333 1.33333V4" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M10.6667 1.33333V4" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 6.66667H14" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <clipPath id="clip-clock">
        <rect width="16" height="16" fill="white" />
      </clipPath>
      <g clipPath="url(#clip-clock)">
        <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M8 4V8L10.6667 9.33333" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
    </svg>
  );
}

// ─── Meta Row ─────────────────────────────────────────────────────────────────
function Meta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <CalendarIcon />
        <span style={{ fontSize: 14, color: "#64748b", lineHeight: "20px" }}>{date}</span>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon />
        <span style={{ fontSize: 14, color: "#64748b", lineHeight: "20px" }}>{readTime}</span>
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label }: { label: string }) {
  return (
    <span
      className="absolute left-4 top-4 px-3 py-0.5 rounded-full font-semibold text-white"
      style={{ fontSize: 14, backgroundColor: "#2563eb", lineHeight: "20px" }}
    >
      {label}
    </span>
  );
}

// ─── Read More Link ───────────────────────────────────────────────────────────
function ReadMore() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold" style={{ fontSize: 16, color: "#2563eb" }}>
        Đọc thêm
      </span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3.75 9H14.25" stroke="#2563EB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M9 3.75L14.25 9L9 14.25" stroke="#2563EB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── Featured Card (large, left column) ──────────────────────────────────────
function FeaturedCard({ article }: { article: Article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
      style={{
        borderRadius: 16,
        border: "1px solid #f3f4f6",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 323 }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
        <Badge label={article.badge} />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <Meta date={article.date} readTime={article.readTime} />
        <h3
          className="font-bold leading-tight"
          style={{ fontSize: 18, color: "#1e3a8a", lineHeight: "27px" }}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p
            className="leading-relaxed"
            style={{ fontSize: 16, color: "#64748b", lineHeight: "24px" }}
          >
            {article.excerpt}
          </p>
        )}
        <ReadMore />
      </div>
    </motion.article>
  );
}

// ─── Secondary Card (right column, shorter) ──────────────────────────────────
function SecondaryCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
      style={{
        borderRadius: 16,
        border: "1px solid #f3f4f6",
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 192 }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
        <Badge label={article.badge} />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <Meta date={article.date} readTime={article.readTime} />
        <h3
          className="font-bold leading-tight"
          style={{ fontSize: 18, color: "#1e3a8a", lineHeight: "27px" }}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p
            className="leading-relaxed line-clamp-3"
            style={{ fontSize: 16, color: "#64748b", lineHeight: "24px" }}
          >
            {article.excerpt}
          </p>
        )}
        <ReadMore />
      </div>
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function News() {
  return (
    <div className="min-h-screen">
      {/* ─── Hero Section ────────────────────────────────────────────────── */}
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
            className="text-center flex flex-col gap-6"
          >
            <h1
              className="font-extrabold"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: "72px",
                color: "#1e3a8a",
              }}
            >
              TIN TỨC &amp; SỰ KIỆN
            </h1>
            <p
              style={{
                fontSize: 20,
                lineHeight: "32.5px",
                color: "#64748b",
              }}
            >
              Cập nhật những hoạt động mới nhất của Khoa CNTT và chuỗi sự kiện kỷ niệm 25 năm
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Article Grid ─────────────────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">
          {/* Row 1: Featured (large) + Secondary (IoT) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <FeaturedCard article={featured} />
            <SecondaryCard article={secondary} delay={0.15} />
          </div>

          {/* Row 2: Three equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smallArticles.map((article, idx) => (
              <SecondaryCard key={article.id} article={article} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
