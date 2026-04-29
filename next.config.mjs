/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
