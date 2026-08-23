"use client";

// src/hooks/useAdminDashboard.ts
// ================================================================
// ADMIN DASHBOARD HOOK  (React Query v5)
// ----------------------------------------------------------------
// ONE-LINE DATA SOURCE for /admin/dashboard.
//
// HOW THE STATIC -> DYNAMIC SWITCH WORKS:
//   The page already calls this hook. Today the hook resolves from
//   fetchAdminDashboardFn()'s MOCK payload. When the backend ships
//   GET {{base_url}}/admin/dashboard you only:
//     1. open src/api/api-function/adminDashboard.function.ts
//     2. uncomment the real api.get(...) line
//     3. delete the mock return
//   ...and every widget on the dashboard updates automatically.
//
// USAGE INSIDE A PAGE:
//     const { data, isLoading } = useAdminDashboard();
//     if (isLoading) return <Loader />;
//     const d = data?.data;          // AdminDashboardData
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminDashboardFn,
  AdminDashboardData,
} from "@/api/api-function/adminDashboard.function";

export const useAdminDashboard = () =>
  useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchAdminDashboardFn,
    // Keep mock data on screen for 1 minute before re-checking.
    // Tune/remove once the real API exists.
    staleTime: 60_000,
  });

export type DashboardPayload = AdminDashboardData;
