import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWarehouseStatsFn,
  createWarehouseFn,
  deleteWarehouseFn,
  updateWarehouseFn,
  getCurrentDistributorFn,
  fetchShipmentsFn,
  fetchRecentMovementsFn,
  updateShipmentStatusFn,
  fetchLogisticsMetricsFn,
} from "@/api/api-function/logistics.function";

// src/hooks/useLogistics.ts (Add to your existing exports)

export const useFetchRecentMovements = (distributorId?: string) => {
  return useQuery({
    queryKey: ["recent-movements", distributorId],
    queryFn: () => fetchRecentMovementsFn(distributorId!),
    enabled: !!distributorId,
  });
};

export const useCurrentDistributor = () =>
  useQuery({
    queryKey: ["current-distributor"],
    queryFn: getCurrentDistributorFn,
  });

export const useFetchWarehouseStats = (distributorId?: string) =>
  useQuery({
    queryKey: ["warehouse-stats", distributorId],
    queryFn: () => fetchWarehouseStatsFn(distributorId!),
    enabled: !!distributorId,
  });

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWarehouseFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["warehouse-stats"] }),
  });
};

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWarehouseFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["warehouse-stats"] }),
  });
};

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWarehouseFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["warehouse-stats"] }),
  });
};

export const useFetchShipments = (distributorId?: string) => {
  return useQuery({
    queryKey: ["shipments", distributorId],
    queryFn: () => fetchShipmentsFn(distributorId as string),
    enabled: !!distributorId, // Only run if we have a valid ID
  });
};

export const useUpdateShipmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShipmentStatusFn,
    onSuccess: async (data) => {
      // 1. If the API caught a Supabase error but didn't crash, force it to crash!
      if (data && data.success === false) {
        throw new Error(data.message || "Database rejected the update.");
      }
      
      // 2. If successful, refresh all shipment data instantly
      await queryClient.invalidateQueries({ queryKey: ["shipments"] }); 
    }
  });
};

export const useLogisticsMetrics = () => {
  return useQuery({
    queryKey: ["logistics-metrics"],
    queryFn: fetchLogisticsMetricsFn,
  });
};