"use client";

// src/hooks/useAdminRatings.ts
// ================================================================
// ADMIN RATINGS HOOK  (React Query v5)
// ----------------------------------------------------------------
// ONE-LINE DATA SOURCE for /admin/ratings_reviews.
//
// HOW THE STATIC -> DYNAMIC SWITCH WORKS:
//   The page already calls this hook. Today the hook resolves from
//   fetchAdminRatingsFn()'s MOCK payload. When the backend ships
//   GET {{base_url}}/admin/ratings you only:
//     1. open src/api/api-function/adminRatings.function.ts
//     2. uncomment the real api.get(...) line
//     3. delete the mock return
//   ...and every widget on the page updates automatically.
//
// USAGE INSIDE A PAGE:
//     const { data, isLoading } = useAdminRatings();
//     if (isLoading) return <Loader />;
//     const d = data?.data;          // AdminRatingsData
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminRatingsFn,
  AdminRatingsData,
} from "@/api/api-function/adminRatings.function";

export const useAdminRatings = () =>
  useQuery({
    queryKey: ["admin-ratings"],
    queryFn: fetchAdminRatingsFn,
    // Keep mock data on screen for 1 minute before re-checking.
    // Tune/remove once the real API exists.
    staleTime: 60_000,
  });

export type RatingsPayload = AdminRatingsData;
