'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Accordion, Heart } from '@/components/ui';
import { DeliveryEstimate, StickyATC, TrustBadges, useStickyWatch } from '@/components/cro';
import { CATEGORIES, byHandle, img, money, related, thumb } from '@/lib/catalog';
import { REVIEWS, SITE } from '@/lib/site';

function qa(p) {
  const bat = p.cats.includes('batteries'), tor = p.cats.includes('torches'), app = p.cats.includes('apparel');
  const fit = p.features.find((f) => /g carts|g cart|cart sizes/i.test(f));
  const usb = /usb-c/i.test(p.features.join(' ') + p.body);
  if (bat) return [
    ['Will my cart fit?', 'It uses the standard 510 thread, so it works with standard 510 carts. ' + (fit || 'Check the details above for sizes.')],
    ['Does anyone know what it is?', 'That is the point. It is designed to look like ' + (p.cats.includes('discreet') ? 'an everyday object, so it blends right in.' : 'a fun collectible first and a battery second.')],
    ['How do I charge it?', (usb ? 'With USB-C, the same cable as most phones.' : 'See the full description for how this one powers up.') + ' Questions? WhatsApp us any time.']
  ];
  if (tor) return [
    ['Is butane included?', 'No. It is refillable with any standard butane can. Fill, wait a moment, then light.'],
    ['Is it safe to carry?', (/safety lock/i.test(p.body + p.features.join(' ')) ? 'It has a safety lock so it will not ignite by accident. ' : '') + 'Always keep torches away from children.'],
    ['What is it for?', 'Cooking and baking jobs like crème brûlée, searing and toasting, with a lot more style.']
  ];
  if (app) return [
    ['How does it fit?', 'Unisex fit. Pick your size or style from the options above.'],
    ['How fast does it ship?', 'From California in 2–5 business days.'],
    ['Questions about sizing?', `Call, text or WhatsApp our team at ${SITE.phone}.`]
  ];
  const pack = p.title.match(/(\d)[- ]?Pack/i);
  return [
    ['Will it work with mine?', 'This part is made for Smyle Labs products. The description above says which ones.'],
    ['How many do I get?', pack ? `It is a ${pack[1]}-pack, as in the title.` : 'One per order. Add more with the quantity selector.'],
    ['How fast does it ship?', 'From California in 2–5 business days.']
  ];
}

const COMPANION = {
  'smyle-labs-pen': 'cart-pen-replacement-tip', 'car-key-penjamin-by-smyle-labs': 'penjamin-car-key-tip-replacement',
  'permanent-marker-cart-battery-by-smyle-labs': 'penjamin-marker-replacement-ink-tips-2-pack', 'danksaber': 'penjamin-car-key-cartridge-magnet-replacement-2-pack',
  'cart-pen-replacement-tip': 'smyle-labs-pen', 'penjamin-car-key-tip-replacement': 'car-key-penjamin-by-smyle-labs', 'penjamin-cart-pen-ink-replacement': 'smyle-labs-pen'
};

export default function ItemPage({ handle }) {
  const p = byHandle(handle);
  const cart = useCart();
  const firstAvail = Math.max(0, p.variants.findIndex((v) => v.available));
  const [vi, setVi] = useState(firstAvail);
  const [q, setQ] = useState(1);
  const [im, setIm] = useState(0);
  const [heart, setHeart] = useState(false);
  const [added, setAdded] = useState(false);
  const [fbt, setFbt] = useState(true);
  const [atcRef, showSticky] = useStickyWatch();

  const v = p.variants[vi];
  const shots = (p.cut ? [{ src: p.cut, cut: true }] : []).concat(p.images.map((s) => ({ src: s, cut: false })));
  const cur = shots[Math.min(im, shots.length - 1)];
  const cat = CATEGORIES.find((c) => c.id === p.cats[0]);
  const bat = p.cats.includes('batteries'), tor = p.cats.includes('torches');
  const note = bat ? 'Cart (oil) not included · 21+ only · Ships in 2–5 business days' : tor ? 'Butane not included · 21+ only · Ships in 2–5 business days' : 'Ships from California in 2–5 business days';
  const intro = p.intro || p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 260);
  const total = v.price * q;
  const sim = [byHandle('inhaler-cart-battery'), ...related(p, 3)].filter(Boolean);
  const compH = COMPANION[p.handle] || (p.cats.includes('batteries') ? 'mini-plug-510-cart-battery' : p.cats.includes('torches') ? 'saber-shaped-gas-torch' : 'inhaler-cart-battery');
  const comp = compH !== p.handle ? byHandle(compH) : null;
  const compV = comp && (comp.variants.find((x) => x.available) || null);

  const add = () => {
    if (!v.available) return;
    cart.add({ variantId: v.id, handle: p.handle, name: p.name, variant: v.title, price: v.price, img: thumb(p, 300), qty: q });
    setAdded(true);
  };
  const addBoth = () => {
    if (!v.available) return;
    add();
    if (fbt && comp && compV) cart.add({ variantId: compV.id, handle: comp.handle, name: comp.name, variant: compV.title, price: compV.price, img: thumb(comp, 300), qty: 1 });
  };
  const label = !v.available ? 'Sold out' : added ? `Added · ${money(total)}` : `Add to cart · ${money(total)}`;

  return (
    <>
      <section className="pd">
        <div className="pd-l">
          <p className="br"><Link href="/shop" style={{ textDecoration: 'none' }}>[Catalog]</Link> <Link href={`/shop?cat=${cat.id}`} style={{ textDecoration: 'none' }}>[{cat.name}]</Link> <b>[{p.name}]</b></p>
          <div>{p.badge && <span className="tl-badge y" style={{ position: 'static', display: 'inline-block', marginBottom: 10 }}>{p.badge}</span>}<h1 className="up d1">{p.name}</h1></div>
          <div className="price3"><b>{money(v.price)}</b>{v.compare > v.price && <s className="g">{money(v.compare)}</s>}<span className="xs g">Free shipping from California</span></div>
          <a className="sm" href="#reviews" style={{ textDecoration: 'none' }}>★★★★★ <b style={{ fontWeight: 600 }}>{SITE.rating}</b> · {SITE.reviewCount.toLocaleString()} store reviews</a>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: '#3A3A3A' }}>{intro}</p>
          {p.features.length > 0 && <ul className="dots3">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>}

          {p.option && p.variants.length > 1 && (
            <div>
              <div className="sz" style={{ marginBottom: 10 }}><span className="sm">{p.option} · <b style={{ fontWeight: 600 }}>{v.title}</b></span><span className="xs g">{p.variants.length} options</span></div>
              <div className="vr3" role="radiogroup" aria-label={p.option}>
                {p.variants.map((x, i) => (
                  <button key={x.id} className={i === vi ? 'on' : ''} role="radio" aria-checked={i === vi} onClick={() => { setVi(i); setAdded(false); }} style={!x.available ? { textDecoration: 'line-through', color: '#9A9A9A' } : undefined} title={x.available ? '' : 'Sold out'}>{x.title}</button>
                ))}
              </div>
            </div>
          )}

          <div className="qrow"><span className="sm">Quantity</span><div className="qty"><button onClick={() => setQ(Math.max(1, q - 1))} aria-label="Fewer">−</button><span>{q}</span><button onClick={() => setQ(q + 1)} aria-label="More">+</button></div></div>
          <div className="atc3" ref={atcRef}><button className={'hb' + (heart ? ' on' : '')} aria-label="Save to wishlist" onClick={() => setHeart(!heart)}><Heart /></button><button className="bk full" onClick={add} disabled={!v.available} style={!v.available ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}>{label}</button></div>
          <DeliveryEstimate available={v.available} />
          <TrustBadges />
          {comp && compV && v.available && (
            <div className="fbt">
              <h4>Frequently bought together</h4>
              <div className="fbt-row"><div className="im"><img src={thumb(p, 200)} alt="" /></div><span className="plus">+</span><div className="im"><img src={thumb(comp, 200)} alt="" /></div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, cursor: 'pointer', flex: 1 }}><input type="checkbox" checked={fbt} onChange={() => setFbt(!fbt)} style={{ marginTop: 3 }} /><span>{comp.name}<br /><span className="xs g">+{money(compV.price)}</span></span></label></div>
              <button className="bo" onClick={addBoth}>{fbt ? `Add both · ${money(total + compV.price)}` : `Add to cart · ${money(total)}`}</button>
            </div>
          )}
          <p className="xs g">{note}</p>
          <Accordion items={[
            ['Description', p.body || intro],
            ['Shipping', 'Free shipping from California. Orders generally arrive in 2–5 business days within the US.'],
            ['Help', `Real people answer. Call, text or WhatsApp ${SITE.phone}, or email ${SITE.email}.`]
          ]} html first={-1} />
        </div>
        <div className="pd-r">
          <div className="pd-th">
            {shots.map((s, i) => <button key={s.src} className={i === im ? 'on' : ''} aria-label={'Image ' + (i + 1)} onClick={() => setIm(i)}><img className="sqt" src={s.cut ? s.src : img(s.src, 120)} alt="" /></button>)}
          </div>
          <div className="pd-stage" style={{ background: '#F7F7F7' }}>
            {cur.cut ? <img key={cur.src} className="m" src={cur.src} alt={p.name} /> : <img key={cur.src} className="sq" src={img(cur.src, 1100)} alt={p.name} />}
          </div>
        </div>
      </section>

      <section className="sec3" id="reviews" style={{ borderTop: '1px solid #E7E7E7' }}>
        <div className="sec3-h"><p className="br">[customers say]</p><span className="xs g">Store-wide reviews</span></div>
        <div className="rv3">
          <div className="rv3-sum"><span className="num">{SITE.rating}</span><p style={{ fontSize: 18, letterSpacing: 3, marginTop: 6 }}>★★★★★</p><p className="sm g" style={{ marginTop: 6 }}>{SITE.reviewCount.toLocaleString()} reviews across Smyle Labs</p></div>
          {REVIEWS.store.filter((r) => !r.photo).slice(0, 3).map((r) => (
            <div className="rv3-item" key={r.who}><div className="who"><span>{r.who}</span><span>★★★★★</span></div><span className="xs g">{r.product}</span><p>{r.text}</p></div>
          ))}
        </div>
      </section>

      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[you might be wondering]</p><h2 className="up d2" style={{ marginTop: 8 }}>Before you buy</h2></div><p className="sm" style={{ maxWidth: 300 }}>Straight answers to what people ask us most about this one.</p></div>
        <div className="talk3">{qa(p).map(([qq, a]) => <div key={qq}><b>{qq}</b><p>{a}</p></div>)}</div>
      </section>

      <section className="sec3">
        <div className="sec3-h"><h2 className="up d2">Pairs well with</h2><Link className="sm ul" href="/shop">All products</Link></div>
        <div className="sim">
          {sim.map((s) => <Link key={s.handle} className="tl" href={s.href}><div className="tl-img"><img className={s.cut ? 'c' : 's'} src={thumb(s, 500)} alt={s.name} loading="lazy" /></div><span className="tl-name">{s.name}</span><span className="tl-price">{money(s.price)}</span></Link>)}
        </div>
      </section>


      <StickyATC show={showSticky} img={thumb(p, 120)} name={p.name + (v.title ? ' · ' + v.title : '')} price={money(v.price)} label={label} onAdd={add} disabled={!v.available} />
      <div className="mstick"><button className={'hb' + (heart ? ' on' : '')} style={{ width: 46, height: 46, border: 0, background: '#F7F7F7' }} aria-label="Save to wishlist" onClick={() => setHeart(!heart)}><Heart /></button><button className="bk" style={{ flex: 1 }} onClick={add} disabled={!v.available}>{label}</button></div>
    </>
  );
}
