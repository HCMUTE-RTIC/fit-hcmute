"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { historyStages } from "./history-data";

export default function HistoryScrollSnap() {
    const [activeIdx, setActiveIdx] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToIdx = useCallback((idx: number) => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTo({ top: idx * el.clientHeight, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const idx = Math.round(el.scrollTop / el.clientHeight);
                setActiveIdx(Math.min(idx, historyStages.length - 1));
                ticking = false;
            });
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="history-snap-wrapper">
            {/* Scroll container */}
            <div ref={containerRef} className="history-snap-container">
                {historyStages.map((stage, i) => (
                    <div key={stage.id} className="history-snap-slide">
                        {/* ── Left: Image ── */}
                        <div className="history-snap-img-col">
                            <div className="history-snap-img-card">
                                <Image
                                    src={stage.image}
                                    alt={stage.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 52vw"
                                    priority={i === 0}
                                />
                                {/* Period badge */}
                                <span className="history-snap-period-badge">
                                    {stage.period}
                                </span>
                                {/* Stage overlay number */}
                                <span
                                    className="history-snap-img-num"
                                    aria-hidden="true"
                                >
                                    {String(stage.id).padStart(2, "0")}
                                </span>
                            </div>
                        </div>

                        {/* ── Right: Content ── */}
                        <div className="history-snap-content-col">
                            {/* Gradient number */}
                            <div
                                className="history-snap-num"
                                style={{ backgroundImage: stage.gradient }}
                            >
                                {String(stage.id).padStart(2, "0")}
                            </div>

                            {/* Stage label */}
                            <span className="history-snap-stage-label">
                                Giai đoạn {stage.id}
                            </span>

                            <h2 className="history-snap-title">{stage.title}</h2>
                            <p className="history-snap-summary">{stage.summary}</p>

                            {/* Milestone list */}
                            <ul className="history-snap-ms-list">
                                {stage.milestones.map((ms, idx) => (
                                    <li key={idx} className="history-snap-ms-item">
                                        <span className="history-snap-ms-tag">
                                            {ms.label}
                                        </span>
                                        <span className="history-snap-ms-desc">
                                            {ms.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress dots */}
            <nav
                className="history-snap-dots"
                aria-label="Điều hướng giai đoạn"
            >
                {historyStages.map((stage, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToIdx(i)}
                        className={`history-snap-dot${i === activeIdx ? " history-snap-dot--active" : ""}`}
                        aria-label={`${stage.period}`}
                        title={stage.period}
                    />
                ))}
            </nav>

            {/* Bottom scroll hint */}
            {activeIdx < historyStages.length - 1 && (
                <button
                    className="history-snap-next-hint"
                    onClick={() => scrollToIdx(activeIdx + 1)}
                    aria-label="Xem giai đoạn tiếp theo"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M10 3v14M4 11l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>{historyStages[activeIdx + 1]?.period}</span>
                </button>
            )}
        </div>
    );
}
