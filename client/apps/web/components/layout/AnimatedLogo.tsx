"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export default function AnimatedLogo({ size = 56, className = "" }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const logo = "/logo-50-nam-4x.png";

  // Generate particles with pre-calculated positions to avoid hydration mismatch
  // Round to 2 decimal places to ensure server/client consistency
  const particles = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => {
      const angle = (i * 360) / 20;
      const radius = size * 0.80;
      const x = parseFloat((Math.cos((angle * Math.PI) / 180) * radius).toFixed(2));
      const y = parseFloat((Math.sin((angle * Math.PI) / 180) * radius).toFixed(2));
      return { id: i, x, y };
    }),
    [size]
  );

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particles rotating around the logo */}
      <div
        className="absolute inset-0 logo-particles-container"
        style={{
          animation: "logo-particle-spin 35s linear infinite",
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {particles.map((particle) => {
          return (
            <div
              key={particle.id}
              className="absolute"
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB, #60A5FA)",
                boxShadow: "0 0 6px rgba(37, 99, 235, 0.7)",
                top: "50%",
                left: "50%",
                transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
              }}
            />
          );
        })}
      </div>

      {/* Logo container with hover effects */}
      <motion.div
        className="relative w-full h-full rounded-full flex items-center justify-center"
        style={{
          filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.3)) drop-shadow(0 0 16px rgba(37, 99, 235, 0.2))",
        }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={logo}
            alt="HCMUTE Logo"
            fill
            sizes={`${size}px`}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
