import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchAdminUsersFn,
  verifyAccountFn,
  deleteUserFn,
  fetchAdminMetricsFn,
  updateUserFn,
} from "@/api/api-function/admin.function";

export const useAdminUsers = (roleCategory: string) => {
  return useQuery({
    queryKey: ["admin-users", roleCategory],
    queryFn: () => fetchAdminUsersFn(roleCategory),
  });
};

// --- NEW HOOK: Fetch Metrics ---
export const useAdminMetrics = () => {
  return useQuery({
    queryKey: ["admin-metrics"],
    queryFn: fetchAdminMetricsFn,
  });
};

// --- NEW HOOK: Update User ---
export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: any }) =>
      updateUserFn(userId, data),
    onSuccess: () => {
      // Refresh user lists and metrics after an update
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] });
    },
  });
};

export const useVerifyUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      verifyAccountFn(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] });
    },
  });
};
