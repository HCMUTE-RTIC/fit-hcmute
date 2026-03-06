import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-bold mb-4" style={{ color: 'var(--color-primary-900)', fontSize: 'var(--text-h3)' }}>
              Khoa CNTT - HCMUTE
            </h3>
            <p className="mb-4" style={{ color: 'var(--color-text-gray)' }}>
              25 năm đào tạo và phát triển nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-primary-900)' }}>
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/gioi-thieu" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-gray)' }}>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/hanh-trinh-25-nam" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-gray)' }}>
                  Hành trình 25 năm
                </a>
              </li>
              <li>
                <a href="/thanh-tuu" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-gray)' }}>
                  Thành tựu
                </a>
              </li>
              <li>
                <a href="/tri-an" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-gray)' }}>
                  Tri ân & Kết nối
                </a>
              </li>
              <li>
                <a href="/ky-yeu" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-gray)' }}>
                  Kỷ yếu
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-primary-900)' }}>
              Liên hệ
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2" style={{ color: 'var(--color-text-gray)' }}>
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>01 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-2" style={{ color: 'var(--color-text-gray)' }}>
                <Phone size={18} />
                <a href="tel:+84-028-37221223-8370" className="hover:opacity-80 transition-opacity">
                  (+84 - 028) 37221223 - 8370
                </a>
              </li>
              <li className="flex items-center space-x-2" style={{ color: 'var(--color-text-gray)' }}>
                <Mail size={18} />
                <a href="mailto:kcntt@hcmute.edu.vn" className="hover:opacity-80 transition-opacity">
                  kcntt@hcmute.edu.vn
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--color-primary-900)' }}>
              Kết nối với chúng tôi
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--color-primary-600)' }}
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--color-accent-500)' }}
              >
                <Youtube size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--color-primary-600)' }}
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center" style={{ color: 'var(--color-text-gray)' }}>
          <p>© 2026 Khoa Công nghệ Thông tin - Trường Đại học Công nghệ Kỹ thuật TP.HCM.</p>
          <p className="mt-2">
            <span style={{ color: 'var(--color-accent-500)' }}>❤</span> Kỷ niệm 25 năm thành lập (2001 - 2026)
          </p>
          <p className="mt-2 text-sm">
            Được phát triển bởi <span href="https://hcmutertic.com" target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: 'var(--color-primary-600)' }}>HCM UTE Research on Technology and Innovation Club</span> 
          </p>
        </div>
      </div>
    </footer>
  );
}
