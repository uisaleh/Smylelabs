'use client';
// Product page pieces shared by the Inhaler page and the 45 other product pages.
import { useEffect, useRef, useState } from 'react';
import { ICONS } from '@/components/cro';
import { SITE } from '@/lib/site';
import { Btn } from '@/components/v5';

function addBD(d, n) { const x = new Date(d); while (n > 0) { x.setDate(x.getDate() + 1); if (x.getDay() !== 0 && x.getDay() !== 6) n--; } return x; }
const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

export function Ship({ available = true }) {
  const [txt, setTxt] = useState('');
  useEffect(() => { const n = new Date(); setTxt(`${fmt(addBD(n, 2))} – ${fmt(addBD(n, 5))}`); }, []);
  if (!available) return <div className="v-ship"><i style={{ background: '#B5B5B5', animation: 'none', boxShadow: 'none' }} />Sold out right now. Text {SITE.phone} and we’ll tell you when it’s back.</div>;
  return <div className="v-ship"><i /><span><b style={{ fontWeight: 600 }}>In stock</b> · Free delivery {txt ? <>by <b style={{ fontWeight: 600 }}>{txt}</b></> : 'in 2–5 business days'}</span></div>;
}

export function Trust({ returns60 }) {
  return (
    <>
      <div className="v-trust" aria-label="Why buy from Smyle Labs">
        <div>{ICONS.truck}<span><b>Free shipping</b><br /><span>2–5 business days</span></span></div>
        <div>{ICONS.refresh}<span><b>{returns60 ? '60-day easy returns' : 'Money-back guarantee'}</b><br /><span>{returns60 ? 'Free US shipping too' : 'We make it right'}</span></span></div>
        <div>{ICONS.shield}<span><b>Warranty</b><br /><span>Manufacturer defects</span></span></div>
        <div>{ICONS.lock}<span><b>Secure checkout</b><br /><span>Encrypted payment</span></span></div>
      </div>
      <div className="v-pay"><span>Pay with</span><span className="c">VISA</span><span className="c">Mastercard</span><span className="c">AMEX</span><span className="c">Apple Pay</span><span className="c">Shop Pay</span></div>
    </>
  );
}

/** Watches the main Add to cart; the floating bar slides in once it scrolls away. */
export function useWatch() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, show];
}

/** Floating add-to-cart bar (desktop + mobile). */
export function FloatBar({ show, img, name, sub, label, onAdd, disabled }) {
  return (
    <div className={'v-satc' + (show ? ' on' : '')} role="region" aria-label="Quick add to cart" aria-hidden={!show}>
      <img src={img} alt="" />
      <div className="nm">{name}<span>{sub}</span></div>
      <Btn onClick={onAdd} disabled={disabled} tabIndex={show ? 0 : -1}>{label}</Btn>
    </div>
  );
}

export function Details({ items }) {
  return (
    <div className="v-det">
      {items.map(([t, html], i) => (
        <details key={t} open={i === 0 ? undefined : undefined}>
          <summary>{t}</summary>
          <div className="rich" dangerouslySetInnerHTML={{ __html: html }} />
        </details>
      ))}
    </div>
  );
}
