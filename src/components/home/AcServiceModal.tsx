"use client";

// src/components/home/AcServiceModal.tsx
// ================================================================
// AC SERVICE DETAIL MODAL
// ----------------------------------------------------------------
// Pixel-matched to #acServiceModal in FIX_Now_HTML/FIX_Now/index.html.
// Opens from the arrow button on any "Professional Services" card of
// the home page (same wiring as the HTML's openModal -> acServiceModal).
//
// LAYOUT (matches HTML):
//   Breadcrumb : Professional Electrical Solution > AC
//   Location   : pin chip (Salt Lake, Sector 1...)
//   GRID lg:grid-cols-12
//     LEFT 8  : title/rating/description, Select-A-Service tabs,
//               trust bar, plan cards (Annual/Half-Yearly/Quarterly)
//     RIGHT 4 : selected-plan summary, Saved box, Our Service
//               Guarantee, Cart box
//
// ============================================================
// HOW TO MAKE DYNAMIC (beginner guide)
// ============================================================
//   STEP 1 - PLANS & SERVICE INFO come from the API:
//              GET {{base_url}}/services/{slug}
//            Map the response onto PLAN_DATA below (same field names).
//
//   STEP 2 - ADD TO CART: Add buttons currently push into local
//            cartCount state. Replace with useCartStore().addItem(...)
//            (src/store/useCartStore.ts) so the navbar cart badge
//            updates globally too.
//
//   STEP 3 - OTHER TABS (Repair Gas Refill / Install Uninstall):
//            fetch their own plan lists from the same endpoint using
//            ?category=repair / ?category=install and swap PLAN_DATA.
// ============================================================

import React, { useState } from "react";

/* ---------------- TYPES + STATIC DATA (mirrors the HTML) ---------------- */
interface Plan {
  id: string;
  name: string;
  duration: string;
  discountPct: number;
  oldPrice: number;
  pricePerAc: number;
  validity: string;
}

const PLAN_DATA: Plan[] = [
  { id: "annual", name: "Annual Service Plan", duration: "1 Year", discountPct: 25, oldPrice: 999, pricePerAc: 749, validity: "AC Valid For 1 Year" },
  { id: "half-yearly", name: "Half-Yearly Service Plan", duration: "6 Months", discountPct: 15, oldPrice: 999, pricePerAc: 820, validity: "AC Valid For 6 Months" },
  { id: "quarterly", name: "Quarterly Service Plan", duration: "3 Months", discountPct: 10, oldPrice: 999, pricePerAc: 900, validity: "AC Valid For 3 Months" },
];

/* Shared includes list for annual + half-yearly (quarterly omits item 1) */
const FULL_INCLUDES = [
  "2 Comprehensive Service In {DURATION}",
  "Applicable for Split Window or Split AC",
  "Deep Cleaning of Filters, Condenser & Evaporator",
  "Performance Check & Optimization",
];

interface AcServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The service the user clicked in the grid modal (AC, Refrigerator,
   *  Washing Machine, Light, Ceiling Fan...). Drives breadcrumb + H1.
   *  Dynamic later: also drives which plan set to fetch from the API. */
  serviceName?: string;
}

export default function AcServiceModal({
  isOpen,
  onClose,
  serviceName = "AC",
}: AcServiceModalProps) {
  /* ---------------- INTERACTIVE STATE ---------------- */
  // Active top tab ("plans" default like the HTML)
  const [activeTab, setActiveTab] = useState<"plans" | "repair" | "install">(
    "plans",
  );

  // Last plan added / shown in sidebar summary (defaults to Annual)
  const [selectedPlanId, setSelectedPlanId] = useState("annual");

  // Local mini-cart counter. Dynamic later (STEP 2): useCartStore.
  const [cartCount, setCartCount] = useState(0);

  if (!isOpen) return null;

  const selectedPlan =
    PLAN_DATA.find((p) => p.id === selectedPlanId) ?? PLAN_DATA[0];
  const savedAmount = selectedPlan.oldPrice - selectedPlan.pricePerAc;

  /* Add handler: sets summary card + bumps cart.
     Dynamic later (STEP 2): swap setCartCount for useCartStore().addItem */
  const handleAdd = (plan: Plan) => {
    setSelectedPlanId(plan.id);
    setCartCount((c) => c + 1);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/30 backdrop-blur-sm py-[20px] lg:py-[36px]">
      {/* click outside closes */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[1400px] mx-auto px-[12px] sm:px-[16px] lg:px-[24px] flex items-center justify-center min-h-full min-w-0">
        {/* ==================== MODAL BOX ==================== */}
        <div className="w-full min-w-0 h-auto mx-auto max-h-[90vh] overflow-y-auto min-h-[500px] rounded-[16px] lg:rounded-[24px] bg-white px-[16px] py-[32px] sm:px-[20px] sm:py-[40px] md:px-[24px] md:py-[50px] lg:px-[30px] lg:py-[60px] shadow-[4px_0_18.5px_0_#D1D5DB]">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-[28px] leading-none text-gray-500 hover:text-gray-900"
          >
            ×
          </button>

          {/* Breadcrumb: Professional Electrical Solution > AC */}
          <div className="flex flex-wrap items-center mt-[12px] mb-[40px] lg:mb-[56px] min-w-0">
            <span className="text-[#265DA7] text-[18px] font-sans font-semibold">
              Professional Electrical Solution
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="#99D7F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#265DA7] text-[18px] font-sans font-semibold">{serviceName}</span>
          </div>

          {/* Location chip */}
          <div className="mb-[30px]">
            <button
              type="button"
              className="w-full sm:w-auto sm:min-w-[210px] h-[34px] px-[12px] rounded-[8px] border border-gray-200 bg-white shadow-sm flex items-center text-left"
            >
              <span className="flex items-center truncate text-[14px] text-gray-500">
                <svg className="mr-[7px] shrink-0 text-blue-900" width="13" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Salt Lake, Sector 1, Kolkata, West Bengal 700064
              </span>
            </button>
          </div>

          {/* ==================== MAIN GRID ==================== */}
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-12 lg:gap-x-[28px]">
            {/* ============ LEFT CONTENT (col-span-8) ============ */}
            <div className="min-w-0 lg:col-span-8">
              {/* Title block */}
              <div className="mb-[20px]">
                <h1 className="font-outfit text-[28px] lg:text-[38px] leading-none font-semibold text-color9 mb-[8px]">
                  {serviceName}
                </h1>

                <div className="flex min-w-0 flex-wrap items-center text-[14px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="mr-[4px]" fill="#f59e0b">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <p className="font-semibold text-gray-900">4.7</p>
                  <p className="mx-[4px]">(13.7k Reviews)</p>
                  <p className="mx-[5px] text-gray-300">•</p>
                  <p>13.7K Bookings</p>
                </div>

                <p className="text-[15px] text-gray-900 mt-[6px]">
                  Professional {serviceName} service at your doorstep
                </p>
                <p className="text-[14px] text-gray-500 mt-[3px]">Starting At ₹1,499</p>
              </div>

              {/* ---- SELECT A SERVICE tabs ---- */}
              <div className="mb-[20px]">
                <h2 className="text-[19px] font-semibold text-gray-900 mb-[12px]">
                  Select A Service
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px]">
                  {/* Tab 1 : Service Plans (active default, green OFF badge) */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("plans")}
                    className={`text-left border-2 rounded-[10px] bg-white p-[8px] transition duration-200 cursor-pointer ${
                      activeTab === "plans"
                        ? "border-blue-600"
                        : "border-transparent hover:border-blue-600"
                    }`}
                  >
                    <div className="h-[65px] rounded-[7px] bg-white flex items-center justify-center">
                      <div className="w-[45px] h-[48px] rounded-[6px] border border-green-200 bg-green-50 flex flex-col items-center justify-center">
                        <span className="text-[17px] font-bold text-green-500 leading-none">25%</span>
                        <span className="text-[12px] font-bold text-green-500">OFF</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-900 font-semibold mt-[5px]">Service Plans</p>
                  </button>

                  {/* Tab 2 : Repair Gas Refill */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("repair")}
                    className={`text-left border-2 rounded-[10px] bg-white p-[8px] transition duration-200 cursor-pointer ${
                      activeTab === "repair"
                        ? "border-blue-600"
                        : "border-transparent hover:border-blue-600"
                    }`}
                  >
                    <div className="h-[65px] rounded-[7px] bg-white flex items-center justify-center">
                      <svg width="34" height="52" viewBox="0 0 24 24" fill="none" stroke="#2772CC" strokeWidth="1.5">
                        <path d="M12 2a7 7 0 00-4 12.7V17a2 2 0 002 2h4a2 2 0 002-2v-2.3A7 7 0 0012 2z" />
                        <path d="M9 17h6" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-[13px] text-gray-900 font-semibold mt-[5px]">
                      Repair Gas Refill
                    </p>
                  </button>

                  {/* Tab 3 : Install Uninstall */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("install")}
                    className={`text-left border-2 rounded-[10px] bg-white p-[8px] transition duration-200 cursor-pointer ${
                      activeTab === "install"
                        ? "border-blue-600"
                        : "border-transparent hover:border-blue-600"
                    }`}
                  >
                    <div className="h-[65px] rounded-[7px] bg-white flex items-center justify-center">
                      <svg width="36" height="46" viewBox="0 0 24 24" fill="none" stroke="#2772CC" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="12" rx="1.5" />
                        <path d="M8 21h8M12 15v6M12 8v4M10 10l2-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-[13px] text-gray-900 font-semibold mt-[5px]">
                      Install Uninstall
                    </p>
                  </button>
                </div>
              </div>

              {/* ---- TRUST BAR ---- */}
              <div className="w-full border border-gray-200 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-[12px] py-[12px] mb-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] sm:gap-0">
                  {/* Item 1 */}
                  <div className="flex items-center justify-center sm:border-r border-gray-200 px-[5px]">
                    <span className="mr-[5px]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.7">
                        <circle cx="9" cy="8" r="3.4" />
                        <path d="M2.8 20c.7-3.4 3.2-5.2 6.2-5.2s5.5 1.8 6.2 5.2" strokeLinecap="round"/>
                        <circle cx="17" cy="9" r="2.6" />
                        <path d="M15.6 14.9c2.8-.4 5.1 1.1 5.7 4" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <div className="cursor-pointer">
                      <p className="text-[13px] font-semibold text-gray-900">Trusted Professionals</p>
                      <p className="text-[11px] text-gray-500">Verified Experts</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-center sm:border-r border-gray-200 px-[5px]">
                    <span className="mr-[5px]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.7">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 11.5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="cursor-pointer">
                      <p className="text-[13px] font-semibold text-gray-900">
                        1 Year Service Warranty
                      </p>
                      <p className="text-[11px] text-gray-500">Service Protection</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-center px-[5px]">
                    <span className="mr-[5px]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.7">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3.5 2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div className="cursor-pointer">
                      <p className="text-[13px] font-semibold text-gray-900">
                        Instant Confirmation
                      </p>
                      <p className="text-[11px] text-gray-500">Quick Booking</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---- PLAN CARDS (visible when "Service Plans" tab active) ---- */}
              {activeTab === "plans" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[14px]">
                  {PLAN_DATA.map((plan) => (
                    <div
                      key={plan.id}
                      className="border border-gray-200 rounded-[10px] bg-white p-[12px] shadow-[0_2px_7px_rgba(0,0,0,0.05)]"
                    >
                      {/* Title row */}
                      <div className="flex items-center flex-wrap gap-[6px] justify-between mb-[8px]">
                        <h3 className="text-[15px] sm:text-[17px] font-semibold text-gray-900">
                          {plan.name}{" "}
                          <span className="text-[12px] text-gray-400">
                            ({plan.duration})
                          </span>
                          <span className="ml-[3px] px-[5px] py-[2px] rounded-[4px] bg-green-100 text-green-500 text-[10px] font-semibold">
                            {plan.discountPct}% OFF
                          </span>
                        </h3>
                      </div>

                      {/* Grey price panel */}
                      <div className="bg-[#f3f4f6] rounded-[5px] px-[10px] py-[10px] mb-[10px]">
                        <p className="text-[15px] sm:text-[17px] font-semibold text-gray-900">
                          {plan.name}
                        </p>
                        <p className="text-[13px] mt-[3px]">
                          <span className="line-through text-gray-400 mr-[3px]">
                            ₹{plan.oldPrice}
                          </span>
                          <span className="font-semibold text-green-500">
                            ₹{plan.pricePerAc}/AC
                          </span>
                        </p>
                        <p className="text-[10px] text-gray-500 mt-[2px]">
                          Starts At ₹{plan.pricePerAc}/AC
                        </p>
                        <p className="text-[10px] text-gray-500">{plan.validity}</p>
                      </div>

                      <p className="text-[11px] font-semibold text-gray-900 mb-[5px]">
                        What&apos;s Included
                      </p>
                      <ul className="text-[11px] text-gray-500 leading-[1.7]">
                        {(plan.id === "quarterly"
                          ? FULL_INCLUDES.slice(1)
                          : FULL_INCLUDES.map((line) =>
                              line.replace("{DURATION}", plan.duration),
                            )
                        ).map((item) => (
                          <li key={item}>✓ {item}</li>
                        ))}
                        <li>✓ Free Cancellation Before 6 Hours</li>
                      </ul>

                      <div className="flex items-center flex-wrap gap-[8px] justify-between mt-[10px]">
                        <p className="text-[10px] text-gray-500">&nbsp;</p>
                        <button
                          type="button"
                          onClick={() => handleAdd(plan)}
                          className="min-w-[55px] h-[25px] rounded-[5px] border border-blue-300 bg-blue-50 text-[12px] text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Simple placeholders so other two tabs are functional too */}
              {activeTab === "repair" && (
                <div className="border border-gray-200 rounded-[10px] bg-white p-[12px] shadow-[0_2px_7px_rgba(0,0,0,0.05)]">
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-gray-900 mb-[8px]">
                    Repair &amp; Gas Refill
                  </h3>
                  <div className="bg-[#f3f4f6] rounded-[5px] px-[10px] py-[10px] mb-[10px]">
                    <p className="text-[15px] sm:text-[17px] font-semibold text-gray-900">
                      Split / Window AC Repair
                    </p>
                    <p className="text-[13px] mt-[3px] font-semibold text-green-500">₹599 onwards</p>
                    <p className="text-[10px] text-gray-500 mt-[2px]">Inspection included</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCartCount((c) => c + 1)}
                    className="min-w-[55px] h-[25px] rounded-[5px] border border-blue-300 bg-blue-50 text-[12px] text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                  >
                    Add
                  </button>
                </div>
              )}

              {activeTab === "install" && (
                <div className="border border-gray-200 rounded-[10px] bg-white p-[12px] shadow-[0_2px_7px_rgba(0,0,0,0.05)]">
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-gray-900 mb-[8px]">
                    Install / Uninstall
                  </h3>
                  <div className="bg-[#f3f4f6] rounded-[5px] px-[10px] py-[10px] mb-[10px]">
                    <p className="text-[15px] sm:text-[17px] font-semibold text-gray-900">
                      AC Installation Or Removal
                    </p>
                    <p className="text-[13px] mt-[3px] font-semibold text-green-500">₹1,200 onwards</p>
                    <p className="text-[10px] text-gray-500 mt-[2px]">Drilling &amp fittings included</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCartCount((c) => c + 1)}
                    className="min-w-[55px] h-[25px] rounded-[5px] border border-blue-300 bg-blue-50 text-[12px] text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* ============ RIGHT SIDEBAR (col-span-4) ============ */}
            <aside className="min-w-0 lg:col-span-4 mt-[25px] lg:mt-0">
              {/* Summary of currently selected plan — LIVE updates on Add */}
              <div className="border border-gray-200 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-[12px]">
                <div className="flex items-start justify-between gap-[8px]">
                  <h3 className="text-[18px] font-semibold text-gray-900">
                    {selectedPlan.name}
                  </h3>
                  <span className="px-[5px] py-[3px] rounded-[4px] bg-green-100 text-green-500 text-[10px] font-semibold whitespace-nowrap">
                    {selectedPlan.discountPct}% OFF
                  </span>
                </div>

                <p className="mt-[8px] text-[14px]">
                  <span className="line-through text-gray-400">₹{selectedPlan.oldPrice}</span>
                  <span className="ml-[4px] font-semibold text-green-500">
                    ₹{selectedPlan.pricePerAc}/AC
                  </span>
                </p>

                <p className="text-[10px] text-gray-500 mt-[3px]">
                  Starts At ₹{selectedPlan.pricePerAc}/AC
                </p>
                <p className="text-[10px] text-gray-500">{selectedPlan.validity}</p>

                {/* Options dropdown-style button (visual like HTML) */}
                <button
                  type="button"
                  className="mt-[10px] w-full h-[28px] px-[10px] rounded-[7px] border border-gray-200 bg-white text-[11px] text-gray-500 flex items-center justify-between"
                >
                  <span>2 Options Available</span>
                  <span>⌄</span>
                </button>
              </div>

              {/* Savings box */}
              <div className="mt-[12px] rounded-[10px] border border-green-200 bg-green-50 px-[12px] py-[10px]">
                <div className="flex items-center">
                  <span className="text-green-500 mr-[7px] font-bold">✓</span>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">
                      Saved ₹{savedAmount}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Save up to ₹250 with Annual Maintenance Plan
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantee box */}
              <div className="mt-[12px] border border-gray-200 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-[12px]">
                <div className="flex items-start justify-between mb-[10px] gap-[8px]">
                  <h3 className="text-[18px] font-semibold text-gray-900">
                    Our Service Guarantee
                  </h3>
                  {/* Badge medal icon (blue/gold like HTML) */}
                  <div className="w-[28px] h-[28px] shrink-0 rounded-full flex items-center justify-center">
                    <svg width="30" height="34" viewBox="0 0 73 73" fill="none">
                      <circle cx="36" cy="26" r="17" stroke="#F59E0B" strokeWidth="4" />
                      <path d="M28 41L23 70l13-8 13 8-5-29" stroke="#2772CC" strokeWidth="4" strokeLinejoin="round"/>
                      <path d="M29 25l5 5 10-9" stroke="#2772CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <ul className="text-[12px] text-gray-500 leading-[1.9]">
                  <li>✓ Certified Technicians</li>
                  <li>✓ Transparent Pricing</li>
                  <li>✓ Genuine Spare Parts</li>
                  <li>✓ 30-Day Service Warranty</li>
                </ul>
              </div>

              {/* Cart box — count updates when plans are added */}
              <div className="mt-[12px] cursor-pointer border border-gray-200 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] min-h-[75px] flex flex-col items-center justify-center">
                {cartCount === 0 ? (
                  <>
                    <span className="text-[25px] text-gray-400">🛒</span>
                    <p className="text-[10px] text-gray-400 mt-[3px]">
                      No Items In Your Cart
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-[25px]">🛒</span>
                    <p className="text-[11px] font-semibold text-gray-700 mt-[3px]">
                      {cartCount} Item{cartCount > 1 ? "s" : ""} In Your Cart
                    </p>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
