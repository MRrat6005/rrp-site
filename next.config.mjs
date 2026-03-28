import fs from "node:fs";
import path from "node:path";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] ?? "";
const hasCustomDomain = fs.existsSync(path.join(process.cwd(), "public", "CNAME"));
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (!hasCustomDomain && repoName ? `/${repoName}` : "");

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath || undefined
};

export default nextConfig;

