'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { INHALER, money } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import { BundleProgress, TrustBadges, Upsells } from '@/components/cro';

export default function CartPage() {
  const cart = useCart();
  const [code, setCode] = useState('');
  const [age, setAge] = useState(false);
  const n = cart.inhalerQty;
  const nudge = n === 0 ? 'Add an Inhaler: buy 2, save 11%' : n === 1 ? 'Add 1 more Inhaler and save 11%' : n === 2 ? 'Add 1 more Inhaler and save 16%' : 'You unlocked the best price: 16% off Inhalers';
  const go = () => {
    if (!cart.checkoutUrl || !age) return;
    window.location.href = cart.checkoutUrl + (code.trim() ? `?discount=${encodeURIComponent(code.trim())}` : '');
  };
  return (
    <section className="co">
      <div>
        <p className="br"><Link href="/shop" style={{ textDecoration: 'none' }}>[Continue shopping]</Link></p>
        <h1 className="up d2" style={{ margin: '14px 0 22px' }}>Your order</h1>
        {cart.items.length === 0 && <div className="no3">Your cart is empty. <Link className="ul" href="/shop">Shop the catalog</Link></div>}
        {cart.items.map((it) => (
          <div key={it.variantId} className="li3" style={{ borderBottom: '1px solid #E7E7E7' }}>
            <div className="im"><img src={it.img} alt="" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span className="nm">{it.name}</span><span className="xs g">{it.variant}</span><span className="meta">{money(it.price)} each</span></div>
            <div className="rt"><button onClick={() => cart.remove(it.variantId)} style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: 11, color: '#797979', textDecoration: 'underline' }}>Remove</button>
              <div className="qty"><button onClick={() => cart.setQty(it.variantId, it.qty - 1)} aria-label="Fewer">−</button><span>{it.qty}</span><button onClick={() => cart.setQty(it.variantId, it.qty + 1)} aria-label="More">+</button></div><b>{money(it.price * it.qty)}</b></div>
          </div>
        ))}
        {n === 0 ? <Link href={`/products/${INHALER}`} style={{ display: 'block', background: '#FFD800', padding: '12px 14px', fontSize: 13, marginTop: 6, textDecoration: 'none' }}>{nudge}</Link> : <div style={{ marginTop: 6 }}><BundleProgress /></div>}
        <div style={{ marginTop: 10, border: '1px solid #E7E7E7' }}><Upsells max={3} /></div>
      </div>
      <div>
        <h2 className="up d2" style={{ margin: '34px 0 22px' }}>Summary</h2>
        <div className="tot3"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
        <div className="tot3"><span>Inhaler bundle savings</span><span>{cart.savings > 0 ? '−' + money(cart.savings) : '$0.00'}</span></div>
        <div className="tot3"><span>Shipping</span><span>Free from California</span></div>
        <div className="tot3 big"><span>Estimated total</span><span>{money(cart.total)}</span></div>
        <div className="fld" style={{ marginTop: 18 }}><label htmlFor="promo">Promo code (applied at checkout)</label><input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" /></div>
        <button className="opt3" style={{ borderBottom: 0, marginTop: 10 }} onClick={() => setAge(!age)} aria-pressed={age}><span className="bx3" style={{ width: 14, height: 14, border: '1px solid #131313', display: 'flex', alignItems: 'center', justifyContent: 'center', background: age ? '#131313' : '#fff', color: '#fff', fontSize: 10 }}>{age ? '✓' : ''}</span><span style={{ fontSize: 12 }}>I confirm I am 21 or older. Adult signature may be required on delivery.</span><span /></button>
        <button className="bk full" style={{ marginTop: 14, ...(age && cart.items.length ? {} : { opacity: 0.4, cursor: 'not-allowed' }) }} onClick={go}>{cart.items.length ? (age ? `Secure checkout · ${money(cart.total)}` : 'Confirm 21+ to continue') : 'Your cart is empty'}</button>
        <div style={{ marginTop: 14 }}><TrustBadges /></div>
        <p className="xs g" style={{ marginTop: 10 }}>You’ll finish payment on the secure Smyle Labs checkout. Bundle pricing and shipping are confirmed there.</p>
        <p className="xs g" style={{ marginTop: 6 }}>Need help? Call or text {SITE.phone}</p>
      </div>
    </section>
  );
}
