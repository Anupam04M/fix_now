import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMarketplaceProductsFn, updateProductStatusFn } from "@/api/api-function/adminmarketplace.function";

export const useMarketplaceProducts = (category: string) => {
  return useQuery({
    queryKey: ["marketplace-products", category],
    queryFn: () => fetchMarketplaceProductsFn(category),
  });
};

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, status }: { productId: string; status: string }) => 
      updateProductStatusFn(productId, status),
    onSuccess: () => {
      // Instantly refresh the product grid after an update
      queryClient.invalidateQueries({ queryKey: ["marketplace-products"] });
    },
  });
};