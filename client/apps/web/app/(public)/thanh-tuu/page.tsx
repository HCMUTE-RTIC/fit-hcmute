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
              THÀNH TỰU NỔI BẬT
            </h1>
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--color-text-gray)" }}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <item.icon size={32} className="text-white" />
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: "var(--text-h3)", color: "var(--color-primary-900)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-3xl font-bold mb-3"
                  style={{ color: "var(--color-accent-500)" }}
                >
                  {item.count}
                </p>
                <p style={{ color: "var(--color-text-gray)" }}>{item.description}</p>
              </motion.div>
            ))}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "University of Technology Sydney (Úc)",
              "Kyoto Institute of Technology (Nhật)",
              "California State University (Mỹ)",
              "Hanyang University (Hàn Quốc)",
              "Microsoft Innovation Center",
              "Google Cloud Partner",
              "AWS Academy",
              "Cisco Networking Academy",
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <Globe size={24} style={{ color: "var(--color-primary-600)" }} />
                </div>
                <p className="font-semibold text-sm" style={{ color: "var(--color-primary-900)" }}>
                  {partner}
                </p>
              </motion.div>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                year: "2024",
                award: "Top 3 Trường đào tạo CNTT hàng đầu Việt Nam",
                org: "VNExpress Education",
              },
              {
                year: "2023",
                award: "Chứng nhận chất lượng đào tạo AUN-QA",
                org: "ASEAN University Network",
              },
              {
                year: "2022",
                award: "Giải thưởng Sao Khuê cho Đơn vị đào tạo xuất sắc",
                org: "VINASA",
              },
              {
                year: "2021",
                award: "Cờ thi đua của Bộ Giáo dục và Đào tạo",
                org: "Bộ GD&ĐT",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-white border-l-4 rounded-lg"
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
                  <p className="font-bold mb-1" style={{ color: "var(--color-accent-500)" }}>
                    {item.year}
                  </p>
                  <h4
                    className="font-bold mb-1"
                    style={{ fontSize: "18px", color: "var(--color-primary-900)" }}
                  >
                    {item.award}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--color-text-gray)" }}>
                    {item.org}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
