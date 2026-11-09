'use client';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Btn, PCard, PageHero } from '@/components/v5';
import { CATEGORIES, COLLECTION_ALIASES, PRODUCTS, inCat } from '@/lib/catalog';

const LOOKS = ['Inhaler', 'Car key', 'Pen', 'Lip balm', 'Tumbler', 'Bag charm', 'Controller', 'Pocket'];
const PRICES = [['any', 'Any price', () => true], ['u20', 'Under $20', (v) => v < 20], ['m', '$20 – $35', (v) => v >= 20 && v <= 35], ['o35', 'Over $35', (v) => v > 35]];
const SORTS = [['featured', 'Best selling'], ['rated', 'Most reviewed'], ['low', 'Price, low to high'], ['high', 'Price, high to low'], ['az', 'A–Z']];

export default function ShopPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const qCat = sp.get('cat');
  const qLook = sp.get('look');
  const [cat, setCat] = useState('all');
  const [look, setLook] = useState('');
  const [price, setPrice] = useState('any');
  const [sort, setSort] = useState('featured');
  const [stock, setStock] = useState(false);
  const [q, setQ] = useState('');
  const [fOpen, setFOpen] = useState(false);

  useEffect(() => { const c = COLLECTION_ALIASES[qCat] || qCat; if (c && CATEGORIES.some((x) => x.id === c)) setCat(c); }, [qCat]);
  useEffect(() => { if (qLook) { const l = LOOKS.find((x) => x.toLowerCase() === qLook.toLowerCase()); if (l) setLook(l); } }, [qLook]);

  const pickCat = (c) => { setCat(c); router.replace(c === 'all' ? '/shop' : `/shop?cat=${c}`, { scroll: false }); };
  const pt = PRICES.find((x) => x[0] === price)[2];
  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => inCat(p, cat) && (!look || p.look === look) && pt(p.price) && (!stock || p.available) && (!q || (p.name + ' ' + p.title).toLowerCase().includes(q.toLowerCase())));
    if (sort === 'rated') l = l.slice().sort((a, b) => b.reviews - a.reviews);
    if (sort === 'low') l = l.slice().sort((a, b) => a.price - b.price);
    if (sort === 'high') l = l.slice().sort((a, b) => b.price - a.price);
    if (sort === 'az') l = l.slice().sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [cat, look, price, sort, stock, q]);
  const title = look ? `Looks like ${/^[aeiou]/i.test(look) ? "an" : "a"} ${look.toLowerCase()}` : cat === 'all' ? 'Shop all products' : CATEGORIES.find((c) => c.id === cat).name;
  const fCount = (look ? 1 : 0) + (price !== 'any' ? 1 : 0) + (stock ? 1 : 0) + (sort !== 'featured' ? 1 : 0);
  const reset = () => { pickCat('all'); setLook(''); setPrice('any'); setStock(false); setSort('featured'); setQ(''); };

  return (
    <>
      <PageHero small tag={`${PRODUCTS.length} designs · free shipping`} title={title} text="510 batteries that don’t look like batteries, plus torches and accessories. Every order ships free from California in a plain box.">
        <div className="v-glass" style={{ marginTop: 6 }}>
          <div><b>4.7★</b><span>12,660 reviews</span></div>
          <div><b>2–5 days</b><span>Free US shipping</span></div>
          <div><b>Save 21%</b><span>With bundles</span></div>
          <div><b>Warranty</b><span>On every battery</span></div>
        </div>
      </PageHero>

      <div className="v-wrap">
        <div className="v-tool">
          <div className="v-chipsx" role="tablist" aria-label="Category">
            {CATEGORIES.map((c) => <button key={c.id} className={cat === c.id ? 'on' : ''} role="tab" aria-selected={cat === c.id} onClick={() => pickCat(c.id)}>{c.name}</button>)}
          </div>
          <div className="v-tool-r">
            <label className="v-search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search car key, torch, pen…" aria-label="Search products" /></label>
            <button className="v-fbtn" onClick={() => setFOpen(true)}>Filter &amp; sort{fCount ? ` (${fCount})` : ''}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg></button>
          </div>
        </div>
        <p className="v-count">{list.length} products{look && <> · <button onClick={() => setLook('')}>Clear “{look}” ×</button></>}</p>

        <div className="v-grid4" style={{ paddingBottom: 110 }}>
          {list.map((p, i) => (
            <Fragment key={p.handle}>
              <PCard p={p} delay={(i % 4) * 70} />
              {i === 2 && !q && !look && (cat === 'all' || cat === 'discreet' || cat === 'batteries') && (
                <Link className="v-promo" href="/products/inhaler-cart-battery" data-r style={{ '--d': '210ms' }}>
                  <span className="v-tag">Bundle &amp; save</span>
                  <img src="/assets/inhaler/blush.webp" alt="" />
                  <div><h3>Buy 3 Inhalers,<br />save 16%.</h3><p style={{ fontSize: 13.5, margin: '0 0 18px', color: 'rgba(19,19,19,.72)' }}>Mix any of the 5 colors · free shipping</p><span className="v-btn k"><span>Build your bundle</span><span className="ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9" /></svg><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9" /></svg></span></span></div>
                </Link>
              )}
            </Fragment>
          ))}
          {list.length === 0 && <div style={{ gridColumn: '1/-1', padding: '60px 0', textAlign: 'center' }}><p className="v-p" style={{ marginBottom: 18 }}>No products match these filters.</p><Btn onClick={reset} kind="k">Clear filters</Btn></div>}
        </div>
      </div>

      {fOpen && (
        <>
          <div className="scrim3" onClick={() => setFOpen(false)} />
          <aside className="drawer3" aria-label="Filters">
            <div className="dh">Filter &amp; sort<button aria-label="Close filters" onClick={() => setFOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer', width: 40, height: 40, fontSize: 20 }}>×</button></div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <div className="fgrp"><h4>Sort by</h4>{SORTS.map(([id, n]) => <button key={id} className={'fo' + (sort === id ? ' on' : '')} onClick={() => setSort(id)}><span className="bx3" />{n}</button>)}</div>
              <div className="fgrp"><h4>Looks like</h4>{LOOKS.map((l) => <button key={l} className={'fo' + (look === l ? ' on' : '')} onClick={() => setLook(look === l ? '' : l)}><span className="bx3" />{l}<em>{PRODUCTS.filter((p) => p.look === l).length}</em></button>)}</div>
              <div className="fgrp"><h4>Price</h4>{PRICES.map(([id, n]) => <button key={id} className={'fo' + (price === id ? ' on' : '')} onClick={() => setPrice(id)}><span className="bx3" />{n}</button>)}</div>
              <div className="fgrp"><h4>Availability</h4><button className={'fo' + (stock ? ' on' : '')} onClick={() => setStock(!stock)}><span className="bx3" />In stock only</button></div>
            </div>
            <div style={{ padding: '18px 24px', display: 'flex', gap: 8 }}><button className="bo" style={{ flex: 1 }} onClick={reset}>Clear</button><Btn kind="k" onClick={() => setFOpen(false)} className="full" style={{ flex: 2 }}>Show {list.length} products</Btn></div>
          </aside>
        </>
      )}
    </>
  );
}
