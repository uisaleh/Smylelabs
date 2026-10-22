import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { Header, Footer } from '@/components/Chrome';
import AgeGate from '@/components/AgeGate';

export const metadata = {
  metadataBase: new URL('https://smylelabs.com'),
  title: { default: 'Smyle Labs | Discreet 510 Cart Batteries, Penjamin & Novelty Designs', template: '%s | Smyle Labs' },
  description: 'Discreet 510 cart batteries that don’t look like batteries: the Inhaler, Car Key, Cart Pen, Lip Balm, Cup Cart and more. Free shipping from California. 4.7★ from 12,660 reviews.',
  openGraph: { siteName: 'Smyle Labs', type: 'website' },
  icons: { icon: '/favicon.png' }
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#FFD800' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>
        <CartProvider>
          <div className="p3">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <AgeGate />
        </CartProvider>
      </body>
    </html>
  );
}
