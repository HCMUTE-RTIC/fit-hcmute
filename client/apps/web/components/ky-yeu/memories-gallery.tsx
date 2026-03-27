"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FormsService, type PublicWish } from "@/services/forms.service";

function resolveImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return url;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return ((parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "")).toUpperCase();
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/* ── Lightbox ── */
function Lightbox({
  memory,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  memory: PublicWish;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const name = memory.data.full_name || "Ẩn danh";
  const caption = memory.data.caption || "";
  const imageUrl = memory.data.image_url;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Nav prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Nav next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {imageUrl && (
          <img
            src={resolveImageUrl(imageUrl)}
            alt={`Kỷ niệm của ${name}`}
            className="max-h-[70vh] w-auto rounded-lg object-contain"
          />
        )}
        <div className="mt-5 text-center max-w-xl">
          <p className="text-white/90 text-base leading-relaxed mb-3">
            &ldquo;{caption}&rdquo;
          </p>
          <p className="text-white/50 text-sm font-medium">{name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Card ── */
function MemoryCard({
  memory,
  index,
  onClick,
}: {
  memory: PublicWish;
  index: number;
  onClick: () => void;
}) {
  const name = memory.data.full_name || "Ẩn danh";
  const caption = memory.data.caption || "";
  const imageUrl = memory.data.image_url;
  const initials = getInitials(name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={resolveImageUrl(imageUrl)}
            alt={`Kỷ niệm của ${name}`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </div>
      )}

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-[13px] leading-relaxed line-clamp-2 mb-4" style={{ color: "#64748b" }}>
          &ldquo;{caption}&rdquo;
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
              style={{ backgroundColor: "#1E3A8A" }}
            >
              {initials}
            </div>
            <span className="text-sm font-semibold" style={{ color: "#1e293b" }}>
              {name}
            </span>
          </div>
          <span className="text-[11px]" style={{ color: "#cbd5e1" }}>
            {formatDate(memory.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Gallery Section ── */
interface MemoriesGalleryProps {
  refreshKey?: number;
}

export function MemoriesGallery({ refreshKey }: MemoriesGalleryProps) {
  const [memories, setMemories] = useState<PublicWish[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    FormsService.getPublicSubmissions("chia-se-ky-niem")
      .then((data) => {
        setMemories(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [refreshKey]);

  if (!loaded || memories.length === 0) return null;

  return (
    <>
      <section className="py-20 md:py-24" style={{ backgroundColor: "#fafbfc" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <Camera size={13} style={{ color: "#1E3A8A" }} />
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
                Kỷ niệm
              </span>
            </div>

            <h2
              className="font-extrabold tracking-tight leading-tight"
              style={{ fontSize: "clamp(24px, 3.5vw, 40px)", color: "#0f172a" }}
            >
              Ký ức từ cộng đồng FIT
            </h2>
            <p
              className="mt-3 max-w-md mx-auto text-sm leading-relaxed"
              style={{ color: "#94a3b8" }}
            >
              Những khoảnh khắc đáng nhớ được chia sẻ bởi các thế hệ sinh viên và giảng viên
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {memories.map((memory, i) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={i}
                onClick={() => setLightboxIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && memories[lightboxIdx] && (
          <Lightbox
            memory={memories[lightboxIdx]}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx((i) => Math.max(0, (i ?? 0) - 1))}
            onNext={() => setLightboxIdx((i) => Math.min(memories.length - 1, (i ?? 0) + 1))}
            hasPrev={lightboxIdx > 0}
            hasNext={lightboxIdx < memories.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
