"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize, Play, Pause } from "lucide-react";
import { FormsService, type PublicWish } from "@/services/forms.service";

/* ─────────── Types ─────────── */

interface Slide {
  id: string;
  type: "wish" | "memory";
  name: string;
  message: string;
  graduationYear?: string;
  role?: string;
  imageUrl?: string;
  createdAt: string;
}

/* ─────────── Transition variants ─────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transitions: any[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.3 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  {
    initial: { opacity: 0, y: 200 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, y: -200 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 200 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, scale: 0.5, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 10 },
    transition: { duration: 0.9, ease: "easeOut" },
  },
  {
    initial: { opacity: 0, scaleX: 0.3, x: 100 },
    animate: { opacity: 1, scaleX: 1, x: 0 },
    exit: { opacity: 0, scaleX: 0.3, x: -100 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  {
    initial: { opacity: 0, filter: "blur(30px)", scale: 1.1 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(30px)", scale: 0.9 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  {
    initial: { opacity: 0, y: 100, rotate: 3 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -100, rotate: -3 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
];

/* ─────────── Avatar gradient colors ─────────── */

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ─────────── Constants ─────────── */
const SLIDE_DURATION = 15000;

/* ─────────── Main component ─────────── */

export default function SlideshowPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Fetch data ── */
  useEffect(() => {
    async function fetchData() {
      try {
        const [wishes, memories] = await Promise.all([
          FormsService.getPublicSubmissions("loi-chuc").catch(() => []),
          FormsService.getPublicSubmissions("chia-se-ky-niem").catch(() => []),
        ]);

        const wishSlides: Slide[] = wishes.map((w: PublicWish) => ({
          id: w.id,
          type: "wish" as const,
          name: w.data.full_name || "Ẩn danh",
          message: w.data.message || "",
          graduationYear: w.data.graduation_year,
          role: w.data.vai_tro_sv_khoa_cuu_sv_khoa_giang_vien,
          createdAt: w.createdAt,
        }));

        const memorySlides: Slide[] = memories.map((m: PublicWish) => ({
          id: m.id,
          type: "memory" as const,
          name: m.data.full_name || "Ẩn danh",
          message: m.data.caption || "",
          role: m.data.vai_tro_sv_khoa_cuu_sv_khoa_giang_vien,
          imageUrl: m.data.image_url,
          createdAt: m.createdAt,
        }));

        const combined = [...wishSlides, ...memorySlides];
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combined[i]!, combined[j]!] = [combined[j]!, combined[i]!];
        }
        setSlides(combined);
      } catch (err) {
        console.error("Failed to fetch slideshow data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ── Auto advance ── */
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  /* ── Fullscreen ── */
  const toggleFullscreen = useCallback(async () => {
    try {
      const el = containerRef.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        // Try standard first, then webkit fallback
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as any).webkitRequestFullscreen) {
          await (el as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
    };
  }, []);

  /* ── Keyboard controls ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slides.length, toggleFullscreen]);

  /* ── Derived state ── */
  const transitionVariant = transitions[current % transitions.length]!;
  const slide = slides[current];

  /* ── Loading state ── */
  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#292524",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: "2px solid rgba(255,255,255,0.2)",
              borderTopColor: "white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>
            Đang tải trình chiếu...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── Empty state ── */
  if (slides.length === 0 || !slide) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#292524",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 20, marginBottom: 8 }}>
            Chưa có lời chúc nào
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Các lời chúc đã duyệt sẽ hiển thị tại đây
          </p>
        </div>
      </div>
    );
  }

  const avatarGradient = gradients[slide.name.charCodeAt(0) % gradients.length];
  const hasImage = slide.type === "memory" && slide.imageUrl;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#292524",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── Background decorations ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            opacity: 0.07,
            background: "radial-gradient(circle, #92400e 0%, transparent 70%)",
            top: "10%",
            left: "10%",
          }}
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            opacity: 0.05,
            background: "radial-gradient(circle, #78350f 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
          }}
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Logo (top center) ── */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      >
        <img
          src="/logo-50-nam-4x.png"
          alt="FIT HCMUTE 25 năm"
          style={{ height: 60, width: "auto" }}
        />
      </div>

      {/* ── Controls (top right) — hidden in fullscreen ── */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 50,
          display: isFullscreen ? "none" : "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 12,
            fontFamily: "monospace",
            marginRight: 8,
          }}
        >
          {current + 1} / {slides.length}
        </span>

        <button
          onClick={() => setIsPaused((p) => !p)}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "none",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={isPaused ? "Tiếp tục (Space)" : "Tạm dừng (Space)"}
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </button>

        <button
          onClick={toggleFullscreen}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "none",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={isFullscreen ? "Thoát (ESC)" : "Toàn màn hình (F)"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      {/* ── Slide content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-" + current}
          initial={transitionVariant.initial}
          animate={transitionVariant.animate}
          exit={transitionVariant.exit}
          transition={transitionVariant.transition}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 16px 24px",
            overflow: "hidden",
          }}
        >
          {hasImage ? (
            /* ── Memory with image — horizontal layout: ảnh trái, chữ phải ── */
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: slide.message.length > 100 ? 24 : 48,
                maxWidth: slide.message.length > 100 ? "95vw" : 1100,
                width: "100%",
                padding: slide.message.length > 100 ? "0 24px" : "0 20px",
              }}
            >
              {/* Image — bên trái */}
              <motion.div
                style={{
                  position: "relative",
                  flex: slide.message.length > 100 ? "0 0 35%" : "0 0 50%",
                  maxWidth: slide.message.length > 100 ? 420 : 520,
                  aspectRatio: "4/3",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>

              {/* Caption + Name — bên phải */}
              <motion.div
                style={{
                  flex: 1,
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {slide.message && (
                  <p
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "clamp(16px, 2vw, 26px)",
                      fontStyle: "italic",
                      lineHeight: 1.7,
                      marginBottom: 24,
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      display: "-webkit-box",
                      WebkitLineClamp: 10,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    &ldquo;{slide.message}&rdquo;
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: avatarGradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(slide.name)}
                  </div>
                  <div>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {slide.name}
                    </span>
                    {slide.role && (
                      <p
                        style={{
                          color: "rgba(217,183,130,0.6)",
                          fontSize: 14,
                          marginTop: 2,
                        }}
                      >
                        {slide.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* ── Wish (text only) — centered ── */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                maxWidth: 900,
                width: "100%",
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {/* Big quote mark background */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.04,
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: avatarGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 28,
                  marginBottom: 20,
                  boxShadow: "0 0 0 4px rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.3)",
                }}
              >
                {getInitials(slide.name)}
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: slide.message.length > 300
                    ? "clamp(14px, 1.8vw, 20px)"
                    : slide.message.length > 150
                      ? "clamp(16px, 2.5vw, 28px)"
                      : "clamp(20px, 3.5vw, 44px)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  marginBottom: 20,
                  fontStyle: "italic",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                  position: "relative",
                  zIndex: 1,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                &ldquo;{slide.message}&rdquo;
              </motion.p>

              {/* Author name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "clamp(16px, 2vw, 24px)",
                    marginBottom: 4,
                  }}
                >
                  {slide.name}
                </p>
                {(slide.graduationYear || slide.role) && (
                  <p
                    style={{
                      color: "rgba(217,183,130,0.6)",
                      fontSize: "clamp(13px, 1.5vw, 18px)",
                    }}
                  >
                    {slide.role || (slide.graduationYear ? `Khóa ${slide.graduationYear}` : "")}
                  </p>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Progress bar at bottom ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          {slides.length <= 30 &&
            slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 32 : 6,
                  height: 4,
                  borderRadius: 4,
                  border: "none",
                  backgroundColor:
                    i === current
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
        </div>

        {/* Progress line */}
        {!isPaused && (
          <motion.div
            key={current}
            style={{
              height: 2,
              background:
                "linear-gradient(to right, rgba(217,119,6,0.5), rgba(245,158,11,0.6), rgba(252,211,77,0.5))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          />
        )}
      </div>

      {/* ── Paused overlay ── */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              padding: "8px 20px",
              borderRadius: 20,
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            Đã tạm dừng — Nhấn Space để tiếp tục
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
