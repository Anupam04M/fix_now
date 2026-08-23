"use client";

// src/app/admin/settings/page.tsx
// ================================================================
// ADMIN SETTINGS  (route: /admin/settings)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to the Settings.html design.
//
// SECTIONS:
//   1. HEADER          : title + breadcrumb, search/bell/profile chip
//   2. ADMIN PROFILE   : read-only info rows + Edit Profile
//   3. CHANGE PASSWORD : masked password info + Change Password
//   4. NOTIFICATION    : 4 live toggles + Manage
//   5. PREFERENCES     : language/date/timezone rows + Configure
//
// ============================================================
// DATA FLOW  (read this before changing anything!)
// ============================================================
//   useAdminSettings()              <-- src/hooks/useAdminSettings.ts
//        |  one call, one payload
//        v
//   AdminSettingsData               <-- types in adminSettings.function.ts
//        |
//        +-- d.profile       -> section 1 info grid
//        +-- d.password      -> section 2 info grid
//        +-- d.notifications -> section 3 toggles (live state)
//        +-- d.preferences   -> section 4 info grid (inline icons)
//
// INTERACTIVITY ALREADY WIRED:
//   - Notification toggles flip instantly and call
//     updateAdminNotificationPrefsFn() (mock-backed until the API
//     ships) — see handleToggle below.
//
// CONVERT STATIC -> DYNAMIC IN 3 STEPS (any dev can do this):
//   STEP 1: open src/api/api-function/adminSettings.function.ts
//   STEP 2: inside fetchAdminSettingsFn(), delete the mock return
//           and uncomment api.get("/admin/settings")
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
  User,
  Lock,
  SlidersHorizontal,
  Clock,
  Building,
} from "lucide-react";

import { useAdminSettings } from "@/hooks/useAdminSettings";
import {
  AdminSettingsData,
  AdminNotificationPref,
  updateAdminNotificationPrefsFn,
} from "@/api/api-function/adminSettings.function";
import adminAvatar from "@/assets/images/admin/avatar.jpg";

/* Shared card look from the HTML */
const CARD =
  "bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]";

/* Section icon box (same pastel style on every card) */
const SECTION_ICON =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-lg text-[#64748B] mt-0.5";

/* Outline pill button used by every section */
const ACTION_BTN =
  "cursor-pointer rounded-full border border-[#2563EB] px-5 py-2 text-[11px] font-semibold text-[#2563EB] transition-all duration-200 hover:bg-[#2563EB] hover:text-white";

export default function Settings() {
  const { data: res, isLoading } = useAdminSettings();

  /* Local toggle state mirrors d.notifications so flips feel instant */
  const [toggles, setToggles] = useState<Record<string, boolean> | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
      </div>
    );
  }

  /* Payload (mock today, API tomorrow) */
  const d = res?.data as AdminSettingsData | undefined;

  if (!d) {
    return (
      <p className="p-8 text-center text-sm text-[#7A8796]">
        Unable to load settings. Please try again later.
      </p>
    );
  }

  const prefState = toggles ?? Object.fromEntries(
    d.notifications.map((n) => [n.key, n.enabled]),
  );

  /* Flip a toggle optimistically, then sync to the API (mock-backed).
     If the real call fails later, revert + toast from its catch. */
  const handleToggle = async (pref: AdminNotificationPref) => {
    const next = !prefState[pref.key];
    setToggles({ ...prefState, [pref.key]: next });
    try {
      const res = await updateAdminNotificationPrefsFn({
        ...prefState,
        [pref.key]: next,
      });
      if (res.success) {
        toast.success(`${pref.label.replace(" :", "")} ${next ? "enabled" : "disabled"}.`);
      } else {
        setToggles({ ...prefState });
        toast.error(res.message || "Could not update preference.");
      }
    } catch {
      setToggles({ ...prefState });
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[20px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:gap-5 lg:px-8">
      {/* ==================== 1. HEADER ==================== */}
      <header
        className={`${CARD} flex items-center justify-between gap-4 px-[16px] py-[16px] md:px-6`}
      >
        {/* Left: title + breadcrumb */}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-[#0F172A]">
            Settings
          </h1>
          <p className="mt-[2px] truncate text-[11px] text-[#94A3B8]">
            Dashboard &gt; Setting
          </p>
        </div>

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            onClick={() => toast.info("Search panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Search size={15} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            onClick={() => toast.info("Notifications panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
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
              <span className="text-[12px] font-semibold leading-tight text-[#1E293B]">
                Arghya Sen
                <ChevronDown size={12} className="ml-1 inline" />
              </span>
              <span className="text-[10px] leading-tight text-[#94A3B8]">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== SETTINGS SECTIONS ==================== */}
      <div className="flex flex-col gap-4">
        {/* ---------- SECTION 1 : ADMIN PROFILE ---------- */}
        <section
          className={`${CARD} flex flex-col gap-6 rounded-2xl p-6 lg:flex-row lg:items-start lg:justify-between`}
        >
          {/* Left: icon + heading */}
          <div className="flex items-start gap-4">
            <div className={SECTION_ICON}>
              <User size={18} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Admin Profile
              </h2>
              <p className="mt-0.5 text-[11px] text-[#94A3B8]">
                View And Update Your Admin Profile
              </p>
            </div>
          </div>

          {/* Middle: info grid */}
          <div className="grid flex-1 grid-cols-[110px_1fr] gap-y-4 text-[12px] lg:ml-12 lg:max-w-[520px]">
            <span className="font-bold text-[#0F172A]">Full Name :</span>
            <span className="font-medium text-[#475569]">
              {d.profile.fullName}
            </span>

            <span className="font-bold text-[#0F172A]">Email :</span>
            <span className="font-medium text-[#475569]">
              {d.profile.email}
            </span>

            <span className="font-bold text-[#0F172A]">Role :</span>
            <span className="font-medium text-[#475569]">
              {d.profile.role}
            </span>

            <span className="font-bold text-[#0F172A]">Last Login :</span>
            <span className="font-medium text-[#475569]">
              {d.profile.lastLogin}
            </span>
          </div>

          {/* Right: action */}
          <div>
            <button
              className={ACTION_BTN}
              onClick={() => toast.info("Edit profile coming soon.")}
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* ---------- SECTION 2 : CHANGE PASSWORD ---------- */}
        <section
          className={`${CARD} flex flex-col gap-6 rounded-2xl p-6 lg:flex-row lg:items-start lg:justify-between`}
        >
          <div className="flex items-start gap-4">
            <div className={SECTION_ICON}>
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Change Password
              </h2>
              <p className="mt-0.5 max-w-[160px] text-[11px] text-[#94A3B8]">
                Change Your Password Regular For Better Security
              </p>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-[110px_1fr] gap-y-4 text-[12px] lg:ml-12 lg:max-w-[520px]">
            <span className="font-bold text-[#0F172A]">Password :</span>
            <span className="font-medium tracking-widest text-[#475569]">
              {d.password.masked}
            </span>

            <span className="font-bold text-[#0F172A]">Last Change :</span>
            <span className="font-medium text-[#475569]">
              {d.password.lastChange}
            </span>
          </div>

          <div>
            <button
              className={ACTION_BTN}
              onClick={() => toast.info("Change password flow coming soon.")}
            >
              Change Password
            </button>
          </div>
        </section>

        {/* ---------- SECTION 3 : NOTIFICATION ---------- */}
        <section
          className={`${CARD} flex flex-col gap-6 rounded-2xl p-6 lg:flex-row lg:items-start lg:justify-between`}
        >
          <div className="flex items-start gap-4">
            <div className={SECTION_ICON}>
              <Bell size={18} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Notification
              </h2>
              <p className="mt-0.5 text-[11px] text-[#94A3B8]">
                Manage The Notifications
              </p>
            </div>
          </div>

          {/* Toggle grid (label column is wider here per the HTML) */}
          <div className="grid flex-1 grid-cols-[150px_1fr] items-center gap-y-4 text-[12px] lg:ml-12 lg:max-w-[520px]">
            {d.notifications.map((pref) => (
              <React.Fragment key={pref.key}>
                <span className="font-bold text-[#0F172A]">
                  {pref.label}
                </span>
                <div>
                  {/* Toggle: green/right = ON, gray/left = OFF */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefState[pref.key]}
                    aria-label={pref.label.replace(" :", "")}
                    onClick={() => handleToggle(pref)}
                    className={`relative flex h-5 w-9 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                      prefState[pref.key]
                        ? "justify-end bg-[#16A34A]"
                        : "justify-start bg-[#CBD5E1]"
                    }`}
                  >
                    <span className="h-4 w-4 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div>
            <button
              className={`${ACTION_BTN} px-6`}
              onClick={() => toast.info("Notification manager coming soon.")}
            >
              Manage
            </button>
          </div>
        </section>

        {/* ---------- SECTION 4 : PREFERENCES ---------- */}
        <section
          className={`${CARD} flex flex-col gap-6 rounded-2xl p-6 lg:flex-row lg:items-start lg:justify-between`}
        >
          <div className="flex items-start gap-4">
            <div className={SECTION_ICON}>
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Preferences
              </h2>
              <p className="mt-0.5 max-w-[160px] text-[11px] text-[#94A3B8]">
                Configure System Preferences And Default Settings
              </p>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-[110px_1fr] gap-y-4 text-[12px] lg:ml-12 lg:max-w-[520px]">
            {d.preferences.map((row) => (
              <React.Fragment key={row.key}>
                <span className="font-bold text-[#0F172A]">{row.label}</span>
                <span className="flex items-center gap-2 font-medium text-[#64748B]">
                  {row.icon === "clock" && (
                    <Clock size={13} className="text-[#64748B]" />
                  )}
                  {row.icon === "building" && (
                    <Building size={13} className="text-[#64748B]" />
                  )}
                  {row.value}
                </span>
              </React.Fragment>
            ))}
          </div>

          <div>
            <button
              className={ACTION_BTN}
              onClick={() => toast.info("Preferences editor coming soon.")}
            >
              Configure
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
