"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Camera, Menu, ImageIcon } from "lucide-react";

const imgItFestival = "/temp.jpg";
const imgAiML = "/temp.jpg";
const imgTotNghiep = "/temp.jpg";
const imgGoogleSingapore = "/temp.jpg";
const imgKhoiNghiep = "/temp.jpg";

// ─── Video data ───────────────────────────────────────────────────────────────
const videos = [
  {
    id: 1,
    thumbnail: "/temp.jpg",
    title: "Lễ Kỷ Niệm 25 Năm Thành Lập Khoa CNTT",
    duration: "8:45",
    size: "large",
  },
  {
    id: 2,
    thumbnail: "/temp.jpg",
    title: "Hội Thảo Quốc Tế AI & Machine Learning",
    duration: "8:45",
    size: "small",
  },
  {
    id: 3,
    thumbnail: "/temp.jpg",
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

// ─── Filter categories ────────────────────────────────────────────────────────
const categories = ["Tất cả", "Sự kiện", "Hội thảo", "Hợp tác", "Tốt nghiệp", "Khởi nghiệp"];

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
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  return (
    <div className="min-h-screen" style={{ paddingTop: "120px" }}>
      {/* ─── Section 1: Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#f0f9ff",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center gap-6"
          >
            {/* Camera icon */}
            <div>
              <Camera size={64} color="#2563EB" strokeWidth={1.5} />
            </div>

            <h1
              className="font-extrabold"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: "72px",
                color: "#1e3a8a",
              }}
            >
              Life at FIT-HCMUTE
            </h1>
            <p
              style={{
                fontSize: 20,
                lineHeight: "32.5px",
                color: "#64748b",
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
          {/* Filter bar */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <button className="flex items-center gap-2 p-1 hover:opacity-70 transition-opacity">
              <Menu size={24} color="#0C0C0C" />
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full font-semibold transition-all"
                style={{
                  fontSize: 14,
                  backgroundColor: activeCategory === cat ? "#1e3a8a" : "#f3f4f6",
                  color: activeCategory === cat ? "white" : "#64748b",
                  lineHeight: "20px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry 3-column photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {/* Placeholder slot matching Figma */}
              <div
                className="bg-[#f3f4f6] flex items-center justify-center"
                style={{ borderRadius: 16, height: 256 }}
              >
                <ImageIcon size={88} color="#9ca3af" strokeWidth={1.5} />
              </div>
              <PhotoCard
                src={imgTotNghiep}
                alt="Lễ Tốt nghiệp K15"
                label={null}
                labelColor={null}
                height={364}
                delay={0.3}
              />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <PhotoCard
                src={imgItFestival}
                alt="IT Festival 2015"
                label="Hội thảo"
                labelColor="#7797d7"
                height={366}
                delay={0.1}
              />
              <PhotoCard
                src={imgGoogleSingapore}
                alt="Chuyến tham quan Google Singapore"
                label={null}
                labelColor={null}
                height={256}
                delay={0.4}
              />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <PhotoCard
                src={imgAiML}
                alt="Hội thảo AI & Machine Learning 2020"
                label={null}
                labelColor={null}
                height={256}
                delay={0.2}
              />
              <PhotoCard
                src={imgKhoiNghiep}
                alt="Ngày Hội Khởi Nghiệp 2022"
                label={null}
                labelColor={null}
                height={375}
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Video Gallery ─────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col gap-4 mb-10"
          >
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                lineHeight: "72px",
                color: "#1e3a8a",
              }}
            >
              VIDEO KỶ NIỆM
            </h2>
            <p style={{ fontSize: 20, lineHeight: "28px", color: "#64748b" }}>
              Những câu chuyện được kể qua hình ảnh động
            </p>
          </motion.div>

          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-8">
            <button className="flex items-center gap-2 p-1 hover:opacity-70 transition-opacity">
              <Menu size={24} color="#0C0C0C" />
            </button>
          </div>

          {/* Video grid — Row 1: large (2/3) + small (1/3) */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
              {videos[0] && (
                <VideoCard
                  thumbnail={videos[0].thumbnail}
                  title={videos[0].title}
                  duration={videos[0].duration}
                  delay={0}
                />
              )}
              {videos[1] && (
                <VideoCard
                  thumbnail={videos[1].thumbnail}
                  title={videos[1].title}
                  duration={videos[1].duration}
                  delay={0.1}
                />
              )}
            </div>

            {/* Row 2: equal halves */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {videos[2] && (
                <VideoCard
                  thumbnail={videos[2].thumbnail}
                  title={videos[2].title}
                  duration={videos[2].duration}
                  delay={0.2}
                />
              )}
              {videos[3] && (
                <VideoCard
                  thumbnail={videos[3].thumbnail}
                  title={videos[3].title}
                  duration={videos[3].duration}
                  delay={0.3}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
