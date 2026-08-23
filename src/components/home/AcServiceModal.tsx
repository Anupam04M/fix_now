"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Plan {
  id: string;
  name: string;
  duration: string;
  discountPct: number;
  oldPrice: number;
  pricePerAc: number;
  validity: string;
}

type ActiveTab = "plans" | "service" | "repair" | "install";

interface AcServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

/* ============================================================
   YOUR 3 IMAGES
   ============================================================ */

import serviceImage from "../../assets/images/service.png";
import repairImage from "../../assets/images/repairinggassac.png";
import installImage from "../../assets/images/installuninstall.png";

/* ============================================================
   PLAN DATA
   ============================================================ */

const PLAN_DATA: Plan[] = [
  {
    id: "annual",
    name: "Annual Service Plan",
    duration: "1 Year",
    discountPct: 25,
    oldPrice: 999,
    pricePerAc: 749,
    validity: "AC Valid For 1 Year",
  },
  {
    id: "half-yearly",
    name: "Half-Yearly Service Plan",
    duration: "6 Months",
    discountPct: 15,
    oldPrice: 999,
    pricePerAc: 820,
    validity: "AC Valid For 6 Months",
  },
  {
    id: "quarterly",
    name: "Quarterly Service Plan",
    duration: "3 Months",
    discountPct: 10,
    oldPrice: 999,
    pricePerAc: 900,
    validity: "AC Valid For 3 Months",
  },
];

const FULL_INCLUDES = [
  "2 Comprehensive Service In {DURATION}",
  "Applicable for Split Window or Split AC",
  "Deep Cleaning of Filters, Condenser & Evaporator",
  "Performance Check & Optimization",
];

/* ============================================================
   COMPONENT
   ============================================================ */

export default function AcServiceModal({
  isOpen,
  onClose,
  serviceName = "AC",
}: AcServiceModalProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("plans");
  const [selectedPlanId, setSelectedPlanId] = useState("annual");
  const [cartCount, setCartCount] = useState(0);

  if (!isOpen) return null;

  const selectedPlan =
    PLAN_DATA.find((plan) => plan.id === selectedPlanId) ?? PLAN_DATA[0];

  const savedAmount = selectedPlan.oldPrice - selectedPlan.pricePerAc;

  const handleAdd = (plan: Plan) => {
    setSelectedPlanId(plan.id);
    setCartCount((count) => count + 1);
  };

  const tabs = [
    {
      id: "plans" as const,
      title: "Service Plans",
      image: null,
    },
    {
      id: "service" as const,
      title: "Service",
      image: serviceImage,
    },
    {
      id: "repair" as const,
      title: "Repair Gas Refill",
      image: repairImage,
    },
    {
      id: "install" as const,
      title: "Install Uninstall",
      image: installImage,
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[2px]">
      {/* ========================================================
          BACKDROP
          ======================================================== */}

      <div className="absolute inset-0" onClick={onClose} />

      {/* ========================================================
          OUTER SCROLL AREA
          ======================================================== */}

      <div className="relative flex h-full w-full items-start justify-center overflow-y-auto px-[12px] py-[25px] sm:px-[20px] sm:py-[35px] lg:px-[30px] lg:py-[45px]">
        {/* ======================================================
            MODAL
            ====================================================== */}

        <div
          className="
            relative
            flex
            w-full
            max-w-[1400px]
            flex-col
            overflow-hidden
            rounded-[12px]
            bg-white
            shadow-[0_8px_35px_rgba(0,0,0,0.20)]
          "
        >
          {/* ====================================================
              CLOSE BUTTON
              ==================================================== */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              absolute
              left-[8px]
              top-[6px]
              z-30
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-full
              text-[24px]
              leading-none
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            ×
          </button>

          {/* ====================================================
              SCROLLABLE CONTENT
              ==================================================== */}

          <div
            className="
              max-h-[90vh]
              overflow-y-auto
              overscroll-contain
              px-[18px]
              pb-[30px]
              pt-[25px]

              sm:px-[25px]
              sm:pb-[35px]
              sm:pt-[30px]

              lg:px-[32px]
              lg:pb-[45px]
              lg:pt-[32px]

              [&::-webkit-scrollbar]:w-[8px]
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
            "
          >
            {/* ==================================================
                BREADCRUMB
                ================================================== */}

            <div className="mb-[15px] flex items-center gap-[7px]">
              <span className="text-[13px] font-medium text-[#265DA7] sm:text-[14px]">
                Professional Electrical Solution
              </span>

              <span className="text-[15px] text-[#99D7F7]">&gt;</span>

              <span className="text-[13px] font-medium text-[#265DA7] sm:text-[14px]">
                {serviceName}
              </span>
            </div>

            {/* ==================================================
                LOCATION
                ================================================== */}

            <div className="mb-[25px]">
              <button
                type="button"
                className="
                  inline-flex
                  h-[32px]
                  items-center
                  rounded-[6px]
                  border
                  border-gray-200
                  bg-white
                  px-[11px]
                  shadow-sm
                "
              >
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#173F75"
                  strokeWidth="2"
                  className="mr-[6px]"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <span className="text-[11px] text-gray-500 sm:text-[12px]">
                  Salt Lake, Sector 1, Kolkata, West Bengal 700064
                </span>
              </button>
            </div>

            {/* ==================================================
                MAIN GRID
                ================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-[25px]
                lg:grid-cols-12
              "
            >
              {/* =================================================
                  LEFT SIDE
                  ================================================= */}

              <div className="min-w-0 lg:col-span-8">
                {/* =================================================
                    TITLE
                    ================================================= */}

                <div className="mb-[22px]">
                  <h1
                    className="
                      mb-[7px]
                      text-[28px]
                      font-semibold
                      leading-none
                      text-gray-900
                      sm:text-[31px]
                      lg:text-[34px]
                    "
                  >
                    {serviceName}
                  </h1>

                  <div className="flex flex-wrap items-center text-[12px] text-gray-500">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="#f59e0b"
                      className="mr-[4px]"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>

                    <span className="font-semibold text-gray-900">4.7</span>

                    <span className="ml-[4px]">(13.7k Reviews)</span>

                    <span className="mx-[7px] text-gray-300">•</span>

                    <span>13.7K Bookings</span>
                  </div>

                  <p className="mt-[7px] text-[13px] text-gray-900">
                    Professional {serviceName} Service At Your Doorstep
                  </p>

                  <p className="mt-[3px] text-[11px] text-gray-500">
                    Starting At ₹1,499
                  </p>
                </div>

                {/* =================================================
                    SELECT A SERVICE
                    ================================================= */}

                <div className="mb-[18px]">
                  <h2 className="mb-[10px] text-[16px] font-semibold text-gray-900">
                    Select A Service
                  </h2>

                  <div className="grid grid-cols-2 gap-[9px] sm:grid-cols-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          rounded-[8px]
                          border-2
                          bg-white
                          p-[8px]
                          text-left
                          transition
                          ${
                            activeTab === tab.id
                              ? "border-blue-600"
                              : "border-gray-200 hover:border-blue-400"
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            h-[72px]
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-[6px]
                            bg-white
                          "
                        >
                          {tab.id === "plans" ? (
                            <div
                              className="
                                flex
                                h-[51px]
                                w-[46px]
                                flex-col
                                items-center
                                justify-center
                                rounded-[6px]
                                border
                                border-green-200
                                bg-green-50
                              "
                            >
                              <span className="text-[17px] font-bold leading-none text-green-500">
                                25%
                              </span>

                              <span className="mt-[2px] text-[11px] font-bold text-green-500">
                                OFF
                              </span>
                            </div>
                          ) : (
                            tab.image && (
                              <Image
                                src={tab.image}
                                alt={tab.title}
                                className="h-[68px] w-full object-contain"
                              />
                            )
                          )}
                        </div>

                        <p className="mt-[7px] truncate text-[11px] font-semibold text-gray-900">
                          {tab.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    TRUST BAR
                    ================================================= */}

                <div
                  className="
                    mb-[18px]
                    w-full
                    rounded-[9px]
                    border
                    border-gray-200
                    bg-white
                    px-[10px]
                    py-[10px]
                    shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                  "
                >
                  <div className="grid grid-cols-3">
                    {/* TRUSTED */}

                    <div className="flex items-center justify-center border-r border-gray-200 px-[8px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1e3a8a"
                        strokeWidth="1.7"
                        className="mr-[7px] shrink-0"
                      >
                        <circle cx="9" cy="8" r="3.4" />
                        <path
                          d="M2.8 20c.7-3.4 3.2-5.2 6.2-5.2s5.5 1.8 6.2 5.2"
                          strokeLinecap="round"
                        />
                        <circle cx="17" cy="9" r="2.6" />
                        <path
                          d="M15.6 14.9c2.8-.4 5.1 1.1 5.7 4"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div>
                        <p className="text-[11px] font-semibold text-gray-900">
                          Trusted Professionals
                        </p>

                        <p className="text-[9px] text-gray-500">
                          Verified Experts
                        </p>
                      </div>
                    </div>

                    {/* WARRANTY */}

                    <div className="flex items-center justify-center border-r border-gray-200 px-[8px]">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1e3a8a"
                        strokeWidth="1.7"
                        className="mr-[7px] shrink-0"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path
                          d="M9 11.5l2 2 4-4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div>
                        <p className="text-[11px] font-semibold text-gray-900">
                          1 Year Service Warranty
                        </p>

                        <p className="text-[9px] text-gray-500">
                          Service Protection
                        </p>
                      </div>
                    </div>

                    {/* CONFIRMATION */}

                    <div className="flex items-center justify-center px-[8px]">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1e3a8a"
                        strokeWidth="1.7"
                        className="mr-[7px] shrink-0"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3.5 2" strokeLinecap="round" />
                      </svg>

                      <div>
                        <p className="text-[11px] font-semibold text-gray-900">
                          Instant Confirmation
                        </p>

                        <p className="text-[9px] text-gray-500">
                          Quick Booking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    SERVICE PLANS
                    ================================================= */}

                {activeTab === "plans" && (
                  <div className="space-y-[12px]">
                    {PLAN_DATA.map((plan) => (
                      <div
                        key={plan.id}
                        className="
                          rounded-[9px]
                          border
                          border-gray-200
                          bg-white
                          p-[11px]
                          shadow-[0_2px_7px_rgba(0,0,0,0.05)]
                        "
                      >
                        {/* PLAN TITLE */}

                        <div className="mb-[8px] flex items-center justify-between">
                          <h3 className="text-[15px] font-semibold text-gray-900">
                            {plan.name}

                            <span className="ml-[4px] text-[11px] font-normal text-gray-400">
                              ({plan.duration})
                            </span>

                            <span className="ml-[5px] rounded-[3px] bg-green-100 px-[5px] py-[2px] text-[9px] font-semibold text-green-500">
                              {plan.discountPct}% OFF
                            </span>
                          </h3>
                        </div>

                        {/* PRICE PANEL */}

                        <div className="mb-[9px] rounded-[5px] bg-[#f3f4f6] px-[10px] py-[9px]">
                          <p className="text-[14px] font-semibold text-gray-900">
                            {plan.name}
                          </p>

                          <p className="mt-[3px] text-[12px]">
                            <span className="mr-[4px] text-gray-400 line-through">
                              ₹{plan.oldPrice}
                            </span>

                            <span className="font-semibold text-green-500">
                              ₹{plan.pricePerAc}/AC
                            </span>
                          </p>

                          <p className="mt-[2px] text-[9px] text-gray-500">
                            Starts At ₹{plan.pricePerAc}/AC
                          </p>

                          <p className="text-[9px] text-gray-500">
                            {plan.validity}
                          </p>
                        </div>

                        {/* INCLUDED */}

                        <p className="mb-[4px] text-[10px] font-semibold text-gray-900">
                          What's Included
                        </p>

                        <ul className="space-y-[2px] text-[9px] leading-[1.5] text-gray-500">
                          {(plan.id === "quarterly"
                            ? FULL_INCLUDES.slice(1)
                            : FULL_INCLUDES.map((item) =>
                                item.replace("{DURATION}", plan.duration),
                              )
                          ).map((item) => (
                            <li key={item}>✓ {item}</li>
                          ))}

                          <li>✓ Free Cancellation Before 6 Hours</li>
                        </ul>

                        {/* ADD */}

                        <div className="mt-[8px] flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleAdd(plan)}
                            className="
                              h-[25px]
                              min-w-[55px]
                              rounded-[5px]
                              border
                              border-blue-300
                              bg-blue-50
                              px-[10px]
                              text-[10px]
                              font-semibold
                              text-blue-600
                              transition
                              hover:bg-blue-600
                              hover:text-white
                            "
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* =================================================
                    SERVICE
                    ================================================= */}

                {activeTab === "service" && (
                  <ServicePanel
                    title="AC Service"
                    subtitle="Professional AC Service"
                    price="₹499 onwards"
                    description="Complete AC servicing at your doorstep"
                    image={serviceImage}
                    onAdd={() => setCartCount((count) => count + 1)}
                  />
                )}

                {/* =================================================
                    REPAIR
                    ================================================= */}

                {activeTab === "repair" && (
                  <ServicePanel
                    title="Repair & Gas Refill"
                    subtitle="Split / Window AC Repair"
                    price="₹599 onwards"
                    description="Inspection included"
                    image={repairImage}
                    onAdd={() => setCartCount((count) => count + 1)}
                  />
                )}

                {/* =================================================
                    INSTALL
                    ================================================= */}

                {activeTab === "install" && (
                  <ServicePanel
                    title="Install / Uninstall"
                    subtitle="AC Installation Or Removal"
                    price="₹1,200 onwards"
                    description="Drilling & fittings included"
                    image={installImage}
                    onAdd={() => setCartCount((count) => count + 1)}
                  />
                )}
              </div>

              {/* =================================================
                  RIGHT SIDEBAR
                  ================================================= */}

              <aside className="min-w-0 lg:col-span-4">
                {/* =================================================
                    SELECTED PLAN
                    ================================================= */}

                <div
                  className="
                    rounded-[9px]
                    border
                    border-gray-200
                    bg-white
                    p-[11px]
                    shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                  "
                >
                  <div className="flex items-start justify-between gap-[8px]">
                    <h3 className="text-[15px] font-semibold text-gray-900">
                      {selectedPlan.name}
                    </h3>

                    <span className="whitespace-nowrap rounded-[3px] bg-green-100 px-[5px] py-[3px] text-[9px] font-semibold text-green-500">
                      {selectedPlan.discountPct}% OFF
                    </span>
                  </div>

                  <p className="mt-[8px] text-[12px]">
                    <span className="text-gray-400 line-through">
                      ₹{selectedPlan.oldPrice}
                    </span>

                    <span className="ml-[5px] font-semibold text-green-500">
                      ₹{selectedPlan.pricePerAc}/AC
                    </span>
                  </p>

                  <p className="mt-[2px] text-[9px] text-gray-500">
                    Starts At ₹{selectedPlan.pricePerAc}/AC
                  </p>

                  <p className="text-[9px] text-gray-500">
                    {selectedPlan.validity}
                  </p>

                  <button
                    type="button"
                    className="
                      mt-[10px]
                      flex
                      h-[30px]
                      w-full
                      items-center
                      justify-between
                      rounded-[6px]
                      border
                      border-gray-200
                      bg-white
                      px-[9px]
                      text-[9px]
                      text-gray-500
                    "
                  >
                    <span>2 Options Available</span>

                    <span>⌄</span>
                  </button>
                </div>

                {/* =================================================
                    SAVINGS
                    ================================================= */}

                <div
                  className="
                    mt-[10px]
                    rounded-[8px]
                    border
                    border-green-200
                    bg-green-50
                    px-[11px]
                    py-[9px]
                  "
                >
                  <div className="flex items-center">
                    <span className="mr-[7px] text-[14px] font-bold text-green-500">
                      ✓
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold text-gray-900">
                        Saved ₹{savedAmount}
                      </p>

                      <p className="mt-[2px] text-[8px] text-gray-500">
                        Save up to ₹250 with Annual Maintenance Plan
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    GUARANTEE
                    ================================================= */}

                <div
                  className="
                    mt-[10px]
                    rounded-[9px]
                    border
                    border-gray-200
                    bg-white
                    p-[11px]
                    shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                  "
                >
                  <div className="mb-[10px] flex items-start justify-between">
                    <h3 className="text-[15px] font-semibold text-gray-900">
                      Our Service Guarantee
                    </h3>

                    <svg width="32" height="34" viewBox="0 0 73 73" fill="none">
                      <circle
                        cx="36"
                        cy="26"
                        r="17"
                        stroke="#F59E0B"
                        strokeWidth="4"
                      />

                      <path
                        d="M28 41L23 70l13-8 13 8-5-29"
                        stroke="#2772CC"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M29 25l5 5 10-9"
                        stroke="#2772CC"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <ul className="space-y-[5px] text-[10px] leading-[1.5] text-gray-500">
                    <li>✓ Certified Technicians</li>
                    <li>✓ Transparent Pricing</li>
                    <li>✓ Genuine Spare Parts</li>
                    <li>✓ 30-Day Service Warranty</li>
                  </ul>
                </div>

                {/* =================================================
                    CART
                    ================================================= */}

                <div
                  className="
                    mt-[10px]
                    flex
                    min-h-[80px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-gray-200
                    bg-white
                    shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                  "
                >
                  {cartCount === 0 ? (
                    <>
                      <span className="text-[24px] text-gray-400">🛒</span>

                      <p className="mt-[4px] text-[9px] text-gray-400">
                        No Items In Your Cart
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-[24px]">🛒</span>

                      <p className="mt-[4px] text-[10px] font-semibold text-gray-700">
                        {cartCount} Item
                        {cartCount > 1 ? "s" : ""} In Your Cart
                      </p>
                    </>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SERVICE PANEL
   ================================================================ */

interface ServicePanelProps {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  image: any; // Allow Next.js Image types
  onAdd: () => void;
}

function ServicePanel({
  title,
  subtitle,
  price,
  description,
  image,
  onAdd,
}: ServicePanelProps) {
  return (
    <div
      className="
        rounded-[9px]
        border
        border-gray-200
        bg-white
        p-[12px]
        shadow-[0_2px_7px_rgba(0,0,0,0.05)]
      "
    >
      <div className="flex items-center gap-[14px]">
        <div
          className="
            flex
            h-[100px]
            w-[130px]
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-[7px]
            bg-[#f3f4f6]
          "
        >
          <Image
            src={image}
            alt={subtitle}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-semibold text-gray-900">{title}</h3>

          <p className="mt-[7px] text-[13px] font-semibold text-gray-900">
            {subtitle}
          </p>

          <p className="mt-[5px] text-[13px] font-semibold text-green-500">
            {price}
          </p>

          <p className="mt-[4px] text-[10px] text-gray-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="
            h-[30px]
            min-w-[60px]
            shrink-0
            rounded-[5px]
            border
            border-blue-300
            bg-blue-50
            px-[12px]
            text-[11px]
            font-semibold
            text-blue-600
            transition
            hover:bg-blue-600
            hover:text-white
          "
        >
          Add
        </button>
      </div>
    </div>
  );
}
