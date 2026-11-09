'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Heart } from '@/components/ui';
import { Btn, ChatQA, Check, Gallery, Head, Hotspots, Marquee, PCard, Tag } from '@/components/v5';
import { Details, FloatBar, Ship, Trust, useWatch } from '@/components/pdp';
import { CATEGORIES, byHandle, img, money, related, thumb, tierTotal } from '@/lib/catalog';
import { REVIEWS, SITE } from '@/lib/site';

function kind(p) {
  if (p.cats.includes('torches')) return 'torch';
  if (p.cats.includes('batteries')) return 'battery';
  if (p.cats.includes('apparel')) return 'apparel';
  return 'part';
}

function qa(p) {
  const k = kind(p);
  const fit = p.features.find((f) => /g carts|g cart|cart sizes/i.test(f));
  const usb = /usb-c/i.test(p.features.join(' ') + p.body);
  const common = [
    ['When will it get here?', 'It ships free from California and usually lands in 2–5 business days, in a plain box with no logos.'],
    ['What if something’s wrong with it?', `Manufacturer defects are covered by our warranty. Text us at ${SITE.phone} and real people will sort it out.`]
  ];
  if (k === 'battery') return [
    ['Will my cart fit?', 'It uses the standard 510 thread, so standard 510 carts screw right in. ' + (fit ? fit + '.' : 'The details above list the sizes.')],
    ['Will anyone know what it is?', 'That’s the whole idea. It’s designed to look like ' + (p.cats.includes('discreet') ? 'an everyday object, so it blends right in.' : 'a fun collectible first and a battery second.')],
    ['How do I charge it?', (usb ? 'With USB-C, the same cable as most phones.' : 'The full description shows how this one powers up.')],
    ['Is a cart included?', 'No, carts (oil) are sold separately. This is the battery only.'],
    ...common
  ];
  if (k === 'torch') return [
    ['Is butane included?', 'No. It refills with any standard butane can. Fill it, wait a moment, then light.'],
    ['Is it safe to carry?', (/safety lock/i.test(p.body + p.features.join(' ')) ? 'It has a safety lock so it won’t ignite by accident. ' : '') + 'Always keep torches away from children.'],
    ['What can I use it for?', 'Kitchen jobs like crème brûlée, searing and toasting, with a lot more style than a plain torch.'],
    ...common
  ];
  if (k === 'apparel') return [
    ['How does it fit?', 'Unisex fit. Pick your size or style from the options above.'],
    ['Not sure on sizing?', `Text or WhatsApp us at ${SITE.phone} and we’ll help you pick.`],
    ...common
  ];
  const pack = p.title.match(/(\d)[- ]?Pack/i);
  return [
    ['Will it work with mine?', 'It’s made for Smyle Labs products. The description above lists which ones.'],
    ['How many do I get?', pack ? `It’s a ${pack[1]}-pack, like it says in the name.` : 'One per order. Use the quantity selector to add more.'],
    ...common
  ];
}

function steps(p) {
  const k = kind(p);
  const im = (i) => (p.images[i] ? img(p.images[i], 700) : p.cut || img(p.images[0], 700));
  if (k === 'battery') return [
    [im(1), 'Pick your style', p.option && p.variants.length > 1 ? `${p.variants.length} ${p.option.toLowerCase()}s to choose from. Bundle and mix them.` : 'One look, done right. Add a second for the car.'],
    ['/assets/inhaler/step-cart.webp', 'Screw in any 510 cart', 'Standard 510 thread. Twist it in and you’re set.', true],
    [im(2), 'Press and go', 'Use it anywhere. When it’s low, plug it in to charge.']
  ];
  if (k === 'torch') return [
    [im(1), 'Fill it with butane', 'Any standard butane can. Let it settle for a moment.'],
    [im(2), 'Unlock and light', 'Flip the safety, press the trigger, adjust the flame.'],
    [im(3), 'Cook with style', 'Crème brûlée, searing, toasting. Then lock it again.']
  ];
  return null;
}

// Custom artwork + callouts for the "So, what is it?" section.
const MEET = {
  'smyle-labs-trucker-hat': {
    src: '/assets/photo/trucker-hat.webp', bg: '#000',
    spots: [
      { cx: 43.5, cy: 47, x: 33, y: 30, title: 'Yellow Smyle logo', text: 'The signature script logo, front and center.' },
      { cx: 45, cy: 79, x: 33, y: 76, title: 'Curved brim', text: 'Classic trucker shape that keeps the sun off.' },
      { cx: 49, cy: 17, x: 67, y: 24, side: 'r', title: 'Tall front panel', text: 'Plenty of room for the logo to shine.' },
      { cx: 61, cy: 46, x: 67, y: 66, side: 'r', title: 'Breathable mesh back', text: 'Stays cool on warm California days.' }
    ]
  }
};

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
  const [q, setQ] = useState(p.tiers && p.variants.some((x) => x.available) ? 2 : 1);
  const [heart, setHeart] = useState(false);
  const [added, setAdded] = useState(false);
  const [fbt, setFbt] = useState(true);
  const [atcRef, show] = useWatch();

  const v = p.variants[vi];
  const shots = (p.cut ? [{ src: p.cut, cut: true, alt: p.name }] : p.photo ? [{ src: p.photo, alt: p.name, bg: '#000' }] : []).concat(p.images.map((s) => ({ src: img(s, 1100), th: img(s, 160), alt: p.name })));
  const cat = CATEGORIES.find((c) => c.id === p.cats[0]) || CATEGORIES[0];
  const k = kind(p);
  const intro = p.intro || p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240);
  const total = tierTotal(p, q, v.price);
  const rating = p.reviews ? p.rating : 4.7;
  const rcount = p.reviews || SITE.reviewCount;
  const sim = [byHandle('inhaler-cart-battery'), ...related(p, 3)].filter((x) => x && x.handle !== p.handle).slice(0, 4);
  const compH = COMPANION[p.handle] || (k === 'battery' ? 'mini-plug-510-cart-battery' : k === 'torch' ? 'saber-shaped-gas-torch' : 'inhaler-cart-battery');
  const comp = compH !== p.handle ? byHandle(compH) : null;
  const compV = comp && (comp.variants.find((x) => x.available) || null);
  const feats = p.features.length ? p.features.slice(0, 4) : [];
  const st = steps(p);
  const DEF = [['Free shipping', 'From California in 2–5 business days.'], ['Warranty included', 'Manufacturer defects are on us.'], ['Plain, discreet box', 'No logos or labels on the outside.'], ['Real people support', `Text or WhatsApp ${SITE.phone}.`]];
  const callouts = [...feats.map((f) => [f, '']), ...DEF].slice(0, 4);
  const POS = p.cut ? [{ cx: 48, cy: 26, x: 33, y: 22 }, { cx: 48.5, cy: 70, x: 33, y: 76 }, { cx: 51.5, cy: 36, x: 67, y: 30, side: 'r' }, { cx: 51.5, cy: 76, x: 67, y: 72, side: 'r' }] : [{ cx: 40, cy: 28, x: 31, y: 22 }, { cx: 41, cy: 70, x: 31, y: 76 }, { cx: 60, cy: 34, x: 69, y: 30, side: 'r' }, { cx: 59, cy: 74, x: 69, y: 72, side: 'r' }];
  let spots = callouts.map(([title, text], i) => ({ ...POS[i], title, text }));
  const meet = MEET[p.handle];
  if (meet) spots = meet.spots;
  const short = p.name.split(' ').slice(0, 3).join(' ');

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
  const pct = p.tiers && q >= 2 ? p.tiers[q === 2 ? 0 : 1] : 0;
  const rv = REVIEWS.store.filter((r) => !r.photo);

  return (
    <>
      <div className="v-wrap">
        <nav className="v-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link>/<Link href="/shop">Shop</Link>/<Link href={`/shop?cat=${cat.id}`}>{cat.name}</Link>/<b>{p.name}</b></nav>
        <section className="v-pd">
          <Gallery shots={shots} />

          <div className="v-buy">
            <div className="chips">{p.badge && <span className="chip y">{p.badge}</span>}{v.available ? <span className="chip ok">● In stock</span> : <span className="chip">Sold out</span>}<span className="chip">Free shipping</span></div>
            <h1>{p.name}</h1>
            <a className="v-rate" href="#reviews"><span className="st">★★★★★</span><b style={{ fontWeight: 600 }}>{rating}</b><u>{rcount.toLocaleString()} {p.reviews ? 'reviews' : 'store reviews'}</u></a>
            <div className="v-price"><b>{money(total)}</b>{pct > 0 && <><s>{money(v.price * q)}</s><span className="chip y">Save {pct}%</span></>}{!pct && v.compare > v.price && <><s>{money(v.compare)}</s><span className="chip y">Save {money(v.compare - v.price)}</span></>}{q > 1 && <span style={{ fontSize: 13, color: '#6B6B6B' }}>{money(total / q)} each</span>}</div>
            <p className="lede">{intro}</p>
            {feats.length > 0 && <ul className="v-checks">{feats.map((f) => <li key={f}><Check />{f}</li>)}</ul>}
            <hr className="v-hr" />

            {p.option && p.variants.length > 1 && (
              <div>
                <div className="v-opt-h"><span style={{ color: '#131313' }}>{p.option}: <b style={{ fontWeight: 600 }}>{v.title}</b></span><span>{p.variants.length} options</span></div>
                <div className="v-vr" role="radiogroup" aria-label={p.option}>
                  {p.variants.map((x, i) => <button key={x.id} className={(i === vi ? 'on' : '') + (x.available ? '' : ' so')} role="radio" aria-checked={i === vi} title={x.available ? '' : 'Sold out'} onClick={() => { setVi(i); setAdded(false); }}>{x.title}</button>)}
                </div>
              </div>
            )}

            {p.tiers && v.available && (
              <div>
                <div className="v-opt-h"><b style={{ fontWeight: 500 }}>Bundle &amp; save</b><span>Mix and match{p.option ? ' ' + p.option.toLowerCase() + 's' : ''}</span></div>
                <div className="v-tiers" role="radiogroup" aria-label="Quantity">
                  {[1, 2, 3].map((n) => {
                    const pc = n === 1 ? 0 : p.tiers[n - 2]; const tot = tierTotal(p, n, v.price);
                    return (
                      <button key={n} className={'v-t' + (q === n ? ' on' : '')} role="radio" aria-checked={q === n} onClick={() => { setQ(n); setAdded(false); }}>
                        {n === 2 && <span className="pop">Most popular</span>}{n === 3 && <span className="pop y">Best value</span>}
                        <span className="rd" /><span><b>{n} × {short}</b>{pc > 0 && <span className="sv">Save {pc}%</span>}<span className="ea">{money(tot / n)} each</span></span>
                        <span className="pr">{money(tot)}{pc > 0 && <s>{money(v.price * n)}</s>}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {(!p.tiers || !v.available) && (
              <div className="v-opt-h" style={{ alignItems: 'center', marginBottom: 0 }}><span style={{ color: '#131313' }}>Quantity</span><div className="v-qty"><button onClick={() => setQ(Math.max(1, q - 1))} aria-label="Fewer">−</button><span>{q}</span><button onClick={() => setQ(q + 1)} aria-label="More">+</button></div></div>
            )}

            <div className="v-atc" ref={atcRef}><Btn onClick={add} disabled={!v.available}>{label}</Btn><button className={'wish' + (heart ? ' on' : '')} aria-label="Save to wishlist" aria-pressed={heart} onClick={() => setHeart(!heart)}><Heart /></button></div>
            <Ship available={v.available} />
            <Trust returns60={p.returns60} />
            {comp && compV && v.available && (
              <div className="v-fbt">
                <h4>Frequently bought together</h4>
                <div className="row"><div className="im"><img src={thumb(p, 200)} alt="" /></div><span className="plus">+</span><div className="im"><img src={thumb(comp, 200)} alt="" /></div>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, cursor: 'pointer', flex: 1 }}><input type="checkbox" checked={fbt} onChange={() => setFbt(!fbt)} style={{ marginTop: 3, accentColor: '#131313' }} /><span>{comp.name}<br /><span style={{ color: '#6B6B6B', fontSize: 12.5 }}>+{money(compV.price)}</span></span></label></div>
                <Btn kind="k" full onClick={addBoth}>{fbt ? `Add both · ${money(total + compV.price)}` : `Add to cart · ${money(total)}`}</Btn>
              </div>
            )}
            <Details items={[
              ['Description', p.body || intro],
              ['Shipping & returns', 'Free shipping from California. Orders usually arrive in 2–5 business days within the US, in a plain box.' + (p.returns60 ? ' 60-day easy returns.' : ' Money-back guarantee.')],
              ['Need help?', `Real people answer. Call, text or WhatsApp ${SITE.phone}, or email ${SITE.email}.`]
            ]} />
            <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>{k === 'battery' ? 'Cart (oil) not included · 21+ only.' : k === 'torch' ? 'Butane not included · 21+ only.' : 'Ships from California in 2–5 business days.'}</p>
          </div>
        </section>
      </div>

      {/* 1. Meet it */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="So, what is it?" title={<>Hey, meet the<br />{p.name}.</>} text={intro} />
          <Hotspots photo={!meet && !p.cut} src={meet ? meet.src : p.cut || img(p.images[0], 1000)} bg={meet && meet.bg} alt={p.name} spots={spots} />
        </div>
      </section>

      {/* 2. How it works */}
      {st && (
        <section className="v-sec">
          <div className="v-wrap">
            <Head tag="Here’s how it works" title={<>Easy as 1, 2, 3.</>} text="No setup and nothing to learn. Here’s all there is to it." />
            <div className="v-steps">
              {st.map(([src, h, d, cut], i) => <div className="v-step" key={h} data-r style={{ '--d': i * 100 + 'ms' }}><div className="im"><img className={cut ? '' : 'f'} src={src} alt="" loading="lazy" /></div><div className="tx"><span className="n">//0{i + 1}</span><h3 className="v-h3">{h}</h3><p>{d}</p></div></div>)}
            </div>
          </div>
        </section>
      )}

      {/* 3. Reviews */}
      <section className={'v-sec' + (st ? ' t0' : '')} id="reviews" style={{ overflow: 'hidden', scrollMarginTop: 80 }}>
        <div className="v-wrap">
          <Head tag="What people are saying" title={p.reviews ? <>{p.reviews.toLocaleString()} reviews and<br />counting.</> : <>Loved by 12,660+<br />Smyle Labs customers.</>} text={<span className="v-rsum"><span className="big">{rating}</span><span><span className="st">★★★★★</span><br />{p.reviews ? `${p.reviews.toLocaleString()} verified reviews of this product` : 'Store-wide verified reviews'}</span></span>} />
        </div>
        <Marquee speed={55}>
          <div className="v-rv">
            {[['/assets/ugc/inhaler.webp', 'Inhaler 510'], ['/assets/ugc/lipbalm.webp', 'Lip Balm Cart Pen'], ['/assets/ugc/moonwand.webp', 'Moon Wand']].flatMap(([src, n], i) => [
              <div className="v-rp" key={src}><img src={src} alt={`Customer photo: ${n}`} loading="lazy" /><div className="who"><b>Verified buyer</b><span>{n}</span></div></div>,
              ...rv.slice(i * 2, i * 2 + 2).map((r) => <div className="v-rq" key={r.who + i}><span className="st">★★★★★</span><q>{r.text}</q><div className="who"><i>{r.who[0]}</i><div><b>{r.who}</b><span>Verified · {r.product}</span></div></div></div>)
            ])}
          </div>
        </Marquee>
      </section>

      {/* 4. Conversation */}
      <section className="v-sec v-white">
        <div className="v-wrap">
          <Head center tag="You asked, we answered" title={<>Before you buy,<br />let’s talk.</>} text={<>The questions people text us most about this one. Still curious? Message {SITE.phone}.</>} />
          <ChatQA items={qa(p)} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 40 }} data-r><Btn href={SITE.whatsapp} kind="k" target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</Btn>{v.available && <Btn onClick={() => { add(); }}>{added ? 'Added to cart ✓' : `Add to cart · ${money(total)}`}</Btn>}</div>
        </div>
      </section>

      {/* 5. Inhaler cross-sell */}
      {k === 'battery' && (
        <section className="v-cta" style={{ marginTop: 12 }}>
          <img src="/assets/inhaler/hand.webp" alt="" style={{ objectFit: 'contain', objectPosition: 'right bottom' }} />
          <div className="in" data-r>
            <Tag dark>Our #1 discreet battery</Tag>
            <h2 className="v-h2">Want to hide your clouds too?</h2>
            <p className="v-p">The Inhaler 510 has a filter built into the base. Buy 2, save 11%. Buy 3, save 16%.</p>
            <div className="row"><Btn href="/products/inhaler-cart-battery" className="lg">Shop the Inhaler · $36.99</Btn></div>
          </div>
        </section>
      )}

      {/* 6. Pairs */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Pairs well with" title={<>You might also<br />like these.</>} btn="Shop all" href="/shop" />
          <div className="v-grid4">{sim.map((s, i) => <PCard key={s.handle} p={s} delay={i * 80} />)}</div>
        </div>
      </section>

      <FloatBar show={show} img={thumb(p, 120)} name={p.name + (v.title ? ' · ' + v.title : '')} sub={`★ ${rating} · Free shipping · 2–5 days`} label={label} onAdd={add} disabled={!v.available} />
    </>
  );
}
