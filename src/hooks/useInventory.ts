import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchInventoryFns,
  updateStockLevelFns,
} from "@/api/api-function/inventory.function";

export const useFetchInventory = () => {
  return useQuery({
    queryKey: ["farmer-inventory"],
    queryFn: () => fetchInventoryFns(),
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      newStock,
      threshold,
    }: {
      id: string;
      newStock: number;
      threshold: number;
    }) => updateStockLevelFns(id, newStock, threshold),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success(res.message);
        // Instantly refetch the inventory so the UI updates
        queryClient.invalidateQueries({ queryKey: ["farmer-inventory"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update stock");
    },
  });
};
