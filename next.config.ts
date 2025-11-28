import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Enable react strict mode for improved error handling
  reactStrictMode: true,

  // Enable compression to reduce bundle sizes
  compress: true,

  // Enable image optimization
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
    minimumCacheTTL: 31536000,
  },

  // Enable static optimization for pages that don't rely on server-side data
  experimental: {
    optimizeCss: true,
  },

  // Enable standalone build for Docker
  output: 'standalone',

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // Bundle analyzer for checking bundle sizes (development only)
  webpack: (config, { dev, isServer }) => {
    // Remove bundle analyzer to reduce dependencies
    return config;
  },

  // Enable automatic static optimization
  poweredByHeader: false,
};

export default nextConfig;