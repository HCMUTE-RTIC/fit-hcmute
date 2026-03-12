import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const alt = 'Khoa Công nghệ Thông tin - FIT HCMUTE';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const logoData = fs.readFileSync(path.join(process.cwd(), 'public/logo-50-nam-4x.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 50%, #003d7a 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <img
          src={logoBase64}
          alt="FIT HCMUTE"
          style={{ width: 480, objectFit: 'contain' }}
        />

        {/* Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            color: 'white',
          }}
        >
          fit.hcmute.edu.vn
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
