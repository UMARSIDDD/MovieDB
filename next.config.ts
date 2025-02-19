import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{
      hostname: 'image.tmdb.org',
    }]
  },
};

export default nextConfig;

