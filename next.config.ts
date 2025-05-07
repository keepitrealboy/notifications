import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://randomuser.me/api/**'),
      new URL('https://picsum.photos/**'),
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://test-api.krascatalog.ru/:path*',
      },
    ];
  },
};

export default nextConfig;
