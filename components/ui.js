'use client';
import Link from 'next/link';
import { useState } from 'react';
import { money, thumb } from '@/lib/catalog';
import { useCart } from '@/components/CartProvider';

export const Chev = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={open ? { transform: 'rotate(180deg)' } : undefined} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);
export const Heart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const stars = (n = 5) => '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n);

/** Accordion list. items: [[question, answer(html or text)], ...] */
export function Accordion({ items, first = 0, plain = false, html = false }) {
  const [open, setOpen] = useState(first);
  return (
    <div>
      {items.map(([q, a], i) => (
        <div className="acc3" key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} style={plain ? { fontSize: 15, letterSpacing: 0, textTransform: 'none', fontWeight: 400 } : undefined}>{q}<Chev open={open === i} /></button>
          {open === i && (html ? <div className="ab3 rich" dangerouslySetInnerHTML={{ __html: a }} /> : <div className="ab3">{a}</div>)}
        </div>
      ))}
    </div>
  );
}

/** Catalog tile with yellow hover, quick add, wishlist heart and badge. */
export function Tile({ p, saved, onSave, delay = 0 }) {
  const cart = useCart();
  const [done, setDone] = useState(false);
  const cut = !!p.cut;
  const avail = p.variants.filter((v) => v.available);
  const many = p.variants.length > 1;
  const quick = (e) => {
    e.preventDefault();
    if (!avail.length) return;
    const v = avail[0];
    cart.add({ variantId: v.id, handle: p.handle, name: p.name, variant: v.title, price: v.price, img: thumb(p, 300), qty: 1 });
    setDone(true); setTimeout(() => setDone(false), 1800);
  };
  return (
    <div className="tl" style={{ animationDelay: delay + 'ms' }}>
      <div className="tl-mw">
        <Link className="tl-img" href={p.href} aria-label={p.name}>
          {p.badge && <span className={'tl-badge' + (/new|best/i.test(p.badge) ? ' y' : '')}>{p.badge}</span>}
          {!p.available && <span className="tl-badge" style={{ top: 'auto', bottom: 10 }}>Sold out</span>}
          <img className={cut ? 'c' : 's'} src={thumb(p, 600)} alt={p.name} loading="lazy" />
        </Link>
        {p.available && (many
          ? <Link className="qa" href={p.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>Choose {p.option ? p.option.toLowerCase() : 'option'} · {p.variants.length}</Link>
          : <button className={'qa' + (done ? ' done' : '')} onClick={quick}>{done ? 'Added ✓' : `Quick add · ${money(p.price)}`}</button>)}
      </div>
      {onSave && <button className={'heart' + (saved ? ' on' : '')} aria-label={'Save ' + p.name} aria-pressed={!!saved} onClick={onSave}><Heart /></button>}
      <Link href={p.href} style={{ textDecoration: 'none' }}><span className="tl-name">{p.name}</span><br /><span className="tl-price">{money(p.price)}</span>{p.reviews > 0 && <><br /><span className="tl-rate">★ {p.rating} ({p.reviews.toLocaleString()})</span></>}{p.variants.length > 1 && <span className="tl-rate"> · {p.variants.length} {p.option ? p.option.toLowerCase() + 's' : 'options'}</span>}</Link>
    </div>
  );
}
