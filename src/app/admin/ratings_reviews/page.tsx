"use client";

// src/app/admin/ratings_reviews/page.tsx
// ================================================================
// ADMIN RATINGS & REVIEWS  (route: /admin/ratings_reviews)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to the Ratings_&_Reviews.html design.
//
// SECTIONS:
//   1. HEADER        : title + breadcrumb, search/bell/profile chip
//   2. METRICS CARDS : Total Providers | Average Ratings |
//                      Total Reviews | Complains
//   3. FILTER BAR    : Sort By + Filter dropdowns (client-side)
//   4. DATA TABLE    : per-provider rating rows w/ chips +
//                      pagination footer
//
// ============================================================
// DATA FLOW  (read this before changing anything!)
// ============================================================
//   useAdminRatings()               <-- src/hooks/useAdminRatings.ts
//        |  one call, one payload
//        v
//   AdminRatingsData                <-- types in adminRatings.function.ts
//        |
//        +-- d.metrics    -> metric cards (tone drives colours)
//        +-- d.providers  -> table rows (rating star, status chip)
//        +-- d.showingText/totalPages -> pagination footer
//
// INTERACTIVITY ALREADY WIRED:
//   - Sort By   -> rating / reviews / complaints (client-side;
//                  swap for a query param when the API supports it)
//   - Filter    -> service category (client-side)
//   - Pagination tracks the active page
//
// CONVERT STATIC -> DYNAMIC IN 3 STEPS (any dev can do this):
//   STEP 1: open src/api/api-function/adminRatings.function.ts
//   STEP 2: inside fetchAdminRatingsFn(), delete the mock return
//           and uncomment api.get("/admin/ratings")
//   STEP 3: done. This page never changes - it already renders
//           whatever that function returns.
// ============================================================

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Star,
  MessageSquare,
  Flag,
} from "lucide-react";

import { useAdminRatings } from "@/hooks/useAdminRatings";
import {
  AdminRatingsData,
  ProviderRatingRow,
} from "@/api/api-function/adminRatings.function";
import adminAvatar from "@/assets/images/admin/avatar.jpg";

/* Shared card look from the HTML */
const CARD =
  "bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]";

/* Metric card pastel icon tones */
const METRIC_TONES = {
  total: "bg-[#F1F5F9] text-[#64748B]",
  rating: "bg-[#FFFBEB] text-[#FBBF24]",
  reviews: "bg-[#F1F5F9] text-[#64748B]",
  complaints: "bg-[#FEF2F2] text-[#EF4444]",
};

const METRIC_ICONS = {
  total: Users,
  rating: Star,
  reviews: MessageSquare,
  complaints: Flag,
};

/* Category chip is blue for every row */
const CATEGORY_CHIP = "border-[#93C5FD] bg-[#EFF6FF] text-[#2563EB]";

/* Status chip colours */
const STATUS_BADGE: Record<ProviderRatingRow["status"], string> = {
  Active: "border-[#86EFAC] bg-[#ECFDF5] text-[#16A34A]",
  Inactive: "border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B]",
};

/* Sort options for the client-side sort dropdown */
type SortKey = "default" | "rating" | "reviews" | "complaints";

export default function RatingsReviews() {
  const { data: res, isLoading } = useAdminRatings();

  /* Filter bar state */
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [category, setCategory] = useState("All");
  /* Active page of the footer pagination ("1" is blue-filled) */
  const [currentPage, setCurrentPage] = useState("1");

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
      </div>
    );
  }

  /* Payload (mock today, API tomorrow) */
  const d = res?.data as AdminRatingsData | undefined;

  if (!d) {
    return (
      <p className="p-8 text-center text-sm text-[#7A8796]">
        Unable to load ratings. Please try again later.
      </p>
    );
  }

  /* Client-side category filter */
  const filteredProviders =
    category === "All"
      ? d.providers
      : d.providers.filter((p) => p.category === category);

  /* Client-side sort (descending; complaints sort ascending-first) */
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === "rating")
      return Number(b.averageRating) - Number(a.averageRating);
    if (sortBy === "reviews")
      return Number(b.totalReviews) - Number(a.totalReviews);
    if (sortBy === "complaints")
      return Number(b.complaints) - Number(a.complaints);
    return 0;
  });

  const categories = [
    "All",
    ...Array.from(new Set(d.providers.map((p) => p.category))),
  ];

  const pages: string[] = ["1", "2", "3", "...", String(d.totalPages)];

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[20px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:gap-5 lg:px-8">
      {/* ==================== 1. HEADER ==================== */}
      <header
        className={`${CARD} flex items-center justify-between gap-4 rounded-2xl px-[16px] py-[16px] md:px-6`}
      >
        {/* Left: title + breadcrumb */}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-[#0F172A]">
            Ratings &amp; Reviews
          </h1>
          <p className="mt-[2px] truncate text-[11px] text-[#94A3B8]">
            Dashboard &gt; Ratings &amp;Reviews
          </p>
        </div>

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            onClick={() => toast.info("Search panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-xs text-[#64748B]"
          >
            <Search size={15} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            onClick={() => toast.info("Notifications panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-xs text-[#64748B]"
          >
            <Bell size={15} />
          </button>

          {/* Admin profile chip */}
          <div className="hidden cursor-pointer items-center gap-2.5 pl-2 sm:flex">
            <Image
              src={adminAvatar}
              alt="Admin Avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-xs font-semibold leading-tight text-[#1E293B]">
                Arghya Sen
                <ChevronDown size={12} className="text-[#94A3B8]" />
              </span>
              <span className="text-[10px] leading-tight text-[#94A3B8]">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== 2. METRICS CARDS ==================== */}
      <section className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {d.metrics.map((metric) => {
          const Icon = METRIC_ICONS[metric.tone];
          return (
            <div
              key={metric.key}
              className={`${CARD} flex items-center gap-4 rounded-2xl p-5`}
            >
              {/* Pastel icon box */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${METRIC_TONES[metric.tone]}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-[#1E293B]">
                  {metric.label}
                </span>
                {metric.showStar ? (
                  /* Average-Ratings value with a gold star after it */
                  <span className="my-0.5 flex items-center gap-1.5 text-xl font-bold leading-tight text-[#0F172A]">
                    {metric.value}
                    <Star size={14} className="fill-[#FBBF24] text-[#FBBF24]" />
                  </span>
                ) : (
                  <span className="my-0.5 text-xl font-bold leading-tight text-[#0F172A]">
                    {metric.value}
                  </span>
                )}
                <span className="truncate text-[10px] text-[#94A3B8]">
                  {metric.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ==================== 3. FILTER BAR ==================== */}
      <div
        className={`${CARD} flex items-center gap-3 rounded-2xl border border-[#F8FAFC] px-[16px] py-3 md:px-6`}
      >
        {/* Sort By */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="cursor-pointer appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 pr-8 text-xs text-[#475569] outline-none"
          >
            <option value="default">Sort By</option>
            <option value="rating">Highest Rating</option>
            <option value="reviews">Most Reviews</option>
            <option value="complaints">Most Complaints</option>
          </select>
          <ChevronDown
            size={10}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
        </div>

        {/* Filter by category */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 pr-8 text-xs text-[#475569] outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Filter" : cat}
              </option>
            ))}
          </select>
          <ChevronDown
            size={10}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
        </div>
      </div>

      {/* ==================== 4. DATA TABLE ==================== */}
      <section
        className={`${CARD} flex flex-1 flex-col justify-between rounded-2xl p-6`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-sm font-semibold text-[#1E293B]">
                {[
                  "Provider Name",
                  "Service Category",
                  "Avarage Rating",
                  "Total Reviews",
                  "Complaints",
                  "Status",
                ].map((th) => (
                  <th key={th} className="px-4 py-3">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-xs">
              {sortedProviders.length === 0 ? (
                /* Empty state when the category filter matches nothing */
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-[12px] text-[#94A3B8]"
                  >
                    No providers found for this filter.
                  </td>
                </tr>
              ) : (
                sortedProviders.map((provider) => (
                  <tr
                    key={provider.id}
                    className="border-b border-[#F8FAFC]"
                  >
                    {/* Provider Name + code */}
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-bold text-[#0F172A]">
                        {provider.name}
                      </div>
                      <div className="mt-0.5 text-[9px] font-medium text-[#94A3B8]">
                        Provider ID: {provider.code}
                      </div>
                    </td>

                    {/* Category chip */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block rounded-md border px-2.5 py-0.5 text-[10px] font-semibold ${CATEGORY_CHIP}`}
                      >
                        {provider.category}
                      </span>
                    </td>

                    {/* Average Rating + gold star */}
                    <td className="px-4 py-3.5 font-semibold text-[#1E293B]">
                      {provider.averageRating}
                      <Star
                        size={10}
                        className="ml-0.5 inline fill-[#FBBF24] text-[#FBBF24]"
                      />
                    </td>

                    {/* Total Reviews */}
                    <td className="px-4 py-3.5 font-medium text-[#334155]">
                      {provider.totalReviews}
                    </td>

                    {/* Complaints */}
                    <td className="px-4 py-3.5 font-medium text-[#334155]">
                      {provider.complaints}
                    </td>

                    {/* Status chip */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block rounded-md border px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[provider.status]}`}
                      >
                        {provider.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- Table footer: showing text + pagination ---------- */}
        <div className="flex flex-col gap-3 pt-5 text-xs font-medium text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <div>{d.showingText}</div>

          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              type="button"
              aria-label="Previous page"
              onClick={() =>
                setCurrentPage((p) =>
                  p === "1" ? p : String(Math.max(1, Number(p) - 1)),
                )
              }
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#64748B]"
            >
              <ChevronLeft size={13} />
            </button>

            {pages.map((page) =>
              page === "..." ? (
                <span key="dots" className="px-1 text-xs text-[#94A3B8]">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-xs ${
                    currentPage === page
                      ? "bg-[#2563EB] font-semibold text-white"
                      : "border border-[#E2E8F0] bg-white text-[#475569]"
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
              onClick={() =>
                setCurrentPage((p) =>
                  String(Math.min(d.totalPages, Number(p) + 1)),
                )
              }
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#64748B]"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
