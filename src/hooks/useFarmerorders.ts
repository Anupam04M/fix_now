import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFarmerOrdersFn, acceptOrderFn, getCurrentFarmerFn } from "@/api/api-function/farmerorders.function";

// Hook to fetch the orders
export const useFetchFarmerOrders = (farmerId: string) => {
  return useQuery({
    queryKey: ["farmer-orders", farmerId],
    queryFn: () => fetchFarmerOrdersFn(farmerId),
    enabled: !!farmerId, // Only run if we have a farmer ID
  });
};

// Hook to accept an order
export const useAcceptOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptOrderFn,
    onSuccess: () => {
      // Refresh the orders list automatically after accepting!
      queryClient.invalidateQueries({ queryKey: ["farmer-orders"] });
    },
  });
};

export const useCurrentFarmer = () => {
  return useQuery({
    queryKey: ["current-farmer"],
    queryFn: getCurrentFarmerFn,
  });
};