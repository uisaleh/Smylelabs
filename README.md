# Smyle Labs — storefront redesign (V3 minimal editorial)

Production code for the new smylelabs.com design. Built with **Next.js 14 (App Router)**, plain CSS, no database. Deploys to **Vercel** in one click.

## What's cloned from the live site

| From smylelabs.com | Where it lives |
| --- | --- |
| All retail products: titles, full descriptions, every variant (color/size), prices, stock, variant IDs, photos | `data/products.json` (refreshed automatically, see *Catalog sync*) |
| Menu: Home · Shop · Verify · Wholesale · Warranty · Contact · Account · Cart | `lib/site.js` → `MENU` |
| Contact details, hours, shipping promise, store rating (4.7 / 12,660) | `lib/site.js` → `SITE` |
| Real customer reviews | `lib/site.js` → `REVIEWS` |
| Warranty policy, Verify instructions, Contact copy, Wholesale form fields | `app/warranty`, `app/verify`, `app/contact`, `app/wholesale` |
| Inhaler bundle pricing (Buy 2 save 11%, Buy 3 save 16%) | `lib/site.js` → `INHALER_TIERS` |
| Old URLs (`/collections/all`, `/pages/contact`, `/pages/warranty-claim`, `/pages/product-verify`, `/apps/wpdapp`, `/account/login`) | redirected in `next.config.mjs` |

Product URLs keep the Shopify handles (`/products/<handle>`), so existing links and SEO carry over.

## Conversion features (e-commerce best practices)

| Where | What | Why it sells |
| --- | --- | --- |
| Every page | Rotating offer bar: bundle savings, free shipping, 4.7★ rating, text/WhatsApp support | Offer and trust visible before the first scroll |
| Home | Hero with one clear promise, star rating + review count, primary CTA to the hero product, secondary "Shop all" | Clear value proposition and one obvious next step |
| Home | "As seen on" social proof, perks strip, Bestsellers grid with **Quick add**, bundle block, reviews high on the page | Social proof and fewer clicks to cart |
| Home | Money-back guarantee block (risk reversal) and FAQ that handles objections | Removes purchase anxiety |
| Product pages | Quantity tiers with **Most popular / Best value** tags, live **delivery date estimate**, trust badges under Add to cart, **Frequently bought together** with one-click "Add both" | Anchoring, urgency without fake timers, higher order value |
| Product pages | Reviews moved up, sticky Add to cart on desktop and mobile | Proof at the decision point; the button is always reachable |
| Shop | Quick add on every tile, "Choose color" shortcut, Best-selling sort, in-grid bundle promo tile, trust strip | Shorter path to cart, bundle visibility |
| Cart drawer + cart | **Bundle progress bar** ("Add 1 more Inhaler to save 16%"), one-click **upsells**, direct secure checkout, trust badges, promo code | Higher order value and fewer drop-offs |
| Email capture | Early-access popup (after 20 s or exit intent, once per visitor) | Grows the list for drop announcements |

All claims use the store's real offers (bundle pricing, free shipping, 2–5 day delivery, warranty, money-back guarantee, 12,660 reviews). There are no fake countdowns or fake stock counters.

## How the systems work

- **Catalog sync**: `scripts/sync-shopify.mjs` runs before every build (`prebuild`). It reads `https://smylelabs.com/products.json`, cleans the descriptions and writes `data/products.json`. Every Vercel deploy therefore picks up new products, prices, stock and photos. If the store can't be reached, the committed snapshot is used. Run it locally with `npm run sync`.
- **Merchandising layer**: `lib/meta.json` adds short names, categories, badges, cut-out images and feature bullets per product. Products that appear on the store later and aren't in this file are auto-categorised (`lib/catalog.js`).
- **Hidden listings**: wholesale packs, the UK pen, test and duplicate listings are excluded in `lib/catalog.js` → `EXCLUDE`.
- **Cart**: real cart in the browser (`components/CartProvider.js`, saved in localStorage), with Inhaler bundle savings. **Checkout** sends the shopper to the live, secure Shopify checkout using a cart permalink (`https://smylelabs.com/cart/<variantId>:<qty>,…`), with an optional `?discount=` code.
- **Account**: the login and create-account forms post straight to the store's Shopify customer endpoints.
- **Contact / Wholesale / Warranty forms**: post to `/api/form`. Set the `FORMS_WEBHOOK_URL` environment variable in Vercel (Zapier, Make, Slack, Formspree, n8n…) to receive submissions. Without it, submissions are only logged.
- **Verify**: set `NEXT_PUBLIC_VERIFY_ENDPOINT` to Smyle's verification service (`POST { code }` → `{ valid }`). Until then, the page asks the customer to text or email their code.
- **Age gate** (21+) on first visit, remembered in the browser.
- **SEO**: per-page titles and descriptions, Product JSON-LD with price and stock, `sitemap.xml`, `robots.txt`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy (GitHub → Vercel)

1. Create a new GitHub repository (for example `smylelabs-web`) and push this folder:
   ```bash
   git remote add origin https://github.com/<you>/smylelabs-web.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repository. The framework is detected as Next.js; keep the defaults.
3. Optional environment variables (Project → Settings → Environment Variables):
   - `FORMS_WEBHOOK_URL`: where form submissions go
   - `NEXT_PUBLIC_VERIFY_ENDPOINT`: product code verification API
   - `SHOPIFY_STORE_URL`: defaults to `https://smylelabs.com`
   - `NEXT_PUBLIC_SITE_URL`: the public domain, for the sitemap
4. Deploy. Every push to `main` redeploys and re-syncs the catalog.

## Moving to WooCommerce later

Only two places talk to Shopify: `scripts/sync-shopify.mjs` (catalog in) and `CartProvider.checkoutUrl` + `AccountPage` (checkout and login out). Point the sync script at the WooCommerce Store API (`/wp-json/wc/store/v1/products`), keep the same output shape, and change the checkout URL to WooCommerce's add-to-cart links.

## To confirm with the client

- Team photos on About are stock placeholders (`public/assets/team`). Replace them with real photos.
- Make sure `(805) 660-9342` is on WhatsApp, or change `SITE.whatsapp`.
- The live Contact and Warranty forms don't expose their fields, so the fields here are a best match.
- Product photos load from the Shopify CDN. Copy them to the new host before the Shopify store is closed.
