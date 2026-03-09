import type { Metadata } from 'next';

const siteConfig = {
  name: 'Khoa Công nghệ Thông tin - ĐH Công Nghệ Kỹ thuật TP. Hồ Chí Minh',
  shortName: 'FIT-HCMUTE',
  description: 'Khoa Công nghệ Thông tin - Đại học Công Nghệ Kỹ thuật Thành phố Hồ Chí Minh. Đào tạo chất lượng cao về Công nghệ Thông tin, Kỹ thuật Dữ liệu, An toàn Thông tin.',
  url: 'https://25nam.fit.hcmute.edu.vn',
};

interface PageMetadataProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
}

/**
 * Generate consistent metadata for pages
 */
export function generatePageMetadata({
  title,
  description = siteConfig.description,
  image,
  url,
  type = 'website',
  publishedTime,
  authors,
  tags,
}: PageMetadataProps): Metadata {
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
      locale: 'vi_VN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.shortName}`,
      description,
      images: [image],
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      authors,
      tags,
    };
  }

  return metadata;
}

/**
 * Generate metadata for dynamic article pages
 */
export interface ArticleMetadataProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  author?: string;
  tags?: string[];
}

export function generateArticleMetadata({
  title,
  description,
  slug,
  image,
  publishedAt,
  author,
  tags,
}: ArticleMetadataProps): Metadata {
  return generatePageMetadata({
    title,
    description,
    image,
    url: `/tin-tuc/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    authors: author ? [author] : undefined,
    tags,
  });
}

export { siteConfig };
