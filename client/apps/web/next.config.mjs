/** @type {import('next').NextConfig} */
const MINIO_INTERNAL_URL = process.env.MINIO_INTERNAL_URL || "http://localhost:9000";

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/media_storage/:path*",
        destination: `${MINIO_INTERNAL_URL}/:path*`,
      },
    ];
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        // MinIO production domain
        protocol: "https",
        hostname: "25namminio.hcmutertic.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
