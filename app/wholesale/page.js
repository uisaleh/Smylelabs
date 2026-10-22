import Link from 'next/link';
import SiteForm, { Fld, Radios } from '@/components/SiteForm';
export const metadata = { title: 'Wholesale', description: 'Sign up for Smyle Labs wholesale or bulk quantity: retail stores, distributors and dispensaries.' };
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Mexico', 'Australia', 'Germany', 'Other'];
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Washington DC','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Outside the US'];

export default function Wholesale() {
  return (
    <section className="pg3">
      <div className="pg3-l">
        <p className="br">[wholesale]</p>
        <h1 className="up d1">Stock Smyle Labs<br />in your store</h1>
        <p className="lead">Sign up for wholesale or bulk quantity. Retail stores, distributors and dispensaries can apply with the form.</p>
        <div className="strip3">{['/assets/cut/carkey.webp', '/assets/inhaler/teal.webp', '/assets/cut/cup.webp', '/assets/cut/pen.webp', '/assets/cut/lipbalm.webp', '/assets/cut/raygun.webp'].map((s) => <img key={s} src={s} alt="" />)}</div>
        <ol className="num3">
          <li><b>01</b><span>Fill in your contact and business details.</span></li>
          <li><b>02</b><span>Our team reviews your application.</span></li>
          <li><b>03</b><span>Once approved, sign in to your wholesale account to order.</span></li>
        </ol>
        <p className="sm">Already approved? <Link className="ul" href="/account">Sign in</Link> · Questions? <Link className="ul" href="/contact">Contact us</Link></p>
      </div>
      <div>
        <h2 className="up d2" style={{ marginBottom: 10 }}>Signup for wholesale or bulk quantity</h2>
        <SiteForm form="wholesale" submitLabel="Submit application" success={<><b>Application sent</b><span>Thanks! Our team will review it and reach out by email.</span></>}>
          <h3>Primary contact details</h3>
          <div className="frow"><Fld id="first_name" label="First name" req /><Fld id="email" label="Email" type="email" req ph="you@companyname.com" /></div>
          <h3>Business details</h3>
          <Fld id="address1" label="Address line 1" req ph="Street, Main etc" />
          <Fld id="address2" label="Address line 2" ph="Apartment, suite, etc" />
          <div className="frow"><Fld id="city" label="City" req /><Fld id="zip" label="Postal code" req /></div>
          <div className="frow">
            <div className="fld req"><label htmlFor="country">Country</label><select id="country" name="country">{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div className="fld req"><label htmlFor="state">State / Province</label><select id="state" name="state" defaultValue="California">{STATES.map((c) => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div className="frow"><Fld id="company" label="Company name" req /><Fld id="phone" label="Phone" type="tel" req /></div>
          <div className="frow"><Fld id="website" label="Website or Instagram (optional)" /><Fld id="tax_id" label="Tax ID (retailers & distributors)" /></div>
          <h3>Account type</h3>
          <Radios name="account_type" options={['Retail Store', 'Distributor Store', 'Dispensary Store']} />
          <p className="xs g">Fields marked * are required.</p>
        </SiteForm>
      </div>
    </section>
  );
}
