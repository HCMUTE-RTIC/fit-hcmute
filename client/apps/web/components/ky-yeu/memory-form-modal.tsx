"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, User, Mail, MessageSquare, AlertCircle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { FormsService } from "@/services/forms.service";

interface MemoryFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function MemoryFormModal({ open, onClose, onSuccess }: MemoryFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    caption: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh (JPG, PNG, ...)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ảnh không được vượt quá 5MB");
      return;
    }

    setImageFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Vui lòng chọn ảnh kỷ niệm");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await FormsService.submitWithMedia(
        "chia-se-ky-niem",
        {
          full_name: formData.fullName,
          email: formData.email,
          caption: formData.caption,
        },
        imageFile,
      );
      setSubmitted(true);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ fullName: "", email: "", caption: "" });
      setImageFile(null);
      setImagePreview(null);
      setError(null);
      setSubmitted(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold" style={{ color: "#0f172a" }}>
                Chia sẻ kỷ niệm
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-50">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>
                    Cảm ơn bạn!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Kỷ niệm của bạn đã được gửi thành công và đang chờ duyệt.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm"
                    style={{ backgroundColor: "#1E3A8A" }}
                  >
                    Đóng
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label htmlFor="mem-fullName" className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700">
                      <User size={15} />
                      <span>Họ và tên *</span>
                    </label>
                    <input
                      type="text"
                      id="mem-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors text-sm bg-white text-gray-900"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="mem-email" className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700">
                      <Mail size={15} />
                      <span>Email *</span>
                    </label>
                    <input
                      type="email"
                      id="mem-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors text-sm bg-white text-gray-900"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Caption */}
                  <div>
                    <label htmlFor="mem-caption" className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700">
                      <MessageSquare size={15} />
                      <span>Lời bình / Kỷ niệm *</span>
                    </label>
                    <textarea
                      id="mem-caption"
                      name="caption"
                      value={formData.caption}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm bg-white text-gray-900"
                      placeholder="Chia sẻ kỷ niệm đẹp của bạn với Khoa CNTT..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700">
                      <ImageIcon size={15} />
                      <span>Ảnh kỷ niệm * (tối đa 5MB)</span>
                    </label>

                    {imagePreview ? (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-8 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500"
                      >
                        <Upload size={28} />
                        <span className="text-sm font-medium">Nhấn để chọn ảnh</span>
                        <span className="text-xs">JPG, PNG — Tối đa 5MB</span>
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#1E3A8A" }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Chia sẻ kỷ niệm</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
