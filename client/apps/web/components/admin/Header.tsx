"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
  User,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "../../lib/auth";

export function Header({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push("/admin/login");
  };

  // Use state strictly on client side to prevent hydration mismatches for theme icons
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex w-full h-20 bg-white/70 dark:bg-[#1A222C]/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="flex flex-1 items-center justify-between px-4 md:px-6 2xl:px-11">
        {/* Left Side: Toggle button & Search */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="z-50 block rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 shadow-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            <span className="sr-only">Thu phóng menu</span>
            <Menu
              className="h-5 w-5 text-slate-600 dark:text-slate-300"
              aria-hidden="true"
            />
          </button>

          <div className="hidden sm:block">
            <form action="#" method="POST">
              <div className="relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500" />
                </button>
                <input
                  type="text"
                  placeholder="Tìm kiếm nhanh..."
                  className="w-full bg-slate-100/50 dark:bg-slate-800/50 rounded-full py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 xl:w-125 dark:placeholder-slate-500 transition-all border border-transparent focus:border-blue-500/30"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Icons & Profile */}
        <div className="flex items-center gap-3 2x:gap-7">
          <ul className="flex items-center gap-2 2x:gap-4">
            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 transition"
              >
                {mounted &&
                  (theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  ))}
              </button>
            </li>

            {/* Notification */}
            <li>
              <button className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 transition">
                <span className="absolute -right-0.5 -top-0.5 z-10 h-2 w-2 rounded-full bg-red-500">
                  <span className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                </span>
                <Bell className="h-5 w-5" />
              </button>
            </li>
          </ul>

          {/* User Profile Dropdown */}
          <div
            className="relative flex items-center gap-4 pl-2"
            ref={dropdownRef}
          >
            <button
              className="flex items-center gap-4 focus:outline-none rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 p-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-slate-900 dark:text-slate-100">
                  Cán bộ Quản lý
                </span>
                <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Supper Admin
                </span>
              </span>
              <span className="h-10 w-10 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="rounded-full border border-slate-200 dark:border-slate-700"
                />
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-14 mt-2 w-56 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#24303F] shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Cán bộ Quản lý
                  </p>
                  <p className="text-sm truncate text-slate-500 dark:text-slate-400">
                    admin@fit.hcmute.edu.vn
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <User className="h-4 w-4" /> Tài khoản của tôi
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <SettingsIcon className="h-4 w-4" /> Cài đặt hệ thống
                  </Link>
                </div>
                <div className="py-1 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <LogOut className="h-4 w-4" /> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
