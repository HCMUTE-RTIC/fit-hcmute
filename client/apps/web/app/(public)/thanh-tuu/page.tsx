"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  BookOpen,
  Globe,
  TrendingUp,
  Trophy,
  Star,
  Building2,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Presentation,
  Heart,
  Building,
} from "lucide-react";
import { PhongTraoCard, type PhongTraoActivity } from "@/components/PhongTraoCard";
import CountUp from "@/components/reactbits/CountUp";
import BlurText from "@/components/reactbits/BlurText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import "@/components/reactbits/SpotlightCard.css";

/* ─── Stat Card with CountUp ─── */
function StatCard({
  icon: Icon,
  number,
  suffix,
  label,
  delay,
}: {
  icon: React.ElementType;
  number: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <SpotlightCard
        className="bg-white border border-gray-100 p-6 text-center h-full"
        spotlightColor="rgba(30, 58, 138, 0.08)"
      >
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 bg-[#f0f4ff]">
            <Icon size={28} className="text-[#1e3a8a]" />
          </div>
          <h3 className="text-4xl sm:text-5xl font-extrabold mb-2 text-[#1e3a8a]">
            <CountUp to={number} duration={2.5} delay={delay} separator="," />
            {suffix && <span>{suffix}</span>}
          </h3>
          <p className="text-sm text-[#64748b] leading-snug">{label}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ─── Research Card ─── */
function ResearchCard({
  icon: Icon,
  title,
  description,
  stats,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  stats: { label: string; value: number; suffix?: string }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <SpotlightCard
        className="bg-white border border-gray-100 p-6 h-full"
        spotlightColor="rgba(37, 99, 235, 0.06)"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f0f4ff] shrink-0">
              <Icon size={24} className="text-[#1e3a8a]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1e3a8a]">{title}</h3>
              <p className="text-sm text-[#64748b]">{description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-lg px-4 py-2.5 bg-[#f8fafc] border border-gray-100 text-center min-w-[80px]"
              >
                <div className="text-xl font-bold text-[#1e3a8a]">
                  <CountUp to={stat.value} duration={2} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="text-[11px] font-medium text-[#64748b] mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ─── Competition Card ─── */
function CompetitionCard({
  icon: Icon,
  title,
  results,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  results: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <SpotlightCard
        className="bg-white/[0.06] border border-white/10 p-6 h-full backdrop-blur-sm"
        spotlightColor="rgba(147, 197, 253, 0.1)"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 shrink-0">
              <Icon size={20} className="text-blue-300" />
            </div>
            <h3 className="font-bold text-white text-[15px] leading-tight">
              {title}
            </h3>
          </div>
          <ul className="space-y-2">
            {results.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* ─── Hero ─── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/thu-vien/thuvienkiniem2.jpg"
            alt="Thành tựu Khoa CNTT"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0c1a3a]/75" />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-6 text-blue-200/70">
              25 năm xây dựng & phát triển
            </p>
          </motion.div>
          <BlurText
            text="Thành tựu nổi bật"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 justify-center"
            delay={150}
            animateBy="words"
            direction="bottom"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              FIT-HCMUTE tự hào với những thành tựu vượt bậc trong đào tạo,
              nghiên cứu và đóng góp cho cộng đồng
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Overview ─── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              icon={TrendingUp}
              number={3}
              suffix=""
              label="Top điểm chuẩn THPTQG đầu vào của trường"
              delay={0}
            />
            <StatCard
              icon={Award}
              number={57}
              label="Giải thưởng sinh viên trong nước và quốc tế (2021–2025)"
              delay={0.1}
            />
            <StatCard
              icon={BookOpen}
              number={147}
              label="Công trình NCKH đạt chuẩn trong nước & quốc tế (2021–2025)"
              delay={0.2}
            />
            <StatCard
              icon={Building2}
              number={20}
              suffix="+"
              label="Doanh nghiệp hợp tác"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ─── Research ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] mb-3">
              Hoạt động nghiên cứu khoa học
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl">
              Tập thể cán bộ GV và SV khoa CNTT tự hào với những thành tích vượt
              bậc trong nghiên cứu và công bố quốc tế
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="/thanh-tuu/nghien-cuu-khoa-hoc/FB_IMG_1772637601718.jpg"
                alt="Nghiên cứu khoa học"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div className="flex flex-col gap-4">
              <ResearchCard
                icon={BookOpen}
                title="Đề tài & Dự án"
                description="Hàng chục đề tài NCKH các cấp được thực hiện xuất sắc (2021–2026)"
                stats={[
                  { label: "Nafosted", value: 2 },
                  { label: "Cấp Bộ", value: 1 },
                  { label: "Cấp Cơ Sở", value: 24 },
                ]}
                delay={0}
              />
              <ResearchCard
                icon={Globe}
                title="Công bố Quốc tế"
                description="Các công trình được đăng tải trên kỷ yếu hội thảo, tạp chí uy tín"
                stats={[
                  { label: "WoS/Scopus", value: 36 },
                  { label: "Hội thảo QT", value: 60, suffix: "+" },
                ]}
                delay={0.1}
              />
              <ResearchCard
                icon={Award}
                title="Sinh viên NCKH"
                description="Sinh viên tích cực nghiên cứu và báo cáo kết quả từ năm 2023"
                stats={[{ label: "Đề tài SV", value: 24 }]}
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partnerships ─── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] mb-3">
              Doanh nghiệp hợp tác
            </h2>
            <p className="text-lg text-[#64748b]">
              Đối tác với các doanh nghiệp và tổ chức hàng đầu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
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
                "Hitachi-Shield-Mark-Red-White-Background-200x200-removebg-preview.png",
                "OSD-Logo1-Black.png",
                "VNG_Corp._logo.svg.png",
                "aws.png",
                "fpt_software_new-02_.1m.jpg",
                "saritasa_logo_vertical@3x.png",
              ].map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-center h-[72px] hover:border-blue-200 transition-colors cursor-default"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={`/thanh-tuu/source-doi-tac/${logo}`}
                      alt={`Partner ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="/thanh-tuu/hop-tac-quoc-te/KOREAN-BRIDGE-1.jpg"
                alt="Hợp tác doanh nghiệp"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Partnership details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: Globe,
                title: "Hợp Tác Quốc Tế",
                desc: "Tiếp đón đoàn công tác ĐH quốc tế, tạo cầu nối học bổng toàn phần Sau ĐH tại Úc, Hàn Quốc, Đài Loan. Nổi bật 2026: 2 SV tốt nghiệp học Tiến sĩ tại Hàn Quốc và Đài Loan.",
              },
              {
                icon: Building2,
                title: "Quan Hệ Doanh Nghiệp",
                desc: "Hơn 20 đợt giới thiệu và 4 hội thảo kết nối DN hằng năm. Tổ chức tham quan thực tế cho SV năm 1, 2. Giới thiệu thực tập trong và ngoài nước.",
              },
              {
                icon: HeartHandshake,
                title: "Quỹ Học Bổng & Hỗ Trợ",
                desc: "Quỹ học bổng từ doanh nghiệp và cựu sinh viên. Tài trợ cho SV khó khăn, bị ảnh hưởng thiên tai. Trao tặng máy tính, thiết bị học tập cho SV vượt khó.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard
                  className="bg-white border border-gray-100 p-6 h-full"
                  spotlightColor="rgba(37, 99, 235, 0.06)"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#f0f4ff] mb-4">
                      <item.icon size={20} className="text-[#1e3a8a]" />
                    </div>
                    <h3 className="font-bold text-[#1e3a8a] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Competition Awards ─── */}
      <section className="py-20 bg-[#0c1a3a]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <BlurText
              text="Thành tích thi đấu & học thuật"
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              delay={100}
              animateBy="words"
              direction="bottom"
            />
            <p className="text-lg text-white/50">
              ICPC, OLP và các sân chơi học thuật hằng năm
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <CompetitionCard
              icon={Globe}
              title="ICPC Lập trình (2021–2026)"
              results={[
                "Cấp Asia HCM: 7 giải (1 HCV, 1 HCB, 2 HCĐ, 3 KK)",
                "Cấp Vietnam National: 9 giải (2 Nhất, 1 Nhì, 2 Ba, 4 KK)",
                "Cấp Miền Nam: 5 giải (2 Nhất, 2 Ba, 1 KK)",
              ]}
              delay={0}
            />
            <CompetitionCard
              icon={Award}
              title="OLP Tin học SV VN (2021–2026)"
              results={[
                "Chuyên tin: 15 giải (6 Nhì, 8 Ba, 1 KK)",
                "Không chuyên: 14 giải (4 Nhì, 5 Ba, 5 KK)",
                "PM nguồn mở: 3 giải (1 Ba, 2 KK)",
              ]}
              delay={0.1}
            />
            <CompetitionCard
              icon={Trophy}
              title="ICPC Vietnam National 2024"
              results={[
                "Giải Nhì cuộc thi lập trình quốc gia",
                "Giành suất tham dự Vòng Châu Á tại Singapore",
              ]}
              delay={0.2}
            />
            <CompetitionCard
              icon={Star}
              title="ICPC Vietnam National 2025"
              results={[
                "Giải Nhất cuộc thi lập trình quốc gia 2025",
              ]}
              delay={0.3}
            />
            <CompetitionCard
              icon={Globe}
              title="ICPC Asia HCMC 2025"
              results={[
                "Giải Nhất ICPC Asia HCMC Regional Contest",
                "Đại diện Việt Nam tham dự Châu Á tại Đài Loan",
              ]}
              delay={0.4}
            />
            <CompetitionCard
              icon={Presentation}
              title="Sân Chơi Học Thuật"
              results={[
                "Mastering IT, Hackathon, SV với An toàn thông tin",
                "Thu hút hàng trăm lượt SV & đội thi từ các trường ĐH tại TP.HCM",
              ]}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ─── Awards & Certifications ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] mb-3">
              Giải thưởng & Danh hiệu
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="grid grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100"
              >
                <Image
                  src="/thanh-tuu/thanh-tuu/kiem-dinh.jpg"
                  alt="Hệ Thạc Sĩ Đạt Kiểm Định"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 mt-8"
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

            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Ngành CNTT, Kỹ thuật Dữ liệu và hệ Thạc sĩ KHMT đạt kiểm định MOET",
                  subtitle: "Năm 2025",
                  detail: "Bộ Giáo dục và Đào tạo",
                },
                {
                  title: "Bằng khen Bộ trưởng Bộ GD&ĐT — Tập thể lao động xuất sắc",
                  subtitle: "Năm 2022–2023",
                  detail: "Bộ Giáo dục và Đào tạo",
                },
                {
                  title: "Ngành CNTT vinh dự đạt chuẩn kiểm định quốc tế AUN-QA",
                  subtitle: "Năm 2019",
                  detail: "ASEAN University Network",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border-l-4 border-[#1e3a8a] hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#f0f4ff] shrink-0 mt-0.5">
                    <Award size={20} className="text-[#1e3a8a]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1e3a8a] leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm font-semibold text-[#2563eb] mb-0.5">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-[#64748b]">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phong Trào Đoàn Hội ─── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.15em] uppercase mb-2 text-[#2563eb]">
              Đoàn Thanh Niên — Hội Sinh Viên
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] mb-3">
              Phong trào Đoàn Hội
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl">
              Các hoạt động tình nguyện, xã hội tiêu biểu thể hiện tinh thần
              trách nhiệm và nhân ái của sinh viên Khoa CNTT
            </p>
          </motion.div>

          <div className="flex flex-col gap-10">
            {(
              [
                {
                  title: "Xuân Tình Nguyện",
                  subtitle: "Tết yêu thương",
                  description:
                    "Xuân Tình Nguyện là hoạt động thường niên dịp Tết Nguyên Đán, nơi sinh viên cùng nhau góp sức mang Xuân về cho những người có hoàn cảnh đặc biệt khó khăn — những bệnh nhân nằm viện, người vô gia cư và các gia đình nghèo chưa có Tết.",
                  emoji: "🌸",
                  gradient: "linear-gradient(135deg, #ef4444, #b91c1c)",
                  accentColor: "#b91c1c",
                  images: [
                    "/thanh-tuu/phong-trao/xuan-tinh-nguyen/m1.jpg",
                    "/thanh-tuu/phong-trao/xuan-tinh-nguyen/m2.jpg",
                  ] as [string, string],
                },
                {
                  title: "Mùa Hè Xanh",
                  subtitle: "Tình nguyện hè",
                  description:
                    "Hằng năm, sinh viên Khoa CNTT hăng hái tham gia chiến dịch Mùa Hè Xanh — đến các vùng nông thôn, vùng sâu vùng xa để xây dựng công trình dân sinh, hỗ trợ người dân và lan tỏa tinh thần thanh niên xung kích.",
                  emoji: "🌿",
                  gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
                  accentColor: "#16a34a",
                  images: [
                    "/thanh-tuu/phong-trao/mua-he-xanh/mhx-1.jpg",
                    "/thanh-tuu/phong-trao/mua-he-xanh/mhx-2.jpg",
                  ] as [string, string],
                },
                {
                  title: "Trung Thu Yêu Thương",
                  subtitle: "Hoạt động vì cộng đồng",
                  description:
                    "Chương trình Trung Thu Yêu Thương mang đến niềm vui cho các em nhỏ có hoàn cảnh khó khăn. Sinh viên tự tay làm lồng đèn, chuẩn bị quà và tổ chức các trò chơi dân gian, gửi gắm tình thương và hy vọng đến những mảnh đời còn nhiều thiếu thốn.",
                  emoji: "🏮",
                  gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
                  accentColor: "#d97706",
                  images: [
                    "/thanh-tuu/phong-trao/trung-thu/trung-thu-1.png",
                    "/thanh-tuu/phong-trao/trung-thu/trung-thu-2.png",
                  ] as [string, string],
                },
                {
                  title: "Đông Yêu Thương",
                  subtitle: "Vì cộng đồng",
                  description:
                    "Chương trình Đông Yêu Thương mang đến hơi ấm giữa những ngày se lạnh cho những người dân có hoàn cảnh khó khăn trên địa bàn các quận tại Sài Gòn. Sinh viên tình nguyện tự tay nấu những nồi cháo nóng, chuẩn bị từng phần ăn và trao tận tay.",
                  emoji: "🧣",
                  gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  accentColor: "#8b5cf6",
                  images: [
                    "/thanh-tuu/phong-trao/dong-yeu-thuong/dyt-1.png",
                    "/thanh-tuu/phong-trao/dong-yeu-thuong/dyt-2.jpg",
                  ] as [string, string],
                },
              ] as PhongTraoActivity[]
            ).map((activity, index) => (
              <PhongTraoCard key={index} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
