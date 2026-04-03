"use client";

import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Loader2,
} from "lucide-react";

interface FlipBookProps {
  pdfUrl: string;
  title?: string;
}

// Page component wrapped with forwardRef for react-pageflip
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function Page({ children }, ref) {
    return (
      <div ref={ref} className="bg-white shadow-md overflow-hidden" style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    );
  }
);

export default function FlipBook({
  pdfUrl,
  title = "PDF Document",
}: FlipBookProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [bookSize, setBookSize] = useState({ width: 500, height: 700 });
  const [pageRatio, setPageRatio] = useState(1.414); // default A4, updated from actual PDF
  const [isMobile, setIsMobile] = useState(false);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate book size based on container and actual PDF page ratio
  useEffect(() => {
    function calcSize() {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;
      const mobile = cw < 768;
      setIsMobile(mobile);

      if (mobile) {
        // Portrait mode: single page, use full width
        const maxPageW = cw - 32;
        const maxPageH = ch - 40;
        let pageW = maxPageW;
        let pageH = pageW * pageRatio;

        if (pageH > maxPageH) {
          pageH = maxPageH;
          pageW = pageH / pageRatio;
        }

        setBookSize({
          width: Math.round(pageW),
          height: Math.round(pageH),
        });
      } else {
        // Landscape mode: two pages side by side
        const maxPageW = Math.min(cw / 2 - 20, 600);
        const maxPageH = ch - 40;

        let pageW = maxPageH / pageRatio;
        let pageH = maxPageH;

        if (pageW > maxPageW) {
          pageW = maxPageW;
          pageH = maxPageW * pageRatio;
        }

        setBookSize({
          width: Math.round(pageW),
          height: Math.round(pageH),
        });
      }
    }
    calcSize();
    window.addEventListener("resize", calcSize);
    return () => window.removeEventListener("resize", calcSize);
  }, [pageRatio]);

  // IndexedDB cache helpers
  const cacheKey = `flipbook_${pdfUrl}`;

  async function openCacheDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("flipbook-cache", 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore("pages");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function getCachedPages(): Promise<{ pages: string[]; ratio: number } | null> {
    try {
      const db = await openCacheDB();
      return new Promise((resolve) => {
        const tx = db.transaction("pages", "readonly");
        const store = tx.objectStore("pages");
        const req = store.get(cacheKey);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }

  async function setCachedPages(pagesData: string[], ratio: number) {
    try {
      const db = await openCacheDB();
      const tx = db.transaction("pages", "readwrite");
      tx.objectStore("pages").put({ pages: pagesData, ratio }, cacheKey);
    } catch {
      // Cache write failed, non-critical
    }
  }

  // Render PDF pages to canvas images (with cache)
  useEffect(() => {
    let cancelled = false;

    async function loadPages() {
      // Try cache first
      const cached = await getCachedPages();
      if (cached && cached.pages.length > 0) {
        setPageRatio(cached.ratio);
        setTotalPages(cached.pages.length);
        setPages(cached.pages);
        setProgress(100);
        setLoading(false);
        return;
      }

      // No cache — render from PDF
      try {
        const pdfjsLib = await import("pdfjs-dist");

        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        setTotalPages(numPages);

        const rendered: string[] = [];
        const scale = 2;

        // Get actual page ratio from first page
        const firstPage = await pdf.getPage(1);
        const firstVp = firstPage.getViewport({ scale: 1 });
        const ratio = firstVp.height / firstVp.width;
        setPageRatio(ratio);

        for (let i = 1; i <= numPages; i++) {
          if (cancelled) return;

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport }).promise;

          rendered.push(canvas.toDataURL("image/jpeg", 0.92));
          setProgress(Math.round((i / numPages) * 100));
        }

        if (!cancelled) {
          setPages(rendered);
          setLoading(false);
          // Save to cache for next visit
          setCachedPages(rendered, ratio);
        }
      } catch (err) {
        console.error("Failed to render PDF:", err);
        setLoading(false);
      }
    }

    loadPages();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const handlePrev = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const handleNext = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipNext();
  }, []);

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = title;
    link.click();
  };

  const handleFullscreen = () => {
    window.open(pdfUrl, "_blank");
  };

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-stone-100 to-stone-200">
        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
        <p className="text-sm font-medium text-slate-600">
          Đang tải kỷ yếu... {progress}%
        </p>
        <div className="w-64 h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-slate-500">Không thể tải file PDF</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col bg-gradient-to-b from-stone-100 to-stone-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-30"
            disabled={currentPage === 0}
            title="Trang trước"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-slate-600 min-w-[100px] text-center">
            Trang {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-30"
            disabled={currentPage >= totalPages - 1}
            title="Trang sau"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
          >
            <Maximize2 size={16} />
            <span className="hidden sm:inline">PDF gốc</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: "#1E3A8A" }}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Tải xuống</span>
          </button>
        </div>
      </div>

      {/* Flipbook */}
      <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
        <HTMLFlipBook
          key={isMobile ? "portrait" : "landscape"}
          ref={flipBookRef}
          width={bookSize.width}
          height={bookSize.height}
          size="fixed"
          minWidth={200}
          maxWidth={bookSize.width}
          minHeight={300}
          maxHeight={bookSize.height}
          showCover={true}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="flipbook-shadow"
          flippingTime={800}
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{}}
          startZIndex={0}
        >
          {pages.map((src, i) => (
            <Page key={i}>
              <img
                src={src}
                alt={`Trang ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }}
                draggable={false}
              />
            </Page>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Hint */}
      <div className="text-center pb-3">
        <p className="text-xs text-slate-400">
          Kéo góc trang hoặc dùng phím ← → để lật sách
        </p>
      </div>
    </div>
  );
}
