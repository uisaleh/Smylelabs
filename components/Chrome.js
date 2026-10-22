'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { MENU, SITE } from '@/lib/site';
import { CATEGORIES, money } from '@/lib/catalog';

const Burger = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h18M3 12h18M9 16h12" /></svg>
);
export const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" /><path d="M9 9.5c.3 2 2.2 4.1 4.5 4.6l1.2-1.1 1.6.8" /></svg>
);

export function Header() {
  const path = usePathname();
  const cart = useCart();
  const [m, setM] = useState(false);
  useEffect(() => setM(false), [path]);
  const active = (href) => (href === '/' ? path === '/' : path.startsWith(href) || (href === '/shop' && path.startsWith('/products')));
  return (
    <>
      <header className="hd3">
        <Link className="logo3" href="/" aria-label="Smyle Labs home"><img src="/assets/brand/logo-black.webp" alt="Smyle Labs" /></Link>
        <nav className="nav3" aria-label="Main">
          {MENU.map((l) => (
            <Link key={l.href} href={l.href} className={active(l.href) ? 'on' : undefined} aria-current={active(l.href) ? 'page' : undefined}>{l.label}</Link>
          ))}
          <button className="cart3" onClick={() => cart.setOpen(true)}>Cart [{cart.count}]</button>
        </nav>
        <div className="mhd">
          <button className="cart3" style={{ fontSize: 13, fontWeight: 600, background: 'none', border: 0, cursor: 'pointer', minHeight: 44 }} onClick={() => cart.setOpen(true)}>Cart [{cart.count}]</button>
          <button className="burger" aria-label="Open menu" onClick={() => setM(true)}><Burger /></button>
        </div>
      </header>
      {m && (
        <div className="mnav3" role="dialog" aria-label="Menu">
          <div className="top"><img src="/assets/brand/logo-black.webp" alt="Smyle Labs" style={{ height: 24, width: 'auto' }} /><button className="bk" style={{ height: 36, padding: '0 14px' }} onClick={() => setM(false)}>Close</button></div>
          <nav aria-label="Mobile">
            {MENU.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <Link href="/cart">Cart [{cart.count}]</Link>
          </nav>
          <nav className="mm-site" aria-label="Categories" style={{ padding: '0 14px' }}>
            {CATEGORIES.slice(1).map((c) => <Link key={c.id} href={`/shop?cat=${c.id}`}>{c.name}</Link>)}
          </nav>
          <div className="foot">Text or WhatsApp {SITE.phone} · Mon–Fri, 10 AM–6 PM PT</div>
        </div>
      )}
      <CartDrawer />
    </>
  );
}

function CartDrawer() {
  const cart = useCart();
  if (!cart.open) return null;
  return (
    <>
      <div className="scrim3" onClick={() => cart.setOpen(false)} />
      <aside className="drawer3" aria-label="Cart">
        <div className="dh">Your cart ({cart.count})<button aria-label="Close cart" onClick={() => cart.setOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer', width: 40, height: 40, fontSize: 20 }}>×</button></div>
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px' }}>
          {cart.items.length === 0 && <p className="sm g" style={{ padding: '24px 0' }}>Your cart is empty.</p>}
          {cart.items.map((it) => (
            <div key={it.variantId} className="li3" style={{ borderBottom: '1px solid #E7E7E7', gridTemplateColumns: '72px 1fr auto' }}>
              <div className="im" style={{ width: 72, height: 84 }}><img src={it.img} alt="" /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 14 }}>{it.name}</span>{it.variant && <span className="xs g">{it.variant}</span>}
                <div className="qty"><button onClick={() => cart.setQty(it.variantId, it.qty - 1)} aria-label="Fewer">−</button><span>{it.qty}</span><button onClick={() => cart.setQty(it.variantId, it.qty + 1)} aria-label="More">+</button></div></div>
              <div className="rt"><button onClick={() => cart.remove(it.variantId)} style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: 11, color: '#797979', textDecoration: 'underline' }}>Remove</button><b style={{ fontSize: 15, fontWeight: 400 }}>{money(it.price * it.qty)}</b></div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #E7E7E7', display: 'grid', gap: 6 }}>
          {cart.savings > 0 && <div className="tot3"><span>Bundle savings</span><span>−{money(cart.savings)}</span></div>}
          <div className="tot3 big" style={{ marginTop: 0, borderTop: 0, paddingTop: 0 }}><span>Total</span><span>{money(cart.total)}</span></div>
          <Link className="bk full" href="/cart" onClick={() => cart.setOpen(false)}>View cart &amp; checkout</Link>
          <span className="xs g">{SITE.shipping}</span>
        </div>
      </aside>
    </>
  );
}

export function Footer() {
  return (
    <footer className="ft3">
      <div className="ft3-top">
        <div>
          <h2 style={{ fontSize: 'clamp(26px,2.6vw,36px)', fontWeight: 400, letterSpacing: '-.02em', lineHeight: 1.05 }}>Get first dibs on drops,<br />discounts, and gifts.</h2>
          <form className="nl" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); alert('Thanks! You are on the list.'); }}>
            <label htmlFor="nl3" style={{ position: 'absolute', left: -9999 }}>Email address</label>
            <input id="nl3" type="email" required placeholder="Email address" />
            <button className="bk" type="submit">Subscribe</button>
          </form>
          <p className="xs g" style={{ marginTop: 22 }}>Questions? Real people reply fast.</p>
          <a className="wa3" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><i><WaIcon /></i>Chat on WhatsApp</a>
        </div>
        <div className="col"><h4>About us</h4><Link href="/about">Our story</Link><Link href="/wholesale">Wholesale</Link><Link href="/shop">Shop all</Link></div>
        <div className="col"><h4>Catalog</h4>{CATEGORIES.slice(1, 7).map((c) => <Link key={c.id} href={`/shop?cat=${c.id}`}>{c.name}</Link>)}</div>
        <div className="col"><h4>For customers</h4><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a><Link href="/verify">Verify product</Link><Link href="/warranty">Warranty claim</Link><Link href="/contact">Contact</Link><Link href="/account">Account</Link></div>
      </div>
      <div className="ft3-logo"><img src="/assets/brand/logo-black.webp" alt="" /></div>
      <div className="ft3-bot"><span>© {new Date().getFullYear()} Smyle Labs · 21+ only · For aromatherapy use</span><span>Call or text {SITE.phone} · {SITE.email}</span></div>
    </footer>
  );
}
