// Catalog: live Shopify data (data/products.json, refreshed by scripts/sync-shopify.mjs)
// merged with the redesign's merchandising layer (lib/meta.json: short names,
// categories, badges, cut-out images, curated feature bullets).
import raw from '@/data/products.json';
import META from '@/lib/meta.json';

export const INHALER = 'inhaler-cart-battery';
export const FILTERS = 'inhaler-3-pack-replaceable-filters';

// Listings that exist on the live store but are not shown in the retail shop.
const EXCLUDE = new Set([
  'testproduct-donotbuy',
  'cup-cart-510-battery-by-mrs-puff-copy',
  'mini-plug-510-cart-battery-wholesale-20-pack',
  'refillable-raygun-mini-torch-lighter-with-lights-sound-wholesale',
  'penjamin-cart-pen-by-smyle-labs-uk',
  'lip-balm-cart-pen',
  'black-flowers-purse-cart-battery'
]);

export const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'batteries', name: 'Cart batteries' },
  { id: 'discreet', name: 'Discreet' },
  { id: 'novelty', name: 'Novelty' },
  { id: 'torches', name: 'Torches' },
  { id: 'limited', name: 'Limited' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'aroma', name: 'Aromatherapy' },
  { id: 'apparel', name: 'Apparel' }
];
// Old Shopify collection handles -> redesign categories (for /collections/... redirects).
export const COLLECTION_ALIASES = { 'cart-batteries': 'batteries', 'limited-edition': 'limited', 'discreet': 'discreet', 'novelty': 'novelty', 'torches': 'torches', 'all': 'all' };

function guessCats(p) {
  const t = (p.title + ' ' + p.tags.join(' ')).toLowerCase();
  const c = [];
  if (/torch/.test(t)) c.push('torches');
  else if (/battery|penjamin/.test(t)) c.push('batteries', 'novelty');
  else if (/shirt|hat|clothing|hoodie/.test(t)) c.push('apparel');
  else if (/aroma|oil/.test(t)) c.push('aroma');
  else c.push('accessories');
  if (/limited|seasonal|drop/.test(t)) c.push('limited');
  return c;
}
function shortName(title) {
  return title.replace(/^NEW!\s*/i, '').replace(/\s*(by Smyle(™|®)? Labs|By Smyle™ Labs)\s*/gi, ' ').replace(/\s*\((Limited Edition|Seasonal Drop)\)/gi, '').replace(/\s+/g, ' ').trim();
}

export const money = (v) => '$' + Number(v).toFixed(2);

function normalize(p) {
  const m = META[p.handle] || {};
  const variants = p.variants.map((v) => ({ ...v, price: Number(v.price), compare: v.compare ? Number(v.compare) : null, title: v.title === 'Default Title' ? '' : v.title }));
  const prices = variants.map((v) => v.price);
  const available = variants.some((v) => v.available);
  const isNew = /^new!/i.test(p.title);
  return {
    handle: p.handle,
    title: p.title,
    name: m.name || shortName(p.title),
    cats: m.cats || guessCats(p),
    badge: m.badge || (isNew ? 'New' : /limited/i.test(p.title) ? 'Limited' : ''),
    cut: m.cut || '',
    look: m.look || '',
    intro: m.intro || '',
    features: m.features || [],
    body: p.body,
    option: p.options[0] && p.options[0] !== 'Title' ? p.options[0] : '',
    variants,
    images: p.images,
    price: Math.min(...prices),
    available,
    href: '/products/' + p.handle,
    rating: p.rating || 0,
    reviews: p.reviews || 0,
    tiers: p.tier2 && p.tier3 ? [p.tier2, p.tier3] : null,
    returns60: !!p.returns60
  };
}

export const PRODUCTS = raw.filter((p) => !EXCLUDE.has(p.handle)).map(normalize)
  // Inhaler first, then everything else in store order.
  .sort((a, b) => (a.handle === INHALER ? -1 : b.handle === INHALER ? 1 : 0));

export const byHandle = (h) => PRODUCTS.find((p) => p.handle === h);
export const inCat = (p, c) => c === 'all' || p.cats.includes(c);
export const catCount = (c) => PRODUCTS.filter((p) => inCat(p, c)).length;

// Shopify CDN resize helper (works for png/jpg/webp/gif on cdn.shopify.com).
export const img = (src, w = 800) => (src && src.includes('cdn.shopify.com') ? `${src}?width=${w}` : src);
export const thumb = (p, w = 600) => p.cut || img(p.images[0], w);

export function related(p, n = 3) {
  const cat = p.cats[0];
  let pool = PRODUCTS.filter((x) => x.handle !== p.handle && x.handle !== INHALER && x.cats.includes(cat));
  if (pool.length < n) pool = pool.concat(PRODUCTS.filter((x) => x.handle !== p.handle && x.handle !== INHALER && !pool.includes(x) && x.cats.includes('batteries')));
  return pool.slice(0, n);
}

/** Quantity-break price: n units with the product's live bundle discount (2 = tier2 %, 3+ = tier3 %). */
export function tierTotal(p, n, unit) {
  const pct = !p || !p.tiers || n < 2 ? 0 : n === 2 ? p.tiers[0] : p.tiers[1];
  return Math.round(unit * n * (1 - pct / 100) * 100) / 100;
}
