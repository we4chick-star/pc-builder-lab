import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode for catching React issues early
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow external product images if added later
    remotePatterns: [
      { protocol: "https", hostname: "**.asus.com" },
      { protocol: "https", hostname: "**.msi.com" },
      { protocol: "https", hostname: "**.gigabyte.com" },
      { protocol: "https", hostname: "**.nvidia.com" },
      { protocol: "https", hostname: "**.amd.com" },
    ],
  },

  // Compress responses
  compress: true,

  // Strict Content Security — no powered-by header leak
  poweredByHeader: false,

  // Production source maps off (smaller bundle)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
