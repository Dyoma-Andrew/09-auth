import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ac.goit.global" }],
  },
};

export default nextConfig;
