"use client";

import { useState } from "react";
import { Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

export default function PDFViewer({ pdfUrl, title = "PDF Document" }: PDFViewerProps) {
  const [scale, setScale] = useState(100);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = title;
    link.click();
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 25, 50));
  };

  const handleFullscreen = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ backgroundColor: "white", borderColor: "#E2E8F0" }}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--color-primary-900)" }}
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-sm font-semibold min-w-[60px] text-center">
            {scale}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--color-primary-900)" }}
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleFullscreen}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold"
            style={{ color: "var(--color-primary-900)" }}
          >
            <Maximize2 size={18} />
            <span className="hidden sm:inline">Toàn màn hình</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-white text-sm font-semibold"
            style={{ backgroundColor: "var(--color-primary-600)" }}
          >
            <Download size={18} />
            <span className="hidden sm:inline">Tải xuống</span>
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div
          className="w-full h-full"
          style={{
            transform: `scale(${scale / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease",
          }}
        >
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title={title}
            style={{ minHeight: "800px" }}
          />
        </div>
      </div>
    </div>
  );
}
