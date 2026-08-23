"use client";

// src/app/service-provider/service-management/page.tsx
// ================================================================
// SERVICE MANAGEMENT  (route: /service-provider/service-management)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to Fix_now-Dashboard-_backend_part/service-management.html
//
// SECTIONS:
//   1. YOUR SERVICES card : header + filters (search/category/status/
//                           grid/list) + services table + pagination
//   2. LOWER GRID         : [Coverage Areas + Services Offered | Map]
//
// ============================================================
// DATA FLOW — STATIC -> DYNAMIC IN 3 STEPS
// ============================================================
//   Everything renders from SERVICES_PAGE_DATA below; its shape IS
//   the API contract.
//     STEP 1: open src/api/api-function/provider.function.ts
//     STEP 2: fill fetchProviderServicesFn() real api.get call,
//             delete its mock return
//     STEP 3: move SERVICES_PAGE_DATA into that function and remove
//             it here. No JSX changes needed.
//
//   ACTIONS:
//     - Toggle/edit/delete -> toggleProviderServiceFn(id, isActive)
//     - Add New Area       -> POST provider.service_areas
//     - Register New Svcs  -> POST {{base_url}}/provider/services
// ============================================================

import React, { useState } from "react";
import { toast } from "sonner";

/* ==================== STATIC DATA (matches HTML) ==================== */
const SERVICES_PAGE_DATA = {
  services: [
    {
      id: 1,
      name: "Electrical Wiring",
      desc: "Home Wiring, Rewiring, New Connections",
      category: "Electrical",
      price: "₹800",
      duration: "1 – 2 Hrs",
      /* Icon bubble colors per HTML row */
      iconBg: "#F2EEFF",
      iconColor: "#7B61D8",
      iconType: "bolt", // bolt | switch | bulb | fan
      active: true,
    },
    {
      id: 2,
      name: "Switchboard Repair",
      desc: "MCB, Fuse, Switchboard Repair",
      category: "Electrical",
      price: "₹600",
      duration: "45m – 1 Hr",
      iconBg: "#EEF6FF",
      iconColor: "#62A8E8",
      iconType: "switch",
      active: true,
    },
    {
      id: 3,
      name: "Light Installation",
      desc: "Indoor & Outdoor Lighting Setup",
      category: "Electrical",
      price: "₹500",
      duration: "30m – 1 Hr",
      iconBg: "#FFF5E8",
      iconColor: "#F59E0B",
      iconType: "bulb",
      active: true,
    },
    {
      id: 4,
      name: "Fan Installation",
      desc: "Ceiling Fan & Exhaust Fan Installation",
      category: "Electrical",
      price: "₹350",
      duration: "30m",
      iconBg: "#EAF8FF",
      iconColor: "#2F9FE8",
      iconType: "fan",
      active: false,
    },
  ],
  countText: "Showing 1 – 4 Out Of 16 Categories",
  pages: ["1", "2", "…", "4"],
  areas: [
    { name: "Salt Lake", sub: "Sector 1, 2, 3", active: true, customers: 356, dotColor: "#36C477" },
    { name: "New Town", sub: "Sector 1, 2, 3", active: true, customers: 289, dotColor: "#3FA7E8" },
    { name: "Bidhanagar", sub: "Blocks EC, EE, BF", active: true, customers: 198, dotColor: "#36C477" },
    { name: "Lake Town", sub: "Block A, B", active: false, customers: 356, dotColor: "#F36B6B" },
  ],
  offeredChips: [
    "AC Repair",
    "Refrigerator Repair",
    "Washing Machine Repair",
    "Microwave Repair",
    "RO Repair",
  ],
};

/* Per-row service icons drawn as inline SVG (HTML used Font Awesome;
   these match the same glyph shapes without the dependency) */
function ServiceIcon({ type }: { type: string }) {
  if (type === "bolt")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    );
  if (type === "bulb")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 18h6M10 21h4" strokeLinecap="round" />
        <path d="M12 2a7 7 0 00-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0012 2z" />
      </svg>
    );
  if (type === "fan")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2.4" />
        <path d="M12 9c0-3 0-6 2.5-6S19 5 19 7s-2 4-5 4c1-2 0-2-2-2zM15 12c3 0 6 0 6 2.5S19 19 17 19s-4-2-4-5c2 1 2 0 2-2zM9 12c-3 0-6 0-6-2.5S5 5 7 5s4 2 4 5c-2-1-2 0-2 2zM12 15c0 3 0 6-2.5 6S5 19 5 17s2-4 5-4c-1 2 0 2 2 2z" />
      </svg>
    );
  // switch (default)
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 13l6-6" strokeLinecap="round" />
      <circle cx="15" cy="13.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ServiceManagementPage() {
  const d = SERVICES_PAGE_DATA;

  /* Local toggle state so switches work before backend exists.
     Dynamic later (STEP 2): call toggleProviderServiceFn then refetch. */
  const [services, setServices] = useState(d.services);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const toggleActive = (id: number) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
    toast.success("Service status updated"); // swap for API call later
  };

  const handleEdit = () => toast.info("Edit dialog coming soon.");
  const handleDelete = () => toast.info("Delete flow coming soon.");

  return (
    <main className="relative z-10 px-[10px] pb-[22px] sm:px-[14px] md:px-[20px] lg:px-[28px] lg:pb-[32px]">
      <div className="mx-auto max-w-[1450px]">
        {/* ==================== YOUR SERVICES CARD ==================== */}
        <div className="overflow-hidden rounded-[16px] border border-white/90 bg-white/90 shadow-[0_6px_24px_rgba(39,114,204,0.06)] backdrop-blur-[18px] min-[360px]:rounded-[18px] lg:rounded-[20px]">
          {/* ---- Card header: heading + filter toolbar ---- */}
          <div className="flex flex-col px-[12px] pt-[16px] min-[360px]:px-[12px] sm:px-[18px] sm:pt-[20px] lg:px-[28px] lg:pt-[26px]">
            <div className="flex flex-col justify-between sm:flex-row sm:items-start">
              {/* Heading */}
              <div className="min-w-0">
                <h2 className="font-outfit text-[18px] font-semibold leading-tight text-[#111827] sm:text-[20px] lg:text-[26px]">
                  Your Services
                </h2>
                <p className="mt-[7px] max-w-[390px] text-[11px] leading-[1.4] text-[#6B7280] sm:text-[12px] lg:text-[15px]">
                  Manage, Edit Or Remove Your Services
                  <br className="hidden sm:block" /> Here.
                </p>
              </div>

              {/* Filters */}
              <div className="mt-[12px] flex w-full min-w-0 items-center gap-[6px] sm:mt-0 sm:w-auto">
                {/* Search */}
                <label className="relative flex h-[38px] min-w-0 flex-1 items-center rounded-[7px] border border-[#E8ECF1] bg-[#FAFBFC] px-[8px] sm:h-[38px] sm:w-[190px] sm:flex-none lg:h-[44px] lg:w-[235px]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <circle cx="11" cy="11" r="7" stroke="#A5AFBA" strokeWidth="1.7" />
                    <path d="M16.5 16.5L21 21" stroke="#A5AFBA" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="ml-[6px] min-w-0 w-full bg-transparent text-[10px] text-[#374151] outline-none placeholder:text-[#A1AAB5] sm:text-[12px] lg:text-[14px]"
                  />
                </label>

                {/* Category select */}
                <select className="h-[34px] w-[78px] shrink-0 rounded-[7px] border border-[#E8ECF1] bg-[#FAFBFC] px-[5px] text-[9px] text-[#66717D] outline-none sm:h-[38px] sm:w-[120px] sm:px-[9px] sm:text-[12px] lg:h-[44px] lg:w-[140px] lg:text-[13px] cursor-pointer">
                  <option>All Categories</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                </select>

                {/* Status select */}
                <select className="h-[34px] w-[70px] shrink-0 rounded-[7px] border border-[#E8ECF1] bg-[#FAFBFC] px-[5px] text-[9px] text-[#66717D] outline-none sm:h-[38px] sm:w-[105px] sm:px-[9px] sm:text-[12px] lg:h-[44px] lg:w-[125px] lg:text-[13px] cursor-pointer">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                {/* Grid view button */}
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode("grid")}
                  className={`flex h-[34px] w-[32px] shrink-0 items-center justify-center rounded-[7px] border sm:h-[38px] sm:w-[38px] lg:h-[44px] lg:w-[44px] ${
                    viewMode === "grid"
                      ? "border-[#2772CC] bg-[#F5F9FD]"
                      : "border-[#E8ECF1] bg-white"
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="sm:h-4 sm:w-4">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#2772CC" strokeWidth="1.6" />
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#2772CC" strokeWidth="1.6" />
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#2772CC" strokeWidth="1.6" />
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#2772CC" strokeWidth="1.6" />
                  </svg>
                </button>

                {/* List view button */}
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode("list")}
                  className={`flex h-[34px] w-[32px] shrink-0 items-center justify-center rounded-[7px] border sm:h-[38px] sm:w-[38px] lg:h-[44px] lg:w-[44px] ${
                    viewMode === "list"
                      ? "bg-[#F5F9FD] border-[#2772CC]"
                      : "border-[#E8ECF1] bg-[#F5F9FD]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sm:h-[17px] sm:w-[17px]">
                    <path d="M5 7H19M5 12H19M5 17H19" stroke="#2772CC" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ---- Services table ---- */}
          <div className="mt-[15px] overflow-x-auto px-[12px] sm:px-[18px] lg:px-[28px]">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  {["Service", "Category", "Price", "Duration", "Status", ""].map(
                    (th, i) => (
                      <th
                        key={i}
                        className="border-b border-[#EDF0F3] pb-[12px] pr-[12px] text-[10px] font-medium uppercase tracking-[0.03em] text-[#9AA3AD] lg:text-[12px]"
                      >
                        {th}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    {/* Service cell: colored icon + name + desc */}
                    <td className="border-b border-[#F1F3F5] py-[19px] pr-[12px] lg:py-[22px]">
                      <div className="flex items-center">
                        <span
                          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] [&_svg]:h-[14px] [&_svg]:w-[14px] lg:h-[38px] lg:w-[38px]"
                          style={{ backgroundColor: s.iconBg, color: s.iconColor }}
                        >
                          <ServiceIcon type={s.iconType} />
                        </span>
                        <div className="ml-[10px] min-w-0">
                          <p className="truncate text-[11px] font-semibold leading-tight text-[#222B35] lg:text-[15px]">
                            {s.name}
                          </p>
                          <p className="mt-[5px] truncate text-[9px] leading-tight text-[#89939E] lg:text-[12px]">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="border-b border-[#F1F3F5] py-[19px] text-[10px] text-[#58616C] lg:py-[22px] lg:text-[13px]">
                      {s.category}
                    </td>

                    {/* Price */}
                    <td className="border-b border-[#F1F3F5] py-[19px] lg:py-[22px]">
                      <p className="text-[11px] font-semibold leading-tight text-[#2B3036] lg:text-[15px]">
                        {s.price}
                      </p>
                      <p className="mt-[5px] text-[9px] leading-tight text-[#A0A7AE] lg:text-[12px]">
                        Starting From
                      </p>
                    </td>

                    {/* Duration */}
                    <td className="border-b border-[#F1F3F5] py-[19px] lg:py-[22px]">
                      <p className="text-[11px] font-medium leading-tight text-[#4B5563] lg:text-[14px]">
                        {s.duration}
                      </p>
                      <p className="mt-[5px] text-[9px] leading-tight text-[#A0A7AE] lg:text-[12px]">
                        Estimated
                      </p>
                    </td>

                    {/* Status pill */}
                    <td className="border-b border-[#F1F3F5] py-[19px] lg:py-[22px]">
                      {s.active ? (
                        <span className="rounded-full bg-[#E8FAEF] px-[9px] py-[5px] text-[9px] font-semibold text-[#2DBA69] lg:px-[11px] lg:py-[6px] lg:text-[12px]">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#FDECEC] px-[9px] py-[5px] text-[9px] font-semibold text-[#EC6D6D] lg:px-[11px] lg:py-[6px] lg:text-[12px]">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Action buttons: edit / delete / dots */}
                    <td className="border-b border-[#F1F3F5] py-[19px] lg:py-[22px]">
                      <div className="flex justify-center">
                        <button
                          onClick={handleEdit}
                          aria-label="Edit service"
                          className="mr-[6px] flex h-[27px] w-[27px] items-center justify-center rounded-[7px] bg-[#EEF6FF] text-[#2772CC] transition hover:bg-color4 hover:text-white lg:h-[32px] lg:w-[32px]"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                        <button
                          onClick={handleDelete}
                          aria-label="Delete service"
                          className="flex h-[27px] w-[27px] items-center justify-center rounded-[7px] bg-[#FFF0F0] text-[#EC6D6D] transition hover:bg-[#DC2626] hover:text-white lg:h-[32px] lg:w-[32px]"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                        <button
                          aria-label="More options"
                          className="ml-[5px] flex h-[27px] w-[21px] items-center justify-center text-[#8D969F] lg:h-[32px] lg:w-[23px]"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---- Table footer: count + pagination ---- */}
          <div className="flex flex-col px-[12px] pb-[18px] pt-[14px] min-[360px]:px-[12px] sm:flex-row sm:items-center sm:justify-between sm:px-[18px] lg:px-[28px] lg:pb-[24px] lg:pt-[16px]">
            <p className="text-[10px] text-[#6B7280] lg:text-[13px]">{d.countText}</p>

            <div className="mt-3 flex items-center sm:mt-0">
              {/* Previous arrow */}
              <button
                type="button"
                aria-label="Previous page"
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[6px] border border-[#2772CC] bg-white text-[#2772CC] lg:h-[36px] lg:w-[36px]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {d.pages.map((page, i) =>
                page === "…" ? (
                  <span key={i} className="mx-[8px] text-[11px] text-[#7D8791]">…</span>
                ) : (
                  <button
                    key={page}
                    className={`${
                      i === 0 ? "ml-[8px]" : ""
                    } ml-[5px] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] text-[10px] font-medium lg:h-[36px] lg:w-[36px] lg:text-[12px] ${
                      page === "1"
                        ? "bg-[#2772CC] text-white"
                        : "bg-[#F6F7F9] text-[#5D6570]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* Next arrow */}
              <button
                type="button"
                aria-label="Next page"
                className="ml-[8px] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[6px] border border-[#2772CC] bg-white text-[#2772CC] lg:h-[36px] lg:w-[36px]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ==================== LOWER GRID ==================== */}
        <div className="mt-[20px] grid grid-cols-1 gap-[20px] lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-[24px] xl:grid-cols-[410px_minmax(0,1fr)]">
          {/* ---------- LEFT COLUMN ---------- */}
          <div className="flex flex-col gap-[20px]">
            {/* ===== Coverage Areas ===== */}
            <div className="rounded-[18px] border border-white/90 bg-white/90 p-[20px] shadow-[0_5px_20px_rgba(39,114,204,0.05)] backdrop-blur-[18px] sm:rounded-[20px] lg:p-[28px]">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="font-outfit text-[17px] font-semibold leading-tight text-[#1F2937] lg:text-[21px]">
                    Coverage Areas
                  </h3>
                  <p className="mt-[7px] max-w-[230px] text-[11px] leading-[1.5] text-[#7B8590] lg:text-[13px]">
                    Manage the areas where you provide your services.
                  </p>
                </div>

                {/* Add New Area */}
                <button
                  type="button"
                  onClick={() => toast.info("Add-area dialog coming soon.")}
                  className="flex shrink-0 items-center rounded-[8px] border border-[#2772CC] bg-white px-[10px] py-[8px] text-[10px] font-semibold text-[#2772CC] transition-all duration-300 ease-out hover:border-color-15 hover:bg-color-15 hover:text-white hover:shadow-[0_4px_12px_rgba(245,158,11,0.20)] active:scale-[0.97] lg:px-[12px] lg:py-[9px] lg:text-[12px]"
                >
                  Add New Area
                  <svg className="ml-[6px] h-[13px] w-[13px]" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Area rows */}
              <div className="mt-[20px]">
                {d.areas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between rounded-[8px] py-[12px]">
                    <div className="flex min-w-0 items-center">
                      {/* Colored status dot (green/blue = active, red = inactive) */}
                      <span
                        className="h-[10px] w-[10px] shrink-0 rounded-full"
                        style={{ backgroundColor: area.dotColor }}
                      />
                      <div className="ml-[10px] min-w-0">
                        <p className="text-[13px] font-medium leading-none text-[#39424C]">{area.name}</p>
                        <p className="mt-[6px] text-[11px] leading-none text-[#A0A7AE]">{area.sub}</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center">
                      {/* Status pill */}
                      <span
                        className={`mr-[20px] rounded-full px-[9px] py-[5px] text-[11px] font-medium ${
                          area.active
                            ? "bg-[#E9FAF0] text-[#2DBA69]"
                            : "bg-[#FDECEC] text-[#EC6D6D]"
                        }`}
                      >
                        {area.active ? "Active" : "Inactive"}
                      </span>

                      {/* Customers count */}
                      <div className="flex flex-col items-end leading-none">
                        <span className="text-[13px] font-semibold text-[#3D4650]">{area.customers}</span>
                        <span className="mt-[5px] text-[11px] text-[#9AA3AC]">Customers</span>
                      </div>

                      {/* Three dots */}
                      <button
                        type="button"
                        aria-label="Area options"
                        className="ml-[10px] flex h-[27px] w-[18px] items-center justify-center rounded-[5px] text-[#8D969F] transition-all duration-300 ease-out hover:bg-color-15/10 hover:text-color-15 active:scale-[0.90]"
                      >
                        <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                          <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All */}
              <button
                onClick={() => toast.info("Full area list coming soon.")}
                className="mt-[10px] block w-full rounded-[9px] border border-[#E8ECF1] bg-white py-[9px] text-center text-[11px] font-semibold text-[#2772CC] transition-all duration-300 ease-out hover:bg-[#F5F9FD] lg:text-[12px]"
              >
                View All
              </button>
            </div>

            {/* ===== Services Offered ===== */}
            <div className="rounded-[18px] border border-white/90 bg-white/90 p-[20px] shadow-[0_5px_20px_rgba(39,114,204,0.05)] backdrop-blur-[18px] sm:rounded-[20px] lg:p-[28px]">
              <h3 className="font-outfit text-[17px] font-semibold leading-tight text-[#1F2937] lg:text-[21px]">
                Services Offered
              </h3>

              {/* Chips */}
              <div className="mt-[16px] flex flex-wrap">
                {d.offeredChips.map((chip) => (
                  <span
                    key={chip}
                    className="mb-[8px] mr-[7px] cursor-default rounded-[9px] bg-[#F1F4F7] px-[11px] py-[7px] text-[9px] text-[#6A737D] lg:text-[12px]"
                  >
                    {chip}
                  </span>
                ))}
                <span className="mb-[8px] cursor-default rounded-[9px] bg-[#EAF4FF] px-[11px] py-[7px] text-[9px] font-medium text-[#2772CC] lg:text-[12px]">
                  +2 More
                </span>
              </div>

              {/* Register button */}
              <button
                type="button"
                onClick={() => toast.info("Register-services wizard coming soon.")}
                className="ml-auto mt-[8px] block h-[42px] w-full rounded-[9px] bg-[#2772CC] text-[12px] font-semibold text-white shadow-[0_4px_10px_rgba(39,114,204,0.15)] transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-color-15 hover:shadow-[0_7px_16px_rgba(245,158,11,0.22)] active:translate-y-0 active:scale-[0.99] lg:w-[190px]"
              >
                Register New Services
              </button>
            </div>
          </div>

          {/* ---------- RIGHT COLUMN : full map ---------- */}
          <div className="relative min-h-[520px] overflow-hidden rounded-[18px] border border-white/90 bg-[#DCEBF1] shadow-[0_5px_22px_rgba(39,114,204,0.07)] sm:rounded-[20px] lg:min-h-[720px]">
            {/* Full embedded Google Map (Victoria Memorial, Kolkata) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3684.900857811729!2d88.34055347475636!3d22.545386333968278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sVictoria%20Memorial!5e0!3m2!1sen!2sin!4v1787327358041!5m2!1sen!2sin"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Service Area Map"
            />

            {/* Map legend */}
            <div className="absolute right-[14px] top-[14px] flex items-center rounded-[10px] border border-white/90 bg-white/85 px-[12px] py-[8px] shadow-[0_3px_12px_rgba(0,0,0,0.05)] backdrop-blur-[8px]">
              <span className="flex items-center text-[11px] font-medium text-[#3F4852]">
                <span className="mr-[6px] h-2 w-2 rounded-full bg-[#36C477]" />
                Active Area
              </span>
              <span className="ml-[14px] flex items-center text-[11px] font-medium text-[#3F4852]">
                <span className="mr-[6px] h-2 w-2 rounded-full bg-[#F36B6B]" />
                Inactive Area
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
