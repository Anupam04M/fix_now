"use client";

// src/app/(customerpanel)/checkout/page.tsx
// ================================================================
// CHECKOUT PAGE  (route: /checkout)
// ----------------------------------------------------------------
// Pixel-matched to FIX_Now_HTML/FIX_Now/checkout.html.
//
// CONNECTIONS (already wired):
//   - Cart page "Place Order"  -> router.push("/checkout")   ✓
//   - Back arrow on this page  -> /cart                      ✓
//   - Stepper                  -> activeStep={1}             ✓
//   - Service Summary + Price Details + Coupon card read LIVE
//     from useCartStore, so whatever you built in the cart shows
//     up here automatically (items, totals, applied coupon).
//
// STATIC PARTS (swap with API later — see DYNAMIC GUIDE below):
//   phone number, address, billing radios, slot, saved VISA card.
// ================================================================

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CartStepper from "@/components/cart/CartStepper";
import ScheduleModal from "./components/ScheduleModal";
import PaymentMethodModal from "./components/PaymentMethodModal";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/utils/format";

/* ============================================================
   HOW TO MAKE THIS PAGE DYNAMIC (beginner guide)
   ============================================================
   Matching FixNow API endpoints:

   1) PHONE  -> comes free from GET {{base_url}}/auth/me
        const { user } = useAuthStore();
        user?.phone  // replace hardcoded "+91 98765 XXXXX"

   2) ADDRESS -> GET {{base_url}}/customer/addresses
        Returns data[] of saved addresses; render them as
        selectable cards. The one with is_default=true should be
        pre-selected. "Edit" opens an address modal or navigates
        to a manage-address page.
        The CHOSEN address id is required for booking:
        POST /customer/bookings expects { customer_address_id }.

   3) BILLING -> local UI state for now. If backend adds billing
        support, send extra fields inside the booking payload.

   4) SLOT -> WORKING! The ScheduleModal lets the user pick a date
        + time and this page displays it. To go fully dynamic:
        - generate calendar months with date-fns (see STEP 1 inside
          components/ScheduleModal.tsx)
        - fetch available slots per date from GET /slots?date=...
          (STEP 2 in the same file)
        - keep the confirmed slot in a checkout store so it survives
          navigation, then send booking_date + booking_time in the
          POST /customer/bookings payload.

   5) PAYMENT -> the VISA row + PaymentMethodModal are WORKING.
        Remaining backend wiring:
        - load saved cards / gateways from
            GET {{base_url}}/payment/methods (STEP 1 inside
            components/PaymentMethodModal.tsx)
        - "Proceed To Payment" calls
              POST {{base_url}}/customer/bookings
              { customer_address_id, payment_method }
        - take response booking id and open your payment
          gateway (Razorpay/Stripe). On success PATCH the
          booking status, clearCart(), then navigate to a
          confirmation screen (stepper activeStep={2}).

   6) SERVICE SUMMARY rows map 1:1 from store items:
        items.map(i => ({ name: i.name, price: i.price * i.quantity }))
   ============================================================ */

export default function CheckoutPage() {
  // Rehydrate persisted cart so totals match what the user built.
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const {
    items,
    couponCode,
    discount,
    tipAmount,
    getSubtotal,
    getConvenienceFee,
    getTaxes,
    getTotal,
  } = useCartStore();

  /* ---------------- INTERACTIVE STATE ---------------- */
  // Billing radio selection ("same" | "different")
  const [billingOption, setBillingOption] = useState("same");

  /* Slot modal state. slotText is what the Slot card displays -
     it updates when the user confirms a date/time in the modal.
     Default matches the HTML mockup value. */
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [slotText, setSlotText] = useState("May 5th, 2026 · 11 AM–12 PM");

  /* Payment modal state. selectedMethodLabel drives the display row:
     - "card" shows the saved VISA row (default, like the HTML)
     - any other label (UPI Payments / COD) swaps in a
       "Selected payment method" confirmation row. */
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedMethodLabel, setSelectedMethodLabel] = useState("card");

  const subtotal = getSubtotal();

  /* Fallback rows so this page always looks like the HTML mockup
     even when the cart is empty (e.g. direct URL visit).
     Dynamic note: once checkout is only reachable via Place Order,
     you can instead redirect empty carts back to /cart. */
  const summaryItems =
    items.length > 0
      ? items.map((i) => ({
          id: i.id,
          name: i.name,
          lineTotal: i.price * i.quantity,
        }))
      : [
          { id: "mock-1", name: "AC Repair", lineTotal: 1049 },
          { id: "mock-2", name: "AC Cleaning", lineTotal: 450 },
        ];

  return (
    <main className="min-h-screen py-8 md:py-10 bg-gradient-to-b from-color-14 to-white">
      <div className="max-w-[1350px] mx-auto px-[15px]">
        {/* ============ Page Title ============ */}
        <div className="flex items-center gap-2.5 mb-6">
          {/* Back arrow returns to the cart (same as HTML's cart.html link) */}
          <Link
            href="/cart"
            aria-label="Go back"
            className="w-[30px] h-[30px] rounded-lg border border-color11 bg-white text-color1 flex items-center justify-center shrink-0 hover:bg-color-14 hover:border-color4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h2 className="font-outfit font-bold text-[19px] lg:text-[24px] sm:text-[22px] text-color9">
            Checkout
          </h2>
        </div>

        {/* ============ Stepper: Cart done -> Checkout active ============ */}
        <CartStepper activeStep={1} />

        {/* ============ Grid ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* ===================== LEFT COLUMN ===================== */}
          <div className="flex flex-col gap-4">
            {/* ---- Card: Send Booking Details To ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full border border-color4 flex items-center justify-center shrink-0 text-color4">
                  {/* Phone icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-albert text-[9px] lg:text-[14px] text-color1">
                    Send Booking Details To
                  </p>
                  {/* Static phone - dynamic: useAuthStore().user?.phone */}
                  <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9 mt-0.5">
                    +91 98765 XXXXX
                  </p>
                </div>
              </div>
              <button className="shrink-0 rounded-full border border-color4 px-5 py-1.5 text-[12px] lg:text-[16px] font-semibold text-color4 hover:bg-color4 hover:text-white transition-colors">
                Edit
              </button>
            </div>

            {/* ---- Card: Address ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full border border-color4 flex items-center justify-center shrink-0 text-color4">
                  {/* Map-pin icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-albert text-[9px] lg:text-[14px] text-color1">
                    Address
                  </p>
                  {/* Static - dynamic: selected address.label from
                      GET /customer/addresses (see guide item 2) */}
                  <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9 mt-0.5">
                    Home
                  </p>
                  <p className="font-albert text-[9px] lg:text-[14px] text-color1 leading-relaxed mt-0.5 max-w-[420px]">
                    Flat 502, Lake View Apartments, Dumdum Park,
                    <br className="hidden sm:block" />
                    Kolkata, West Bengal 700131
                  </p>
                </div>
              </div>
              <button className="shrink-0 rounded-full border border-color4 px-5 py-1.5 text-[12px] lg:text-[16px] font-semibold text-color4 hover:bg-color4 hover:text-white transition-colors">
                Edit
              </button>
            </div>

            {/* ---- Card: Billing Address (radio group) ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-full border border-color4 flex items-center justify-center shrink-0 text-color4">
                  {/* Document icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </div>
                <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9">
                  Billing Address
                </p>
              </div>

              {/* Option 1 : same as booking address (selected style) */}
              <label
                onClick={() => setBillingOption("same")}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                  billingOption === "same"
                    ? "border border-color4 bg-color-14"
                    : "border border-color11 hover:border-color4/50"
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 border-color4 flex items-center justify-center shrink-0">
                  {/* inner dot only when selected */}
                  {billingOption === "same" && (
                    <span className="w-2 h-2 rounded-full bg-color4"></span>
                  )}
                </span>
                <span className="font-albert text-[9px] lg:text-[14px] text-color9 font-medium">
                  Same as booking address
                </span>
              </label>

              {/* Option 2 : different billing address */}
              <label
                onClick={() => setBillingOption("different")}
                className={`flex items-start gap-3 rounded-xl px-4 py-3 mt-2.5 cursor-pointer transition-colors ${
                  billingOption === "different"
                    ? "border border-color4 bg-color-14"
                    : "border border-color11 hover:border-color4/50"
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 border-color-17 shrink-0 mt-0.5 flex items-center justify-center">
                  {billingOption === "different" && (
                    <span className="w-2 h-2 rounded-full bg-color4"></span>
                  )}
                </span>
                <span>
                  <span className="block font-albert text-[9px] lg:text-[14px] text-color9 font-medium">
                    Add a different billing address
                  </span>
                  <span className="block font-albert text-[9px] lg:text-[14px] text-color1 mt-0.5">
                    Required for GST or company invoicing
                  </span>
                </span>
              </label>
            </div>

            {/* ---- Card: Slot ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full border border-color4 flex items-center justify-center shrink-0 text-color4">
                  {/* Calendar icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-albert text-[9px] lg:text-[14px] text-color1">
                    Slot
                  </p>
                  {/* LIVE slot text - updates when the user confirms a
                      date/time inside the ScheduleModal below */}
                  <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9 mt-0.5">
                    {slotText}
                  </p>
                </div>
              </div>
              {/* Opens the ScheduleModal (date picker + time slots) */}
              <button
                onClick={() => setIsScheduleOpen(true)}
                className="shrink-0 rounded-full border border-color4 px-5 py-1.5 text-[12px] lg:text-[16px] font-semibold text-color4 hover:bg-color4 hover:text-white transition-colors"
              >
                Change
              </button>
            </div>

            {/* ---- Card: Payment Method ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full border border-color4 flex items-center justify-center shrink-0 text-color4">
                    {/* Credit-card icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                  <p className="font-outfit font-semibold text-[9px] lg:text-[16px] text-color9">
                    Payment Method
                  </p>
                </div>
                {/* Opens the PaymentMethodModal bottom-sheet */}
                <button
                  onClick={() => setIsPaymentOpen(true)}
                  className="font-albert text-[9px] lg:text-[14px] font-semibold text-color4 hover:underline"
                >
                  Change Method
                </button>
              </div>

              {/* Selected payment display:
                  - "card"  -> saved VISA row (HTML default)
                  - else    -> confirmation row with chosen label
                               (mirrors the HTML's selectedMethodDisplay) */}
              {selectedMethodLabel === "card" ? (
              <div className="flex items-center justify-between gap-4 rounded-xl bg-color8 px-4 py-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-6 rounded-md bg-color10 flex items-center justify-center shrink-0">
                    <span className="text-white text-[9px] font-bold tracking-wide">
                      VISA
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-albert text-[12px] lg:text-[16px] text-color9 font-medium">
                      Visa Ending in 3456
                    </p>
                    <p className="font-albert text-[11.5px] text-color1">
                      Exp 04/29
                    </p>
                  </div>
                </div>
                <span className="w-5 h-5 rounded-full border-2 border-color4 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-color4"></span>
                </span>
              </div>
              ) : (
                <div className="flex items-center gap-3 bg-white border border-color11 rounded-xl px-4 py-3.5">
                  <div className="w-10 h-10 rounded-full border border-color4 flex items-center justify-center shrink-0 text-color4">
                    {/* Bolt icon for UPI/COD selection */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-color1 normal-case mb-0.5">
                      Selected payment method
                    </p>
                    <p className="text-sm font-semibold text-color9 truncate">
                      {selectedMethodLabel}
                    </p>
                  </div>
                  <span className="w-5 h-5 shrink-0 rounded-full bg-color4 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                </div>
              )}
            </div>

            {/* ---- Cancellation Policy (plain text block) ---- */}
            <div className="pt-2 pb-4">
              <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9 mb-2">
                Cancellation Policy
              </p>
              <p className="font-albert text-[12.5px] text-color1 leading-relaxed max-w-[620px]">
                Free cancellation up to 4 hours before your scheduled service.
                Cancellations made within 4 hours of the booking slot may incur
                a cancellation fee.
              </p>
            </div>
          </div>

          {/* ===================== RIGHT COLUMN ===================== */}
          <div className="flex flex-col gap-4">
            {/* ---- Service Summary (LIVE from cart store) ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9">
                  Service Summary
                </p>
                <span className="font-albert text-[12.5px] font-semibold text-color4">
                  {summaryItems.length} Items
                </span>
              </div>

              {summaryItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1.5">
                  <span className="font-albert text-[13px] text-color1">
                    {item.name}
                  </span>
                  <span className="font-albert text-[13px] font-semibold text-color9">
                    {formatINR(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            {/* ---- Coupon Applied banner (green gradient) ----
                Shows automatically when a coupon was applied in the
                cart page because both pages share useCartStore. */}
            {couponCode ? (
              <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-500 to-green-600">
                {/* Decorative background circles (from HTML) */}
                <div className="absolute -right-4 -bottom-6 w-28 h-28 rounded-full bg-white/10"></div>
                <div className="absolute right-10 top-3 w-10 h-10 rounded-full bg-white/10"></div>

                {/* Decorative rotated coupon SVG (simplified artwork) */}
                <svg
                  className="absolute right-[-25px] bottom-[-25px] w-[98px] h-[97px] rotate-[40deg] opacity-30 pointer-events-none"
                  viewBox="0 0 98 97"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M49 3c7 0 12 4 19 4s14-4 21 3c6 6 4 13 4 19 0 8 6 12 6 20s-6 13-6 21c0 7 4 15-4 22s-15 3-21 3c-8 0-12 7-19 7s-12-5-19-5-14 5-21-3S5 77 5 70c0-8-5-13-5-21s6-14 6-21c0-7-4-16 4-23S26 7 33 7s9-4 16-4z"
                    fill="#16A34A"
                  />
                </svg>

                <div className="relative flex items-start justify-between gap-3">
                  {/* Text side */}
                  <div className="min-w-0">
                    <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-white flex items-center gap-1.5">
                      Coupon Applied
                      <span aria-hidden="true">✓</span>
                    </p>
                    <p className="font-albert text-[12px] text-white/90 leading-relaxed mt-1 max-w-[190px]">
                      You have saved {formatINR(discount)} on your first booking
                      with FixNow
                    </p>
                    {/* Change Coupon -> back to cart where coupons live */}
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-1 mt-2.5 text-[12px] font-semibold text-white hover:underline"
                    >
                      <span>Change Coupon</span>
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14" strokeLinecap="round" />
                        <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>

                  {/* Coupon tag icon bubble */}
                  <div className="relative z-10 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L3 3v6.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.82 0l6.6-6.6a2 2 0 0 0 0-2.57z" />
                      <circle cx="7.5" cy="7.5" r="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              /* No-coupon variant keeps the layout balanced.
                 Dynamic note: hide entirely if you prefer. */
              <div className="rounded-2xl p-4 sm:p-5 bg-white border border-dashed border-emerald-300 flex items-center justify-between">
                <p className="font-albert text-[12px] text-gray-500">
                  No coupon applied yet — add one from the cart.
                </p>
                <Link
                  href="/cart"
                  className="text-[12px] font-semibold text-emerald-600 hover:underline"
                >
                  Go to Cart
                </Link>
              </div>
            )}

            {/* ---- Price Details (LIVE from cart store) ---- */}
            <div className="bg-white border border-color11 rounded-2xl p-4 sm:p-5">
              <p className="font-outfit font-semibold text-[12px] lg:text-[16px] text-color9 mb-3">
                Price Details
              </p>

              <div className="flex items-center justify-between py-1.5">
                <span className="font-albert text-[13px] text-color1">Item Total</span>
                <span className="font-albert text-[13px] text-color9">
                  {formatINR(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="font-albert text-[13px] text-color1">Convenience Fee</span>
                <span className="font-albert text-[13px] text-color9">
                  {formatINR(getConvenienceFee())}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="font-albert text-[13px] text-color1 inline-flex items-center gap-1">
                  Taxes &amp; Charges
                  {/* small info icon (matches HTML) */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </span>
                <span className="font-albert text-[13px] text-color9">
                  {formatINR(getTaxes())}
                </span>
              </div>

              {/* Coupon row appears only when discount > 0 */}
              {discount > 0 && (
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-albert text-[13px] text-emerald-600 font-medium inline-flex items-center gap-1">
                    Coupon Applied
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24L3 3v6.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.82 0l6.6-6.6a2 2 0 0 0 0-2.57z" />
                      <circle cx="7.5" cy="7.5" r="1.5" />
                    </svg>
                  </span>
                  <span className="font-albert text-[13px] text-emerald-600 font-semibold">
                    &minus; {formatINR(discount)}
                  </span>
                </div>
              )}

              {tipAmount > 0 && (
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-albert text-[13px] text-color1">Tip</span>
                  <span className="font-albert text-[13px] text-color9">
                    {formatINR(tipAmount)}
                  </span>
                </div>
              )}

              {/* dashed divider before total (matches HTML) */}
              <div className="border-t border-dashed border-color11 my-3"></div>

              <div className="flex items-center justify-between">
                <span className="font-outfit text-[12px] lg:text-[16px] text-color9 font-semibold">
                  Total Amount
                </span>
                <span className="font-outfit text-[12px] lg:text-[16px] text-color9 font-bold">
                  {formatINR(getTotal())}
                </span>
              </div>
            </div>

            {/* ---- Proceed Button ----
                Static now: navigates to /payment placeholder route.
                Dynamic: POST /customer/bookings FIRST (guide item 5),
                then open gateway, THEN navigate on success. */}
            <Link
              href="/payment"
              className="w-full block text-center rounded-full bg-color4 text-white font-albert font-semibold text-[12px] lg:text-[16px] py-3.5 hover:bg-color5 transition-colors"
            >
              Proceed To Payment
            </Link>
          </div>
        </div>
      </div>

      {/* ============ MODALS ============ */}

      {/* Schedule modal: opens from the Slot card "Change" button.
          onConfirm receives (dateText, timeText) and updates slotText,
          so the card shows e.g. "May 8, 2026 · 06:00 PM - 08:00 PM". */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onConfirm={(dateText, timeText) => {
          setSlotText(`${dateText} · ${timeText}`);
          setIsScheduleOpen(false);
        }}
      />

      {/* Payment method modal: opens from "Change Method".
          onSelect stores the chosen label which swaps the VISA row
          for a confirmation row above. */}
      <PaymentMethodModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSelect={(label) => {
          setSelectedMethodLabel(label);
          setIsPaymentOpen(false);
        }}
      />
    </main>
  );
}
