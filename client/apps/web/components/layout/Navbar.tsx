"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import { SettingsService } from "@/services/settings.service";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [kyYeuEnabled, setKyYeuEnabled] = useState(true);

  useEffect(() => {
    SettingsService.getAll().then((config) => {
      if (config["ky_yeu_enabled"] === "false") {
        setKyYeuEnabled(false);
      }
    });
  }, []);

  const allLinks = [
    { name: "TRANG CHỦ", path: "/home" },
    { name: "GIỚI THIỆU", path: "/gioi-thieu" },
    { name: "HÀNH TRÌNH 25 NĂM", path: "/hanh-trinh-25-nam" },
    { name: "THÀNH TỰU", path: "/thanh-tuu" },
    { name: "TRI ÂN", path: "/tri-an" },
    { name: "CHIA SẺ KỶ NIỆM", path: "/chia-se-ky-niem" },
    { name: "KỶ YẾU", path: "/ky-yeu" },
    { name: "THƯ VIỆN KỶ NIỆM", path: "/thu-vien" },
  ];

  const navLinks = allLinks.filter((link) => {
    if (link.path === "/ky-yeu" && !kyYeuEnabled) return false;
    return true;
  });

  // Split navigation into left and right for centered logo layout
  const mid = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, mid);
  const rightLinks = navLinks.slice(mid);

  const isActive = (path: string) => pathname === path;

  // Close menu on ESC key and prevent body scroll when mobile menu is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="sticky top-0 mt-5 left-0 right-0 z-50">
      {/* Main Navbar */}
      <nav
        className="relative overflow-visible"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {/* Mobile View - Logo Center, Menu Button Right */}
          <div className="flex lg:hidden items-center justify-center py-4 relative">
            <Link href="/" className="flex-shrink-0">
              <AnimatedLogo size={36} />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "var(--color-primary-900)" }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop View - Left Nav | Logo Center | Right Nav */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-center gap-6 py-5">
            {/* Left Navigation */}
            <div className="flex items-center justify-end space-x-4 xl:space-x-6 pr-3">
              {leftLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-[13px] font-bold tracking-wide transition-colors hover:text-[#2563EB] relative py-1 whitespace-nowrap"
                  style={{
                    color: isActive(link.path) ? "var(--color-primary-600)" : "var(--color-primary-900)",
                  }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "var(--color-primary-600)" }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Logo Circle Bump - Placeholder for spacing */}
            <div className="w-[80px] h-[35px]"></div>

            {/* Right Navigation */}
            <div className="flex items-center justify-start space-x-4 xl:space-x-6 pl-3">
              {rightLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-[13px] font-bold tracking-wide transition-colors hover:text-[#2563EB] relative py-1 whitespace-nowrap"
                  style={{
                    color: isActive(link.path) ? "var(--color-primary-600)" : "var(--color-primary-900)",
                  }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "var(--color-primary-600)" }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Logo Circle Bump - Desktop Only */}
        <div className="hidden lg:block">
          <div
            className="absolute left-1/2 bottom-3"
            style={{
              width: "90px",
              height: "90px",
              transform: "translate(-50%, 50%)",
            }}
          >
            <Link href="/" className="block w-full h-full">
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <AnimatedLogo size={48} />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            style={{ top: "70px" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed right-0 z-50 h-screen overflow-y-auto"
            style={{
              top: "70px",
              width: "min(300px, 75vw)",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
            }}
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg transition-all text-sm font-semibold"
                    style={{
                      color: isActive(link.path) ? "var(--color-primary-600)" : "var(--color-primary-900)",
                      backgroundColor: isActive(link.path) ? "rgba(37, 99, 235, 0.1)" : "transparent",
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}