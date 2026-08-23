import api from "./axios.instance"; // Adjust path if necessary

export interface AddAddressPayload {
  label: string;
  contact_person: string;
  contact_phone: string;
  address_line_1: string;
  address_line_2?: string;
  landmark?: string;
  city: string;
  state: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
}

// Fetch current user profile
// Notice we no longer need to pass the token or Base URL manually!
export const getMyProfile = async () => {
  // FIX: Replaced /auth/me with /customer/profile
  const response = await api.get('/customer/profile');
  return response.data;
};

// Add Customer Address
export const addCustomerAddress = async (payload: AddAddressPayload) => {
  const response = await api.post('/customer/addresses', payload);
  return response.data;
};