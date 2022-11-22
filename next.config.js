/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["https://images.unsplash.com"],
  },
};

// mark down editor
const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig);
