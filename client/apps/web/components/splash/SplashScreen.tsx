"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_DATE = new Date("2026-04-04T08:00:00+07:00");

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [countdown, setCountdown] = useState(5);
  const [phase, setPhase] = useState<"logo" | "countdown" | "exit">("logo");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
  }, []);

  // Phase transitions: logo (0.8s) -> countdown (3s) -> exit
  useEffect(() => {
    const logoTimer = setTimeout(() => setPhase("countdown"), 800);
    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      setPhase("exit");
      setTimeout(onComplete, 600);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdown, onComplete]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #0c1a3a 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Soft glow behind center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />

        {/* "Kỷ niệm" badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gray-300" />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#2563eb" }}
            >
              Kỷ niệm
            </span>
            <div className="h-px w-12 bg-gray-300" />
          </div>
        </motion.div>

        {/* "25" big number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 mb-2"
        >
          <h1
            className="font-bold leading-none select-none"
            style={{
              fontSize: "clamp(100px, 20vw, 160px)",
              color: "#0c1a3a",
              textShadow: "0 0 80px rgba(37,99,235,0.15)",
            }}
          >
            25
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 text-center mb-10"
        >
          <p
            className="text-lg sm:text-xl font-medium tracking-wide"
            style={{ color: "#1e293b" }}
          >
            Năm thành lập Khoa Công nghệ Thông tin
          </p>
          <p
            className="text-sm mt-1.5 tracking-wider"
            style={{ color: "#64748b" }}
          >
            Trường Đại Học Công Nghệ Kỹ Thuật TP.HCM
          </p>
        </motion.div>

        {/* Event date countdown mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-10 flex items-center gap-4 sm:gap-6 mb-12"
        >
          {[
            { value: timeLeft.days, label: "Ngày" },
            { value: timeLeft.hours, label: "Giờ" },
            { value: timeLeft.minutes, label: "Phút" },
            { value: timeLeft.seconds, label: "Giây" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold tabular-nums"
                style={{ color: "#0c1a3a" }}
              >
                {pad(item.value)}
              </div>
              <div
                className="text-[10px] sm:text-xs uppercase tracking-widest mt-1"
                style={{ color: "#94a3b8" }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Countdown circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            phase === "countdown"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 64 64"
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="2"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28}
                initial={{ strokeDashoffset: 0 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 28,
                }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </svg>
            <AnimatePresence mode="wait">
              <motion.span
                key={countdown}
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                className="text-2xl font-bold"
                style={{ color: "#0c1a3a" }}
              >
                {countdown}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => {
            setPhase("exit");
            setTimeout(onComplete, 600);
          }}
          className="absolute bottom-8 right-8 z-10 text-xs tracking-wider uppercase cursor-pointer transition-colors"
          style={{ color: "rgba(0,0,0,0.25)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(0,0,0,0.25)")
          }
        >
          Bỏ qua
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
