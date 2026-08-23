"use client";

// src/app/service-provider/customer-insight/page.tsx
// ================================================================
// CUSTOMER INSIGHTS  (route: /service-provider/customer-insight)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to Fix_now-Dashboard-_backend_part/customer-insight.html
//
// SECTIONS:
//   1. TOP ANALYTICS : Overall Rating (dark card, rings) |
//                      Rating Distribution bars | Rating Insight chips
//   2. STATISTICS    : Satisfaction | Recommend | Total | Quality
//   3. STICKY TOOLBAR: heading + search + Filter + filter tabs
//   4. REVIEWS       : avatar, Verified badge, date•service,
//                      comment, stars, dots menu
//   5. PAGINATION    : prev/next chevrons + numbered pages
//
// ============================================================
// DATA FLOW — STATIC -> DYNAMIC IN 3 STEPS
// ============================================================
//   Widgets render from REVIEWS_DATA + STATS_DATA below; their shape
//   IS the API contract.
//     STEP 1: open src/api/api-function/provider.function.ts
//     STEP 2: fill fetchProviderRatingsFn() real api.get call and
//             delete its mock return
//     STEP 3: map API response onto these two constants here (or move
//             them into the function). Done - no JSX changes needed.
//
//   ALREADY WORKING CLIENT-SIDE (no backend required):
//     - Tab filters : All Reviews / 5 Star / 4 Star / 3 Star & Below /
//                     With Comments
//     - Search box  : matches customer name or service
//     - Pagination  : 8 per page with prev/next/numbered buttons
// ============================================================

import React, { useState } from "react";
import Image from "next/image";

/* ============ STATIC DATA (matches HTML script block) ============ */
const STATS_DATA = {
  overallRating: "4.8",
  totalReviewCount: 238,
  distribution: [
    { label: "5 Stars", pct: 76 },
    { label: "4 Stars", pct: 10 },
    { label: "3 Stars", pct: 6 },
    { label: "2 Stars", pct: 2 },
    { label: "1 Star", pct: 6 },
  ],
  insight: {
    lift: "0.2",
    period: "This Month",
    chips: [
      { label: "Punctuality", bg: "#ecfdf5", color: "#16a34a" },
      { label: "Professionalism", bg: "#eff6ff", color: "#2772cc" },
      { label: "Service Quality", bg: "#fff1f2", color: "#ef4444" },
    ],
  },
  stats: [
    { value: "98%", label: "Customer Satisfaction", emoji: "😊" },
    { value: "92%", label: "Would Recommend", emoji: "👍" },
    { value: "248", label: "Total Reviews", emoji: "📝" },
    { value: "4.9", label: "Service Quality", emoji: "🏆" },
  ],
};

interface Review {
  name: string;
  date: string;
  service: string;
  rating: number;
  verified: boolean;
  avatar: string;
  comment: string;
}

/* Exact review array copied from the HTML <script> block */
const REVIEWS_DATA: Review[] = [
  { name: "Amit Sharma", date: "06 Aug 2026", service: "AC Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=51", comment: "Excellent service! The technician arrived on time and fixed the AC issue quickly. He also explained what went wrong and suggested tips to prevent recurrence. Very professional and highly recommended." },
  { name: "Priya Mehta", date: "03 Aug 2026", service: "Refrigerator Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=47", comment: "Very satisfied with the repair work. The fridge is working perfectly now. The booking process was smooth and hassle-free." },
  { name: "Rahul Das", date: "02 Aug 2026", service: "Electrical Service", rating: 4, verified: true, avatar: "https://i.pravatar.cc/80?img=13", comment: "Good experience overall. The electrician was knowledgeable, but arrived about 10 minutes late. Job was done neatly though." },
  { name: "Sneha Roy", date: "01 Aug 2026", service: "Washing Machine Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=32", comment: "The technician was very professional and completed the repair quickly. Everything is working perfectly." },
  { name: "Arjun Singh", date: "30 Jul 2026", service: "Plumbing", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=14", comment: "Excellent plumbing service. The issue was identified quickly and fixed without any hassle." },
  { name: "Neha Kapoor", date: "29 Jul 2026", service: "AC Repair", rating: 4, verified: true, avatar: "https://i.pravatar.cc/80?img=44", comment: "Good service and reasonable pricing. The technician was polite and explained the issue clearly." },
  { name: "Rohan Gupta", date: "27 Jul 2026", service: "Electrical Service", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=15", comment: "Very quick response and professional work. I would definitely recommend this service." },
  { name: "Ananya Sen", date: "25 Jul 2026", service: "TV Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=25", comment: "Great experience from booking to completion. The technician arrived on time." },
  { name: "Vikram Roy", date: "22 Jul 2026", service: "AC Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=18", comment: "The AC was repaired properly and the technician gave useful maintenance advice." },
  { name: "Soham Dutta", date: "20 Jul 2026", service: "Plumbing", rating: 4, verified: true, avatar: "https://i.pravatar.cc/80?img=22", comment: "Good work overall. The plumber was experienced and solved the leakage issue." },
  { name: "Riya Das", date: "18 Jul 2026", service: "Refrigerator Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=29", comment: "Very happy with the service. The refrigerator is working perfectly now." },
  { name: "Kunal Sharma", date: "16 Jul 2026", service: "Electrical Service", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=33", comment: "Fast response and excellent service quality. Highly recommended." },
  { name: "Puja Ghosh", date: "14 Jul 2026", service: "Washing Machine Repair", rating: 4, verified: true, avatar: "https://i.pravatar.cc/80?img=48", comment: "The technician fixed the washing machine and explained the problem properly." },
  { name: "Abhishek Roy", date: "12 Jul 2026", service: "AC Repair", rating: 5, verified: true, avatar: "https://i.pravatar.cc/80?img=17", comment: "Excellent service and very professional technician." },
];

/* Gold stars in the dark overall-rating card (#fbbf24 like HTML) */
const GoldStars = () => (
  <span className="text-sm text-[#fbbf24]">★★★★★</span>
);

/* generateStars() equivalent: filled up to rating, dim after */
const ReviewStars = ({ rating }: { rating: number }) => (
  <span className="whitespace-nowrap">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        className="inline"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={i <= rating ? "#f59e0b" : "#e5e7eb"}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </span>
);

export default function CustomerInsightPage() {
  /* ------- FILTER / SEARCH / PAGINATION STATE -------
     Works fully client-side today; when API lands send these as
     query params (?tab=&search=&page=) instead of local filtering. */
  const [activeTab, setActiveTab] = useState("All Reviews");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  // Tab filter
  const filtered = REVIEWS_DATA.filter((r) => {
    if (activeTab === "5 Star") return r.rating === 5;
    if (activeTab === "4 Star") return r.rating === 4;
    if (activeTab === "3 Star & Below") return r.rating <= 3;
    if (activeTab === "With Comments") return r.comment.length > 0;
    return true;
  });

  // Search on top of tab filter
  const searched = filtered.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(searched.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * PER_PAGE;
  const pageReviews = searched.slice(startIdx, startIdx + PER_PAGE);

  const TABS = [
    "All Reviews",
    "5 Star",
    "4 Star",
    "3 Star & Below",
    "With Comments",
  ];

  /* Page-number list for pagination row */
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="flex-1 p-4 sm:p-6">
      {/* ==================== TOP ANALYTICS STRIP ==================== */}
      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#edf0f3] bg-white md:grid-cols-12">
        {/* ---- OVERALL RATING (dark card + decorative rings) ---- */}
        <div className="group relative col-span-1 cursor-pointer overflow-hidden border-b border-[#edf0f3] bg-[#111827] p-5 transition-all duration-150 hover:bg-[#161f2e] md:col-span-4 md:border-b-0 md:border-r">
          <div className="absolute -right-8 -top-10 h-36 w-36 rotate-[25deg] rounded-full border border-[#334155]" />
          <div className="absolute -right-2 -top-4 h-24 w-24 rotate-[25deg] rounded-full border border-[#334155]" />

          <p className="relative text-xs text-white/80">Overall Rating</p>

          <div className="relative mt-1 flex items-end">
            <span className="font-display text-4xl font-semibold leading-none text-white sm:text-5xl">
              {STATS_DATA.overallRating}
            </span>
            <div className="ml-3 pb-1">
              <GoldStars />
            </div>
          </div>

          <p className="relative mt-2 text-[11px] text-gray-300">
            Based On {STATS_DATA.totalReviewCount} Customer Reviews
          </p>

          <div className="absolute right-4 top-4 text-3xl">⭐</div>
        </div>

        {/* ---- RATING DISTRIBUTION ---- */}
        <div className="col-span-1 cursor-pointer border-b border-[#edf0f3] px-5 py-4 transition-colors duration-150 hover:bg-[#f7fbff] md:col-span-5 md:border-b-0 md:border-r">
          <h3 className="text-sm font-semibold text-gray-900">Rating Distribution</h3>
          <div className="mt-3 space-y-2">
            {STATS_DATA.distribution.map((row) => (
              <div key={row.label} className="flex items-center">
                <span className="w-14 shrink-0 text-xs text-gray-500">{row.label}</span>
                <div className="mx-2 h-1.5 flex-1 overflow-hidden rounded-full bg-[#edf0f2]">
                  <div
                    className="h-full rounded-full bg-gray-900"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-xs text-gray-500">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- RATING INSIGHT ---- */}
        <div className="col-span-1 cursor-pointer px-5 py-4 transition-colors duration-150 hover:bg-[#f7fbff] md:col-span-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Rating Insight</h3>
            <span className="text-base text-green-500">↗</span>
          </div>

          <div className="mt-3 flex items-center">
            <span className="mr-2 text-2xl">📈</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Up By {STATS_DATA.insight.lift}
              </p>
              <p className="text-[11px] text-gray-400">{STATS_DATA.insight.period}</p>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-gray-400">
            Customers Frequently Appreciate:
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {STATS_DATA.insight.chips.map((chip) => (
              <span
                key={chip.label}
                className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                style={{ backgroundColor: chip.bg, color: chip.color }}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== STATISTICS ROW ==================== */}
      <div className="mt-4 grid grid-cols-2 rounded-xl border border-[#edf0f3] bg-white lg:grid-cols-4">
        {STATS_DATA.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`group flex h-20 cursor-pointer items-center justify-between px-4 transition-all duration-150 hover:z-10 hover:-translate-y-0.5 hover:rounded-xl hover:border-[#c9e2f7] hover:bg-[#f7fbff] hover:shadow-md ${
              i < 2 ? "border-b border-[#edf0f3] lg:border-b-0" : ""
            } ${i % 2 === 0 || i === 1 ? "border-r border-[#edf0f3]" : ""} ${
              i === 2 ? "lg:border-r" : ""
            }`}
          >
            <div>
              <p className="text-2xl font-semibold text-gray-900 transition-colors group-hover:text-[#2772cc]">
                {stat.value}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                {stat.label}
              </p>
            </div>
            <span className="text-2xl transition-transform duration-150 group-hover:scale-110">
              {stat.emoji}
            </span>
          </div>
        ))}
      </div>

      {/* ==================== STICKY TOOLBAR ==================== */}
      <div className="sticky top-16 z-30 -mx-4 mt-6 border-b border-transparent bg-[#fbfdff]/95 px-4 pb-3 pt-3 backdrop-blur sm:-mx-6 sm:px-6">
        {/* Header + search/filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-base font-semibold text-gray-900 sm:text-lg">
              Customer Reviews
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              See What Customers Are Saying About Your Services.
            </p>
          </div>

          <div className="flex gap-2">
            {/* Search */}
            <div className="flex h-9 w-full items-center rounded-md border border-gray-200 bg-white px-3 sm:w-52">
              <svg className="mr-2 h-3.5 w-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // reset page on new search
                }}
                placeholder="Search Reviews..."
                className="w-full text-xs outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Filter button */}
            <button className="flex h-9 shrink-0 items-center rounded-md border border-gray-200 bg-white px-3 text-xs text-gray-500 transition-colors hover:border-[#c9e2f7] hover:text-[#2772cc]">
              Filter
              <svg className="ml-1.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-3 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1); // reset pagination on tab change
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-gray-800 text-white hover:bg-gray-900"
                  : "border border-gray-200 bg-white text-gray-500 hover:border-[#c9e2f7] hover:bg-[#f7fbff] hover:text-[#2772cc]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== REVIEWS LIST ==================== */}
      <div className="mt-4 space-y-3">
        {pageReviews.length === 0 ? (
          <p className="rounded-lg border border-[#edf0f3] bg-white py-10 text-center text-sm text-gray-400">
            No reviews found.
          </p>
        ) : (
          pageReviews.map((review) => (
            <article
              key={`${review.name}-${review.date}`}
              className="group cursor-pointer rounded-lg border border-[#edf0f3] bg-white px-4 py-3.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#c9e2f7] hover:bg-[#f7fbff] hover:shadow-md sm:px-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {/* Customer block */}
                <div className="flex min-w-0">
                  <div className="mr-3 h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-[#edf0f3]">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={36}
                      height={36}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    {/* Name + verified badge */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {review.name}
                      </h3>
                      {review.verified && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-[#ecfdf5] px-1.5 py-0.5 text-[10px] font-medium text-[#16a34a]">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      {review.date} • {review.service}
                    </p>

                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                </div>

                {/* Rating + dots menu */}
                <div className="flex shrink-0 items-center justify-between sm:ml-4 sm:justify-normal">
                  <div className="text-sm leading-none">
                    <ReviewStars rating={review.rating} />
                  </div>
                  <button
                    aria-label="Review options"
                    className="ml-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))
          )}
        </div>

      {/* ==================== PAGINATION ==================== */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-gray-600">
          {searched.length === 0
            ? "No reviews found."
            : `Showing ${startIdx + 1} - ${Math.min(
                startIdx + PER_PAGE,
                searched.length,
              )} out of ${searched.length} reviews`}
        </p>

        <div className="flex items-center">
          {/* Previous chevron */}
          <button
            onClick={() => setPage(Math.max(1, safePage - 1))}
            disabled={safePage === 1}
            className={`mr-1 flex h-8 w-8 items-center justify-center rounded border border-[#dce3e8] bg-white text-[#2772cc] ${
              safePage === 1 ? "cursor-not-allowed opacity-40" : "hover:bg-gray-50"
            }`}
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Numbered pages */}
          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`mr-1 flex h-8 min-w-[2rem] items-center justify-center rounded px-2 text-sm font-medium ${
                p === safePage
                  ? "bg-[#2772cc] text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next chevron */}
          <button
            onClick={() => setPage(Math.min(totalPages, safePage + 1))}
            disabled={safePage === totalPages}
            className={`flex h-8 w-8 items-center justify-center rounded border border-[#dce3e8] bg-white text-[#2772cc] ${
              safePage === totalPages
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-gray-50"
            }`}
            aria-label="Next page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
