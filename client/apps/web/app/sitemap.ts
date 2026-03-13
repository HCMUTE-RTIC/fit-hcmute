import type { MetadataRoute } from 'next';

// Force dynamic — không cache ở Next.js, để backend Redis lo caching
// Khi bài mới publish, backend tự clear Redis → sitemap reflect ngay lập tức
export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://25nam.fit.hcmute.edu.vn';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Ngày cố định cho static routes — không thay đổi theo thời gian build
const SITE_LAUNCH_DATE = new Date('2025-01-01');

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'weekly',
    priority: 1.0,
    images: [`${baseUrl}/opengraph-image`],
  },
  {
    url: `${baseUrl}/gioi-thieu`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/hanh-trinh-25-nam`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/thanh-tuu`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/tin-tuc`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/thu-vien`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/ky-yeu`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/tri-an`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/dang-ky`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
];

async function getPublishedArticles() {
  try {
    // cache: 'no-store' — bỏ qua Next.js fetch cache, gọi thẳng backend
    // Backend Redis tự serve cache; khi article publish/update/delete, backend clear Redis ngay
    const res = await fetch(`${API_URL}/api/articles`, { cache: 'no-store' });
    if (!res.ok) return [];
    const articles = await res.json();
    return Array.isArray(articles)
      ? articles.filter((a: { status: string }) => a.status === 'PUBLISHED')
      : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  const articleUrls: MetadataRoute.Sitemap = articles.map(
    (article: { slug: string; updatedAt: string; thumbnail?: string; category: string }) => ({
      url: `${baseUrl}/tin-tuc/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: article.category === 'EVENT' ? 0.8 : 0.7,
      ...(article.thumbnail ? { images: [article.thumbnail] } : {}),
    })
  );

  return [...staticRoutes, ...articleUrls];
}
