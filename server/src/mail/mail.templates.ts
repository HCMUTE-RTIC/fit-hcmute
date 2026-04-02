/**
 * HTML Template cho email cảm ơn khi user gửi lời chúc.
 * Branded theo FIT HCMUTE 25 năm.
 */

export function thankYouEmailHtml(
  recipientName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formTitle?: string,
): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cảm ơn bạn - Khoa CNTT HCMUTE</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Inter','Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

          <!-- Banner -->
          <tr>
            <td style="padding:0;line-height:0;">
              <img
                src="https://25nam.fit.hcmute.edu.vn/trang-chu-home/banner_trangchu.jpg"
                alt="Banner kỷ niệm 25 năm Khoa CNTT HCMUTE"
                width="600"
                style="width:100%;height:auto;display:block;border:0;"
              />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 36px 32px 36px;">
              <h2 style="color:#0f172a;font-size:22px;margin:0 0 20px 0;font-weight:700;font-family:'Inter','Segoe UI',sans-serif;">
                Xin chào anh/chị ${recipientName},
              </h2>
              <p style="color:#475569;font-size:15px;line-height:1.75;margin:0 0 24px 0;font-family:'Inter','Segoe UI',sans-serif;">
                Cảm ơn bạn đã gửi lời chúc đến Khoa Công Nghệ Thông Tin nhân dịp kỷ niệm <strong style="color:#0f172a;">25 năm</strong> thành lập.
                Mỗi lời chúc đều là nguồn động viên quý giá để chúng tôi tiếp tục phát triển và đồng hành cùng các thế hệ sinh viên.
              </p>

              <!-- Highlight box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f8fafc;border-left:4px solid #1E3A8A;border-radius:0 8px 8px 0;padding:20px 24px;">
                    <p style="color:#1e293b;font-size:16px;font-weight:600;margin:0;line-height:1.6;font-family:'Inter','Segoe UI',sans-serif;">
                      Cảm ơn bạn đã đồng hành cùng 25 năm Khoa CNTT!
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 36px;">
              <div style="height:1px;background-color:#e2e8f0;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px 28px 36px;">
              <p style="color:#94a3b8;font-size:12px;margin:0 0 8px 0;text-align:center;line-height:1.7;font-family:'Inter','Segoe UI',sans-serif;">
                Khoa Công Nghệ Thông Tin – Trường Đại Học Công Nghệ Kỹ Thuật TP.HCM<br/>
                01 Võ Văn Ngân, phường Thủ Đức, TP.HCM<br/>
                <a href="https://fit.hcmute.edu.vn" style="color:#1E3A8A;text-decoration:none;font-weight:600;">fit.hcmute.edu.vn</a>
              </p>
              <p style="color:#b0b8c4;font-size:11px;margin:0;text-align:center;line-height:1.6;font-family:'Inter','Segoe UI',sans-serif;">
                Được phát triển bởi <a href="https://hcmutertic.com/" style="color:#1E3A8A;text-decoration:none;">HCM UTE Research on Technology and Innovation Club</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}
