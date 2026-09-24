/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portal.ytgaa.com',
        pathname: '/storage/posters/**',
      },
    ],
  },
}

export default nextConfig
