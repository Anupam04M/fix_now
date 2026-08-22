// src/types/interface/cart.interface.ts
// ================================================================
// CART TYPES
// ----------------------------------------------------------------
// Shapes used by the cart store, the cart API layer and the cart UI.
// The backend (Laravel) is expected to return data matching these
// shapes inside the standard { success, message, data } envelope.
// ================================================================

// A single service line inside the cart.
export interface CartItem {
  id: string; // service / provider_service id from the backend
  name: string; // e.g. "AC Repair"
  category: string; // sub-label, e.g. "Premium Repairing"
  price: number; // unit price in INR
  quantity: number; // how many times the service is booked
  maxQuantity?: number; // optional upper limit (stock/slot limit)
  icon?: string; // icon url for the service type (elder-friendly)
  rating?: number; // average rating shown on the line
  reviewCount?: number; // total reviews shown on the line
}

// Payload used when adding a brand new item (quantity is optional).
export type AddCartItemPayload = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

// A "People Also Prefer" recommendation.
export interface SuggestedService {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  category?: string;
}

// A coupon that can be applied to the cart.
export interface Coupon {
  code: string;
  type: "fixed" | "percent";
  value: number; // fixed INR amount OR percentage
  maxDiscount?: number; // cap applied when type === "percent"
  description: string;
}

// Standard FixNow API response envelope.
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// The Zustand cart store shape (see src/store/useCartStore.ts).
export interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discount: number; // total discount currently applied (INR)
  tipAmount: number; // tip selected for the professional (INR)
  _hasHydrated: boolean; // true once localStorage has been re-read (SSR-safe)

  // Actions
  addItem: (item: AddCartItemPayload) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setTip: (amount: number) => void;

  // Server sync (used when the backend cart endpoints are live)
  hydrate: (items: CartItem[]) => void;
  syncWithServer: () => Promise<void>;
  setHasHydrated: (hydrated: boolean) => void;

  // Computed selectors
  getItemCount: () => number;
  getSubtotal: () => number;
  getConvenienceFee: () => number;
  getTaxes: () => number;
  getTotal: () => number;
}