import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images-ext-1.discordapp.net",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  // @ts-ignore - Required for dev server network access, missing from current Next.js types
  allowedDevOrigins: ["192.168.29.200", "10.175.127.126"],
  async redirects() {
    return [
      {
        source: "/go",
        destination: "https://client.dynoxium.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
