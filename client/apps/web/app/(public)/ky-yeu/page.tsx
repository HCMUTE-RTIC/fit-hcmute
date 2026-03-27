"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Camera } from "lucide-react";
import { MemoryFormModal } from "@/components/ky-yeu/memory-form-modal";
import { MemoriesGallery } from "@/components/ky-yeu/memories-gallery";

export default function KyYeuPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* Hero Section */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/gioi-thieu/CNTT_1.jpg"
            alt="Banner Kỷ yếu 25 năm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <BookOpen size={48} className="mx-auto mb-3 text-white" />
            <h1
              className="font-extrabold mb-4 text-white"
              style={{
                fontSize: "clamp(32px, 5vw, 42px)",
                lineHeight: "1.2",
              }}
            >
              KỶ YẾU 25 NĂM
            </h1>
            <p className="text-lg leading-relaxed text-gray-200 mb-8">
              Cùng ôn lại những trang ký ức đẹp nhất trong hành trình 25 năm phát triển của FIT-HCMUTE
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold hover:opacity-90 transition-all text-base"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Camera size={20} />
              <span>Chia sẻ kỷ niệm của bạn</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Memories Gallery */}
      <MemoriesGallery refreshKey={refreshKey} />

      {/* Modal */}
      <MemoryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
