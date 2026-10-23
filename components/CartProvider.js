'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INHALER, byHandle, tierTotal } from '@/lib/catalog';
import { SITE } from '@/lib/site';

const CartCtx = createContext(null);
const KEY = 'smyle-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(s)) setItems(s); } catch (e) {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }, [items]);

  const api = useMemo(() => {
    const add = (line) => {
      // line: { variantId, handle, name, variant, price, img, qty }
      setItems((cur) => {
        const i = cur.findIndex((x) => x.variantId === line.variantId);
        if (i >= 0) { const n = cur.slice(); n[i] = { ...n[i], qty: n[i].qty + (line.qty || 1) }; return n; }
        return cur.concat({ ...line, qty: line.qty || 1 });
      });
      setOpen(true);
    };
    const setQty = (variantId, qty) => setItems((cur) => cur.map((x) => (x.variantId === variantId ? { ...x, qty: Math.max(1, qty) } : x)));
    const remove = (variantId) => setItems((cur) => cur.filter((x) => x.variantId !== variantId));
    const clear = () => setItems([]);

    const count = items.reduce((a, b) => a + b.qty, 0);
    const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
    const inhalerQty = items.filter((x) => x.handle === INHALER).reduce((a, b) => a + b.qty, 0);
    // Quantity-break savings per product (same rules as the live store's bundles).
    const byH = {};
    items.forEach((x) => { byH[x.handle] = byH[x.handle] || { n: 0, sum: 0 }; byH[x.handle].n += x.qty; byH[x.handle].sum += x.price * x.qty; });
    const savings = Object.entries(byH).reduce((acc, [h, g]) => { const p = byHandle(h); if (!p || !p.tiers || g.n < 2) return acc; return acc + (g.sum - tierTotal(p, g.n, g.sum / g.n)); }, 0);
    const total = subtotal - savings;
    // Shopify cart permalink: sends the shopper to the live, secure Shopify checkout.
    const checkoutUrl = items.length ? `${SITE.url}/cart/${items.map((x) => `${x.variantId}:${x.qty}`).join(',')}` : null;
    return { items, add, setQty, remove, clear, count, subtotal, savings, total, inhalerQty, checkoutUrl, open, setOpen };
  }, [items, open]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
