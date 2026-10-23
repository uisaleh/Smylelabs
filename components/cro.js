'use client';
// Conversion building blocks used across the store.
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { byHandle, money, thumb, FILTERS, INHALER } from '@/lib/catalog';
import { SITE } from '@/lib/site';

const ANN = [
  <>Buy 2 Inhalers, <b>save 11%</b> · Buy 3, <b>save 16%</b></>,
  <><b>Free shipping</b> from California · arrives in 2–5 business days</>,
  <>Rated <b>4.7★</b> by 12,660 customers</>,
  <>Questions? Text or WhatsApp <b>{SITE.phone}</b></>
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % ANN.length), 4500); return () => clearInterval(t); }, []);
  return (
    <div className="ann" role="region" aria-label="Offers">
      <button style={{ left: 4 }} aria-label="Previous offer" onClick={() => setI((i + ANN.length - 1) % ANN.length)}>‹</button>
      <span key={i}>{ANN[i]}</span>
      <button style={{ right: 4 }} aria-label="Next offer" onClick={() => setI((i + 1) % ANN.length)}>›</button>
    </div>
  );
}

const Ico = ({ d }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{d}</svg>;
export const ICONS = {
  truck: <Ico d={<><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>} />,
  shield: <Ico d={<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3zM9 12l2 2 4-4" />} />,
  lock: <Ico d={<><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>} />,
  chat: <Ico d={<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" />} />,
  refresh: <Ico d={<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />} />
};

/** The four reassurance points that sit under every Add to cart. */
export function TrustBadges() {
  return (
    <div className="trust4" aria-label="Why buy from Smyle Labs">
      <div>{ICONS.truck}<span><b>Free shipping</b><br />2–5 business days</span></div>
      <div>{ICONS.refresh}<span><b>Money-back guarantee</b><br />We make it right</span></div>
      <div>{ICONS.shield}<span><b>Warranty</b><br />on manufacturer defects</span></div>
      <div>{ICONS.lock}<span><b>Secure checkout</b><br />Encrypted payment</span></div>
    </div>
  );
}

function addBusinessDays(d, n) { const x = new Date(d); while (n > 0) { x.setDate(x.getDate() + 1); if (x.getDay() !== 0 && x.getDay() !== 6) n--; } return x; }
const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

/** "In stock · Get it Tue, Oct 27 – Fri, Oct 30" (from the store's 2–5 business day promise). */
export function DeliveryEstimate({ available = true }) {
  const [txt, setTxt] = useState('');
  useEffect(() => { const now = new Date(); setTxt(`${fmt(addBusinessDays(now, 2))} – ${fmt(addBusinessDays(now, 5))}`); }, []);
  if (!available) return <div className="ship4" style={{ borderColor: '#E7E7E7' }}><i style={{ background: '#B5B5B5', boxShadow: 'none' }} />Sold out right now. Text {SITE.phone} to hear when it’s back.</div>;
  return <div className="ship4"><i /><span><b style={{ fontWeight: 600 }}>In stock</b> · Free delivery {txt ? <>by <b style={{ fontWeight: 600 }}>{txt}</b></> : 'in 2–5 business days'}</span></div>;
}

/** Sticky bar that appears on desktop once the main Add to cart scrolls out of view. */
export function useStickyWatch() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, show];
}
export function StickyATC({ show, img, name, price, label, onAdd, disabled }) {
  if (!show) return null;
  return (
    <div className="satc" role="region" aria-label="Quick add to cart">
      <img src={img} alt="" /><span className="nm">{name} <span className="g">· {price}</span></span>
      <span className="sm g">★★★★★ 4.7</span>
      <button className="bk" onClick={onAdd} disabled={disabled}>{label}</button>
    </div>
  );
}

/** Bundle progress + savings in the cart (Inhaler tiers). */
export function BundleProgress() {
  const cart = useCart();
  const n = cart.inhalerQty;
  if (n === 0) return null;
  const pct = Math.min(100, (n / 3) * 100);
  const msg = n === 1 ? <>Add <b>1 more Inhaler</b> to save 11%</> : n === 2 ? <>Add <b>1 more Inhaler</b> to save 16%</> : <><b>Best price unlocked:</b> 16% off your Inhalers</>;
  return (
    <div className="prog">
      <span>{msg}</span>
      <div className="bar"><i style={{ width: pct + '%' }} /></div>
      <div className="steps"><span>1 · $36.99</span><span>2 · save 11%</span><span>3 · save 16%</span></div>
    </div>
  );
}

/** One-click add-ons shown in the cart drawer and cart page. */
export function Upsells({ max = 2 }) {
  const cart = useCart();
  const inCart = new Set(cart.items.map((x) => x.handle));
  const picks = [];
  if (inCart.has(INHALER) && !inCart.has(FILTERS)) picks.push(FILTERS);
  if (!inCart.has(INHALER)) picks.push(INHALER);
  picks.push('mini-plug-510-cart-battery', 'lip-balm-penjamin-by-smyle-labs', 'cart-pen-replacement-tip');
  const list = picks.map(byHandle).filter((p) => p && p.available && !inCart.has(p.handle)).slice(0, max);
  if (!list.length) return null;
  return (
    <div className="up4">
      <h4>Complete your setup</h4>
      {list.map((p) => {
        const v = p.variants.find((x) => x.available) || p.variants[0];
        return (
          <div className="up4-row" key={p.handle}>
            <div className="im"><img src={thumb(p, 200)} alt="" /></div>
            <div style={{ fontSize: 13 }}>{p.name}<br /><span className="xs g">{money(v.price)}{v.title ? ' · ' + v.title : ''}</span></div>
            <button onClick={() => cart.add({ variantId: v.id, handle: p.handle, name: p.name, variant: v.title, price: v.price, img: thumb(p, 300), qty: 1 })}>+ Add</button>
          </div>
        );
      })}
    </div>
  );
}

/** Email capture: shows once, 20s after the age gate, or when the cursor leaves the page. */
export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let seen = false; try { seen = !!localStorage.getItem('smyle-pop'); } catch (e) {}
    if (seen) return;
    const mark = () => { try { localStorage.setItem('smyle-pop', '1'); } catch (e) {} };
    const show = () => { try { if (!localStorage.getItem('smyle-21')) return; } catch (e) {} setOpen(true); mark(); cleanup(); };
    const t = setTimeout(show, 20000);
    const onLeave = (e) => { if (e.clientY <= 0) show(); };
    document.addEventListener('mouseout', onLeave);
    function cleanup() { clearTimeout(t); document.removeEventListener('mouseout', onLeave); }
    return cleanup;
  }, []);
  if (!open) return null;
  async function submit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    fetch('/api/form', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ form: 'newsletter', fields: { email } }) }).catch(() => {});
    setDone(true);
  }
  return (
    <div className="pop4" role="dialog" aria-modal="true" aria-label="Join the list" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="pop4-box">
        <button className="x" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        <div className="ph"><img src="/assets/inhaler/teal.webp" alt="" /></div>
        <div className="bd">
          {done ? (<><p className="br">[you’re in]</p><h2 className="up d2">Welcome to the crew</h2><p className="sm g">Watch your inbox for first dibs on drops, discounts and gifts.</p><button className="bk" onClick={() => setOpen(false)}>Keep shopping</button></>) : (<>
            <p className="br">[members get more]</p>
            <h2 className="up d2">First dibs on drops &amp; deals</h2>
            <p className="sm g">Limited editions sell out fast. Join the list for early access, member-only discounts and gift drops.</p>
            <form onSubmit={submit} className="form3">
              <div className="fld"><label htmlFor="pe">Email</label><input id="pe" name="email" type="email" required placeholder="you@email.com" /></div>
              <button className="bk full" type="submit">Get early access</button>
            </form>
            <button className="sm g" style={{ background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setOpen(false)}>No thanks</button>
          </>)}
        </div>
      </div>
    </div>
  );
}
