"use client";

import { useState } from "react";
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
    { name: "TRANG CHỦ", path: "/" },
    { name: "GIỚI THIỆU", path: "/gioi-thieu" },
    { name: "HÀNH TRÌNH 25 NĂM", path: "/hanh-trinh-25-nam" },
    { name: "TIN TỨC & SỰ KIỆN", path: "/tin-tuc" },
    { name: "THÀNH TỰU", path: "/thanh-tuu" },
    { name: "TRI ÂN & KẾT NỐI", path: "/tri-an" },
    { name: "THƯ VIỆN KỶ NIỆM", path: "/thu-vien" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "var(--color-primary-900)" }}>
        <div className="max-w-[1280px] mx-auto px-6 py-0.5 flex items-center justify-between">
          <div className="flex items-center space-x-6 text-white text-xs">
            <a href="tel:02838962131" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Phone size={12} />
              <span>Liên hệ</span>
            </a>
            <a href="mailto:bmc@hcmute.edu.vn" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Mail size={12} />
              <span>bmc@hcmute.edu.vn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className="fixed left-0 right-0 z-40"
        style={{
          top: "24px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Logo Row */}
          <div className="flex items-center justify-center py-1.5 border-b border-gray-100">
            <Link href="/" className="flex flex-col items-center">
              <div className="relative h-14 w-14">
                <Image src={logo} alt="HCMUTE Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>

          {/* Navigation Row */}
          <div className="flex items-center justify-center h-11">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
              style={{ color: "var(--color-primary-900)" }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md fixed inset-x-0 z-30"
            style={{ top: "108px" }}
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 transition-colors text-base font-semibold border-b border-gray-100"
                  style={{
                    color: isActive(link.path) ? "var(--color-primary-600)" : "var(--color-primary-900)",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}