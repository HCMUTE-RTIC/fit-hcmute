"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, BookOpen, Globe, TrendingUp, Trophy, Star } from "lucide-react";

export default function Achievements() {
  const alumniStories = [
    {
      name: "Nguyễn Văn A",
      title: "CEO & Founder, TechViet Solutions",
      year: "Khóa 2005",
      image: "/temp.jpg",
      story: "Sau khi tốt nghiệp, tôi đã thành lập công ty công nghệ với hơn 200 nhân viên, cung cấp giải pháp chuyển đổi số cho doanh nghiệp.",
    },
    {
      name: "Trần Thị B",
      title: "Senior AI Engineer, Google Singapore",
      year: "Khóa 2010",
      image: "/temp.jpg",
      story: "Được đào tạo nền tảng vững chắc tại Khoa CNTT, tôi đã có cơ hội làm việc với những dự án AI lớn nhất thế giới.",
    },
    {
      name: "Lê Văn C",
      title: "Tech Lead, VNG Corporation",
      year: "Khóa 2012",
      image: "/temp.jpg",
      story: "Khoa CNTT không chỉ dạy tôi lập trình mà còn dạy tôi cách tư duy giải quyết vấn đề và làm việc nhóm hiệu quả.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ 
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/thuvienkiniem2.jpg"
            alt="Thành tựu Khoa CNTT"
            fill
            className="object-cover"
            priority
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
            <h1
              className="font-extrabold mb-6"
              style={{
                fontSize: "clamp(40px, 6vw, var(--text-h2))",
                color: "#ffffff",
              }}
            >
              THÀNH TỰU NỔI BẬT
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "#e2e8f0" }}
            >
              25 năm xây dựng và phát triển, Khoa CNTT tự hào với những thành tựu vượt bậc
              trong đào tạo, nghiên cứu và đóng góp cho cộng đồng
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievement Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                number: "120+",
                label: "Giải thưởng & Chứng nhận",
                color: "var(--color-primary-600)",
              },
              {
                icon: BookOpen,
                number: "500+",
                label: "Công trình nghiên cứu",
                color: "var(--color-accent-500)",
              },
              {
                icon: Globe,
                number: "25+",
                label: "Đối tác quốc tế",
                color: "var(--color-primary-600)",
              },
              {
                icon: TrendingUp,
                number: "95%",
                label: "Sinh viên có việc làm",
                color: "var(--color-accent-500)",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--color-bg-light)" }}
                >
                  <item.icon size={36} style={{ color: item.color }} />
                </div>
                <h3
                  className="font-extrabold mb-2"
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    background: "var(--gradient-hero)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.number}
                </h3>
                <p style={{ color: "var(--color-text-gray)" }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Academic Excellence */}
      <section
        className="py-24"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              NGHIÊN CỨU KHOA HỌC
            </h2>
            <p className="text-xl" style={{ color: "var(--color-text-gray)" }}>
              Đóng góp cho sự phát triển của khoa học công nghệ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/thanh-tuu/nghien-cuu-khoa-hoc/FB_IMG_1772637601718.jpg"
                alt="Nghiên cứu khoa học"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Stats side */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Đề tài cấp Nhà nước",
                  count: "15+",
                  description: "Các đề tài nghiên cứu trọng điểm về AI, IoT, Big Data được triển khai thành công",
                },
                {
                  icon: Globe,
                  title: "Công bố quốc tế",
                  count: "200+",
                  description: "Bài báo khoa học trên các tạp chí và hội nghị quốc tế uy tín",
                },
                {
                  icon: Trophy,
                  title: "Sáng chế & Giải pháp",
                  count: "30+",
                  description: "Bằng sáng chế và giải pháp hữu ích được cấp bởi Bộ Khoa học & Công nghệ",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow flex items-center gap-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <item.icon size={32} className="text-white" />
                  </div>
                  <div>
                    <h3
                      className="font-bold mb-1"
                      style={{ fontSize: "var(--text-h3)", color: "var(--color-primary-900)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-accent-500)" }}
                    >
                      {item.count}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Cooperation */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              HỢP TÁC QUỐC TẾ
            </h2>
            <p className="text-xl" style={{ color: "var(--color-text-gray)" }}>
              Đối tác với các trường đại học và tổ chức hàng đầu thế giới
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Logos Grid */}
            <div className="order-2 lg:order-1 grid grid-cols-3 sm:grid-cols-4 gap-4">
              {[
                "logo-KMS.png",
                "dxc-logo.png",
                "fujinet-logo.png",
                "hvn_logo.png",
                "logo-csc.png",
                "logo-dek.png",
                "logo-elca.png",
                "logo-global-cybersoft.png",
                "logo-lacviet.png",
                "logo-lampart.png",
                "logo-tma.png",
                "logo_gameloft_black.png",
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border-2 border-gray-50 rounded-xl p-3 flex items-center justify-center hover:border-blue-100 transition-all hover:-translate-y-1 shadow-sm"
                  style={{ height: "80px" }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/thanh-tuu/source-doi-tac/${logo}`}
                      alt={`Partner ${index}`}
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/thanh-tuu/hop-tac-quoc-te/KOREAN-BRIDGE-1.jpg"
                alt="Hợp tác quốc tế và doanh nghiệp"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section
        className="py-24"
        style={{ backgroundColor: "var(--color-bg-light)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              CỰU SINH VIÊN TIÊU BIỂU
            </h2>
            <p className="text-xl" style={{ color: "var(--color-text-gray)" }}>
              Những câu chuyện thành công truyền cảm hứng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {alumniStories.map((alumni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={alumni.image}
                      alt={alumni.name}
                      fill
                      className="rounded-full object-cover border-4"
                      style={{ borderColor: "var(--color-primary-600)" }}
                    />
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: "20px", color: "var(--color-primary-900)" }}
                  >
                    {alumni.name}
                  </h3>
                  <p className="font-semibold mb-1" style={{ color: "var(--color-primary-600)" }}>
                    {alumni.title}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text-gray)" }}>
                    {alumni.year}
                  </p>
                </div>
                <div className="relative">
                  <Star
                    size={24}
                    className="absolute -top-2 -left-2 opacity-20"
                    style={{ color: "var(--color-accent-500)" }}
                  />
                  <p className="italic" style={{ color: "var(--color-text-gray)", lineHeight: "1.7" }}>
                    "{alumni.story}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Highlight */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--color-primary-900)" }}
            >
              GIẢI THƯỞNG & DANH HIỆU
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Certifications / Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white"
              >
                <Image
                  src="/thanh-tuu/thanh-tuu/6. HỆ THẠC SĨ ĐẠT KIỂM ĐỊNH CHẤT LƯỢNG.jpg"
                  alt="Hệ Thạc Sĩ Đạt Kiểm Định"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white sm:mt-12"
              >
                <Image
                  src="/thanh-tuu/thanh-tuu/Bản sao của 470210687_1004949328333965_3121029532383090489_n.jpg"
                  alt="Chứng nhận chất lượng"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Awards List */}
            <div className="flex flex-col gap-5">
              {[
                {
                  year: "2024",
                  award: "Đạt chuẩn kiểm định chất lượng AUN-QA",
                  org: "ASEAN University Network",
                },
                {
                  year: "2023",
                  award: "Kiểm định chất lượng nội bộ MOET",
                  org: "Bộ Giáo dục và Đào tạo",
                },
                {
                  year: "2022",
                  award: "Top 3 Trường đào tạo CNTT xuất sắc khu vực phía Nam",
                  org: "Các tổ chức đánh giá giáo dục ĐH",
                },
                {
                  year: "2021",
                  award: "Bằng khen của Bộ Giáo dục và Đào tạo về thành tích xuất sắc",
                  org: "Bộ GD&ĐT",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-5 bg-white border-l-4 rounded-lg hover:-translate-x-1 transition-transform"
                  style={{
                    borderColor: "var(--color-accent-500)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-bg-light)" }}
                  >
                    <Award size={24} style={{ color: "var(--color-accent-500)" }} />
                  </div>
                  <div>
                    <h4
                      className="font-bold mb-1 leading-tight"
                      style={{ fontSize: "18px", color: "var(--color-primary-900)" }}
                    >
                      {item.award}
                    </h4>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--color-accent-500)" }}>
                      Năm {item.year}
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-text-gray)" }}>
                      {item.org}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
