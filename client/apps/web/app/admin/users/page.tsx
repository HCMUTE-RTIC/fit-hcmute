"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersService, UserItem, UserRequest } from "../../../services/users.service";
import { getAuthToken } from "../../../lib/auth";
import { Button } from "@workspace/ui/components/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@workspace/ui/components/dialog";
import { jwtDecode } from "jwt-decode";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";

export default function UsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<UserItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");

    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

    const [formData, setFormData] = useState<UserRequest>({
        name: "",
        email: "",
        password: "",
        role: "AUTHOR",
    });

    useEffect(() => {
        checkAuthAndFetch();
    }, [page, search]);

    const checkAuthAndFetch = async () => {
        try {
            const token = getAuthToken();
            if (!token || token === "undefined") {
                if (typeof window !== "undefined") localStorage.removeItem("accessToken");
                router.push("/login");
                return;
            }

            let decoded: any;
            try {
                decoded = jwtDecode(token);
            } catch (e) {
                if (typeof window !== "undefined") localStorage.removeItem("accessToken");
                router.push("/login");
                return;
            }

            if (decoded?.role !== "SUPER_ADMIN") {
                setError("Bạn không có quyền truy cập trang quản lý tài khoản.");
                setLoading(false);
                return;
            }

            setLoading(true);
            const res = await UsersService.getUsers(page, limit, search);
            setUsers(res.data);
            setTotalPages(res.meta.totalPages);
        } catch (err: any) {
            setError(err.message || "Lỗi khi tải danh sách người dùng.");
        } finally {
            setLoading(false);
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "SUPER_ADMIN":
                return "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400";
            case "EDITOR":
                return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
            case "AUTHOR":
                return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
            default:
                return "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400";
        }
    };

    // Handlers
    const handleOpenAdd = () => {
        setSelectedUser(null);
        setFormData({ name: "", email: "", password: "", role: "AUTHOR" });
        setIsFormOpen(true);
    };

    const handleOpenEdit = (user: UserItem) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, password: "", role: user.role });
        setIsFormOpen(true);
    };

    const handleOpenDelete = (user: UserItem) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (selectedUser) {
                // Edit 
                const updatePayload = { ...formData };
                if (!updatePayload.password) delete updatePayload.password;
                await UsersService.update(selectedUser.id, updatePayload);
            } else {
                // Add
                if (!formData.password) throw new Error("Vui lòng nhập mật khẩu");
                await UsersService.create(formData);
            }
            setIsFormOpen(false);
            checkAuthAndFetch();
        } catch (err: any) {
            alert(err.message || "Có lỗi xảy ra");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        setIsSubmitting(true);
        try {
            await UsersService.delete(selectedUser.id);
            setIsDeleteOpen(false);
            checkAuthAndFetch();
        } catch (err: any) {
            alert(err.message || "Xóa thất bại");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
                <h2 className="mb-2 text-lg font-semibold">Lỗi truy cập</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Quản lý Tài khoản
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Thêm, sửa, xoá và phân quyền người dùng trong hệ thống
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        placeholder="Tìm kiếm Email hoặc Tên..."
                        value={search}
                        onChange={(e: any) => { setSearch(e.target.value); setPage(1); }}
                        className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button onClick={handleOpenAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Thêm tài khoản
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#1A222C]">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50">
                                <TableHead>Người dùng</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Vai trò</TableHead>
                                <TableHead>Ngày tạo</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-slate-900 dark:text-slate-100">
                                                {user.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500">{user.email}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getRoleColor(
                                                user.role
                                            )}`}
                                        >
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-sm text-slate-500">
                                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="outline" size="icon" title="Chỉnh sửa" onClick={() => handleOpenEdit(user)}>
                                                <Edit2 className="h-4 w-4 text-blue-600" />
                                            </Button>
                                            <Button variant="outline" size="icon" title="Xóa" className="hover:bg-red-50 hover:text-red-600" onClick={() => handleOpenDelete(user)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                        Không tìm thấy người dùng nào
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800">
                        <span className="text-sm text-slate-500">
                            Trang {page} / {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                            >
                                Trước
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || loading}
                            >
                                Sau
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{selectedUser ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                                Mật khẩu
                                {selectedUser && <span className="text-xs text-slate-400 font-normal">(Bỏ trống nếu không đổi)</span>}
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                                required={!selectedUser}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <label className="text-sm font-medium">Vai trò</label>
                            <select
                                value={formData.role}
                                onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-input"
                            >
                                <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                <option value="EDITOR">EDITOR</option>
                                <option value="AUTHOR">AUTHOR</option>
                            </select>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} disabled={isSubmitting}>
                                Hủy
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {selectedUser ? "Cập nhật" : "Tạo tài khoản"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Xóa tài khoản</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xóa tài khoản <strong>{selectedUser?.name}</strong>? Hành động này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isSubmitting}>
                            Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Xác nhận xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
