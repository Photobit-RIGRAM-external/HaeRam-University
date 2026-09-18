import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zfxkcxumzzozlykltemf.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
