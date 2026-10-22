// Store-wide content cloned from smylelabs.com (contact info, policies, real reviews).
export const SITE = {
  name: 'Smyle Labs',
  url: 'https://smylelabs.com',
  phone: '(805) 660-9342',
  phoneE164: '+18056609342',
  whatsapp: 'https://wa.me/18056609342',
  email: 'info@smylelabs.com',
  hours: 'Monday – Friday, 10 AM – 6 PM Pacific',
  rating: 4.7,
  reviewCount: 12660,
  shipping: 'Free shipping from California · 2–5 business days in the US'
};

export const MENU = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Verify', href: '/verify' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Contact', href: '/contact' },
  { label: 'Account', href: '/account' }
];

// Inhaler quantity bundles (live pricing: Buy 2 save 11%, Buy 3 save 16%).
export const INHALER_TIERS = [
  { qty: 1, name: '1 Inhaler', total: 36.99, was: 0, save: '', each: 36.99 },
  { qty: 2, name: '2 Inhalers', total: 65.84, was: 73.98, save: 'Save 11%', each: 32.92 },
  { qty: 3, name: '3 Inhalers', total: 93.21, was: 110.97, save: 'Save 16%', each: 31.07 }
];
export const inhalerTotal = (n) => (n <= 3 ? INHALER_TIERS[n - 1].total : 93.21 + (n - 3) * 31.07);

// Live variant names -> transparent renders from the media kit.
export const INHALER_COLORS = [
  { variant: 'Blue', img: '/assets/inhaler/teal.webp', bg: '#E6F0F1' },
  { variant: 'Grey', img: '/assets/inhaler/stone.webp', bg: '#EEEEEC' },
  { variant: 'Pink', img: '/assets/inhaler/blush.webp', bg: '#F9E6EE' },
  { variant: 'Purple', img: '/assets/inhaler/grape.webp', bg: '#EEE6F1' },
  { variant: 'White', img: '/assets/inhaler/cloud.webp', bg: '#F7F7F7' }
];

// Real customer reviews (Loox, smylelabs.com).
export const REVIEWS = {
  inhaler: [
    { who: 'Amanda T.', stars: 5, text: 'I love it! It blends in well with my actual inhaler.', photo: '/assets/ugc/inhaler.webp' },
    { who: 'Anthony S.', stars: 5, text: 'I love that I can put this in my purse and no one can tell that it is a vape pen. Great quality. I am telling all my friends about it.' },
    { who: 'Rob G.', stars: 4, text: 'This lil thing is pretty darn cool!! Looks, handles and puffs as expected. Only thing that keeps this from getting 5 stars is where you puff it.' },
    { who: 'Karen B.', stars: 5, text: 'Very cute & works great.' },
    { who: 'Peggy W.', stars: 5, text: 'Works great and I love it!' },
    { who: 'Tammy L.', stars: 5, text: 'Don’t debate it, buy it!' }
  ],
  store: [
    { who: 'Amanda T.', product: 'Inhaler', text: 'I love it! It blends in well with my actual inhaler.', photo: '/assets/ugc/inhaler.webp', href: '/products/inhaler-cart-battery' },
    { who: 'Jason S.', product: 'Penjamin', text: 'Best battery ever. Not even close!', href: '/products/smyle-labs-pen' },
    { who: 'Tammy L.', product: 'Smyle Labs', text: 'Don’t debate it, buy it!', href: '/shop' },
    { who: 'Karen B.', product: 'Inhaler', text: 'Very cute & works great.', href: '/products/inhaler-cart-battery' },
    { who: 'Dennis C.', product: 'Cup Cart', text: 'Great gift.', href: '/products/cup-cart-510-battery-by-mrs-puff' },
    { who: 'Peggy W.', product: 'Inhaler', text: 'Works great and I love it!', href: '/products/inhaler-cart-battery' }
  ]
};

export const HOME_FAQ = [
  ['Are carts included?', 'No. Our batteries work with standard 510-thread carts, sold separately.'],
  ['How fast is shipping?', 'Free shipping from California. Orders generally arrive in 2–5 business days within the US.'],
  ['Will my cart fit?', 'If it is a standard 510-thread cart, yes. Each product page lists the cart sizes it fits.'],
  ['How do I know my product is genuine?', 'Scratch off the verification label on the back and enter the code on our Verify page.'],
  ['What if something breaks?', 'Manufacturer defects are covered by our warranty. Start a claim and we will repair, replace or send something comparable.'],
  ['Do I need to be 21?', 'Yes. Smyle Labs products are for adults 21 and over.']
];

export const VIDEOS = [
  ['different-ways-to-cu', 'Different ways to use it', 'Short cover, long cover, any 510 cart from 0.5 to 1.0g.'],
  ['filter', 'The cloud filter', 'Exhale into the base. The filter catches the vapor.'],
  ['variable-voltage', '4 voltages', 'Three quick presses: 2.2V, 2.7V, 3.1V, 3.6V.'],
  ['super-discreet', 'Super discreet', 'Looks like an everyday inhaler, in your bag or your hand.'],
  ['5-colors', '5 colors', 'Blue, Grey, Pink, Purple and White. Mix them in a bundle.'],
  ['cover-sizes', 'Two cover sizes', 'Short for 0.5g carts, long for 1.0g.'],
  ['usb-c-port', 'USB-C charging', 'Same cable as your phone.']
].map(([f, t, d]) => ({ src: `/assets/anim/${f}.webp`, title: t, desc: d }));
