// src/api/api-function/profile.function.ts
// ================================================================
// PROFILE + CUSTOMER ADDRESS API LAYER
// ----------------------------------------------------------------
// Follows the FixNow backend conventions:
//   - REST + Bearer token (attached automatically by axios.instance)
//   - Response envelope: { success, message, data }
// Endpoints (from backend docs):
//   GET    /auth/me
//   GET    /customer/addresses
//   POST   /customer/addresses
//   GET    /customer/addresses/{id}
//   PATCH  /customer/addresses/{id}            (landmark only)
//   PATCH  /customer/addresses/{id}/default
//   DELETE /customer/addresses/{id}
// ================================================================

import api from "./axios.instance";
import {
  ApiResponse,
  CustomerAddress,
  AddCustomerAddressPayload,
  UserProfile,
  Pagination,
} from "@/types/interface/profile.interface";

// GET /auth/me -> fetch the authenticated user's profile
export const fetchProfileFn = async (): Promise<
  ApiResponse<UserProfile>
> => {
  const { data } = await api.get("/auth/me");
  return { success: true, message: data.message, data: data.data };
};

// GET /customer/addresses -> fetch all addresses of the customer
export const fetchAddressesFn = async (): Promise<
  ApiResponse<{ addresses: CustomerAddress[]; pagination: Pagination }>
> => {
  const { data } = await api.get("/customer/addresses");
  return { success: true, message: data.message, data: data.data };
};

// POST /customer/addresses -> add a new address
export const addAddressFn = async (
  payload: AddCustomerAddressPayload,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.post("/customer/addresses", payload);
  return { success: true, message: data.message, data: data.data };
};

// GET /customer/addresses/{id} -> fetch a single address
export const fetchAddressByIdFn = async (
  addressId: string,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.get(`/customer/addresses/${addressId}`);
  return { success: true, message: data.message, data: data.data };
};

// PATCH /customer/addresses/{id} -> update the landmark of an address
export const updateAddressLandmarkFn = async (
  addressId: string,
  landmark: string,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.patch(`/customer/addresses/${addressId}`, {
    landmark,
  });
  return { success: true, message: data.message, data: data.data };
};

// PATCH /customer/addresses/{id}/default -> mark an address as default
export const setDefaultAddressFn = async (
  addressId: string,
  isDefault: boolean = true,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.patch(
    `/customer/addresses/${addressId}/default`,
    { is_default: isDefault },
  );
  return { success: true, message: data.message, data: data.data };
};

// DELETE /customer/addresses/{id} -> delete an address
export const deleteAddressFn = async (
  addressId: string,
): Promise<ApiResponse> => {
  const { data } = await api.delete(`/customer/addresses/${addressId}`);
  return { success: true, message: data.message, data: data.data };
};