'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { MENU, SITE } from '@/lib/site';
import { CATEGORIES, money } from '@/lib/catalog';
import { AnnouncementBar, BundleProgress, Upsells, EmailPopup } from '@/components/cro';
import { Arrow, Btn } from '@/components/v5';

export const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" /><path d="M9 9.5c.3 2 2.2 4.1 4.5 4.6l1.2-1.1 1.6.8" /></svg>
);
const UserIc = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>;
const Burger = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>;

// Pages that open with the dark framed hero: the header floats over it until you scroll.
const DARK_TOP = ['/', '/shop', '/about', '/verify', '/wholesale', '/warranty', '/contact', '/account'];
const NAV = MENU.filter((l) => l.href !== '/account');

export function Header() {
  const path = usePathname();
  const cart = useCart();
  const [m, setM] = useState(false);
  useEffect(() => setM(false), [path]);
  useEffect(() => { document.body.style.overflow = m ? 'hidden' : ''; }, [m]);
  const active = (href) => (href === '/' ? path === '/' : path.startsWith(href) || (href === '/shop' && path.startsWith('/products')));
  const ov = DARK_TOP.includes(path);
  return (
    <>
      <AnnouncementBar />
      <header className={'v-hd' + (ov ? ' ov' : '')}>
        <Link className="lg" href="/" aria-label="Smyle Labs home"><img className="b" src="/assets/brand/logo-black.webp" alt="Smyle Labs" /><img className="w" src="/assets/brand/logo-white.webp" alt="" /></Link>
        <nav className="v-nav" aria-label="Main">
          {NAV.map((l) => <Link key={l.href} href={l.href} className={active(l.href) ? 'on' : undefined} aria-current={active(l.href) ? 'page' : undefined}>{l.label}</Link>)}
        </nav>
        <div className="v-hd-r">
          <Link className="v-hd-ic acc" href="/account" aria-label="Account"><UserIc /></Link>
          <button className="v-btn v-cartb" onClick={() => cart.setOpen(true)} aria-label={`Cart, ${cart.count} items`}><span>Cart</span><span className="ic"><b>{cart.count}</b></span></button>
          <button className="v-hd-ic v-burger" aria-label="Open menu" onClick={() => setM(true)}><Burger /></button>
        </div>
      </header>
      {m && (
        <div className="v-mnav" role="dialog" aria-label="Menu">
          <div className="top"><img src="/assets/brand/logo-white.webp" alt="Smyle Labs" style={{ height: 26, width: 'auto' }} /><button className="v-hd-ic" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)', fontSize: 22 }} onClick={() => setM(false)} aria-label="Close menu">×</button></div>
          <nav aria-label="Mobile">
            {MENU.map((l, i) => <Link key={l.href} href={l.href} style={{ animationDelay: i * 50 + 'ms' }}>{l.label}<Arrow /></Link>)}
          </nav>
          <div className="cats">{CATEGORIES.slice(1).map((c) => <Link key={c.id} href={`/shop?cat=${c.id}`}>{c.name}</Link>)}</div>
          <div style={{ marginTop: 24 }}><Btn href="/products/inhaler-cart-battery" full>Shop the Inhaler · Buy 3 save 16%</Btn></div>
          <div className="foot">Text or WhatsApp {SITE.phone} · Mon–Fri, 10 AM–6 PM PT</div>
        </div>
      )}
      <CartDrawer />
      <EmailPopup />
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
        <BundleProgress />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ padding: '8px 24px' }}>
            {cart.items.length === 0 && <div style={{ padding: '24px 0', display: 'grid', gap: 12 }}><p className="sm g">Your cart is empty.</p><Btn href="/shop" kind="k" full onClick={() => cart.setOpen(false)}>Shop bestsellers</Btn></div>}
            {cart.items.map((it) => (
              <div key={it.variantId} className="li3" style={{ borderBottom: '1px solid #E7E7E7', gridTemplateColumns: '72px 1fr auto' }}>
                <div className="im" style={{ width: 72, height: 84, borderRadius: 12 }}><img src={it.img} alt="" /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontSize: 14 }}>{it.name}</span>{it.variant && <span className="xs g">{it.variant}</span>}
                  <div className="qty"><button onClick={() => cart.setQty(it.variantId, it.qty - 1)} aria-label="Fewer">−</button><span>{it.qty}</span><button onClick={() => cart.setQty(it.variantId, it.qty + 1)} aria-label="More">+</button></div></div>
                <div className="rt"><button onClick={() => cart.remove(it.variantId)} style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: 11, color: '#797979', textDecoration: 'underline' }}>Remove</button><b style={{ fontSize: 15, fontWeight: 400 }}>{money(it.price * it.qty)}</b></div>
              </div>
            ))}
          </div>
          <Upsells />
        </div>
        {cart.items.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #E7E7E7', display: 'grid', gap: 6 }}>
            {cart.savings > 0 && <div className="tot3"><span>Bundle savings</span><span>−{money(cart.savings)}</span></div>}
            <div className="tot3"><span>Shipping</span><span>Free</span></div>
            <div className="tot3 big" style={{ marginTop: 0, paddingTop: 8 }}><span>Total</span><span>{money(cart.total)}</span></div>
            <Btn href={cart.checkoutUrl} full className="lg">Checkout securely · {money(cart.total)}</Btn>
            <Link className="sm ul" href="/cart" onClick={() => cart.setOpen(false)} style={{ textAlign: 'center', padding: '6px 0' }}>View cart / add promo code</Link>
            <span className="xs g" style={{ textAlign: 'center' }}>21+ only · Free shipping from California · Secure checkout</span>
          </div>
        )}
      </aside>
    </>
  );
}

export function Footer() {
  const [ok, setOk] = useState(false);
  return (
    <footer className="v-ft">
      <div className="v-ft-top">
        <div>
          <p className="nlt">First dibs on drops,<br />deals and gifts.</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', margin: 0 }}>Limited editions sell out fast. Members hear first.</p>
          {ok ? <p style={{ marginTop: 20, color: '#FFD800', fontSize: 14 }}>You’re on the list. Watch your inbox.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); const email = new FormData(e.currentTarget).get('email'); fetch('/api/form', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ form: 'newsletter', fields: { email } }) }).catch(() => {}); setOk(true); }}>
              <label htmlFor="nl5" style={{ position: 'absolute', left: -9999 }}>Email address</label>
              <input id="nl5" name="email" type="email" required placeholder="Your email address" />
              <button type="submit" aria-label="Subscribe"><Arrow /></button>
            </form>
          )}
        </div>
        <div><h4>Shop</h4><Link href="/shop">All products</Link>{CATEGORIES.slice(1, 6).map((c) => <Link key={c.id} href={`/shop?cat=${c.id}`}>{c.name}</Link>)}</div>
        <div><h4>Help</h4><Link href="/verify">Verify product</Link><Link href="/warranty">Warranty claim</Link><Link href="/contact">Contact us</Link><Link href="/account">Account</Link><Link href="/cart">Cart</Link></div>
        <div><h4>Company</h4><Link href="/about">Our story</Link><Link href="/wholesale">Wholesale</Link><Link href="/products/inhaler-cart-battery">The Inhaler</Link></div>
        <div className="ct"><h4>Get in touch</h4>
          <a href={`sms:${SITE.phoneE164}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>{SITE.phone}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp us</a>
          <a href={`mailto:${SITE.email}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>{SITE.email}</a>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.5)', margin: '14px 0 0', lineHeight: 1.5 }}>{SITE.hours}</p>
        </div>
      </div>
      <div className="v-ft-bot">
        <span className="v-ft-word" role="img" aria-label="Smyle Labs" />
        <div className="v-ft-legal">
          <Link href="/warranty">Warranty policy</Link>
          <Link href="/verify">Product verification</Link>
          <span style={{ marginTop: 10 }}>© {new Date().getFullYear()} Smyle Labs · 21+ only · For aromatherapy use. Designed in California.</span>
        </div>
      </div>
    </footer>
  );
}
