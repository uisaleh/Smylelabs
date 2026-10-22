// Receives Contact / Wholesale / Warranty submissions.
// Set FORMS_WEBHOOK_URL in Vercel (Zapier, Make, Slack, Formspree, n8n…) to receive them.
export async function POST(req) {
  let data = {};
  try { data = await req.json(); } catch (e) { return Response.json({ ok: false, error: 'Invalid body' }, { status: 400 }); }
  const payload = { ...data, receivedAt: new Date().toISOString(), site: 'smylelabs-web' };
  const hook = process.env.FORMS_WEBHOOK_URL;
  if (hook) {
    const r = await fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => null);
    if (!r || !r.ok) return Response.json({ ok: false, error: 'Could not deliver the form. Please text or email us.' }, { status: 502 });
  } else {
    console.log('[form] (no FORMS_WEBHOOK_URL set)', JSON.stringify(payload));
  }
  return Response.json({ ok: true });
}
