"use client"

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { WishesWall } from "@/components/wishes/wishes-wall";
import { MemoriesGallery } from "@/components/ky-yeu/memories-gallery";

export default function TriAnPage() {
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
            src="/tri-an/banner_trian.jpg"
            alt="Banner Tri ân"
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
            <Heart size={64} className="mx-auto mb-6 text-white" />
            <h1
              className="font-extrabold mb-6 text-white"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
              }}
            >
              TRI ÂN & KẾT NỐI
            </h1>
            <p className="text-xl leading-relaxed text-gray-200 mb-10">
              Tri ân người đi trước, kết nối thế hệ mai sau. Cùng xem những lời chúc và kỷ niệm đẹp nhân dịp kỷ niệm 25 năm thành lập Khoa CNTT
            </p>
            <Link
              href="/chia-se-ky-niem"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all space-x-2 text-lg shadow-lg"
              style={{ backgroundColor: "var(--color-primary-600)" }}
            >
              <Heart size={20} />
              <span>Chia sẻ kỷ niệm của bạn</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Kỷ niệm từ cộng đồng */}
      <MemoriesGallery />

      {/* Lời chúc từ cộng đồng */}
      <WishesWall maxWishes={9} showCta={false} />
    </div>
  );
}
