// src/api/api-function/cart.function.ts
// ================================================================
// CART API LAYER
// ----------------------------------------------------------------
// Every function here follows the FixNow backend conventions:
//   - REST + Bearer token (attached automatically by axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND NOT LIVE YET !!!
// The real `api.get/post/patch/delete` calls are commented out below.
// Each function currently returns mock/fallback data so the cart UI
// can be built and tested end-to-end. As soon as the Laravel developer
// exposes the cart endpoints, uncomment the real calls and delete the
// mock returns.
// ================================================================

import api from "./axios.instance";
import {
  ApiResponse,
  CartItem,
  AddCartItemPayload,
  SuggestedService,
} from "@/types/interface/cart.interface";

// GET /cart  ->  fetch the authenticated customer's cart
export const fetchCartFn = async (): Promise<ApiResponse<CartItem[]>> => {
  // const { data } = await api.get("/cart");
  // return { success: true, data: data.data };
  return { success: true, data: [] };
};

// POST /cart  ->  add an item to the cart
export const addToCartFn = async (
  item: AddCartItemPayload,
): Promise<ApiResponse> => {
  // const { data } = await api.post("/cart", item);
  // return { success: true, message: data.message };
  return { success: true, message: "Added to cart" };
};

// PATCH /cart/{id}  ->  update the quantity of a cart item
export const updateCartItemFn = async (
  id: string,
  quantity: number,
): Promise<ApiResponse> => {
  // const { data } = await api.patch(`/cart/${id}`, { quantity });
  // return { success: true, message: data.message };
  return { success: true };
};

// DELETE /cart/{id}  ->  remove a single item
export const removeCartItemFn = async (id: string): Promise<ApiResponse> => {
  // const { data } = await api.delete(`/cart/${id}`);
  // return { success: true, message: data.message };
  return { success: true };
};

// DELETE /cart  ->  empty the whole cart
export const clearCartFn = async (): Promise<ApiResponse> => {
  // const { data } = await api.delete("/cart");
  // return { success: true, message: data.message };
  return { success: true };
};

// POST /cart/coupon  ->  validate + apply a coupon, returns the discount
export const applyCouponFn = async (
  code: string,
): Promise<ApiResponse<{ code: string; discount: number }>> => {
  // const { data } = await api.post("/cart/coupon", { code });
  // return { success: true, data: data.data };
  return { success: false, message: "Coupon service not configured yet" };
};

// GET /services/suggestions  ->  "People Also Prefer" recommendations
export const fetchRelatedServicesFn = async (): Promise<
  ApiResponse<SuggestedService[]>
> => {
  // const { data } = await api.get("/services/suggestions");
  // return { success: true, data: data.data };
  return {
    success: true,
    data: [
      {
        id: "suggested-1",
        name: "Foam Jet Cleaning",
        price: 450,
        rating: 4.75,
        reviewCount: 4106,
        category: "Cleaning",
      },
      {
        id: "suggested-2",
        name: "Microwave Repair",
        price: 299,
        rating: 4.75,
        reviewCount: 1299,
        category: "Repairing",
      },
      {
        id: "suggested-3",
        name: "Fan Installation",
        price: 199,
        rating: 4.72,
        reviewCount: 1099,
        category: "Electrician",
      },
      {
        id: "suggested-4",
        name: "Furniture Setup",
        price: 740,
        rating: 4.71,
        reviewCount: 869,
        category: "House Help",
      },
    ],
  };
};