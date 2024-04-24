/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL || "http://localhost:8000",
    WS_URL: process.env.WS_URL || "ws://localhost:8000",
  },
};

export default nextConfig;
