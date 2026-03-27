"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken, setUserInfo } from "../../../lib/auth";
import { AuthService } from "../../../services/auth.service";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { toast } from "sonner";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await AuthService.login({ email, password });

            setAuthToken(data.access_token);
            setUserInfo(data.user);
            toast.success("Đăng nhập thành công!", {
                description: "Đang chuyển hướng vào hệ thống quản trị..."
            });

            setTimeout(() => {
                router.push("/admin");
            }, 500);
        } catch (error: any) {
            toast.error("Lỗi đăng nhập", {
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden p-4">
            {/* Background Magic Elements */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/80 dark:bg-[#1A222C]/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100 dark:border-slate-800/50">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-2xl mb-4 shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]">
                            25
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Quản trị Hệ thống
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Khoa Công nghệ Thông tin - HCMUTE
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email quản trị
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@hcmute.edu.vn"
                                    autoComplete="username"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 h-11"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Mật khẩu
                                    </Label>
                                    {/* <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Quên mật khẩu?</a> */}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 h-11"
                                    disabled={isLoading}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <span className="animate-spin relative flex h-4 w-4">
                                            <span className="absolute inline-flex h-full w-full rounded-full border-2 border-white/20"></span>
                                            <span className="absolute inline-flex h-full w-full rounded-full border-2 border-white border-t-transparent"></span>
                                        </span>
                                        Đang kiểm tra...
                                    </div>
                                ) : (
                                    "Đăng nhập"
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className="bg-slate-50/50 dark:bg-slate-800/30 px-8 py-5 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50">
                        Chỉ dành riêng cho Cán bộ / Core Team RTIC.
                    </div>
                </div>
            </div>
        </div>
    );
}
