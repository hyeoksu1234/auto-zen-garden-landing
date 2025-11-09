import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_NAME = "auto-zen-garden-landing";
const isProd = process.env.NODE_ENV === "production";
const isVercel = Boolean(process.env.VERCEL);
const basePath = isProd && !isVercel ? `/${REPO_NAME}` : undefined;
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.auto-zen-garden.com",
      },
    ],
  },
};

export default nextConfig;
