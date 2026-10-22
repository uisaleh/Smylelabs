'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';

// NOTE: the live store verifies codes with its own system. Point NEXT_PUBLIC_VERIFY_ENDPOINT
// at that service (POST { code } -> { valid: boolean }) to make this check real.
const ENDPOINT = process.env.NEXT_PUBLIC_VERIFY_ENDPOINT;

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [res, setRes] = useState('');
  async function verify(e) {
    e.preventDefault();
    const c = code.trim();
    if (c.length < 6) return setRes('bad');
    if (!ENDPOINT) return setRes('pending');
    setRes('checking');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code: c }) });
      const j = await r.json();
      setRes(j.valid ? 'ok' : 'no');
    } catch (x) { setRes('pending'); }
  }
  return (
    <>
      <section className="pg3">
        <div className="pg3-l">
          <p className="br">[product verify]</p>
          <h1 className="up d1">Is it real?<br />Check in seconds</h1>
          <p className="lead">Scratch off the verification label on the back of your product and enter the code below.</p>
          <ol className="num3">
            <li><b>01</b><span>Find the verification label on the back of your product.</span></li>
            <li><b>02</b><span>Scratch it off to reveal your security code.</span></li>
            <li><b>03</b><span>Type the code below and press Verify.</span></li>
          </ol>
          <form className="form3" onSubmit={verify}>
            <div className="fld"><label htmlFor="vc">Security code</label><input id="vc" type="text" placeholder="Enter your security code" autoComplete="off" value={code} onChange={(e) => { setCode(e.target.value); setRes(''); }} /></div>
            <button className="bk full" type="submit">{res === 'checking' ? 'Checking…' : 'Verify'}</button>
          </form>
          {res === 'ok' && <div className="ok3" role="status"><b>Genuine Smyle Labs product</b><span>Code {code.toUpperCase()} checked. Thanks for buying the real thing.</span></div>}
          {res === 'no' && <div className="no3" role="status">We couldn’t match that code. Check the label and try again, or <Link className="ul" href="/contact">contact our team</Link>.</div>}
          {res === 'bad' && <div className="no3" role="status">That code doesn’t look complete. Check the label and try again.</div>}
          {res === 'pending' && <div className="no3" role="status">Thanks! Text your code to {SITE.phone} or email {SITE.email} and our team will confirm it for you.</div>}
        </div>
        <div className="panel3">
          <img className="pc" src="/assets/cut/carkey.webp" alt="" style={{ left: '8%', top: '10%', height: '34%', transform: 'rotate(-14deg)' }} />
          <img className="pc" src="/assets/inhaler/teal.webp" alt="" style={{ right: '8%', bottom: '8%', height: '44%', transform: 'rotate(10deg)' }} />
          <img className="pc" src="/assets/cut/lipbalm.webp" alt="" style={{ left: '12%', bottom: '8%', height: '28%', transform: 'rotate(8deg)' }} />
          <div className="tag3"><img src="/assets/brand/logo-black.webp" alt="Smyle Labs" style={{ height: 22, width: 'auto', alignSelf: 'flex-start' }} /><span className="xs g">Verification label · back of product</span><div className={'scr' + (res === 'ok' ? ' done' : '')}>{res === 'ok' ? code.toUpperCase().slice(0, 12) : 'Scratch here'}</div><span className="xs g">Scratch gently with a coin</span></div>
        </div>
      </section>
      <section className="sec3" style={{ background: '#F7F7F7' }}>
        <div className="sec3-h"><div><p className="br">[good to know]</p><h2 className="up d2" style={{ marginTop: 8 }}>Verify questions</h2></div></div>
        <div className="talk3">
          <div><b>Where is the label?</b><p>On the back of the product, as a scratch-off verification label.</p></div>
          <div><b>My code isn’t working</b><p>Double-check each character, then text us at {SITE.phone} or email {SITE.email}.</p></div>
          <div><b>Something wrong with your product?</b><p>Manufacturer defects are covered. <Link className="ul" href="/warranty">Start a warranty claim</Link>.</p></div>
        </div>
      </section>
    </>
  );
}
