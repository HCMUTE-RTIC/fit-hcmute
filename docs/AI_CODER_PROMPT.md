# PROMPT GENERATE GIAO DIỆN BẰNG STITCH (GOOGLE STITCH)

*(Dành riêng cho công cụ vẽ UI tự động rã code React/Tailwind [Stitch](https://stitch.withgoogle.com/)*

Khi dùng Stitch, AI này thiên về mặt trực quan (Visual) nên nó rất cần những **chỉ dẫn Layout cụ thể bằng tiếng Anh**. Dưới đây là bộ Prompt mồi (Mỗi Prompt dùng để sinh ra 1 Section trên Trang Chủ Kỷ niệm 25 năm FIT HCMUTE).

---

## 🎨 TOÀN CẢNH TRANG CHỦ (MASTER PROMPT)

*(Copy đoạn dưới đây thả vào khung chat đầu tiên của Stitch chứa định hướng Vibe & Color Palette. Bạn không phân phối File text cho Stitch, nó chỉ ăn Text Prompt)*

> **PROMPT:**
> You are an expert UI/UX Engineer using React, TailwindCSS, and Lucide React icons. I need you to design a stunning, modern, and academic landing page to celebrate the "25th Anniversary of the Faculty of Information Technology (FIT) at Ho Chi Minh City University of Technology and Education (HCMUTE)".
> 
> **Design Vibe & Tokens:**
> - Style: Modern Academic, Tech-forward, Clean, High Whitespace area, very subtle Glassmorphism.
> - Background 1 (Top half): Use extreme light baby blue `#F0F9FF`.
> - Background 2 (Bottom half): Use pure white `#FFFFFF`.
> - Primary Text Color: Dark Navy Blue `#1E3A8A`.
> - Brand Emphasis / Accent: Red `#DC2626` (for plus signs or CTA).
> - Special Style: Use vibrant gradients from Blue (`#1D4ED8`) to Purple (`#7E22CE`) strictly for massive numbering statistics.
> 
> Please generate the first section: **The Navigation Bar and The Hero Section.**
> 
> **1. Navbar:** Floating, transparent white `bg-white/80` with backdrop-blur. 5 text links (Home, Timeline, Stats, Gallery, Join) and one solid Navy Blue login button rounded.
> **2. Hero Banner:** Center-aligned context. Massive text "KHOA CÔNG NGHỆ THÔNG TIN - HCMUTE". Add a subtle glowing effect to the IT text part. Below it, a subtle gray subtitle. Below that, two big action buttons: A solid Red primary button "Gửi Lời Chúc" and an outlined Navy button "Khám phá 25 năm". Provide generous padding (`py-24` minimum).

---

## 📊 MỤC 2: RENDER CÁC CON SỐ THỐNG KÊ (SECTION 2: BIG STATS)

*(Sau khi Stitch gõ xong Header & Hero, bạn ném tiếp đoạn prompt này vào để nó gen tiếp khối 3 con số như bức hình bạn đưa mình)*

> **PROMPT:**
> Excellent. Now, directly below the Hero Section, create the **"Key Statistics Section" (Các con số biết nói)**. Keep the background light baby blue `#F0F9FF` to blend with the hero smoothly.
> 
> **Layout & Content:**
> Create a horizontal layout with 3 massive statistics items centered.
> - Item 1: Display "TOP 3" in massive Navy Blue text. Below it, small gray text: "Trường Đại học Kỹ thuật mũi nhọn".
> - Item 2 (Centerpiece): Display "27,000+" but make the number "27,000" incredibly huge (like `text-8xl` or `96px`). Apply the gradient fill (`bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent`) specifically to "27,000". Make the "+" symbol solid Red. Below it: "Cựu Sinh Viên Cơ Hữu".
> - Item 3: Display "52" in massive Navy Blue text. Below it: "Phòng Nghiên Cứu Lab & AI".
> 
> Ensure the spacing between these three items is wide and they align perfectly horizontally on Desktop, but stack vertically gracefully on Mobile view.

---

## 🎯 MỤC 3: RENDER KHỐI THẺ GIÁ TRỊ CỐT LÕI (SECTION 3: PHILOSOPHY CARDS)

*(Tiếp tục dán đoạn này vào Stitch để vẽ cụm thẻ Card viền trắng bo góc)*

> **PROMPT:**
> Perfect. Now move down and create the **"Core Values" (Triết lý Giáo dục) Section**. Switch the background entirely to pure white `#FFFFFF` from here. Ensure huge top padding `pt-24`.
> 
> **Layout Concept:**
> Use a 2-column Desktop grid layout (left: 30%, right: 70%).
> 
> **Left Column (Sticky Sticky Header):**
> A small red over-title "TRIẾT LÝ GIÁO DỤC".
> Below it, massive bold text stacked vertically line-by-line:
> "NHÂN BẢN"
> "SÁNG TẠO"
> "HỘI NHẬP"
> Use the classic Navy Blue `#1E3A8A`.
> 
> **Right Column (Card Grid Layout):**
> Create a grid containing 3 visually distinct polished Cards. 
> Card specs: White background, `rounded-2xl`, very subtle border `border border-slate-100`, and a super faint shadow `shadow-sm hover:shadow-md`. Add small animation `hover:-translate-y-1`.
> Card 1: Title "Công nghệ 4.0", Subtitle blue text, and 3 lines of gray description text.
> Card 2: Title "Năng lượng Tái tạo", Subtitle blue text, and gray description.
> Card 3: Title "Trí tuệ Nhân tạo", Subtitle blue text, description.
> 
> **Bonus Graphic Detail (Watermark Aspect):**
> Inside the very bottom-right absolute corner of EACH Card, place a huge Lucide React Icon (e.g., Lightbulb, CPU, Network) that is heavily blown up in scale (`w-32 h-32`) but with extremely low opacity `opacity-5`. This makes it look like an elegant background watermark graphic without disrupting the readable text above it.
