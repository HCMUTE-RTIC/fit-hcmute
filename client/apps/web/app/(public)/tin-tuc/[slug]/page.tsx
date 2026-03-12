import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ─── Fetch article (SSR, tăng viewCount) ──────────────────────────────────────
async function getArticle(slug: string) {
  const res = await fetch(`${API_URL}/api/articles/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// ─── EditorJS block renderer ──────────────────────────────────────────────────
function renderBlocks(content: string) {
  let blocks: any[] = [];
  try {
    blocks = JSON.parse(content)?.blocks ?? [];
  } catch {
    return <p className="text-slate-600">{content}</p>;
  }

  return (
    <>
      {blocks.map((block: any, i: number) => {
        switch (block.type) {
          case "header": {
            const Tag = `h${block.data.level ?? 2}` as keyof JSX.IntrinsicElements;
            return (
              <Tag
                key={i}
                className="font-bold text-slate-900 mt-8 mb-3"
                style={{ fontSize: block.data.level <= 2 ? 24 : block.data.level <= 3 ? 20 : 18 }}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                className="text-slate-700 leading-relaxed mb-4"
                style={{ fontSize: 17, lineHeight: "1.8" }}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          case "list": {
            const Tag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={`mb-4 pl-6 ${block.data.style === "ordered" ? "list-decimal" : "list-disc"} text-slate-700`}
                style={{ fontSize: 17, lineHeight: "1.8" }}
              >
                {block.data.items.map((item: any, j: number) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: typeof item === "string" ? item : item.content ?? "" }} />
                ))}
              </Tag>
            );
          }
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-blue-500 pl-5 my-6 text-slate-600 italic"
                style={{ fontSize: 17 }}
              >
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && (
                  <footer className="mt-2 text-sm text-slate-400 not-italic">— {block.data.caption}</footer>
                )}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative w-full overflow-hidden rounded-xl" style={{ maxHeight: 520 }}>
                  <img
                    src={block.data.file?.url}
                    alt={block.data.caption || ""}
                    className="w-full object-cover rounded-xl"
                    style={{ maxHeight: 520 }}
                  />
                </div>
                {block.data.caption && (
                  <figcaption className="text-center text-sm text-slate-400 italic mt-2">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "embed":
            return (
              <div key={i} className="my-6 aspect-video">
                <iframe
                  src={block.data.embed}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article || article.status !== "PUBLISHED") notFound();

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "";

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero / Thumbnail ─────────────────────────────────────────────── */}
      {article.thumbnail && (
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 40vw, 480px)" }}>
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized={article.thumbnail.startsWith("http")}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-[800px] mx-auto px-6 pb-8">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-blue-600 mb-3">
              {article.category === "EVENT" ? "Sự kiện" : "Tin tức"}
            </span>
          </div>
        </div>
      )}

      {/* ─── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-[800px] mx-auto px-6 py-10">
        {/* Back link */}
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm mb-6"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Quay lại Tin tức
        </Link>

        {/* Title */}
        <h1
          className="font-extrabold text-slate-900 mb-4"
          style={{ fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.3 }}
        >
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
          {publishedDate && <span>{publishedDate}</span>}
          {article.author?.name && (
            <>
              <span>·</span>
              <span>{article.author.name}</span>
            </>
          )}
          <span>·</span>
          <span>{article.viewCount} lượt xem</span>
        </div>

        {/* Summary */}
        {article.summary && (
          <p
            className="text-slate-500 border-l-4 border-blue-200 pl-4 my-6 italic"
            style={{ fontSize: 17, lineHeight: "1.7" }}
          >
            {article.summary}
          </p>
        )}

        <hr className="border-slate-100 mb-8" />

        {/* Body */}
        <article className="leading-relaxed">
          {article.content ? renderBlocks(article.content) : (
            <p className="text-slate-400 italic">Bài viết chưa có nội dung.</p>
          )}
        </article>
      </div>
    </div>
  );
}
