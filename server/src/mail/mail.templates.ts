/**
 * HTML Template cho email cảm ơn khi user submit form.
 * Branded theo FIT HCMUTE 25 năm.
 */
export function thankYouEmailHtml(
  recipientName: string,
  formTitle: string,
): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cảm ơn bạn - Khoa CNTT HCMUTE</title>
</head>
<body style="margin:0;padding:0;background-color:#F0F9FF;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F9FF;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#7E22CE 100%);padding:32px 40px;text-align:center;">
              <h1 style="color:#FFFFFF;font-size:24px;margin:0 0 8px 0;font-weight:700;">
                🎓 Khoa Công Nghệ Thông Tin
              </h1>
              <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;letter-spacing:1px;">
                KỶ NIỆM 25 NĂM THÀNH LẬP (2000 – 2025)
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#1E3A8A;font-size:22px;margin:0 0 16px 0;">
                Xin chào <span style="color:#2563EB;">${recipientName}</span>! 👋
              </h2>
              <p style="color:#334155;font-size:16px;line-height:1.7;margin:0 0 20px 0;">
                Cảm ơn bạn đã gửi thông tin qua biểu mẫu <strong>"${formTitle}"</strong>.
                Chúng tôi rất trân trọng sự đồng hành của bạn cùng <strong>25 năm</strong> xây dựng và phát triển
                Khoa Công Nghệ Thông Tin – Trường Đại học Công Nghệ Kỹ thuật TP.HCM.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#1D4ED8,#7E22CE);border-radius:12px;padding:24px;text-align:center;">
                    <p style="color:#FFFFFF;font-size:18px;font-weight:600;margin:0;line-height:1.5;">
                      ✨ Cảm ơn Bạn đã đồng hành cùng 25 Năm Khoa! ✨
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color:#64748B;font-size:14px;line-height:1.6;margin:24px 0 0 0;">
                Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ chúng tôi qua email hoặc fanpage của Khoa.
                Chúc bạn luôn mạnh khỏe và thành công!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;padding:24px 40px;border-top:1px solid #E2E8F0;">
              <p style="color:#94A3B8;font-size:12px;margin:0;text-align:center;line-height:1.6;">
                Khoa Công Nghệ Thông Tin – Trường ĐH Công Nghệ Kỹ thuật TP.HCM<br/>
                01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM<br/>
                <a href="https://fit.hcmute.edu.vn" style="color:#2563EB;text-decoration:none;">fit.hcmute.edu.vn</a>
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
