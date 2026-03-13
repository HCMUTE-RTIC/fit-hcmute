"use client";

import {
    useRef,
    useEffect,
    useCallback,
    cloneElement,
    isValidElement,
    type ReactNode,
    type ReactElement,
} from "react";

/* ------------------------------------------------------------------ */
/*  Configuration                                                     */
/* ------------------------------------------------------------------ */
export interface ScrollStackConfig {
    /** Vertical gap between cards (px) */
    gap?: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
interface ScrollStackProps {
    children: ReactNode[];
    config?: ScrollStackConfig;
    className?: string;
}

export default function ScrollStack({
    children,
    config,
    className = "",
}: ScrollStackProps) {
    const gap = config?.gap ?? 32;
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    /* Store active index in a ref — no re-render, we update DOM directly */
    const activeIdxRef = useRef<number>(-1);

    const setItemRef = useCallback(
        (el: HTMLDivElement | null, idx: number) => {
            itemsRef.current[idx] = el;
        },
        [],
    );

    /**
     * Push active/inactive state directly to each card's data attribute.
     * Cards use CSS to react to [data-active="true"] — zero React re-renders.
     */
    const applyActive = useCallback((nextIdx: number) => {
        if (nextIdx === activeIdxRef.current) return;
        activeIdxRef.current = nextIdx;

        itemsRef.current.forEach((el, i) => {
            if (!el) return;
            el.dataset.active = String(i === nextIdx);
        });
    }, []);

    /* --- IntersectionObserver --------------------------------------- */
    useEffect(() => {
        const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
        if (items.length === 0) return;

        /* Map element → index for O(1) lookup */
        const indexMap = new Map<Element, number>(
            items.map((el, i) => [el, i]),
        );

        /* Per-element intersection ratio */
        const ratios = new Map<Element, number>(items.map((el) => [el, 0]));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));

                /* Find highest-ratio visible item */
                let bestEl: Element | null = null;
                let bestRatio = 0;
                ratios.forEach((r, el) => {
                    if (r > bestRatio) { bestRatio = r; bestEl = el; }
                });

                if (bestEl && bestRatio > 0.15) {
                    const idx = indexMap.get(bestEl) ?? -1;
                    applyActive(idx);
                }
            },
            {
                threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
                rootMargin: "-5% 0px -5% 0px",
            },
        );

        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [applyActive, children.length]);

    /* ---------------------------------------------------------------- */
    return (
        <div className={`relative ${className}`}>
            <div
                className="flex flex-col"
                style={{ gap: `${gap}px`, padding: "2rem 0 4rem" }}
            >
                {children.map((child, i) => (
                    <div
                        key={i}
                        ref={(el) => setItemRef(el, i)}
                        data-active="false"
                        className="scroll-stack-card"
                    >
                        {isValidElement(child)
                            ? cloneElement(
                                  child as ReactElement<Record<string, unknown>>,
                                  { index: i },
                              )
                            : child}
                    </div>
                ))}
            </div>
        </div>
    );
}
