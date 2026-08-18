import { useQuery } from "@tanstack/react-query";
import { getBuyerAnalyticsFn } from "@/api/api-function/analytics.function";
import { useAuthStore } from "@/store/useAuthStore"; // Assuming you store the logged-in user here

export const useBuyerAnalytics = () => {
  // Get the current logged-in buyer's ID from your auth store
  const { user } = useAuthStore(); 
  const buyerId = user?.id;

  return useQuery({
    queryKey: ["buyer-analytics", buyerId],
    queryFn: async () => {
      if (!buyerId) return null;
      const res = await getBuyerAnalyticsFn(buyerId);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    enabled: !!buyerId, // Won't fetch until the user ID is ready
  });
};