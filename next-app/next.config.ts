import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server mode: supports API routes, admin uploads, etc.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
