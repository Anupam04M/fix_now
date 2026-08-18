import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentDistributorFn, upsertDistributorProfileFn } from "@/api/api-function/distributor.function";

export const useCurrentDistributor = () => {
  return useQuery({
    queryKey: ["current-distributor"],
    queryFn: getCurrentDistributorFn,
  });
};

export const useUpsertDistributor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: upsertDistributorProfileFn,
    onSuccess: () => {
      // Refresh the data so the app knows they finished onboarding
      queryClient.invalidateQueries({ queryKey: ["current-distributor"] });
    },
  });
};