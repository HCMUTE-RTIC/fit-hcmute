"use client";

import { useEffect, useState, useRef } from "react";
import { Settings, Upload, FileText, Eye, EyeOff, Save, CheckCircle, AlertCircle } from "lucide-react";
import { SettingsService } from "@/services/settings.service";
import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    SettingsService.getAll().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const kyYeuEnabled = settings["ky_yeu_enabled"] !== "false";
  const kyYeuPdfUrl = settings["ky_yeu_pdf_url"] || "";

  const toggleKyYeu = async () => {
    const newValue = kyYeuEnabled ? "false" : "true";
    setSaving(true);
    setMessage(null);
    try {
      await SettingsService.update({ ky_yeu_enabled: newValue });
      setSettings((prev) => ({ ...prev, ky_yeu_enabled: newValue }));
      setMessage({ type: "success", text: `Trang kỷ yếu đã ${newValue === "true" ? "bật" : "tắt"}` });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Lỗi khi cập nhật" });
    } finally {
      setSaving(false);
    }
  };

  const handleUploadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Chỉ chấp nhận file PDF" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/api/media/upload`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload thất bại");

      const result = await res.json();
      const pdfUrl = result.data.url;

      await SettingsService.update({ ky_yeu_pdf_url: pdfUrl });
      setSettings((prev) => ({ ...prev, ky_yeu_pdf_url: pdfUrl }));
      setMessage({ type: "success", text: "Upload PDF kỷ yếu thành công" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Lỗi khi upload" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Settings size={28} />
          Cấu hình hệ thống
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Quản lý cấu hình chung cho website
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg mb-6 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Kỷ yếu Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText size={20} />
            Trang Kỷ yếu
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Toggle bật/tắt */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Hiển thị trang Kỷ yếu
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Bật/tắt trang kỷ yếu trên menu và website công khai
              </p>
            </div>
            <button
              onClick={toggleKyYeu}
              disabled={saving}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                kyYeuEnabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  kyYeuEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {kyYeuEnabled ? (
              <>
                <Eye size={16} className="text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Đang hiển thị</span>
              </>
            ) : (
              <>
                <EyeOff size={16} className="text-slate-400" />
                <span className="text-sm text-slate-500 font-medium">Đã ẩn</span>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-slate-700" />

          {/* Upload PDF */}
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              File PDF Kỷ yếu
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Upload file PDF kỷ yếu để hiển thị trên trang công khai
            </p>

            {/* Current PDF */}
            {kyYeuPdfUrl && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 mb-4">
                <FileText size={20} className="text-blue-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {kyYeuPdfUrl.split("/").pop()}
                  </p>
                  <p className="text-xs text-slate-500">PDF hiện tại</p>
                </div>
                <a
                  href={kyYeuPdfUrl.startsWith("http") ? kyYeuPdfUrl : `${API_URL}${kyYeuPdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-medium shrink-0"
                >
                  Xem
                </a>
              </div>
            )}

            {/* Upload button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Đang upload...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>{kyYeuPdfUrl ? "Thay đổi PDF" : "Upload PDF"}</span>
                </>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleUploadPdf}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
