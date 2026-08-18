import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchProfileFns,
  upsertProfileFns,
} from "@/api/api-function/profile.function";
import { ProfileFormPayload } from "@/services/validation/profile.validation";

export const useFetchProfile = () => {
  return useQuery({
    queryKey: ["farmer-profile"],
    queryFn: () => fetchProfileFns(),
  });
};

export const useUpsertProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileFormPayload) => upsertProfileFns(payload as any),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["farmer-profile"] });
      } else {
        toast.error(res.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save profile");
    },
  });
};
