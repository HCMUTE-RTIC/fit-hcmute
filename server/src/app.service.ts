import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>API Server - 25 Năm FIT HCMUTE</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
              
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }

              body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                  min-height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #0f172a;
                  background-image: 
                      radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                      radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                      radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                  color: #f8fafc;
                  overflow: hidden;
              }

              .glass-panel {
                  background: rgba(30, 41, 59, 0.7);
                  backdrop-filter: blur(16px);
                  -webkit-backdrop-filter: blur(16px);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 24px;
                  padding: 3rem;
                  max-width: 550px;
                  width: 90%;
                  text-align: center;
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                  position: relative;
                  animation: float 6s ease-in-out infinite;
              }

              @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                  100% { transform: translateY(0px); }
              }

              .icon-wrapper {
                  width: 80px;
                  height: 80px;
                  margin: 0 auto 1.5rem;
                  background: rgba(239, 68, 68, 0.1);
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid rgba(239, 68, 68, 0.2);
              }

              .icon-wrapper svg {
                  width: 40px;
                  height: 40px;
                  color: #ef4444;
              }

              h1 {
                  font-size: 1.75rem;
                  font-weight: 800;
                  margin-bottom: 0.5rem;
                  background: linear-gradient(to right, #f8fafc, #94a3b8);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  letter-spacing: -0.025em;
              }

              .subtitle {
                  font-size: 0.95rem;
                  color: #94a3b8;
                  font-weight: 400;
                  margin-bottom: 2rem;
              }

              .alert-box {
                  background: rgba(239, 68, 68, 0.05);
                  border-left: 4px solid #ef4444;
                  padding: 1rem;
                  border-radius: 0 8px 8px 0;
                  margin-bottom: 2rem;
                  text-align: left;
              }

              .alert-box strong {
                  display: block;
                  color: #fca5a5;
                  font-size: 0.85rem;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  margin-bottom: 0.25rem;
              }

              .alert-box p {
                  color: #e2e8f0;
                  font-size: 0.95rem;
                  line-height: 1.5;
              }

              .alert-box .domain {
                  color: #60a5fa;
                  font-weight: 600;
              }

              .footer {
                  margin-top: 2rem;
                  padding-top: 1.5rem;
                  border-top: 1px solid rgba(255, 255, 255, 0.05);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 0.5rem;
              }

              .footer p {
                  font-size: 0.85rem;
                  color: #64748b;
              }

              .footer strong {
                  color: #e2e8f0;
                  font-weight: 600;
              }

              .glow {
                  position: absolute;
                  width: 150px;
                  height: 150px;
                  background: #ef4444;
                  filter: blur(100px);
                  border-radius: 50%;
                  top: -50px;
                  right: -50px;
                  opacity: 0.15;
                  z-index: -1;
              }
              
              .glow-blue {
                  position: absolute;
                  width: 200px;
                  height: 200px;
                  background: #3b82f6;
                  filter: blur(120px);
                  border-radius: 50%;
                  bottom: -80px;
                  left: -50px;
                  opacity: 0.15;
                  z-index: -1;
              }
          </style>
      </head>
      <body>
          <div class="glass-panel">
              <div class="glow"></div>
              <div class="glow-blue"></div>
              
              <div class="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
              </div>

              <h1>RESTful API Server</h1>
              <p class="subtitle">Protected Backend Environment</p>

              <div class="alert-box">
                  <strong>⚠️ Cảnh báo truy cập</strong>
                  <p>Đây là hệ thống máy chủ API cung cấp dữ liệu ngầm cho nền tảng web <a href="https://25nam.fit.hcmute.edu.vn" class="domain" style="text-decoration: none;">25nam.fit.hcmute.edu.vn</a>.</p>
                  <p style="margin-top: 0.5rem; font-weight: 600; color: #ef4444;">KHÔNG PHẬN SỰ MIỄN TRUY CẬP!</p>
              </div>

              <div class="footer">
                  <p>Hệ thống được thiết kế và bảo mật bởi:</p>
                  <p>Phân ban Kỹ thuật - CLB <strong>HCMUTE RTIC</strong></p>
              </div>
          </div>
      </body>
      </html>
    `;
    }
}
