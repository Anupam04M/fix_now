"use client";

// src/hooks/useAdminProviders.ts
// ================================================================
// ADMIN PROVIDER HOOKS  (React Query v5 — single file)
// ----------------------------------------------------------------
// ONE data source for /admin/provider_management. Every hook wraps
// a function from adminProviders.function.ts (axios + real routes).
//
//   useAdminProviders()        -> GET  /admin/providers
//   usePendingApplications()   -> GET  /admin/providers/pending
//                                 (enabled only while the dropdown
//                                  is open — reads the Zustand store)
//   useProviderDetail(id)      -> GET  /admin/providers/{{id}}
//                                 (seeds the credential form in the
//                                  store once the payload lands)
//   useApproveProvider()       -> PATCH {{id}}/approve + refresh
//   useRejectProvider()        -> PATCH {{id}}/reject  + refresh
//
// CONVENTIONS:
//   - Mutations toast their own success/error and reset the store's
//     form, so the page only calls .mutate().
//   - Approve/Reject invalidate BOTH caches (list + pending dropdown)
//     so every view refreshes after a decision.
// ============================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  fetchAdminProviders,
  fetchPendingApplications,
  fetchApplicationDetail,
  approveProviderApi,
  rejectProviderApi,
  ApprovePayload,
} from "@/api/api-function/adminProviders.function";
import { useProviderStore } from "@/store/useProviderStore";

/* ---------------- LIST : GET /admin/providers ---------------- */
export const useAdminProviders = () =>
  useQuery({
    queryKey: ["adminProviders"],
    queryFn: fetchAdminProviders,
    staleTime: 60_000,
  });

/* ------- PENDING DROPDOWN : GET /admin/providers/pending ------- */
export const usePendingApplications = () => {
  const showRequestsDropdown = useProviderStore(
    (state) => state.showRequestsDropdown,
  );

  return useQuery({
    queryKey: ["pendingApplications"],
    queryFn: fetchPendingApplications,
    /* Only hit the endpoint while the dropdown is visible */
    enabled: showRequestsDropdown,
    staleTime: 60_000,
  });
};

/* ------- DETAIL : GET /admin/providers/{{provider_profile_id}} ------- */
export const useProviderDetail = (providerId: string | null) => {
  const setFormDefaults = useProviderStore(
    (state) => state.setFormDefaults,
  );

  return useQuery({
    queryKey: ["providerDetail", providerId],
    queryFn: async () => {
      const detail = await fetchApplicationDetail(providerId as string);
      /* Seed User Name + Email of the approval-credential form */
      setFormDefaults(detail.name || "", detail.email || "");
      return detail;
    },
    enabled: !!providerId,
    staleTime: 60_000,
  });
};

/* ------- APPROVE : PATCH /admin/providers/{{id}}/approve ------- */
export const useApproveProvider = () => {
  const queryClient = useQueryClient();
  const resetForm = useProviderStore((state) => state.resetForm);

  return useMutation({
    mutationFn: ({
      providerId,
      payload,
    }: {
      providerId: string;
      payload: ApprovePayload;
    }) => approveProviderApi({ providerId, payload }),

    onSuccess: () => {
      toast.success("Provider application approved successfully!");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["adminProviders"] });
      queryClient.invalidateQueries({ queryKey: ["pendingApplications"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve provider");
    },
  });
};

/* ------- REJECT : PATCH /admin/providers/{{id}}/reject ------- */
export const useRejectProvider = () => {
  const queryClient = useQueryClient();
  const resetForm = useProviderStore((state) => state.resetForm);

  return useMutation({
    mutationFn: (providerId: string) => rejectProviderApi(providerId),

    onSuccess: () => {
      toast.success("Provider application rejected.");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["adminProviders"] });
      queryClient.invalidateQueries({ queryKey: ["pendingApplications"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject provider");
    },
  });
};
