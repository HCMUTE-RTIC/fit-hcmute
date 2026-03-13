"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ImageIcon } from "lucide-react";
import { albumsService } from "@/services/albums.service";
import { MediaAlbum } from "@/types/albums";

export default function AlbumDetail() {
  const { slug } = useParams();
  const [album, setAlbum] = useState<MediaAlbum | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (typeof slug === "string") {
          const data = await albumsService.getAlbumBySlug(slug);
          setAlbum(data);
        }
      } catch (error) {
        console.error("Failed to fetch album details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-gray-500">Đang tải album...</div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy album</h1>
        <Link href="/thu-vien" className="text-blue-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Quay lại thư viện
        </Link>
      </div>
    );
  }

  // Fallback if the medias array is missing
  const photos = album.medias || [];

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
              {new Date(album.createdAt).toLocaleDateString("vi-VN")} • {photos.length} hình ảnh
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Gallery Grid ────────────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                onClick={() => setSelectedImage(photo.url)}
              >
                <Image
                  src={photo.url}
                  alt={photo.fileName || `Photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center gap-4 text-gray-400">
            <ImageIcon size={64} strokeWidth={1} />
            <p className="text-lg font-medium">Chưa có hình ảnh nào trong album này.</p>
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
