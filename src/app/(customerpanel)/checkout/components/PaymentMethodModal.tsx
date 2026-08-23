"use client";

// src/app/(customerpanel)/checkout/components/PaymentMethodModal.tsx
// ================================================================
// PAYMENT METHOD MODAL  (opens when user clicks "Change Method")
// ----------------------------------------------------------------
// Pixel-matched to #methodModal in FIX_Now_HTML/checkout.html.
// Bottom-sheet on mobile, centered card on desktop.
//
// SECTIONS:
//   Recommended Method : UPI Payments | Cash On Delivery
//   Choose Other       : Cards & NetBanking are DISABLED (grayed,
//                        exactly like the HTML's opacity-50 state),
//                        plus a second selectable "UPI Payments".
//
// HOW IT BECOMES FULLY DYNAMIC (beginner notes):
//   STEP 1 - The method list should come from the backend:
//              GET {{base_url}}/payment/methods
//            so new gateways appear without a code change. Map over
//            data[] and render one row per method using the same
//            markup as below.
//
//   STEP 2 - Disabled rows = methods not yet integrated with the
//            payment provider. Flip `disabled` to false when the
//            gateway integration is done - no other change needed.
//
//   STEP 3 - onSelect(label) hands the chosen label to the parent
//            page which shows it in the "Selected payment method"
//            display. Persist it later by including it in the
//            booking payload: POST /customer/bookings { payment_method }.
// ================================================================

import React, { useState } from "react";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  /* Fires with the chosen method's label; parent updates its display */
  onSelect: (label: string) => void;
}

/* Static method definitions mirroring the HTML data-* attributes.
   Dynamic later: replace this array with the API response (STEP 1). */
const RECOMMENDED_METHODS = [
  {
    id: "upi",
    label: "UPI Payments",
    description:
      "Pay Instantly Using Google Pay, PhonePe, Paytm, BHIM, Or Any UPI-Enabled App. Fast, Secure, And Hassle-Free.",
    icon: (
      /* Lightning bolt icon */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
      </svg>
    ),
    iconClass: "text-color4",
  },
  {
    id: "cod",
    label: "Cash On Delivery (COD)",
    description:
      "Pay In Cash After The Service Has Been Completed. Available For Eligible Services And Locations.",
    icon: (
      /* Banknote icon */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 6v0M18 18v0" />
      </svg>
    ),
    iconClass: "text-color9",
  },
];

const OTHER_METHODS = [
  {
    id: "cards",
    label: "Credit & Debit Cards",
    disabled: true, // not integrated yet -> grayed out like HTML
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    iconClass: "text-color1",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    disabled: true, // not integrated yet
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 10 12 3l9 7" />
        <path d="M5 10v9h14v-9" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    iconClass: "text-color1",
  },
  {
    id: "upi-alt",
    label: "UPI Payments", // same UPI, listed under Other Methods in HTML
    disabled: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
      </svg>
    ),
    iconClass: "text-color4",
  },
];

const PaymentMethodModal = ({
  isOpen,
  onClose,
  onSelect,
}: PaymentMethodModalProps) => {
  // Currently highlighted option inside the modal.
  // HTML pre-selects UPI Payments.
  const [selectedId, setSelectedId] = useState("upi");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Dark overlay - clicking it also closes */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* ==================== PANEL ==================== */}
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Header (sticky) */}
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-color11 z-10">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-color4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span className="font-semibold text-sm text-color6">Payment Method</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#D97706] text-sm font-semibold hover:underline"
          >
            Close
          </button>
        </div>

        <div className="px-5 py-5">
          {/* ---------- RECOMMENDED METHODS ---------- */}
          <h3 className="text-sm font-bold text-color6 mb-3">Recommended Method</h3>

          <div className="flex flex-col gap-3 mb-6">
            {RECOMMENDED_METHODS.map((method) => {
              const isSelected = selectedId === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedId(method.id)}
                  className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3.5 cursor-pointer transition-colors text-left ${
                    isSelected
                      ? "border-color4 bg-color-14"
                      : "border-color11 hover:border-color4/50"
                  }`}
                >
                  <span className={`w-6 h-6 mt-0.5 shrink-0 ${method.iconClass}`}>
                    {method.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-color9 mb-0.5">
                      {method.label}
                    </p>
                    <p className="text-xs text-color1 leading-relaxed normal-case">
                      {method.description}
                    </p>
                  </div>
                  {/* Radio dot - filled only for selected method */}
                  <span
                    className={`w-5 h-5 mt-0.5 shrink-0 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-color4" : "border-color-17"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-color4"></span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---------- OTHER METHODS ---------- */}
          <h3 className="text-sm font-bold text-color6 mb-3">Choose Other Methods</h3>

          <div className="flex flex-col gap-3">
            {OTHER_METHODS.map((method) => {
              const isSelected = selectedId === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  disabled={method.disabled}
                  onClick={() => setSelectedId(method.id)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 transition-colors ${
                    method.disabled
                      ? /* Disabled look straight from the HTML:
                           opacity-50 + no pointer events */
                        "border-color11 opacity-50 cursor-not-allowed"
                      : `cursor-pointer ${
                          isSelected ? "border-color4" : "border-color11 hover:border-color4/50"
                        }`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 shrink-0 ${method.iconClass}`}>
                      {method.icon}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        method.disabled ? "text-color1" : "text-color9"
                      }`}
                    >
                      {method.label}
                    </span>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-color4" : "border-color-17"
                    }`}
                  >
                    {isSelected && !method.disabled && (
                      <span className="w-2.5 h-2.5 rounded-full bg-color4"></span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
