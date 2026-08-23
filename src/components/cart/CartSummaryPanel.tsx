"use client";

// src/components/cart/CartSummaryPanel.tsx
// ================================================================
// RIGHT COLUMN:  Apply Coupon | Price Details | Tip | Place Order
// ----------------------------------------------------------------
// Coupon card pixel-matched to FIX_Now_HTML/FIX_Now/cart.html:
//   - gradient blue background, "Save ₹200 ..." text,
//   - "Find coupon" pill button with a "3 Offers" count badge,
//   - large rotated ticket SVG on the right.
// Clicking "Find coupon" reveals the code input (progressive
// enhancement) so the existing apply/remove logic keeps working.
//
// HOW IT BECOMES FULLY DYNAMIC (beginner notes):
//   COUPON  -> applyCoupon() below currently validates locally.
//              Swap it for POST {{base_url}}/cart/coupon via
//              applyCouponFn() in src/api/api-function/cart.function.ts.
//              The "3 Offers" badge should come from that endpoint too.
//   TOTALS  -> Item Total / Convenience Fee / Taxes / Discount are
//              computed client-side from cart items. When the backend
//              exposes GET /cart it will return authoritative numbers -
//              replace the getters with response.summary fields.
//   ORDER   -> Place Order should call POST {{base_url}}/customer/bookings
//              with { customer_address_id } (see FixNow API docs),
//              then router.push("/checkout") only on success + clear cart.
// ================================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Ticket } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/utils/format";

// Preset tip amounts shown as quick-select chips
const TIP_OPTIONS = [50, 75, 100];

const CartSummaryPanel = () => {
  const router = useRouter();

  const {
    items,
    couponCode,
    discount,
    tipAmount,
    setTip,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getConvenienceFee,
    getTaxes,
    getTotal,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  // Controls whether the coupon-code input is visible.
  // HTML shows only the "Find coupon" pill by default.
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isCustomTip, setIsCustomTip] = useState(false);
  const [customTip, setCustomTip] = useState("");

  const subtotal = getSubtotal();

  // ------------------------------------------------------------------
  // Coupon
  // ------------------------------------------------------------------
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const applied = applyCoupon(couponInput);
    if (applied) {
      setCouponInput("");
      setShowCouponInput(false); // collapse input after success
    }
  };

  // ------------------------------------------------------------------
  // Tip
  // ------------------------------------------------------------------
  const handleTipClick = (amount: number) => {
    setTip(amount);
    setIsCustomTip(false);
    setCustomTip("");
  };

  const handleCustomTip = (value: string) => {
    setCustomTip(value);
    setIsCustomTip(true);
    setTip(Number(value) || 0);
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    // STATIC now: just navigates. Dynamic version described in the
    // header comment (POST /customer/bookings first).
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ============ COUPON (HTML-matched design) ============ */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-200 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-3">
        {/* LEFT: copy + find-coupon pill */}
        <div>
          <div className="font-sans font-bold text-[9px] lg:text-[14px] text-gray-700 mb-0.5">
            Apply Coupon
          </div>
          <div className="text-[11px] text-gray-600 leading-snug max-w-[170px]">
            Save ₹200 on your first booking with Fix Now
          </div>

          {couponCode ? (
            /* Applied state: green confirmation + remove action */
            <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-green-200 mt-2 max-w-[220px]">
              <span className="flex items-center gap-2 text-[12px] font-semibold text-green-700">
                <Check className="w-3.5 h-3.5" /> {couponCode} applied
              </span>
              <button
                onClick={removeCoupon}
                className="text-[11px] font-semibold text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : showCouponInput ? (
            /* Revealed input row (after clicking Find coupon) */
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                autoFocus
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                placeholder="Enter coupon code"
                className="w-[150px] h-8 rounded-lg bg-white border border-gray-200 px-2.5 text-[12px] outline-none focus:border-color4"
              />
              <button
                onClick={handleApplyCoupon}
                className="h-8 px-3 rounded-lg bg-color4 hover:bg-color5 text-white text-[11px] font-semibold transition-colors"
              >
                Apply
              </button>
            </div>
          ) : (
            /* Default look straight from the HTML: pill + offers badge */
            <button
              onClick={() => setShowCouponInput(true)}
              className="flex items-center gap-2 mt-2 border border-blue-500 text-blue-600 rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors"
            >
              <Ticket className="w-4 h-4 mr-1" />
              <span className="text-sm font-semibold">Find coupon</span>
              {/* Offers count - dynamic later: comes from coupon API */}
              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-1">
                3 Offers
              </span>
            </button>
          )}
        </div>

        {/* RIGHT: big rotated ticket illustration (pure SVG, matches HTML) */}
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0">
          <svg
            className="rotate-[40deg]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simplified two-tone ticket shape from the HTML artwork */}
            <path
              d="M50 4c6 0 10 4 16 4s12-4 18 2c5 5 3 11 3 16 0 7 5 10 5 17s-5 12-5 18c0 6 3 13-3 19s-13 2-18 2c-7 0-10 6-16 6s-10-4-16-4-12 4-18-2C10 76 12 70 12 65c0-7-5-10-5-17s5-12 5-18c0-6-3-13 3-19S28 9 33 9c7 0 11-5 17-5z"
              fill="#244F84"
            />
            <path
              d="M50 4c6 0 10 4 16 4 4 0 8-1 12 1L34 53C22 41 20 24 30 12c5-6 13-8 20-8z"
              fill="#99D7F7"
            />
            <circle cx="38" cy="38" r="8" fill="#FEFBFB" />
            <circle cx="26" cy="52" r="7" fill="#FEFCFC" />
            <circle cx="55" cy="75" r="7" fill="#FEFDFD" />
            <circle cx="72" cy="48" r="6" fill="#C2E6FB" />
            <circle cx="48" cy="80" r="5" fill="#C2E6FB" />
            <circle cx="70" cy="90" r="4" fill="#C2E6FB" />
            <circle cx="71" cy="35" r="4" fill="#C2E6FB" />
          </svg>
        </div>
      </div>

      {/* ============ PRICE DETAILS ============
          Rows computed from the cart store. Dynamic later: use
          summary fields returned by GET /cart (see header note). */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-[18px]">
        <div className="font-sans font-semibold text-[16px] mb-3 text-gray-800">
          Price Details
        </div>

        <div className="flex justify-between text-[12.5px] text-gray-600 py-1.5">
          <span className="text-gray-500">Item Total</span>
          <span>{formatINR(subtotal)}</span>
        </div>

        <div className="flex justify-between text-[12.5px] text-gray-600 py-1.5">
          <span className="text-gray-500">Convenience Fee</span>
          <span>{formatINR(getConvenienceFee())}</span>
        </div>

        <div className="flex justify-between text-[12.5px] text-gray-600 py-1.5">
          <span className="text-gray-500">Taxes &amp; Charges</span>
          <span>{formatINR(getTaxes())}</span>
        </div>

        {/* Discount row only appears when a coupon is active
            (green text like the HTML's #discountAmount span) */}
        {discount > 0 && (
          <div className="flex justify-between text-[12.5px] text-gray-600 py-1.5">
            <span className="text-gray-500">Discount</span>
            <span className="text-green-600 font-semibold">
              &minus; {formatINR(discount)}
            </span>
          </div>
        )}

        {tipAmount > 0 && (
          <div className="flex justify-between text-[12.5px] text-gray-600 py-1.5">
            <span className="text-gray-500">Tip</span>
            <span>{formatINR(tipAmount)}</span>
          </div>
        )}

        <div className="h-px bg-gray-200 my-1" />
        <div className="flex justify-between font-sans font-bold text-[14.5px] pt-2.5">
          <span>Total Amount</span>
          <span>{formatINR(getTotal())}</span>
        </div>
      </div>

      {/* ============ TIP ============
          Selected chip gets blue border/bg exactly like the HTML's
          .tip-selected class. Dynamic later: include tipAmount in the
          booking payload when placing the order. */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-[18px]">
        <div className="font-sans font-semibold text-[13px] mb-1 text-gray-800">
          Add a tip to thank the Professional
        </div>
        <div className="text-[10.5px] text-gray-500 mb-3">
          100% of your tip goes to the Professional
        </div>

        <div className="grid grid-cols-4 gap-2">
          {TIP_OPTIONS.map((amount) => {
            const selected = tipAmount === amount && !isCustomTip;
            return (
              <button
                key={amount}
                onClick={() => handleTipClick(amount)}
                className={`relative border rounded-[9px] py-2 text-center font-sans font-semibold text-xs transition-colors ${
                  selected
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:border-blue-600"
                }`}
              >
                {formatINR(amount)}
                {/* POPULAR badge on the middle chip (matches HTML) */}
                {amount === 75 && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    POPULAR
                  </span>
                )}
              </button>
            );
          })}

          {/* Custom tip input doubles as the 4th chip */}
          <input
            type="number"
            min={0}
            placeholder="Custom"
            value={isCustomTip ? customTip : ""}
            onChange={(e) => handleCustomTip(e.target.value)}
            className={`rounded-[9px] py-2 text-center font-sans font-semibold text-xs outline-none border transition-colors ${
              isCustomTip
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-200 text-gray-600 placeholder:text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* ============ PLACE ORDER ============
          Static now: navigates to /checkout.
          Dynamic later: POST /customer/bookings first (header note). */}
      <button
        onClick={handlePlaceOrder}
        disabled={items.length === 0}
        className="w-full inline-flex items-center justify-center gap-2 bg-color4 hover:bg-color5 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-3xl py-3.5 font-sans font-bold text-[13.5px] transition-colors shadow-md"
      >
        Place Order
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartSummaryPanel;
