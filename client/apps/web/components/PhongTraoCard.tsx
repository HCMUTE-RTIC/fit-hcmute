"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface PhongTraoActivity {
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  images: [string, string]; // [m1, m2]
}

export function PhongTraoCard({
  activity,
  index,
}: {
  activity: PhongTraoActivity;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Images side */}
      <div
        className={`relative grid grid-cols-2 gap-0 h-[420px] ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Image 1 */}
        <div className="relative overflow-hidden">
          <Image
            src={activity.images[0]}
            alt={`${activity.title} 1`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%)`,
            }}
          />
        </div>
        {/* Image 2 */}
        <div className="relative overflow-hidden">
          <Image
            src={activity.images[1]}
            alt={`${activity.title} 2`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%)`,
            }}
          />
        </div>
        {/* Gradient overlay badge */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 py-4"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
        >
          <span className="text-white font-bold text-lg drop-shadow">
            {activity.emoji} {activity.title}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div
        className={`flex flex-col justify-center px-8 py-10 bg-white ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Top accent bar */}
        <div
          className="w-12 h-1.5 rounded-full mb-6"
          style={{ background: activity.gradient }}
        />

        <p
          className="text-sm font-bold uppercase tracking-widest mb-2"
          style={{ color: activity.accentColor }}
        >
          {activity.subtitle}
        </p>
        <h3
          className="font-extrabold mb-4 leading-tight"
          style={{ fontSize: "clamp(22px, 2.5vw, 30px)", color: "var(--color-primary-900)" }}
        >
          {activity.title}
        </h3>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-text-gray)" }}>
          {activity.description}
        </p>


      </div>
    </motion.div>
  );
}
