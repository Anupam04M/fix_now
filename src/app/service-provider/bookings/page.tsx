"use client";

// src/app/service-provider/bookings/page.tsx
// ================================================================
// PROVIDER BOOKINGS  (route: /service-provider/bookings)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to Fix_now-Dashboard-_backend_part/bookings.html
//
// SECTIONS:
//   1. STATUS SUMMARY : New Requests | Accepted | In Progress |
//                       Completed (glass cards, reflection blobs)
//   2. REQUEST LIST   : 3 request cards (Respond badge, customer,
//                       service box, date/amount, actions)
//   3. HISTORY        : search + tabs + Filters, table w/ status
//                       pills, pagination (orange prev/next)
//
// ============================================================
// DATA FLOW — STATIC -> DYNAMIC IN 3 STEPS
// ============================================================
//   Everything renders from BOOKINGS_PAGE_DATA below. Its shape IS
//   the API contract. To go live:
//     STEP 1: open src/api/api-function/provider.function.ts
//     STEP 2: fill fetchProviderBookingsFn()'s real api.get call and
//             delete its mock return
//     STEP 3: move BOOKINGS_PAGE_DATA into that function (or map the
//             response onto this shape) and delete it here.
//
//   ACTIONS ALREADY WIRED:
//     - Accept Booking -> acceptBookingFn(id) [exists, mock-backed]
//     - Decline        -> add declineBookingFn when backend ships
//     - View Details   -> navigate to /service-provider/bookings/[id]
// ============================================================

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { acceptBookingFn } from "@/api/api-function/provider.function";

/* ==================== STATIC DATA (matches HTML) ==================== */
const BOOKINGS_PAGE_DATA = {
  summary: {
    newRequests: { value: "12", note: "Waiting" },
    accepted: { value: "08", note: "Upcoming" },
    inProgress: { value: "02", note: "Active Now" },
    completed: { value: "156", note: "+12%" },
  },
  requests: [
    {
      id: "FNP-24891",
      badge: "Respond Within 08:42",
      urgent: true,
      customer: "Rajesh Kumar",
      location: "Salt Lake, Kolkata",
      serviceTitle: "AC Repair",
      serviceSub: "Gas Filling",
      date: "12 Aug 2026",
      time: "10:00 AM – 12:00 PM",
      amountLabel: "Amount (UPI)",
      amount: "₹799",
    },
    {
      id: "FNP-24895",
      badge: "Received 2h Ago",
      urgent: false,
      customer: "Vikram Singh",
      location: "Ballygunge, Kolkata",
      serviceTitle: "Refrigerator Repair",
      serviceSub: "Condenser Coil Cleaning",
      date: "14 Aug 2026",
      time: "02:00 PM – 04:00 PM",
      amountLabel: "Amount",
      amount: "₹599",
    },
    {
      id: "FNP-24902",
      badge: "Received 2h Ago",
      urgent: false,
      customer: "Sneha Das",
      location: "Barasat, Kolkata",
      serviceTitle: "Washing Machine Repair",
      serviceSub: "Belt Replacement",
      date: "15 Aug 2026",
      time: "10:30 AM – 12:30 PM",
      amountLabel: "Amount",
      amount: "₹850",
    },
  ],
  historyRows: [
    { id: "#FNP-24750", customer: "Priya Das", service: "AC Service", dateTime: "01 Aug 2026 • 10:00 AM", amount: "₹999", status: "Completed" },
    { id: "#FNP-24750", customer: "Priya Das", service: "AC Service", dateTime: "01 Aug 2026 • 10:00 AM", amount: "₹999", status: "Completed" },
    { id: "#FNP-24782", customer: "Rahul Mehta", service: "Refrigerator Repair", dateTime: "05 Aug 2026 • 02:30 PM", amount: "₹1,299", status: "Completed" },
    { id: "#FNP-24750", customer: "Priya Das", service: "AC Service", dateTime: "01 Aug 2026 • 10:00 AM", amount: "₹999", status: "Completed" },
    { id: "#FNP-24750", customer: "Priya Das", service: "AC Service", dateTime: "01 Aug 2026 • 10:00 AM", amount: "₹999", status: "Completed" },
  ],
  showingText: "Showing 1 - 5 Out Of 140 Categories",
  historyPages: ["1", "2", "3", "...", "8"],
};

/* Shared wrappers copied verbatim from the HTML */
const SUMMARY_CARD =
  "relative min-h-[72px] overflow-hidden rounded-[18px] border border-white/80 bg-white/90 p-[12px] shadow-[0_4px_16px_rgba(39,114,204,0.04)] backdrop-blur-[16px] sm:min-h-[76px] sm:px-[12px] md:min-h-[82px] md:rounded-[20px] md:px-[14px] lg:min-h-[88px] lg:rounded-[24px] lg:p-[20px]";
const REQUEST_CARD =
  "relative min-w-0 overflow-hidden rounded-[18px] border border-[#E3E8EE] bg-white/80 p-[12px] shadow-[0_4px_18px_rgba(39,114,204,0.035)] backdrop-blur-[14px] sm:rounded-[20px] sm:p-[14px] md:rounded-[22px] md:p-[14px] lg:rounded-[24px] lg:p-[32px]";
/* Reflection blob inside every summary card */
const BLOB =
  "pointer-events-none absolute -right-[22px] -top-[18px] h-[68px] w-[82px] rounded-full bg-[#a9ddf9]/80 blur-[18px]";

export default function ProviderBookingsPage() {
  const d = BOOKINGS_PAGE_DATA;

  // Active history tab ("All" is blue-filled on load)
  const [activeTab, setActiveTab] = useState("All");
  // Requests whose Accept was clicked -> show confirmation strip
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  /* Accept uses the existing API fn (mock-backed until backend lands) */
  const handleAccept = async (id: string) => {
    try {
      const res = await acceptBookingFn(id);
      if (res.success) {
        setAcceptedIds((p) => [...p, id]);
        toast.success("Booking accepted!");
      } else {
        toast.error(res.message || "Could not accept booking.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleDecline = () => toast.info("Decline flow coming soon.");
  const handleDetails = () =>
    toast.info("Detail page opens at /service-provider/bookings/[id]");

  return (
    <main className="relative z-10 px-[10px] pt-[18px] sm:px-[14px] md:px-[20px] md:pt-[24px] lg:px-[24px] lg:pt-[34px]">
      {/* ==================== 1. STATUS SUMMARY CARDS ==================== */}
      <section className="grid grid-cols-1 gap-[8px] sm:grid-cols-1 sm:gap-[10px] md:grid-cols-2 md:gap-[12px] lg:grid-cols-4 lg:gap-[24px]">
        {/* CARD 1 : NEW REQUESTS */}
        <div className={SUMMARY_CARD}>
          <div className={BLOB} />
          <div className="relative z-10 flex items-center">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[#DDF0FC] md:h-[32px] md:w-[32px] lg:h-[35px] lg:w-[35px] lg:rounded-[12px]">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <path d="M2 16C1.45 16 .98 15.8.59 15.41C.2 15.02 0 14.55 0 14V2C0 1.45.2.98.59.59C.98.2 1.45 0 2 0H20C20.55 0 21.02.2 21.41.59C21.8.98 22 1.45 22 2V14C22 14.55 21.8 15.02 21.41 15.41C21.02 15.8 20.55 16 20 16H2ZM2 14H20V2H2V14ZM2.5 11H3.75V7.5L6.3 11H7.5V5H6.25V8.5L3.75 5H2.5V11ZM8.5 11H12.5V9.75H10V8.65H12.5V7.4H10V6.25H12.5V5H8.5V11ZM14.5 11H18.5C18.78 11 19.02 10.9 19.21 10.71C19.4 10.52 19.5 10.28 19.5 10V5H18.25V9.5H17.15V6H15.9V9.5H14.75V5H13.5V10C13.5 10.28 13.6 10.52 13.79 10.71C13.98 10.9 14.22 11 14.5 11ZM2 14V2V14Z" fill="#45A5EC"/>
              </svg>
            </div>
            <div className="ml-[8px] md:ml-[10px] lg:ml-[12px]">
              <p className="text-[12px] font-semibold leading-[1.1] text-[#1F2937] md:text-[14px] lg:text-[16px]">New</p>
              <p className="mt-[2px] text-[15px] font-semibold leading-[1.1] text-[#1F2937] sm:text-[16px]">Requests</p>
            </div>
          </div>
          <div className="relative z-10 mt-[10px] flex items-center md:mt-[14px] lg:mt-[20px]">
            <span className="text-[16px] font-bold leading-none text-[#030712] md:text-[18px] lg:text-[20px]">
              {d.summary.newRequests.value}
            </span>
            {/* Red waiting pill with warning triangle */}
            <span className="ml-[20px] inline-flex items-center rounded-[12px] bg-[#f0b5b5] px-[8px] py-[2px] text-[12px] font-medium text-[#DC2626] sm:text-[14px]">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" className="mr-[5px] shrink-0">
                <path d="M0 11.08L6.42 0L12.83 11.08H0ZM2.01 9.92H10.82L6.42 2.33L2.01 9.92ZM6.42 9.33C6.58 9.33 6.72 9.28 6.83 9.17C6.94 9.05 7 8.92 7 8.75C7 8.58 6.94 8.45 6.83 8.33C6.72 8.22 6.58 8.17 6.42 8.17C6.25 8.17 6.11 8.22 6 8.33C5.89 8.45 5.83 8.58 5.83 8.75C5.83 8.92 5.89 9.05 6 9.17C6.11 9.28 6.25 9.33 6.42 9.33ZM5.83 7.58H7V4.67H5.83V7.58Z" fill="#DC2626"/>
              </svg>
              {d.summary.newRequests.note}
            </span>
          </div>
        </div>

        {/* CARD 2 : ACCEPTED */}
        <div className={SUMMARY_CARD}>
          <div className={BLOB} />
          <div className="relative z-10 flex items-center">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[#DDF0FC] md:h-[32px] md:w-[32px] lg:h-[35px] lg:w-[35px] lg:rounded-[12px]">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M7.95 16.35L4.4 12.8L5.85 11.35L7.95 13.45L12.15 9.25L13.6 10.7L7.95 16.35ZM2 20C1.45 20 .98 19.8.59 19.41C.2 19.02 0 18.55 0 18V4C0 3.45.2 2.98.59 2.59C.98 2.2 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.02 2.2 17.41 2.59C17.8 2.98 18 3.45 18 4V18C18 18.55 17.8 19.02 17.41 19.41C17.02 19.8 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z" fill="#68C0F2"/>
              </svg>
            </div>
            <div className="ml-[8px] md:ml-[10px] lg:ml-[12px]">
              <p className="text-[12px] font-semibold leading-[1.1] text-[#1F2937] md:text-[14px] lg:text-[16px]">Accepted</p>
            </div>
          </div>
          <div className="relative z-10 mt-[10px] flex items-center md:mt-[14px] lg:mt-[20px]">
            <span className="text-[16px] font-bold leading-none text-[#030712] md:text-[18px] lg:text-[20px]">
              {d.summary.accepted.value}
            </span>
            <span className="ml-[10px] text-[10px] font-medium text-[#374151] md:text-[12px] lg:ml-[20px] lg:text-[14px]">
              {d.summary.accepted.note}
            </span>
          </div>
        </div>

        {/* CARD 3 : IN PROGRESS */}
        <div className={SUMMARY_CARD}>
          <div className={BLOB} />
          <div className="relative z-10 flex items-center">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[#DDF0FC] md:h-[32px] md:w-[32px] lg:h-[35px] lg:w-[35px] lg:rounded-[12px]">
              {/* Wrench-in-circle icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="#68C0F2" strokeWidth="1.5"/>
                <path d="M11.5 13.5L7.6 9.6C7.35 9.68 7.1 9.74 6.84 9.78C6.57 9.83 6.29 9.85 6 9.85C4.73 9.85 3.64 9.4 2.75 8.52C1.86 7.63 1.42 6.55 1.42 5.27C1.42 4.81 1.48 4.37 1.61 3.95C1.74 3.53 1.92 3.14 2.15 2.77L4.87 5.47L6.31 4.03L3.61 1.33C3.97 1.1 4.36 0.93 4.77 0.8C5.19 0.68 5.63 0.61 6.09 0.61C7.37 0.61 8.45 1.06 9.34 1.94C10.23 2.83 10.67 3.91 10.67 5.19C10.67 5.48 10.65 5.76 10.6 6.03C10.56 6.29 10.49 6.55 10.4 6.8L14.4 10.77C14.54 10.91 14.61 11.09 14.61 11.3C14.61 11.51 14.54 11.69 14.4 11.83L12.56 13.67C12.42 13.81 12.25 13.88 12.04 13.88C11.84 13.88 11.66 13.75 11.5 13.5Z" fill="#68C0F2"/>
              </svg>
            </div>
            <div className="ml-[8px] md:ml-[10px] lg:ml-[12px]">
              <p className="text-[12px] font-semibold leading-[1.1] text-[#1F2937] md:text-[14px] lg:text-[16px]">In Progress</p>
            </div>
          </div>
          <div className="relative z-10 mt-[10px] flex items-center md:mt-[14px] lg:mt-[20px]">
            <span className="text-[16px] font-bold leading-none text-[#030712] md:text-[18px] lg:text-[20px]">
              {d.summary.inProgress.value}
            </span>
            <span className="ml-[10px] text-[10px] font-medium text-[#374151] md:text-[12px] lg:ml-[20px] lg:text-[14px]">
              {d.summary.inProgress.note}
            </span>
          </div>
        </div>

        {/* CARD 4 : COMPLETED */}
        <div className={SUMMARY_CARD}>
          <div className={BLOB} />
          <div className="relative z-10 flex items-center">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[#DDF0FC] md:h-[32px] md:w-[32px] lg:h-[35px] lg:w-[35px] lg:rounded-[12px]">
              <svg width="22" height="13" viewBox="0 0 22 13" fill="none">
                <path d="M5.65 12.03L0 6.38L1.43 4.98L5.68 9.23L7.08 10.63L5.65 12.03ZM11.3 12.03L5.65 6.38L7.05 4.95L11.3 9.2L20.5 0L21.9 1.43L11.3 12.03ZM11.3 6.38L9.88 4.98L14.83.03L16.25 1.43L11.3 6.38Z" fill="#68C0F2"/>
              </svg>
            </div>
            <div className="ml-[8px] md:ml-[10px] lg:ml-[12px]">
              <p className="text-[12px] font-semibold leading-[1.1] text-[#1F2937] md:text-[14px] lg:text-[16px]">Completed</p>
            </div>
          </div>
          <div className="relative z-10 mt-[10px] flex items-center md:mt-[14px] lg:mt-[20px]">
            <span className="text-[16px] font-bold leading-none text-[#030712] md:text-[18px] lg:text-[20px]">
              {d.summary.completed.value}
            </span>
            {/* Green growth badge */}
            <span className="ml-[20px] inline-flex items-center rounded-[12px] bg-[#c5fada] px-[8px] py-[2px] text-[12px] font-semibold text-[#16A34A] sm:text-[14px]">
              <svg width="17" height="10" viewBox="0 0 17 10" fill="none" className="mr-[4px]">
                <path d="M1.19 10L0 8.83L6.29 2.63L9.69 5.96L14.11 1.67H11.9V0H17V5H15.3V2.83L9.69 8.33L6.29 5L1.19 10Z" fill="#16A34A"/>
              </svg>
              {d.summary.completed.note}
            </span>
          </div>
        </div>
      </section>

      {/* ==================== 2. BOOKING REQUEST LIST ==================== */}
      <div className="mt-[18px] space-y-[10px] rounded-[20px] bg-white/80 px-[8px] py-[8px] shadow-[0_4px_18px_rgba(39,114,204,0.035)] backdrop-blur-[14px] sm:mt-[22px] sm:space-y-[10px] sm:rounded-[24px] sm:px-[10px] sm:py-[10px] md:mt-[26px] md:space-y-[12px] md:rounded-[28px] md:px-[12px] md:py-[12px] lg:mt-[32px] lg:space-y-[12px] lg:rounded-[32px] lg:px-[16px] lg:py-[14px]">
        {d.requests.map((req) => (
          <div key={req.id} className={REQUEST_CARD}>
            {/* Top-right badge — RED for urgent, GRAY otherwise */}
            {req.urgent ? (
              <div className="absolute right-[8px] top-[8px] rounded-[6px] bg-[#f3cfcf] px-[12px] py-[4px] text-[10px] font-medium text-[#DC2626] sm:right-[14px] sm:top-[10px] sm:text-[13px]">
                <svg className="mr-[4px] inline-flex" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M6.34 3.28C6.38 2.88 6.6 2.66 7 2.63C7.4 2.66 7.62 2.88 7.66 3.28V6.64L9.98 8.2C10.31 8.46 10.36 8.76 10.14 9.11C9.91 9.43 9.62 9.49 9.27 9.27L6.64 7.52C6.44 7.41 6.34 7.23 6.34 6.97V3.28ZM7 0C8.31 0.02 9.49 0.34 10.53 0.96C11.58 1.58 12.42 2.42 13.04 3.47C13.66 4.51 13.98 5.69 14 7C13.98 8.31 13.66 9.49 13.04 10.53C12.42 11.58 11.58 12.42 10.53 13.04C9.49 13.66 8.31 13.98 7 14C5.69 13.98 4.51 13.66 3.47 13.04C2.42 12.42 1.58 11.58.96 10.53C.34 9.49.02 8.31 0 7C.02 5.69.34 4.51.96 3.47C1.58 2.42 2.42 1.58 3.47.96C4.51.34 5.69.02 7 0ZM1.31 7C1.35 8.6 1.9 9.94 2.98 11.02C4.06 12.1 5.4 12.65 7 12.69C8.6 12.65 9.94 12.1 11.02 11.02C12.1 9.94 12.65 8.6 12.69 7C12.65 5.4 12.1 4.06 11.02 2.98C9.94 1.9 8.6 1.35 7 1.31C5.4 1.35 4.06 1.9 2.98 2.98C1.9 4.06 1.35 5.4 1.31 7Z" fill="#DC2626"/>
                </svg>
                {req.badge}
              </div>
            ) : (
              <div className="absolute right-[8px] top-[8px] rounded-[6px] bg-[#F1F3F4] px-[12px] py-[4px] text-[10px] font-medium text-[#6B7280] sm:right-[14px] sm:top-[10px] sm:text-[13px]">
                <svg className="mr-[4px] inline-flex" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.87 9.8L9.8 8.87L7.33 6.4V3.33H6V6.93L8.87 9.8ZM6.67 13.33C5.74 13.33 4.88 13.16 4.07 12.81C3.26 12.46 2.55 11.98 1.95 11.38C1.35 10.78.88 10.08.53 9.27C.18 8.46 0 7.59 0 6.67C0 5.74.18 4.88.53 4.07C.88 3.26 1.35 2.55 1.95 1.95C2.55 1.35 3.26.88 4.07.53C4.88.18 5.74 0 6.67 0C7.59 0 8.46.18 9.27.53C10.08.88 10.78 1.35 11.38 1.95C11.98 2.55 12.46 3.26 12.81 4.07C13.16 4.88 13.33 5.74 13.33 6.67C13.33 7.59 13.16 8.46 12.81 9.27C12.46 10.08 11.98 10.78 11.38 11.38C10.78 11.98 10.08 12.46 9.27 12.81C8.46 13.16 7.59 13.33 6.67 13.33ZM6.67 12C8.14 12 9.4 11.48 10.44 10.44C11.48 9.4 12 8.14 12 6.67C12 5.19 11.48 3.93 10.44 2.89C9.4 1.85 8.14 1.33 6.67 1.33C5.19 1.33 3.93 1.85 2.89 2.89C1.85 3.93 1.33 5.19 1.33 6.67C1.33 8.14 1.85 9.4 2.89 10.44C3.93 11.48 5.19 12 6.67 12Z" fill="#45464D"/>
                </svg>
                {req.badge}
              </div>
            )}

            {/* ---- Main info row: customer | service | date/amount ---- */}
            <div className="flex flex-col lg:flex-row">
              {/* Customer (25%) */}
              <div className="flex w-full items-start lg:w-[25%]">
                <Image
                  src={`https://i.pravatar.cc/100?u=${req.id}`}
                  alt={req.customer}
                  width={50}
                  height={50}
                  unoptimized
                  className="h-[50px] w-[50px] shrink-0 rounded-[5px] object-cover"
                />
                <div className="ml-[9px] min-w-0 lg:ml-[16px]">
                  <span className="text-[14px] font-semibold leading-none text-[#6B7280]">
                    #{req.id}
                  </span>
                  <h3 className="mt-[4px] text-[20px] font-semibold leading-none text-[#1F2937]">
                    {req.customer}
                  </h3>
                  <p className="mt-[8px] text-[14px] font-semibold leading-none text-[#6B7280]">
                    <svg className="mr-[3px] inline-flex" width="11" height="14" viewBox="0 0 11 14" fill="none">
                      <path d="M5.33 6.67C5.7 6.67 6.01 6.54 6.28 6.28C6.54 6.01 6.67 5.7 6.67 5.33C6.67 4.97 6.54 4.65 6.28 4.39C6.01 4.13 5.7 4 5.33 4C4.97 4 4.65 4.13 4.39 4.39C4.13 4.65 4 4.97 4 5.33C4 5.7 4.13 6.01 4.39 6.28C4.65 6.54 4.97 6.67 5.33 6.67ZM5.33 11.57C6.69 10.32 7.69 9.19 8.35 8.18C9.01 7.16 9.33 6.26 9.33 5.47C9.33 4.26 8.95 3.26 8.18 2.49C7.4 1.72 6.46 1.33 5.33 1.33C4.21 1.33 3.26 1.72 2.49 2.49C1.72 3.26 1.33 4.26 1.33 5.47C1.33 6.26 1.66 7.16 2.32 8.18C2.97 9.19 3.98 10.32 5.33 11.57ZM5.33 13.33C3.54 11.81 2.21 10.4 1.33 9.09C.44 7.79 0 6.58 0 5.47C0 3.8.54 2.47 1.61 1.48C2.68.49 3.92 0 5.33 0C6.74 0 7.99.49 9.06 1.48C10.13 2.47 10.67 3.8 10.67 5.47C10.67 6.58 10.23 7.79 9.34 9.09C8.46 10.4 7.12 11.81 5.33 13.33Z" fill="#6B7280"/>
                    </svg>
                    {req.location}
                  </p>
                </div>
              </div>

              {/* Service required box (28%) */}
              <div className="mt-[10px] w-full rounded-[14px] bg-white/80 p-[10px] shadow-[0_4px_18px_rgba(39,114,204,0.06)] backdrop-blur-[16px] md:mt-0 md:w-[28%] lg:w-[28%] lg:rounded-[16px] lg:p-[14px]">
                <p className="text-[9px] text-[#6B7280] md:text-[10px] lg:text-[12px]">
                  Service Required
                </p>
                <div className="mt-[6px] flex items-start">
                  <svg className="mt-[1px] shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1" y="1" width="16" height="16" rx="2" stroke="#111827" strokeWidth="1.4"/>
                    <circle cx="9" cy="9" r="3.2" stroke="#111827" strokeWidth="1.4"/>
                    <path d="M9 5V4.2M9 13.8V13M5.2 9H4.4M13.6 9H12.8M6.1 6.1L5.5 5.5M12.5 12.5L11.9 11.9M11.9 6.1L12.5 5.5M5.5 12.5L6.1 11.9" stroke="#111827" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <div className="ml-[7px]">
                    <h4 className="text-[12px] font-semibold leading-[1.1] text-[#111827] md:text-[13px] lg:text-[16px]">
                      {req.serviceTitle}
                    </h4>
                    <p className="mt-[3px] text-[9px] leading-none text-[#6B7280] md:text-[10px] lg:text-[14px]">
                      {req.serviceSub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date + Amount column (28%) */}
              <div className="mt-[10px] w-full border-t border-[#F0F2F5] pt-[9px] md:mt-0 md:w-[28%] md:border-t-0 md:pl-[10px] md:pt-0 lg:w-[28%] lg:pl-[14px]">
                {/* Date */}
                <div className="flex items-start gap-[10px]">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[12px] bg-[#E8F5FF] text-[#4CA9E8]">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                      <rect x="0.75" y="2.25" width="12.5" height="12" rx="1.25" stroke="#4CA9E8" strokeWidth="1.2"/>
                      <path d="M0.75 6H13.25M3.75 0.75V3M10.25 0.75V3" stroke="#4CA9E8" strokeWidth="1.2"/>
                      <circle cx="4" cy="8.5" r="0.5" fill="#4CA9E8"/>
                      <circle cx="7" cy="8.5" r="0.5" fill="#4CA9E8"/>
                      <circle cx="10" cy="8.5" r="0.5" fill="#4CA9E8"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#6B7280] md:text-[10px] lg:text-[12px]">{req.date}</p>
                    <p className="mt-[2px] text-[10px] font-semibold text-[#111827] md:text-[11px] lg:text-[13px]">
                      {req.time}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className="mt-[10px] flex items-start gap-[10px]">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[12px] bg-[#E8F5FF] text-[#4CA9E8]">
                    <span className="text-[13px] font-bold">₹</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#6B7280] md:text-[10px] lg:text-[12px]">
                      {req.amountLabel}
                    </p>
                    <p className="mt-[2px] text-[12px] font-bold text-[#111827] lg:text-[15px]">
                      {req.amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Action area with half-border divider ---- */}
            {!acceptedIds.includes(req.id) ? (
              <div className="relative mt-[12px] flex flex-col items-stretch gap-[7px] pt-[9px] md:ml-0 md:mt-[16px] md:flex-row md:items-center md:gap-0 lg:ml-[21%] lg:mt-[24px]">
                <div className="absolute left-0 top-0 h-px w-[60%] bg-[#E0E3E5]" />

                {/* Accept Booking - blue filled */}
                <button
                  onClick={() => handleAccept(req.id)}
                  className="w-full rounded-[10px] bg-[#2772CC] px-[12px] py-[8px] text-[10px] font-medium text-white shadow-[0_3px_8px_rgba(39,114,204,0.12)] transition duration-300 hover:bg-color-15 md:w-auto md:py-[7px] md:text-[10px] lg:rounded-[12px] lg:px-[36px] lg:py-[10px] lg:text-[14px]"
                >
                  Accept Booking
                </button>

                {/* Decline - outline blue -> red hover */}
                <button
                  onClick={handleDecline}
                  className="ml-0 w-full rounded-[10px] border border-[#2772CC] px-[12px] py-[8px] text-[10px] font-medium text-color4 transition duration-300 hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white md:ml-[8px] md:w-auto md:py-[7px] md:text-[10px] lg:ml-[12px] lg:rounded-[12px] lg:px-[36px] lg:py-[10px] lg:text-[14px]"
                >
                  Decline
                </button>

                {/* View Details - plain text link */}
                <button
                  onClick={handleDetails}
                  className="w-full text-center text-[10px] font-medium text-[#030712] transition duration-300 hover:text-color-15 md:ml-auto md:w-auto md:text-right md:text-[11px] lg:ml-[100px] lg:text-[16px]"
                >
                  View Details
                </button>
              </div>
            ) : (
              /* Post-accept confirmation strip */
              <div className="relative mt-[12px] flex items-center gap-[10px] pt-[9px] md:mt-[16px] lg:ml-[21%] lg:mt-[24px]">
                <div className="absolute left-0 top-0 h-px w-[60%] bg-[#E0E3E5]" />
                <span className="inline-flex items-center rounded-[12px] bg-[#c5fada] px-[10px] py-[3px] text-[11px] font-semibold text-[#16A34A]">
                  ✓ Booking Accepted
                </span>
                <button
                  onClick={handleDetails}
                  className="ml-auto text-[11px] font-medium text-[#030712] transition duration-300 hover:text-color-15 lg:text-[14px]"
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ==================== 3. BOOKING HISTORY ==================== */}
      <div className="mb-[14px] mt-[18px] sm:mb-[16px] sm:mt-[22px] md:mb-[18px] md:mt-[26px] lg:mb-[20px] lg:mt-[32px]">
        <div className="relative overflow-hidden rounded-[24px] border border-[#E3E8EE] bg-white/80 p-[20px] shadow-[0_4px_18px_rgba(39,114,204,0.035)] backdrop-blur-[14px] sm:px-[24px] lg:p-[32px]">
          {/* Heading + toolbar */}
          <div className="flex flex-col gap-[12px] pb-[14px] sm:gap-[14px] md:flex-row md:items-start md:justify-between lg:pb-[20px]">
            <div>
              <h3 className="text-[17px] font-semibold leading-[1.1] text-[#1F2937] sm:text-[20px]">
                Booking History
              </h3>
              <p className="mt-[7px] text-[9px] leading-[1.45] text-[#6B7280] sm:text-[12px]">
                View Your Completed, Accepted And Cancelled Bookings.
              </p>
            </div>

            <div className="flex flex-col gap-[10px] sm:flex-row sm:flex-wrap sm:items-center">
              {/* Search pill */}
              <div className="flex h-[40px] items-center rounded-[8px] border border-[#E3E8EE] bg-white px-[13px]">
                <svg width="20" height="21" viewBox="0 0 25 25" fill="none" className="shrink-0">
                  <path d="M17.71 17.71L21.87 21.87" stroke="#9AA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M19.79 11.46C19.79 6.86 16.06 3.13 11.46 3.13C6.86 3.13 3.13 6.86 3.13 11.46C3.13 16.06 6.86 19.79 11.46 19.79C16.06 19.79 19.79 16.06 19.79 11.46Z" stroke="#9AA3AF" strokeWidth="1.5"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="ml-[7px] w-full bg-transparent text-[10px] text-[#374151] outline-none placeholder:text-[#A7AFBB] sm:text-[12px]"
                />
              </div>

              {/* Tabs — active tab is blue-filled */}
              <div className="flex h-[40px] items-center rounded-[8px] border border-[#E3E8EE] bg-white p-[3px]">
                {["All", "Completed", "Accepted", "Cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`h-[32px] rounded-[6px] px-[11px] text-[9px] font-medium transition-colors sm:text-[11px] ${
                      activeTab === tab ? "bg-[#2772CC] text-white" : "text-[#6B7280]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Filters button */}
              <button className="flex h-[40px] shrink-0 items-center gap-[6px] rounded-[8px] border border-[#E3E8EE] bg-white px-[13px] text-[9px] font-medium text-[#6B7280] sm:text-[11px]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M4 5H20L14 12V19L10 21V12L4 5Z" stroke="#8B95A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-[#E3E8EE]">
                  {["Booking ID", "Customer", "Service", "Date & Time", "Amount", "Status", "Action"].map(
                    (th) => (
                      <th
                        key={th}
                        className="px-[10px] py-[13px] text-left text-[9px] font-medium uppercase text-[#6B7280] sm:text-[10px]"
                      >
                        {th}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {d.historyRows.map((row, i) => (
                  <tr key={`${row.id}-${i}`} className="border-b border-[#E3E8EE]">
                    <td className="px-[10px] py-[13px] text-[9px] font-semibold text-[#6B7280] sm:text-[12px]">
                      {row.id}
                    </td>
                    <td className="px-[10px] py-[13px] text-[9px] font-semibold text-[#1F2937] sm:text-[12px]">
                      {row.customer}
                    </td>
                    <td className="px-[10px] py-[13px] text-[9px] text-[#6B7280] sm:text-[12px]">
                      {row.service}
                    </td>
                    <td className="px-[10px] py-[13px] text-[9px] text-[#6B7280] sm:text-[12px]">
                      {row.dateTime}
                    </td>
                    <td className="px-[10px] py-[13px] text-[9px] font-semibold text-[#030712] sm:text-[12px]">
                      {row.amount}
                    </td>
                    <td className="px-[10px] py-[13px]">
                      {/* Green status pill */}
                      <span className="inline-flex rounded-[12px] bg-[#C5FADA] px-[9px] py-[4px] text-[9px] font-semibold text-[#16A34A] sm:text-[11px]">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-[10px] py-[13px]">
                      <div className="flex items-center gap-[12px] whitespace-nowrap">
                        <button
                          onClick={handleDetails}
                          className="text-[9px] font-medium text-[#2772CC] duration-300 hover:text-color-15 sm:text-[11px]"
                        >
                          View Details
                        </button>
                        <button className="text-[15px] leading-none text-[#6B7280]">⋮</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-[20px] flex flex-col gap-[12px] border-t border-[#E3E8EE] pt-[20px] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] font-semibold text-[#1F2937] sm:text-[12px]">
              Showing 1 - 5 Out Of 140 Categories
            </p>

            <div className="flex items-center gap-[8px]">
              {/* Previous — orange-bordered per HTML */}
              <button
                type="button"
                aria-label="Previous page"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] border border-[#F0A33A] bg-white text-[#030712] transition hover:bg-[#FFF7ED]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {d.historyPages.map((page) =>
                page === "..." ? (
                  <span key="dots" className="px-[2px] text-[12px] text-[#030712]">...</span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    className={`h-[36px] min-w-[32px] rounded-[6px] border px-[9px] text-[10px] font-medium transition sm:text-[11px] ${
                      page === "1"
                        ? "border-[#2772CC] bg-[#2772CC] text-white"
                        : "border-[#E3E8EE] bg-white text-[#030712]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* Next */}
              <button
                type="button"
                aria-label="Next page"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] border border-[#F0A33A] bg-white text-[#030712] transition hover:bg-[#FFF7ED]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
