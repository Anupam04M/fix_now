"use client";

// src/app/admin/activity_log/page.tsx
// ================================================================
// ADMIN ACTIVITY LOG  (route: /admin/activity_log)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to the Activity_Log.html design.
//
// SECTIONS:
//   1. TOP HEADER     : title + breadcrumb, search & bell buttons,
//                       admin profile chip
//   2. STATS GRID     : Total | Suspicious | High | Medium | Low
//   3. ACTIVITY TABLE : risk / status / action badges +
//                       pagination footer
//
// ============================================================
// DATA FLOW  (read this before changing anything!)
// ============================================================
//   useAdminActivityLog()           <-- src/hooks/useAdminActivityLog.ts
//        |  one call, one payload
//        v
//   ActivityLogData                 <-- types in adminActivity.function.ts
//        |
//        +-- d.stats      -> stats grid (icon tone drives colours)
//        +-- d.activities -> table rows (badge colour maps below)
//        +-- d.showingText/totalPages -> table footer pagination
//
// CONVERT STATIC -> DYNAMIC IN 3 STEPS (any dev can do this):
//   STEP 1: open src/api/api-function/adminActivity.function.ts
//   STEP 2: inside fetchActivityLogFn(), delete the mock return and
//           uncomment api.get("/admin/activity-log")
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
  ClipboardList,
  TriangleAlert,
  ShieldAlert,
  Info,
} from "lucide-react";

import { useAdminActivityLog } from "@/hooks/useAdminActivityLog";
import {
  ActivityLogData,
  ActivityLogRow,
} from "@/api/api-function/adminActivity.function";
import adminAvatar from "@/assets/images/admin/avatar.jpg";

/* Shared card look from the HTML (.stat-card / .table-container) */
const CARD =
  "bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]";

/* Badge base from the HTML (.badge) */
const BADGE_BASE =
  "inline-block rounded-[6px] border px-[10px] py-[4px] text-center text-[10px] font-semibold leading-none";

/* Colour maps — value-for-value from the CSS */
const RISK_BADGE: Record<ActivityLogRow["risk"], string> = {
  Medium: "border-[#FDE047] bg-[#fffbeb] text-[#D97706]",
  High: "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
  Low: "border-[#FDE047] bg-[#FEFCE8] text-[#CA8A04]",
};

const STATUS_BADGE: Record<ActivityLogRow["status"], string> = {
  Reviewed: "border-[#86EFAC] bg-[#F0FDF4] text-[#16A34A]",
  "Under Review": "border-[#86EFAC] bg-[#F0FDF4] text-[#16A34A]",
  New: "border-[#93C5FD] bg-[#EFF6FF] text-[#2563EB]",
};

const ACTION_BADGE: Record<
  Exclude<ActivityLogRow["action"], null>,
  string
> = {
  Restricted: "border-[#FDE047] bg-[#FEFCE8] text-[#CA8A04]",
  Banned: "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
  "Under Watch": "border-[#93C5FD] bg-[#EFF6FF] text-[#2563EB]",
};

export default function ActivityLog() {
  const { data: res, isLoading } = useAdminActivityLog();

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
  const d = res?.data as ActivityLogData | undefined;

  if (!d) {
    return (
      <p className="p-8 text-center text-sm text-[#7A8796]">
        Unable to load activity log. Please try again later.
      </p>
    );
  }

  const pages: string[] = [
    ...d.totalPages > 3
      ? ["1", "2", "3"]
      : Array.from({ length: d.totalPages }, (_, i) => String(i + 1)),
    ...(d.totalPages > 3 ? ["..."] : []),
    ...(d.totalPages > 4 ? [String(d.totalPages)] : []),
  ];

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[24px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:px-[32px]">
      {/* ==================== 1. TOP HEADER ==================== */}
      <header className={`flex items-center justify-between gap-4 ${CARD} px-[16px] py-[16px] md:px-[24px]`}>
        {/* Left: title + breadcrumb */}
        <div>
          <h1 className="text-[18px] font-bold leading-tight text-[#0F172A]">
            Activity Log
          </h1>
          <p className="mt-[2px] text-[11px] text-[#94A3B8]">
            Dashboard &gt; Activity Log
          </p>
        </div>

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-[16px]">
          <button
            type="button"
            aria-label="Search"
            onClick={() => toast.info("Search panel coming soon.")}
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Search size={15} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            onClick={() => toast.info("Notifications panel coming soon.")}
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Bell size={15} />
          </button>

          {/* Admin profile chip */}
          <div className="hidden cursor-pointer items-center gap-[10px] pl-[8px] sm:flex">
            <Image
              src={adminAvatar}
              alt="Admin Avatar"
              width={36}
              height={36}
              className="h-[36px] w-[36px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold leading-tight text-[#1E293B]">
                Arghya Sen
                <ChevronDown size={12} className="ml-[4px] inline" />
              </span>
              <span className="text-[10px] leading-tight text-[#94A3B8]">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== 2. STATS GRID ==================== */}
      <section className="grid grid-cols-1 gap-[16px] min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {d.stats.map((stat) => {
          const Icon =
            stat.tone === "total"
              ? ClipboardList
              : stat.tone === "suspicious"
                ? TriangleAlert
                : stat.tone === "high"
                  ? ShieldAlert
                  : Info;

          const iconTone: Record<string, string> = {
            total: "bg-[#F1F5F9] text-[#475569]",
            suspicious: "bg-[#FEF9C3] text-[#CA8A04]",
            high: "bg-[#FEE2E2] text-[#DC2626]",
            medium: "bg-[#FEF3C7] text-[#D97706]",
            low: "bg-[#FEF9C3] text-[#CA8A04]",
          };

          return (
            <div key={stat.key} className={`flex items-center gap-[12px] p-[16px] ${CARD}`}>
              {/* Pastel icon box */}
              <div
                className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] ${iconTone[stat.tone]}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-[#1E293B]">
                  {stat.label}
                </span>
                <span className="my-[2px] text-[20px] font-bold leading-[1.2] text-[#0F172A]">
                  {stat.value}
                </span>
                <span className="truncate text-[10px] text-[#94A3B8]">
                  {stat.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ==================== 3. ACTIVITY TABLE ==================== */}
      <section className={`flex flex-1 flex-col justify-between p-[20px] ${CARD}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr>
                {[
                  "Activity Id",
                  "User/Provider",
                  "Activity Type",
                  "Risk Level",
                  "Date & Time",
                  "Status",
                  "Action",
                ].map((th) => (
                  <th
                    key={th}
                    className="border-b border-[#F1F5F9] px-[16px] py-[12px] text-[13px] font-semibold text-[#1E293B]"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {d.activities.map((row) => (
                <tr key={row.id}>
                  {/* Activity Id */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] align-middle text-[12px] font-bold text-[#0F172A]">
                    {row.id}
                  </td>

                  {/* User/Provider */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] align-middle text-[12px]">
                    <div className="font-semibold text-[#1E293B]">
                      {row.person}
                    </div>
                    <div className="mt-[2px] text-[10px] text-[#94A3B8]">
                      {row.personMeta}
                    </div>
                  </td>

                  {/* Activity Type */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] align-middle text-[12px]">
                    <div className="font-semibold text-[#1E293B]">
                      {row.type}
                    </div>
                    <div className="mt-[2px] text-[10px] text-[#94A3B8]">
                      {row.typeSub}
                    </div>
                  </td>

                  {/* Risk Level */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] align-middle">
                    <span className={`${BADGE_BASE} ${RISK_BADGE[row.risk]}`}>
                      {row.risk}
                    </span>
                  </td>

                  {/* Date & Time */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] align-middle text-[12px]">
                    <div className="font-medium text-[#334155]">{row.date}</div>
                    <div className="mt-[2px] text-[10px] text-[#94A3B8]">
                      {row.time}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] align-middle">
                    <span className={`${BADGE_BASE} ${STATUS_BADGE[row.status]}`}>
                      {row.status}
                    </span>
                  </td>

                  {/* Action (em-dash when null) */}
                  <td className="border-b border-[#F8FAFC] px-[16px] py-[16px] text-center align-middle text-[12px]">
                    {row.action ? (
                      <span className={`${BADGE_BASE} ${ACTION_BADGE[row.action]}`}>
                        {row.action}
                      </span>
                    ) : (
                      <span className="font-normal text-[#94A3B8]">&mdash;&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- Table footer: showing text + pagination ---------- */}
        <div className="flex flex-col gap-[12px] pt-[20px] text-[11px] text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <div>{d.showingText}</div>

          <div className="flex items-center gap-[6px]">
            {/* Previous */}
            <button
              type="button"
              aria-label="Previous page"
              onClick={() =>
                setCurrentPage((p) =>
                  p === "1" ? p : String(Math.max(1, Number(p) - 1)),
                )
              }
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white text-[11px] text-[#64748B]"
            >
              <ChevronLeft size={13} />
            </button>

            {pages.map((page) =>
              page === "..." ? (
                <span key="dots" className="px-[4px] text-[#94A3B8]">...</span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] border text-[11px] ${
                    currentPage === page
                      ? "border-[#2563EB] bg-[#2563EB] text-white"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
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
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white text-[11px] text-[#64748B]"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
