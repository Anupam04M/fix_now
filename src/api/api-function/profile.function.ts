import api from "./axios.instance";
import {
  ApiResponse,
  CustomerAddress,
  AddCustomerAddressPayload,
  UserProfile,
  Pagination,
} from "@/types/interface/profile.interface";

// GET /customer/profile -> fetch the authenticated user's profile
export const fetchProfileFn = async (): Promise<ApiResponse<UserProfile>> => {
  // Replaced /auth/me with the correct endpoint from your Postman screenshot
  const { data } = await api.get("/customer/profile");
  return data;
};

// POST /customer/profile -> update the authenticated user's profile
export const updateProfileFn = async (
  payload: Record<string, any>,
): Promise<ApiResponse<UserProfile>> => {
  // Create a FormData object to handle both text fields and file uploads (avatar)
  const formData = new FormData();

  // MUST append _method: PATCH to trick the backend into accepting form-data as a PATCH request
  formData.append("_method", "PATCH");

  // Loop through whatever payload you pass (name, email, phone, avatar) and append it
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });

  // Send as a POST request with multipart/form-data headers
  const { data } = await api.post("/customer/profile", formData);

  return data;
};

// GET /customer/addresses -> fetch all addresses of the customer
export const fetchAddressesFn = async (): Promise<
  ApiResponse<{ addresses: CustomerAddress[]; pagination: Pagination }>
> => {
  const { data } = await api.get("/customer/addresses");
  return data;
};

// POST /customer/addresses -> add a new address
export const addAddressFn = async (
  payload: AddCustomerAddressPayload,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.post("/customer/addresses", payload);
  return data;
};

// GET /customer/addresses/{id} -> fetch a single address
export const fetchAddressByIdFn = async (
  addressId: string,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.get(`/customer/addresses/${addressId}`);
  return data;
};

// PATCH /customer/addresses/{id} -> update an existing address
export const updateAddressFn = async ({
  addressId,
  payload,
}: {
  addressId: string;
  payload: Partial<AddCustomerAddressPayload>;
}): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.patch(`/customer/addresses/${addressId}`, payload);
  return data;
};

// PATCH /customer/addresses/{id}/default -> mark an address as default
export const setDefaultAddressFn = async (
  addressId: string,
): Promise<ApiResponse<CustomerAddress>> => {
  const { data } = await api.patch(`/customer/addresses/${addressId}/default`);
  return data;
};
