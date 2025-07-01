/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable React Strict Mode untuk menghindari warning dari Swagger UI
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
