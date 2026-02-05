/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/moroccan-recipes',
  assetPrefix: '/moroccan-recipes/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig