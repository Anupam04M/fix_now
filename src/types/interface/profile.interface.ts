// src/types/interface/profile.interface.ts
// ================================================================
// PROFILE + CUSTOMER ADDRESS TYPES
// ----------------------------------------------------------------
// Shapes used by the profile API layer and the profile-details page.
// Matches the FixNow backend response envelope: { success, message, data }.
// ================================================================

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  avatar: string | null;
}

export interface CustomerAddressData {
  line_1: string;
  line_2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  postal_code: string;
  latitude: string | null;
  longitude: string | null;
}

export interface CustomerAddress {
  id: number;
  label: string;
  contact_person: string;
  contact_phone: string;
  address: CustomerAddressData;
  is_default: boolean;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface AddCustomerAddressPayload {
  label: string;
  contact_person: string;
  contact_phone: string;
  address_line_1: string;
  address_line_2?: string;
  landmark?: string;
  city: string;
  state: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
  is_default?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}