"use client";

import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";

const EVENT_DATE = new Date("2026-04-04T08:00:00+07:00");
const DISMISSED_KEY = "countdown_bar_dismissed";

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

export default function CountdownBar() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [dismissed, setDismissed] = useState(true); // hidden by default until check

  useEffect(() => {
    // Check if user dismissed it this session
    const wasDismissed = sessionStorage.getItem(DISMISSED_KEY);
    setDismissed(!!wasDismissed);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  if (dismissed || !timeLeft) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="w-full relative z-50"
      style={{ backgroundColor: "#0f2557" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-center gap-3 sm:gap-5 text-white text-sm">
        <Calendar className="w-4 h-4 shrink-0 hidden sm:block" style={{ color: "rgba(147,197,253,0.8)" }} />

        <span className="font-medium hidden sm:inline" style={{ color: "rgba(255,255,255,0.85)" }}>
          Lễ kỷ niệm 25 năm Khoa CNTT
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { value: timeLeft.days, label: "ngày" },
            { value: timeLeft.hours, label: "giờ" },
            { value: timeLeft.minutes, label: "phút" },
            { value: timeLeft.seconds, label: "giây" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <span
                  className="font-bold tabular-nums text-base sm:text-lg"
                  style={{
                    color: "white",
                    minWidth: "2ch",
                    textAlign: "center",
                  }}
                >
                  {pad(item.value)}
                </span>
                <span
                  className="text-[10px] sm:text-xs uppercase tracking-wide"
                  style={{ color: "rgba(147,197,253,0.6)" }}
                >
                  {item.label}
                </span>
              </div>
              {i < 3 && (
                <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors cursor-pointer"
          style={{ color: "rgba(255,255,255,0.3)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
          }
          aria-label="Tắt thanh đếm ngược"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
