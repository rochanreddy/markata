import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper server-side output for Vercel
  output: undefined,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  
  // Ensure proper build output
  trailingSlash: false,
  
  // Disable experimental features for production builds
  experimental: {
    // Remove experimental features for now
  }
};

export default nextConfig;
