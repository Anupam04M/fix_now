import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAdminOrdersFn, updateOrderStatusFn, deleteOrderFn } from "@/api/api-function/adminorder.function";

export const useAdminOrders = (statusFilter: string) => {
  return useQuery({
    queryKey: ["admin-orders", statusFilter],
    queryFn: () => fetchAdminOrdersFn(statusFilter),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) => 
      updateOrderStatusFn(orderId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });
};