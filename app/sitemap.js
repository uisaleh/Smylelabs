import { PRODUCTS } from '@/lib/catalog';
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://smylelabs.com';
export default function sitemap() {
  const pages = ['', '/shop', '/about', '/verify', '/wholesale', '/warranty', '/contact', '/account'];
  return [...pages.map((p) => ({ url: BASE + p, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })), ...PRODUCTS.map((p) => ({ url: BASE + p.href, changeFrequency: 'weekly', priority: 0.8 }))];
}
