'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Accordion, Heart, stars } from '@/components/ui';
import { DeliveryEstimate, StickyATC, TrustBadges, useStickyWatch } from '@/components/cro';
import { FILTERS, byHandle, img, money, thumb } from '@/lib/catalog';
import { INHALER_COLORS, INHALER_TIERS, REVIEWS, SITE } from '@/lib/site';

const FAQ = [
  ['Will it fit my cart?', 'Yes, if it’s a standard 510-thread cart from 0.5g to 1.0g. Use the short cover for 0.5g and the long cover for 1.0g.'],
  ['Does the filter really hide clouds?', 'Exhale through the base and the personal filter catches the vapor. Replace filters regularly; 3-packs are $18.99.'],
  ['How do I change the voltage?', 'Press the button 3 times quickly. The light shows the setting: green 2.2V, purple 2.7V, blue 3.1V, red 3.6V.'],
  ['How fast is shipping?', 'Shipping generally takes 2–5 business days within the US.'],
  ['Is a cart included?', 'No. This is the battery and filter system only.']
];

export default function InhalerPage({ handle }) {
  const p = byHandle(handle);
  const filters = byHandle(FILTERS);
  const cart = useCart();
  const [tier, setTier] = useState(2);
  const [colors, setColors] = useState([0, 2, 3]);
  const [addon, setAddon] = useState(false);
  const [im, setIm] = useState(0);
  const [heart, setHeart] = useState(false);
  const [all, setAll] = useState(false);
  const [added, setAdded] = useState(false);
  const [atcRef, showSticky] = useStickyWatch();

  const c0 = INHALER_COLORS[colors[0]];
  const shots = [
    { src: c0.img, cut: true, alt: 'Inhaler battery in ' + c0.variant },
    { src: '/assets/inhaler/step-filter.webp', cut: true, alt: 'Filter cap in the base' },
    { src: '/assets/inhaler/step-cart.webp', cut: true, alt: 'Cart screwed into the base' },
    { src: '/assets/ugc/inhaler.webp', cut: false, alt: 'Customer photo of the Inhaler' },
    { src: '/assets/inhaler/flatlay.webp', cut: false, alt: 'What is in the box' },
    ...p.images.slice(1, 6).map((s) => ({ src: img(s, 1100), cut: false, alt: p.name, shop: true }))
  ];
  const cur = shots[Math.min(im, shots.length - 1)];
  const t = INHALER_TIERS[tier - 1];
  const total = t.total + (addon && filters ? filters.price : 0);
  const variantFor = (name) => p.variants.find((v) => v.title === name) || p.variants[0];
  const revs = REVIEWS.inhaler.slice(0, all ? 6 : 3);

  const add = () => {
    for (let u = 0; u < tier; u++) {
      const col = INHALER_COLORS[colors[u]]; const v = variantFor(col.variant);
      cart.add({ variantId: v.id, handle: p.handle, name: 'Inhaler 510', variant: col.variant + ' · cloud filters', price: v.price, img: col.img, qty: 1 });
    }
    if (addon && filters) cart.add({ variantId: filters.variants[0].id, handle: filters.handle, name: filters.name, variant: 'Replacement filters', price: filters.price, img: thumb(filters, 300), qty: 1 });
    setAdded(true);
  };
  const label = added ? `Added · ${money(total)}` : `Add to cart · ${money(total)}`;

  return (
    <>
      <section className="pd">
        <div className="pd-l">
          <p className="br"><Link href="/shop" style={{ textDecoration: 'none' }}>[Catalog]</Link> <Link href="/shop?cat=discreet" style={{ textDecoration: 'none' }}>[Discreet]</Link> <b>[Inhaler]</b></p>
          <div><h1 className="up d1">Inhaler 510</h1><p className="sm" style={{ marginTop: 6 }}>Cart Battery + Cloud Filters</p></div>
          <div className="feat-ic" aria-label="Key parts">
            {[['airflow', 'Cloud filter'], ['cart', '510 cart'], ['cover-long', 'Long cover'], ['usb-c', 'USB-C'], ['box', 'Retail box']].map(([f, n]) => <span key={f} title={n}><img src={`/assets/inhaler/${f}.webp`} alt={n} /></span>)}
          </div>
          <a className="sm" href="#reviews" style={{ textDecoration: 'none' }}>★★★★★ <b style={{ fontWeight: 600 }}>4.7</b> · 513 reviews</a>
          <ul className="dots3"><li>Built-in personal cloud filter in the base</li><li>Fits 0.5–1.0g 510 carts, short and long</li><li>4 voltages: 2.2V, 2.7V, 3.1V, 3.6V</li><li>USB-C charging</li></ul>
          <p style={{ fontSize: 13, color: '#4A4A4A' }}>A discreet 510 battery that looks like an everyday inhaler. Your cart hides inside, and every exhale goes through the filter in the base.</p>

          <div>
            <div className="sz" style={{ marginBottom: 8 }}><span className="sm">Quantity</span><span className="xs g">Buy more, save more</span></div>
            <div className="tiers3" role="radiogroup" aria-label="Quantity">
              {INHALER_TIERS.map((x) => (
                <button key={x.qty} className={'t3' + (x.qty === tier ? ' on' : '')} role="radio" aria-checked={x.qty === tier} onClick={() => { setTier(x.qty); setAdded(false); }}>
                  {x.qty === 2 && <span className="pop">Most popular</span>}{x.qty === 3 && <span className="pop" style={{ background: '#FFD800', color: '#131313' }}>Best value</span>}
                  <span className="rd" /><span><b>{x.name}</b>{x.save && <span className="sv">{x.save}</span>}<br /><span className="xs g">{money(x.each)} each{x.qty > 1 ? ' · mix colors' : ''}</span></span>
                  <span className="pr">{money(x.total)}{x.was > 0 && <s>{money(x.was)}</s>}</span>
                </button>
              ))}
            </div>
          </div>

          {Array.from({ length: tier }).map((_, u) => (
            <div className="sz" key={u}><span className="sm">{tier > 1 ? `Color, unit ${u + 1}` : 'Color'} · <b style={{ fontWeight: 600 }}>{INHALER_COLORS[colors[u]].variant}</b></span>
              <div className="sz-opts" role="radiogroup" aria-label={`Color, unit ${u + 1}`}>
                {INHALER_COLORS.map((c, ci) => {
                  const ok = variantFor(c.variant).available;
                  return <button key={c.variant} className={ci === colors[u] ? 'on' : ''} role="radio" aria-checked={ci === colors[u]} aria-label={c.variant + (ok ? '' : ' (sold out)')} disabled={!ok} onClick={() => { const n = colors.slice(); n[u] = ci; setColors(n); if (u === 0) setIm(0); setAdded(false); }}><img src={c.img} alt="" /></button>;
                })}
              </div>
            </div>
          ))}

          {filters && (
            <button className={'addon3' + (addon ? ' on' : '')} onClick={() => setAddon(!addon)} aria-pressed={addon}>
              <span className="bx3">{addon && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>}</span>
              <img src="/assets/inhaler/filters-3pack.webp" alt="" /><span style={{ flex: 1, fontSize: 13 }}>Add 3 spare filters<br /><span className="xs g">Swap every few weeks</span></span><span style={{ fontSize: 13 }}>+{money(filters.price)}</span>
            </button>
          )}

          <div className="atc3" ref={atcRef}><button className={'hb' + (heart ? ' on' : '')} aria-label="Save to wishlist" onClick={() => setHeart(!heart)}><Heart /></button><button className="bk full" onClick={add}>{label}</button></div>
          <DeliveryEstimate available />
          <TrustBadges />
          <p className="xs g">Cart (oil) not included · Free shipping from California</p>
          <Accordion first={0} html items={[
            ['Full description', p.body],
            ['Specs', '510 thread · fits 0.5–1.0g carts · 4 voltages (2.2V, 2.7V, 3.1V, 3.6V) · USB-C charging'],
            ['What’s in the box', 'Battery base, short &amp; long cover pieces, 2 top caps (metallic &amp; colored), 2 replaceable cloud filters, 2 filter caps (white &amp; colored), quick start guide &amp; warranty info.'],
            ['Shipping', SITE.shipping + '.']
          ]} />
          <p className="xs g">21+ only. For aromatherapy use only. Not a medical device. California Prop 65 warning applies.</p>
        </div>

        <div className="pd-r">
          <div className="pd-th">{shots.map((s, i) => <button key={s.src} className={i === im ? 'on' : ''} aria-label={s.alt} onClick={() => setIm(i)}><img src={s.src} alt="" /></button>)}</div>
          <div className="pd-stage" style={{ background: cur.cut ? c0.bg : '#F7F7F7' }}>
            {cur.cut ? (<>
              <img className="deco" src="/assets/inhaler/cart.webp" alt="" style={{ left: '16%', bottom: '12%', height: '34%', transform: 'rotate(-22deg)' }} />
              <img className="deco" src="/assets/inhaler/cover-short.webp" alt="" style={{ right: '18%', bottom: '10%', height: '26%', transform: 'rotate(14deg)' }} />
              <img key={cur.src} className="m" src={cur.src} alt={cur.alt} />
            </>) : cur.shop ? <img key={cur.src} className="sq" src={cur.src} alt={cur.alt} /> : <img key={cur.src} className="f" src={cur.src} alt={cur.alt} />}
          </div>
        </div>
      </section>

      <section className="sec3" id="reviews" style={{ borderTop: '1px solid #E7E7E7' }}>
        <div className="sec3-h"><p className="br">[customers say]</p><button className="sm ul" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', padding: '10px 0', color: '#131313' }} onClick={() => setAll(!all)} aria-expanded={all}>{all ? 'Show less' : 'View all reviews'}</button></div>
        <div className="rv3">
          <div className="rv3-sum"><span className="num">4.7</span><p style={{ fontSize: 18, letterSpacing: 3, marginTop: 6 }}>★★★★★</p><p className="sm g" style={{ marginTop: 6 }}>Based on 513 reviews from verified buyers</p></div>
          {revs.map((r) => <div className="rv3-item" key={r.who}><div className="who"><span>{r.who}</span><span>{stars(r.stars)}</span></div><span className="xs g">Verified buyer</span><p>{r.text}</p></div>)}
        </div>
      </section>

      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[how it works]</p><h2 className="up d2" style={{ marginTop: 8 }}>Ready in 3 steps</h2></div><p className="sm" style={{ maxWidth: 300 }}>No tools, no setup. If you can uncap a pen, you can use the Inhaler.</p></div>
        <div className="steps3">
          {[['step-cart', '01', 'Screw in your cart', 'Any 510 cart from 0.5 to 1.0g.'], ['step-cover', '02', 'Slide on the cover', 'Short or long, to match your cart.'], ['step-filter', '03', 'Pull, exhale, done', 'Through the filter. No cloud left behind.']].map(([f, n, h, d]) => (
            <div className="st3" key={f}><div className="tl-img" style={{ background: '#fff' }}><img className="c" src={`/assets/inhaler/${f}.webp`} alt="" /></div><p className="n">{n}</p><h3 className="up">{h}</h3><p className="sm g">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="sec3">
        <div className="sec3-h"><div><p className="br">[built in]</p><h2 className="up d2" style={{ marginTop: 8 }}>Everything in one hand</h2></div></div>
        <div className="fx">
          <div className="tl"><div className="tl-img"><img className="f" src="/assets/anim/filter.webp" alt="Filter cap clicking into the base" loading="lazy" /></div><span className="tl-name">Personal cloud filter</span><span className="tl-price">Exhale into the base. Replace in seconds.</span></div>
          <div className="tl"><div className="tl-img"><img className="f" src="/assets/anim/variable-voltage.webp" alt="Changing voltage with three presses" loading="lazy" /></div><span className="tl-name">4 voltages</span><span className="tl-price">3 quick presses. Green, purple, blue, red.</span></div>
          <div className="tl"><div className="tl-img" style={{ gap: '10%' }}><img className="c" style={{ maxWidth: '26%' }} src="/assets/inhaler/cover-short.webp" alt="Short cover" /><img className="c" style={{ maxWidth: '26%' }} src="/assets/inhaler/cover-long.webp" alt="Long cover" /></div><span className="tl-name">Two covers</span><span className="tl-price">Short for 0.5g, long for 1.0g carts.</span></div>
          <div className="tl"><div className="tl-img"><img className="c" src="/assets/inhaler/usb-c.webp" alt="USB-C charging port" /></div><span className="tl-name">USB-C</span><span className="tl-price">Same cable as your phone.</span></div>
        </div>
      </section>

      <section className="sec3" style={{ paddingTop: 0 }}>
        <div className="sec3-h"><div><p className="br">[the difference]</p><h2 className="up d2" style={{ marginTop: 8 }}>Inhaler vs. a regular cart pen</h2></div></div>
        <div style={{ overflowX: 'auto' }}>
          <table className="cmp3">
            <thead><tr><th scope="col" /><th scope="col" className="us"><img className="us-logo" src="/assets/brand/logo-white.webp" alt="Smyle Labs" /><span style={{ display: 'block', marginTop: 6, fontSize: 11, color: '#fff' }}>Inhaler 510</span></th><th scope="col">Regular cart pen</th></tr></thead>
            <tbody>
              {[['Looks like', 'An everyday inhaler', 'A vape'], ['Cloud filter', 'Built in', 'None'], ['Cart hidden', 'Fully, short and long', 'On show'], ['Voltage control', '4 settings', 'Often 1'], ['Charging', 'USB-C', 'Varies']].map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td className="us">{b}</td><td>{c}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>


      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[questions]</p><h2 className="up d2" style={{ marginTop: 8 }}>Good to know</h2></div></div>
        <div style={{ maxWidth: 820 }}><Accordion items={FAQ} plain /></div>
      </section>

      <section className="sec3">
        <h2 className="up d2" style={{ marginBottom: 24 }}>Similar products</h2>
        <div className="sim">
          {['car-key-penjamin-by-smyle-labs', 'smyle-labs-pen', 'lip-balm-penjamin-by-smyle-labs', FILTERS].map(byHandle).filter(Boolean).map((s) => (
            <Link key={s.handle} className="tl" href={s.href}><div className="tl-img"><img className={s.cut ? 'c' : 's'} src={thumb(s, 500)} alt={s.name} /></div><span className="tl-name">{s.name}</span><span className="tl-price">{money(s.price)}</span></Link>
          ))}
        </div>
      </section>

      <StickyATC show={showSticky} img={c0.img} name={`Inhaler 510 · ${t.name}`} price={money(total)} label={label} onAdd={add} />
      <div className="mstick"><button className={'hb' + (heart ? ' on' : '')} style={{ width: 46, height: 46, border: 0, background: '#F7F7F7' }} aria-label="Save to wishlist" onClick={() => setHeart(!heart)}><Heart /></button><button className="bk" style={{ flex: 1 }} onClick={add}>{label}</button></div>
    </>
  );
}
