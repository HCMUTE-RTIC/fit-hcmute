"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import PDFViewer from "@/components/shared/PDFViewer";

export default function KyYeuPage() {
  // URL của file PDF kỷ yếu - có thể thay đổi path này
  const pdfUrl = "/ky-yeu-25-nam.pdf";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative"
        style={{
          backgroundColor: "var(--color-bg-light)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "40px",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <BookOpen
              size={64}
              className="mx-auto mb-6"
              style={{ color: "var(--color-primary-600)" }}
            />
            <h1
              className="font-extrabold mb-6"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
                color: "var(--color-primary-900)",
              }}
            >
              KỶ YẾU 25 NĂM
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--color-text-gray)" }}
            >
              Lưu giữ những khoảnh khắc đáng nhớ của Khoa Công nghệ Thông tin qua 25 năm hình thành và phát triển
            </p>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="pb-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "white",
              boxShadow: "var(--shadow-soft)",
              height: "calc(100vh - 200px)",
              minHeight: "600px",
            }}
          >
            <PDFViewer pdfUrl={pdfUrl} title="Kỷ yếu 25 năm CNTT HCMUTE" />
          </motion.div>
        </div>
      </section>


    </div>
  );
}
