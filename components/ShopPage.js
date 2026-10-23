'use client';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tile } from '@/components/ui';
import { CATEGORIES, COLLECTION_ALIASES, PRODUCTS, inCat } from '@/lib/catalog';

const LOOKS = ['Inhaler', 'Car key', 'Pen', 'Lip balm', 'Tumbler', 'Bag charm', 'Controller', 'Pocket'];
const PRICES = [['any', 'Any price', () => true], ['u20', 'Under $20', (v) => v < 20], ['m', '$20 – $35', (v) => v >= 20 && v <= 35], ['o35', 'Over $35', (v) => v > 35]];
const SORTS = [['featured', 'Best selling'], ['low', 'Price, low to high'], ['high', 'Price, high to low'], ['az', 'A–Z']];

export default function ShopPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const qCat = sp.get('cat');
  const [cat, setCat] = useState('all');
  const [look, setLook] = useState('');
  const [price, setPrice] = useState('any');
  const [sort, setSort] = useState('featured');
  const [stock, setStock] = useState(false);
  const [q, setQ] = useState('');
  const [fOpen, setFOpen] = useState(false);
  const [saved, setSaved] = useState({});

  useEffect(() => { const c = COLLECTION_ALIASES[qCat] || qCat; if (c && CATEGORIES.some((x) => x.id === c)) setCat(c); }, [qCat]);
  useEffect(() => { try { setSaved(JSON.parse(localStorage.getItem('smyle-saved') || '{}')); } catch (e) {} }, []);
  const toggleSave = (h) => setSaved((s) => { const n = { ...s, [h]: !s[h] }; try { localStorage.setItem('smyle-saved', JSON.stringify(n)); } catch (e) {} return n; });

  const pickCat = (c) => { setCat(c); router.replace(c === 'all' ? '/shop' : `/shop?cat=${c}`, { scroll: false }); };
  const pt = PRICES.find((x) => x[0] === price)[2];
  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => inCat(p, cat) && (!look || p.look === look) && pt(p.price) && (!stock || p.available) && (!q || (p.name + ' ' + p.title).toLowerCase().includes(q.toLowerCase())));
    if (sort === 'low') l = l.slice().sort((a, b) => a.price - b.price);
    if (sort === 'high') l = l.slice().sort((a, b) => b.price - a.price);
    if (sort === 'az') l = l.slice().sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [cat, look, price, sort, stock, q]);
  const title = CATEGORIES.find((c) => c.id === cat).name;
  const fCount = (look ? 1 : 0) + (price !== 'any' ? 1 : 0) + (stock ? 1 : 0) + (sort !== 'featured' ? 1 : 0);
  const reset = () => { pickCat('all'); setLook(''); setPrice('any'); setStock(false); setSort('featured'); setQ(''); };

  return (
    <>
      <div className="ct-head">
        <h1 className="up d1">{cat === 'all' ? 'All products' : title}<small>{list.length} products</small></h1>
        <label className="fld" style={{ minWidth: 220, minHeight: 44 }}><span className="xs g">Search</span><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Car key, torch, pen…" aria-label="Search products" /></label>
      </div>
      <div className="seen" style={{ justifyContent: 'flex-start', padding: '10px 32px', borderTop: '1px solid #E7E7E7' }}><span>★★★★★ <b style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>4.7 from 12,660 reviews</b></span><span>✓ Free shipping, 2–5 days</span><span>✓ Money-back guarantee</span><span>✓ Secure checkout</span></div>
      <div className="ct-bar">
        <div className="chips3" role="tablist" aria-label="Category">
          {CATEGORIES.map((c) => <button key={c.id} className={cat === c.id ? 'on' : ''} role="tab" aria-selected={cat === c.id} onClick={() => pickCat(c.id)}>[{c.name}]</button>)}
        </div>
        <button onClick={() => setFOpen(true)} style={{ background: 'none', border: 0, cursor: 'pointer', font: '400 12px Geist,sans-serif', display: 'flex', gap: 8, alignItems: 'center', minHeight: 36, flex: 'none' }}>Filters {fCount ? `(${fCount})` : ''}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg></button>
      </div>
      <div className="ct-grid">
        {list.map((p, i) => (
          <Fragment key={p.handle}>
            <Tile p={p} delay={Math.min(i, 12) * 40} saved={saved[p.handle]} onSave={() => toggleSave(p.handle)} />
            {i === 2 && !q && (cat === 'all' || cat === 'discreet' || cat === 'batteries') && (
              <Link className="promo-tile" href="/products/inhaler-cart-battery"><span className="br" style={{ color: '#131313' }}>[bundle &amp; save]</span><img src="/assets/inhaler/blush.webp" alt="" /><div><h3>Buy 3 Inhalers,<br />save 16%</h3><p className="sm" style={{ marginTop: 8 }}>Mix any of the 5 colors · Free shipping</p><span className="bk" style={{ marginTop: 14 }}>Build your bundle</span></div></Link>
            )}
          </Fragment>
        ))}
        {list.length === 0 && <p className="sm g" style={{ gridColumn: '1/-1', padding: '40px 0' }}>No products match these filters. <button className="ul" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit' }} onClick={reset}>Clear filters</button></p>}
      </div>
      {fOpen && (
        <>
          <div className="scrim3" onClick={() => setFOpen(false)} />
          <aside className="drawer3" aria-label="Filters">
            <div className="dh">Filters<button aria-label="Close filters" onClick={() => setFOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer', width: 40, height: 40, fontSize: 20 }}>×</button></div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <div className="fgrp"><h4>Sort by</h4>{SORTS.map(([id, n]) => <button key={id} className={'fo' + (sort === id ? ' on' : '')} onClick={() => setSort(id)}><span className="bx3" />{n}</button>)}</div>
              <div className="fgrp"><h4>Looks like</h4>{LOOKS.map((l) => <button key={l} className={'fo' + (look === l ? ' on' : '')} onClick={() => setLook(look === l ? '' : l)}><span className="bx3" />{l}<em>{PRODUCTS.filter((p) => p.look === l).length}</em></button>)}</div>
              <div className="fgrp"><h4>Price</h4>{PRICES.map(([id, n]) => <button key={id} className={'fo' + (price === id ? ' on' : '')} onClick={() => setPrice(id)}><span className="bx3" />{n}</button>)}</div>
              <div className="fgrp"><h4>Availability</h4><button className={'fo' + (stock ? ' on' : '')} onClick={() => setStock(!stock)}><span className="bx3" />In stock only</button></div>
            </div>
            <div style={{ padding: '18px 24px', display: 'flex', gap: 8 }}><button className="bo" style={{ flex: 1 }} onClick={reset}>Clear</button><button className="bk" style={{ flex: 2 }} onClick={() => setFOpen(false)}>Show {list.length} products</button></div>
          </aside>
        </>
      )}
    </>
  );
}
