import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "scot-cranston2.360max.io" },
      { protocol: "https", hostname: "12v.b74.myftpupload.com" },
    ],
  },
};

export default nextConfig;
