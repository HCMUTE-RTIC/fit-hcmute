import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Khoa Công nghệ Thông tin - FIT HCMUTE';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            Khoa Công nghệ Thông tin
          </div>
          <div
            style={{
              fontSize: 48,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            FIT - HCMUTE
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
            }}
          >
            Đại học Công Nghệ Kỹ thuật TP. Hồ Chí Minh
          </div>
        </div>

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
