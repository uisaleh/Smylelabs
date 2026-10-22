'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';

// Customer accounts live on the store (Shopify today, WooCommerce later).
// These forms post straight to the store's account endpoints, so sign-in is real.
const F = ({ id, name, label, type = 'text', req = true, ac }) => (
  <div className={'fld' + (req ? ' req' : '')}><label htmlFor={id}>{label}</label><input id={id} name={name} type={type} required={req} autoComplete={ac} /></div>
);

export default function AccountPage() {
  const [tab, setTab] = useState(0);
  const tabs = ['Login', 'Create account', 'Wholesale'];
  return (
    <section className="pg3 half">
      <div>
        <p className="br">[account]</p>
        <h1 className="up d1" style={{ margin: '12px 0 24px' }}>{tab === 1 ? 'Create an account' : 'Customer login'}</h1>
        <div className="tabs3" role="tablist" aria-label="Account">{tabs.map((t, i) => <button key={t} className={i === tab ? 'on' : ''} role="tab" aria-selected={i === tab} onClick={() => setTab(i)}>{t}</button>)}</div>
        {tab === 0 && (
          <form className="form3" method="post" action={`${SITE.url}/account/login`}>
            <input type="hidden" name="form_type" value="customer_login" /><input type="hidden" name="utf8" value="✓" />
            <F id="le" name="customer[email]" label="Email" type="email" ac="email" />
            <F id="lp" name="customer[password]" label="Password" type="password" ac="current-password" />
            <a className="sm ul" href={`${SITE.url}/account/login#recover`} style={{ justifySelf: 'start', padding: '8px 0' }}>Forgot your password?</a>
            <button className="bk full" type="submit">Sign in</button>
            <p className="sm g">New here? <button type="button" className="ul" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', padding: 0 }} onClick={() => setTab(1)}>Create an account</button></p>
          </form>
        )}
        {tab === 1 && (
          <form className="form3" method="post" action={`${SITE.url}/account`}>
            <input type="hidden" name="form_type" value="create_customer" /><input type="hidden" name="utf8" value="✓" />
            <div className="frow"><F id="cf" name="customer[first_name]" label="First name" ac="given-name" /><F id="cl" name="customer[last_name]" label="Last name" ac="family-name" /></div>
            <F id="ce" name="customer[email]" label="Email" type="email" ac="email" />
            <F id="cp" name="customer[password]" label="Password" type="password" ac="new-password" />
            <button className="bk full" type="submit">Create an account</button>
            <p className="xs g">By creating an account you confirm you are 21 or older.</p>
          </form>
        )}
        {tab === 2 && (
          <div className="form3"><div className="no3">Retail stores, distributors and dispensaries can apply for a wholesale account. Once approved, sign in here to order in bulk.</div>
            <Link className="bk full" href="/wholesale">Sign up for a wholesale account</Link></div>
        )}
      </div>
      <div className="panel3"><img className="ph" src="/assets/photo/purse-girl.webp" alt="Woman with a Pursejamin clipped to her bag" />
        <div style={{ position: 'absolute', left: 20, bottom: 20, right: 20, zIndex: 2, background: '#fff', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}><span className="sm">Save favorites, track orders, check out faster.</span><Link className="sm ul" href="/shop">Shop</Link></div>
      </div>
    </section>
  );
}
