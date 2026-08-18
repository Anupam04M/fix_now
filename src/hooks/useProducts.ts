import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductPayload, ProductParams } from "@/types/interface/products.interface";
import {
  fetchAdminProductFns,
  addProductFns,
  deleteProductFns,
  productStatusChangeFns,
  getProductsFns,
  IdByProductsFns,
} from "@/api/api-function/products.function"; // Adjust import path as needed

// 1. Fetch Products for Dashboard (Admin/Farmer View)
export const useAdminProducts = (params: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => fetchAdminProductFns(params),
  });
};

// 2. Create a New Product
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: ProductPayload) => addProductFns(payload),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        // Invalidate both admin and public lists so the new item shows up everywhere
        queryClient.invalidateQueries({ queryKey: ["admin-products"] });
        queryClient.invalidateQueries({ queryKey: ["public-products"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product");
    },
  });
};

// 3. Delete a Product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteProductFns(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["admin-products"] });
        queryClient.invalidateQueries({ queryKey: ["public-products"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });
};

// 4. Toggle Product Status (Active/Inactive)
export const useChangeProductStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => 
      productStatusChangeFns({ id, is_active }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["admin-products"] });
        queryClient.invalidateQueries({ queryKey: ["public-products"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
};

// 5. Fetch Public Products (For the Marketplace / Buyer View)
export const useProducts = (params?: ProductParams) => {
  return useQuery({
    queryKey: ["public-products", params],
    queryFn: () => getProductsFns(params),
  });
};

// 6. Fetch Single Product by ID (For Details Page)
export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product-id", id],
    queryFn: () => IdByProductsFns(id),
    // Only run this query if an ID is actually passed
    enabled: !!id, 
  });
};