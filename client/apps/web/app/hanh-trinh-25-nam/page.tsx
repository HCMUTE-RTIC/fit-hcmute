"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlights: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: "2000",
    title: "Thành lập Khoa CNTT",
    description: "Khoa Công nghệ Thông tin chính thức được thành lập tại Trường Đại học Công nghệ Kỹ thuật TP.HCM",
    highlights: [
      "Khai giảng khóa đầu tiên với 120 sinh viên",
      "Thành lập 3 phòng thí nghiệm cơ bản",
      "Đội ngũ 15 giảng viên sáng lập",
    ],
  },
  {
    year: "2005",
    title: "Mở rộng quy mô",
    description: "Phát triển mạnh mẽ về cơ sở vật chất và chương trình đào tạo",
    highlights: [
      "Tăng lên 500 sinh viên các khóa",
      "Mở thêm 5 phòng thí nghiệm chuyên sâu",
      "Hợp tác đầu tiên với trường đại học Mỹ",
    ],
  },
  {
    year: "2010",
    title: "Chuẩn hóa quốc tế",
    description: "Chương trình đào tạo được chuẩn hóa theo tiêu chuẩn quốc tế",
    highlights: [
      "Đạt chứng nhận chất lượng AUN-QA",
      "Khởi động chương trình đào tạo Thạc sĩ",
      "10,000 sinh viên đã tốt nghiệp",
    ],
  },
  {
    year: "2015",
    title: "Đổi mới sáng tạo",
    description: "Tập trung vào nghiên cứu khoa học và khởi nghiệp công nghệ",
    highlights: [
      "Thành lập Trung tâm Đổi mới Sáng tạo",
      "20+ đề tài nghiên cứu cấp Bộ, cấp Nhà nước",
      "Hợp tác với 15 doanh nghiệp công nghệ",
    ],
  },
  {
    year: "2020",
    title: "Chuyển đổi số",
    description: "Ứng dụng công nghệ số toàn diện trong đào tạo và quản lý",
    highlights: [
      "100% bài giảng số hóa",
      "Hệ thống Learning Management System hiện đại",
      "25,000 sinh viên tốt nghiệp tích lũy",
    ],
  },
  {
    year: "2025",
    title: "Kỷ niệm 25 năm",
    description: "Khẳng định vị thế Top 3 trường đào tạo IT hàng đầu Việt Nam",
    highlights: [
      "27,000+ sinh viên tốt nghiệp",
      "52+ giảng viên, nghiên cứu viên",
      "Top 3 trường IT được sinh viên lựa chọn",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="min-h-screen" style={{ paddingTop: '120px' }}>
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
            <h1
              className="font-extrabold mb-6"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
                color: "var(--color-primary-900)",
              }}
            >
              HÀNH TRÌNH 25 NĂM
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--color-text-gray)" }}
            >
              Từ những ngày đầu tiên năm 2000 đến nay, mỗi bước tiến của Khoa CNTT đều ghi dấu
              sự nỗ lực không ngừng nghỉ để trở thành đơn vị đào tạo công nghệ thông tin hàng đầu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)', backgroundColor: 'var(--color-bg-white)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="relative">
            {/* Center Vertical Line - Desktop */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden lg:block"
              style={{ backgroundColor: "var(--color-primary-600)", opacity: 0.3 }}
            />

            {/* Left Vertical Line - Mobile */}
            <div
              className="absolute left-8 w-1 h-full lg:hidden"
              style={{ backgroundColor: "var(--color-primary-600)", opacity: 0.3 }}
            />

            <div className="space-y-0">
              {timelineData.map((event, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div key={event.year} className="relative">
                    {/* Desktop Layout - Zig Zag */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-2 gap-16 items-start" style={{ minHeight: '200px' }}>
                        {isLeft ? (
                          <>
                            {/* Left Side Content */}
                            <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.6 }}
                              className="pr-12 text-right"
                            >
                              <div className="inline-block mb-4">
                                <span
                                  className="px-6 py-2 rounded-full font-bold text-white text-sm"
                                  style={{ background: "var(--gradient-hero)" }}
                                >
                                  {event.year}
                                </span>
                              </div>
                              <h3
                                className="font-bold mb-3"
                                style={{ fontSize: "var(--text-h3)", color: "var(--color-primary-900)" }}
                              >
                                {event.title}
                              </h3>
                              <p className="mb-4 text-base" style={{ color: "var(--color-text-gray)" }}>
                                {event.description}
                              </p>
                              <ul className="space-y-2">
                                {event.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-center justify-end space-x-3">
                                    <span className="text-sm" style={{ color: "var(--color-text-gray)" }}>
                                      {highlight}
                                    </span>
                                    <div
                                      className="w-2 h-2 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: "var(--color-accent-500)" }}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </motion.div>

                            {/* Right Side Empty */}
                            <div />
                          </>
                        ) : (
                          <>
                            {/* Left Side Empty */}
                            <div />

                            {/* Right Side Content */}
                            <motion.div
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.6 }}
                              className="pl-12"
                            >
                              <div className="inline-block mb-4">
                                <span
                                  className="px-6 py-2 rounded-full font-bold text-white text-sm"
                                  style={{ background: "var(--gradient-hero)" }}
                                >
                                  {event.year}
                                </span>
                              </div>
                              <h3
                                className="font-bold mb-3"
                                style={{ fontSize: "var(--text-h3)", color: "var(--color-primary-900)" }}
                              >
                                {event.title}
                              </h3>
                              <p className="mb-4 text-base" style={{ color: "var(--color-text-gray)" }}>
                                {event.description}
                              </p>
                              <ul className="space-y-2">
                                {event.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-center space-x-3">
                                    <div
                                      className="w-2 h-2 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: "var(--color-accent-500)" }}
                                    />
                                    <span className="text-sm" style={{ color: "var(--color-text-gray)" }}>
                                      {highlight}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          </>
                        )}
                      </div>

                      {/* Center Dot */}
                      <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
                          style={{ backgroundColor: "var(--color-primary-600)" }}
                        />
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6 }}
                      className="lg:hidden flex pb-12"
                    >
                      {/* Left Dot */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-6 h-6 rounded-full border-4 border-white shadow-md mt-1"
                          style={{ backgroundColor: "var(--color-primary-600)" }}
                        />
                      </div>

                      {/* Content */}
                      <div className="pl-8 flex-1">
                        <span
                          className="inline-block px-4 py-1 rounded-full font-bold text-white mb-3 text-sm"
                          style={{ background: "var(--gradient-hero)" }}
                        >
                          {event.year}
                        </span>
                        <h3
                          className="font-bold mb-2"
                          style={{ fontSize: "20px", color: "var(--color-primary-900)" }}
                        >
                          {event.title}
                        </h3>
                        <p className="mb-3 text-sm" style={{ color: "var(--color-text-gray)" }}>
                          {event.description}
                        </p>
                        <ul className="space-y-2">
                          {event.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm">
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                                style={{ backgroundColor: "var(--color-accent-500)" }}
                              />
                              <span style={{ color: "var(--color-text-gray)" }}>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{ 
          paddingTop: 'var(--spacing-section)', 
          paddingBottom: 'var(--spacing-section)', 
          backgroundColor: "var(--color-bg-light)" 
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Calendar size={64} className="mx-auto mb-6" style={{ color: "var(--color-primary-600)" }} />
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              Cùng viết tiếp câu chuyện
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: "var(--color-text-gray)" }}>
              25 năm chỉ là khởi đầu. Hãy cùng chúng tôi tạo nên những mốc son mới trong tương lai.
            </p>
            <a
              href="/tri-an"
              className="inline-block px-8 py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-primary-900)" }}
            >
              Chia sẻ kỷ niệm của bạn
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
