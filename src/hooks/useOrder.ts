import { useQuery } from "@tanstack/react-query";
import { fetchBuyerOrdersFn } from "@/api/api-function/order.function";

// This hook fetches all orders for a specific buyer
export const useFetchBuyerOrders = (userId?: string) => {
  return useQuery({
    queryKey: ["buyer-orders", userId],
    // If userId is undefined, this function won't run because of 'enabled'
    queryFn: () => fetchBuyerOrdersFn(userId as string), 
    enabled: !!userId,
  });
};