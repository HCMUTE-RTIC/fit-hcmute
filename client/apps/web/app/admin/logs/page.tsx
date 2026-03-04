"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditLogsService, AuditLogItem } from "../../../services/audit-logs.service";
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
} from "@workspace/ui/components/dialog";
import dynamic from "next/dynamic";
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

export default function AuditLogsPage() {
    const router = useRouter();
    const [logs, setLogs] = useState<AuditLogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(20);

    // Dialog state
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

    useEffect(() => {
        checkAuthAndFetch();
    }, [page]);

    const checkAuthAndFetch = async () => {
        try {
            const token = getAuthToken();
            if (!token || token === "undefined") {
                if (typeof window !== "undefined") localStorage.removeItem("accessToken");
                router.push("/login");
                return;
            }

            // 1. Role Check
            let decoded: any;
            try {
                decoded = jwtDecode(token);
            } catch (e) {
                if (typeof window !== "undefined") localStorage.removeItem("accessToken");
                router.push("/login");
                return;
            }

            if (decoded?.role !== "SUPER_ADMIN") {
                setError("Bạn không có quyền truy cập trang này.");
                setLoading(false);
                return;
            }

            // 2. Fetch Data
            setLoading(true);
            const res = await AuditLogsService.getAuditLogs(page, limit);
            setLogs(res.data);
            setTotalPages(res.meta.totalPages);
        } catch (err: any) {
            setError(err.message || "Lỗi khi tải dữ liệu Audit Log.");
        } finally {
            setLoading(false);
        }
    };

    const openDetails = (log: AuditLogItem) => {
        setSelectedLog(log);
        setDetailsOpen(true);
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case "CREATE":
                return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
            case "UPDATE":
                return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
            case "DELETE":
                return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400";
        }
    };

    if (loading && logs.length === 0) {
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Nhật ký hệ thống (Audit Logs)
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Xem lịch sử thay đổi dữ liệu trên toàn hệ thống. Chỉ dành cho Super Admin.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#1A222C]">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50">
                                <TableHead>Thời gian</TableHead>
                                <TableHead>Người dùng</TableHead>
                                <TableHead>Hành động</TableHead>
                                <TableHead>Thực thể (Entity)</TableHead>
                                <TableHead>Entity ID</TableHead>
                                <TableHead className="text-right">Chi tiết</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="whitespace-nowrap text-sm">
                                        {new Date(log.createdAt).toLocaleString("vi-VN")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                                                {log.user?.name?.charAt(0) || "?"}
                                            </div>
                                            <span className="text-sm font-medium">{log.user?.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getActionColor(
                                                log.action
                                            )}`}
                                        >
                                            {log.action}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-medium">{log.entity}</TableCell>
                                    <TableCell className="font-mono text-xs text-slate-500">{log.entityId.substring(0, 8)}...</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => openDetails(log)}>
                                            Xem
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {logs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                        Không có nhật ký nào
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

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="w-[95vw] max-w-4xl sm:max-w-4xl lg:max-w-5xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Chi tiết thay đổi</DialogTitle>
                    </DialogHeader>
                    {selectedLog && (
                        <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-semibold text-slate-500">ID:</span>{" "}
                                    <span className="font-mono">{selectedLog.id}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">Người dùng:</span>{" "}
                                    {selectedLog.user.name} ({selectedLog.user.email})
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">Thực thể:</span>{" "}
                                    {selectedLog.entity}
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">Hành động:</span>{" "}
                                    <span className={getActionColor(selectedLog.action)}>{selectedLog.action}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">IP:</span>{" "}
                                    {selectedLog.ipAddress || "N/A"}
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">Thời gian:</span>{" "}
                                    {new Date(selectedLog.createdAt).toLocaleString("vi-VN")}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700 dark:text-slate-300">Dữ liệu Cũ</h4>
                                    <div className="rounded-lg border border-slate-200 p-4 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-x-auto">
                                        {selectedLog.oldValues ? (
                                            <ReactJson
                                                src={selectedLog.oldValues}
                                                theme="rjv-default"
                                                collapsed={2}
                                                displayDataTypes={false}
                                                enableClipboard={false}
                                            />
                                        ) : (
                                            <span className="text-slate-400 italic">Không có dữ liệu</span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700 dark:text-slate-300">Dữ liệu Mới</h4>
                                    <div className="rounded-lg border border-slate-200 p-4 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-x-auto">
                                        {selectedLog.newValues ? (
                                            <ReactJson
                                                src={selectedLog.newValues}
                                                theme="rjv-default"
                                                collapsed={2}
                                                displayDataTypes={false}
                                                enableClipboard={false}
                                            />
                                        ) : (
                                            <span className="text-slate-400 italic">Không có dữ liệu</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
