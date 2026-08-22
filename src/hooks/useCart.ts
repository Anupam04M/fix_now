// src/hooks/useCart.ts
// ================================================================
// CART REACT QUERY HOOKS
// ----------------------------------------------------------------
// Optional TanStack Query wrappers around the cart API layer.
//
// IMPORTANT: These hooks require a <QueryClientProvider> to be mounted
// in the root layout. That provider is NOT present yet, so the cart
// page intentionally uses the Zustand store directly (local-first).
// Once the backend cart endpoints are live AND the provider is added,
// wire these hooks into the page for server-side cart persistence.
// ================================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  fetchCartFn,
  addToCartFn,
  updateCartItemFn,
  removeCartItemFn,
  clearCartFn,
  applyCouponFn,
  fetchRelatedServicesFn,
} from "@/api/api-function/cart.function";
import { useCartStore } from "@/store/useCartStore";
import { AddCartItemPayload } from "@/types/interface/cart.interface";

// 1. Fetch the server-side cart and hydrate the local store
export const useCartQuery = () => {
  const hydrate = useCartStore((s) => s.hydrate);

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetchCartFn();
      if (res.success && res.data) hydrate(res.data);
      return res;
    },
    // Kept disabled until the backend is live so the local cart is
    // never overwritten by an empty server response.
    enabled: false,
  });
};

// 2. Add an item on the server
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: AddCartItemPayload) => addToCartFn(item),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res.message || "Failed to add item to cart");
      }
    },
  });
};

// 3. Update an item quantity on the server
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItemFn(id, quantity),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res.message || "Failed to update item");
      }
    },
  });
};

// 4. Remove an item on the server
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeCartItemFn(id),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res.message || "Failed to remove item");
      }
    },
  });
};

// 5. Clear the cart on the server
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCartFn(),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res.message || "Failed to clear cart");
      }
    },
  });
};

// 6. Apply a coupon (replaces the local AVAILABLE_COUPONS lookup)
export const useApplyCoupon = () => {
  const applyCoupon = useCartStore((s) => s.applyCoupon);

  return useMutation({
    mutationFn: (code: string) => applyCouponFn(code),
    onSuccess: (res) => {
      if (res.success && res.data) {
        applyCoupon(res.data.code);
      } else {
        toast.error(res.message || "Invalid coupon code");
      }
    },
  });
};

// 7. "People Also Prefer" recommendations
export const useRelatedServices = () => {
  return useQuery({
    queryKey: ["related-services"],
    queryFn: fetchRelatedServicesFn,
  });
};