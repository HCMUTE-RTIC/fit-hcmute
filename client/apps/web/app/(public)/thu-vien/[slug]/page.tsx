"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ImageIcon, Loader2 } from "lucide-react";
import { albumsService } from "@/services/albums.service";
import { Media, MediaAlbum } from "@/types/albums";

const PAGE_SIZE = 20;

export default function AlbumDetail() {
  const { slug } = useParams();
  const [album, setAlbum] = useState<MediaAlbum | null>(null);
  const [photos, setPhotos] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Load trang đầu tiên
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (typeof slug === "string") {
          const data = await albumsService.getAlbumBySlug(slug, 1, PAGE_SIZE);
          setAlbum(data);
          setPhotos(data.medias || []);
          setTotalPhotos(data.pagination?.total || 0);
          setHasMore(
            (data.pagination?.page || 1) < (data.pagination?.totalPages || 1)
          );
        }
      } catch (error) {
        console.error("Failed to fetch album details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [slug]);

  // Load thêm ảnh
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || typeof slug !== "string") return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await albumsService.getAlbumBySlug(
        slug,
        nextPage,
        PAGE_SIZE
      );
      const newPhotos = data.medias || [];
      setPhotos((prev) => [...prev, ...newPhotos]);
      setPage(nextPage);
      setHasMore(
        (data.pagination?.page || 1) < (data.pagination?.totalPages || 1)
      );
    } catch (error) {
      console.error("Failed to load more photos:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [slug, page, loadingMore, hasMore]);

  // Intersection Observer — tự động load khi scroll gần cuối
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-gray-500">
          Đang tải album...
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Không tìm thấy album
        </h1>
        <Link
          href="/thu-vien"
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Quay lại thư viện
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#1e3a8a] text-white py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <Link
            href="/thu-vien"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Quay lại thư viện
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {album.title}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {album.description || "Hình ảnh và kỷ niệm thuộc album này."}
            </p>
            <p className="text-sm text-white/60">
              {new Date(album.createdAt).toLocaleDateString("vi-VN")} •{" "}
              {totalPhotos} hình ảnh
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Gallery Grid ────────────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {photos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                  onClick={() => setSelectedImage(photo.url)}
                >
                  <Image
                    src={photo.url}
                    alt={`Photo`}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={observerRef} className="flex justify-center py-8">
              {loadingMore && (
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              )}
              {!hasMore && photos.length > 0 && (
                <p className="text-gray-400 text-sm">
                  Đã hiển thị tất cả {totalPhotos} hình ảnh
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 flex flex-col items-center gap-4 text-gray-400">
            <ImageIcon size={64} strokeWidth={1} />
            <p className="text-lg font-medium">
              Chưa có hình ảnh nào trong album này.
            </p>
          </div>
        )}
      </div>

      {/* ─── Lightbox/Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 rounded-full bg-black/50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
