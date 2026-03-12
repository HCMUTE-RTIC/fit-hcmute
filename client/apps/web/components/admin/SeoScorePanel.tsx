"use client";

import { useMemo } from "react";

interface SeoScorePanelProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  thumbnail: string;
  slug: string;
  content: any; // EditorJS output hoặc null
}

interface CheckItem {
  label: string;
  pass: boolean;
  warn?: boolean; // vàng
  points: number;
}

function extractText(content: any): string {
  if (!content) return "";
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    return (parsed?.blocks ?? [])
      .map((b: any) => b.data?.text ?? b.data?.caption ?? "")
      .join(" ")
      .toLowerCase();
  } catch {
    return "";
  }
}

function containsKeyword(text: string, kw: string): boolean {
  if (!kw.trim()) return false;
  return text.toLowerCase().includes(kw.toLowerCase().trim());
}

export function SeoScorePanel({
  title,
  metaTitle,
  metaDescription,
  focusKeyword,
  thumbnail,
  slug,
  content,
}: SeoScorePanelProps) {
  const kw = focusKeyword.trim().toLowerCase();
  const contentText = extractText(content);

  const checks: CheckItem[] = useMemo(() => [
    {
      label: "Focus keyword đã được đặt",
      pass: kw.length > 0,
      points: 15,
    },
    {
      label: "Tiêu đề bài viết độ dài 20–70 ký tự",
      pass: title.length >= 20 && title.length <= 70,
      warn: title.length > 0 && (title.length < 20 || title.length > 70),
      points: 10,
    },
    {
      label: "Tiêu đề chứa focus keyword",
      pass: kw.length > 0 && containsKeyword(title, kw),
      points: 10,
    },
    {
      label: "Meta title độ dài 10–60 ký tự",
      pass: metaTitle.length >= 10 && metaTitle.length <= 60,
      warn: metaTitle.length > 0 && (metaTitle.length < 10 || metaTitle.length > 60),
      points: 10,
    },
    {
      label: "Meta title chứa focus keyword",
      pass: kw.length > 0 && containsKeyword(metaTitle, kw),
      points: 10,
    },
    {
      label: "Meta description độ dài 50–160 ký tự",
      pass: metaDescription.length >= 50 && metaDescription.length <= 160,
      warn: metaDescription.length > 0 && (metaDescription.length < 50 || metaDescription.length > 160),
      points: 10,
    },
    {
      label: "Meta description chứa focus keyword",
      pass: kw.length > 0 && containsKeyword(metaDescription, kw),
      points: 5,
    },
    {
      label: "Nội dung bài viết chứa focus keyword",
      pass: kw.length > 0 && containsKeyword(contentText, kw),
      points: 10,
    },
    {
      label: "Ảnh bìa (thumbnail) đã có",
      pass: thumbnail.length > 0,
      points: 15,
    },
    {
      label: "Đường dẫn (slug) đã có",
      pass: slug.length > 0,
      points: 5,
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [title, metaTitle, metaDescription, focusKeyword, thumbnail, slug, contentText, kw]);

  const score = useMemo(
    () => checks.reduce((sum, c) => sum + (c.pass ? c.points : 0), 0),
    [checks]
  );

  const { color, bg, label: scoreLabel } = useMemo(() => {
    if (score >= 90) return { color: "text-green-600", bg: "bg-green-500", label: "Xuất sắc" };
    if (score >= 70) return { color: "text-yellow-600", bg: "bg-yellow-400", label: "Tốt" };
    if (score >= 40) return { color: "text-orange-500", bg: "bg-orange-400", label: "Trung bình" };
    return { color: "text-red-500", bg: "bg-red-500", label: "Cần cải thiện" };
  }, [score]);

  const circumference = 2 * Math.PI * 28;
  const dash = (score / 100) * circumference;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">Điểm SEO</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tự động cập nhật khi bạn nhập</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Score circle */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
              <circle cx="36" cy="36" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-700" />
              <circle
                cx="36" cy="36" r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                className={bg.replace("bg-", "text-")}
                style={{ transition: "stroke-dasharray 0.4s ease" }}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${color}`}>
              {score}
            </span>
          </div>
          <div>
            <p className={`text-base font-semibold ${color}`}>{scoreLabel}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{score}/100 điểm</p>
          </div>
        </div>

        {/* Checks list */}
        <ul className="space-y-2">
          {checks.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {c.pass ? (
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-green-600" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              ) : c.warn ? (
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-yellow-600" viewBox="0 0 10 10" fill="none">
                    <path d="M5 3v3M5 7.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              ) : (
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-red-500" viewBox="0 0 10 10" fill="none">
                    <path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              )}
              <span className={c.pass ? "text-slate-600 dark:text-slate-300" : c.warn ? "text-yellow-700 dark:text-yellow-400" : "text-slate-500 dark:text-slate-400"}>
                {c.label}
                {!c.pass && !c.warn && (
                  <span className="ml-1 text-xs text-slate-400 dark:text-slate-500">(+{c.points} điểm)</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        {/* Validate tools */}
        {slug && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Kiểm tra sau khi publish
            </p>
            <div className="space-y-2">
              <ValidateLink
                href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || "https://25nam.fit.hcmute.edu.vn"}/tin-tuc/${slug}`)}`}
                label="PageSpeed / Lighthouse"
                desc="Chấm SEO, hiệu năng, a11y"
                color="text-blue-600 dark:text-blue-400"
              />
              <ValidateLink
                href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || "https://25nam.fit.hcmute.edu.vn"}/tin-tuc/${slug}`)}`}
                label="Rich Results Test"
                desc="Kiểm tra JSON-LD structured data"
                color="text-green-600 dark:text-green-400"
              />
              <ValidateLink
                href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || "https://25nam.fit.hcmute.edu.vn"}/tin-tuc/${slug}`)}`}
                label="Facebook OG Debugger"
                desc="Preview ảnh khi share Facebook"
                color="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">
              Chỉ hoạt động sau khi bài đã được publish.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ValidateLink({ href, label, desc, color }: { href: string; label: string; desc: string; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 rounded-md px-3 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
    >
      <div>
        <span className={`text-xs font-medium ${color}`}>{label}</span>
        <p className="text-xs text-slate-400 dark:text-slate-500">{desc}</p>
      </div>
      <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0" viewBox="0 0 14 14" fill="none">
        <path d="M3 11L11 3M11 3H7M11 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}
