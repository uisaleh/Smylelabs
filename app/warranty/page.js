import Link from 'next/link';
import SiteForm, { Fld } from '@/components/SiteForm';
import { PRODUCTS } from '@/lib/catalog';
import { SITE } from '@/lib/site';
export const metadata = { title: 'Warranty claim', description: 'Smyle Labs covers manufacturer defects. Start a warranty claim for a repair, replacement or comparable product.' };

export default function Warranty() {
  return (
    <>
      <section className="sec3" style={{ paddingBottom: 40 }}>
        <p className="br">[warranty]</p>
        <h1 className="up d1" style={{ marginTop: 12 }}>Smyle Labs<br />warranty info</h1>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: '#3A3A3A', maxWidth: 560, marginTop: 18 }}>If you’ve submitted a warranty claim and haven’t heard back, or if you’re having trouble submitting one, <Link className="ul" href="/contact">contact our team</Link>.</p>
      </section>
      <section className="wrap-pad">
        <div className="info4">
          <div><p className="br">01</p><h3>What’s covered</h3><p>We cover manufacturer defects on Smyle Labs products. Coverage varies depending on the product, so check your product packaging or manual for specific warranty details.</p></div>
          <div><p className="br">02</p><h3>What’s not covered</h3><p>Our warranty doesn’t apply to damage caused by dropping, water exposure, misuse, third-party modifications, or general wear and tear. Mouthpieces, cartridges, and consumable parts are also not covered.</p></div>
          <div><p className="br">03</p><h3>What you’ll need</h3><ul><li>Proof of purchase</li><li>A description of the issue</li><li>Photos or a short video showing the defect (if possible)</li></ul></div>
          <div style={{ background: '#FFD800' }}><p className="br" style={{ color: '#131313' }}>04</p><h3>What happens next</h3><p style={{ color: '#131313' }}>Once we review your claim, we’ll decide whether to repair, replace, or offer a comparable product. If your item’s no longer available, we’ll send something similar or better.</p></div>
        </div>
      </section>
      <section className="pg3" style={{ borderTop: '1px solid #E7E7E7', paddingTop: 64 }}>
        <div className="pg3-l"><h2 className="up d2">Start a claim</h2><p className="lead">Tell us what happened. The more detail and photos you share, the faster we can help.</p><p className="sm">Prefer to talk? Text or WhatsApp <a className="ul" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{SITE.phone}</a>, Mon–Fri 10 AM–6 PM PT.</p></div>
        <div>
          <SiteForm form="warranty" submitLabel="Submit claim" success={<><b>Claim received</b><span>Thanks. We’ll review it and email you about a repair, replacement or comparable product.</span></>}>
            <div className="frow"><Fld id="name" label="Full name" req /><Fld id="email" label="Email" type="email" req /></div>
            <div className="frow"><Fld id="order" label="Order number" req ph="#1001" /><Fld id="purchase_date" label="Purchase date" type="date" /></div>
            <div className="fld req"><label htmlFor="product">Product</label><select id="product" name="product">{PRODUCTS.map((p) => <option key={p.handle}>{p.name}</option>)}<option>Other</option></select></div>
            <div className="fld req"><label htmlFor="issue">Describe the issue</label><textarea id="issue" name="issue" required placeholder="What happened, and when?" /></div>
            <label className="drop3" htmlFor="files"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 20h16" /></svg><span>Upload photos, video or receipt</span><span className="xs g">We’ll ask you to send the files by email or text after you submit</span><input id="files" name="files" type="file" multiple accept="image/*,video/*,application/pdf" style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} /></label>
          </SiteForm>
        </div>
      </section>
    </>
  );
}
