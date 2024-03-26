/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'deckofcardsapi.com',
          port: '',
          pathname: '/static/img/**',
        },
        {
          protocol: 'https',
          hostname: 'opengameart.org',
          port: '',
          pathname: '/sites/default/files/**',
        }
        
      ],
    },
  }

export default nextConfig;
