import { useQuery } from "@tanstack/react-query";
import { fetchAdminDashboardDataFn } from "@/api/api-function/adminDashboard.function";

export const useAdminDashboardData = () => {
  return useQuery({
    queryKey: ["admin-dashboard-overview"],
    queryFn: fetchAdminDashboardDataFn,
  });
};