'use client';
// v5 building blocks: Volteva-style layout patterns in Smyle Labs colors and type.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Heart } from '@/components/ui';
import { money, thumb } from '@/lib/catalog';

export const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
const ArrowIc = () => <span className="ic" aria-hidden="true"><Arrow /><Arrow /></span>;

/** Button with the sliding arrow icon. kind: '' (yellow) | 'k' (dark) | 'w' (white) | 'gh' (ghost on dark) */
export function Btn({ href, children, kind = '', full, onClick, disabled, type, className = '', ...rest }) {
  const cls = `v-btn ${kind} ${full ? 'full' : ''} ${className}`.trim();
  if (href) {
    const ext = /^(https?:|mailto:|sms:|tel:)/.test(href);
    return ext
      ? <a className={cls} href={href} {...rest}><span>{children}</span><ArrowIc /></a>
      : <Link className={cls} href={href} onClick={onClick} {...rest}><span>{children}</span><ArrowIc /></Link>;
  }
  return <button className={cls} onClick={onClick} disabled={disabled} type={type || 'button'} {...rest}><span>{children}</span><ArrowIc /></button>;
}

export const Tag = ({ children, dark }) => <span className={'v-tag' + (dark ? ' d' : '')}>{children}</span>;

/** Section header: tag + big title on the left, text + button on the right. */
export function Head({ tag, title, text, btn, href, dark, center }) {
  return (
    <div className={'v-head' + (center ? ' c' : '')}>
      <div data-r><Tag dark={dark}>{tag}</Tag><h2 className="v-h2">{title}</h2></div>
      {(text || btn) && <div data-r style={{ '--d': '120ms' }}>{text && <p className="v-p">{text}</p>}{btn && <Btn href={href} kind={dark ? '' : 'k'}>{btn}</Btn>}</div>}
    </div>
  );
}

/** Infinite marquee. */
export function Marquee({ children, speed = 40, className = '' }) {
  return (
    <div className={'v-mq ' + className}>
      <div className="v-mq-t" style={{ animationDuration: speed + 's' }}>{children}{children}</div>
    </div>
  );
}

/** Product card: image well, badge, wishlist, quick add slides up on hover. */
export function PCard({ p, delay = 0 }) {
  const cart = useCart();
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!p) return null;
  const avail = p.variants.filter((v) => v.available);
  const many = p.variants.length > 1;
  const quick = (e) => {
    e.preventDefault();
    const v = avail[0]; if (!v) return;
    cart.add({ variantId: v.id, handle: p.handle, name: p.name, variant: v.title, price: v.price, img: thumb(p, 300), qty: 1 });
    setDone(true); setTimeout(() => setDone(false), 1800);
  };
  const cmp = p.variants[0] && p.variants[0].compare > p.price ? p.variants[0].compare : 0;
  return (
    <div className="v-pc" data-r style={{ '--d': delay + 'ms' }}>
      <Link className="v-pc-im" href={p.href} aria-label={p.name}>
        <span className="chips">{p.badge && <span className={'chip' + (/new|best/i.test(p.badge) ? ' y' : '')}>{p.badge}</span>}{!p.available && <span className="chip">Sold out</span>}{p.tiers && p.available && <span className="chip k">Save up to {p.tiers[1]}%</span>}</span>
        <img className={p.cut || p.card ? 'c' : 's'} src={thumb(p, 600)} alt={p.name} loading="lazy" />
      </Link>
      <button className={'v-heart' + (saved ? ' on' : '')} aria-label={'Save ' + p.name} aria-pressed={saved} onClick={() => setSaved(!saved)}><Heart /></button>
      {p.available && (many
        ? <Link className="v-qa" href={p.href}>Choose {p.option ? p.option.toLowerCase() : 'option'} · {p.variants.length}<span className="ic" aria-hidden="true"><Arrow /></span></Link>
        : <button className={'v-qa' + (done ? ' done' : '')} onClick={quick}>{done ? 'Added to cart ✓' : 'Quick add'}<span className="ic" aria-hidden="true">+</span></button>)}
      <Link href={p.href} className="v-pc-b">
        <span className="nm">{p.name}</span>
        <span className="pr">{money(p.price)}{cmp > 0 && <s>{money(cmp)}</s>}</span>
        <span className="rt">{p.reviews > 0 ? <>★ {p.rating} <em>({p.reviews.toLocaleString()})</em></> : <em>New</em>}{many && <em> · {p.variants.length} {p.option ? p.option.toLowerCase() + 's' : 'options'}</em>}</span>
      </Link>
    </div>
  );
}

/** Inner-page hero inside the rounded dark frame. */
export function PageHero({ tag, title, text, children, img, small }) {
  return (
    <section className={'v-phero' + (small ? ' sm' : '')}>
      {img && <img className="bg" src={img} alt="" />}
      <div className="in">
        <span data-r><Tag dark>{tag}</Tag></span>
        <h1 className="v-h1" data-r style={{ '--d': '80ms' }}>{title}</h1>
        {text && <p className="v-p" data-r style={{ '--d': '160ms' }}>{text}</p>}
        {children && <div data-r style={{ '--d': '240ms' }}>{children}</div>}
      </div>
    </section>
  );
}

/** Product image with hotspot callouts joined by animated lines. spots: [{x,y,cx,cy,side,title,text}] in % of the box. */
export function Hotspots({ src, alt, spots, bg, photo }) {
  return (
    <div className={'v-hs' + (photo ? ' ph' : '')} data-r style={bg ? { background: bg } : undefined}>
      <img className="v-hs-img" src={src} alt={alt} />
      <svg className="v-hs-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {spots.map((s, i) => <polyline key={i} points={`${s.cx},${s.cy} ${s.mx ?? (s.cx + s.x) / 2},${s.y} ${s.x},${s.y}`} style={{ '--d': 300 + i * 180 + 'ms' }} vectorEffect="non-scaling-stroke" />)}
      </svg>
      {spots.map((s, i) => (
        <span key={'d' + i} className="v-hs-dot" style={{ left: s.cx + '%', top: s.cy + '%', '--d': 200 + i * 180 + 'ms' }} />
      ))}
      {spots.map((s, i) => (
        <div key={'c' + i} className={'v-hs-card ' + (s.side || 'l')} style={{ left: s.side === 'r' ? s.x + '%' : undefined, right: s.side === 'r' ? undefined : (100 - s.x) + '%', top: s.y + '%', '--d': 500 + i * 180 + 'ms' }}>
          <span className="n">//{String(i + 1).padStart(2, '0')}</span><b>{s.title}</b><p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Conversation-style Q&A (customer bubble, Smyle reply). */
export function ChatQA({ items }) {
  return (
    <div className="v-chat">
      {items.map(([q, a], i) => (
        <div className="v-chat-pair" key={q} data-r style={{ '--d': i * 60 + 'ms' }}>
          <div className="q"><span>{q}</span><i aria-hidden="true">You</i></div>
          <div className="a"><i aria-hidden="true"><img src="/assets/brand/logo-white.webp" alt="" /></i><span>{a}</span></div>
        </div>
      ))}
    </div>
  );
}

/** Boxed FAQ accordion with +/× square. */
export function Faq({ items, first = 0 }) {
  const [open, setOpen] = useState(first);
  return (
    <div className="v-faq">
      {items.map(([q, a], i) => (
        <div key={q} className={'v-faq-i' + (open === i ? ' on' : '')} data-r style={{ '--d': i * 50 + 'ms' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>{q}<span className="pm" aria-hidden="true" /></button>
          <div className="ans"><div><p>{a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

/** Reveal-on-scroll, counters, parallax, sticky stacks and fan cards. One observer for the whole site. */
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; el.setAttribute('data-in', ''); io.unobserve(el);
      if (el.dataset.count) countUp(el);
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const seen = new WeakSet();
    const scan = () => document.querySelectorAll('[data-r],[data-count],.v-hs,.v-stl-card').forEach((el) => { if (!seen.has(el)) { seen.add(el); reduce ? el.setAttribute('data-in', '') : io.observe(el); } });
    scan();
    const mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (!reduce) document.querySelectorAll('[data-par]').forEach((el) => {
        const r = el.getBoundingClientRect(); const k = parseFloat(el.dataset.par) || 0.1;
        el.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px,0)`;
      });
      document.querySelectorAll('[data-fan]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.55)));
        el.style.setProperty('--p', reduce ? 1 : p.toFixed(3));
      });
      document.querySelectorAll('.v-stack').forEach((st) => {
        const cards = [...st.querySelectorAll('.v-sc')];
        cards.forEach((c, i) => {
          const next = cards[i + 1]; if (!next) { c.style.setProperty('--s', 1); return; }
          const nr = next.getBoundingClientRect(); const cr = c.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, 1 - (nr.top - cr.top) / cr.height));
          c.style.setProperty('--s', (1 - p * 0.05).toFixed(3));
          c.style.setProperty('--o', (1 - p * 0.35).toFixed(3));
        });
      });
      const stl = document.querySelector('.v-stl');
      if (stl) {
        const cs = [...stl.querySelectorAll('.v-stl-card')]; let idx = 0;
        cs.forEach((c, i) => { if (c.getBoundingClientRect().top < vh * 0.55) idx = i; c.classList.toggle('act', false); });
        if (cs[idx]) cs[idx].classList.add('act');
        stl.style.setProperty('--idx', idx);
        const n = stl.querySelector('.v-stl-n b'); if (n) n.textContent = String(idx + 1).padStart(2, '0');
      }
      const hd = document.querySelector('.v-hd');
      if (hd) hd.classList.toggle('scr', window.scrollY > 24);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    tick();
    return () => { io.disconnect(); mo.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [path]);
  return null;
}

function countUp(el) {
  const end = parseFloat(el.dataset.count); const dec = (el.dataset.count.split('.')[1] || '').length;
  const suf = el.dataset.suf || ''; const t0 = performance.now(); const dur = 1400;
  const step = (t) => { const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3); el.textContent = (end * e).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/** Gallery for product pages: thumbs + big stage, arrows, counter, hover zoom. */
export function Gallery({ shots, bg = '#EFEFEA', render }) {
  const [i, setI] = useState(0);
  const [z, setZ] = useState(null);
  const n = shots.length;
  const go = (d) => setI((i + d + n) % n);
  const cur = shots[Math.min(i, n - 1)];
  const stage = useRef(null);
  useEffect(() => { if (i >= n) setI(0); }, [n, i]);
  return (
    <div className="v-gal">
      <div className="v-gal-th">{shots.map((s, k) => <button key={s.src + k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={'Image ' + (k + 1)}><img src={s.th || s.src} alt="" /></button>)}</div>
      <div className="v-gal-st" ref={stage} style={{ background: cur.bg || bg }}
        onMouseMove={(e) => { if (cur.cut || window.innerWidth < 900) return; const r = stage.current.getBoundingClientRect(); setZ(`${((e.clientX - r.left) / r.width * 100).toFixed(1)}% ${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`); }}
        onMouseLeave={() => setZ(null)}>
        {render ? render(cur, z) : <img key={cur.src} className={cur.cut ? 'cut' : 'ph'} src={cur.src} alt={cur.alt || ''} style={z ? { transformOrigin: z, transform: 'scale(1.6)' } : undefined} />}
        {n > 1 && <><button className="nav l" onClick={() => go(-1)} aria-label="Previous image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 6-6 6 6 6" /></svg></button>
          <button className="nav r" onClick={() => go(1)} aria-label="Next image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" /></svg></button>
          <span className="cnt">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span></>}
      </div>
    </div>
  );
}

export const Check = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>;
