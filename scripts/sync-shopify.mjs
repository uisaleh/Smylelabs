// Clones the live catalog from smylelabs.com (Shopify) into data/products.json.
// Runs automatically before every `npm run build` (so each Vercel deploy picks up
// new products, prices, stock and photos). If the store can't be reached, the
// committed data/products.json is kept and the build continues.
import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const STORE = process.env.SHOPIFY_STORE_URL || 'https://smylelabs.com';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data', 'products.json');
const KEEP = new Set(['p', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'br', 'h2', 'h3', 'h4']);

function cleanHtml(html = '') {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|iframe|svg)[\s\S]*?<\/\1>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<meta[^>]*>/gi, '');
  s = s.replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi, (m, tag) => {
    const t = tag.toLowerCase();
    if (!KEEP.has(t)) return t === 'td' || t === 'th' ? ' ' : '';
    return m.startsWith('</') ? `</${t}>` : `<${t}>`;
  });
  return s.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/<(p|b|strong)>\s*<\/\1>/g, '').trim();
}

async function fetchAll() {
  const all = [];
  for (let page = 1; page < 10; page++) {
    const res = await fetch(`${STORE}/products.json?limit=250&page=${page}`, { headers: { 'user-agent': 'smylelabs-web-sync' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { products } = await res.json();
    all.push(...products);
    if (products.length < 250) break;
  }
  return all;
}

try {
  const raw = await fetchAll();
  const products = raw.filter((p) => p.images && p.images.length).map((p) => ({
    handle: p.handle,
    title: p.title,
    tags: p.tags || [],
    body: cleanHtml(p.body_html),
    options: (p.options || []).map((o) => o.name),
    variants: p.variants.map((v) => ({ id: v.id, title: v.title, price: v.price, compare: v.compare_at_price, available: v.available })),
    images: p.images.slice(0, 8).map((i) => i.src.split('?')[0])
  }));
  await writeFile(OUT, JSON.stringify(products, null, 1));
  console.log(`[sync] cloned ${products.length} products from ${STORE}`);
} catch (err) {
  const existing = JSON.parse(await readFile(OUT, 'utf8'));
  console.warn(`[sync] could not reach ${STORE} (${err.message}). Using the committed snapshot (${existing.length} products).`);
}
