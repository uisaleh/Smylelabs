'use client';
import { useState } from 'react';

/** Posts all named fields to /api/form. Shows `success` after a 200. */
export default function SiteForm({ form, children, success, submitLabel = 'Submit' }) {
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  async function onSubmit(e) {
    e.preventDefault();
    setState('sending'); setErr('');
    const fd = new FormData(e.currentTarget);
    const fields = {}; for (const [k, v] of fd.entries()) { if (typeof v === 'string') fields[k] = v; else if (v && v.name) fields[k] = (fields[k] ? fields[k] + ', ' : '') + v.name; }
    try {
      const r = await fetch('/api/form', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ form, fields }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || 'Something went wrong');
      setState('sent');
    } catch (x) { setState('idle'); setErr(x.message); }
  }
  if (state === 'sent') return <div className="ok3" role="status">{success}</div>;
  return (
    <form className="form3" onSubmit={onSubmit}>
      {children}
      {err && <div className="no3" role="alert">{err}</div>}
      <button className="bk full" style={{ marginTop: 12 }} type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : submitLabel}</button>
    </form>
  );
}

export const Fld = ({ id, label, req, type = 'text', ph, ...rest }) => (
  <div className={'fld' + (req ? ' req' : '')}><label htmlFor={id}>{label}</label><input id={id} name={id} type={type} placeholder={ph} required={!!req} {...rest} /></div>
);
export function Radios({ name, options }) {
  const [v, setV] = useState(0);
  return (
    <div role="radiogroup" aria-label={name}>
      <input type="hidden" name={name} value={options[v]} />
      {options.map((o, i) => <button type="button" key={o} className={'opt3' + (i === v ? ' on' : '')} role="radio" aria-checked={i === v} onClick={() => setV(i)}><span className="rd" /><span>{o}</span><span /></button>)}
    </div>
  );
}
