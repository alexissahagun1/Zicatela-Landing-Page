import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF encodes several times slower, and every first request for a size waits on that encode.
    formats: ["image/webp"],
    // Optimized variants are immutable per URL; let browsers and the CDN keep them for 31 days.
    minimumCacheTTL: 2678400,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "",
  },
};

export default nextConfig;
