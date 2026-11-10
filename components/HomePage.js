'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, byHandle, catCount, money } from '@/lib/catalog';
import { HOME_FAQ, REVIEWS, SITE, VIDEOS } from '@/lib/site';
import { Arrow, Btn, Faq, Head, Hotspots, Marquee, PCard, Tag } from '@/components/v5';

const P = (h) => '/products/' + h;
const STRIP = [
  ['Inhaler 510', 'Discreet', '/assets/inhaler/teal.webp', 'inhaler-cart-battery'],
  ['Cup Cart', 'Mrs. Puff', '/assets/cut/cup.webp', 'cup-cart-510-battery-by-mrs-puff'],
  ['Car Key', 'Penjamin', '/assets/cut/carkey.webp', 'car-key-penjamin-by-smyle-labs'],
  ['Cart Pen', 'Penjamin', '/assets/cut/pen.webp', 'smyle-labs-pen'],
  ['Lip Balm', 'Penjamin', '/assets/cut/lipbalm.webp', 'lip-balm-penjamin-by-smyle-labs'],
  ['Raygun', 'Novelty', '/assets/cut/raygun.webp', 'raygun-penjamin-battery'],
  ['Gas Pump Torch', 'Torches', '/assets/cut/gaspump.webp', 'gas-pump-shaped-torch-flame'],
  ['Saber Torch', 'Torches', '/assets/cut/saber.webp', 'saber-shaped-gas-torch'],
  ['Inhaler · Pink', 'Discreet', '/assets/inhaler/blush.webp', 'inhaler-cart-battery'],
  ['Raygun Torch', 'Torches', '/assets/cut/rayguntorch.webp', 'raygun-mini-torch-lighter-with-lights-sound']
];
const BEST = ['inhaler-cart-battery', 'smyle-labs-pen', 'lip-balm-penjamin-by-smyle-labs', 'controller-adapter-510-cart-battery', 'cup-cart-510-battery-by-mrs-puff', 'raygun-penjamin-battery', 'mini-plug-510-cart-battery', 'purse-510-cart-battery'];
const STACK = [
  { h: 'inhaler-cart-battery', name: 'Inhaler 510', chip: 'Bestseller', text: 'Looks like the inhaler you’d carry anyway. Inside: a 510 battery and a built-in filter that catches your clouds.', pts: ['Built-in personal cloud filter', 'Fits 0.5–1.0g carts, short and long', '4 voltages · USB-C charging'], art: '/assets/inhaler/lifestyle.webp', cut: true, from: 'Buy 3, from $31.07 each' },
  { h: 'car-key-penjamin-by-smyle-labs', name: 'Car Key Penjamin', chip: '3,025 reviews', text: 'A 510 battery hiding on your keyring. Nobody looks twice at a car key.', pts: ['Clips onto any keyring', 'Hides the cart inside', 'Save up to 21% in bundles'], art: '/assets/photo/p-carkey.webp', from: 'From $24.99' },
  { h: 'smyle-labs-pen', name: 'Penjamin Cart Pen', chip: '4,487 reviews', text: 'A real writing pen and a cart battery in one. The one that started it all.', pts: ['Writes with real ink', 'Preheat + adjustable voltage', '9 colors to pick from'], art: '/assets/photo/p-pen.webp', from: 'From $22.99' },
  { h: 'cup-cart-510-battery-by-mrs-puff', name: 'Cup Cart by Mrs. Puff', chip: 'New', text: 'A tiny tumbler with a digital screen. Your cart sits right where the straw goes.', pts: ['Digital voltage display', 'Pocket-sized tumbler design', 'Standard 510 thread'], art: '/assets/photo/p-cup.webp', from: 'From $24.99' }
];
const LOOKS = [
  ['Inhaler', '/assets/inhaler/teal.webp'], ['Car key', '/assets/cut/carkey.webp'], ['Pen', '/assets/cut/marker-pen.webp'],
  ['Lip balm', '/assets/cut/lipbalm.webp'], ['Tumbler', '/assets/cut/cup.webp'], ['Bag charm', '/assets/cut/pursejamin.webp']
];
const FAN = [
  ['01', 'Pick your disguise', 'An inhaler, a car key, a pen, a tumbler. 46 designs.', '/assets/cut/carkey.webp'],
  ['02', 'Add any 510 cart', 'Standard 510 thread. Most models hide the cart inside.', '/assets/inhaler/step-cart.webp'],
  ['03', 'Set your voltage', 'Most batteries have 3–4 settings. Three quick presses.', '/assets/cut/pen.webp'],
  ['04', 'Take it anywhere', 'Bag, pocket, keyring. Nobody needs to know.', '/assets/cut/lipbalm.webp'],
  ['05', 'Covered by us', 'Verify it’s genuine, and our warranty has your back.', '/assets/cut/raygun.webp']
];
const RV = [
  { p: '/assets/ugc/inhaler.webp', who: 'Amanda T.', what: 'Inhaler 510' },
  { q: 'Best battery ever. Not even close!', who: 'Jason S.', what: 'Penjamin Cart Pen' },
  { p: '/assets/photo/couple.webp', who: 'Heartjamin', what: 'Limited edition' },
  { q: 'I love that I can put this in my purse and no one can tell. Great quality. Telling all my friends.', who: 'Anthony S.', what: 'Inhaler 510' },
  { p: '/assets/ugc/lipbalm.webp', who: 'Verified buyer', what: 'Lip Balm Cart Pen' },
  { q: 'Don’t debate it, buy it!', who: 'Tammy L.', what: 'Verified buyer' },
  { p: '/assets/ugc/moonwand.webp', who: 'Verified buyer', what: 'Moon Wand' },
  { q: 'This lil thing is pretty darn cool! Looks, handles and puffs as expected.', who: 'Rob G.', what: 'Inhaler 510' },
  { p: '/assets/photo/purse-girl.webp', who: 'Pursejamin', what: 'Bag charm battery' },
  { q: 'Great gift.', who: 'Dennis C.', what: 'Cup Cart' }
];

export default function HomePage() {
  const [look, setLook] = useState(0);
  const [v, setV] = useState(-1);
  const vids = [VIDEOS[1], VIDEOS[2], VIDEOS[0]];
  return (
    <>
      {/* HERO */}
      <section className="v-hero">
        <div className="glow" />
        <img className="bgimg" src="/assets/inhaler/hand.webp" alt="Hand holding the Smyle Labs Inhaler 510 battery" />
        <div className="shade" />
        <svg className="v-cline" style={{ left: '73%', top: '29%', width: '13%', height: '13%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="0,0 40,0 100,100" vectorEffect="non-scaling-stroke" /><circle cx="100" cy="100" r="4" /><circle className="p" cx="100" cy="100" r="4" strokeWidth="1.5" />
        </svg>
        <Link className="v-callout" href={P('inhaler-cart-battery')} style={{ right: '27%', top: '22%' }}>
          <img src="/assets/inhaler/teal.webp" alt="" />
          <div><b>Inhaler 510</b><span>Built-in cloud filter · 5 colors<br />From <em>$31.07</em> in a 3-pack</span></div>
        </Link>
        <div className="v-hero-bot">
          <div className="v-hero-c">
            <span data-r><Tag dark>510 batteries in disguise</Tag></span>
            <h1 className="v-h1" data-r style={{ '--d': '100ms' }}>Batteries that don’t look like batteries.</h1>
            <p className="v-p" data-r style={{ '--d': '200ms' }}>An inhaler, a car key, a pen, a lip balm. Every Smyle Labs battery hides your 510 cart in something you already carry.</p>
            <div className="v-hero-btns" data-r style={{ '--d': '300ms' }}>
              <Btn href={P('inhaler-cart-battery')} className="lg">Shop the Inhaler</Btn>
              <Btn href="/shop" kind="gh" className="lg">Browse all {PRODUCTS.length} designs</Btn>
            </div>
            <div className="v-hero-trust" data-r style={{ '--d': '400ms' }}>
              <span className="av"><img src="/assets/team/founder.jpg" alt="" /><img src="/assets/team/design.jpg" alt="" /><img src="/assets/team/care.jpg" alt="" /></span>
              <span><b>★★★★★</b> 4.7 from 12,660 verified reviews</span>
            </div>
          </div>
          <div className="v-glass" data-r style={{ '--d': '500ms' }}>
            <div><b data-count="12660" data-suf="+">12,660+</b><span>Verified reviews</span></div>
            <div><b>4.7★</b><span>Average rating</span></div>
            <div><b>2–5 days</b><span>Free US shipping</span></div>
            <div><b>Save 16%</b><span>Buy 3 Inhalers</span></div>
          </div>
        </div>
      </section>

      {/* PRODUCT STRIP */}
      <section className="v-logos" aria-label="New arrivals">
        <Marquee speed={45}>
          {STRIP.map(([n, s, src, h]) => <Link key={n} className="v-logo" href={P(h)}><img src={src} alt="" /><span>{n}<em>{s}</em></span></Link>)}
        </Marquee>
        <div className="v-seen"><span>As seen on</span><b>TikTok</b><b>Instagram</b><b>Facebook</b><span>· Loved by 12,660+ customers</span></div>
      </section>

      {/* METRICS */}
      <section className="v-sec v-white">
        <div className="v-wrap">
          <Head tag="Why people love us" title={<>Small things.<br />Big reviews.</>} text="Every battery is quality-checked in California and backed by real people you can text." btn="Read our story" href="/about" />
          <div className="v-met">
            <div className="col o" data-par="0.04"><Link className="v-mc y" href="/products/inhaler-cart-battery#reviews" data-r><div><h3>Happy customers</h3><p>Verified reviews across the store, and counting.</p></div><span className="v-num" data-count="12660" data-suf="+">12,660+</span></Link></div>
            <div className="col"><div className="v-mc ph" data-r style={{ '--d': '80ms' }}><img src="/assets/photo/purse-girl.webp" alt="Woman with the Pursejamin clipped to her bag" /><span className="chip">Pursejamin</span></div>
              <div className="v-mc" data-r style={{ '--d': '120ms' }}><div><h3>Average rating</h3><p>From verified buyers on every product.</p></div><span className="v-num">4.7★</span></div></div>
            <div className="col o" data-par="0.06"><div className="v-mc ph" data-r style={{ '--d': '160ms', minHeight: 420 }}><img src="/assets/photo/couple.webp" alt="Couple holding the two halves of the Heartjamin" /><span className="chip">Heartjamin</span></div></div>
            <div className="col"><Link className="v-mc" href="/shop" data-r style={{ '--d': '200ms' }}><div><h3>Designs to pick from</h3><p>Inhalers, car keys, pens, tumblers and more.</p></div><span className="v-num" data-count={PRODUCTS.length}>{PRODUCTS.length}</span></Link>
              <div className="v-mc ph" data-r style={{ '--d': '240ms' }}><img src="/assets/photo/p-carkey.webp" alt="Car Key battery on a keyring" /><span className="chip">Car Key</span></div></div>
            <div className="col o" data-par="0.04"><div className="v-mc k" data-r style={{ '--d': '280ms' }}><div><h3>Free US shipping</h3><p>Ships from California in a plain, discreet box.</p></div><span className="v-num">2–5<small style={{ fontSize: 18, marginLeft: 6 }}>days</small></span></div></div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Bestsellers" title={<>The ones everyone<br />keeps coming back for.</>} text="Quick add straight from here. Bundles save up to 21%." btn={`Shop all ${PRODUCTS.length}`} href="/shop" />
          <div className="v-grid4">{BEST.map(byHandle).filter(Boolean).map((p, i) => <PCard key={p.handle} p={p} delay={(i % 4) * 80} />)}</div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="Who we are" title={<>Made to blend into<br />your everyday.</>} />
          <div className="v-who v-lines">
            <div data-r>
              <p className="big">Smyle Labs started in California with one idea: a cart battery should fit your life, not stand out in it. So we hide it inside things you already carry, and we make every one with a smile.</p>
              <div className="stats"><div><b data-count="12660" data-suf="+">12,660+</b><span>reviews at 4.7★</span></div><div><b data-count={PRODUCTS.length}>{PRODUCTS.length}</b><span>designs</span></div><div><b>Same day</b><span>support replies</span></div></div>
              <div><Btn href="/about">About Smyle Labs</Btn></div>
            </div>
            <div>
              <img src="/assets/photo/moon-woman.webp" alt="Woman holding the Moon Wand battery" style={{ aspectRatio: '3/4.4' }} data-r />
              <img src="/assets/photo/p-robot.webp" alt="Robot novelty battery" style={{ aspectRatio: '1/1.1' }} data-r data-par="0.05" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Shop by category" title={<>Pick your disguise,<br />we’ll do the rest.</>} text="From everyday lookalikes to collectible novelty pieces and kitchen torches." />
          <div className="v-n4" data-r>
            {[['discreet', 'Discreet', 'Looks like something you already carry. Nobody looks twice.', '/assets/inhaler/teal.webp'], ['novelty', 'Novelty', 'Collectible designs that are fun to hold and fun to show off.', '/assets/cut/cup.webp'], ['torches', 'Torches', 'Refillable butane torches for the kitchen, with a lot more style.', '/assets/cut/gaspump.webp'], ['accessories', 'Accessories', 'Spare filters, tips and parts to keep your gear going.', '/assets/inhaler/filters-3pack.webp']].map(([id, n, d, src], i) => (
              <Link key={id} href={`/shop?cat=${id}`}><span className="n">//{String(i + 1).padStart(2, '0')} · {catCount(id)} products</span><span className="go"><Arrow /></span><h3 className="v-h3">{n}</h3><p>{d}</p><div className="im"><img src={src} alt="" /></div></Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOTSPOT SHOWCASE */}
      <section className="v-show v-dk">
        <div className="v-wrap">
          <Head dark tag="Our #1 bestseller" title={<>Meet the<br />Inhaler 510.</>} text="Our most-loved discreet battery. Every exhale goes through the filter in the base, so your clouds stay hidden too." btn="Shop the Inhaler" href={P('inhaler-cart-battery')} />
          <Hotspots src="/assets/inhaler/lifestyle.webp" alt="Inhaler 510 battery" spots={[
            { cx: 42.7, cy: 22, x: 33, y: 18, title: 'Hides any 510 cart', text: '0.5g or 1.0g. Short and long covers are in the box.' },
            { cx: 47.9, cy: 82, x: 33, y: 78, title: 'USB-C charging', text: 'Same cable as your phone. Charged in about an hour.' },
            { cx: 49, cy: 45, x: 67, y: 32, side: 'r', title: '4 voltages', text: '2.2V, 2.7V, 3.1V or 3.6V. Three quick presses.' },
            { cx: 59.5, cy: 75, x: 67, y: 70, side: 'r', title: 'Built-in cloud filter', text: 'Exhale into the base and the filter catches the vapor.' }
          ]} />
        </div>
      </section>

      {/* STACKING FEATURED */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Customer favorites" title={<>Four ways to keep<br />it on the low.</>} text="The designs with the most reviews, the most reorders and the most “wait, that’s a battery?” moments." />
          <div className="v-stack">
            {STACK.map((s, i) => {
              const p = byHandle(s.h);
              return (
                <div className="v-sc" key={s.h} style={{ '--i': i }}>
                  <div>
                    <span className="no">/ {String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.name}</h3>
                    <p>{s.text}</p>
                    <ul>{s.pts.map((x) => <li key={x}>{x}</li>)}</ul>
                    <div className="ft"><Btn href={P(s.h)}>Shop {s.name.split(' ')[0] === 'Cup' ? 'the Cup Cart' : 'the ' + s.name.split(' ').slice(0, 2).join(' ')}</Btn><span className="pr">{p ? money(p.price) : ''}<span>{s.from}{p && p.reviews ? ` · ★ ${p.rating}` : ''}</span></span></div>
                  </div>
                  <div className="art"><span className="chip y">{s.chip}</span><img className={s.cut ? 'c' : ''} src={s.art} alt={s.name} loading="lazy" /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Why Smyle Labs" title={<>More discreet.<br />Less worry.</>} text="Everything we do is built so you can shop, receive and use your battery without a second thought." />
          <div className="v-bento">
            <Link className="v-bt tall sh" href="/shop?cat=novelty" data-r><img src="/assets/photo/moon-wand.webp" alt="Woman holding the Moon Wand battery" /><span className="k">Designed in California</span><h3>Fun to hold, easy to hide</h3><p>Every design has to pass two tests: nobody should guess what it is, and it should make you smile.</p></Link>
            <div className="v-bt" data-r style={{ '--d': '80ms' }}><h3>Discreet package</h3><p>No logos, no labels. Just a plain box at your door in 2–5 business days.</p><img className="cut" src="/assets/inhaler/box.webp" alt="" /></div>
            <Link className="v-bt y" href="/products/inhaler-cart-battery#reviews" data-r style={{ '--d': '160ms' }}><span className="v-num" style={{ marginBottom: 'auto' }}>4.7★</span><h3>Rated by 12,660 customers</h3><p>Real reviews from verified buyers.</p></Link>
            <Link className="v-bt w" href="/verify" data-r style={{ '--d': '120ms' }}><h3>Verify it’s genuine</h3><p>Scratch the label, enter the code, know it’s the real thing.</p><img className="cut" src="/assets/cut/lipbalm.webp" alt="" style={{ height: '62%' }} /></Link>
            <Link className="v-bt" href="/warranty" data-r style={{ '--d': '200ms' }}><h3>Warranty included</h3><p>Manufacturer defects are on us: repair, replace or something comparable.</p><img className="cut" src="/assets/cut/rayguntorch.webp" alt="" style={{ height: '58%' }} /></Link>
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="Bundle & save" title={<>Buy more.<br />Save more.</>} text="Mix any of the 5 Inhaler colors. One for you, one for the car, one for a friend." btn="Build your bundle" href={P('inhaler-cart-battery')} />
          <div className="v-stair">
            {[['01', '1 Inhaler', '/assets/inhaler/teal.webp', 36.99, 0, '$36.99 each', ''], ['02', '2 Inhalers', '/assets/inhaler/blush.webp', 65.84, 73.98, '$32.92 each · save 11%', 'Most popular'], ['03', '3 Inhalers', '/assets/inhaler/grape.webp', 93.21, 110.97, '$31.07 each · save 16%', 'Best value']].map(([n, t, src, pr, was, ea, pill], i) => (
              <div key={n}><Link className={'v-tier' + (i === 2 ? ' best' : '')} href={P('inhaler-cart-battery')} data-r style={{ '--d': i * 120 + 'ms' }}>
                <div className="top"><span className="n">//{n}</span>{pill && <span className="pill">{pill}</span>}</div>
                <img src={src} alt="" />
                <h3>{t}</h3><span className="pr">${pr.toFixed(2)}{was > 0 && <s>${was.toFixed(2)}</s>}</span><span className="ea">{ea}</span>
              </Link></div>
            ))}
          </div>
        </div>
      </section>

      {/* HOVER LIST */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Shop by look" title={<>What should your<br />battery look like?</>} text="Pick the everyday object you’d carry anyway. We’ll show you every design that looks like it." btn="Browse everything" href="/shop" />
          <div className="v-hl">
            <div className="v-hl-list">
              {LOOKS.map(([n], i) => (
                <Link key={n} className={'v-hl-row' + (look === i ? ' on' : '')} href={`/shop?look=${encodeURIComponent(n)}`} onMouseEnter={() => setLook(i)} onFocus={() => setLook(i)} data-r style={{ '--d': i * 60 + 'ms' }}>
                  <span className="n">//{String(i + 1).padStart(2, '0')}</span><span>{n}</span><span className="go"><Arrow /></span>
                </Link>
              ))}
            </div>
            <div className="v-hl-img cut" data-r>
              {LOOKS.map(([n, src], i) => <img key={n} className={look === i ? 'on' : ''} src={src} alt={look === i ? `${n} style battery` : ''} loading="lazy" />)}
              <div className="pills"><span>Free shipping</span><span>Mix &amp; match colors</span><span>Ships in 2–5 days</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAN: HOW IT WORKS */}
      <section className="v-sec v-white" style={{ overflow: 'hidden' }}>
        <div className="v-wrap">
          <Head tag="How it works" title={<>Ready in seconds.<br />No setup.</>} text="If you can screw on a cap, you can use a Smyle Labs battery." />
          <div className="v-fan" data-fan>
            {FAN.map(([n, t, d, src], i) => (
              <div className="v-fan-c" key={n} style={{ '--i': i, '--mid': 2, '--a': Math.abs(i - 2) }}>
                <div className="top"><span className="ic"><Arrow /></span><span className="n">//{n}</span></div>
                <div className="im"><img src={src} alt="" loading="lazy" /></div>
                <h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
          <div className="v-stats3" data-r>
            <div><b data-count="12660" data-suf="+">12,660+</b><span>Verified reviews</span></div>
            <div><b data-count="4.7">4.7</b><span>Average star rating</span></div>
            <div><b data-count={PRODUCTS.length}>{PRODUCTS.length}</b><span>Designs to choose from</span></div>
          </div>
        </div>
      </section>

      {/* VIDEOS STICKY LIST */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="See it in action" title={<>Watch it work,<br />then decide.</>} text="Short clips of the Inhaler, no sound needed. Tap to watch it big." btn="Shop the Inhaler" href={P('inhaler-cart-battery')} />
          <div className="v-stl v-lines" style={{ paddingTop: 40 }}>
            <div className="v-stl-side"><div className="v-stl-bars">{vids.map((x) => <i key={x.src} />)}</div><div className="v-stl-n"><b>01</b>/ {String(vids.length).padStart(2, '0')}</div></div>
            <div className="v-stl-list">
              {vids.map((x, i) => (
                <div className="v-stl-card" key={x.src}>
                  <div className="meta">Inhaler 510<span>Clip {i + 1} of {vids.length}</span></div>
                  <button className="im" onClick={() => setV(VIDEOS.indexOf(x))} aria-label={'Play: ' + x.title}><img src={x.src} alt="" loading="lazy" /><span className="play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg></span></button>
                  <div><h3>{x.title}</h3><p>{x.desc}</p><Btn href={P('inhaler-cart-battery')} kind="w">Shop · from $31.07</Btn></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="v-sec" style={{ overflow: 'hidden' }}>
        <div className="v-wrap">
          <Head tag="Reviews" title={<>Trusted by 12,660+<br />happy customers.</>} text="Real words and real photos from verified Smyle Labs buyers." btn="Read Inhaler reviews" href={P('inhaler-cart-battery') + '#reviews'} />
        </div>
        <Marquee speed={60}>
          <div className="v-rv">
            {RV.map((r, i) => r.p
              ? <div className="v-rp" key={i}><img src={r.p} alt={`Customer photo, ${r.what}`} loading="lazy" /><div className="who"><b>{r.who}</b><span>{r.what}</span></div></div>
              : <div className="v-rq" key={i}><span className="st">★★★★★</span><q>{r.q}</q><div className="who"><i>{r.who[0]}</i><div><b>{r.who}</b><span>{r.what}</span></div></div></div>)}
          </div>
        </Marquee>
      </section>

      {/* FAQ */}
      <section className="v-sec t0">
        <div className="v-wrap" style={{ maxWidth: 1100 }}>
          <Head tag="FAQ" title={<>Questions?<br />We’ve got answers.</>} text={<>Still wondering? Text or WhatsApp us at {SITE.phone}. Real people reply the same business day.</>} />
          <Faq items={HOME_FAQ} />
        </div>
      </section>

      {/* CTA */}
      <section className="v-cta" style={{ marginBottom: 12 }}>
        <img src="/assets/photo/purse-girl.webp" alt="" />
        <div className="in" data-r>
          <Tag dark>Free shipping from California</Tag>
          <h2 className="v-h2">Find your disguise today.</h2>
          <p className="v-p">Order today, and it’s at your door in 2–5 business days, in a plain box.</p>
          <div className="row"><Btn href="/shop" className="lg">Shop all products</Btn><Btn href={P('inhaler-cart-battery')} kind="gh" className="lg">Buy 3 Inhalers, save 16%</Btn></div>
          <div className="chips"><span>★ 4.7 from 12,660 reviews</span><span>Money-back guarantee</span><span>Warranty included</span><span>Secure checkout</span></div>
        </div>
      </section>

      {v >= 0 && (
        <div className="lb3" role="dialog" aria-label="Video">
          <button className="x" onClick={() => setV(-1)} aria-label="Close video">×</button>
          <img src={VIDEOS[v].src} alt={VIDEOS[v].title} />
          <div className="side"><p className="br" style={{ color: '#fff' }}>[{v + 1} / {VIDEOS.length}]</p><h3 className="up d2">{VIDEOS[v].title}</h3><p className="sm" style={{ color: '#CFCFCF' }}>{VIDEOS[v].desc}</p>
            <Btn href={P('inhaler-cart-battery')} onClick={() => setV(-1)}>Shop the Inhaler · {money(byHandle('inhaler-cart-battery')?.price || 36.99)}</Btn>
            <div style={{ display: 'flex', gap: 6 }}><button className="bo" style={{ flex: 1 }} onClick={() => setV((v + VIDEOS.length - 1) % VIDEOS.length)}>Prev</button><button className="bo" style={{ flex: 1 }} onClick={() => setV((v + 1) % VIDEOS.length)}>Next</button></div>
          </div>
        </div>
      )}
    </>
  );
}
