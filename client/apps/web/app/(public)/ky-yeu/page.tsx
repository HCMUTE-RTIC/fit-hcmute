"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import dynamic from "next/dynamic";

const FlipBook = dynamic(() => import("@/components/shared/FlipBook"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  ),
});
import { SettingsService } from "@/services/settings.service";
import { useRouter } from "next/navigation";

export default function KyYeuPage() {
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    SettingsService.getAll().then((config) => {
      if (config["ky_yeu_enabled"] === "false") {
        setDisabled(true);
        setLoading(false);
        return;
      }

      const url = config["ky_yeu_pdf_url"];
      if (url) {
        if (url.startsWith("http")) {
          setPdfUrl(url);
        } else {
          // Use relative URL so Next.js rewrite handles /media_storage -> MinIO
          setPdfUrl(url);
        }
      } else {
        // Fallback to static file
        setPdfUrl("/ky-yeu-25-nam.pdf");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (disabled) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">Trang kỷ yếu chưa sẵn sàng</h2>
          <p className="text-sm text-slate-500">Kỷ yếu 25 năm đang được chuẩn bị. Vui lòng quay lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* Hero Section */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-start justify-center overflow-hidden"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
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
              className="font-extrabold mb-2 text-white"
              style={{ fontSize: "clamp(32px, 5vw, 42px)", lineHeight: "1.2" }}
            >
              KỶ YẾU 25 NĂM
            </h1>
            <p className="text-lg leading-normal text-gray-200">
              Cùng ôn lại những trang ký ức đẹp nhất trong hành trình 25 năm phát triển của FIT-HCMUTE
            </p>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      {pdfUrl && (
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
                height: "calc(100vh - 100px)",
                minHeight: "900px",
              }}
            >
              <FlipBook pdfUrl={pdfUrl} title="Kỷ yếu 25 năm CNTT HCMUTE" />
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
