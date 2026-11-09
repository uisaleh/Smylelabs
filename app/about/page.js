import { Btn, Head, Marquee, PageHero, Tag } from '@/components/v5';
import { PRODUCTS } from '@/lib/catalog';
export const metadata = { title: 'About us', description: 'Smyle Labs makes 510 batteries that don’t look like batteries. Designed in California, backed by 12,660 reviews.' };

const STORY = [
  ['The start', 'The first Penjamin', 'A real writing pen that is secretly a cart battery. The idea that started it all.', '/assets/photo/p-pen.webp'],
  ['Next', 'The Car Key', 'A battery that hides on your keyring. It quickly became a customer favorite with 3,000+ reviews.', '/assets/photo/p-carkey.webp'],
  ['Then', 'The Inhaler 510', 'Our first battery with a built-in cloud filter, and now our #1 bestseller.', '/assets/ugc/inhaler.webp'],
  ['Today', `${PRODUCTS.length} designs & 12,660 reviews`, 'Wands, tumblers, rayguns, torches and a lot of happy, slightly sneaky customers.', '/assets/photo/moon-wand.webp']
];

export default function About() {
  return (
    <>
      <PageHero tag="About Smyle Labs" title={<>We make the everyday<br />a little more fun.</>} text="Smyle Labs started in California with one simple idea: a cart battery should fit your life, not stand out in it." img="/assets/photo/couple.webp">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}><Btn href="/shop" className="lg">Shop the catalog</Btn><Btn href="/contact" kind="gh" className="lg">Talk to our team</Btn></div>
      </PageHero>

      <section className="v-sec v-white">
        <div className="v-wrap">
          <Head tag="Our rule" title={<>Discreet first.<br />Fun always.</>} text="Every product has to pass two tests: nobody should guess what it is, and it should make you smile when you reach for it." />
          <div className="v-met four">
            <div className="col o"><div className="v-mc y" data-r><div><h3>Verified reviews</h3><p>From real buyers across the store.</p></div><span className="v-num" data-count="12660" data-suf="+">12,660+</span></div></div>
            <div className="col"><div className="v-mc ph" data-r style={{ '--d': '80ms', minHeight: 380 }}><img src="/assets/photo/moon-woman.webp" alt="Woman holding the Moon Wand battery" /><span className="chip">Moon Wand</span></div></div>
            <div className="col o"><div className="v-mc" data-r style={{ '--d': '160ms' }}><div><h3>Designs</h3><p>Everyday lookalikes, novelty pieces and torches.</p></div><span className="v-num" data-count={PRODUCTS.length}>{PRODUCTS.length}</span></div></div>
            <div className="col"><div className="v-mc k" data-r style={{ '--d': '240ms' }}><div><h3>Made in California</h3><p>Designed, quality-checked and shipped from California.</p></div><span className="v-num">CA</span></div></div>
          </div>
        </div>
      </section>

      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="Our story" title={<>How we got here.</>} text="From one pen that is secretly a battery to a whole lineup of everyday disguises." />
          <div className="v-stl v-lines" style={{ paddingTop: 40 }}>
            <div className="v-stl-side"><div className="v-stl-bars">{STORY.map((s) => <i key={s[0]} />)}</div><div className="v-stl-n"><b>01</b>/ 0{STORY.length}</div></div>
            <div className="v-stl-list">
              {STORY.map(([yr, h, d, src]) => (
                <div className="v-stl-card" key={h}>
                  <div className="meta">{yr}<span>Smyle Labs</span></div>
                  <div className="im" style={{ cursor: 'default' }}><img src={src} alt={h} loading="lazy" /></div>
                  <div><h3>{h}</h3><p>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="The team" title={<>The people behind<br />the smile.</>} text="A small California crew that designs, packs and answers every message ourselves." btn="Contact us" href="/contact" />
          <div className="v-grid4">
            {[['founder', 'Founder', 'Dreams up the next disguise'], ['design', 'Product design', 'Makes it look like anything but a battery'], ['fulfillment', 'Fulfillment', 'Packs every order in a plain box'], ['care', 'Customer care', 'Replies to your texts, same day']].map(([f, r, d], i) => (
              <div className="v-team" key={f} data-r style={{ '--d': i * 80 + 'ms' }}><div className="im"><img src={`/assets/team/${f}.jpg`} alt={`${r} team member`} /></div><b>{r}</b><span>{d}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="v-sec t0" style={{ overflow: 'hidden' }}>
        <div className="v-wrap"><Head tag="Customers say" title={<>12,660 reviews<br />at 4.7★.</>} /></div>
        <Marquee speed={50}>
          <div className="v-rv">
            {[['Best battery ever. Not even close!', 'Jason S.', 'Penjamin'], ['I love it! It blends in well with my actual inhaler.', 'Amanda T.', 'Inhaler 510'], ['Great gift.', 'Dennis C.', 'Cup Cart'], ['Don’t debate it, buy it!', 'Tammy L.', 'Verified buyer'], ['Very cute & works great.', 'Karen B.', 'Inhaler 510']].map(([q, w, p]) => (
              <div className="v-rq" key={w}><span className="st">★★★★★</span><q>{q}</q><div className="who"><i>{w[0]}</i><div><b>{w}</b><span>{p}</span></div></div></div>
            ))}
            <div className="v-rp"><img src="/assets/photo/purse-girl.webp" alt="Customer with the Pursejamin" /><div className="who"><b>Pursejamin</b><span>Bag charm battery</span></div></div>
          </div>
        </Marquee>
      </section>

      <section className="v-cta" style={{ marginBottom: 12 }}>
        <img src="/assets/photo/moon-wand.webp" alt="" />
        <div className="in" data-r>
          <Tag dark>Free shipping from California</Tag>
          <h2 className="v-h2">Find your favorite.</h2>
          <p className="v-p">{PRODUCTS.length} designs, all shipped free in 2–5 business days.</p>
          <div className="row"><Btn href="/shop" className="lg">Shop the catalog</Btn><Btn href="/wholesale" kind="gh" className="lg">Wholesale inquiries</Btn></div>
        </div>
      </section>
    </>
  );
}
