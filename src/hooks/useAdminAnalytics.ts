import { useQuery } from "@tanstack/react-query";
import { fetchAdminAnalyticsFn } from "@/api/api-function/adminAnalytics.function";

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: fetchAdminAnalyticsFn,
  });
};