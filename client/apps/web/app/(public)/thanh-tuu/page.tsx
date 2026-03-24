"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, BookOpen, Globe, TrendingUp, Trophy, Star, Building2, Building, GraduationCap, HeartHandshake, Laptop, Presentation, Heart, Info } from "lucide-react";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { PhongTraoCard, type PhongTraoActivity } from "@/components/PhongTraoCard";

const iconBox = (bg: string) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 72, height: 72, borderRadius: 18,
  background: bg, boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
  transition: 'transform 0.2s',
} as React.CSSProperties);

const makeHoverCard = (
  gradient: string,
  Icon: React.ElementType,
  title: string,
  items: { emoji: string; label: string; sub?: string }[]
) => (
  <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', border: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>
    <div style={{ background: gradient, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon size={18} color="#fff" />
      <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{title}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ fontSize: 20, lineHeight: 1.2, flexShrink: 0 }}>{it.emoji}</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{it.label}</p>
            {it.sub && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>{it.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Achievements() {
  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* ─── Section 1: Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
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
              25 năm xây dựng và phát triển, FIT-HCMUTE tự hào với những thành tựu vượt bậc
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
                icon: TrendingUp,
                number: "Top 3",
                label: "Điểm chuẩn THPTQG đầu vào của trường",
                color: "var(--color-primary-600)",
              },
              {
                icon: Award,
                number: "57",
                label: "Giải thưởng sinh viên trong nước và quốc tế (2021 - 2025)",
                color: "var(--color-accent-500)",
              },
              {
                icon: BookOpen,
                number: "147",
                label: "Công trình NCKH đạt chuẩn trong nước & quốc tế (2021 - 2025)",
                color: "var(--color-primary-600)",
              },
              {
                icon: Building2,
                number: "20+",
                label: "Doanh nghiệp hợp tác",
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
              HOẠT ĐỘNG NGHIÊN CỨU KHOA HỌC
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--color-text-gray)" }}>
              Tập thể cán bộ GV và SV khoa CNTT tự hào với những thành tích vượt bậc trong nghiên cứu và công bố quốc tế
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Stats side */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Đề tài & Dự án",
                  description: "Hàng chục đề tài NCKH các cấp được thực hiện xuất sắc (2021 - 2026)",
                  stats: [
                    { label: "Nafosted", value: "2", color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Cấp Bộ", value: "1", color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Cấp Cơ Sở", value: "24", color: "text-purple-600", bg: "bg-purple-50" },
                  ]
                },
                {
                  icon: Globe,
                  title: "Công bố Quốc tế",
                  description: "Các công trình được đăng tải trên kỷ yếu hội thảo, tạp chí uy tín",
                  stats: [
                    { label: "WoS/Scopus", value: "36", color: "text-rose-600", bg: "bg-rose-50" },
                    { label: "Hội thảo QT", value: "60+", color: "text-orange-600", bg: "bg-orange-50" },
                  ]
                },
                {
                  icon: Award,
                  title: "Sinh viên NCKH",
                  description: "Sinh viên tích cực nghiên cứu và báo cáo kết quả từ năm 2023",
                  stats: [
                    { label: "Đề tài SV", value: "24", color: "text-pink-600", bg: "bg-pink-50" },
                  ]
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col gap-0 hover:gap-4 overflow-hidden cursor-default"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="flex items-center gap-6">
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
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Expandable Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    {item.stats.map((stat, i) => (
                      <div key={i} className={`rounded-xl px-4 py-3 text-center border border-white/50 transition-transform hover:scale-[1.03] ${stat.bg}`}>
                        <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
                        <div className="text-[12px] font-semibold text-gray-700 leading-tight mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Cooperation */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 relative">
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
              DOANH NGHIỆP HỢP TÁC
            </h2>
            <p className="text-xl" style={{ color: "var(--color-text-gray)" }}>
              Đối tác với các trường đại học và tổ chức hàng đầu thế giới
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
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
                      sizes="(max-width: 768px) 33vw, 25vw"
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

          {/* New Distinctive Hover Button */}
          <div className="mt-16 flex justify-center relative z-30 group">
            <button
              className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white transition-all transform hover:scale-110 shadow-lg hover:shadow-2xl cursor-default"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Info size={28} className="text-white" />
            </button>

            {/* Hover Cards Container */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 pb-10 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 origin-bottom scale-95 group-hover:scale-100 z-30 pointer-events-none group-hover:pointer-events-auto w-[calc(100vw-3rem)] max-w-[1232px]"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-2xl relative">
                {/* Arrow pointing down */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45"
                  style={{
                    borderRight: "1px solid rgba(0,0,0,0.05)",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    clipPath: "polygon(100% 100%, 0 100%, 100% 0)"
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 text-left">
                  {/* Card 1: Giao luu hoc thuat */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group/card hover:-translate-y-1 transition-transform hover:shadow-lg">
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -z-0 transition-transform duration-500 group-hover/card:scale-110"
                      style={{ backgroundColor: "var(--color-bg-light)" }}
                    />
                    <div className="relative z-10 flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50" style={{ color: "var(--color-primary-600)" }}>
                        <Globe size={24} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--color-primary-900)" }}>
                        Hợp Tác Quốc Tế
                      </h3>
                    </div>
                    <div className="relative z-10">
                      <p className="text-[15px] leading-relaxed mb-4 text-gray-600">
                        Khoa CNTT tiếp đón các đoàn công tác Đại Học quốc tế, tạo cầu nối xin học bổng toàn phần đào tạo Sau đại học tại Úc, Hàn Quốc, Đài Loan...
                      </p>
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                        <p className="text-[14px] font-medium" style={{ color: "var(--color-primary-600)" }}>
                          <span className="font-bold">Nổi bật đầu năm 2026:</span>
                        </p>
                        <p className="text-[13px] text-gray-600 mt-1">2 SV tốt nghiệp học Tiến sĩ tại:</p>
                        <ul className="mt-1 text-[14px] font-semibold space-y-1" style={{ color: "var(--color-primary-900)" }}>
                          <li>• Hàn Quốc (SV Nguyễn Minh Triều)</li>
                          <li>• Đài Loan (SV Lê Chánh Thành Tín)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Quan he doanh nghiep */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group/card hover:-translate-y-1 transition-transform hover:shadow-lg">
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -z-0 transition-transform duration-500 group-hover/card:scale-110"
                      style={{ backgroundColor: "var(--color-bg-light)" }}
                    />
                    <div className="relative z-10 flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-light)", color: "var(--color-primary-600)" }}>
                        <Building2 size={24} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--color-primary-900)" }}>
                        Quan Hệ Doanh Nghiệp
                      </h3>
                    </div>
                    <ul className="relative z-10 space-y-4">
                      {[
                        { icon: Presentation, text: "Tổ chức hơn 20 đợt giới thiệu và 4 hội thảo kết nối doanh nghiệp hằng năm." },
                        { icon: Building, text: "Tham quan thực tế tại doanh nghiệp cho sinh viên năm 1, 2." },
                        { icon: Globe, text: "Giới thiệu sinh viên thực tập tại doanh nghiệp trong và ngoài nước." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white border border-gray-100" style={{ color: "var(--color-accent-500)" }}>
                            <item.icon size={12} />
                          </div>
                          <p className="text-[15px] leading-relaxed text-gray-600">{item.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 3: Hoc bong */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group/card hover:-translate-y-1 transition-transform hover:shadow-lg">
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -z-0 transition-transform duration-500 group-hover/card:scale-110"
                      style={{ backgroundColor: "var(--color-bg-light)" }}
                    />
                    <div className="relative z-10 flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-light)", color: "var(--color-accent-500)" }}>
                        <HeartHandshake size={24} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--color-primary-900)" }}>
                        Quỹ Học Bổng & Hỗ Trợ
                      </h3>
                    </div>
                    <ul className="relative z-10 space-y-4">
                      {[
                        { icon: GraduationCap, text: "Quỹ học bổng từ doanh nghiệp và cựu sinh viên." },
                        { icon: Heart, text: "Tài trợ học bổng cho SV khó khăn và bị ảnh hưởng bởi thiên tai." },
                        { icon: Laptop, text: "Trao tặng máy tính, thiết bị học tập cho SV vượt khó." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white border border-gray-100" style={{ color: "var(--color-primary-600)" }}>
                            <item.icon size={12} />
                          </div>
                          <p className="text-[15px] leading-relaxed text-gray-600">{item.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Competition Awards — LogoLoop Section */}
      <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1a3a5c 60%, #0f2744 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-h2)', color: '#ffffff' }}>
              THÀNH TÍCH THI ĐẤU &amp; HỌC THUẬT
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17 }}>
              ICPC, OLP và các sân chơi học thuật hằng năm
            </p>
          </motion.div>
        </div>
        {(() => {
          const awards: LogoItem[] = [
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#ef4444,#b91c1c)')}><Globe size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>ICPC Lập trình<br />(2021-2026)</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#ef4444,#b91c1c)', Globe,
                'Tổng kết giải ICPC (2021 - 2026)',
                [
                  { emoji: '🌏', label: 'Cấp Asia HCM: 7 giải', sub: '1 HCV, 1 HCB, 2 HCĐ, 3 KK' },
                  { emoji: '🇻🇳', label: 'Cấp Vietnam National: 9 giải', sub: '2 Nhất, 1 Nhì, 2 Ba, 4 KK' },
                  { emoji: '📍', label: 'Cấp Miền Nam: 5 giải', sub: '2 Nhất, 2 Ba, 1 KK' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#8b5cf6,#6d28d9)')}><Award size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>OLP Tin học<br />(2021-2026)</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#8b5cf6,#6d28d9)', Award,
                'Tổng kết Olympic Tin học SV VN (2021 - 2026)',
                [
                  { emoji: '💻', label: 'Chuyên tin: 15 giải', sub: '6 Nhì, 8 Ba, 1 KK' },
                  { emoji: '🎓', label: 'Không chuyên: 14 giải', sub: '4 Nhì, 5 Ba, 5 KK' },
                  { emoji: '⚙️', label: 'PM nguồn mở: 3 giải', sub: '1 Ba, 2 KK' },
                  { emoji: '🏆', label: 'Khác: 4 giải', sub: '1 Ba Siêu cúp, 1 Nhì Procon, 2 KK AI Nam, 1 KK AI VN' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#f59e0b,#d97706)')}><Trophy size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>ICPC Vietnam<br />National 2024</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#f59e0b,#d97706)', Trophy,
                'ICPC Vietnam National Programming Contest 2024',
                [
                  { emoji: '🥈', label: 'Giải Nhì', sub: 'ICPC Vietnam National Programming Contest 2024' },
                  { emoji: '✈️', label: 'Giành suất tham dự Vòng Châu Á tại Singapore', sub: 'ICPC Asia Regional 2024' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#3b82f6,#1d4ed8)')}><Award size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>OLP Tin học<br />SV VN 2024</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#3b82f6,#1d4ed8)', Award,
                'OLP Tin học Sinh Viên VN 2024',
                [
                  { emoji: '🥈', label: 'Khối chuyên tin & không chuyên: Giải Nhì' },
                  { emoji: '🥉', label: 'Siêu cúp & Phần mềm nguồn mở: Giải cao (Nhì & Ba)', sub: 'Tất cả khối đều đạt giải cao' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#f97316,#c2410c)')}><Star size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>ICPC Vietnam<br />National 2025</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#f97316,#c2410c)', Star,
                'The 2025 ICPC Vietnam National Programming Contest',
                [
                  { emoji: '🥇', label: 'Giải Nhất', sub: 'The 2025 ICPC Vietnam National Programming Contest' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#10b981,#047857)')}><Globe size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>ICPC Asia<br />HCMC 2025</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#10b981,#047857)', Globe,
                'The 2025 ICPC Asia HCMC Regional Contest',
                [
                  { emoji: '🥇', label: 'Giải Nhất', sub: 'The 2025 ICPC Asia HCMC Regional Contest' },
                  { emoji: '🌏', label: 'Đại diện Việt Nam tham dự Châu Á tại Đài Loan' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#a855f7,#7c3aed)')}><GraduationCap size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>OLP Tin học<br />SV VN 2025</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#a855f7,#7c3aed)', GraduationCap,
                'OLP Tin học Sinh Viên VN 2025',
                [
                  { emoji: '🥉', label: 'Khối chuyên tin: SV đạt Giải Ba' },
                  { emoji: '🥉', label: 'Khối không chuyên: SV đạt Giải Ba' },
                ]
              ),
            },
            {
              node: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', userSelect: 'none' }}>
                  <div style={iconBox('linear-gradient(135deg,#ec4899,#be185d)')}><Presentation size={34} color="#fff" /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 110, lineHeight: 1.3 }}>Sân chơi<br />Học thuật</span>
                </div>
              ),
              hoverCard: makeHoverCard(
                'linear-gradient(135deg,#ec4899,#be185d)', Presentation,
                'Sân Chơi Học Thuật Hằng Năm',
                [
                  { emoji: '🏆', label: 'Mastering IT, Hackathon, SV với An toàn thông tin' },
                  { emoji: '🎓', label: 'Thu hút hàng trăm lượt SV & đội dự thi', sub: 'Từ các trường Đại Học trên địa bàn TP. HCM' },
                ]
              ),
            },
          ];
          return (
            <div className="mx-auto" style={{ maxWidth: 840 }}>
              <LogoLoop
                logos={awards}
                speed={55}
                logoHeight={170}
                gap={40}
                pauseOnHover
                fadeOut
                fadeOutColor="#0f2744"
                ariaLabel="Thành tích thi đấu và học thuật"
              />
            </div>
          );
        })()}

      </section>

      {/* Awards Highlight */}
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
                  src="/thanh-tuu/thanh-tuu/kiem-dinh.jpg"
                  alt="Hệ Thạc Sĩ Đạt Kiểm Định"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="eager"
                  priority
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
                  src="/thanh-tuu/thanh-tuu/chung-nhan.jpg"
                  alt="Chứng nhận chất lượng"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Awards List */}
            <div className="flex flex-col gap-5">
              {[
                {
                  year: "2025",
                  award: "Ngành CNTT, Kỹ thuật Dữ liệu và hệ Thạc sĩ Khoa học máy tính đạt kiểm định MOET",
                  org: "Bộ Giáo dục và Đào tạo",
                },
                {
                  year: "2022 - 2023",
                  award: "Bằng khen của Bộ trưởng Bộ GD&ĐT danh hiệu Tập thể lao động xuất sắc",
                  org: "Bộ Giáo dục và Đào tạo",
                },
                {
                  year: "2019",
                  award: "Ngành CNTT vinh dự đạt chuẩn kiểm định quốc tế AUN-QA",
                  org: "ASEAN University Network",
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
      {/* Phong trao Doan Hoi */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-accent-500)' }}
            >
              Đoàn Thanh Niên — Hội Sinh Viên
            </p>
            <h2
              className="font-bold mb-4"
              style={{ fontSize: 'var(--text-h2)', color: 'var(--color-primary-900)' }}
            >
              PHONG TRÀO ĐOÀN HỘI
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-gray)' }}>
              Các hoạt động tình nguyện, xã hội tiêu biểu thể hiện tinh thần trách nhiệm và
              nhân ái của sinh viên Khoa CNTT
            </p>
          </motion.div>

          <div className="flex flex-col gap-10">
            {([
              {
                title: 'Xuân Tình Nguyện',
                subtitle: 'Tết yêu thương',
                description:
                  'Xuân Tình Nguyện là hoạt động thường niên dịp Tết Nguyên Đán, nơi sinh viên cùng nhau góp sức mang Xuân về cho những người có hoàn cảnh đặc biệt khó khăn — những bệnh nhân nằm viện, người vô gia cư và các gia đình nghèo chưa có Tết.',
                emoji: '🌸',
                gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                accentColor: '#b91c1c',
                images: [
                  '/thanh-tuu/phong-trao/xuan-tinh-nguyen/m1.jpg',
                  '/thanh-tuu/phong-trao/xuan-tinh-nguyen/m2.jpg',
                ] as [string, string],
              },
              {
                title: 'Mùa Hè Xanh',
                subtitle: 'Tình nguyện hè',
                description:
                  'Hằng năm, sinh viên Khoa CNTT hăng hái tham gia chiến dịch Mùa Hè Xanh — đến các vùng nông thôn, vùng sâu vùng xa để xây dựng công trình dân sinh, hỗ trợ người dân và lan toa tinh thần thanh niên xung kích.',
                emoji: '🌿',
                gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
                accentColor: '#16a34a',
                images: [
                  '/thanh-tuu/phong-trao/mua-he-xanh/m1.JPG',
                  '/thanh-tuu/phong-trao/mua-he-xanh/m2.JPG',
                ] as [string, string],
              },
              {
                title: 'Trung Thu Yêu Thương',
                subtitle: 'Hoạt động vì cộng đồng',
                description:
                  'Chương trình Trung Thu Yêu Thương mang đến niềm vui cho các em nhỏ có hoàn cảnh khó khăn. Sinh viên tự tay làm lồng đèn, chuẩn bị quà và tổ chức các trò chơi dân gian, gửi gắm tình thương và hy vọng đến những mảnh đời còn nhiều thiếu thốn.',
                emoji: '🏮',
                gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
                accentColor: '#d97706',
                images: [
                  '/thanh-tuu/phong-trao/trung-thu/m1.JPG',
                  '/thanh-tuu/phong-trao/trung-thu/m2.JPG',
                ] as [string, string],
              },
              {
                title: 'Đông Yêu Thương',
                subtitle: 'Vì cộng đồng',
                description:
                  'Chương trình Đông Yêu Thương mang đến hơi ấm giữa những ngày se lạnh cho những người dân có hoàn cảnh khó khăn trên địa bàn các quận tại Sài Gòn. Sinh viên tình nguyện tự tay nấu những nồi cháo nóng, chuẩn bị từng phần ăn và trao tận tay, gửi gắm sự quan tâm, sẻ chia và tình người đến những mảnh đời còn nhiều vất vả.',
                emoji: '🧣',
                gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                accentColor: '#8b5cf6',
                images: [
                  '/thanh-tuu/phong-trao/dong-yeu-thuong/m3.JPG',
                  '/thanh-tuu/phong-trao/dong-yeu-thuong/m4.png',
                ] as [string, string],
              },
            ] as PhongTraoActivity[]).map((activity, index) => (
              <PhongTraoCard key={index} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
