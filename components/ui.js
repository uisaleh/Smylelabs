'use client';
import Link from 'next/link';
import { useState } from 'react';
import { money, thumb } from '@/lib/catalog';

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

/** Catalog tile with yellow hover, wishlist heart and badge. */
export function Tile({ p, saved, onSave, delay = 0 }) {
  const cut = !!p.cut;
  return (
    <div className="tl" style={{ animationDelay: delay + 'ms' }}>
      <Link className="tl-img" href={p.href} aria-label={p.name}>
        {p.badge && <span className={'tl-badge' + (/new|best/i.test(p.badge) ? ' y' : '')}>{p.badge}</span>}
        {!p.available && <span className="tl-badge" style={{ top: 'auto', bottom: 10 }}>Sold out</span>}
        <img className={cut ? 'c' : 's'} src={thumb(p, 600)} alt={p.name} loading="lazy" />
      </Link>
      {onSave && <button className={'heart' + (saved ? ' on' : '')} aria-label={'Save ' + p.name} aria-pressed={!!saved} onClick={onSave}><Heart /></button>}
      <Link href={p.href} style={{ textDecoration: 'none' }}><span className="tl-name">{p.name}</span><br /><span className="tl-price">{money(p.price)}</span></Link>
    </div>
  );
}
