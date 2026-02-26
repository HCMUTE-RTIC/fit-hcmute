"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  Activity,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: { name: string; href: string }[];
};

const navigation: NavItem[] = [
  { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  {
    name: "Bài viết",
    href: "/admin/articles",
    icon: FileText,
    children: [
      { name: "Danh sách", href: "/admin/articles" },
      { name: "Thêm bài viết", href: "/admin/articles/new" },
    ],
  },
  { name: "Thư viện Ảnh", href: "/admin/albums", icon: ImageIcon },
  { name: "Form Đăng ký", href: "/admin/forms", icon: LayoutTemplate },
  { name: "Nhật ký hệ thống", href: "/admin/logs", icon: Activity },
  { name: "Cấu hình", href: "/admin/settings", icon: Settings },
];

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  // Track which menus are expanded by name
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );

  // Automatically expand menus if a child is active on initial load
  useEffect(() => {
    const newExpanded = { ...expandedMenus };
    let changed = false;
    navigation.forEach((item) => {
      if (item.children) {
        // If exact match or nested route
        const isChildActive = item.children.some(
          (child) =>
            pathname === child.href ||
            (child.href !== "/admin/articles" &&
              pathname?.startsWith(`${child.href}/`)),
        );
        // Special case for /admin/articles since it's the root of the others
        if (
          pathname === "/admin/articles" ||
          pathname?.startsWith("/admin/articles/")
        ) {
          if (item.name === "Bài viết") {
            if (!newExpanded[item.name]) {
              newExpanded[item.name] = true;
              changed = true;
            }
          }
        }
      }
    });
    if (changed) setExpandedMenus(newExpanded);
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-[#24303F] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 
      ${sidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full xl:translate-x-0"}`}
    >
      {/* Brand */}
      <div
        className={`flex h-20 shrink-0 items-center px-6 border-b border-transparent ${!sidebarOpen && "xl:px-0 xl:justify-center"}`}
      >
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-xl shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className={`text-xl font-bold text-slate-900 dark:text-white transition-opacity duration-300 ${!sidebarOpen ? "xl:hidden" : "block"}`}
          >
            FIT CMS
          </span>
        </Link>
        <button
          className="ml-auto lg:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`flex flex-1 flex-col overflow-y-auto py-4 space-y-1 ${sidebarOpen ? "px-4" : "px-2 xl:px-4"}`}
      >
        <div
          className={`text-xs font-semibold text-slate-400 dark:text-slate-500 mb-4 px-2 uppercase tracking-wider ${!sidebarOpen && "xl:hidden"}`}
        >
          Menu chính
        </div>

        {navigation.map((item) => {
          const hasChildren = !!item.children;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname?.startsWith(`${item.href}/`)) ||
            (hasChildren && pathname === item.href);
          const isExpanded = expandedMenus[item.name];

          return (
            <div key={item.name} className="flex flex-col">
              {hasChildren ? (
                // Dropdown Parent Button
                <button
                  onClick={() => {
                    if (!sidebarOpen) setSidebarOpen(true);
                    toggleMenu(item.name);
                  }}
                  className={`group relative flex items-center justify-between rounded-sm py-2.5 font-medium transition-colors duration-200 w-full
                    ${sidebarOpen ? "px-3" : "px-3 xl:justify-center"}
                    ${
                      isActive && !isExpanded
                        ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-500"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }
                  `}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-500"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`transition-opacity duration-300 ${!sidebarOpen ? "xl:hidden" : "block"}`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {/* Chevron Icon for Dropdown */}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${!sidebarOpen ? "xl:hidden" : "block"} ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                // Regular Link Button
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-sm py-2.5 font-medium transition-colors duration-200 
                    ${sidebarOpen ? "px-3" : "px-3 xl:justify-center"}
                    ${
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-500"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }
                  `}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`transition-opacity duration-300 ${!sidebarOpen ? "xl:hidden" : "block"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              )}

              {/* Dropdown Children Menu */}
              {hasChildren && isExpanded && sidebarOpen && (
                <div className="mt-1 flex flex-col space-y-1 pl-11 pr-3">
                  {item.children!.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`group relative flex items-center rounded-md py-2 px-3 text-sm font-medium transition-colors duration-200 
                          ${
                            isChildActive
                              ? "bg-slate-50 dark:bg-slate-800/50 text-blue-600 dark:text-blue-500"
                              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }
                        `}
                      >
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile/Footer */}
      <div
        className={`shrink-0 p-4 border-t border-slate-200 dark:border-slate-800 ${!sidebarOpen && "xl:p-2 xl:flex xl:justify-center"}`}
      >
        <button
          className={`group flex w-full items-center gap-x-3 rounded-md py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors ${sidebarOpen ? "px-3" : "px-0 xl:justify-center"}`}
        >
          <img
            className="h-8 w-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
          />
          <span
            className={`flex-1 truncate text-left font-medium text-slate-700 dark:text-slate-300 ${!sidebarOpen ? "xl:hidden" : "block"}`}
          >
            Tài khoản
          </span>
          <LogOut
            className={`h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 ${!sidebarOpen ? "xl:hidden" : "block"}`}
          />
        </button>
      </div>
    </aside>
  );
}
