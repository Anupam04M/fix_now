"use client";

// src/components/cart/CartSummaryPanel.tsx
// ================================================================
// RIGHT COLUMN:  Apply Coupon | Price Details | Tip | Place Order
// ================================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

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
  const [isCustomTip, setIsCustomTip] = useState(false);
  const [customTip, setCustomTip] = useState("");

  const subtotal = getSubtotal();

  // ------------------------------------------------------------------
  // Coupon
  // ------------------------------------------------------------------
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const applied = applyCoupon(couponInput);
    if (applied) setCouponInput("");
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
    // Checkout page is created as a separate task — it will read the
    // same cart store to confirm the order.
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ============ COUPON ============ */}
      <div className="bg-gradient-to-br from-color-14 to-[#cfe4fa] border border-color4/20 rounded-xl p-4">
        <div className="font-sans font-bold text-[14px] text-gray-700 mb-0.5">
          Apply Coupon
        </div>
        <div className="text-[11px] text-gray-600 leading-snug max-w-[220px] mb-3">
          Save ₹200 on your first booking with Fix Now
        </div>

        {couponCode ? (
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-green-200">
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
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              placeholder="Enter coupon code"
              className="flex-1 h-9 rounded-lg bg-white border border-gray-200 px-3 text-[12px] outline-none focus:border-color4"
            />
            <button
              onClick={handleApplyCoupon}
              className="h-9 px-3 rounded-lg bg-color4 hover:bg-color5 text-white text-[12px] font-semibold transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* ============ PRICE DETAILS ============ */}
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

      {/* ============ TIP ============ */}
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
                    ? "border-color4 bg-color-14 text-color4"
                    : "border-gray-200 text-gray-600 hover:border-color4"
                }`}
              >
                {formatINR(amount)}
                {amount === 75 && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    POPULAR
                  </span>
                )}
              </button>
            );
          })}

          {/* Custom tip */}
          <input
            type="number"
            min={0}
            placeholder="Custom"
            value={isCustomTip ? customTip : ""}
            onChange={(e) => handleCustomTip(e.target.value)}
            className={`rounded-[9px] py-2 text-center font-sans font-semibold text-xs outline-none border transition-colors ${
              isCustomTip
                ? "border-color4 bg-color-14 text-color4"
                : "border-gray-200 text-gray-600 placeholder:text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* ============ PLACE ORDER ============ */}
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