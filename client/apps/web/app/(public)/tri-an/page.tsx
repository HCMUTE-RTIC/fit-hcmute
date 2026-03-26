"use client"

import { motion } from "framer-motion";
import { Heart, Send, Calendar, Mail, User, AlertCircle } from "lucide-react";
import { useState } from "react";
import { FormsService } from "@/services/forms.service";
import { WishesWall } from "@/components/wishes/wishes-wall";

export default function Alumni() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    graduationYear: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await FormsService.submit("loi-chuc", {
        full_name: formData.fullName,
        email: formData.email,
        ...(formData.graduationYear ? { graduation_year: formData.graduationYear } : {}),
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* Hero Section */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/tri-an/banner_trian.jpg"
            alt="Banner Tri ân"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Heart size={64} className="mx-auto mb-6 text-white" />
            <h1
              className="font-extrabold mb-6 text-white"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
              }}
            >
              TRI ÂN & KẾT NỐI
            </h1>
            <p className="text-xl leading-relaxed text-gray-200 mb-10">
              Tri ân người đi trước, kết nối thế hệ mai sau. Hãy gửi lời chúc tốt đẹp nhân dịp kỷ niệm 25 năm thành lập Khoa CNTT
            </p>
            <button
              onClick={() => {
                document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all space-x-2 text-lg shadow-lg"
              style={{ backgroundColor: "var(--color-primary-600)" }}
            >
              <Send size={20} />
              <span>Gửi lời chúc</span>
            </button>
          </motion.div>
        </div>
      </section>

      <section
        id="registration-form"
        className="py-24"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            {/* Banner */}
            <div className="relative w-full h-48 md:h-64">
              <img
                src="/trang-chu-home/banner_trangchu.jpg"
                alt="Banner kỷ niệm 25 năm Khoa CNTT"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2
                  className="font-bold text-white text-center"
                  style={{ fontSize: "32px", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  GỬI LỜI CHÚC
                </h2>
              </div>
            </div>

            <div className="p-8 md:p-12">

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "var(--color-bg-light)" }}
                >
                  <Send size={40} style={{ color: "var(--color-primary-600)" }} />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: "24px", color: "var(--color-primary-900)" }}
                >
                  Cảm ơn bạn!
                </h3>
                <p style={{ color: "var(--color-text-gray)" }}>
                  Lời chúc của bạn đã được gửi thành công và đang chờ ban tổ chức duyệt. Chúng tôi sẽ liên hệ với bạn sớm nhất.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="flex items-center space-x-2 mb-2 font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    <User size={18} />
                    <span>Họ và tên *</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                    style={{ borderColor: "#E2E8F0", color: "#1e293b" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center space-x-2 mb-2 font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    <Mail size={18} />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                    style={{ borderColor: "#E2E8F0", color: "#1e293b" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                    placeholder="email@example.com"
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label
                    htmlFor="graduationYear"
                    className="flex items-center space-x-2 mb-2 font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    <Calendar size={18} />
                    <span>Khóa/Năm tốt nghiệp</span>
                  </label>
                  <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                    style={{ borderColor: "#E2E8F0", color: "#1e293b" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                    placeholder="VD: Khóa 2020, 2018..."
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="flex items-center space-x-2 mb-2 font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    <Heart size={18} />
                    <span>Lời chúc mừng / Chia sẻ kỷ niệm *</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors resize-none bg-white text-gray-900"
                    style={{ borderColor: "#E2E8F0", color: "#1e293b" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary-600)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; }}
                    placeholder="Chia sẻ kỷ niệm đẹp của bạn với Khoa CNTT hoặc gửi lời chúc mừng nhân dịp 25 năm thành lập..."
                  />
                </div>

                {/* Submit Button */}
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
                      <Send size={20} />
                      <span>Gửi lời chúc</span>
                    </>
                  )}
                </button>
              </form>
            )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lời chúc từ cộng đồng */}
      <WishesWall maxWishes={9} showCta={false} />
    </div>
  );
}
