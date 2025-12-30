/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.im.ge',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  },
};

export default nextConfig;
