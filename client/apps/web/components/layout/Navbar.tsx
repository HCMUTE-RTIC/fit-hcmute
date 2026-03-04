"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const logo = "/temp.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "TRANG CHỦ", path: "/home" },
    { name: "GIỚI THIỆU", path: "/gioi-thieu" },
    { name: "HÀNH TRÌNH 25 NĂM", path: "/hanh-trinh-25-nam" },
    { name: "TIN TỨC & SỰ KIỆN", path: "/tin-tuc" },
    { name: "THÀNH TỰU", path: "/thanh-tuu" },
    { name: "TRI ÂN & KẾT NỐI", path: "/tri-an" },
    { name: "THƯ VIỆN KỶ NIỆM", path: "/thu-vien" },
  ];

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
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div style={{ backgroundColor: "var(--color-primary-900)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-0.5 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6 text-white text-xs">
            <a href="tel:+84-028-37221223-8370" className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity">
              <Phone size={12} />
              <span className="hidden sm:inline">(+84 - 028) 37221223 - 8370</span>
            </a>
            <a href="mailto:kcntt@hcmute.edu.vn" className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity">
              <Mail size={12} />
              <span className="hidden sm:inline">kcntt@hcmute.edu.vn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Logo Row */}
          <div className="flex items-center justify-between lg:justify-center py-1.5 border-b border-gray-100">
            <Link href="/" className="flex flex-col items-center">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <Image src={logo} alt="HCMUTE Logo" fill className="object-contain" />
              </div>
            </Link>

            {/* Mobile Menu Button - Move to logo row for better UX */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "var(--color-primary-900)" }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Row - Desktop only */}
          <div className="hidden lg:flex items-center justify-center h-11">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-xs font-semibold transition-colors hover:text-[#2563EB] relative py-1"
                  style={{
                    color: isActive(link.path) ? "var(--color-primary-600)" : "var(--color-primary-900)",
                  }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "var(--color-primary-600)" }}
                    />
                  )}
                </Link>
              ))}
            </div>
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
            style={{ top: "105px" }}
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
              top: "105px",
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