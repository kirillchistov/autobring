import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// apps/web → monorepo root (autobring/), not the parent NextJS/ folder
const monorepoRoot = path.join(__dirname, "../..");
const isGhPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@autobring/shared-types", "@autobring/calculator-rates"],
  // Parent folder NextJS/ has its own pnpm-lock.yaml. Without this pin Next
  // wrongly uses that as workspace root and can resolve modules from sibling
  // projects (e.g. next@16), which breaks webpack with
  // "Cannot read properties of undefined (reading 'call')".
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? "/autobring" : "",
  },
  ...(isGhPages
    ? {
        output: "export",
        basePath: "/autobring",
        assetPrefix: "/autobring",
        images: { unoptimized: true },
      }
    : {
        images: { unoptimized: true },
      }),
};

export default nextConfig;
