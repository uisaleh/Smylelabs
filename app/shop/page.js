import { Suspense } from 'react';
import ShopPage from '@/components/ShopPage';
export const metadata = { title: 'Shop all', description: 'Every Smyle Labs product: discreet 510 cart batteries, novelty Penjamins, kitchen torches, accessories and apparel.' };
export default function Page() { return <Suspense fallback={null}><ShopPage /></Suspense>; }
