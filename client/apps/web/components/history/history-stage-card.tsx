"use client";

import type { HistoryStage } from "./history-data";

interface HistoryStageCardProps {
    stage: HistoryStage;
    index?: number;
}

export default function HistoryStageCard({ stage }: HistoryStageCardProps) {
    return (
        <div className="history-card group">
            {/* Background image */}
            <div
                className="history-card__bg"
                style={{ backgroundImage: `url(${stage.image})` }}
            />

            {/* Gradient overlay */}
            <div
                className="history-card__overlay"
                style={{
                    background: `${stage.gradient}, linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 100%)`,
                    backgroundBlendMode: "overlay",
                }}
            />

            {/* Content */}
            <div className="history-card__content">
                <div className="history-card__spacer" />

                {/* Badges */}
                <div className="history-card__badges">
                    <span className="badge">Giai đoạn {stage.id}</span>
                    <span className="badge">{stage.period}</span>
                </div>

                {/* Title */}
                <h3 className="history-card__title">{stage.title}</h3>

                {/* Summary */}
                <p className="history-card__summary">{stage.summary}</p>

                {/* Milestones — grid trick: triggered by [data-active="true"] on parent wrapper */}
                <div className="history-card__expand">
                    <div className="history-card__expand-inner">
                        <div className="history-card__divider" />
                        <h4 className="history-card__ms-label">
                            Các mốc quan trọng
                        </h4>
                        <ul className="history-card__ms-list">
                            {stage.milestones.map((ms, idx) => (
                                <li key={idx} className="history-card__ms-item">
                                    <div className="history-card__dot-col">
                                        <div className="history-card__dot" />
                                        {idx < stage.milestones.length - 1 && (
                                            <div className="history-card__line" />
                                        )}
                                    </div>
                                    <div>
                                        <span className="history-card__ms-tag">
                                            {ms.label}
                                        </span>
                                        <p className="history-card__ms-desc">
                                            {ms.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
