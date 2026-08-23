"use client";

// src/hooks/useProviderDashboard.ts
// ================================================================
// PROVIDER DASHBOARD HOOK  (React Query v5)
// ----------------------------------------------------------------
// ONE-LINE DATA SOURCE for /service-provider (dashboard page).
//
// HOW THE STATIC -> DYNAMIC SWITCH WORKS:
//   The page already calls this hook. Today the hook resolves from
//   fetchProviderDashboardFn()'s MOCK payload. When the Laravel team
//   ships GET {{base_url}}/provider/dashboard you only:
//     1. open src/api/api-function/provider.function.ts
//     2. uncomment the real api.get(...) line
//     3. delete the mock return
//   ...and every widget on the dashboard updates automatically.
//
// USAGE INSIDE A PAGE:
//     const { data, isLoading } = useProviderDashboard();
//     if (isLoading) return <Loader />;
//     const d = data?.data;          // ProviderDashboardData
//
// REFETCHING: React Query refetches on window focus by default.
// For manual refresh pass { refetchInterval: 60_000 } or call
// const { refetch } = useProviderDashboard(); refetch();
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchProviderDashboardFn,
  ProviderDashboardData,
} from "@/api/api-function/provider.function";

export const useProviderDashboard = () =>
  useQuery({
    queryKey: ["provider-dashboard"],
    queryFn: fetchProviderDashboardFn,
    // Keep mock data on screen for 1 minute before re-checking.
    // Tune/remove once the real API exists.
    staleTime: 60_000,
  });

export type DashboardPayload = ProviderDashboardData;
