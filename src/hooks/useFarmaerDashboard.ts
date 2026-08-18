import { useQuery } from "@tanstack/react-query";
import { fetchFarmerDashboardFn } from "@/api/api-function/farmerDashboard.function";

export const useFarmerDashboard = (farmerId: string) => {
  return useQuery({
    queryKey: ["farmer-dashboard", farmerId],
    queryFn: () => fetchFarmerDashboardFn(farmerId),
    enabled: !!farmerId, // Only fetch if we have a farmer ID
  });
};