import { notFound } from 'next/navigation';
import ItemPage from '@/components/ItemPage';
import InhalerPage from '@/components/InhalerPage';
import { INHALER, PRODUCTS, byHandle, img } from '@/lib/catalog';
import { SITE } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}
export function generateMetadata({ params }) {
  const p = byHandle(params.handle);
  if (!p) return {};
  const desc = (p.intro || p.body.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim().slice(0, 155);
  return { title: p.name, description: desc, alternates: { canonical: p.href }, openGraph: { title: p.name, description: desc, images: p.images[0] ? [img(p.images[0], 1200)] : [] } };
}

export default function Page({ params }) {
  const p = byHandle(params.handle);
  if (!p) notFound();
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.title, image: p.images.slice(0, 4), description: p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500),
    brand: { '@type': 'Brand', name: 'Smyle Labs' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.rating, reviewCount: p.handle === INHALER ? 513 : SITE.reviewCount },
    offers: p.variants.map((v) => ({ '@type': 'Offer', sku: String(v.id), price: v.price.toFixed(2), priceCurrency: 'USD', availability: v.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', url: SITE.url + p.href }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {p.handle === INHALER ? <InhalerPage handle={p.handle} /> : <ItemPage handle={p.handle} />}
    </>
  );
}
