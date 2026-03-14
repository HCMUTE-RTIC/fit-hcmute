"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { FormsService, type PublicWish } from "@/services/forms.service";

/** Tạo chữ viết tắt từ tên đầy đủ */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (
    (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "")
  ).toUpperCase();
}

/** Gradient pairs cho avatar */
const AVATAR_GRADIENTS = [
  { from: "#1D4ED8", to: "#7C3AED" },
  { from: "#0369A1", to: "#0891B2" },
  { from: "#1E3A8A", to: "#4F46E5" },
  { from: "#5B21B6", to: "#7C3AED" },
  { from: "#1D4ED8", to: "#0EA5E9" },
  { from: "#3730A3", to: "#6D28D9" },
];

function WishCard({ wish, index }: { wish: PublicWish; index: number }) {
  const name = wish.data.full_name || "Ẩn danh";
  const message = wish.data.message || "";
  const graduationYear = wish.data.graduation_year;
  const initials = getInitials(name);
  const grad = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]!;
  const uid = `qg-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.95)",
        boxShadow:
          "0 4px 24px rgba(30,58,138,0.12), 0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Gradient top accent bar — slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, ${grad.from}, ${grad.to})`,
        }}
      />

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(37,99,235,0.18), 0 8px 40px rgba(37,99,235,0.14)`,
        }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Decorative SVG quote mark with gradient fill */}
        <div
          className="absolute top-3 right-4 pointer-events-none select-none"
          aria-hidden="true"
        >
          <svg
            width="56"
            height="48"
            viewBox="0 0 56 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={grad.from} />
                <stop offset="100%" stopColor={grad.to} />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="44"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="72"
              fontWeight="900"
              fill={`url(#${uid})`}
              opacity="0.16"
            >
              &ldquo;
            </text>
          </svg>
        </div>

        {/* Message */}
        <p
          className="flex-1 text-sm leading-relaxed line-clamp-6 text-center mb-6 relative z-10"
          style={{ color: "#475569" }}
        >
          {message}
        </p>

        {/* Gradient divider */}
        <div
          className="mb-4 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(30,58,138,0.18), transparent)",
          }}
        />

        {/* Author row */}
        <div className="flex items-center gap-3">
          {/* Gradient avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
              boxShadow: `0 2px 12px ${grad.from}40`,
            }}
          >
            {initials}
          </div>

          <div>
            <p className="text-sm font-bold" style={{ color: "#1e293b" }}>
              {name}
            </p>
            {graduationYear ? (
              <span
                className="inline-block text-xs font-semibold mt-0.5 px-2 py-0.5 rounded-full"
                style={{
                  color: grad.from,
                  background: `${grad.from}18`,
                  border: `1px solid ${grad.from}30`,
                }}
              >
                {graduationYear}
              </span>
            ) : (
              <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                Cựu sinh viên / Giảng viên
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface WishesWallProps {
  maxWishes?: number;
  showCta?: boolean;
  showHeading?: boolean;
}

export function WishesWall({
  maxWishes = 6,
  showCta = true,
  showHeading = true,
}: WishesWallProps) {
  const [wishes, setWishes] = useState<PublicWish[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    FormsService.getPublicSubmissions("loi-chuc").then((data) => {
      setWishes(data.slice(0, maxWishes));
      setLoaded(true);
    });
  }, [maxWishes]);

  if (!loaded || wishes.length === 0) return null;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #0D1F4E 0%, #1E3A8A 55%, #1D4ED8 100%)",
      }}
    >
      {/* ── Decorative background glows ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(96,165,250,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Floating dots */}
        {[
          { top: "8%",  left: "6%",  size: 6 },
          { top: "18%", left: "88%", size: 4 },
          { top: "35%", left: "3%",  size: 4 },
          { top: "55%", left: "92%", size: 6 },
          { top: "72%", left: "12%", size: 4 },
          { top: "85%", left: "75%", size: 5 },
          { top: "92%", left: "38%", size: 4 },
          { top: "28%", left: "52%", size: 3 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: pos.top,
              left: pos.left,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              background: "rgba(255,255,255,0.22)",
            }}
          />
        ))}
        {/* Horizontal light streak */}
        <div
          className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section heading ── */}
        {showHeading && (
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Label pill */}
            <motion.div
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Heart size={14} className="text-pink-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/75">
                Cộng đồng FIT
              </span>
            </motion.div>

            {/* Title */}
            <h2
              className="font-extrabold tracking-tight text-white leading-tight"
              style={{ fontSize: "clamp(26px, 4vw, 46px)" }}
            >
              Lời chúc từ{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #93C5FD, #C4B5FD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                mọi người
              </span>
            </h2>
            <p
              className="mt-3 max-w-xl mx-auto text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.58)" }}
            >
              Những tâm tư, kỷ niệm và lời chúc tốt đẹp gửi đến Khoa nhân
              dịp 25 năm thành lập
            </p>
          </motion.div>
        )}

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishes.map((wish, i) => (
            <WishCard key={wish.id} wish={wish} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        {showCta && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href="/tri-an"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-100"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                color: "#1E3A8A",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Heart size={16} />
              Gửi lời chúc của bạn
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
