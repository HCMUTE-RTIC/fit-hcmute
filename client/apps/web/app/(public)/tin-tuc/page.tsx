"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticlesService, Article } from "@/services/articles.service";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function estimateReadTime(content: string) {
  try {
    const blocks = JSON.parse(content)?.blocks ?? [];
    const text = blocks.map((b: any) => b.data?.text ?? "").join(" ");
    const words = text.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} phút đọc`;
  } catch {
    return "3 phút đọc";
  }
}

function categoryLabel(cat: string) {
  return cat === "EVENT" ? "Sự kiện" : "Tin tức";
}

const FALLBACK = "/temp.jpg";

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

// ─── Cards ────────────────────────────────────────────────────────────────────
function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link href={`/tin-tuc/${article.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow h-full"
        style={{ borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
      >
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 323 }}>
          <Image
            src={article.thumbnail || FALLBACK}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized={!!(article.thumbnail?.startsWith("http"))}
          />
          <Badge label={categoryLabel(article.category)} />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <Meta date={formatDate(article.publishedAt)} readTime={estimateReadTime(article.content)} />
          <h3 className="font-bold leading-tight" style={{ fontSize: 18, color: "#1e3a8a", lineHeight: "27px" }}>
            {article.title}
          </h3>
          {article.summary && (
            <p className="leading-relaxed" style={{ fontSize: 16, color: "#64748b", lineHeight: "24px" }}>
              {article.summary}
            </p>
          )}
          <ReadMore />
        </div>
      </motion.article>
    </Link>
  );
}

function SecondaryCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <Link href={`/tin-tuc/${article.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow h-full"
        style={{ borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
      >
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 192 }}>
          <Image
            src={article.thumbnail || FALLBACK}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized={!!(article.thumbnail?.startsWith("http"))}
          />
          <Badge label={categoryLabel(article.category)} />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <Meta date={formatDate(article.publishedAt)} readTime={estimateReadTime(article.content)} />
          <h3 className="font-bold leading-tight" style={{ fontSize: 18, color: "#1e3a8a", lineHeight: "27px" }}>
            {article.title}
          </h3>
          {article.summary && (
            <p className="leading-relaxed line-clamp-3" style={{ fontSize: 16, color: "#64748b", lineHeight: "24px" }}>
              {article.summary}
            </p>
          )}
          <ReadMore />
        </div>
      </motion.article>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard({ height = 192 }: { height?: number }) {
  return (
    <div className="animate-pulse bg-white rounded-2xl overflow-hidden border border-slate-100">
      <div className="bg-slate-100" style={{ height }} />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-full" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ArticlesService.findAll()
      .then((data) => setArticles(data.filter((a) => a.status === "PUBLISHED")))
      .finally(() => setLoading(false));
  }, []);

  const featured = articles.find((a) => a.isPinned) ?? articles[0];
  const rest = articles.filter((a) => a !== featured);
  const secondary = rest[0];
  const smallArticles = rest.slice(1, 4);

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section 
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/thuvienkiniem1.jpg"
            alt="Tin tức sự kiện Khoa CNTT"
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
            className="text-center flex flex-col gap-6"
          >
            <h1 className="font-extrabold" style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "72px", color: "#ffffff" }}>
              TIN TỨC &amp; SỰ KIỆN
            </h1>
            <p style={{ fontSize: 20, lineHeight: "32.5px", color: "#e2e8f0" }}>
              Cập nhật những hoạt động mới nhất của Khoa CNTT và chuỗi sự kiện kỷ niệm 25 năm
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Article Grid ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">
          {loading ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <SkeletonCard height={323} />
                <SkeletonCard height={192} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonCard /><SkeletonCard /><SkeletonCard />
              </div>
            </>
          ) : articles.length === 0 ? (
            <p className="text-center text-slate-400 py-16">Chưa có bài viết nào được đăng.</p>
          ) : (
            <>
              {/* Row 1: Featured + Secondary */}
              {(featured || secondary) && (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                  {featured && <FeaturedCard article={featured} />}
                  {secondary && <SecondaryCard article={secondary} delay={0.15} />}
                </div>
              )}

              {/* Row 2: Up to 3 cards */}
              {smallArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {smallArticles.map((article, idx) => (
                    <SecondaryCard key={article.id} article={article} delay={idx * 0.1} />
                  ))}
                </div>
              )}

              {/* Row 3+: Remaining as grid */}
              {rest.length > 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.slice(4).map((article, idx) => (
                    <SecondaryCard key={article.id} article={article} delay={idx * 0.1} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
