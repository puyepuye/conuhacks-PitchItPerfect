import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ensure Webpack handles worker files correctly
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: "file-loader" },
    });

    return config;
  },
};

export default nextConfig;
