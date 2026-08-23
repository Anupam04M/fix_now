import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCategoriesFn,
  createCategoryFn,
  updateCategoryFn,
  deleteCategoryFn,
  getSubcategoriesFn,
  createSubcategoryFn,
  updateSubcategoryFn,
  deleteSubcategoryFn,
  getServicesFn,
  createServiceFn,
  updateServiceFn,
  deleteServiceFn,
} from "@/api/api-function/category.function";

// ========================================================================
// CATEGORY HOOKS
// ========================================================================
export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["admin_categories"],
    queryFn: getCategoriesFn,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategoryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategoryFn,
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategoryFn,
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
      );
    },
  });

  return {
    categoriesQuery,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};

// ========================================================================
// SUBCATEGORY HOOKS
// ========================================================================
export const useSubcategories = () => {
  const queryClient = useQueryClient();

  const subcategoriesQuery = useQuery({
    queryKey: ["admin_subcategories"],
    queryFn: getSubcategoriesFn,
  });

  const createSubcategoryMutation = useMutation({
    mutationFn: createSubcategoryFn,
    onSuccess: () => {
      toast.success("Subcategory added!");
      queryClient.invalidateQueries({ queryKey: ["admin_subcategories"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to add subcategory",
      );
    },
  });

  const updateSubcategoryMutation = useMutation({
    mutationFn: updateSubcategoryFn,
    onSuccess: () => {
      toast.success("Subcategory updated!");
      queryClient.invalidateQueries({ queryKey: ["admin_subcategories"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update subcategory",
      );
    },
  });

  const deleteSubcategoryMutation = useMutation({
    mutationFn: deleteSubcategoryFn,
    onSuccess: () => {
      toast.success("Subcategory deleted!");
      queryClient.invalidateQueries({ queryKey: ["admin_subcategories"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete subcategory",
      );
    },
  });

  return {
    subcategoriesQuery,
    createSubcategoryMutation,
    updateSubcategoryMutation,
    deleteSubcategoryMutation,
  };
};

// ========================================================================
// SERVICE HOOKS
// ========================================================================
export const useServices = () => {
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ["admin_services"],
    queryFn: getServicesFn,
  });

  const createServiceMutation = useMutation({
    mutationFn: createServiceFn,
    onSuccess: () => {
      toast.success("Service added!");
      queryClient.invalidateQueries({ queryKey: ["admin_services"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add service");
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: updateServiceFn,
    onSuccess: () => {
      toast.success("Service updated!");
      queryClient.invalidateQueries({ queryKey: ["admin_services"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update service");
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: deleteServiceFn,
    onSuccess: () => {
      toast.success("Service deleted!");
      queryClient.invalidateQueries({ queryKey: ["admin_services"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete service");
    },
  });

  return {
    servicesQuery,
    createServiceMutation,
    updateServiceMutation,
    deleteServiceMutation,
  };
};
