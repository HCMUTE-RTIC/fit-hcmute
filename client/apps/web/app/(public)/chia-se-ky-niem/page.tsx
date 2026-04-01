"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, User, Mail, MessageSquare, AlertCircle, CheckCircle, X, Image as ImageIcon, BadgeCheck } from "lucide-react";
import { FormsService } from "@/services/forms.service";

export default function ChiaSeKyNiemPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    vai_tro: "",
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
          vai_tro_sv_khoa_cuu_sv_khoa_giang_vien: formData.vai_tro,
          caption: formData.caption,
        },
        imageFile,
      );
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", vai_tro: "", caption: "" });
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* Hero */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/gioi-thieu/CNTT_1.jpg"
            alt="Banner chia sẻ kỷ niệm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Camera size={56} className="mx-auto mb-5 text-white" />
            <h1
              className="font-extrabold mb-4 text-white"
              style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
            >
              CHIA SẺ KỶ NIỆM
            </h1>
            <p className="text-lg leading-relaxed text-gray-200 mb-8">
              Hãy chia sẻ những khoảnh khắc đáng nhớ của bạn cùng Khoa CNTT nhân dịp kỷ niệm 25 năm thành lập
            </p>
            <button
              onClick={() => {
                document.getElementById("share-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all text-lg shadow-lg"
              style={{ backgroundColor: "var(--color-primary-600)" }}
            >
              <Upload size={20} />
              <span>Chia sẻ ngay</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section
        id="share-form"
        className="py-24"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-[700px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            {/* Banner */}
            <div className="relative w-full h-44 md:h-56">
              <img
                src="/trang-chu-home/banner_trangchu.jpg"
                alt="Banner kỷ niệm 25 năm Khoa CNTT"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2
                  className="font-bold text-white text-center"
                  style={{ fontSize: "28px", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  Chia sẻ kỷ niệm của bạn
                </h2>
              </div>
            </div>

            <div className="p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-50">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: "22px", color: "var(--color-primary-900)" }}
                  >
                    Cảm ơn bạn!
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--color-text-gray)" }}>
                    Kỷ niệm của bạn đã được gửi thành công và đang chờ ban tổ chức duyệt.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-all"
                    style={{ backgroundColor: "var(--color-primary-600)" }}
                  >
                    Gửi thêm kỷ niệm khác
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
                    <label
                      htmlFor="cs-fullName"
                      className="flex items-center space-x-2 mb-2 font-semibold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      <User size={18} />
                      <span>Họ và tên *</span>
                    </label>
                    <input
                      type="text"
                      id="cs-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                      style={{ borderColor: "#E2E8F0" }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="cs-email"
                      className="flex items-center space-x-2 mb-2 font-semibold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      <Mail size={18} />
                      <span>Email *</span>
                    </label>
                    <input
                      type="email"
                      id="cs-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                      style={{ borderColor: "#E2E8F0" }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Vai trò */}
                  <div>
                    <label
                      htmlFor="cs-vai_tro"
                      className="flex items-center space-x-2 mb-2 font-semibold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      <BadgeCheck size={18} />
                      <span>Vai trò (SV khóa ..., Cựu SV khóa ..., Giảng viên, ...) *</span>
                    </label>
                    <input
                      type="text"
                      id="cs-vai_tro"
                      name="vai_tro"
                      value={formData.vai_tro}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                      style={{ borderColor: "#E2E8F0" }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                      placeholder="VD: SV khóa 2020, Cựu SV khóa 2015, Giảng viên..."
                    />
                  </div>

                  {/* Caption */}
                  <div>
                    <label
                      htmlFor="cs-caption"
                      className="flex items-center space-x-2 mb-2 font-semibold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      <MessageSquare size={18} />
                      <span>Lời bình / Kỷ niệm *</span>
                    </label>
                    <textarea
                      id="cs-caption"
                      name="caption"
                      value={formData.caption}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors resize-none bg-white text-gray-900"
                      style={{ borderColor: "#E2E8F0" }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                      placeholder="Chia sẻ kỷ niệm đẹp của bạn với Khoa CNTT..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="flex items-center space-x-2 mb-2 font-semibold" style={{ color: "var(--color-primary-900)" }}>
                      <ImageIcon size={18} />
                      <span>Ảnh kỷ niệm * (tối đa 5MB, chỉ 1 ảnh)</span>
                    </label>

                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-52 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-10 rounded-xl border-2 border-dashed hover:border-blue-400 transition-colors flex flex-col items-center gap-3"
                        style={{ borderColor: "#E2E8F0", color: "#94a3b8" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#2563EB"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
                      >
                        <Upload size={32} />
                        <span className="text-sm font-semibold">Nhấn để chọn ảnh</span>
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
                    className="w-full py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all flex items-center justify-center space-x-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--color-primary-600)" }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Camera size={20} />
                        <span>Chia sẻ kỷ niệm</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
