"use client";

// src/app/(customerpanel)/cart/page.tsx
// ================================================================
// CART PAGE  (route: /cart)
// ----------------------------------------------------------------
// Fully dynamic: cart data lives in the persisted Zustand store and
// will sync with the backend cart API once it is available
// (see src/api/api-function/cart.function.ts).
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
  // 1. The cart store uses `skipHydration` — rehydrate it from
  //    localStorage once on the client so the first render always
  //    matches the server HTML (no hydration mismatch).
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const { items, getItemCount, _hasHydrated } = useCartStore();

  if (!_hasHydrated) return null;

  return (
    <main className="min-h-screen py-8 md:py-10 bg-gradient-to-b from-[#fbfcfe] to-gray-50">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
        {/* ============ Page Title ============ */}
        <div className="flex items-center gap-2.5 mb-5">
          <Link
            href="/"
            aria-label="Go back"
            className="w-[30px] h-[30px] rounded-lg border border-gray-200 bg-white text-gray-600 flex items-center justify-center flex-shrink-0 hover:bg-color-14 hover:border-color4/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="font-outfit font-bold text-[19px] lg:text-[24px] sm:text-[22px] text-color9">
            Your Cart
            {items.length > 0 && (
              <span className="ml-2 text-[13px] text-gray-400 font-albert font-medium">
                ({getItemCount()} service{getItemCount() > 1 ? "s" : ""})
              </span>
            )}
          </div>
        </div>

        {/* ============ Stepper ============ */}
        <CartStepper activeStep={0} />

        {/* ============ EMPTY STATE ============ */}
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
          /* ============ GRID ============ */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start">
            {/* ---------- LEFT COLUMN ---------- */}
            <div className="flex flex-col gap-4">
              {/* Cart Items */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-[18px]">
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-3.5 text-[10.5px] uppercase tracking-wide text-gray-500 pb-2 border-b border-gray-200">
                  <span>Service Type</span>
                  <span className="justify-self-center">
                    Service Quantity
                  </span>
                  <span className="justify-self-end">Price</span>
                </div>

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
                  className="inline-block mt-1.5 text-color4 font-semibold text-xs hover:underline"
                >
                  Read Full Policy →
                </Link>
              </div>

              {/* People Also Prefer */}
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