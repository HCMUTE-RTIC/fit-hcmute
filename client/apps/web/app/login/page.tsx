"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Globe } from "@workspace/ui/components/globe";
import { AuthService } from "../../services/auth.service";
import { setAuthToken } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await AuthService.login({ email, password });
      
      // Save token securely (can adjust to cookies if needed later)
      setAuthToken(res.access_token);
      
      // Redirect to the admin dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background with MagicUI Globe */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-white/5 dark:bg-black/5">
        <Globe className="opacity-40" />
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute left-1/2 top-1/2 z-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />

      {/* Login Card (Glassmorphism layout) */}
      <div className="relative z-10 w-full max-w-md p-8 md:p-10">
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <div className="flex flex-col space-y-2 p-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Đăng nhập Admin
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Hệ thống quản trị Nội dung 25 năm FIT HCMUTE
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 px-8 pb-8">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hcmute.edu.vn"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white/50 px-3 py-2 text-sm text-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-50 dark:placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
                  >
                    Mật khẩu
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white/50 px-3 py-2 text-sm text-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-50 dark:placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
        </div>
        
        {/* Footer Credit */}
        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 backdrop-blur-sm">
          Thiết kế và phát triển bởi <span className="font-semibold text-slate-700 dark:text-slate-300">CLB HCMUTE RTIC</span>
        </p>
      </div>
    </div>
  );
}
