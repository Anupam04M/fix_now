"use client";

// src/hooks/useAdminStaticPages.ts
// ================================================================
// ADMIN STATIC PAGES HOOK  (React Query v5)
// ----------------------------------------------------------------
// ONE-LINE DATA SOURCE for /admin/static_pages.
//
// HOW THE STATIC -> DYNAMIC SWITCH WORKS:
//   The page already calls this hook. Today the hook resolves from
//   fetchAdminStaticPagesFn()'s MOCK payload. When the backend ships
//   GET {{base_url}}/admin/static-pages you only:
//     1. open src/api/api-function/adminStaticPages.function.ts
//     2. uncomment the real api.get(...) line
//     3. delete the mock return
//   ...and every widget on the page updates automatically.
//
// USAGE INSIDE A PAGE:
//     const { data, isLoading } = useAdminStaticPages();
//     if (isLoading) return <Loader />;
//     const d = data?.data;          // AdminStaticPagesData
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminStaticPagesFn,
  AdminStaticPagesData,
} from "@/api/api-function/adminStaticPages.function";

export const useAdminStaticPages = () =>
  useQuery({
    queryKey: ["admin-static-pages"],
    queryFn: fetchAdminStaticPagesFn,
    // Keep mock data on screen for 1 minute before re-checking.
    // Tune/remove once the real API exists.
    staleTime: 60_000,
  });

export type StaticPagesPayload = AdminStaticPagesData;
