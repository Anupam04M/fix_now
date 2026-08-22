// src/store/useCartStore.ts
// ================================================================
// CART STORE (local-first, persisted to localStorage)
// ----------------------------------------------------------------
// The cart works fully offline right now using Zustand + persist.
// When the backend cart endpoints go live, the actions can be
// swapped to call the API layer (src/api/api-function/cart.function.ts)
// without touching the UI. `syncWithServer()` is the hook that will
// push/pull the cart from the server.
// ================================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

import {
  CartState,
  Coupon,
} from "@/types/interface/cart.interface";
import {
  fetchCartFn,
  addToCartFn,
} from "@/api/api-function/cart.function";

// ================================================================
// TEMPORARY COUPONS
// ----------------------------------------------------------------
// Placeholder coupons until the backend exposes /cart/coupon.
// Replace `applyCoupon` with a call to `applyCouponFn(code)` when ready.
// ================================================================
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "FIX200",
    type: "fixed",
    value: 200,
    description: "₹200 off your first booking with Fix Now",
  },
  {
    code: "FIXNOW10",
    type: "percent",
    value: 10,
    maxDiscount: 300,
    description: "10% off (up to ₹300)",
  },
];

// Pricing placeholders (tweak once the backend provides the fee config)
const CONVENIENCE_FEE = 20; // flat INR fee per cart
const TAX_RATE = 0.05; // 5% GST placeholder

// ------------------------------------------------------------------
// Coupon math
// ------------------------------------------------------------------
const findCoupon = (code: string): Coupon | undefined =>
  AVAILABLE_COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase(),
  );

const calculateDiscount = (coupon: Coupon, subtotal: number): number => {
  if (coupon.type === "fixed") return Math.min(coupon.value, subtotal);

  const percentDiscount = (subtotal * coupon.value) / 100;
  return Math.min(percentDiscount, coupon.maxDiscount ?? percentDiscount);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // ==========================================================
      // STATE
      // ==========================================================
      items: [],
      couponCode: null,
      discount: 0,
      tipAmount: 0,
      _hasHydrated: false,

      // ==========================================================
      // ITEM ACTIONS
      // ==========================================================
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        const qty = item.quantity ?? 1;
        const max = existing?.maxQuantity ?? item.maxQuantity ?? Infinity;

        if (existing) {
          if (existing.quantity >= max) {
            toast.error(`Maximum quantity reached for ${existing.name}`);
            return;
          }
          const newQty = Math.min(existing.quantity + qty, max);
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: newQty } : i,
            ),
          });
          toast.success(`Updated ${existing.name} quantity!`);
          return;
        }

        set({
          items: [
            ...get().items,
            { ...item, quantity: Math.min(qty, max) },
          ],
        });
        toast.success(`${item.name} added to cart!`);
      },

      removeItem: (id) => {
        const item = get().items.find((i) => i.id === id);
        set({ items: get().items.filter((i) => i.id !== id) });
        if (item) toast.info(`${item.name} removed from cart`);
      },

      updateQuantity: (id, quantity) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        const safeQty = Math.max(
          1,
          Math.min(quantity, item.maxQuantity ?? Infinity),
        );
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: safeQty } : i,
          ),
        });
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discount: 0, tipAmount: 0 });
        toast.info("Cart cleared");
      },

      // ==========================================================
      // COUPON ACTIONS
      // ==========================================================
      applyCoupon: (code) => {
        const coupon = findCoupon(code);
        if (!coupon) {
          toast.error("Invalid coupon code");
          return false;
        }
        const discount = calculateDiscount(coupon, get().getSubtotal());
        set({ couponCode: coupon.code, discount });
        toast.success(`Coupon ${coupon.code} applied!`);
        return true;
      },

      removeCoupon: () => set({ couponCode: null, discount: 0 }),

      // ==========================================================
      // TIP
      // ==========================================================
      setTip: (amount) => set({ tipAmount: amount }),

      // ==========================================================
      // SERVER SYNC (used once the backend is live)
      // ==========================================================
      // Pull the server cart and merge it into the local store.
      hydrate: (items) => set({ items }),

      // Called by persist once localStorage has been re-read.
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),

      // Push local changes up to the server. Safe to call even now:
      // the API functions return mock success until the backend exists.
      syncWithServer: async () => {
        try {
          const res = await fetchCartFn();
          if (res.success && res.data) {
            get().hydrate(res.data);
          }
          // Push every local item up to the server
          for (const item of get().items) {
            await addToCartFn(item);
          }
        } catch (error) {
          console.error("Cart server sync failed:", error);
        }
      },

      // ==========================================================
      // COMPUTED VALUES
      // ==========================================================
      getItemCount: () => get().items.reduce((n, i) => n + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getConvenienceFee: () => (get().items.length > 0 ? CONVENIENCE_FEE : 0),

      getTaxes: () => Math.round(get().getSubtotal() * TAX_RATE),

      getTotal: () => {
        const s = get();
        return Math.max(
          0,
          s.getSubtotal() +
            s.getConvenienceFee() +
            s.getTaxes() -
            s.discount +
            s.tipAmount,
        );
      },
    }),
    {
      name: "fixnow-cart",
      // Defer hydration to the page (via rehydrate()) so the first
      // client render matches the server HTML — no hydration mismatch.
      skipHydration: true,
      // IMPORTANT: Only persist the items. Coupons/tips are session-level
      // and should reset when the user comes back.
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);