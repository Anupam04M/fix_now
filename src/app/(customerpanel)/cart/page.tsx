"use client";

// src/app/(customerpanel)/cart/page.tsx
// ================================================================
// CART PAGE  (route: /cart)
// ----------------------------------------------------------------
// Pixel-matched to FIX_Now_HTML/FIX_Now/cart.html.
//
// DATA FLOW TODAY (already dynamic, no backend needed):
//   useCartStore (Zustand + localStorage persist) holds the items.
//   Quantity +/- , remove, coupons and tips all mutate that store,
//   so every number on this page recalculates instantly.
//
// HOW IT BECOMES FULLY DYNAMIC WITH THE BACKEND (beginner guide):
//   STEP 1 - LOAD: on mount call fetchCartFn() (GET /cart) from
//            src/api/api-function/cart.function.ts and hydrate the
//            store with the server's items (server wins over cache).
//   STEP 2 - WRITE: every addItem / updateQuantity / removeItem should
//            ALSO fire its matching API call (POST/PATCH/DELETE /cart)
//            so the cart survives device switches. Fire-and-forget is
//            fine; revert the local change if the API errors.
//   STEP 3 - PLACE ORDER: CartSummaryPanel currently just navigates to
//            /checkout. Real flow = POST {{base_url}}/customer/bookings
//            with { customer_address_id } first, clear the store on
//            success, THEN navigate (see FixNow API docs).
// ================================================================

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import CartStepper from "@/components/cart/CartStepper";
import CartItemRow from "@/components/cart/CartItemRow";
import RelatedServices from "@/components/cart/RelatedServices";
import CartSummaryPanel from "@/components/cart/CartSummaryPanel";
import { useCartStore } from "@/store/useCartStore";

const CartPage = () => {
  // The cart store uses `skipHydration` — rehydrate it from
  // localStorage once on the client so the first render always
  // matches the server HTML (no hydration mismatch).
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const { items, _hasHydrated } = useCartStore();

  if (!_hasHydrated) return null;

  return (
    <main className="min-h-screen py-8 md:py-10 bg-gradient-to-b from-[#fbfcfe] to-gray-50">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
        {/* ============ Page Title (back arrow + "Your Cart") ============ */}
        <div className="flex items-center gap-2.5 mb-5">
          <Link
            href="/"
            aria-label="Go back"
            className="w-[30px] h-[30px] rounded-lg border border-gray-200 bg-white text-gray-600 flex items-center justify-center flex-shrink-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="font-outfit font-bold text-[19px] lg:text-[24px] sm:text-[22px] text-color9">
            Your Cart
          </div>
        </div>

        {/* ============ Stepper (Cart -> Checkout -> Confirm) ============
            activeStep={0} because we are on the cart page.
            `highlightNext` reproduces cart.html, which colors the
            Checkout circle blue as well.
            On /checkout pass activeStep={1}; on confirm pass 2. */}
        <CartStepper activeStep={0} highlightNext />

        {/* ============ EMPTY STATE ============
            Not in the HTML mockup (it always shows filled carts), but
            required in a real app when the store has no items yet. */}
        {items.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 sm:p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-color-14 flex items-center justify-center mb-4">
              <ShoppingCart className="w-7 h-7 text-color4" />
            </div>
            <h2 className="font-outfit font-semibold text-[20px] sm:text-[24px] text-color9 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-[14px] max-w-[340px] mb-6">
              Browse services and add what you need. We&apos;ll keep everything
              ready for you here.
            </p>
            <Link
              href="/service"
              className="inline-flex items-center gap-2 bg-color4 hover:bg-color5 text-white rounded-3xl px-8 py-3 font-semibold text-[14px] transition-colors shadow-md"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          /* ============ GRID: left items column + right summary column ============ */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start">
            {/* ---------- LEFT COLUMN ---------- */}
            <div className="flex flex-col gap-4">
              {/* Cart Items table */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-[18px]">
                {/* Header row only visible on >= sm screens (like HTML) */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-3.5 text-[10.5px] uppercase tracking-wide text-gray-500 pb-2 border-b border-gray-200">
                  <span>Service Type</span>
                  <span className="justify-self-center">
                    Service Quantity
                  </span>
                  <span className="justify-self-end">Price</span>
                </div>

                {/* One row per item - rendered from the store.
                    Dynamic later: also fire PATCH/DELETE calls (STEP 2). */}
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-[18px]">
                <div className="font-sans font-semibold text-[12px] lg:text-[16px] mb-3 text-gray-800">
                  Cancellation Policy
                </div>
                <p className="text-[11.5px] text-gray-500 leading-relaxed">
                  Free cancellation up to 4 hours before your scheduled service.
                  Cancellations made within 4 hours may incur a cancellation
                  fee.
                </p>
                <Link
                  href="#"
                  className="inline-block mt-1.5 text-blue-600 font-semibold text-xs hover:underline"
                >
                  Read Full Policy →
                </Link>
              </div>

              {/* People Also Prefer (Add buttons feed the same store) */}
              <RelatedServices />
            </div>

            {/* ---------- RIGHT COLUMN ---------- */}
            <CartSummaryPanel />
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
