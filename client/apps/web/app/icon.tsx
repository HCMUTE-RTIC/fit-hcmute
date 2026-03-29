import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const logoData = fs.readFileSync(path.join(process.cwd(), 'public/logo-50-nam-4x.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img
          src={logoBase64}
          alt="FIT HCMUTE"
          style={{ width: 64, height: 64, objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
