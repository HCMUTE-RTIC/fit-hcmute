
"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronUp, Lightbulb, Globe, Award, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const imgImageHcmuteCampus = "/trang-chu-home/banner_trangchu.jpg";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#f0f9ff" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imgImageHcmuteCampus}
            alt="HCMUTE Campus"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
          />
          {/* No Overlay to keep original image brightness */}
        </div>



        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Kỷ Yếu & Lời Tri Ân Section ─────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "calc(var(--spacing-section) * 0.5)",
          backgroundColor: "#f0f9ff",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                borderRadius: "24px",
                border: "4px solid white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src="/gioi-thieu/truong-khoa.jpg"
                alt="Trưởng Khoa CNTT"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(32px, 4vw, 42px)",
                  color: "#1e3a8a",
                }}
              >
                Kỷ niệm 25 năm thành lập FIT-HCMUTE
              </h2>
              <p
                className="mb-8"
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#475569",
                }}
              >
                Năm 2026 đánh dấu cột mốc ¼ thế kỷ hình thành và phát triển của Khoa Công nghệ Thông tin (2001 - 2026). Một chặng đường đầy tự hào với những thế hệ kỹ sư công nghệ tài năng, nhiệt huyết đã và đang góp phần xây dựng đất nước.
              </p>

              <div className="w-full mt-8">
                {/* Trigger Button */}
                <button
                  onClick={() => setShowLetter(true)}
                  className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] p-6 rounded-2xl flex items-center gap-4 shadow-xl border border-blue-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/40 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Mail size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-1">Lời chúc của thầy</h3>
                    <p className="text-blue-100 text-sm">Trưởng Khoa CNTT - TS. Lê Văn Vinh</p>
                  </div>
                </button>

                {/* Modal Overlay */}
                {showLetter && (
                  <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center pt-24 pb-4 px-4 sm:pt-28 sm:pb-8 sm:px-8"
                    onClick={() => setShowLetter(false)}
                  >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />

                    {/* Letter Card */}
                    <div
                      className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#fdfbf7] p-8 sm:p-10 rounded-3xl animate-[scaleIn_0.35s_ease]"
                      style={{
                        boxShadow: "0 20px 60px -10px rgba(0,0,0,0.3), inset 0 0 40px rgba(0,0,0,0.03)",
                        border: "1px solid #e8e0cc",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => setShowLetter(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors z-10"
                      >
                        <span className="text-[#443C2A] text-xl leading-none">&times;</span>
                      </button>

                      {/* Corner Decorations */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#d4cbaf] opacity-40 rounded-tl-xl pointer-events-none"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#d4cbaf] opacity-40 rounded-br-xl pointer-events-none"></div>

                      <div className="max-w-none text-[#443C2A]" style={{ fontFamily: "serif", fontSize: "17px", lineHeight: "1.8", letterSpacing: "0.01em" }}>
                        
                        <div className="text-center mb-8 pb-6 border-b border-[#e8e0cc]">
                          <h4 className="text-2xl font-bold tracking-wider text-[#2D271D]">LỜI MỞ ĐẦU</h4>
                          <p className="text-sm text-[#8c7f66] mt-2 italic font-sans">Kỷ yếu Kỷ niệm 25 năm thành lập Khoa CNTT</p>
                        </div>

                        <p className="font-bold text-[#2D271D] mb-4">
                          Kính chào quý thầy cô, quý doanh nghiệp, các thế hệ người học cùng toàn thể các bạn sinh viên, học viên thân mến,
                        </p>
                        
                        <p className="mb-4">
                          Năm 2026 đánh dấu một cột mốc đặc biệt – kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin, Trường ĐH Công nghệ Kỹ thuật Tp. Hồ Chí Minh. Đây không chỉ là dịp để nhìn lại chặng đường đã qua, mà còn là thời khắc để tri ân những đóng góp quý báu của các thế hệ thầy cô, cán bộ, sinh viên, học viên và các doanh nghiệp đã đồng hành cùng sự phát triển của Khoa.
                        </p>
                        
                        <p className="mb-4">
                          Trải qua 25 năm xây dựng và trưởng thành, Khoa Công nghệ Thông tin không ngừng lớn mạnh cả về quy mô lẫn chất lượng đào tạo và nghiên cứu. Được thành lập từ năm 2001 trên cơ sở phát triển từ trung tâm Tin học, dù có nhiều khó khăn ban đầu, Khoa đã từng bước khẳng định vị thế là một trong những đơn vị đào tạo và nghiên cứu uy tín trong lĩnh vực Công nghệ Thông tin, đóng góp tích cực vào việc phát triển nguồn nhân lực chất lượng cao cho xã hội. Những thành tựu đạt được hôm nay là kết quả của sự nỗ lực bền bỉ, tinh thần đổi mới sáng tạo, sự đoàn kết và gắn bó của nhiều thế hệ.
                        </p>
                        
                        <p className="mb-4">
                          Kỷ yếu kỷ niệm 25 năm được biên soạn như một dấu ấn nhằm lưu giữ những ký ức, thành tựu và câu chuyện đáng tự hào của Khoa. Hy vọng ấn phẩm này sẽ trở thành nhịp cầu kết nối các thế hệ, khơi dậy niềm tự hào và ý thức trách nhiệm trong mỗi cá nhân, từ đó tiếp tục phát huy và gìn giữ những giá trị tốt đẹp của Khoa.
                        </p>
                        
                        <p className="mb-4">
                          Nhân dịp này, Khoa Công nghệ Thông tin xin trân trọng gửi lời cảm ơn sâu sắc tới quý thầy cô, cán bộ, sinh viên, học viên, cựu người học, quý doanh nghiệp đối tác và bạn bè đã luôn đồng hành, ủng hộ và đóng góp cho sự phát triển của Khoa trong suốt thời gian qua.
                        </p>
                        
                        <p className="mb-4">
                          Hướng tới tương lai, Khoa Công nghệ Thông tin, Trường ĐH Công nghệ Kỹ thuật Tp. Hồ Chí Minh sẽ tiếp tục phát huy những thành quả đã đạt được, không ngừng đổi mới, nâng cao chất lượng đào tạo và nghiên cứu, góp phần đáp ứng những yêu cầu ngày càng cao của xã hội trong thời đại chuyển đổi số và trí tuệ nhân tạo.
                        </p>

                        <div className="flex items-center justify-center my-10 space-x-4 opacity-40">
                          <div className="h-[1px] bg-[#443C2A] w-12"></div>
                          <span className="text-xl">♦</span>
                          <div className="h-[1px] bg-[#443C2A] w-12"></div>
                        </div>

                        <p className="mb-4">
                          Nhân dịp kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin, tôi trân trọng gửi tới các thế hệ cán bộ, giảng viên, sinh viên, học viên của Khoa lời chúc mừng nồng nhiệt và tốt đẹp nhất. Trải qua một chặng đường phát triển đầy nỗ lực, Khoa đã từng bước khẳng định uy tín và vị thế với nhiều thành tựu nổi bật trong đào tạo, nghiên cứu và đóng góp thiết thực cho sự phát triển chung của nhà trường và xã hội.
                        </p>
                        
                        <p className="mb-8">
                          Những kết quả ấy là minh chứng cho tinh thần đoàn kết, sáng tạo và cống hiến của toàn thể các thế hệ cán bộ viên chức, người học của Khoa. Tôi tin tưởng rằng, với nền tảng vững chắc và khát vọng vươn lên, Khoa Công nghệ Thông tin sẽ tiếp tục đổi mới, phát triển mạnh mẽ và gặt hái thêm nhiều thành công rực rỡ trong tương lai. Chúc Khoa Công nghệ Thông tin ngày càng lớn mạnh và phát triển bền vững.
                        </p>

                        <div className="mt-10 text-right">
                          <p className="font-bold text-lg mb-1" style={{ color: "#2D271D" }}>Trân trọng,</p>
                          <p className="font-bold text-xl font-sans tracking-wide" style={{ color: "#1e3a8a" }}>Trưởng Khoa</p>
                          <p className="text-[#8c7f66] uppercase text-sm font-sans tracking-widest mt-1">TS. Lê Văn Vinh</p>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "calc(var(--spacing-section) * 0.5)",
          paddingBottom: "var(--spacing-section)",
          backgroundColor: "white",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="font-bold mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: "72px",
                color: "#1e3a8a",
              }}
            >
              Kết nối và chia sẻ
            </h2>
            <p
              className="mb-8 max-w-5xl mx-auto"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#64748b",
              }}
            >
              Hãy cùng tạo nên những kỷ niệm đẹp trong dịp kỷ niệm 25 năm thành lập FIT-HCMUTE
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/hanh-trinh-25-nam"
                className="inline-flex items-center justify-center rounded-xl font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  padding: "16px 32px",
                  fontSize: "16px",
                  borderRadius: "14px",
                }}
              >
                Xem hành trình 25 năm
              </Link>
              <Link
                href="/tri-an"
                className="inline-flex items-center justify-center font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: "white",
                  color: "#1e3a8a",
                  padding: "16px 34px",
                  border: "2px solid #2563eb",
                  fontSize: "16px",
                  borderRadius: "14px",
                }}
              >
                Gửi lời chúc mừng
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll To Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-all z-40"
          style={{ backgroundColor: "var(--color-primary-900)" }}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
}
