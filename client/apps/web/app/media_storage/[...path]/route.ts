import { NextRequest, NextResponse } from 'next/server';

const MINIO_PUBLIC_URL =
  process.env.MINIO_PUBLIC_URL || 'https://25namminio.hcmutertic.com';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetUrl = `${MINIO_PUBLIC_URL}/${path.join('/')}`;

  const res = await fetch(targetUrl, { cache: 'force-cache' });

  if (!res.ok) {
    return new NextResponse(null, { status: res.status });
  }

  const blob = await res.blob();
  return new NextResponse(blob, {
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
