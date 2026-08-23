"use client";

// src/api/api-function/adminDashboard.function.ts
// ================================================================
// ADMIN DASHBOARD API LAYER
// ----------------------------------------------------------------
// Central place for every admin-dashboard network call.
// Follows the FixNow conventions used across the project:
//   - Bearer token attached (see ./axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND ENDPOINTS NOT LIVE YET !!!
// fetchAdminDashboardFn() currently returns STATIC mock data so the
// page renders without a server. When the backend ships the
// endpoint, uncomment the real api.get call and delete the mock
// return. This mirrors exactly how provider.function.ts works.
//
// BEGINNER MAP: which page uses which function?
//   /admin/dashboard -> fetchAdminDashboardFn
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
export interface DashboardMetric {
  key: string;
  label: string;
  value: string;
  /** "+12%" style change shown next to the arrow */
  trendValue: string;
  /** picks the green up-arrow / red down-arrow */
  trendUp: boolean;
  trendNote: string;
  /** drives the pastel icon box colour on the card */
  tone: "total" | "active" | "pending" | "ratings";
}

export interface AdminDashboardData {
  greeting: {
    name: string;
    subtitle: string;
  };
  metrics: DashboardMetric[];
  registrationChart: {
    labels: string[]; // ["Jan",...]
    values: number[]; // [100,210,...]
  };
  providerStatus: {
    /** donut slices — value = percentage share */
    slices: { label: string; value: number; color: string }[];
    /** right-side legend rows */
    legend: { label: string; count: string; pct: string; color: string }[];
    totalLabel: string; // center of the donut
    centerSub: string; // "Total"
  };
  recentActivities: {
    key: string;
    /** drives the circle icon colour */
    tone: "neutral" | "success" | "warning" | "star";
    text: string;
    timeLabel: string;
  }[];
  topProviders: {
    id: string;
    name: string;
    rating: string;
  }[];
}

/* ---------------- DASHBOARD ---------------- */
/* Mock payload mirrors Dashboard.html value-for-value.
   Every field here feeds exactly one section of the page,
   so swapping to the real API needs NO page changes. */
export const fetchAdminDashboardFn = async (): Promise<
  AdminApiResponse<AdminDashboardData>
> => {
  // REAL CALL (uncomment when backend is live):
  // const { data } = await api.get("/admin/dashboard");
  // return { success: true, message: data.message, data: data.data };

  return {
    success: true,
    message: "Dashboard fetched successfully.",
    data: {
      greeting: {
        name: "Arghya",
        subtitle:
          "Welcome To Your Admin Dashboard.Here's An Overview Of Your Platform",
      },
      metrics: [
        {
          key: "total",
          label: "Total Providers",
          value: "1,248",
          trendValue: "12%",
          trendUp: true,
          trendNote: "From Last Month",
          tone: "total",
        },
        {
          key: "active",
          label: "Active Providers",
          value: "1,136",
          trendValue: "15%",
          trendUp: true,
          trendNote: "From Last Month",
          tone: "active",
        },
        {
          key: "pending",
          label: "Pending Approvals",
          value: "12",
          trendValue: "8%",
          trendUp: false,
          trendNote: "From Last Month",
          tone: "pending",
        },
        {
          key: "ratings",
          label: "Average Ratings",
          value: "4.5",
          trendValue: "0.3%",
          trendUp: true,
          trendNote: "From Last Month",
          tone: "ratings",
        },
      ],
      registrationChart: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        values: [100, 210, 280, 210, 310, 260, 400],
      },
      providerStatus: {
        slices: [
          { label: "Active", value: 75, color: "#16a34a" },
          { label: "Pending", value: 8, color: "#eab308" },
          { label: "Rejected", value: 4, color: "#dc2626" },
          { label: "Inactive", value: 13, color: "#cbd5e1" },
        ],
        legend: [
          { label: "Active", count: "1,136", pct: "(75%)", color: "#16a34a" },
          { label: "Pending", count: "12", pct: "(8%)", color: "#eab308" },
          { label: "Rejected", count: "58", pct: "(4%)", color: "#dc2626" },
          { label: "Inactive", count: "42", pct: "(13%)", color: "#cbd5e1" },
        ],
        totalLabel: "1,248",
        centerSub: "Total",
      },
      recentActivities: [
        {
          key: "ra1",
          tone: "neutral",
          text: "New Provider Application Recieve From Rajesh Dutta",
          timeLabel: "40minutes Ago",
        },
        {
          key: "ra2",
          tone: "success",
          text: "Joining Request From Raj Saha Has Been Approved",
          timeLabel: "40minutes Ago",
        },
        {
          key: "ra3",
          tone: "warning",
          text: "A Highly Suspicious Activity Detected",
          timeLabel: "40minutes Ago",
        },
        {
          key: "ra4",
          tone: "neutral",
          text: "New Provider Application Recieve From Arup Roy",
          timeLabel: "40minutes Ago",
        },
        {
          key: "ra5",
          tone: "star",
          text: "New Review Recieved For Subham Hazra",
          timeLabel: "40minutes Ago",
        },
      ],
      topProviders: [
        { id: "tp1", name: "Rajesh Mondal", rating: "4.8" },
        { id: "tp2", name: "Kunal Ganguly", rating: "4.8" },
        { id: "tp3", name: "Tapan Ghosh", rating: "4.8" },
        { id: "tp4", name: "Arif Hossain", rating: "4.7" },
        { id: "tp5", name: "Sanjoy Mondal", rating: "4.5" },
      ],
    } as AdminDashboardData,
  };
};
