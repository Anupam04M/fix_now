"use client";

// src/hooks/useAdminActivityLog.ts
// ================================================================
// ADMIN ACTIVITY LOG HOOK  (React Query v5)
// ----------------------------------------------------------------
// ONE-LINE DATA SOURCE for /admin/activity_log.
//
// HOW THE STATIC -> DYNAMIC SWITCH WORKS:
//   The page already calls this hook. Today the hook resolves from
//   fetchActivityLogFn()'s MOCK payload. When the backend ships
//   GET {{base_url}}/admin/activity-log you only:
//     1. open src/api/api-function/adminActivity.function.ts
//     2. uncomment the real api.get(...) line
//     3. delete the mock return
//   ...and every widget on the page updates automatically.
//
// USAGE INSIDE A PAGE:
//     const { data, isLoading } = useAdminActivityLog();
//     if (isLoading) return <Loader />;
//     const d = data?.data;          // ActivityLogData
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchActivityLogFn,
  ActivityLogData,
} from "@/api/api-function/adminActivity.function";

export const useAdminActivityLog = () =>
  useQuery({
    queryKey: ["admin-activity-log"],
    queryFn: fetchActivityLogFn,
    // Keep mock data on screen for 1 minute before re-checking.
    // Tune/remove once the real API exists.
    staleTime: 60_000,
  });

export type ActivityLogPayload = ActivityLogData;
