// src/api/api-function/category.function.ts

import api from "./axios.instance";

// ========================================================================
// CATEGORIES
// ========================================================================
export const getCategoriesFn = async () => 
  (await api.get("/admin/categories")).data;

export const getCategoryByIdFn = async (id: number | string) => 
  (await api.get(`/admin/categories/${id}`)).data;

// Now accepts FormData directly from the component!
export const createCategoryFn = async (payload: FormData) => 
  (await api.post("/admin/categories", payload)).data;

export const updateCategoryFn = async ({ id, payload }: { id: string | number; payload: FormData }) => {
  // Append PATCH method for Laravel/Node file upload updates
  payload.append("_method", "PATCH");
  return (await api.post(`/admin/categories/${id}`, payload)).data;
};

export const deleteCategoryFn = async (id: number | string) => 
  (await api.delete(`/admin/categories/${id}`)).data;


// ========================================================================
// SUBCATEGORIES
// ========================================================================
export const getSubcategoriesFn = async () => 
  (await api.get("/admin/subcategories")).data;

export const createSubcategoryFn = async (payload: FormData) => 
  (await api.post("/admin/subcategories", payload)).data;

// (Optional) Added for future Edit/Delete features
export const updateSubcategoryFn = async ({ id, payload }: { id: string | number; payload: FormData }) => {
  payload.append("_method", "PATCH");
  return (await api.post(`/admin/subcategories/${id}`, payload)).data;
};

export const deleteSubcategoryFn = async (id: number | string) => 
  (await api.delete(`/admin/subcategories/${id}`)).data;


// ========================================================================
// SERVICES
// ========================================================================
export const getServicesFn = async () => 
  (await api.get("/admin/services")).data;

export const getServiceByIdFn = async (id: number | string) => 
  (await api.get(`/admin/services/${id}`)).data;

export const createServiceFn = async (payload: FormData) => 
  (await api.post("/admin/services", payload)).data;

export const updateServiceFn = async ({ id, payload }: { id: string | number; payload: FormData }) => {
  payload.append("_method", "PATCH");
  return (await api.post(`/admin/services/${id}`, payload)).data;
};

export const deleteServiceFn = async (id: number | string) => 
  (await api.delete(`/admin/services/${id}`)).data;