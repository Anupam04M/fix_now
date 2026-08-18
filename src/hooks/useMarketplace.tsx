import { useQuery } from "@tanstack/react-query";
import { fetchMarketplaceProductsFns,fetchMarketTrendsFn,fetchProductByIdFns } from "@/api/api-function/marketplace.function";

export const useFetchMarketplace = () => {
  return useQuery({
    queryKey: ["marketplace-products"],
    queryFn: () => fetchMarketplaceProductsFns(),
  });
};
// Add this to src/hooks/useMarketplace.ts

export const useFetchProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductByIdFns(id),
    enabled: !!id, // Prevent the query from running if the ID is missing
  });
};



export const useMarketTrends = () => {
  return useQuery({
    queryKey: ["market-trends"],
    queryFn: fetchMarketTrendsFn,
  });
};