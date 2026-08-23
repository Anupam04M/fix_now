"use client";

// src/api/api-function/adminActivity.function.ts
// ================================================================
// ADMIN ACTIVITY LOG API LAYER
// ----------------------------------------------------------------
// Central place for every admin activity-log network call.
// Follows the FixNow conventions used across the project:
//   - Bearer token attached (see ./axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND ENDPOINTS NOT LIVE YET !!!
// fetchActivityLogFn() currently returns STATIC mock data so the
// page renders without a server. When the backend ships the
// endpoint, uncomment the real api.get call and delete the mock
// return. This mirrors exactly how provider.function.ts works.
//
// BEGINNER MAP: which page uses which function?
//   /admin/activity_log -> fetchActivityLogFn
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
export interface ActivityStat {
  key: string;
  label: string;
  value: string;
  subtext: string;
  /** drives the icon + pastel box colour on the card */
  tone: "total" | "suspicious" | "high" | "medium" | "low";
}

export interface ActivityLogRow {
  id: string; // e.g. "Act-2103"
  person: string; // user / provider display name
  personMeta: string; // "User ID: FNP-US-12165"
  type: string; // activity headline
  typeSub: string; // activity detail line
  risk: "High" | "Medium" | "Low";
  date: string; // pre-formatted for now
  time: string; // pre-formatted for now
  status: "Reviewed" | "Under Review" | "New";
  /** null renders the em-dash placeholder cell */
  action: "Restricted" | "Banned" | "Under Watch" | null;
}

export interface ActivityLogData {
  stats: ActivityStat[];
  activities: ActivityLogRow[];
  showingText: string;
  totalPages: number;
}

/* ---------------- ACTIVITY LOG ---------------- */
/* Mock payload mirrors Activity_Log.html value-for-value.
   Every field here feeds exactly one section of the page,
   so swapping to the real API needs NO page changes. */
export const fetchActivityLogFn = async (): Promise<
  AdminApiResponse<ActivityLogData>
> => {
  // REAL CALL (uncomment when backend is live):
  // const { data } = await api.get("/admin/activity-log");
  // return { success: true, message: data.message, data: data.data };

  return {
    success: true,
    message: "Activity log fetched successfully.",
    data: {
      stats: [
        {
          key: "total",
          label: "Total Activities",
          value: "3,451",
          subtext: "All Recorded Activities",
          tone: "total",
        },
        {
          key: "suspicious",
          label: "Suspicious Activities",
          value: "150",
          subtext: "This Month",
          tone: "suspicious",
        },
        {
          key: "high",
          label: "High Risk",
          value: "18",
          subtext: "Take Immidiate Action",
          tone: "high",
        },
        {
          key: "medium",
          label: "Medium Risk",
          value: "87",
          subtext: "Requires Attention",
          tone: "medium",
        },
        {
          key: "low",
          label: "Low Risk",
          value: "45",
          subtext: "Monitor And Review",
          tone: "low",
        },
      ],
      activities: [
        {
          id: "Act-2103",
          person: "Raja Biswas",
          personMeta: "User ID: FNP-SP-5508",
          type: "Unusual Booking Requests",
          typeSub: "10 Bookings In 6 Minutes",
          risk: "Medium",
          date: "10 Aug, 2026",
          time: "12:30 PM",
          status: "Reviewed",
          action: "Restricted",
        },
        {
          id: "Act-2104",
          person: "Arjun Roy",
          personMeta: "Provider ID: FNP-SP-1108",
          type: "Multiple Login Attempts",
          typeSub: "9 Failed Login Attemps",
          risk: "High",
          date: "10 Aug, 2026",
          time: "12:42 PM",
          status: "Reviewed",
          action: "Banned",
        },
        {
          id: "Act-2105",
          person: "Arup Das",
          personMeta: "User ID: FNP-US-12165",
          type: "Unusual Booking Requests",
          typeSub: "7 Bookings In 12 Minutes",
          risk: "Medium",
          date: "10 Aug, 2026",
          time: "12:48 PM",
          status: "Under Review",
          action: null,
        },
        {
          id: "Act-2106",
          person: "Mohit Singh",
          personMeta: "Provider ID: FNP-SP-0108",
          type: "Invalid Documention",
          typeSub: "Varification Failed",
          risk: "Medium",
          date: "10 Aug, 2026",
          time: "1:13 PM",
          status: "Reviewed",
          action: "Restricted",
        },
        {
          id: "Act-2107",
          person: "Bikash Kumar",
          personMeta: "Provider ID: FNP-SP-0917",
          type: "Invalid Documention",
          typeSub: "Varification Failed",
          risk: "Medium",
          date: "10 Aug, 2026",
          time: "1:20 PM",
          status: "Under Review",
          action: null,
        },
        {
          id: "Act-2110",
          person: "Prakash Jaiswal",
          personMeta: "Uder ID: FNP-SP-1076",
          type: "Fake Registration",
          typeSub: "Using Fake Identity",
          risk: "High",
          date: "10 Aug, 2026",
          time: "1:32 PM",
          status: "New",
          action: null,
        },
        {
          id: "Act-2109",
          person: "Saurav Sharma",
          personMeta: "Uder ID: FNP-SP-1231",
          type: "Multiple Complain",
          typeSub: "2 Complains In A Day",
          risk: "Low",
          date: "10 Aug, 2026",
          time: "2:13 PM",
          status: "Reviewed",
          action: "Under Watch",
        },
      ],
      showingText: "Showing 1 - 7 Out Of 150 Providers",
      totalPages: 22,
    } as ActivityLogData,
  };
};
