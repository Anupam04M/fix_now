"use client";

// src/app/service-provider/profile/page.tsx
// ================================================================
// PROVIDER PROFILE  (route: /service-provider/profile)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to Fix_now-Dashboard-_backend_part/profile.html
//
// LAYOUT: two equal columns (lg:grid-cols-2) over soft bg glows
//   LEFT  : About Me -> Personal Information -> Availability Status
//   RIGHT : Earnings Overview (blue gradient card + stats grid)
//           Recent Transactions (payments/commissions list)
//
// ============================================================
// DATA FLOW — STATIC -> DYNAMIC IN 3 STEPS
// ============================================================
//   Everything renders from PROFILE_PAGE_DATA below; its shape IS
//   the API contract.
//     STEP 1: open src/api/api-function/provider.function.ts
//     STEP 2: fill fetchProfileFn() (GET {{base_url}}/auth/me) and
//             fetchProviderStatsFn() (new: GET /provider/stats),
//             delete their mock returns
//     STEP 3: map responses onto PROFILE_PAGE_DATA here and delete it.
//
//   ALREADY WORKING CLIENT-SIDE:
//     - Earnings period <select> switches This/Last/3 Months datasets
//     - Edit buttons per section (toast placeholders until backend)
// ============================================================

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import providerAvatar from "@/assets/images/after-service/Frame 358.png";

/* ==================== STATIC DATA (matches HTML) ==================== */
const PROFILE_PAGE_DATA = {
  about: {
    name: "Rahul Sharma",
    rating: "4.8",
    reviews: "(48 Reviews)",
    phone: "+91 98765 43210",
    email: "Rahulsharma.Purv@gmail.com",
    location: "Kolkata, West Bengal",
    bio: "Experienced and customer-focused technician specializing in residential and commercial air conditioning systems, skilled in diagnostics, repairs, preventive maintenance, and servicing. An enthusiastic technician delivering reliable, timely, and high-quality service with complete customer satisfaction.",
  },
  personalInfo: {
    fullName: "Rahul Sharma",
    dob: "15 Aug 1996",
    gender: "Male",
    languages: "English, Hindi, Bengali",
    address: "12, Lake View Road, Kolkata, West Bengal -700029",
    pinCode: "700029",
    joinedOn: "12 Jan 2024",
  },
  availability: {
    status: "Available",
    note: "You are available to receive new booking requests.",
    workingHours: "09:00 AM - 08:00 PM",
    /* on = green chip, off = gray chip (Sun is off in HTML) */
    days: [
      { label: "Mon", on: true },
      { label: "Tue", on: true },
      { label: "Wed", on: true },
      { label: "Thu", on: true },
      { label: "Fri", on: true },
      { label: "Sat", on: true },
      { label: "Sun", on: false },
    ],
  },
  /* One dataset per period-select option */
  earningsByPeriod: {
    this: {
      totalEarnings: "₹28,450",
      growth: "+12.8%",
      completedJobs: "32",
      pendingPayout: "₹5,980",
      withdrawn: "₹21,420",
      avgRating: "4.8 ★",
    },
    last: {
      totalEarnings: "₹24,900",
      growth: "+6.4%",
      completedJobs: "29",
      pendingPayout: "₹4,100",
      withdrawn: "₹19,500",
      avgRating: "4.7 ★",
    },
    three: {
      totalEarnings: "₹71,300",
      growth: "+18.2%",
      completedJobs: "88",
      pendingPayout: "₹6,750",
      withdrawn: "₹58,200",
      avgRating: "4.8 ★",
    },
  },
  transactions: [
    { type: "in", title: "Booking Payment", ref: "Booking #FN-4821", dateTime: "17 May 2024 · 02:30 PM", amount: "+₹1,250", statusLabel: "Paid" },
    { type: "out", title: "Platform Commission", ref: "Booking #FN-4820", dateTime: "16 May 2024 · 02:00 PM", amount: "-₹120", statusLabel: "Fee" },
    { type: "in", title: "Booking Payment", ref: "Booking #FN-4818", dateTime: "15 May 2024 · 11:45 AM", amount: "+₹1,800", statusLabel: "Paid" },
    { type: "out", title: "Platform Commission", ref: "Booking #FN-4816", dateTime: "14 May 2024 · 04:20 PM", amount: "-₹200", statusLabel: "Fee" },
    { type: "in", title: "Booking Payment", ref: "Booking #FN-4815", dateTime: "13 May 2024 · 09:45 AM", amount: "+₹950", statusLabel: "Paid" },
  ],
};

/* Section wrapper used by every white card (exact HTML classes) */
const CARD =
  "mb-[10px] rounded-[11px] border border-[#e8edf1] bg-white px-[16px] py-[14px] shadow-[0_3px_12px_rgba(20,50,80,0.035)]";

/* Small blue-outline Edit pill with pencil */
const EditButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-[27px] shrink-0 items-center rounded-[6px] border border-[#2772cc] px-[9px] text-[8px] font-medium text-[#2772cc] transition-colors hover:bg-[#2772cc] hover:text-white"
  >
    Edit
    {/* Pencil icon */}
    <svg className="ml-[4px] h-[10px] w-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);

export default function ProviderProfilePage() {
  const d = PROFILE_PAGE_DATA;

  /* Earnings period selector: this | last | three */
  const [period, setPeriod] = useState<keyof typeof d.earningsByPeriod>("this");
  const earnings = d.earningsByPeriod[period];

  return (
    <main className="relative min-h-screen w-full">
      {/* ===== Soft background glows (from HTML) ===== */}
      <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[400px] w-[500px] rounded-full bg-[#e7f7ff]/70 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[500px] rounded-full bg-[#fff9df]/70 blur-[100px]" />

      {/* ===== Two equal columns ===== */}
      <div className="relative grid grid-cols-1 gap-[10px] lg:grid-cols-2">
        {/* ==================== LEFT COLUMN ==================== */}
        <div>
          {/* ---------- ABOUT ME ---------- */}
          <section className={`${CARD} min-h-[285px]`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[14px] font-semibold text-[#172033]">About Me</h2>
                <p className="mt-[3px] text-[8px] text-[#9aa5b3]">
                  Introduce Your Personal Information And Availability
                </p>
              </div>
              <EditButton onClick={() => toast.info("About Me edit coming soon.")} />
            </div>

            {/* Profile row */}
            <div className="mt-[17px] flex border-b border-[#edf0f2] pb-[16px]">
              {/* Avatar + camera badge */}
              <div className="relative shrink-0">
                <Image
                  src={providerAvatar}
                  alt={d.about.name}
                  width={76}
                  height={76}
                  className="h-[76px] w-[76px] rounded-full border-[3px] border-[#edf1f4] object-cover"
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  className="absolute bottom-0 right-0 flex h-[20px] w-[20px] items-center justify-center rounded-full border-[2px] border-white bg-white shadow-sm"
                >
                  <svg className="h-[9px] w-[9px] text-[#46566b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
              </div>

              {/* Details */}
              <div className="ml-[13px] min-w-0">
                <h3 className="text-[14px] font-semibold text-[#172033]">{d.about.name}</h3>

                <div className="mt-[6px] flex items-center">
                  <svg className="h-[10px] w-[10px] fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="ml-[3px] text-[9px] font-semibold text-[#344054]">{d.about.rating}</span>
                  <span className="ml-[3px] text-[8px] text-[#8d99a8]">{d.about.reviews}</span>
                </div>

                {/* Contact chips */}
                <div className="mt-[9px] flex flex-wrap">
                  <div className="mr-[5px] flex h-[27px] items-center rounded-[6px] border border-[#e8edf1] px-[7px]">
                    <svg className="mr-[4px] h-[10px] w-[10px] text-[#46566b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span className="text-[8px] text-[#344054]">{d.about.phone}</span>
                  </div>

                  <div className="flex h-[27px] items-center rounded-[6px] border border-[#e8edf1] px-[7px]">
                    <svg className="mr-[4px] h-[10px] w-[10px] text-[#46566b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <span className="truncate text-[8px] text-[#344054]">{d.about.email}</span>
                  </div>
                </div>

                {/* Location chip */}
                <div className="mt-[6px] flex h-[27px] w-fit items-center rounded-[6px] border border-[#e8edf1] px-[7px]">
                  <svg className="mr-[4px] h-[10px] w-[10px] text-[#46566b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-[8px] text-[#344054]">{d.about.location}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-[13px]">
              <h3 className="text-[10px] font-semibold text-[#172033]">Bio</h3>
              <p className="mt-[5px] max-w-[96%] text-[9px] leading-[1.65] text-[#8995a4]">
                {d.about.bio}
              </p>
            </div>
          </section>

          {/* ---------- PERSONAL INFORMATION ---------- */}
          <section className={`${CARD} min-h-[215px]`}>
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#172033]">
                Personal Information
              </h2>
              <EditButton onClick={() => toast.info("Personal Info edit coming soon.")} />
            </div>

            {/* Top info row: name/dob/gender/languages */}
            <div className="mt-[20px] grid grid-cols-2 border-b border-[#edf0f2] pb-[18px] md:grid-cols-4">
              {[
                { label: "Full Name", value: d.personalInfo.fullName },
                { label: "Date Of Birth", value: d.personalInfo.dob },
                { label: "Gender", value: d.personalInfo.gender },
                { label: "Languages Known", value: d.personalInfo.languages },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-[8px] text-[#929dab]">{f.label}</p>
                  <p className="mt-[5px] text-[9px] font-semibold text-[#293448]">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Bottom info row: address/pin/joined */}
            <div className="grid grid-cols-1 pt-[17px] md:grid-cols-[1.35fr_0.8fr_0.8fr]">
              <div>
                <p className="text-[8px] text-[#929dab]">Address</p>
                <p className="mt-[5px] max-w-[200px] text-[9px] font-semibold leading-[1.5] text-[#293448]">
                  {d.personalInfo.address}
                </p>
              </div>
              <div>
                <p className="text-[8px] text-[#929dab]">Pin Code</p>
                <p className="mt-[5px] text-[9px] font-semibold text-[#293448]">
                  {d.personalInfo.pinCode}
                </p>
              </div>
              <div>
                <p className="text-[8px] text-[#929dab]">Joined On</p>
                <p className="mt-[5px] text-[9px] font-semibold text-[#293448]">
                  {d.personalInfo.joinedOn}
                </p>
              </div>
            </div>
          </section>

          {/* ---------- AVAILABILITY STATUS ---------- */}
          <section className="min-h-[175px] rounded-[11px] border border-[#e8edf1] bg-white px-[16px] py-[14px] shadow-[0_3px_12px_rgba(20,50,80,0.035)]">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#172033]">
                Availability Status
              </h2>
              <EditButton onClick={() => toast.info("Availability edit coming soon.")} />
            </div>

            <div className="mt-[20px] grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr]">
              {/* Current status */}
              <div className="border-b border-[#edf0f2] pb-[14px] md:border-b-0 md:border-r md:pr-[18px]">
                <p className="text-[8px] text-[#929dab]">Current Status</p>
                <div className="mt-[7px] flex items-center">
                  <span className="mr-[5px] h-[7px] w-[7px] rounded-full bg-[#22c55e]" />
                  <span className="rounded-full bg-[#e5faed] px-[8px] py-[4px] text-[8px] text-[#18a557]">
                    {d.availability.status}
                  </span>
                </div>
                <p className="mt-[10px] max-w-[170px] text-[8px] leading-[1.55] text-[#8a96a5]">
                  {d.availability.note}
                </p>
              </div>

              {/* Working hours + day chips */}
              <div className="pt-[14px] md:pl-[18px] md:pt-0">
                <p className="text-[8px] text-[#929dab]">Working Hours</p>
                <div className="mt-[6px] flex items-center">
                  {/* Clock icon (#5269c8 like HTML) */}
                  <svg className="mr-[5px] h-[13px] w-[13px] text-[#5269c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" strokeLinecap="round" />
                  </svg>
                  <span className="text-[9px] font-semibold text-[#293448]">
                    {d.availability.workingHours}
                  </span>
                </div>

                <p className="mt-[10px] text-[8px] text-[#929dab]">Available Days</p>
                <div className="mt-[6px] flex flex-wrap">
                  {d.availability.days.map((day, i) => (
                    <span
                      key={day.label}
                      className={`${
                        i < d.availability.days.length - 1 ? "mr-[4px]" : ""
                      } rounded-[4px] px-[7px] py-[4px] text-[7px] ${
                        day.on
                          ? "bg-[#e5faed] text-[#18a557]"
                          : "bg-[#f0f2f4] text-[#8994a2]"
                      }`}
                    >
                      {day.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ==================== RIGHT COLUMN ==================== */}
        <div>
          {/* ---------- EARNINGS OVERVIEW ---------- */}
          <section
            className="mb-[10px] rounded-[11px] border border-[#e8edf1] bg-white px-[16px] py-[14px] shadow-[0_3px_12px_rgba(20,50,80,0.035)]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#172033]">
                Earnings Overview
              </h2>

              {/* Period select - LIVE: swaps the dataset below */}
              <select
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value as keyof typeof d.earningsByPeriod)
                }
                className="h-[27px] cursor-pointer rounded-[6px] border border-[#2772cc] bg-white px-[8px] text-[8px] text-[#2772cc] outline-none"
              >
                <option value="this">This Month</option>
                <option value="last">Last Month</option>
                <option value="three">Last 3 Months</option>
              </select>
            </div>

            {/* Big blue gradient earnings card */}
            <div className="relative mt-[12px] h-[205px] overflow-hidden rounded-[9px] bg-gradient-to-r from-[#298fe2] to-[#285b90] px-[15px] pt-[14px]">
              <p className="text-[8px] text-[#d8ecff]">Total Earnings</p>

              <div className="mt-[3px] flex items-center">
                <span className="text-[27px] font-medium tracking-[-1px] text-white">
                  {earnings.totalEarnings}
                </span>
                <span className="ml-[7px] rounded-full bg-white/15 px-[6px] py-[3px] text-[7px] text-white">
                  {earnings.growth}
                </span>
              </div>

              <p className="mt-[1px] text-[7px] text-[#c9e4fa]">Vs Last Month</p>

              {/* Decorative rings (subtle, matches design language) */}
              <div className="absolute -bottom-16 -right-10 h-44 w-44 rounded-full border-[10px] border-white/10" />
              <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full border-[8px] border-white/10" />
            </div>

            {/* Stats grid: jobs / payout / withdrawn / rating */}
            <div className="mt-[12px] grid grid-cols-2 md:grid-cols-4">
              {/* Completed Jobs */}
              <div className="border-b border-r border-[#e9edf1] px-[5px] py-[10px] text-center md:border-b-0">
                <svg className="mx-auto h-[16px] w-[16px] text-[#6682a4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
                <p className="mt-[5px] text-[7px] text-[#8e99a8]">Completed Jobs</p>
                <p className="mt-[3px] text-[10px] font-semibold text-[#293448]">
                  {earnings.completedJobs}
                </p>
              </div>

              {/* Pending Payout */}
              <div className="border-b border-[#e9edf1] px-[5px] py-[10px] text-center md:border-b-0 md:border-r">
                <svg className="mx-auto h-[16px] w-[16px] text-[#6682a4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 6v12M15.5 9.5c-.7-.7-2-1.1-3.5-1.1s-3 .6-3 1.8 1.3 1.6 3 1.8 3 .7 3 1.8-1.5 1.8-3 1.8-2.8-.4-3.5-1.1" strokeLinecap="round"/>
                </svg>
                <p className="mt-[5px] text-[7px] text-[#8e99a8]">Pending Payout</p>
                <p className="mt-[3px] text-[10px] font-semibold text-[#293448]">
                  {earnings.pendingPayout}
                </p>
              </div>

              {/* Withdrawn */}
              <div className="border-b border-[#e9edf1] px-[5px] py-[10px] text-center md:border-b-0 md:border-r">
                <svg className="mx-auto h-[16px] w-[16px] text-[#6682a4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                <p className="mt-[5px] text-[7px] text-[#8e99a8]">Withdrawn</p>
                <p className="mt-[3px] text-[10px] font-semibold text-[#293448]">
                  {earnings.withdrawn}
                </p>
              </div>

              {/* Average Rating */}
              <div className="px-[5px] py-[10px] text-center">
                <svg className="mx-auto h-[16px] w-[16px] fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <p className="mt-[5px] text-[7px] text-[#8e99a8]">Average Rating</p>
                <p className="mt-[3px] text-[10px] font-semibold text-[#293448]">
                  {earnings.avgRating}
                </p>
              </div>
            </div>
          </section>

          {/* ---------- RECENT TRANSACTIONS ---------- */}
          <section className="rounded-[11px] border border-[#e8edf1] bg-white px-[16px] py-[14px] shadow-[0_3px_12px_rgba(20,50,80,0.035)]">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#172033]">
                Recent Transactions
              </h2>
              <button
                onClick={() => toast.info("Full transactions page coming soon.")}
                className="flex items-center text-[8px] font-medium text-[#2772cc]"
              >
                View All
                <svg className="ml-[4px] h-[10px] w-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="mt-[6px]">
              {PROFILE_PAGE_DATA.transactions.map((tx, i) => {
                const isPayment = tx.type === "in";
                return (
                  <div
                    key={`${tx.ref}-${i}`}
                    className={`grid min-h-[63px] grid-cols-[32px_1fr_auto] items-center ${
                      i < PROFILE_PAGE_DATA.transactions.length - 1
                        ? "border-b border-[#f0f2f4]"
                        : ""
                    }`}
                  >
                    {/* Icon circle: green down-arrow for payments, red up-arrow for fees */}
                    <div
                      className={`flex h-[24px] w-[24px] items-center justify-center rounded-full ${
                        isPayment ? "bg-[#e7faef]" : "bg-[#fff0f0]"
                      }`}
                    >
                      <svg
                        className={`h-[11px] w-[11px] ${isPayment ? "text-[#22a65a]" : "text-[#ef4444]"}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        {isPayment ? (
                          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                    </div>

                    {/* Title + ref */}
                    <div className="pl-[7px]">
                      <p className="text-[9px] font-semibold text-[#293448]">{tx.title}</p>
                      <p className="mt-[3px] text-[7px] text-[#8e99a8]">{tx.ref}</p>
                    </div>

                    {/* Date + amount + status pill */}
                    <div className="text-right">
                      <p className="text-[6px] text-[#8e99a8]">{tx.dateTime}</p>
                      <div className="mt-[3px] flex items-center justify-end gap-[4px]">
                        <span
                          className={`text-[9px] font-semibold ${
                            isPayment ? "text-[#22a65a]" : "text-[#ef4444]"
                          }`}
                        >
                          {tx.amount}
                        </span>
                        <span
                          className={`rounded-full px-[5px] py-[3px] text-[6px] ${
                            isPayment
                              ? "bg-[#e5faed] text-[#20a25a]"
                              : "bg-[#fdecec] text-[#ec6d6d]"
                          }`}
                        >
                          {tx.statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
