import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "streamit-s3-prod-bucket-376432388915-ap-south-1-an.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;