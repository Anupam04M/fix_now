import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchProfileFn,
  fetchAddressesFn,
  addAddressFn,
  updateAddressFn,
  updateProfileFn,
} from "@/api/api-function/profile.function";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileStore } from "@/store/useProfileStore";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { isAuthenticate } = useAuthStore();
  const { updateProfile, updateAddress } = useProfileStore();

  // ========================================================================
  // QUERIES (Fetching Data)
  // ========================================================================
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfileFn,
    enabled: isAuthenticate, // Only fetch if the user is logged in
  });

  const addressQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddressesFn,
    enabled: isAuthenticate,
  });

  // ========================================================================
  // MUTATIONS (Updating Data)
  // ========================================================================
  const updateProfileMutation = useMutation({
    mutationFn: updateProfileFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Basic information updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: async ({
      addressId,
      payload,
    }: {
      addressId?: number | null;
      payload: any;
    }) => {
      if (addressId) {
        return updateAddressFn({ addressId: String(addressId), payload });
      }
      return addAddressFn(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update address.");
    },
  });

  // ========================================================================
  // HELPER FUNCTIONS (To populate Zustand from API responses)
  // ========================================================================
  const populateBasicInfo = () => {
    if (profileQuery.data?.data) {
      const user = profileQuery.data.data;
      const nameParts = (user.name || "").trim().split(/\s+/);

      updateProfile({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: user.phone || "",
        email: user.email || "",
        avatar: (user as any).avatar || null, // <-- POPULATE AVATAR FROM API
      });
    }
  };

  const populateAddressInfo = () => {
    if (addressQuery.data?.data?.addresses?.length) {
      const list = addressQuery.data.data.addresses;
      const defaultAddr = list.find((a: any) => a.is_default) || list[0];

      if (defaultAddr) {
        updateAddress({
          addressId: defaultAddr.id,
          label: defaultAddr.label || "Home",
          contactPerson: defaultAddr.contact_person || "",
          contactPhone: defaultAddr.contact_phone || "",
          line1: defaultAddr.address?.line_1 || "",
          line2: defaultAddr.address?.line_2 || "",
          city: defaultAddr.address?.city || "",
          state: defaultAddr.address?.state || "",
          postalCode: defaultAddr.address?.postal_code || "",
          landmark: defaultAddr.address?.landmark || "",
        });
      }
    }
  };

  return {
    // Expose Queries
    profileQuery,
    addressQuery,
    isLoading: profileQuery.isLoading || addressQuery.isLoading,

    // Expose Mutations
    updateProfileMutation,
    updateAddressMutation,

    // Expose Helpers
    populateBasicInfo,
    populateAddressInfo,
  };
};
