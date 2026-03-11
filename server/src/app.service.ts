import { Injectable } from '@nestjs/common';
import { renderApiDocs } from './common/templates/api-docs.template';

@Injectable()
export class AppService {
    getDocs(): string {
        return renderApiDocs();
    }

    getWarning(): string {
        return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>REST API Subsystem - FIT HCMUTE</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    display: ['Space Grotesk', 'sans-serif'],
                  },
                  backgroundImage: {
                    'grid-pattern': "url('data:image/svg+xml,%3Csvg width=\\"40\\" height=\\"40\\" viewBox=\\"0 0 40 40\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z\\" fill=\\"%23ffffff\\" fill-opacity=\\"0.03\\" fill-rule=\\"evenodd\\"%3E%3C/path%3E%3C/svg%3E')",
                  }
                }
              }
            }
          </script>
          <style>
            body {
              background-color: #030712;
            }
            .glass-panel {
              background: rgba(17, 24, 39, 0.7);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.08);
            }
            .glow-effect {
              position: absolute;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
              border-radius: 50%;
              top: -150px;
              left: 50%;
              transform: translateX(-50%);
              z-index: -1;
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            .floating-badge {
              animation: float 4s ease-in-out infinite;
            }
          </style>
      </head>
      <body class="font-sans antialiased text-slate-300 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-grid-pattern">
          
          <!-- Decorative Background Elements -->
          <div class="glow-effect"></div>
          <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#020617] to-transparent z-[-1]"></div>
          
          <main class="w-full max-w-2xl px-6 relative z-10 flex flex-col items-center">
              
              <!-- Badge -->
              <div class="floating-badge mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 shadow-inner backdrop-blur-sm">
                 <span class="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)] animate-pulse"></span>
                 <span class="text-xs font-semibold tracking-wider text-slate-300 uppercase">System Active</span>
              </div>

              <!-- Main Card -->
              <div class="glass-panel w-full rounded-2xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
                  
                  <!-- Top accent line -->
                  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-70"></div>

                  <h1 class="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">REST API <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Subsystem</span></h1>
                  <p class="text-slate-400 text-lg md:text-xl font-medium mb-10 max-w-lg mx-auto">Nền tảng cung cấp dịch vụ dữ liệu cho hệ thống Kỷ niệm 25 năm FIT HCMUTE.</p>

                  <!-- Warning Alert Box -->
                  <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-left relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                      <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                      
                      <div class="flex items-start gap-4">
                          <div class="bg-amber-500/20 p-2 rounded-lg text-amber-500 mt-1 shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                          </div>
                          <div>
                              <h3 class="font-display text-amber-500 font-bold text-lg mb-2">Cảnh báo Truy cập</h3>
                              <p class="text-slate-300 text-sm leading-relaxed mb-4">
                                  Đây là máy chủ Internal API chuyên biệt cho phía Client Web Application <a href="https://25nam.fit.hcmute.edu.vn" target="_blank" class="text-amber-400 hover:text-amber-300 font-semibold underline decoration-amber-400/30 underline-offset-4 transition-colors">25nam.fit.hcmute.edu.vn</a>. Không phận sự vui lòng miễn truy cập.
                              </p>
                              
                              <a href="/api/docs" class="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors border border-slate-600 focus:ring-2 focus:ring-slate-500 focus:outline-none w-fit">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-slate-400"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                  Developer Documentation
                              </a>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Footer -->
              <footer class="mt-12 text-center space-y-2 pb-6">
                  <p class="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">Engineered & Maintained by</p>
                  <div class="flex items-center justify-center gap-3">
                      <span class="text-slate-300 font-bold text-sm">HCMUTE RTIC</span>
                      <span class="w-1 h-1 rounded-full bg-slate-600"></span>
                      <span class="text-slate-400 text-sm">Phân ban Kỹ thuật</span>
                  </div>
              </footer>

          </main>
      </body>
      </html>
    `;
    }
}
