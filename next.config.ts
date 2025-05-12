import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // keep this for remote images
    remotePatterns: [], // optional
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/webp"],
    // 🔽 this is the important line
    unoptimized: true,
  },
};

export default nextConfig;
