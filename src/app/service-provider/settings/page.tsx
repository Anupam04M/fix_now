"use client";

// src/app/service-provider/settings/page.tsx
// ================================================================
// PROVIDER SETTINGS  (route: /service-provider/settings)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to Fix_now-Dashboard-_backend_part/settings.html
//
// SECTIONS:
//   0. PROFILE BANNER  : dark banner image + overlapping avatar card
//                        (name, role, Provider ID, Active pill)
//   GRID [1.22fr_1fr]:
//   LEFT  : Security & Profile (Change Password + Profile Visibility +
//           2FA) | Language & Region | Notification Preferences |
//           Account Management (Session/Deactivate/Delete)
//
// ============================================================
// DATA FLOW — STATIC -> DYNAMIC IN 3 STEPS
// ============================================================
//   All fields render from SETTINGS_PAGE_DATA below; its shape IS
//   the API contract.
//     STEP 1: open src/api/api-function/provider.function.ts
//     STEP 2: fill changePasswordFn() + updateNotificationPrefsFn()
//             real api calls, delete their mock returns
//     STEP 3: load SETTINGS_PAGE_DATA from GET /provider/settings on
//             mount and delete the constant here.
//
//   ACTIONS:
//     - Update Password   -> changePasswordFn(payload) [already exists]
//     - Notification toggles -> updateNotificationPrefsFn [exists]
//     - Log Out           -> useAuthStore().logout()
//     - Deactivate        -> PATCH /provider/account { status }
//     - Delete            -> DELETE /provider/account (confirm modal!)
// ============================================================

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import bannerImg from "@/assets/images/settings-banner.png";
import providerAvatar from "@/assets/images/after-service/Frame 358.png";
import { changePasswordFn } from "@/api/api-function/provider.function";

/* ==================== STATIC DATA (matches HTML) ==================== */
const SETTINGS_PAGE_DATA = {
  profile: {
    name: "Rahul Sharma",
    role: "Service Provider",
    providerId: "Provider ID: FNP-SP-9048",
  },
  visibilityOn: true, // Public Profile toggle starts ON (dark blue)
  twoFactorDisabled: true,
  prefs: {
    email: true, // dark-blue toggle ON
    sms: false, // gray toggle OFF (knob left)
    push: true, // dark-blue toggle ON
  },
};

/* Shared card wrapper (exact HTML classes) */
const CARD =
  "rounded-[14px] border border-[#EDF0F3] bg-white px-[13px] py-[14px] sm:px-[18px] sm:py-[18px] lg:rounded-[18px] lg:px-[24px] lg:py-[20px]";

/* Section header row: title left, round icon-bubble right */
const CardHeader = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between gap-[10px]">
      <h2 className="font-outfit text-[16px] font-semibold leading-tight text-[#111827] sm:text-[18px] md:text-[19px] lg:text-[21px]">
        {title}
      </h2>
      {/* Round grey icon bubble */}
      <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#F7F8FA] text-[#7D8791]">
        {icon}
      </span>
    </div>
    {/* Header divider */}
    <div className="mt-[14px] h-px w-full bg-[#EDF0F3]" />
  </div>
);

/* Small pill-style toggle matching the HTML (ON = navy right-knob,
   OFF = gray left-knob) */
const PillToggle = ({
  on,
  onChange,
}: {
  on: boolean;
  onChange?: () => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={onChange}
    className={`relative h-[16px] w-[29px] shrink-0 rounded-full transition-colors duration-200 ${
      on ? "bg-[#244F84]" : "bg-[#D2D5D9]"
    }`}
  >
    <span
      className={`absolute top-[2px] h-[12px] w-[12px] rounded-full bg-white shadow-sm transition-all ${
        on ? "right-[2px]" : "left-[2px]"
      }`}
    />
  </button>
);

/* Password input with eye-slash button (exact HTML styling) */
const PwInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="mb-[5px] block text-[11px] uppercase tracking-[0.02em] text-[#929AA3]">
      {label}
    </label>
    <div className="relative">
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[41px] w-full rounded-[7px] border border-[#E4E8EC] bg-[#F8F9FA] px-[10px] pr-[34px] text-[13px] text-[#717A84] outline-none transition focus:border-[#2772CC] focus:bg-white"
      />
      {/* Eye-slash visibility button */}
      <button
        type="button"
        aria-label="Toggle password visibility"
        className="absolute right-[8px] top-1/2 flex -translate-y-1/2 items-center justify-center text-[#9CA5AD] transition-colors duration-200 hover:text-[#2772CC]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 1l22 22" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
);

export default function ProviderSettingsPage() {
  const d = SETTINGS_PAGE_DATA;

  /* ---------------- STATE ---------------- */
  const [currentPw, setCurrentPw] = useState("........");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // Toggles start in the exact states shown in the HTML
  const [visibilityOn, setVisibilityOn] = useState(d.visibilityOn);
  const [emailNotif, setEmailNotif] = useState(d.prefs.email);
  const [smsNotif, setSmsNotif] = useState(d.prefs.sms);
  const [pushNotif, setPushNotif] = useState(d.prefs.push);

  /* Update Password -> uses existing API fn (mock until backend) */
  const handleUpdatePassword = async () => {
    if (!newPw || !confirmPw) {
      toast.error("Please fill in new password and confirmation.");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const res = await changePasswordFn({
        current_password: currentPw,
        new_password: newPw,
        new_password_confirmation: confirmPw,
      });
      if (res.success) {
        toast.success(res.message || "Password updated!");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        toast.error(res.message || "Update failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  /* Generic toggle wrapper: flips state; wire the API call inside
     once updateNotificationPrefsFn is live (see header guide) */
  const makeToggle =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    () =>
      setter((v) => {
        // Dynamic later: call updateNotificationPrefsFn with new state
        return !v;
      });

  return (
    <main className="relative z-10 px-[10px] pb-[22px] pt-[18px] sm:px-[14px] md:px-[20px] lg:px-[28px]">
      {/* ==================== PROFILE BANNER CARD ==================== */}
      <div>
        {/* Dark banner strip */}
        <div className="relative z-0 h-[92px] overflow-hidden rounded-t-[16px] bg-[#03111E] md:h-[92px] lg:h-[108px] lg:rounded-t-[20px]">
          <Image
            src={bannerImg}
            alt="Service Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlapping details bar */}
        <div className="relative z-10 flex h-[94px] items-end justify-between rounded-b-[16px] bg-white px-[12px] pb-[10px] sm:h-[86px] sm:px-[18px] lg:h-[102px] lg:rounded-b-[20px] lg:px-[28px] lg:pb-[13px]">
          {/* Avatar floating over banner edge */}
          <div className="absolute left-[12px] top-[-32px] z-50 sm:left-[18px] sm:top-[-32px] md:top-[-36px] lg:left-[28px] lg:top-[-42px]">
            <div className="relative h-[66px] w-[66px] overflow-hidden rounded-[9px] border-[2px] border-white bg-[#E9EDF1] shadow-[0_3px_9px_rgba(0,0,0,0.14)] md:h-[72px] md:w-[72px] lg:h-[78px] lg:w-[78px]">
              <Image
                src={providerAvatar}
                alt={d.profile.name}
                fill
                className="object-cover"
              />
              {/* Green online dot */}
              <span className="absolute bottom-[2px] right-[2px] h-[11px] w-[11px] rounded-full border-[2px] border-white bg-[#35D58A]" />
            </div>
          </div>

          {/* Name / role / provider id */}
          <div className="ml-[70px] min-w-0 flex-1 sm:ml-[82px] md:ml-[90px] lg:ml-[98px] lg:pr-[20px]">
            <p className="text-[14px] font-semibold leading-[18px] text-[#111827] sm:text-[14px] lg:text-[18px] lg:leading-[23px]">
              {d.profile.name}
            </p>
            <p className="mt-[4px] text-[10px] leading-[14px] text-[#767676] lg:text-[13px] lg:leading-[17px]">
              {d.profile.role}
            </p>
            <p className="mt-[2px] text-[8px] leading-[11px] text-[#9AA0A6] lg:text-[10px] lg:leading-[14px]">
              {d.profile.providerId}
            </p>
          </div>

          {/* Active pill */}
          <span className="mb-[6px] flex shrink-0 items-center gap-[4px] rounded-full border border-[#CDEFD9] bg-[#F3FFF7] px-[9px] py-[5px] text-[9px] font-semibold leading-none text-[#35B96F] lg:mb-[8px] lg:px-[11px] lg:py-[6px] lg:text-[11px]">
            <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#35D58A]" />
            Active
          </span>
        </div>
      </div>

      {/* ==================== MAIN GRID [1.22fr_1fr] ==================== */}
      <div className="mt-[12px] grid grid-cols-1 gap-[12px] lg:grid-cols-[1.22fr_1fr] lg:gap-[14px]">
        {/* ==================== LEFT SIDE ==================== */}
        <div className="flex min-w-0 flex-col gap-[12px]">
          {/* ---------- SECURITY & PROFILE ---------- */}
          <div className={CARD}>
            <CardHeader
              title="Security & Profile"
              icon={
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 5a3 3 0 116 0v3H9V7z" />
                </svg>
              }
            />

            <div className="mt-[16px] grid grid-cols-1 gap-[22px] md:grid-cols-[1fr_0.9fr] lg:gap-[28px]">
              {/* ----- Change Password column ----- */}
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-[#252D36]">Change Password</h3>

                <div className="mt-[11px] space-y-[11px]">
                  <PwInput
                    label="Current Password"
                    value={currentPw}
                    onChange={setCurrentPw}
                  />
                  <PwInput label="New Password" value={newPw} onChange={setNewPw} />
                  <PwInput
                    label="Confirm New Password"
                    value={confirmPw}
                    onChange={setConfirmPw}
                  />
                </div>

                {/* Blue rounded submit */}
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  className="mt-[14px] h-[39px] w-full rounded-[20px] bg-[#2772CC] text-[12px] font-medium text-white transition-all duration-300 hover:bg-color-15 hover:text-white hover:shadow-[0_5px_14px_rgba(39,114,204,0.15)] active:scale-[0.99]"
                >
                  Update Password
                </button>
              </div>

              {/* ----- Visibility + 2FA column ----- */}
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-[#252D36]">
                  Profile Visibility
                </h3>

                {/* Public Profile box (light blue) */}
                <div className="mt-[10px] rounded-[8px] bg-[#EAF6FE] px-[11px] py-[11px]">
                  <div className="flex items-center justify-between gap-[8px]">
                    <span className="text-[11px] font-semibold text-[#304052]">
                      Public Profile
                    </span>
                    <PillToggle
                      on={visibilityOn}
                      onChange={makeToggle(setVisibilityOn)}
                    />
                  </div>
                  <p className="mt-[5px] text-[10px] leading-[1.4] text-[#7C8791]">
                    Allow clients to find you in search results and view your
                    public metrics.
                  </p>
                </div>

                {/* 2FA */}
                <h3 className="mt-[18px] text-[14px] font-semibold text-[#252D36]">
                  Two-Factor Authentication
                </h3>
                <div className="mt-[8px] rounded-[8px] bg-[#FFF8F8] px-[11px] py-[11px]">
                  <p className="text-[11px] font-semibold text-[#515B65]">
                    Status: <span className="text-[#E66B6B]">Disabled</span>
                  </p>
                  <p className="mt-[4px] text-[10px] leading-[1.35] text-[#E66B6B]">
                    Recommended
                    <br />
                    for security
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- LANGUAGE & REGION ---------- */}
          <div className={CARD}>
            <CardHeader
              title="Language & Region"
              icon={
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z" />
                </svg>
              }
            />

            <div className="mt-[15px] grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-x-[20px] md:gap-y-[12px]">
              {/* Language */}
              <div>
                <label className="mb-[5px] block text-[11px] uppercase text-[#929AA3]">
                  Language
                </label>
                <select className="h-[39px] w-full cursor-pointer rounded-[7px] border border-[#E9ECEF] bg-[#F5F6F7] px-[9px] text-[12px] text-[#4F5963] outline-none transition focus:border-[#2772CC] focus:bg-white">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Hindi</option>
                  <option>Bengali</option>
                </select>
              </div>

              {/* Date/Time format */}
              <div>
                <label className="mb-[5px] block text-[11px] uppercase text-[#929AA3]">
                  Date/Time Format
                </label>
                <select className="h-[39px] w-full cursor-pointer rounded-[7px] border border-[#E9ECEF] bg-[#F5F6F7] px-[9px] text-[12px] text-[#4F5963] outline-none transition focus:border-[#2772CC] focus:bg-white">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              {/* Time zone */}
              <div>
                <label className="mb-[5px] block text-[11px] uppercase text-[#929AA3]">
                  Time Zone
                </label>
                <select className="h-[39px] w-full cursor-pointer rounded-[7px] border border-[#E9ECEF] bg-[#F5F6F7] px-[9px] text-[12px] text-[#4F5963] outline-none transition focus:border-[#2772CC] focus:bg-white">
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+05:30) India Standard Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT SIDE ==================== */}
        <div className="flex min-w-0 flex-col gap-[12px]">
          {/* ---------- NOTIFICATION PREFERENCES ---------- */}
          <div className={CARD}>
            <CardHeader
              title="Notification Preferences"
              icon={
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round"/>
                </svg>
              }
            />

            <div className="mt-[14px] space-y-[8px]">
              {/* EMAIL — ON (dark toggle) */}
              <div className="flex min-h-[50px] items-center gap-[9px] rounded-[8px] bg-[#F7F8FA] px-[10px] py-[7px]">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[6px] border border-[#E7EAED] bg-white text-[#87929C]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#515B65]">
                    Email Notifications
                  </p>
                  <p className="truncate text-[11px] text-[#9BA3AB]">
                    Daily Summaries And Appointment Confirmations.
                  </p>
                </div>
                <PillToggle on={emailNotif} onChange={makeToggle(setEmailNotif)} />
              </div>

              {/* SMS — OFF (gray toggle, knob left like HTML) */}
              <div className="flex min-h-[50px] items-center gap-[9px] rounded-[8px] bg-[#F7F8FA] px-[10px] py-[7px]">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[6px] border border-[#E7EAED] bg-white text-[#87929C]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#515B65]">
                    SMS Alerts
                  </p>
                  <p className="truncate text-[11px] text-[#9BA3AB]">
                    Urgent Updates And Last-Minute Schedule Changes.
                  </p>
                </div>
                <PillToggle on={smsNotif} onChange={makeToggle(setSmsNotif)} />
              </div>

              {/* DESKTOP PUSH — ON */}
              <div className="flex min-h-[50px] items-center gap-[9px] rounded-[8px] bg-[#F7F8FA] px-[10px] py-[7px]">
                <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[6px] border border-[#E7EAED] bg-white text-[#87929C]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#515B65]">
                    Desktop Push Notifications
                  </p>
                  <p className="truncate text-[11px] text-[#9BA3AB]">
                    Real-Time Alerts While The Dashboard Is Open.
                  </p>
                </div>
                <PillToggle on={pushNotif} onChange={makeToggle(setPushNotif)} />
              </div>
            </div>
          </div>

          {/* ---------- ACCOUNT MANAGEMENT ---------- */}
          <div className={CARD}>
            <CardHeader
              title="Account Management"
              icon={
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.63.28 1.1.84 1.26 1.51H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              }
            />

            <div className="mt-[14px] space-y-[8px]">
              {/* SESSION CONTROL — Log Out (blue filled) */}
              <div className="flex min-h-[50px] items-center gap-[9px] rounded-[8px] bg-[#F7F8FA] px-[10px] py-[7px]">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-[#515B65]">
                    Session Control
                  </p>
                  <p className="truncate text-[11px] text-[#9BA3AB]">
                    Sign Out Of Your Current Session On This Device.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Logged out of this device.")}
                  className="shrink-0 rounded-[20px] bg-[#2772CC] px-[11px] py-[5px] text-[10px] font-medium text-white transition-all duration-200 hover:bg-color-15 hover:text-white hover:shadow-[0_4px_12px_rgba(39,114,204,0.15)] lg:text-[12px]"
                >
                  Log Out
                </button>
              </div>

              {/* DEACTIVATE — outline blue */}
              <div className="flex min-h-[50px] items-center gap-[9px] rounded-[8px] bg-[#F7F8FA] px-[10px] py-[7px]">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-[#515B65]">
                    Deactivate Account
                  </p>
                  <p className="truncate text-[11px] text-[#9BA3AB]">
                    Temporarily Disable Your Profile And Services.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Deactivate flow coming soon.")}
                  className="shrink-0 rounded-[20px] border border-[#4A9DF1] bg-white px-[11px] py-[5px] text-[10px] font-medium text-[#2772CC] transition-all duration-200 hover:border-color-15 hover:bg-color-15 hover:text-white lg:text-[12px]"
                >
                  Deactivate
                </button>
              </div>

              {/* DELETE — red row, red filled button */}
              <div className="flex min-h-[50px] items-center gap-[9px] rounded-[8px] bg-[#FFF6F6] px-[10px] py-[7px]">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-[#D95050]">
                    Delete Account
                  </p>
                  <p className="truncate text-[11px] text-[#B47D7D]">
                    Permanently Remove All Your Data And Access. This Cannot Be
                    Undone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.error("Delete requires backend + confirmation modal.")}
                  className="shrink-0 rounded-[20px] bg-[#E63131] px-[11px] py-[5px] text-[10px] font-medium text-white transition-all duration-200 hover:bg-color-15 hover:text-white hover:shadow-[0_4px_12px_rgba(230,49,49,0.15)] lg:text-[12px]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
