"use client";

// src/api/api-function/adminSettings.function.ts
// ================================================================
// ADMIN SETTINGS API LAYER
// ----------------------------------------------------------------
// Central place for every admin-settings network call.
// Follows the FixNow conventions used across the project:
//   - Bearer token attached (see ./axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND ENDPOINTS NOT LIVE YET !!!
// Every function below currently returns STATIC mock data so the
// page renders without a server. When the Laravel team ships an
// endpoint, uncomment the real api call and delete the mock
// return. This mirrors exactly how provider.function.ts works.
//
// BEGINNER MAP: which page uses which function?
//   /admin/settings -> fetchAdminSettingsFn,
//                      updateAdminNotificationPrefsFn
// ============================================================

import api from "./axios.instance";

/* Response envelope shape (same convention as provider.function.ts).
   Kept local here so this file is self-contained. */
interface AdminApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

/* ---------------- SHARED TYPES ---------------- */
export interface AdminProfileInfo {
  fullName: string; // "Arghya Sen"
  email: string; // "Admin@Fixnow.Com"
  role: string; // "Admin"
  lastLogin: string; // pre-formatted
}

export interface AdminPasswordInfo {
  masked: string; // "********"
  lastChange: string; // pre-formatted
}

export interface AdminNotificationPref {
  key: string; // stable key used by the API payload
  label: string; // "Email Notification :"
  enabled: boolean; // drives the toggle colour/position
}

export interface AdminPreferenceRow {
  key: string;
  label: string; // "Language :"
  value: string; // "English"
  /** optional inline icon after the value */
  icon?: "clock" | "building";
}

export interface AdminSettingsData {
  profile: AdminProfileInfo;
  password: AdminPasswordInfo;
  notifications: AdminNotificationPref[];
  preferences: AdminPreferenceRow[];
}

/* ---------------- SETTINGS OVERVIEW ---------------- */
/* Mock payload mirrors Settings.html value-for-value.
   Every field here feeds exactly one section of the page,
   so swapping to the real API needs NO page changes. */
export const fetchAdminSettingsFn = async (): Promise<
  AdminApiResponse<AdminSettingsData>
> => {
  // REAL CALL (uncomment when backend is live):
  // const { data } = await api.get("/admin/settings");
  // return { success: true, message: data.message, data: data.data };

  return {
    success: true,
    message: "Settings fetched successfully.",
    data: {
      profile: {
        fullName: "Arghya Sen",
        email: "Admin@Fixnow.Com",
        role: "Admin",
        lastLogin: "12th Aug,2026, 11:00 AM",
      },
      password: {
        masked: "********",
        lastChange: "31th July,2026, 11:00 AM",
      },
      notifications: [
        { key: "email", label: "Email Notification :", enabled: true },
        { key: "sms", label: "SMS Notification :", enabled: true },
        { key: "push", label: "Push Notification :", enabled: true },
        { key: "marketing", label: "Marketing Emails :", enabled: false },
      ],
      preferences: [
        { key: "language", label: "Language :", value: "English" },
        {
          key: "date",
          label: "Date :",
          value: "DD/MM/YYYY",
          icon: "clock",
        },
        {
          key: "timezone",
          label: "Time Zone :",
          value: "(GMT +5:30)Asia,Kolkata",
          icon: "building",
        },
        {
          key: "lastLogin",
          label: "Last Login :",
          value: "12th Aug,2026, 11:00 AM",
        },
      ],
    } as AdminSettingsData,
  };
};

/* ---------------- UPDATE NOTIFICATION PREFS ---------------- */
export const updateAdminNotificationPrefsFn = async (payload: {
  [key: string]: boolean; // e.g. { email: true, sms: true, ... }
}): Promise<AdminApiResponse> => {
  // await api.patch("/admin/settings/notifications", payload);
  // return { success: true, message: data.message };
  return { success: true, message: "Notification preferences updated." };
};
