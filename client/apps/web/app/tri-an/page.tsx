"use client"

import { motion } from "framer-motion";
import { Heart, Send, Calendar, MapPin, Mail, User, Users } from "lucide-react";
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
    <div className="min-h-screen" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section
        className="relative"
        style={{ 
          backgroundColor: "var(--color-bg-light)",
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Heart size={64} className="mx-auto mb-6" style={{ color: "var(--color-accent-500)" }} />
            <h1
              className="font-extrabold mb-6"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
                color: "var(--color-primary-900)",
              }}
            >
              TRI ÂN & KẾT NỐI
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--color-text-gray)" }}
            >
              Gửi lời chúc mừng, chia sẻ kỷ niệm hoặc đăng ký tham dự các sự kiện kỷ niệm 25 năm.
              Hãy cùng chúng tôi tạo nên những khoảnh khắc đáng nhớ!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2
              className="font-bold text-center mb-12"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              SỰ KIỆN KỶ NIỆM CHÍNH
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Calendar,
                title: "Lễ Kỷ niệm 25 năm",
                date: "15/03/2025 - 9:00 AM",
                location: "Hội trường A, HCMUTE",
              },
              {
                icon: Users,
                title: "Hội thảo Công nghệ AI",
                date: "20/03/2025 - 2:00 PM",
                location: "Phòng hội nghị B3",
              },
              {
                icon: Heart,
                title: "Gala Tri ân",
                date: "25/03/2025 - 6:00 PM",
                location: "Khách sạn Pullman",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 rounded-2xl p-6 hover:shadow-lg transition-all"
                style={{ borderColor: "var(--color-primary-600)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <event.icon size={28} className="text-white" />
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: "20px", color: "var(--color-primary-900)" }}
                >
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm" style={{ color: "var(--color-text-gray)" }}>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
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
              style={{ fontSize: "var(--text-h3)", color: "var(--color-primary-900)" }}
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
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-border)";
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
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-border)";
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
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-border)";
                    }}
                    placeholder="Khóa 2015 hoặc 2019"
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
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-border)";
                    }}
                  >
                    <option value="no">Chưa chắc chắn</option>
                    <option value="yes">Có, tôi sẽ tham dự</option>
                    <option value="maybe">Có thể</option>
                  </select>
                </div>

                {/* Number of Guests */}
                {formData.attendEvent === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="numberOfGuests"
                      className="flex items-center space-x-2 mb-2 font-semibold"
                      style={{ color: "var(--color-primary-900)" }}
                    >
                      <User size={18} />
                      <span>Số lượng khách đi cùng</span>
                    </label>
                    <select
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                      style={{
                        borderColor: "var(--color-border)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-primary-600)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--color-border)";
                      }}
                    >
                      <option value="1">Chỉ mình tôi</option>
                      <option value="2">2 người</option>
                      <option value="3-5">3-5 người</option>
                      <option value=">5">Trên 5 người</option>
                    </select>
                  </motion.div>
                )}

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
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors resize-none"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-primary-600)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-border)";
                    }}
                    placeholder="Chia sẻ kỷ niệm đẹp của bạn với Khoa CNTT hoặc gửi lời chúc mừng nhân dịp 25 năm thành lập..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white font-bold hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                  style={{ backgroundColor: "var(--color-primary-900)" }}
                >
                  <Send size={20} />
                  <span>Gửi lời chúc</span>
                </button>

                <p className="text-sm text-center" style={{ color: "var(--color-text-gray)" }}>
                  * Thông tin bắt buộc
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Download Yearbook Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2
              className="font-bold mb-6"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              KỶ YẾU 25 NĂM
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: "var(--color-text-gray)" }}>
              Tải xuống kỷ yếu điện tử để lưu giữ những khoảnh khắc đáng nhớ
            </p>
            <button
              className="inline-flex items-center px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all border-2"
              style={{
                borderColor: "var(--color-primary-900)",
                color: "var(--color-primary-900)",
                backgroundColor: "white",
              }}
            >
              <svg
                className="mr-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Tải kỷ yếu PDF
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
