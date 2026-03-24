"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Camera, ImageIcon } from "lucide-react";
import { Folder } from "@workspace/ui/components/folder";
import { albumsService } from "@/services/albums.service";
import { MediaAlbum } from "@/types/albums";

const imgItFestival = "/thu-vien/thuvienkiniem1.jpg";
const imgAiML = "/thu-vien/thuvienkiniem2.jpg";
const imgTotNghiep = "/thu-vien/CuuSV24-1.jpg";
const imgGoogleSingapore = "/thu-vien/2.jpg";
const imgKhoiNghiep = "/thu-vien/csv23-1.jpg";

// ─── Video data ───────────────────────────────────────────────────────────────
const videos = [
  {
    id: 1,
    thumbnail: "/thu-vien/thuvienkiniem1.jpg",
    title: "Lễ Kỷ Niệm 25 Năm Thành Lập Khoa CNTT",
    duration: "8:45",
    size: "large",
  },
  {
    id: 2,
    thumbnail: "/thu-vien/thuvienkiniem2.jpg",
    title: "Hội Thảo Quốc Tế AI & Machine Learning",
    duration: "8:45",
    size: "small",
  },
  {
    id: 3,
    thumbnail: "/thu-vien/csv23-1.jpg",
    title: "Ngày Hội Khởi Nghiệp 2022 – Sáng Tạo Không Giới Hạn",
    duration: "8:45",
    size: "medium-left",
  },
  {
    id: 4,
    thumbnail: imgGoogleSingapore,
    title: "Chuyến Tham Quan Google Singapore 2019",
    duration: "8:45",
    size: "medium-right",
  },
];


// ─── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({
  src,
  alt,
  label,
  labelColor,
  height,
  delay = 0,
}: {
  src: string;
  alt: string;
  label: string | null;
  labelColor: string | null;
  height: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden group cursor-pointer"
      style={{ borderRadius: 16, height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-[16px]" />
      {/* Label */}
      {label && labelColor && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-start pl-6"
          style={{
            height: 53,
            backgroundColor: labelColor,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <span className="font-bold text-white" style={{ fontSize: 20 }}>
            {label}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({
  thumbnail,
  title,
  duration,
  delay = 0,
}: {
  thumbnail: string;
  title: string;
  duration: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden group cursor-pointer"
      style={{ borderRadius: 16, height: 256 }}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/40 transition-all duration-300"
          style={{ width: 56, height: 56 }}
        >
          <Play size={24} className="text-white ml-1" />
        </div>
      </div>
      {/* Duration badge */}
      <div
        className="absolute bottom-4 right-4 px-3 flex items-center"
        style={{
          height: 28,
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: 9999,
        }}
      >
        <span className="font-semibold text-white" style={{ fontSize: 14, lineHeight: "20px" }}>
          {duration}
        </span>
      </div>
      {/* Title on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-semibold" style={{ fontSize: 14, lineHeight: "20px" }}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Gallery() {
  const router = useRouter();

  const [albums, setAlbums] = useState<MediaAlbum[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [openingFolderId, setOpeningFolderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await albumsService.getAlbums();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoadingAlbums(false);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className={`min-h-[calc(100vh-96px)] ${openingFolderId ? 'cursor-wait' : ''}`}>
      {/* ─── Section 1: Hero ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-start justify-center overflow-hidden"
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/cong-nghe-thong-tin-aun-qa_549.jpg"
            alt="Thư viện hình ảnh Khoa CNTT"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center gap-3"
          >
            {/* Camera icon */}
            <div>
              <Camera size={48} color="#ffffff" strokeWidth={1.5} className="mb-2" />
            </div>

            <h1
              className="font-extrabold"
              style={{
                fontSize: "clamp(32px, 5vw, 42px)",
                lineHeight: "1.2",
                color: "#ffffff",
              }}
            >
              HÀNH TRÌNH TẠI FIT-HCMUTE
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: "1.5",
                color: "#e2e8f0",
              }}
            >
              Lưu giữ những khoảnh khắc đáng nhớ qua 25 năm hình thành và phát triển
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Photo Gallery ─────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">


          {/* Albums Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start mt-8">
            {loadingAlbums ? (
              <div className="col-span-full py-20 text-center text-gray-500 font-medium">Bơm dữ liệu thư viện...</div>
            ) : albums.length > 0 ? (
              albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => {
                    if (openingFolderId) return; // Prevent multiple clicks
                    setOpeningFolderId(album.id);
                    setTimeout(() => {
                      router.push(`/thu-vien/${album.slug}`);
                    }, 2500); // Tăng thời gian chờ lên 2.5s để ngắm animation kỹ hơn
                  }}
                  className={`flex flex-col gap-3 group ${openingFolderId === album.id ? 'opacity-80 scale-95 transition-all duration-1000' : 'cursor-pointer'} ${openingFolderId && openingFolderId !== album.id ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <div
                    className="bg-[#f8fafc] group-hover:bg-[#f1f5f9] transition-colors flex items-center justify-center relative"
                    style={{ borderRadius: 16, height: 220, padding: "1.5rem" }}
                  >
                    {/* Folder Component */}
                    <Folder
                      color="#1e3a8a"
                      size={1.2}
                      items={[0, 1, 2].map((i) => {
                        const media = album.medias?.[i];
                        if (media) {
                          return (
                            <div key={i} className="w-full h-full bg-white overflow-hidden rounded-[8px]">
                              <img src={media.url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                            </div>
                          );
                        }
                        return (
                          <div key={i} className="w-full h-full bg-white flex items-center justify-center text-xs font-semibold text-gray-300 rounded-[8px]">
                            IMG
                          </div>
                        );
                      })}
                    />
                  </div>
                  {/* Album Details Below Folder */}
                  <div className="px-2 text-center">
                    <h3 className="font-bold text-[#1e293b] text-lg line-clamp-2 leading-tight group-hover:text-[#1e3a8a] transition-colors">{album.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{new Date(album.createdAt).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-medium">Chưa có album nào.</div>
            )}
          </div>
        </div>
      </section>


    </div>
  );
}
