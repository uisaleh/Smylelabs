import Link from 'next/link';
export default function NotFound() {
  return (<section className="sec3" style={{ textAlign: 'center', minHeight: '50vh' }}><p className="br">[404]</p><h1 className="up d1" style={{ marginTop: 12 }}>Nothing hiding here</h1><p className="sm g" style={{ margin: '12px 0 24px' }}>This page moved or never existed.</p><Link className="bk" href="/shop" style={{ display: 'inline-flex' }}>Shop the catalog</Link></section>);
}
