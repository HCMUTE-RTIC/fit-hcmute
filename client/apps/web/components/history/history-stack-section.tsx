"use client";

import ScrollStack from "./scroll-stack";
import HistoryStageCard from "./history-stage-card";
import { historyStages } from "./history-data";

export default function HistoryStackSection() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--color-bg-light)" }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
                    style={{ background: "var(--gradient-hero)" }}
                />
                <div
                    className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.03]"
                    style={{ background: "var(--gradient-hero)" }}
                />
            </div>

            {/* Section header */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-16 md:pt-20">
                <div className="text-center max-w-3xl mx-auto mb-4 md:mb-6">
                    <span
                        className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
                        style={{
                            background: "var(--gradient-hero)",
                            color: "#fff",
                        }}
                    >
                        Hành trình phát triển
                    </span>
                    <h2
                        className="font-extrabold mb-4"
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            color: "var(--color-primary-900)",
                        }}
                    >
                        Dấu ấn qua từng thời kỳ
                    </h2>
                    <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: "var(--color-text-gray)" }}
                    >
                        Từ những bước khởi đầu đầy nhiệt huyết, Khoa Công nghệ Thông tin
                        không ngừng lớn mạnh, trở thành cái nôi đào tạo nguồn nhân lực chất
                        lượng cao cho ngành CNTT Việt Nam.
                    </p>
                </div>
            </div>

            {/* Scroll-stack cards */}
            <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6">
                <ScrollStack
                    config={{
                        gap: 36,
                        threshold: 0.45,
                    }}
                >
                    {historyStages.map((stage) => (
                        <HistoryStageCard key={stage.id} stage={stage} />
                    ))}
                </ScrollStack>
            </div>
        </section>
    );
}
