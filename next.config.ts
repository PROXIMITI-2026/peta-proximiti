import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/peta-proximiti',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
