"use client";

// src/hooks/useAdminSettings.ts
// ================================================================
// ADMIN SETTINGS HOOK  (React Query v5)
// ----------------------------------------------------------------
// ONE-LINE DATA SOURCE for /admin/settings.
//
// HOW THE STATIC -> DYNAMIC SWITCH WORKS:
//   The page already calls this hook. Today the hook resolves from
//   fetchAdminSettingsFn()'s MOCK payload. When the backend ships
//   GET {{base_url}}/admin/settings you only:
//     1. open src/api/api-function/adminSettings.function.ts
//     2. uncomment the real api.get(...) line
//     3. delete the mock return
//   ...and every widget on the page updates automatically.
//
// USAGE INSIDE A PAGE:
//     const { data, isLoading } = useAdminSettings();
//     if (isLoading) return <Loader />;
//     const d = data?.data;          // AdminSettingsData
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminSettingsFn,
  AdminSettingsData,
} from "@/api/api-function/adminSettings.function";

export const useAdminSettings = () =>
  useQuery({
    queryKey: ["admin-settings"],
    queryFn: fetchAdminSettingsFn,
    // Keep mock data on screen for 1 minute before re-checking.
    // Tune/remove once the real API exists.
    staleTime: 60_000,
  });

export type SettingsPayload = AdminSettingsData;
