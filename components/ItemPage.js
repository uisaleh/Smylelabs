'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Heart } from '@/components/ui';
import { Btn, ChatQA, Check, Gallery, Head, Hotspots, Marquee, PCard, Tag } from '@/components/v5';
import { Details, FloatBar, Ship, Trust, useWatch } from '@/components/pdp';
import { CATEGORIES, byHandle, img, money, related, thumb, tierTotal } from '@/lib/catalog';
import { REVIEWS, SITE } from '@/lib/site';

function kind(p) {
  if (p.cats.includes('torches')) return 'torch';
  if (p.cats.includes('batteries')) return 'battery';
  if (p.cats.includes('apparel')) return 'apparel';
  return 'part';
}

function qa(p) {
  const k = kind(p);
  const fit = p.features.find((f) => /g carts|g cart|cart sizes/i.test(f));
  const usb = /usb-c/i.test(p.features.join(' ') + p.body);
  const common = [
    ['When will it get here?', 'It ships free from California and usually lands in 2–5 business days, in a plain box with no logos.'],
    ['What if something’s wrong with it?', `Manufacturer defects are covered by our warranty. Text us at ${SITE.phone} and real people will sort it out.`]
  ];
  if (k === 'battery') return [
    ['Will my cart fit?', 'It uses the standard 510 thread, so standard 510 carts screw right in. ' + (fit ? fit + '.' : 'The details above list the sizes.')],
    ['Will anyone know what it is?', 'That’s the whole idea. It’s designed to look like ' + (p.cats.includes('discreet') ? 'an everyday object, so it blends right in.' : 'a fun collectible first and a battery second.')],
    ['How do I charge it?', (usb ? 'With USB-C, the same cable as most phones.' : 'The full description shows how this one powers up.')],
    ['Is a cart included?', 'No, carts (oil) are sold separately. This is the battery only.'],
    ...common
  ];
  if (k === 'torch') return [
    ['Is butane included?', 'No. It refills with any standard butane can. Fill it, wait a moment, then light.'],
    ['Is it safe to carry?', (/safety lock/i.test(p.body + p.features.join(' ')) ? 'It has a safety lock so it won’t ignite by accident. ' : '') + 'Always keep torches away from children.'],
    ['What can I use it for?', 'Kitchen jobs like crème brûlée, searing and toasting, with a lot more style than a plain torch.'],
    ...common
  ];
  if (k === 'apparel') return [
    ['How does it fit?', 'Unisex fit. Pick your size or style from the options above.'],
    ['Not sure on sizing?', `Text or WhatsApp us at ${SITE.phone} and we’ll help you pick.`],
    ...common
  ];
  const pack = p.title.match(/(\d)[- ]?Pack/i);
  return [
    ['Will it work with mine?', 'It’s made for Smyle Labs products. The description above lists which ones.'],
    ['How many do I get?', pack ? `It’s a ${pack[1]}-pack, like it says in the name.` : 'One per order. Use the quantity selector to add more.'],
    ...common
  ];
}

function steps(p) {
  const k = kind(p);
  const im = (i) => (p.images[i] ? img(p.images[i], 700) : p.cut || img(p.images[0], 700));
  if (k === 'battery') return [
    [im(1), 'Pick your style', p.option && p.variants.length > 1 ? `${p.variants.length} ${p.option.toLowerCase()}s to choose from. Bundle and mix them.` : 'One look, done right. Add a second for the car.'],
    ['/assets/inhaler/step-cart.webp', 'Screw in any 510 cart', 'Standard 510 thread. Twist it in and you’re set.', true],
    [im(2), 'Press and go', 'Use it anywhere. When it’s low, plug it in to charge.']
  ];
  if (k === 'torch') return [
    [im(1), 'Fill it with butane', 'Any standard butane can. Let it settle for a moment.'],
    [im(2), 'Unlock and light', 'Flip the safety, press the trigger, adjust the flame.'],
    [im(3), 'Cook with style', 'Crème brûlée, searing, toasting. Then lock it again.']
  ];
  return null;
}

// Custom artwork + callouts for the "So, what is it?" section.
const MEET = {
  'foojamin-cart-battery-mystery-drop-limited-edition': {
    src: '/assets/cut/foojamin.webp',
    spots: [
      { cx: 49.9, cy: 27.5, x: 18, y: 22, title: 'Standard 510 thread', text: 'Cartridge not included.' },
      { cx: 27.6, cy: 74, x: 18, y: 78, title: 'About 3 inches tall', text: 'Pocket-sized, with a solid, premium feel.' },
      { cx: 59.4, cy: 50, x: 82, y: 22, side: 'r', title: '1 of 5 mystery colors', text: 'Black, Red, Grey, Blue or the rare Orange.' },
      { cx: 69.6, cy: 62, x: 82, y: 78, side: 'r', title: 'Power button + USB-C', text: 'Built-in button and convenient charging.' }
    ]
  },
  'controller-adapter-510-cart-battery': {
    src: '/assets/cut/controller-adapter.webp',
    spots: [
      { cx: 49.5, cy: 39.4, x: 18, y: 22, title: 'Twist in your cart', text: 'Standard 510 thread, right on your controller.' },
      { cx: 46, cy: 65, x: 18, y: 78, title: 'Magnetic mount', text: 'Plates attach to your controller. Snap the battery on.' },
      { cx: 64.2, cy: 30.5, x: 82, y: 22, side: 'r', title: 'Stays out of your grip', text: 'Lightweight, close at hand during gameplay.' },
      { cx: 50.2, cy: 69.8, x: 82, y: 78, side: 'r', title: '4 voltages + preheat', text: 'USB-C charging and a 300 mAh battery.' }
    ]
  },
  'football-cart-battery-limited-edition': {
    src: '/assets/cut/football.webp',
    spots: [
      { cx: 49.5, cy: 44, x: 36, y: 26, title: 'Standard 510 thread', text: 'Easy to use with compatible cartridges.' },
      { cx: 47, cy: 83, x: 36, y: 76, title: 'Just 2.5 inches tall', text: 'Small enough to carry or display anywhere.' },
      { cx: 50.5, cy: 63, x: 64, y: 34, side: 'r', title: 'Mini football design', text: 'That playful Smyle Labs look, game-day ready.' },
      { cx: 54.5, cy: 72, x: 64, y: 74, side: 'r', title: 'USB-C rechargeable', text: 'Powering up is simple.' }
    ]
  },
  'pixel-torch': {
    src: '/assets/cut/pixel-torch.webp',
    spots: [
      { cx: 47.4, cy: 48.3, x: 22, y: 30, title: 'Reliable ignition', text: 'High-performance and easy to light.' },
      { cx: 55.4, cy: 80, x: 22, y: 76, title: 'Secret stash drawer', text: 'A hidden compartment slides out of the base.' },
      { cx: 61.2, cy: 27, x: 78, y: 22, side: 'r', title: 'Adjustable flame', text: 'Great for cooking, baking and the kitchen.' },
      { cx: 64.6, cy: 50, x: 78, y: 66, side: 'r', title: 'Yellow, Red or Blue', text: 'Pixel-art design, durable and portable.' }
    ]
  },
  'torch-penjamin-cart-battery-limited-edition': {
    src: '/assets/cut/torch-penjamin.webp',
    spots: [
      { cx: 40.4, cy: 42.5, x: 30, y: 26, title: 'Pixel-inspired torch design', text: 'A game-style look that stands out.' },
      { cx: 40.4, cy: 77, x: 30, y: 76, title: 'Compact 4.4 inches', text: 'A solid grip that fits in your pocket.' },
      { cx: 55.4, cy: 25.7, x: 70, y: 22, side: 'r', title: 'Top-load 510 thread', text: 'Works with all standard 510 carts.' },
      { cx: 52.2, cy: 56.5, x: 70, y: 66, side: 'r', title: 'USB-C charging', text: 'Fast, convenient power-ups.' }
    ]
  },
  'tnt-penjamin-cart-battery-limited-edition': {
    src: '/assets/cut/tnt.webp',
    spots: [
      { cx: 45.3, cy: 52, x: 34, y: 26, title: 'Pixelated TNT design', text: 'A retro gaming look that starts conversations.' },
      { cx: 43.9, cy: 72, x: 34, y: 76, title: 'Just 2.1 inches wide', text: 'Palm-sized, small enough to fit in your hand.' },
      { cx: 50.5, cy: 48, x: 66, y: 24, side: 'r', title: 'Universal 510 thread', text: 'Twist on any standard cart.' },
      { cx: 58, cy: 81, x: 66, y: 72, side: 'r', title: 'USB-C charging', text: 'Power up with the same cable as your phone.' }
    ]
  },
  'downstem-soaker-by-smyle-labs': {
    src: '/assets/cut/downstem-soaker.webp',
    spots: [
      { cx: 51, cy: 24, x: 36, y: 22, title: 'Clean in 30 seconds', text: 'Insert, add your cleaner, shake. Done.' },
      { cx: 48.5, cy: 83, x: 36, y: 76, title: 'Reusable + eco-friendly', text: 'A durable alternative to makeshift solutions.' },
      { cx: 52.5, cy: 39, x: 64, y: 28, side: 'r', title: 'Silicone cap included', text: 'Seals the tube so you can shake it.' },
      { cx: 52.5, cy: 62, x: 64, y: 70, side: 'r', title: 'High-quality glass tube', text: 'Designed to last. No more broken stems.' }
    ]
  },
  'danksaber': {
    src: '/assets/cut/danksaber.webp',
    spots: [
      { cx: 49, cy: 40, x: 36, y: 26, title: 'Light-up saber design', text: 'Lights up the night. Your cart hides inside.' },
      { cx: 49, cy: 80, x: 36, y: 76, title: 'USB-C cable included', text: 'Charge up and take it anywhere.' },
      { cx: 51, cy: 16, x: 64, y: 22, side: 'r', title: 'Fits 0.5g to 2g carts', text: 'Standard 510 cartridges (not included).' },
      { cx: 51, cy: 69, x: 64, y: 68, side: 'r', title: 'Adjustable voltage + preheat', text: 'Set it with the button. Tailor every session to you.' }
    ]
  },
  'penjamin-car-key-tip-replacement': {
    src: '/assets/cut/carkey-tip.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 35.4, cy: 21, x: 20, y: 22, title: 'Hole at the top', text: 'Your aroma passes through privately and discreetly.' },
      { cx: 34.5, cy: 63, x: 20, y: 76, title: 'Easy to clean', text: 'Rinse with warm water and dish soap.' },
      { cx: 64, cy: 30, x: 80, y: 26, side: 'r', title: 'High-quality plastic', text: 'A leak-proof fit on your Penjamin Car Key.' },
      { cx: 64, cy: 79.5, x: 80, y: 74, side: 'r', title: '2 tips per pack', text: 'Made for the new Penjamin Car Key by Smyle Labs.' }
    ]
  },
  'ninja-flashlight-battery': {
    src: '/assets/cut/ninja.webp',
    spots: [
      { cx: 46, cy: 14, x: 28, y: 22, title: 'Twist-on 510', text: 'Twist your accessories right onto the top.' },
      { cx: 41, cy: 75, x: 28, y: 76, title: 'Ninja head design', text: 'Discreet, stylish and a real conversation starter.' },
      { cx: 53, cy: 14, x: 72, y: 28, side: 'r', title: 'Flashlight bulb included', text: 'Powerful, clear light for nighttime adventures.' },
      { cx: 59, cy: 79, x: 72, y: 72, side: 'r', title: 'Extended battery life', text: 'Fewer recharges, built to last.' }
    ]
  },
  'cart-pen-replacement-tip': {
    src: '/assets/cut/pen-tip.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 37, cy: 12, x: 22, y: 22, title: 'Hole at the top', text: 'Your aroma passes through privately and discreetly.' },
      { cx: 37, cy: 78, x: 22, y: 76, title: 'Easy to clean', text: 'Rinse with warm water and dish soap.' },
      { cx: 63, cy: 42.5, x: 78, y: 30, side: 'r', title: 'High-quality silicone', text: 'A leak-proof fit on your Penjamin Cart Pen.' },
      { cx: 63, cy: 78, x: 78, y: 72, side: 'r', title: '2 tips per pack', text: 'Made for the new Penjamin by Smyle Labs.' }
    ]
  },
  'penjamin-cart-pen-ink-replacement': {
    src: '/assets/cut/pen-ink.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 41, cy: 31, x: 20, y: 24, title: 'Twist, pull, push in', text: 'Twist off the old tip, push the new one in.' },
      { cx: 25.3, cy: 87, x: 20, y: 76, title: 'Smooth ballpoint tip', text: 'Your Penjamin writes like new again.' },
      { cx: 72.3, cy: 12, x: 80, y: 24, side: 'r', title: '2 refills per pack', text: 'Keep writing without buying a new battery.' },
      { cx: 59, cy: 66.5, x: 80, y: 72, side: 'r', title: 'Made for the new Penjamin', text: 'Designed for the Penjamin Cart Pen by Smyle Labs.' }
    ]
  },
  'wandjamin-battery-by-smyle-labs': {
    src: '/assets/cut/wandjamin.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 45.5, cy: 55, x: 34, y: 28, title: 'Glowing LED button', text: 'Hold it 10 seconds and something magical happens.' },
      { cx: 42.5, cy: 71, x: 34, y: 76, title: '3 voltages + preheat', text: '2.6V, 3.0V or 3.6V. Cart not included.' },
      { cx: 60, cy: 9.5, x: 66, y: 22, side: 'r', title: 'Any cart on top', text: 'All cartridges work on the tip of the wand.' },
      { cx: 60, cy: 50.5, x: 66, y: 66, side: 'r', title: 'Magic slider hides your cart', text: 'Works with 1g and 0.5g carts.' }
    ]
  },
  'penjamin-car-key-cartridge-magnet-replacement-2-pack': {
    src: '/assets/cut/cart-magnet.webp',
    spots: [
      { cx: 35, cy: 36, x: 20, y: 24, title: 'Threaded inside', text: 'Twist onto the bottom of your cart. Don’t overtighten.' },
      { cx: 35, cy: 66, x: 20, y: 76, title: 'Golden magnet piece', text: 'Holds your cart securely in place.' },
      { cx: 65, cy: 36, x: 80, y: 24, side: 'r', title: '2 pieces per pack', text: 'One to use, one spare.' },
      { cx: 65, cy: 66, x: 80, y: 76, side: 'r', title: 'For Danksaber + Car Key', text: 'Drop your cart into your Smyle Labs device.' }
    ]
  },
  'red-ball-flashlight-battery': {
    src: '/assets/cut/red-ball.webp',
    spots: [
      { cx: 49.2, cy: 26.6, x: 33, y: 24, title: 'Twist-on 510', text: 'Twist your accessories right onto the top.' },
      { cx: 44, cy: 80, x: 33, y: 76, title: 'Palm-sized sphere', text: 'Fits comfortably in your hand.' },
      { cx: 52, cy: 14.6, x: 67, y: 20, side: 'r', title: 'Flashlight bulb included', text: 'A powerful beam for nighttime adventures.' },
      { cx: 50.5, cy: 60.3, x: 67, y: 70, side: 'r', title: 'Contrasting button', text: 'Durable build made for everyday carry.' }
    ]
  },
  'lavender-aromatherapy-mist-cartridge-kit': {
    src: '/assets/cut/aroma-cart.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 40.8, cy: 21.7, x: 34, y: 22, title: '0.2mL aromatherapy cartridge', text: 'Fresh lavender with hints of sweet earthiness.' },
      { cx: 40.8, cy: 57, x: 34, y: 72, title: 'Metal fan included', text: 'Comes in the kit with your cartridge.' },
      { cx: 58.1, cy: 39.4, x: 66, y: 28, side: 'r', title: 'Plant-based formula', text: 'Made for moments of peace and balance.' },
      { cx: 54.2, cy: 85.3, x: 66, y: 76, side: 'r', title: 'Twists onto your Penjamin', text: 'Standard thread, ready in seconds.' }
    ]
  },
  'permanent-marker-cart-battery-by-smyle-labs': {
    src: '/assets/cut/marker-pen.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 54.5, cy: 34.3, x: 34, y: 24, title: 'Hides carts up to 4g', text: 'Fits 0.5g up to 4.0g carts inside.' },
      { cx: 42.2, cy: 88, x: 34, y: 76, title: 'Working permanent marker', text: 'It really writes, so it looks the part.' },
      { cx: 58.5, cy: 14.3, x: 66, y: 22, side: 'r', title: 'Extra tall cap included', text: 'For the bigger carts.' },
      { cx: 60, cy: 45.2, x: 66, y: 66, side: 'r', title: 'Preheat + variable voltage', text: 'Plus a USB-C port for charging.' }
    ]
  },
  'penjamin-marker-replacement-ink-tips-2-pack': {
    src: '/assets/cut/marker-tips.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#6A6A66 0%,#2E2E2C 60%,#161616 100%)',
    spots: [
      { cx: 37.1, cy: 25, x: 28, y: 22, title: 'Permanent ink tip', text: 'A fresh writing experience every time.' },
      { cx: 38.1, cy: 75.7, x: 28, y: 76, title: 'Insert and go', text: 'Simply push it into the marker body.' },
      { cx: 61.7, cy: 17.4, x: 72, y: 24, side: 'r', title: 'Clear protective cap', text: 'Keeps the tip fresh until you need it.' },
      { cx: 61.3, cy: 58.8, x: 72, y: 72, side: 'r', title: '2 tips per pack', text: 'Made for the Penjamin Marker by Smyle Labs.' }
    ]
  },
  'smyle-clothing': {
    src: '/assets/cut/smyle-hoodie.webp', bg: 'radial-gradient(55% 65% at 50% 52%,#5A5A57 0%,#2A2A28 60%,#161616 100%)',
    spots: [
      { cx: 45.6, cy: 43.4, x: 25, y: 26, title: 'Yellow Smyle logo', text: 'The signature script, front and center.' },
      { cx: 48.5, cy: 71.5, x: 25, y: 76, title: 'Cozy front pocket', text: 'Hoodies made for comfort, home or outdoors.' },
      { cx: 52, cy: 19, x: 75, y: 24, side: 'r', title: '10 styles to pick from', text: 'Hoodies, hats, tees, socks, shoes and more.' },
      { cx: 66.5, cy: 75, x: 75, y: 72, side: 'r', title: 'Premium materials', text: 'Feel good and do good with every purchase.' }
    ]
  },
  'mini-plug-510-cart-battery': {
    src: '/assets/cut/mini-plug.webp',
    spots: [
      { cx: 45.7, cy: 49.2, x: 37, y: 30, title: 'Full-color LED display', text: 'Voltage and battery level at a glance.' },
      { cx: 45.2, cy: 84, x: 37, y: 76, title: 'Built-in USB-C cable', text: 'Tucks into the body. Plug in anywhere.' },
      { cx: 56.5, cy: 20, x: 63, y: 24, side: 'r', title: 'Pocket-sized', text: 'Compact and discreet, made for life on the go.' },
      { cx: 53, cy: 68.5, x: 63, y: 70, side: 'r', title: 'Adjustable voltage', text: 'Dial it in with the + and − buttons.' }
    ]
  },
  'heartjamin-cart-battery': {
    src: '/assets/cut/heartjamin.webp',
    spots: [
      { cx: 44.4, cy: 29.3, x: 34, y: 24, title: 'Steady 3.6V output', text: 'Simple button activation on each half.' },
      { cx: 48, cy: 81.7, x: 34, y: 76, title: 'USB-C charging', text: 'Built right into each battery.' },
      { cx: 51.6, cy: 55.6, x: 66, y: 32, side: 'r', title: 'Magnetic halves', text: 'They snap together to form one heart.' },
      { cx: 57.4, cy: 70, x: 66, y: 72, side: 'r', title: '2 batteries in 1', text: 'Share one side with your partner, or keep both.' }
    ]
  },
  'robotjamin-cart-battery': {
    src: '/assets/cut/robotjamin.webp',
    spots: [
      { cx: 44.2, cy: 20, x: 26, y: 22, title: '3 voltage settings', text: '3.0V, 3.4V or 3.7V with 3 quick clicks.' },
      { cx: 37.6, cy: 80, x: 26, y: 76, title: 'Moving arms + gliding wheels', text: 'Plus robotic sounds and motion detection.' },
      { cx: 56.8, cy: 41, x: 74, y: 28, side: 'r', title: 'LED robot eyes', text: 'It blinks, talks and vibes.' },
      { cx: 53.8, cy: 74.7, x: 74, y: 72, side: 'r', title: 'Full remote control', text: '2.4GHz controller with walkie-talkie mode, up to 75 ft.' }
    ]
  },
  'moon-wand-cart-battery-limited-edition': {
    src: '/assets/cut/moon-wand.webp',
    spots: [
      { cx: 37.1, cy: 33, x: 28, y: 24, title: 'LED lights in the orb', text: 'They glow through the chrome for a light show.' },
      { cx: 37.9, cy: 55, x: 28, y: 72, title: 'Discreet fire button', text: 'Built into the pastel pink handle.' },
      { cx: 57.4, cy: 55.5, x: 72, y: 26, side: 'r', title: '510 thread on top', text: 'Twist any standard cart onto the orb.' },
      { cx: 59, cy: 72, x: 72, y: 72, side: 'r', title: 'Built-in sound speaker', text: 'Magical sound effects every time. Runs on 2x AA (not included).' }
    ]
  },
  'luna-wand-cart-battery-limited-edition': {
    src: '/assets/cut/luna-wand.webp',
    spots: [
      { cx: 49.6, cy: 23, x: 35, y: 22, title: 'Universal 510 thread', text: 'Twist on any standard cart.' },
      { cx: 49.7, cy: 67.6, x: 35, y: 74, title: 'Discreet fire button', text: 'Built right into the handle. USB-C charging too.' },
      { cx: 52.9, cy: 41.8, x: 65, y: 32, side: 'r', title: 'Red-to-pink chrome moon', text: 'Topped with a little golden crown.' },
      { cx: 51.5, cy: 60, x: 65, y: 66, side: 'r', title: 'Jeweled heart + wings', text: 'Butterfly wing details and gold accents.' }
    ]
  },
  'balisong-butterfly-cart-battery': {
    src: '/assets/cut/balisong.webp',
    spots: [
      { cx: 46.7, cy: 45, x: 27, y: 26, title: 'Flip-open butterfly handle', text: 'Metal hardware reinforces the pivot points.' },
      { cx: 38.7, cy: 63.3, x: 27, y: 72, title: 'Textured handle inserts', text: 'Extra grip, plus glow-in-the-dark on Glow Blue.' },
      { cx: 53.2, cy: 19, x: 73, y: 20, side: 'r', title: 'Universal 510 thread', text: 'Works with most standard cartridges.' },
      { cx: 57, cy: 57, x: 73, y: 70, side: 'r', title: '5.7 inches closed', text: 'Protects your cart and charges with USB-C.' }
    ]
  },
  'basketball-cart-battery-limited-edition': {
    src: '/assets/cut/basketball.webp',
    spots: [
      { cx: 49.9, cy: 33.6, x: 35, y: 28, title: 'Standard 510 thread', text: 'Easy to use with compatible cartridges.' },
      { cx: 45.3, cy: 64, x: 35, y: 74, title: 'Mini basketball design', text: 'That playful Smyle Labs look, full-court.' },
      { cx: 57.1, cy: 56, x: 65, y: 42, side: 'r', title: 'Just 2.5 inches tall', text: 'Small enough to carry or display anywhere.' },
      { cx: 57.6, cy: 80, x: 65, y: 76, side: 'r', title: 'USB-C rechargeable', text: 'Powering up is simple.' }
    ]
  },
  'tung-tung-sahur-cart-battery': {
    src: '/assets/cut/tung-tung-sahur.webp',
    spots: [
      { cx: 36, cy: 19, x: 29, y: 20, title: 'Moveable arms + accessories', text: 'Pose it, display it, or just let it vibe.' },
      { cx: 42, cy: 87, x: 29, y: 76, title: 'Stands 7.5 inches tall', text: 'A collectible that stands on its own.' },
      { cx: 64.3, cy: 30.3, x: 71, y: 24, side: 'r', title: 'USB-C rechargeable', text: 'Fast, easy charging so you’re never waiting.' },
      { cx: 58.1, cy: 64.3, x: 71, y: 72, side: 'r', title: 'Universal 510 thread', text: 'Works with all standard cartridges.' }
    ]
  },
  'rocket-pop-cart-battery': {
    src: '/assets/cut/rocket-pop.webp',
    spots: [
      { cx: 49.8, cy: 21, x: 34, y: 20, title: 'Standard 510 carts', text: 'Your cartridge stays securely attached.' },
      { cx: 49.8, cy: 84, x: 34, y: 78, title: 'About 8 inches tall', text: 'A standout collectible that looks great on display.' },
      { cx: 50.8, cy: 36, x: 66, y: 34, side: 'r', title: 'Built-in fidget spin', text: 'A satisfying spin while you hold it.' },
      { cx: 50.8, cy: 66, x: 66, y: 70, side: 'r', title: 'USB-C rechargeable', text: 'Lightweight and comfortable to hold.' }
    ]
  },
  'purse-510-cart-battery': {
    src: '/assets/cut/pursejamin.webp',
    spots: [
      { cx: 29.1, cy: 19, x: 22, y: 24, title: 'Built-in keychain ring', text: 'Clip it to your bag or belt.' },
      { cx: 34.4, cy: 68.5, x: 22, y: 74, title: 'Hidden cart storage', text: 'Carry a spare cartridge, up to 1g.' },
      { cx: 61.1, cy: 29, x: 78, y: 22, side: 'r', title: 'Universal 510 thread', text: 'Works with standard 510 carts.' },
      { cx: 58.7, cy: 52.5, x: 78, y: 70, side: 'r', title: '3 voltages + preheat', text: '3.0V / 3.3V / 3.6V and USB-C charging.' }
    ]
  },
  'herbie-flashlight-battery': {
    src: '/assets/cut/herbie.webp',
    spots: [
      { cx: 47.7, cy: 11, x: 22, y: 20, title: 'Twist-on 510', text: 'Twist your accessories right onto the top.' },
      { cx: 41, cy: 82, x: 22, y: 78, title: 'Charming character design', text: 'A round, pink buddy that wins hearts.' },
      { cx: 52.5, cy: 10.5, x: 78, y: 26, side: 'r', title: 'Flashlight bulb included', text: 'Twist it on and light up any space.' },
      { cx: 64, cy: 50, x: 78, y: 70, side: 'r', title: 'Compact and lightweight', text: 'Easy to carry everywhere you go.' }
    ]
  },
  'herb-grinder-slot-machine': {
    src: '/assets/cut/slot-grinder.webp',
    spots: [
      { cx: 34.9, cy: 28.2, x: 24, y: 24, title: 'Working slot reels + LEDs', text: 'Pull the side crank and the reels really spin.' },
      { cx: 37, cy: 68, x: 24, y: 74, title: 'Removable bottom cover', text: 'Makes cleaning quick and easy.' },
      { cx: 62.3, cy: 45.8, x: 76, y: 30, side: 'r', title: '2-inch metal grinder', text: 'Removable, with sharp diamond-cut teeth.' },
      { cx: 52.4, cy: 81.9, x: 76, y: 74, side: 'r', title: 'Pull-out collection drawer', text: 'A screen catches everything for easy access.' }
    ]
  },
  'french-purse-cart-battery': {
    src: '/assets/cut/french-purse.webp',
    spots: [
      { cx: 35.8, cy: 22.5, x: 30, y: 20, title: 'Gold hardware and clip', text: 'Clip it to your bag like a charm.' },
      { cx: 45.5, cy: 71, x: 30, y: 76, title: 'Orange leather mini purse', text: 'Fall limited edition, made to be seen.' },
      { cx: 59.5, cy: 33, x: 70, y: 24, side: 'r', title: 'Standard 510 cart', text: 'Your cart clicks in at the top.' },
      { cx: 54.7, cy: 58.4, x: 70, y: 70, side: 'r', title: 'Adjustable voltage', text: 'Plus a preheat setting, right on the side button.' }
    ]
  },
  'smyle-labs-trucker-hat': {
    src: '/assets/photo/trucker-hat.webp', bg: '#000',
    spots: [
      { cx: 43.5, cy: 47, x: 33, y: 30, title: 'Yellow Smyle logo', text: 'The signature script logo, front and center.' },
      { cx: 45, cy: 79, x: 33, y: 76, title: 'Curved brim', text: 'Classic trucker shape that keeps the sun off.' },
      { cx: 49, cy: 17, x: 67, y: 24, side: 'r', title: 'Tall front panel', text: 'Plenty of room for the logo to shine.' },
      { cx: 61, cy: 46, x: 67, y: 66, side: 'r', title: 'Breathable mesh back', text: 'Stays cool on warm California days.' }
    ]
  }
};

const COMPANION = {
  'smyle-labs-pen': 'cart-pen-replacement-tip', 'car-key-penjamin-by-smyle-labs': 'penjamin-car-key-tip-replacement',
  'permanent-marker-cart-battery-by-smyle-labs': 'penjamin-marker-replacement-ink-tips-2-pack', 'danksaber': 'penjamin-car-key-cartridge-magnet-replacement-2-pack',
  'cart-pen-replacement-tip': 'smyle-labs-pen', 'penjamin-car-key-tip-replacement': 'car-key-penjamin-by-smyle-labs', 'penjamin-cart-pen-ink-replacement': 'smyle-labs-pen'
};

export default function ItemPage({ handle }) {
  const p = byHandle(handle);
  const cart = useCart();
  const firstAvail = Math.max(0, p.variants.findIndex((v) => v.available));
  const [vi, setVi] = useState(firstAvail);
  const [q, setQ] = useState(p.tiers && p.variants.some((x) => x.available) ? 2 : 1);
  const [heart, setHeart] = useState(false);
  const [added, setAdded] = useState(false);
  const [fbt, setFbt] = useState(true);
  const [atcRef, show] = useWatch();

  const v = p.variants[vi];
  const shots = (p.cut ? [{ src: p.cut, cut: true, alt: p.name }] : p.photo ? [{ src: p.photo, alt: p.name, bg: '#000' }] : []).concat(p.images.map((s) => ({ src: img(s, 1100), th: img(s, 160), alt: p.name })));
  const cat = CATEGORIES.find((c) => c.id === p.cats[0]) || CATEGORIES[0];
  const k = kind(p);
  const intro = p.intro || p.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240);
  const total = tierTotal(p, q, v.price);
  const rating = p.reviews ? p.rating : 4.7;
  const rcount = p.reviews || SITE.reviewCount;
  const sim = [byHandle('inhaler-cart-battery'), ...related(p, 3)].filter((x) => x && x.handle !== p.handle).slice(0, 4);
  const compH = COMPANION[p.handle] || (k === 'battery' ? 'mini-plug-510-cart-battery' : k === 'torch' ? 'saber-shaped-gas-torch' : 'inhaler-cart-battery');
  const comp = compH !== p.handle ? byHandle(compH) : null;
  const compV = comp && (comp.variants.find((x) => x.available) || null);
  const feats = p.features.length ? p.features.slice(0, 4) : [];
  const st = steps(p);
  const DEF = [['Free shipping', 'From California in 2–5 business days.'], ['Warranty included', 'Manufacturer defects are on us.'], ['Plain, discreet box', 'No logos or labels on the outside.'], ['Real people support', `Text or WhatsApp ${SITE.phone}.`]];
  const callouts = [...feats.map((f) => [f, '']), ...DEF].slice(0, 4);
  const POS = p.cut ? [{ cx: 48, cy: 26, x: 33, y: 22 }, { cx: 48.5, cy: 70, x: 33, y: 76 }, { cx: 51.5, cy: 36, x: 67, y: 30, side: 'r' }, { cx: 51.5, cy: 76, x: 67, y: 72, side: 'r' }] : [{ cx: 40, cy: 28, x: 31, y: 22 }, { cx: 41, cy: 70, x: 31, y: 76 }, { cx: 60, cy: 34, x: 69, y: 30, side: 'r' }, { cx: 59, cy: 74, x: 69, y: 72, side: 'r' }];
  let spots = callouts.map(([title, text], i) => ({ ...POS[i], title, text }));
  const meet = MEET[p.handle];
  if (meet) spots = meet.spots;
  const short = p.name.split(' ').slice(0, 3).join(' ');

  const add = () => {
    if (!v.available) return;
    cart.add({ variantId: v.id, handle: p.handle, name: p.name, variant: v.title, price: v.price, img: thumb(p, 300), qty: q });
    setAdded(true);
  };
  const addBoth = () => {
    if (!v.available) return;
    add();
    if (fbt && comp && compV) cart.add({ variantId: compV.id, handle: comp.handle, name: comp.name, variant: compV.title, price: compV.price, img: thumb(comp, 300), qty: 1 });
  };
  const label = !v.available ? 'Sold out' : added ? `Added · ${money(total)}` : `Add to cart · ${money(total)}`;
  const pct = p.tiers && q >= 2 ? p.tiers[q === 2 ? 0 : 1] : 0;
  const rv = REVIEWS.store.filter((r) => !r.photo);

  return (
    <>
      <div className="v-wrap">
        <nav className="v-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link>/<Link href="/shop">Shop</Link>/<Link href={`/shop?cat=${cat.id}`}>{cat.name}</Link>/<b>{p.name}</b></nav>
        <section className="v-pd">
          <Gallery shots={shots} />

          <div className="v-buy">
            <div className="chips">{p.badge && <span className="chip y">{p.badge}</span>}{v.available ? <span className="chip ok">● In stock</span> : <span className="chip">Sold out</span>}<span className="chip">Free shipping</span></div>
            <h1>{p.name}</h1>
            <a className="v-rate" href="#reviews"><span className="st">★★★★★</span><b style={{ fontWeight: 600 }}>{rating}</b><u>{rcount.toLocaleString()} {p.reviews ? (p.reviews === 1 ? 'review' : 'reviews') : 'store reviews'}</u></a>
            <div className="v-price"><b>{money(total)}</b>{pct > 0 && <><s>{money(v.price * q)}</s><span className="chip y">Save {pct}%</span></>}{!pct && v.compare > v.price && <><s>{money(v.compare)}</s><span className="chip y">Save {money(v.compare - v.price)}</span></>}{q > 1 && <span style={{ fontSize: 13, color: '#6B6B6B' }}>{money(total / q)} each</span>}</div>
            <p className="lede">{intro}</p>
            {feats.length > 0 && <ul className="v-checks">{feats.map((f) => <li key={f}><Check />{f}</li>)}</ul>}
            <hr className="v-hr" />

            {p.option && p.variants.length > 1 && (
              <div>
                <div className="v-opt-h"><span style={{ color: '#131313' }}>{p.option}: <b style={{ fontWeight: 600 }}>{v.title}</b></span><span>{p.variants.length} options</span></div>
                <div className="v-vr" role="radiogroup" aria-label={p.option}>
                  {p.variants.map((x, i) => <button key={x.id} className={(i === vi ? 'on' : '') + (x.available ? '' : ' so')} role="radio" aria-checked={i === vi} title={x.available ? '' : 'Sold out'} onClick={() => { setVi(i); setAdded(false); }}>{x.title}</button>)}
                </div>
              </div>
            )}

            {p.tiers && v.available && (
              <div>
                <div className="v-opt-h"><b style={{ fontWeight: 500 }}>Bundle &amp; save</b><span>Mix and match{p.option ? ' ' + p.option.toLowerCase() + 's' : ''}</span></div>
                <div className="v-tiers" role="radiogroup" aria-label="Quantity">
                  {[1, 2, 3].map((n) => {
                    const pc = n === 1 ? 0 : p.tiers[n - 2]; const tot = tierTotal(p, n, v.price);
                    return (
                      <button key={n} className={'v-t' + (q === n ? ' on' : '')} role="radio" aria-checked={q === n} onClick={() => { setQ(n); setAdded(false); }}>
                        {n === 2 && <span className="pop">Most popular</span>}{n === 3 && <span className="pop y">Best value</span>}
                        <span className="rd" /><span><b>{n} × {short}</b>{pc > 0 && <span className="sv">Save {pc}%</span>}<span className="ea">{money(tot / n)} each</span></span>
                        <span className="pr">{money(tot)}{pc > 0 && <s>{money(v.price * n)}</s>}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {(!p.tiers || !v.available) && (
              <div className="v-opt-h" style={{ alignItems: 'center', marginBottom: 0 }}><span style={{ color: '#131313' }}>Quantity</span><div className="v-qty"><button onClick={() => setQ(Math.max(1, q - 1))} aria-label="Fewer">−</button><span>{q}</span><button onClick={() => setQ(q + 1)} aria-label="More">+</button></div></div>
            )}

            <div className="v-atc" ref={atcRef}><Btn onClick={add} disabled={!v.available}>{label}</Btn><button className={'wish' + (heart ? ' on' : '')} aria-label="Save to wishlist" aria-pressed={heart} onClick={() => setHeart(!heart)}><Heart /></button></div>
            <Ship available={v.available} />
            <Trust returns60={p.returns60} />
            {comp && compV && v.available && (
              <div className="v-fbt">
                <h4>Frequently bought together</h4>
                <div className="row"><div className="im"><img src={thumb(p, 200)} alt="" /></div><span className="plus">+</span><div className="im"><img src={thumb(comp, 200)} alt="" /></div>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, cursor: 'pointer', flex: 1 }}><input type="checkbox" checked={fbt} onChange={() => setFbt(!fbt)} style={{ marginTop: 3, accentColor: '#131313' }} /><span>{comp.name}<br /><span style={{ color: '#6B6B6B', fontSize: 12.5 }}>+{money(compV.price)}</span></span></label></div>
                <Btn kind="k" full onClick={addBoth}>{fbt ? `Add both · ${money(total + compV.price)}` : `Add to cart · ${money(total)}`}</Btn>
              </div>
            )}
            <Details items={[
              ['Description', p.body || intro],
              ['Shipping & returns', 'Free shipping from California. Orders usually arrive in 2–5 business days within the US, in a plain box.' + (p.returns60 ? ' 60-day easy returns.' : ' Money-back guarantee.')],
              ['Need help?', `Real people answer. Call, text or WhatsApp ${SITE.phone}, or email ${SITE.email}.`]
            ]} />
            <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>{k === 'battery' ? 'Cart (oil) not included · 21+ only.' : k === 'torch' ? 'Butane not included · 21+ only.' : 'Ships from California in 2–5 business days.'}</p>
          </div>
        </section>
      </div>

      {/* 1. Meet it */}
      <section className="v-sec v-dk">
        <div className="v-wrap">
          <Head dark tag="So, what is it?" title={<>Hey, meet the<br />{p.name}.</>} text={intro} />
          <Hotspots photo={!meet && !p.cut} src={meet ? meet.src : p.cut || img(p.images[0], 1000)} bg={meet && meet.bg} alt={p.name} spots={spots} />
        </div>
      </section>

      {/* 2. How it works */}
      {st && (
        <section className="v-sec">
          <div className="v-wrap">
            <Head tag="Here’s how it works" title={<>Easy as 1, 2, 3.</>} text="No setup and nothing to learn. Here’s all there is to it." />
            <div className="v-steps">
              {st.map(([src, h, d, cut], i) => <div className="v-step" key={h} data-r style={{ '--d': i * 100 + 'ms' }}><div className="im"><img className={cut ? '' : 'f'} src={src} alt="" loading="lazy" /></div><div className="tx"><span className="n">//0{i + 1}</span><h3 className="v-h3">{h}</h3><p>{d}</p></div></div>)}
            </div>
          </div>
        </section>
      )}

      {/* 3. Reviews */}
      <section className={'v-sec' + (st ? ' t0' : '')} id="reviews" style={{ overflow: 'hidden', scrollMarginTop: 80 }}>
        <div className="v-wrap">
          <Head tag="What people are saying" title={p.reviews ? <>{p.reviews.toLocaleString()} reviews and<br />counting.</> : <>Loved by 12,660+<br />Smyle Labs customers.</>} text={<span className="v-rsum"><span className="big">{rating}</span><span><span className="st">★★★★★</span><br />{p.reviews ? `${p.reviews.toLocaleString()} verified reviews of this product` : 'Store-wide verified reviews'}</span></span>} />
        </div>
        <Marquee speed={55}>
          <div className="v-rv">
            {[['/assets/ugc/inhaler.webp', 'Inhaler 510'], ['/assets/ugc/lipbalm.webp', 'Lip Balm Cart Pen'], ['/assets/ugc/moonwand.webp', 'Moon Wand']].flatMap(([src, n], i) => [
              <div className="v-rp" key={src}><img src={src} alt={`Customer photo: ${n}`} loading="lazy" /><div className="who"><b>Verified buyer</b><span>{n}</span></div></div>,
              ...rv.slice(i * 2, i * 2 + 2).map((r) => <div className="v-rq" key={r.who + i}><span className="st">★★★★★</span><q>{r.text}</q><div className="who"><i>{r.who[0]}</i><div><b>{r.who}</b><span>Verified · {r.product}</span></div></div></div>)
            ])}
          </div>
        </Marquee>
      </section>

      {/* 4. Conversation */}
      <section className="v-sec v-white">
        <div className="v-wrap">
          <Head center tag="You asked, we answered" title={<>Before you buy,<br />let’s talk.</>} text={<>The questions people text us most about this one. Still curious? Message {SITE.phone}.</>} />
          <ChatQA items={qa(p)} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 40 }} data-r><Btn href={SITE.whatsapp} kind="k" target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</Btn>{v.available && <Btn onClick={() => { add(); }}>{added ? 'Added to cart ✓' : `Add to cart · ${money(total)}`}</Btn>}</div>
        </div>
      </section>

      {/* 5. Inhaler cross-sell */}
      {k === 'battery' && (
        <section className="v-cta" style={{ marginTop: 12 }}>
          <img src="/assets/inhaler/hand.webp" alt="" style={{ objectFit: 'contain', objectPosition: 'right bottom' }} />
          <div className="in" data-r>
            <Tag dark>Our #1 discreet battery</Tag>
            <h2 className="v-h2">Want to hide your clouds too?</h2>
            <p className="v-p">The Inhaler 510 has a filter built into the base. Buy 2, save 11%. Buy 3, save 16%.</p>
            <div className="row"><Btn href="/products/inhaler-cart-battery" className="lg">Shop the Inhaler · $36.99</Btn></div>
          </div>
        </section>
      )}

      {/* 6. Pairs */}
      <section className="v-sec">
        <div className="v-wrap">
          <Head tag="Pairs well with" title={<>You might also<br />like these.</>} btn="Shop all" href="/shop" />
          <div className="v-grid4">{sim.map((s, i) => <PCard key={s.handle} p={s} delay={i * 80} />)}</div>
        </div>
      </section>

      <FloatBar show={show} img={thumb(p, 120)} name={p.name + (v.title ? ' · ' + v.title : '')} sub={`★ ${rating} · Free shipping · 2–5 days`} label={label} onAdd={add} disabled={!v.available} />
    </>
  );
}
