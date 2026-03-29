"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import Counter from "@/components/reactbits/Counter";
import "@/components/reactbits/Counter.css";

const EVENT_DATE = new Date("2026-04-04T08:00:00+07:00");

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const COUNTER_STYLE: React.CSSProperties = {
  borderRadius: 12,
  backgroundColor: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <Counter
        value={value}
        fontSize={48}
        padding={16}
        places={[10, 1]}
        gap={4}
        borderRadius={12}
        horizontalPadding={12}
        textColor="white"
        fontWeight="bold"
        containerStyle={COUNTER_STYLE}
        gradientHeight={12}
        gradientFrom="#0c1a3a"
        gradientTo="transparent"
      />
      <span
        className="text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-3 font-semibold"
        style={{ color: "rgba(147,197,253,0.6)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) return null;

  const isEventTime = timeLeft === null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0c1a3a",
        paddingTop: "clamp(48px, 8vw, 80px)",
        paddingBottom: "clamp(48px, 8vw, 80px)",
      }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {!isEventTime ? (
          /* ── Countdown State ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo small */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-50-nam-4x.png"
                alt="Logo 25 năm"
                width={100}
                height={100}
                className="w-16 sm:w-20 h-auto opacity-90"
                unoptimized
              />
            </div>

            <p
              className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-2"
              style={{ color: "rgba(147,197,253,0.7)" }}
            >
              Đếm ngược đến ngày lễ kỷ niệm
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10"
              style={{ color: "white" }}
            >
              25 Năm Khoa Công Nghệ Thông Tin
            </h2>

            {/* Countdown with ReactBits Counter */}
            <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-5">
              <TimeUnit value={timeLeft.days} label="Ngày" />
              <Separator />
              <TimeUnit value={timeLeft.hours} label="Giờ" />
              <Separator />
              <TimeUnit value={timeLeft.minutes} label="Phút" />
              <Separator />
              <TimeUnit value={timeLeft.seconds} label="Giây" />
            </div>

            {/* Event date text */}
            <p
              className="mt-8 text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Ngày 04 tháng 04 năm 2026
            </p>
          </motion.div>
        ) : (
          /* ── Celebration State ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Confetti-like decorative dots */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    "#2563EB",
                    "#F59E0B",
                    "#10B981",
                    "#EF4444",
                    "#8B5CF6",
                  ][i % 5],
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.5],
                  y: [0, -30, 20],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <PartyPopper className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400" />
              </motion.div>
            </div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "white" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Chúc Mừng 25 Năm!
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: "rgba(147,197,253,0.9)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin
              <br />
              Trường Đại Học Công Nghệ Kỹ Thuật TP.HCM
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                href="/chia-se-ky-niem"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:brightness-110 cursor-pointer"
                style={{ backgroundColor: "#2563EB" }}
              >
                Chia sẻ kỷ niệm
              </Link>
              <Link
                href="/tri-an"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:brightness-110 cursor-pointer"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Xem lời chúc
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
