"use client"

import { motion } from "framer-motion";
import { Heart, Send, Calendar, Mail, User } from "lucide-react";
import { useState } from "react";

export default function Alumni() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    graduationYear: "",
    message: "",
    attendEvent: "no",
    numberOfGuests: "1",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        graduationYear: "",
        message: "",
        attendEvent: "no",
        numberOfGuests: "1",
      });
    }, 3000);
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
            <p
              className="text-xl leading-relaxed text-gray-200 mb-10"
            >
              Tri ân người đi trước, kết nối thế hệ mai sau. Hãy để lại lời chúc hoặc đăng ký tham dự để cùng viết tiếp hành trình rực rỡ này
            </p>
            <button
              onClick={() => {
                document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
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
            className="bg-white rounded-2xl p-8 md:p-12"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <h2
              className="font-bold text-center mb-8"
              style={{ fontSize: "32px", color: "var(--color-primary-600)" }}
            >
              GỬI LỜI CHÚC & ĐĂNG KÝ THAM DỰ
            </h2>

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
                  Lời chúc của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    style={{
                      borderColor: "#E2E8F0",
                      color: "#1e293b",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                    }}
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
                    style={{
                      borderColor: "#E2E8F0",
                      color: "#1e293b",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                    }}
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
                    style={{
                      borderColor: "#E2E8F0",
                      color: "#1e293b",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                    }}

                  />
                </div>

                {/* Attend Event */}
                <div>
                  <label
                    htmlFor="attendEvent"
                    className="flex items-center space-x-2 mb-2 font-semibold"
                    style={{ color: "var(--color-primary-900)" }}
                  >
                    <Calendar size={18} />
                    <span>Bạn có tham dự sự kiện không? *</span>
                  </label>
                  <select
                    id="attendEvent"
                    name="attendEvent"
                    value={formData.attendEvent}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white text-gray-900"
                    style={{
                      borderColor: "#E2E8F0",
                      color: "#1e293b",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                    }}
                  >
                    <option value="no">Không</option>
                    <option value="yes">Có</option>
                  </select>
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
                    style={{
                      borderColor: "#E2E8F0",
                      color: "#1e293b",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E2E8F0";
                    }}
                    placeholder="Chia sẻ kỷ niệm đẹp của bạn với Khoa CNTT hoặc gửi lời chúc mừng nhân dịp 25 năm thành lập..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all flex items-center justify-center space-x-2 text-lg"
                  style={{ backgroundColor: "var(--color-primary-600)" }}
                >
                  <Send size={20} />
                  <span>Gửi lời chúc</span>
                </button>


              </form>
            )}
          </motion.div>
        </div>
      </section>


    </div>
  );
}
