"use client";

import HistoryScrollSnap from "./history-scroll-snap";
import { historyStages } from "./history-data";

const STAGE_PILLS = [
    { label: "1990 – 2001", stageId: 1 },
    { label: "2002 – 2010", stageId: 2 },
    { label: "2011 – 2020", stageId: 3 },
    { label: "2021 – Nay", stageId: 4 },
];

export default function HistoryStackSection() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--color-bg-light)" }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
                    style={{ background: "var(--gradient-hero)" }}
                />
                <div
                    className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
                    style={{ background: "var(--gradient-hero)" }}
                />
                {/* Subtle grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #1D4ED8 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            {/* Section header */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-24">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Eyebrow badge */}
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
                        style={{
                            background: "var(--gradient-hero)",
                            color: "#fff",
                        }}
                    >
                        <span
                            className="inline-block w-1.5 h-1.5 rounded-full bg-white opacity-80"
                        />
                        Hành trình phát triển
                        <span
                            className="inline-block w-1.5 h-1.5 rounded-full bg-white opacity-80"
                        />
                    </span>

                    {/* Heading */}
                    <h2
                        className="font-extrabold mb-4 tracking-tight"
                        style={{
                            fontSize: "clamp(28px, 4vw, 52px)",
                            color: "var(--color-primary-900)",
                            lineHeight: 1.15,
                        }}
                    >
                        Dấu ấn qua từng thời kỳ
                    </h2>

                    {/* Description */}
                    <p
                        className="text-base md:text-lg leading-relaxed mb-12"
                        style={{ color: "var(--color-text-gray)" }}
                    >
                        Từ những bước khởi đầu đầy nhiệt huyết, Khoa Công nghệ Thông tin
                        không ngừng lớn mạnh, trở thành cái nôi đào tạo nguồn nhân lực chất
                        lượng cao cho ngành CNTT <span className="whitespace-nowrap">Việt Nam</span>.
                    </p>
                </div>

                {/* Stage timeline nav */}
                <div className="history-timeline-nav" aria-label="Các giai đoạn lịch sử">
                    {STAGE_PILLS.map((pill, i) => (
                        <div key={pill.stageId} className="history-timeline-nav__item">
                            <button
                                type="button"
                                className="history-timeline-nav__pill cursor-pointer hover:scale-105 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                onClick={() => {
                                    const el = document.getElementById(`history-snap-slide-${i}`);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                            >
                                <span className="history-timeline-nav__num">
                                    {String(pill.stageId).padStart(2, "0")}
                                </span>
                                <span className="history-timeline-nav__period">
                                    {pill.label}
                                </span>
                            </button>
                            {i < STAGE_PILLS.length - 1 && (
                                <div
                                    className="history-timeline-nav__connector"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll-snap slides */}
            <div className="relative z-10">
                <HistoryScrollSnap />
            </div>
        </section>
    );
}
