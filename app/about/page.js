import Link from 'next/link';
export const metadata = { title: 'About us', description: 'Smyle Labs makes 510 batteries that don’t look like batteries. Designed in California, backed by 12,660 reviews.' };

export default function About() {
  return (
    <>
      <section className="abh">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28 }}>
          <p className="br">[About us]</p>
          <h1 className="up d1">We make the everyday<br />a little more fun</h1>
          <p style={{ fontSize: 15, lineHeight: 1.5, maxWidth: 460, color: '#4A4A4A' }}>Smyle Labs started in California with one simple idea: a cart battery should fit your life, not stand out in it. So we hide it inside things you already carry, an inhaler, a car key, a lip balm, a coffee cup, and we make every one with a smile.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px' }}><div><p className="d2">12,660+</p><p className="xs g">reviews at 4.7★</p></div><div><p className="d2">40+</p><p className="xs g">products</p></div><div><p className="d2">2–5 days</p><p className="xs g">free US shipping</p></div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <img src="/assets/photo/couple.webp" alt="Couple with the Heartjamin battery" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
          <img src="/assets/photo/purse-girl.webp" alt="Woman with a Pursejamin bag charm" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', marginTop: 64 }} />
        </div>
      </section>

      <section className="duo3" style={{ padding: '0 32px' }}>
        <div className="pan rule3" style={{ background: '#FFD800', minHeight: 520 }}><p className="br rl">[our rule]</p><div className="rt"><h2 className="up d2">Discreet first.<br />Fun always.</h2><p className="sm" style={{ maxWidth: 360, marginTop: 10 }}>Every product has to pass two tests: nobody should guess what it is, and it should make you smile when you reach for it.</p></div><img className="hero" src="/assets/cut/carkey.webp" alt="Car Key Penjamin" /></div>
        <div className="pan" style={{ minHeight: 520 }}><img className="bgp" src="/assets/photo/moon-woman.webp" alt="Woman holding the Moon Wand" /><p className="br" style={{ position: 'absolute', left: 28, top: 24, zIndex: 3, color: '#fff' }}>[made in California]</p></div>
      </section>

      <section className="sec3">
        <div className="sec3-h"><div><p className="br">[our story]</p><h2 className="up d2" style={{ marginTop: 8 }}>How we got here</h2></div><p className="sm" style={{ maxWidth: 300 }}>From one pen that is secretly a battery to a whole lineup of everyday disguises.</p></div>
        <div className="tl3">
          <div><div className="tl-img" style={{ aspectRatio: '4/5' }}><img className="c" src="/assets/cut/pen.webp" alt="" /></div><p className="yr">The start</p><h3>The first Penjamin</h3><p>A pen that is really a cart battery. The idea that started it all.</p></div>
          <div><div className="tl-img" style={{ aspectRatio: '4/5' }}><img className="c" src="/assets/cut/carkey.webp" alt="" /></div><p className="yr">Next</p><h3>Car Key</h3><p>Hides on your keyring. Became a fast favorite.</p></div>
          <div><div className="tl-img" style={{ aspectRatio: '4/5', background: '#E9C46A' }}><img className="c" src="/assets/inhaler/teal.webp" alt="" /></div><p className="yr">Then</p><h3>The Inhaler</h3><p>Our first battery with a built-in cloud filter.</p></div>
          <div><div className="tl-img" style={{ aspectRatio: '4/5' }}><img className="c" src="/assets/cut/raygun.webp" alt="" /></div><p className="yr">Growing</p><h3>Torches &amp; novelty</h3><p>Rayguns, sabers, wands and more joined the lineup.</p></div>
          <div><div className="tl-img" style={{ aspectRatio: '4/5' }}><img className="f" src="/assets/photo/moon-wand.webp" alt="" /></div><p className="yr">Today</p><h3>12,660 reviews</h3><p>And a lot of happy, slightly sneaky customers.</p></div>
        </div>
      </section>

      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[the team]</p><h2 className="up d2" style={{ marginTop: 8 }}>The people behind the smile</h2></div></div>
        <div className="fx team3">
          {[['founder', 'Founder'], ['design', 'Product design'], ['fulfillment', 'Fulfillment'], ['care', 'Customer care']].map(([f, r]) => (
            <div key={f}><img src={`/assets/team/${f}.jpg`} alt={`${r} team member`} /><p style={{ fontSize: 14, marginTop: 10 }}>{r}</p><p className="xs g">Smyle Labs, California</p></div>
          ))}
        </div>
      </section>

      <section className="sec3">
        <div className="sec3-h"><p className="br">[customers say]</p></div>
        <div className="rv3">
          <div className="rv3-sum"><span className="num">4.7</span><p style={{ fontSize: 18, letterSpacing: 3, marginTop: 6 }}>★★★★★</p><p className="sm g" style={{ marginTop: 6 }}>12,660 reviews across the store</p></div>
          <div className="rv3-item"><div className="who"><span>Jason S.</span><span>★★★★★</span></div><span className="xs g">Penjamin</span><p>Best battery ever. Not even close!</p></div>
          <div className="rv3-item"><div className="who"><span>Dennis C.</span><span>★★★★★</span></div><span className="xs g">Cup Cart</span><p>Great gift.</p></div>
          <div className="rv3-item"><div className="who"><span>Tammy L.</span><span>★★★★★</span></div><span className="xs g">Verified buyer</span><p>Don’t debate it, buy it!</p></div>
        </div>
      </section>

      <section className="sec3" style={{ textAlign: 'center', borderTop: '1px solid #E7E7E7' }}>
        <h2 className="up d1">Find your favorite</h2>
        <p className="sm g" style={{ margin: '12px 0 24px' }}>Free shipping from California · 2–5 business days</p>
        <Link className="bk" href="/shop" style={{ display: 'inline-flex' }}>Shop the catalog</Link>
      </section>
    </>
  );
}
