import { create } from "zustand";

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  altPhone: string;
  email: string;
  dob: string;
  preferredLanguage: string;
  gender: string;
  avatar: string | null;          // URL fetched from the backend
  avatarPreview: string | null;   // Local preview URL for the UI
  avatarFile: File | null;        // The actual File object to upload
}

interface AddressData {
  addressId: number | null;
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  landmark: string;
  contactPerson: string;
  contactPhone: string;
}

interface PreferencesData {
  smsNotif: boolean;
  whatsappNotif: boolean;
  emailNotif: boolean;
}

interface ProfileStore {
  // State
  profile: ProfileData;
  address: AddressData;
  preferences: PreferencesData;

  // Actions
  updateProfile: (data: Partial<ProfileData>) => void;
  updateAddress: (data: Partial<AddressData>) => void;
  updatePreferences: (data: Partial<PreferencesData>) => void;
  setFullProfileData: (
    profileData: Partial<ProfileData>,
    addressData: Partial<AddressData>,
    preferencesData?: Partial<PreferencesData>
  ) => void;
  resetProfileStore: () => void;
}

const initialProfile: ProfileData = {
  firstName: "",
  lastName: "",
  phone: "",
  altPhone: "",
  email: "",
  dob: "",
  preferredLanguage: "",
  gender: "",
  avatar: null,
  avatarPreview: null,
  avatarFile: null,
};

const initialAddress: AddressData = {
  addressId: null,
  label: "Home",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  landmark: "",
  contactPerson: "",
  contactPhone: "",
};

const initialPreferences: PreferencesData = {
  smsNotif: false,
  whatsappNotif: false,
  emailNotif: false,
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: initialProfile,
  address: initialAddress,
  preferences: initialPreferences,

  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),
    
  updateAddress: (data) =>
    set((state) => ({ address: { ...state.address, ...data } })),
    
  updatePreferences: (data) =>
    set((state) => ({ preferences: { ...state.preferences, ...data } })),

  setFullProfileData: (profileData, addressData, preferencesData) =>
    set((state) => ({
      profile: { ...state.profile, ...profileData },
      address: { ...state.address, ...addressData },
      preferences: { ...state.preferences, ...(preferencesData || {}) },
    })),

  resetProfileStore: () =>
    set({
      profile: initialProfile,
      address: initialAddress,
      preferences: initialPreferences,
    }),
}));