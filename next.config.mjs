/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Product photos are served straight from the live Shopify CDN (cloned by scripts/sync-shopify.mjs).
  images: { unoptimized: true },
  async redirects() {
    // Keep the old Shopify URLs working after the switch.
    return [
      { source: '/collections/all', destination: '/shop', permanent: true },
      { source: '/collections/:handle', destination: '/shop?cat=:handle', permanent: false },
      { source: '/pages/product-verify', destination: '/verify', permanent: true },
      { source: '/pages/warranty-claim', destination: '/warranty', permanent: true },
      { source: '/pages/contact', destination: '/contact', permanent: true },
      { source: '/apps/wpdapp', destination: '/wholesale', permanent: true },
      { source: '/account/login', destination: '/account', permanent: true }
    ];
  }
};
export default nextConfig;
