"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import PDFViewer from "@/components/shared/PDFViewer";

export default function KyYeuPage() {
  // URL của file PDF kỷ yếu - có thể thay đổi path này
  const pdfUrl = "/ky-yeu-25-nam.pdf";

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* Hero Section */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "40px",
        }}
      >
        {/* Background Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src="/ky-yeu/banner_kyyeu.jpg"
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
            <BookOpen
              size={64}
              className="mx-auto mb-6 text-white"
            />
            <h1
              className="font-extrabold mb-6 text-white"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
              }}
            >
              KỶ YẾU 25 NĂM
            </h1>
            <p
              className="text-xl leading-relaxed text-gray-200"
            >
              Cùng ôn lại những trang ký ức đẹp nhất trong hành trình 25 năm phát triển của FIT-HCMUTE
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
