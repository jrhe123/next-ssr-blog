/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

// mark down editor
const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig);
