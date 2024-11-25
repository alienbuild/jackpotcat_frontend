import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        // webpackBuildWorker: true,
        // reactCompiler: true
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
