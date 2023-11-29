/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
    MAGICBELL_API_KEY: process.env.MAGICBELL_API_KEY,
    MAGICBELL_API_SECRET: process.env.MAGICBELL_API_SECRET,
  },
  productionBrowserSourceMaps: true,
  swcMinify: false,
};

module.exports = nextConfig;
