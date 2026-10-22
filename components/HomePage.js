'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Accordion } from '@/components/ui';
import { PRODUCTS, byHandle, catCount, money, thumb } from '@/lib/catalog';
import { HOME_FAQ, REVIEWS, SITE, VIDEOS } from '@/lib/site';

const P = (h) => '/products/' + h;
const ARRIVALS = [
  ['Inhaler · Blue', '/assets/inhaler/teal.webp', 'inhaler-cart-battery'],
  ['Cup Cart', '/assets/cut/cup.webp', 'cup-cart-510-battery-by-mrs-puff'],
  ['Car Key Penjamin', '/assets/cut/carkey.webp', 'car-key-penjamin-by-smyle-labs'],
  ['Penjamin Cart Pen', '/assets/cut/pen.webp', 'smyle-labs-pen'],
  ['Inhaler · Pink', '/assets/inhaler/blush.webp', 'inhaler-cart-battery'],
  ['Lip Balm Cart Pen', '/assets/cut/lipbalm.webp', 'lip-balm-penjamin-by-smyle-labs'],
  ['Raygun Penjamin', '/assets/cut/raygun.webp', 'raygun-penjamin-battery'],
  ['Gas Pump Torch', '/assets/cut/gaspump.webp', 'gas-pump-shaped-torch-flame'],
  ['Inhaler · White', '/assets/inhaler/cloud.webp', 'inhaler-cart-battery'],
  ['Saber Kitchen Torch', '/assets/cut/saber.webp', 'saber-shaped-gas-torch'],
  ['Inhaler · Purple', '/assets/inhaler/grape.webp', 'inhaler-cart-battery']
];
const FEATS = [
  { name: 'Inhaler\n510', series: 'Discreet Series', img: '/assets/inhaler/teal.webp', photo: '/assets/ugc/inhaler.webp', alt: 'Customer holding the Inhaler', h: 'inhaler-cart-battery' },
  { name: 'Car\nKey', series: 'Penjamin Series', img: '/assets/cut/carkey.webp', photo: '/assets/photo/p-carkey.webp', alt: 'Car Key battery on a key ring', h: 'car-key-penjamin-by-smyle-labs' },
  { name: 'Cup\nCart', series: 'Mrs. Puff', img: '/assets/cut/cup.webp', photo: '/assets/photo/p-cup.webp', alt: 'Cup Cart in the palm of a hand', h: 'cup-cart-510-battery-by-mrs-puff' },
  { name: 'Heart\njamin', series: 'Limited Edition', img: '/assets/photo/p-heart.webp', photo: '/assets/photo/couple.webp', alt: 'Couple holding the two halves of Heartjamin', h: 'heartjamin-cart-battery' }
];
const BEST = [
  { h: 'inhaler-cart-battery', img: '/assets/inhaler/teal.webp', st: { gridColumn: 'span 2' }, ih: 330, big: true },
  { h: 'raygun-penjamin-battery', img: '/assets/cut/raygun.webp', st: { marginTop: 0 }, ih: 130 },
  { h: 'smyle-labs-pen', img: '/assets/cut/pen.webp', st: { marginTop: 0 }, ih: 210 },
  { h: 'car-key-penjamin-by-smyle-labs', img: '/assets/cut/carkey.webp', st: { marginTop: 0 }, ih: 120 },
  { h: 'gas-pump-shaped-torch-flame', img: '/assets/cut/gaspump.webp', st: { marginTop: 40 }, ih: 150 },
  { h: 'cup-cart-510-battery-by-mrs-puff', img: '/assets/cut/cup.webp', st: { marginTop: 20 }, ih: 190 },
  { h: 'lip-balm-penjamin-by-smyle-labs', img: '/assets/cut/lipbalm.webp', st: { marginTop: 0 }, ih: 120 }
];

export default function HomePage() {
  const [f, setF] = useState(0);
  const [v, setV] = useState(-1);
  const [r, setR] = useState(0);
  const feat = FEATS[f];
  const pages = Math.ceil(REVIEWS.store.length / 3);
  const inh = byHandle('inhaler-cart-battery');

  return (
    <>
      <section className="na" aria-label="New arrivals">
        <span className="lbl">New arrivals</span>
        <div className="na-row">
          {ARRIVALS.map(([n, src, h], i) => (
            <Link key={n} href={P(h)} style={{ animationDelay: i * 60 + 'ms' }} aria-label={n}><img src={src} alt={n} /></Link>
          ))}
        </div>
      </section>

      <section className="duo3">
        <Link className="pan" href={P('inhaler-cart-battery')} style={{ background: '#C9B9A2' }} aria-label="Inhaler 510 special offer">
          <img className="bgp" src="/assets/photo/inhale.webp" alt="Man holding the Inhaler battery near his face" />
          <span className="cap" style={{ left: 20, top: 18, color: '#fff' }}>Special offer</span>
          <span className="txt" style={{ left: '52%', top: 18, color: '#fff' }}>Buy 2 Inhalers, save 11%. Buy 3, save 16%. Mix any of the 5 colors.</span>
        </Link>
        <Link className="pan hy" href={P('car-key-penjamin-by-smyle-labs')} style={{ background: '#FFD800' }} aria-label="Car Key Penjamin">
          <span className="slab" aria-hidden="true" />
          <img className="hero" src="/assets/cut/carkey.webp" alt="Car Key Penjamin battery" />
          <span className="cap" style={{ left: 20, bottom: 18 }}>Timeless hits</span>
          <span className="txt" style={{ right: 20, bottom: 18, textAlign: 'right' }}>The Penjamin line customers come back to: the car key, the pen, the lip balm.</span>
        </Link>
      </section>

      <section className="perks3" aria-label="Why shop with us">
        <div><b>Free shipping</b><span>Ships from California</span></div>
        <div><b>2–5 business days</b><span>Anywhere in the US</span></div>
        <div><b>4.7★ from 12,660 reviews</b><span>From verified buyers</span></div>
        <div><b>Real people</b><span>Call, text or WhatsApp {SITE.phone}</span></div>
      </section>

      <section className="ab">
        <div className="ab-l">
          <div className="ab-thumbs">
            <Link href={P('lip-balm-penjamin-by-smyle-labs')} aria-label="Lip Balm cart pen"><div><img src="/assets/cut/lipbalm.webp" alt="Lip Balm cart pen" /></div></Link>
            <Link href={P('cup-cart-510-battery-by-mrs-puff')} aria-label="Cup Cart battery"><div><img src="/assets/cut/cup.webp" alt="Cup Cart battery" /></div></Link>
          </div>
          <p className="sm" style={{ maxWidth: 260 }}>Our catalog brings together everyday-looking batteries, novelty pieces and torches, each designed in California.</p>
          <Link className="sm ul" href="/shop">Catalog</Link>
          <img className="ab-logo" src="/assets/brand/logo-black.webp" alt="Smyle Labs" />
        </div>
        <div className="ab-r">
          <h2 className="up d2">About us</h2>
          <p className="sm" style={{ maxWidth: 300 }}>We make 510 batteries that don’t look like batteries. An inhaler, a car key, a pen, a tumbler. Every product is quality-checked and backed by real people.</p>
          <div className="ab-ph"><img src="/assets/photo/couple.webp" alt="Couple holding the Heartjamin battery" /><img src="/assets/photo/purse-girl.webp" alt="Woman with a Pursejamin clipped to her bag" /></div>
        </div>
      </section>

      <section className="fs" aria-label="Featured product">
        <div className="fs-ph"><img key={feat.photo} src={feat.photo} alt={feat.alt} /></div>
        <div className="fs-card">
          <div className="fs-top"><div className="sm">Smyle Labs<br /><b style={{ fontWeight: 600 }}>{feat.series}</b></div>
            <div className="pn"><button onClick={() => setF((f + 3) % 4)}>Prev</button><span>/</span><button onClick={() => setF((f + 1) % 4)}>Next</button></div></div>
          <div className="fs-prod"><img key={feat.img} src={feat.img} alt={feat.name.replace('\n', ' ')} /></div>
          <div className="fs-bot"><h3 className="up d2" style={{ whiteSpace: 'pre-line' }}>{feat.name}</h3><Link className="bk" href={P(feat.h)}>Go to product</Link></div>
        </div>
      </section>

      <section className="bs">
        <div className="bs-head">
          <h2 className="up d2">Bestsellers</h2>
          <div><p className="sm" style={{ maxWidth: 340 }}>Our most-loved pieces. These are the batteries with the biggest following, backed by 12,660 reviews at 4.7 stars.</p><Link className="sm ul" href="/shop" style={{ display: 'inline-block', marginTop: 10 }}>All products</Link></div>
        </div>
        <div className="bs-row">
          {BEST.map((b) => {
            const p = byHandle(b.h); if (!p) return null;
            return (
              <Link key={b.h} className="tl" href={p.href} style={b.st}>
                <div className="tl-img" style={{ height: b.ih, ...(b.big ? { background: '#E9C46A' } : {}) }}><img className="c" src={b.img} alt={p.name} /></div>
                {b.big ? <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="tl-name">{p.name}</span><span className="tl-price">{money(p.price)}</span></div>
                  : <div><span className="tl-name" style={{ fontSize: 12 }}>{p.name}</span> <span className="tl-price">{money(p.price)}</span></div>}
              </Link>
            );
          })}
        </div>
        <div className="bs-foot"><Link className="bk full" href="/shop" style={{ maxWidth: 'none' }}>View full catalog ({PRODUCTS.length})</Link></div>
      </section>

      <section className="sec3" style={{ borderTop: '1px solid #E7E7E7' }}>
        <div className="sec3-h"><div><p className="br">[how it works]</p><h2 className="up d2" style={{ marginTop: 8 }}>Hide it in plain sight</h2></div><p className="sm" style={{ maxWidth: 320 }}>Every Smyle Labs battery works the same easy way. No tools, no setup.</p></div>
        <div className="steps3">
          <Link className="st3" href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}><div className="tl-img"><img className="c" src="/assets/cut/carkey.webp" alt="" /></div><p className="n">01</p><h3 className="up">Pick your disguise</h3><p className="sm g">An inhaler, a car key, a pen, a lip balm, a tumbler. {PRODUCTS.length}+ designs.</p></Link>
          <Link className="st3" href={P('inhaler-cart-battery')} style={{ textDecoration: 'none', color: 'inherit' }}><div className="tl-img" style={{ background: '#fff' }}><img className="c" src="/assets/inhaler/step-cart.webp" alt="" /></div><p className="n">02</p><h3 className="up">Add any 510 cart</h3><p className="sm g">Standard 510 thread. Most models hide the cart inside.</p></Link>
          <Link className="st3" href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}><div className="tl-img"><img className="f" src="/assets/photo/purse-girl.webp" alt="" /></div><p className="n">03</p><h3 className="up">Take it anywhere</h3><p className="sm g">In your bag, on your keys, in your pocket. Nobody needs to know.</p></Link>
        </div>
      </section>

      <section className="sec3" style={{ background: '#FFD800' }}>
        <div className="hr3" style={{ alignItems: 'center' }}>
          <div><p className="br" style={{ color: '#131313' }}>[bundle &amp; save]</p><h2 className="up d1" style={{ marginTop: 10 }}>Buy more,<br />save more</h2><p className="sm" style={{ marginTop: 14, maxWidth: 300 }}>Mix any of the 5 Inhaler colors. One for you, one for the car, one for a friend.</p></div>
          <div className="hr3-row">
            <Link className="hr3-card" href={P('inhaler-cart-battery')} style={{ textDecoration: 'none', background: '#fff' }}><span className="br">1 Inhaler</span><img src="/assets/inhaler/teal.webp" alt="" style={{ objectFit: 'contain', background: '#F7F7F7' }} /><span className="who" style={{ fontSize: 20 }}><span>$36.99</span><span className="g" style={{ fontSize: 12 }}>$36.99 each</span></span></Link>
            <Link className="hr3-card" href={P('inhaler-cart-battery')} style={{ textDecoration: 'none', background: '#fff' }}><span className="br">2 Inhalers · <b style={{ color: '#131313' }}>Save 11%</b></span><img src="/assets/inhaler/blush.webp" alt="" style={{ objectFit: 'contain', background: '#F7F7F7' }} /><span className="who" style={{ fontSize: 20 }}><span>$65.84 <s className="g" style={{ fontSize: 13 }}>$73.98</s></span><span className="g" style={{ fontSize: 12 }}>$32.92 each</span></span></Link>
            <Link className="hr3-card" href={P('inhaler-cart-battery')} style={{ textDecoration: 'none', background: '#131313', color: '#fff' }}><span className="br" style={{ color: '#FFD800' }}>3 Inhalers · Save 16% · Best value</span><img src="/assets/inhaler/grape.webp" alt="" style={{ objectFit: 'contain', background: '#F7F7F7' }} /><span className="who" style={{ fontSize: 20 }}><span>$93.21 <s style={{ fontSize: 13, color: '#9A9A9A' }}>$110.97</s></span><span style={{ fontSize: 12, color: '#BDBDBD' }}>$31.07 each</span></span></Link>
          </div>
        </div>
      </section>

      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[see it in action]</p><h2 className="up d2" style={{ marginTop: 8 }}>Watch the Inhaler</h2></div><p className="sm" style={{ maxWidth: 300 }}>Short clips, no sound needed. Tap one to watch it big.</p></div>
        <div className="vid3">
          {VIDEOS.map((x, i) => (
            <button key={x.src} className="vc" onClick={() => setV(i)} aria-label={'Play: ' + x.title}><img src={x.src} alt="" loading="lazy" /><span className="play"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg></span><span className="vt">{x.title}</span></button>
          ))}
        </div>
      </section>

      <section className="sec3">
        <div className="sec3-h"><div><p className="br">[shop by category]</p><h2 className="up d2" style={{ marginTop: 8 }}>Find your disguise</h2></div><Link className="sm ul" href="/shop">All products</Link></div>
        <div className="cat3">
          {[['discreet', 'Discreet', '/assets/inhaler/teal.webp'], ['novelty', 'Novelty', '/assets/cut/cup.webp'], ['torches', 'Torches', '/assets/cut/gaspump.webp'], ['accessories', 'Accessories', '/assets/inhaler/filters-3pack.webp']].map(([id, n, src]) => (
            <Link key={id} className="tl" href={`/shop?cat=${id}`}><div className="tl-img"><img className="c" src={src} alt="" /></div><span className="tl-name">{n}</span><span className="tl-price">{catCount(id)} products</span></Link>
          ))}
        </div>
      </section>

      <section className="sec3" style={{ borderTop: '1px solid #E7E7E7' }}>
        <div className="hr3">
          <div className="hr3-sum"><p className="br">[customers say]</p><p className="num" style={{ marginTop: 18 }}>4.7</p><p style={{ fontSize: 18, letterSpacing: 3, marginTop: 8 }}>★★★★★</p><p className="sm g" style={{ marginTop: 8 }}>12,660 reviews from verified buyers</p>
            <div className="hr3-nav">
              <button onClick={() => setR((r + pages - 1) % pages)} aria-label="Previous reviews"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg></button>
              <button onClick={() => setR((r + 1) % pages)} aria-label="Next reviews"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></button>
              <span className="xs g" style={{ alignSelf: 'center', marginLeft: 8 }}>{r + 1} / {pages}</span>
            </div>
            <Link className="sm ul" href={P('inhaler-cart-battery') + '#reviews'} style={{ display: 'inline-block', marginTop: 18 }}>Read Inhaler reviews</Link>
          </div>
          <div className="hr3-row">
            {REVIEWS.store.slice(r * 3, r * 3 + 3).map((x, i) => (
              <Link key={x.who + r} className="hr3-card" href={x.href} style={{ textDecoration: 'none', animationDelay: i * 80 + 'ms' }}>
                {x.photo && <img src={x.photo} alt={'Customer photo of the ' + x.product} />}
                <span>★★★★★</span><q>{x.text}</q><span className="who"><span>{x.who} · Verified</span><span className="g">{x.product}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[shop with confidence]</p><h2 className="up d2" style={{ marginTop: 8 }}>We’ve got your back</h2></div></div>
        <div className="ccard3 c4">
          <Link href="/verify" style={{ background: '#fff' }}><span>Verify</span><b>Check your product is genuine with the code on the label</b></Link>
          <Link href="/warranty" style={{ background: '#fff' }}><span>Warranty</span><b>Manufacturer defects covered. Repair, replace or similar</b></Link>
          <Link href="/contact" style={{ background: '#fff' }}><span>Support</span><b>Text, WhatsApp or email. Same business day replies</b></Link>
          <Link href="/wholesale" style={{ background: '#fff' }}><span>Wholesale</span><b>Retail, distributor and dispensary accounts</b></Link>
        </div>
      </section>

      <section className="sec3">
        <div className="hr3">
          <div><p className="br">[questions]</p><h2 className="up d2" style={{ marginTop: 8 }}>Good to know</h2><p className="sm" style={{ marginTop: 12, maxWidth: 260 }}>Still wondering? <Link className="ul" href="/contact">Ask our team</Link>.</p></div>
          <Accordion items={HOME_FAQ} plain />
        </div>
      </section>

      {v >= 0 && (
        <div className="lb3" role="dialog" aria-label="Video">
          <button className="x" onClick={() => setV(-1)} aria-label="Close video">×</button>
          <img src={VIDEOS[v].src} alt={VIDEOS[v].title} />
          <div className="side"><p className="br" style={{ color: '#fff' }}>[{v + 1} / {VIDEOS.length}]</p><h3 className="up d2">{VIDEOS[v].title}</h3><p className="sm" style={{ color: '#CFCFCF' }}>{VIDEOS[v].desc}</p>
            <Link className="bk" href={P('inhaler-cart-battery')} onClick={() => setV(-1)}>Shop the Inhaler · {inh ? money(inh.price) : '$36.99'}</Link>
            <div style={{ display: 'flex', gap: 6 }}><button className="bo" style={{ flex: 1 }} onClick={() => setV((v + VIDEOS.length - 1) % VIDEOS.length)}>Prev</button><button className="bo" style={{ flex: 1 }} onClick={() => setV((v + 1) % VIDEOS.length)}>Next</button></div>
          </div>
        </div>
      )}
    </>
  );
}
