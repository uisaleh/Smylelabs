'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Heart } from '@/components/ui';
import { Btn, ChatQA, Check, Gallery, Head, Hotspots, Marquee, PCard, Tag } from '@/components/v5';
import { Details, FloatBar, Ship, Trust, useWatch } from '@/components/pdp';
import { FILTERS, byHandle, img, money, thumb } from '@/lib/catalog';
import { INHALER_COLORS, INHALER_TIERS, REVIEWS, SITE } from '@/lib/site';

const QA = [
  ['Will it fit my cart?', 'Yep, as long as it’s a standard 510-thread cart from 0.5g to 1.0g. Use the short cover for 0.5g and the long cover for 1.0g. Both come in the box.'],
  ['Does the filter really hide clouds?', 'It does. You exhale into the base and the personal filter catches the vapor. Swap the filter every few weeks; a 3-pack is $18.99.'],
  ['How do I change the voltage?', 'Press the button 3 times quickly. The light tells you the setting: green 2.2V, purple 2.7V, blue 3.1V, red 3.6V.'],
  ['Is a cart included?', 'No, it’s the battery and filter system only. Bring your own 510 cart.'],
  ['When will it get here?', 'It ships free from California and usually arrives in 2–5 business days, in a plain box with no logos.'],
  ['What if something goes wrong?', `Manufacturer defects are covered by our warranty, and returns are easy within 60 days. Or just text us at ${SITE.phone}. Real people reply.`]
];

export default function InhalerPage({ handle }) {
  const p = byHandle(handle);
  const filters = byHandle(FILTERS);
  const cart = useCart();
  const [tier, setTier] = useState(2);
  const [colors, setColors] = useState([0, 2, 3]);
  const [addon, setAddon] = useState(false);
  const [heart, setHeart] = useState(false);
  const [added, setAdded] = useState(false);
  const [atcRef, show] = useWatch();
  const buyRef = useRef(null);

  const c0 = INHALER_COLORS[colors[0]];
  const shots = [
    { src: c0.img, cut: true, bg: c0.bg, deco: true, alt: 'Inhaler battery in ' + c0.variant },
    { src: '/assets/ugc/inhaler.webp', alt: 'Customer photo of the Inhaler', th: '/assets/ugc/inhaler.webp' },
    { src: '/assets/inhaler/step-filter.webp', cut: true, alt: 'Filter cap in the base' },
    { src: '/assets/inhaler/step-cart.webp', cut: true, alt: 'Cart screwed into the base' },
    { src: '/assets/inhaler/flatlay.webp', alt: 'What is in the box' },
    ...INHALER_COLORS.filter((c) => c.variant !== c0.variant).map((c) => ({ src: c.img, cut: true, bg: c.bg, alt: 'Inhaler in ' + c.variant })),
    ...p.images.slice(1, 6).map((s) => ({ src: img(s, 1100), th: img(s, 160), alt: p.name }))
  ];
  const t = INHALER_TIERS[tier - 1];
  const total = t.total + (addon && filters ? filters.price : 0);
  const variantFor = (name) => p.variants.find((v) => v.title === name) || p.variants[0];
  const reviews = p.reviews || 520;

  const add = () => {
    for (let u = 0; u < tier; u++) {
      const col = INHALER_COLORS[colors[u]]; const v = variantFor(col.variant);
      cart.add({ variantId: v.id, handle: p.handle, name: 'Inhaler 510', variant: col.variant + ' · cloud filters', price: v.price, img: col.img, qty: 1 });
    }
    if (addon && filters) cart.add({ variantId: filters.variants[0].id, handle: filters.handle, name: filters.name, variant: 'Replacement filters', price: filters.price, img: thumb(filters, 300), qty: 1 });
    setAdded(true);
  };
  const label = added ? `Added · ${money(total)}` : `Add to cart · ${money(total)}`;
  const pick = (n) => { setTier(n); setAdded(false); buyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <>
      <div className="v-wrap">
        <nav className="v-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link>/<Link href="/shop">Shop</Link>/<Link href="/shop?cat=discreet">Discreet</Link>/<b>Inhaler 510</b></nav>
        <section className="v-pd">
          <Gallery shots={shots} render={(cur, z) => cur.cut ? (<>
            {cur.deco && <><img className="deco" src="/assets/inhaler/cart.webp" alt="" style={{ left: '14%', bottom: '12%', height: '30%', transform: 'rotate(-22deg)' }} /><img className="deco" src="/assets/inhaler/cover-short.webp" alt="" style={{ right: '15%', bottom: '10%', height: '24%', transform: 'rotate(14deg)' }} /></>}
            <img key={cur.src} className="cut" src={cur.src} alt={cur.alt} />
          </>) : <img key={cur.src} className="ph" src={cur.src} alt={cur.alt} style={z ? { transformOrigin: z, transform: 'scale(1.6)' } : undefined} />} />

          <div className="v-buy" ref={buyRef} style={{ scrollMarginTop: 100 }}>
            <div className="chips"><span className="chip y">#1 Bestseller</span><span className="chip ok">● In stock</span><span className="chip">Free shipping</span></div>
            <div><h1>Inhaler 510</h1><p className="sub">Cart battery + built-in cloud filter</p></div>
            <a className="v-rate" href="#reviews"><span className="st">★★★★★</span><b style={{ fontWeight: 600 }}>4.7</b><u>{reviews.toLocaleString()} reviews</u></a>
            <div className="v-price"><b>{money(t.total)}</b>{t.was > 0 && <><s>{money(t.was)}</s><span className="chip y">{t.save}</span></>}<span style={{ fontSize: 13, color: '#6B6B6B' }}>{money(t.each)} each</span></div>
            <p className="lede">A discreet 510 battery that looks just like an everyday inhaler. Your cart hides inside, and every exhale goes through the filter in the base. No clouds, no questions.</p>
            <ul className="v-checks"><li><Check />Built-in personal cloud filter</li><li><Check />Fits 0.5–1.0g 510 carts</li><li><Check />4 voltages, 3 quick presses</li><li><Check />USB-C charging</li></ul>
            <hr className="v-hr" />

            <div>
              <div className="v-opt-h"><b style={{ fontWeight: 500 }}>Choose your bundle</b><span>Mix colors · save up to 16%</span></div>
              <div className="v-tiers" role="radiogroup" aria-label="Quantity">
                {INHALER_TIERS.map((x) => (
                  <button key={x.qty} className={'v-t' + (x.qty === tier ? ' on' : '')} role="radio" aria-checked={x.qty === tier} onClick={() => { setTier(x.qty); setAdded(false); }}>
                    {x.qty === 2 && <span className="pop">Most popular</span>}{x.qty === 3 && <span className="pop y">Best value</span>}
                    <span className="rd" /><span><b>{x.name}</b>{x.save && <span className="sv">{x.save}</span>}<span className="ea">{money(x.each)} each{x.qty > 1 ? ' · mix any colors' : ''}</span></span>
                    <span className="pr">{money(x.total)}{x.was > 0 && <s>{money(x.was)}</s>}</span>
                  </button>
                ))}
              </div>
            </div>

            {Array.from({ length: tier }).map((_, u) => (
              <div key={u}>
                <div className="v-opt-h"><span style={{ color: '#131313' }}>{tier > 1 ? `Color, Inhaler ${u + 1}` : 'Color'}: <b style={{ fontWeight: 600 }}>{INHALER_COLORS[colors[u]].variant}</b></span></div>
                <div className="v-sw" role="radiogroup" aria-label={`Color, Inhaler ${u + 1}`}>
                  {INHALER_COLORS.map((c, ci) => {
                    const ok = variantFor(c.variant).available;
                    return <button key={c.variant} className={ci === colors[u] ? 'on' : ''} role="radio" aria-checked={ci === colors[u]} aria-label={c.variant + (ok ? '' : ' (sold out)')} disabled={!ok} style={{ background: c.bg }} onClick={() => { const n = colors.slice(); n[u] = ci; setColors(n); setAdded(false); }}><img src={c.img} alt="" /></button>;
                  })}
                </div>
              </div>
            ))}

            {filters && (
              <button className={'v-addon' + (addon ? ' on' : '')} onClick={() => { setAddon(!addon); setAdded(false); }} aria-pressed={addon}>
                <span className="bx">{addon && <Check />}</span>
                <img src="/assets/inhaler/filters-3pack.webp" alt="" /><span style={{ flex: 1, fontSize: 14 }}>Add 3 spare filters<br /><span style={{ fontSize: 12.5, color: '#6B6B6B' }}>Most people swap every few weeks</span></span><b style={{ fontSize: 14, fontWeight: 500 }}>+{money(filters.price)}</b>
              </button>
            )}

            <div className="v-atc" ref={atcRef}><Btn onClick={add}>{label}</Btn><button className={'wish' + (heart ? ' on' : '')} aria-label="Save to wishlist" aria-pressed={heart} onClick={() => setHeart(!heart)}><Heart /></button></div>
            <Ship available />
            <Trust returns60 />
            <Details items={[
              ['Description', p.body],
              ['Specs', '510 thread · fits 0.5–1.0g carts · 4 voltages (2.2V, 2.7V, 3.1V, 3.6V) · USB-C charging'],
              ['What’s in the box', 'Battery base, short &amp; long cover pieces, 2 top caps (metallic &amp; colored), 2 replaceable cloud filters, 2 filter caps (white &amp; colored), quick start guide &amp; warranty info.'],
              ['Shipping & returns', SITE.shipping + '. 60-day easy returns. Ships in a plain box.']
            ]} />
            <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>21+ only. For aromatherapy use only. Not a medical device. Cart (oil) not included. California Prop 65 warning applies.</p>
          </div>
        </section>
      </div>

      {/* 1. Meet it */}
      <section className="v-show v-dk">
        <div className="v-wrap">
          <Head dark tag="So, what is it?" title={<>Hey, meet the<br />Inhaler 510.</>} text="It looks like the inhaler you’d carry anyway. Inside, it’s a 510 battery with a filter that catches your clouds. Here’s what makes it work." />
          <Hotspots src="/assets/inhaler/lifestyle.webp" alt="Inhaler 510 battery" spots={[
            { cx: 42.7, cy: 22, x: 33, y: 18, title: 'Your cart hides here', text: '0.5g or 1.0g. Short and long covers are in the box.' },
            { cx: 47.9, cy: 82, x: 33, y: 78, title: 'USB-C charging', text: 'Same cable as your phone.' },
            { cx: 49, cy: 45, x: 67, y: 32, side: 'r', title: '4 voltages', text: 'Three quick presses: green, purple, blue, red.' },
            { cx: 59.5, cy: 75, x: 67, y: 70, side: 'r', title: 'Built-in cloud filter', text: 'Exhale into the base. The filter catches the vapor.' }
          ]} />
        </div>
      </section>

      {/* 2. How it works */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Here’s how it works" title={<>Ready in 3 steps.<br />Seriously, that’s it.</>} text="No tools, no setup, no learning curve. If you can uncap a pen, you can use the Inhaler." />
          <div className="v-steps">
            {[['step-cart', '01', 'Screw in your cart', 'Any standard 510 cart from 0.5 to 1.0g twists right into the base.'], ['step-cover', '02', 'Slide on the cover', 'Short cover for 0.5g, long cover for 1.0g. Now it just looks like an inhaler.'], ['step-filter', '03', 'Pull, exhale, done', 'Breathe out through the filter in the base. No cloud left behind.']].map(([f, n, h, d], i) => (
              <div className="v-step" key={f} data-r style={{ '--d': i * 100 + 'ms' }}><div className="im"><img src={`/assets/inhaler/${f}.webp`} alt="" /></div><div className="tx"><span className="n">//{n}</span><h3 className="v-h3">{h}</h3><p>{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why people switch */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="Why people switch" title={<>Everything you need,<br />in one hand.</>} text="Short clips, no sound needed. This is what you get in the box." />
          <div className="v-feat">
            {[['/assets/anim/filter.webp', 'Personal cloud filter', 'Exhale into the base. Swap the filter in seconds.'], ['/assets/anim/variable-voltage.webp', '4 voltages', 'Three quick presses. The light shows your setting.'], ['/assets/anim/cover-sizes.webp', 'Two covers', 'Short for 0.5g, long for 1.0g carts.'], ['/assets/anim/5-colors.webp', '5 colors', 'Blue, grey, pink, purple and white. Mix them in a bundle.']].map(([src, h, d], i) => (
              <div key={h} data-r style={{ '--d': i * 90 + 'ms' }}><div className="im"><img src={src} alt={h} loading="lazy" /></div><div className="tx"><h3>{h}</h3><p>{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Reviews */}
      <section className="v-sec" id="reviews" style={{ overflow: 'hidden', scrollMarginTop: 80 }}>
        <div className="v-wrap">
          <Head tag="Don’t just take our word for it" title={<>{reviews.toLocaleString()} people already<br />made the switch.</>} text={<span className="v-rsum"><span className="big">4.7</span><span><span className="st">★★★★★</span><br />Based on {reviews.toLocaleString()} verified reviews</span></span>} />
        </div>
        <Marquee speed={55}>
          <div className="v-rv">
            <div className="v-rp"><img src="/assets/ugc/inhaler.webp" alt="Customer photo of the Inhaler" /><div className="who"><b>Amanda T.</b><span>Verified buyer</span></div></div>
            {REVIEWS.inhaler.map((r) => <div className="v-rq" key={r.who}><span className="st">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span><q>{r.text}</q><div className="who"><i>{r.who[0]}</i><div><b>{r.who}</b><span>Verified buyer · Inhaler 510</span></div></div></div>)}
          </div>
        </Marquee>
      </section>

      {/* 5. Comparison */}
      <section className="v-sec t0">
        <div className="v-wrap" style={{ maxWidth: 1100 }}>
          <Head tag="The difference" title={<>Inhaler 510 vs.<br />a regular cart pen.</>} text="Same cart, very different experience. Here’s the honest comparison." />
          <div style={{ overflowX: 'auto' }} data-r>
            <table className="v-cmp">
              <thead><tr><th scope="col" /><th scope="col" className="us">Smyle Inhaler 510</th><th scope="col">Regular cart pen</th></tr></thead>
              <tbody>
                {[['Looks like', 'An everyday inhaler', 'A vape'], ['Cloud filter', 'Built in', 'None'], ['Cart hidden', 'Fully, short and long', 'On show'], ['Voltage control', '4 settings', 'Often 1'], ['Charging', 'USB-C', 'Varies'], ['Returns', '60 days, easy', 'Varies']].map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td className="us">{b}</td><td>{c}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Conversation */}
      <section className="v-sec v-white">
        <div className="v-wrap">
          <Head center tag="You asked, we answered" title={<>Got questions?<br />Let’s talk.</>} text={<>These are the questions people text us most. Still curious? Message us at {SITE.phone}.</>} />
          <ChatQA items={QA} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 40 }} data-r><Btn href={SITE.whatsapp} kind="k" target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</Btn><Btn onClick={() => pick(tier)}>Ready? Add to cart · {money(total)}</Btn></div>
        </div>
      </section>

      {/* 7. Bundle */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="Bundle & save" title={<>One for you, one for<br />the car, one for a friend.</>} text="Pick a bundle and choose any colors. Every bundle ships free." />
          <div className="v-stair">
            {INHALER_TIERS.map((x, i) => (
              <div key={x.qty}><button className={'v-tier' + (i === 2 ? ' best' : '')} onClick={() => pick(x.qty)} data-r style={{ '--d': i * 120 + 'ms', width: '100%', border: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                <div className="top"><span className="n">//0{x.qty}</span>{x.qty > 1 && <span className="pill">{x.qty === 2 ? 'Most popular' : 'Best value'}</span>}</div>
                <img src={INHALER_COLORS[[0, 2, 3][i]].img} alt="" />
                <h3>{x.name}</h3><span className="pr">{money(x.total)}{x.was > 0 && <s>{money(x.was)}</s>}</span><span className="ea">{money(x.each)} each{x.save ? ' · ' + x.save.toLowerCase() : ''}</span>
              </button></div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Pairs */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Pairs well with" title={<>Complete your<br />setup.</>} btn="Shop all" href="/shop" />
          <div className="v-grid4">{[FILTERS, 'car-key-penjamin-by-smyle-labs', 'smyle-labs-pen', 'lip-balm-penjamin-by-smyle-labs'].map(byHandle).filter(Boolean).map((s, i) => <PCard key={s.handle} p={s} delay={i * 80} />)}</div>
        </div>
      </section>

      <FloatBar show={show} img={c0.img} name={`Inhaler 510 · ${t.name}`} sub={`★ 4.7 · ${reviews} reviews · Free shipping`} label={label} onAdd={add} />
    </>
  );
}
