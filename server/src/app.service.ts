import { Injectable } from '@nestjs/common';
import { renderApiDocs } from './common/templates/api-docs.template';

@Injectable()
export class AppService {
  getHello(): string {
    return renderApiDocs();
  }
}
//       <!DOCTYPE html>
//       <html lang="vi">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>API System - 25 Năm FIT HCMUTE</title>
//           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
//           <style>
//               body {
//                   background-color: #f8f9fa;
//                   height: 100vh;
//                   display: flex;
//                   align-items: center;
//                   justify-content: center;
//                   font-family: system-ui, -apple-system, sans-serif;
//               }
//               .main-card {
//                   max-width: 600px;
//                   width: 100%;
//                   box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
//                   border: none;
//                   border-radius: 12px;
//                   overflow: hidden;
//               }
//               .card-header {
//                   background: linear-gradient(135deg, #0d6efd, #0dcaf0);
//                   color: white;
//                   padding: 2rem 1.5rem;
//                   text-align: center;
//                   border-bottom: 0;
//               }
//               .card-body {
//                   padding: 2.5rem 2rem;
//               }
//               .alert-custom {
//                   background-color: #fff3cd;
//                   border-left: 5px solid #ffc107;
//                   color: #856404;
//                   padding: 1rem 1.5rem;
//                   border-radius: 4px;
//               }
//               .footer-credits {
//                   text-align: center;
//                   margin-top: 2rem;
//                   padding-top: 1.5rem;
//                   border-top: 1px solid #e9ecef;
//                   color: #6c757d;
//                   font-size: 0.9rem;
//               }
//               a.custom-link {
//                   color: #d39e00;
//                   font-weight: 600;
//                   text-decoration: none;
//               }
//               a.custom-link:hover {
//                   text-decoration: underline;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container d-flex justify-content-center px-3">
//               <div class="card main-card">
//                   <div class="card-header">
//                       <h2 class="mb-1 fw-bold">REST API Subsystem</h2>
//                       <p class="mb-0 opacity-75">Nền tảng hệ thống dữ liệu Backend</p>
//                   </div>

//                   <div class="card-body">
//                       <div class="alert alert-custom mb-4" role="alert">
//                           <h5 class="alert-heading fw-bold">
//                               ⚠️ Cảnh báo truy cập
//                           </h5>
//                           <hr style="border-color: #ffe8a1;">
//                           <p class="mb-0">
//                               Đây là máy chủ API nội bộ chuyên cấp phát dữ liệu nền tảng cho trang web chính thức
//                               <a href="https://25nam.fit.hcmute.edu.vn" class="custom-link" target="_blank">25nam.fit.hcmute.edu.vn</a>.
//                           </p>
//                           <p class="mt-3 mb-0 fw-bold text-danger text-uppercase">
//                               Không phận sự miễn truy cập!
//                           </p>
//                       </div>

//                       <div class="footer-credits">
//                           <p class="mb-1 text-uppercase fw-semibold" style="letter-spacing: 1px; font-size: 0.75rem;">Engineered & Maintained by</p>
//                           <p class="mb-0 fw-bold fs-5 text-dark">
//                               HCMUTE RTIC
//                               <span class="mx-2 text-muted">|</span>
//                               <span class="fs-6 fw-normal text-secondary">Phân ban Kỹ thuật</span>
//                           </p>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </body>
//       </html>
//     `;
//     }
// }
