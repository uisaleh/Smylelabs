const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://smylelabs.com';
export default function robots() { return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/cart'] }], sitemap: BASE + '/sitemap.xml' }; }
