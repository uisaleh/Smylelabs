import Link from 'next/link';
import SiteForm, { Fld, Radios } from '@/components/SiteForm';
import { SITE } from '@/lib/site';
export const metadata = { title: 'Contact us', description: 'Text +1-805-660-9342, WhatsApp or email info@smylelabs.com. Monday–Friday, 10 AM–6 PM Pacific.' };

export default function Contact() {
  return (
    <section className="pg3">
      <div className="pg3-l">
        <p className="br">[contact us]</p>
        <h1 className="up d1">Real people,<br />quick replies</h1>
        <p className="lead">Our customer service is available {SITE.hours}. Fill out the form and our support team will get back to you within the same business day (except weekends).</p>
        <div className="ccard3">
          <a href={`sms:${SITE.phoneE164}`}><span>Text us</span><b>+1 805 660 9342</b></a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><b>Chat now</b></a>
          <a href={`mailto:${SITE.email}`}><span>Email</span><b>{SITE.email}</b></a>
        </div>
        <p className="sm">Wholesale or high-quantity orders? Use our <Link className="ul" href="/wholesale">wholesale form</Link>.</p>
      </div>
      <div>
        <h2 className="up d2" style={{ marginBottom: 16 }}>Send a message</h2>
        <SiteForm form="contact" submitLabel="Submit" success={<><b>Message sent</b><span>Thanks! We’ll reply within the same business day (except weekends).</span></>}>
          <div className="frow"><Fld id="name" label="Name" req /><Fld id="email" label="Email" type="email" req /></div>
          <div className="frow"><Fld id="phone" label="Phone number" type="tel" /><Fld id="order" label="Order number (optional)" /></div>
          <h3>What’s it about?</h3>
          <Radios name="topic" options={['My order', 'A product question', 'Working with Smyle Labs', 'Something else']} />
          <div className="fld req" style={{ marginTop: 10 }}><label htmlFor="comment">Comment</label><textarea id="comment" name="comment" required placeholder="How can we help?" /></div>
        </SiteForm>
      </div>
    </section>
  );
}
