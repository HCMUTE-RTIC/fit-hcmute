import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const logoData = fs.readFileSync(path.join(process.cwd(), 'public/logo-50-nam-4x.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: 36,
        }}
      >
        <img
          src={logoBase64}
          alt="FIT HCMUTE"
          style={{ width: 160, height: 160, objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
