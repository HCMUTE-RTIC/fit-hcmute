# HỆ THỐNG THIẾT KẾ GIAO DIỆN CƠ SỞ (UI/UX DESIGN SYSTEM) DÀNH CHO STITCH/FIGMA

Tài liệu này đóng vai trò là một **Design Tokens & Component Specs** chuẩn mực, cung cấp đầy đủ thông số cho Designer khi sử dụng các công cụ vẽ UI như **[Stitch](https://stitch.withgoogle.com/)** hoặc **Figma** để thiết kế bản mẫu (Mockup) cho Website Kỷ niệm 25 năm FIT - HCMUTE.

---

## 1. DESIGN TOKENS (THUỘC TÍNH CƠ BẢN)

Designer cần nạp các mã thông số này vào *Local Variables / Styles* của Stitch/Figma trước khi bắt đầu vẽ Layout.

### 1.1. Color Palette (Bảng màu)
| Tên Style | Alias | Hex Code | Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `color-primary-900` | `#1E3A8A` | Text chính Heading, Nút bấm Primary, Text Logo |
| **Brand Blue** | `color-primary-600` | `#2563EB` | Chữ liên kết (Links), Outline Card Hover |
| **Brand Red (HCMUTE)** | `color-accent-500` | `#DC2626` | Dấu cộng `+` trong số liệu, Nhấn mạnh Keyword "Kỹ Thuật", Line phân cách nhỏ |
| **Surface Light Blue** | `color-bg-light` | `#F0F9FF` | Đổ làm mảng màu khối nền tảng (Ví dụ: Block Banner, Block Hero) |
| **Surface White** | `color-bg-white` | `#FFFFFF` | Nền Card Triết lý, Nền trang giới thiệu chữ nhiều |
| **Text Muted** | `color-text-gray` | `#64748B` | Mô tả phụ (Sub-text), Đoạn văn chữ dài |
| **Gradient Hero** | `color-grad-hero` | `L-to-R: #1D4ED8 -> #7E22CE` | Fill chữ cho các Số liệu siêu to (`27,000+`) hoặc text tiêu đề chính "CÔNG NGHỆ THÔNG TIN" |

### 1.2. Typography (Kiểu chữ)
*   **Font Family:** `Inter`, `SF Pro` hoặc tùy chọn Font Kỹ thuật như `Roboto`.
*   **Scale (Hệ tỷ lệ):**
    *   `Display/H1` (Bold 800): **96px** -> Dùng cho Chữ Top 3, 27,000, 52.
    *   `H2` (Bold 700): **48px** -> Dùng cho các Section "GIÁ TRỊ CỐT LÕI", "TRƯỜNG TRỌNG ĐIỂM".
    *   `H3` (SemiBold 600): **24px** -> Dùng cho Tên nhãn các Thẻ (Ví dụ: "Công nghệ 4.0", "Hội nhập quốc tế").
    *   `Body Text` (Regular 400): **16px** -> Nội dung diễn giải.

### 1.3. Spacing & Grid (Khoảng cách & Lưới lưới)
*   **Grid System:** 12 Columns `max-width: 1280px`, Gutter `24px`.
*   **Section Padding:** Rất lớn. Đáy và đỉnh của mỗi mảng Background cách nhau ít nhất `120px` (Spacing-30) đễ tạo độ "Thở" cho website học thuật.
*   **Border Radius:** Bo góc nhẹ. `Radius: 16px` cho các hình khối Thẻ Card.
*   **Shadow:** Đổ bóng rất mờ. `Y: 4px`, `Blur: 20px`, `Color: rgba(0,0,0,0.05)`. Không lạm dụng bóng đen xì.

---

## 3. HỆ THỐNG LƯỚI RESPONSIVE (BREAKPOINTS & GRID SYSTEM)

Để đảm bảo thiết kế được chuyển đổi mượt mà từ máy tính xuống điện thoại (Responsive), khi vẽ hoặc cấu hình CSS cần tuân thủ 3 mốc màn hình (Breakpoints) chuẩn của Tailwind CSS sau:

### 3.1. Desktop & Large Screens (`lg`: 1024px trở lên)
*   **Grid:** Hệ thống lưới 12 cột (12-col grid). Căn giữa màn hình (Container) với `max-width: 1280px` hoặc `1440px` để chừa khoảng thở hai bên lề (Margin).
*   **Layout Ứng Xử:**
    *   **Thống kê (TOP 3, 27,000+):** Xếp ngang 1 hàng 3 cột (Flex Row).
    *   **Giá trị Cốt Lõi:** Phía bên trái là Nhóm Text "NHÂN BẢN - SÁNG TẠO - HỘI NHẬP" cố định. Phía bên phải là lưới 3 cột dọc (hoặc lưới 2x2 tuỳ nội dung Component Card).

### 3.2. Tablet & iPad (`md`: 768px - 1023px)
*   **Grid:** Hệ thống lưới 8 cột. Margin ở hai mép viền tối thiểu là `32px`.
*   **Layout Ứng Xử:**
    *   Kích thước chữ (Font Size) ở Heading H1, H2 phải thu nhỏ lại tầm 30% để không bị tràn màn hình.
    *   **Thống kê (Stats):** Có thể giữ 3 cột ngang nếu số vẫn hiển thị đẹp, hoặc chia thành Slider kéo vuốt ngang nếu quá chật.
    *   **Giá trị Cốt lõi:** Nhóm chữ to "NHÂN BẢN" đẩy lên nằm thẳng hàng ở phía trên cùng, 3 thẻ Thẻ Giá trị (Card) sẽ xếp thành Grid ngang (Grid 3 cols) nằm bên dưới.

### 3.3. Mobile Devices (`sm`: 320px - 767px)
*   **Grid:** Hệ thống lưới 4 cột. Lề mép (Padding-X) ốp viền nhỏ nhất là `16px` hoặc `24px` để chừa không gian chạm dọc hai bên sườn màn hình cho người dùng (Touch target).
*   **Layout Ứng Xử:**
    *   Hầu như toàn bộ các Element xếp ngang (Row) sẽ bẻ gãy đổ dồn xếp dọc (Column Stack) đè lên nhau từ trên xuống dưới.
    *   **Navbar Menu:** Trở thành Biểu tượng Hamburger (3 Dấu gạch), khi click sẽ trượt Menu xổ xuống `100% vh` che nửa màn hình.
    *   **Thống kê (TOP 3, ...):** Xếp thành cột dọc (1 cột duy nhất). Margin-bottom của mỗi số liệu là `32px`. Đoạn số liệu khổng lồ (size 96px) phải hạ xuống còn khoảng `56px` để tránh bị gãy rớt chữ.
    *   **Card Triết lý:** Các tấm thẻ Card hiển thị tuần tự từng cái một từ trên xuống. Icon Watermark (dấu chìm) trong góc được phóng to lên đôi chút để tăng cảm giác chìm nổi đầy màn hình. Khoảng cách (Spacings/Padding Y) giữa các Banner giảm đi 50% so với Desktop.

---

## 4. COMPONENT SPECS (CẤU TRÚC COMPONENT CỐT LÕI)

Vẽ các Component (Frame) sau trên Stitch/Figma để dễ dàng nhân bản và tái sử dụng cho các trang khác:

### CPN 01: The Glass Navbar (Thanh điều hướng nổi)
*   **Nền (Fill):** `#FFFFFF` opacity `80%`.
*   **Effect:** Background Blur / Backdrop Filter Blur `12px`.
*   **Height:** `80px`.
*   **Phân bổ:** Trái là Logo FIT HCMUTE (Màu Primary Navy). Phải là 5 Text Links (Spacing `32px` giữa các link). Rìa Phải cùng dán Button `Đăng ký` (Fill `Primary Navy`, Text trắng bo góc 8px).

### CPN 02: Stats Big Number (Cụm số liệu)
*   Tham chiếu hình Mẫu: Một khối Auto Layout bọc dọc (Vertical).
*   Lớp 1 (Heading Khổng Lồ): Điền con số `27,000`. Set Fill là Linear Gradient (`color-grad-hero`). Kéo giãn size lên `96px`.
*   Lớp 2 (Dấu Nhấn): Thêm Text `+` kế bên, set màu `Brand Red` (Đỏ HCMUTE).
*   Lớp 3 (Sub-text): Đoạn text Xám Mờ "Sinh viên đang theo học". Align Center.

### CPN 03: The Philosophy Card (Thẻ Giá trị cốt lõi / Triết lý)
*   Tham chiếu hình mẫu phần Nửa dưới Màn hình Trắng.
*   Tạo Frame trắng, `Radius 16px`, `Stroke: 1px nhạt (#F1F5F9)`.
*   **Cấu trúc dọc (Vertical Auto Layout):** 
    1. Icon hoặc Label nhỏ (Màu Brand Blue).
    2. Heading H3 ("Công nghệ 4.0" màu Primary Navy).
    3. Paragraph Body Text (Chữ xám).
*   **Đặc Biệt (Watermark):** Bên trong Component góc phải Dưới cùng (Bottom Right Absolute), vẽ 1 cái SVG Icon bóng đèn/Bánh răng khổng lồ, crop nằm chìm sát cạnh viền, Fill màu xám nhạt `Opacity: 5%`.

### CPN 04: Blueprint Background Pattern (Nền lưới ô ly - Kỹ thuật)
*   Trên cái Artboard tổng của Section Triết Lý. Dùng công cụ vẽ Line / Grid của Stitch kẻ các ô vuông cỡ `40x40px` nhạt màu `#F8FAFC`.
*   Nó sẽ tạo ra cảm giác giấy nháp kỹ thuật (Blueprint) cực kỳ xịn sò dưới nền trắng, đúng với phong cách của một trường Đại học Sư phạm Kỹ thuật / Bách Khoa.
