import type { Metadata } from 'next';

const siteConfig = {
  name: 'Kỷ niệm 25 năm Khoa CNTT - ĐH Công Nghệ Kỹ thuật TP.HCM',
  shortName: 'FIT-HCMUTE 25 năm',
  description: 'Trang web kỷ niệm 25 năm thành lập Khoa Công nghệ Thông tin (2001–2026), Đại học Công Nghệ Kỹ thuật TP. Hồ Chí Minh. Hành trình phát triển, thành tựu và tri ân.',
  url: 'https://25nam.fit.hcmute.edu.vn',
  defaultOgImage: 'https://25nam.fit.hcmute.edu.vn/opengraph-image',
};

interface PageMetadataProps {
  title: string;
  description?: string;
  keywords?: string[];
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
  keywords,
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
    ...(keywords && { keywords }),
    openGraph: {
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image ?? siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'vi_VN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.shortName}`,
      description,
      images: [image ?? siteConfig.defaultOgImage],
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
