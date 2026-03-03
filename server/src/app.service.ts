import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>API Server - Kỷ niệm 25 năm FIT HCMUTE</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                  color: #333;
              }
              .container {
                  background: white;
                  padding: 3rem;
                  border-radius: 12px;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                  text-align: center;
                  max-width: 600px;
                  width: 90%;
              }
              h1 {
                  color: #1a56db;
                  margin-bottom: 0.5rem;
                  font-size: 2rem;
              }
              p {
                  line-height: 1.6;
                  color: #555;
              }
              .footer {
                  margin-top: 2rem;
                  padding-top: 1rem;
                  border-top: 1px solid #eee;
                  font-size: 0.9rem;
                  color: #777;
              }
              .badge {
                  display: inline-block;
                  padding: 0.25rem 0.75rem;
                  background-color: #e0f2fe;
                  color: #0284c7;
                  border-radius: 9999px;
                  font-weight: 600;
                  font-size: 0.8rem;
                  margin-bottom: 1rem;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="badge">API Service</div>
              <h1>API Kỷ niệm 25 năm FIT HCMUTE</h1>
              <p>Đây là trang API thuộc sở hữu của Khoa Công nghệ Thông tin - Trường Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE FIT).</p>
              <div class="footer">
                  <p>Được làm bởi CLB <strong>HCMUTE RTIC</strong><br><em>(HCMUTE Research on Technology and Innovation Club)</em></p>
              </div>
          </div>
      </body>
      </html>
    `;
  }
}
