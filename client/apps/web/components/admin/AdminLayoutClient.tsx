"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { usePathname, useRouter } from "next/navigation";
import { getAuthToken } from "../../lib/auth";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const token = getAuthToken();

    // Auth Guard Logic
    if (pathname === "/admin/login") {
      // Ignore auth requirement for login page itself
      setIsAuthenticated(true);
    } else {
      if (!token || token === "undefined") {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [pathname, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B1120]">
        <div className="animate-spin relative flex h-8 w-8">
          <span className="absolute inline-flex h-full w-full rounded-full border-2 border-slate-300/20 dark:border-slate-700/20"></span>
          <span className="absolute inline-flex h-full w-full rounded-full border-2 border-blue-600 border-t-transparent"></span>
        </div>
      </div>
    )
  }

  // Nếu đang ở trang Login, render riêng biệt phần lưới layout, xoá bỏ Header/Sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 relative overflow-x-hidden">
      {/* Magic UI Background Elements */}
      <div className="fixed inset-0 z-[-2] bg-slate-50 dark:bg-[#0B1120]"></div>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>
      <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "xl:pl-64" : "xl:pl-20"}`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 2xl:p-10">
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
