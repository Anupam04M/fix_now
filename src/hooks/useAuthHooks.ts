import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerProviderFn } from "@/api/api-function/auth.function";
import { useRouter } from "next/navigation";
import { useProviderRegistrationStore } from "@/store/useProviderRegistrationStore";

export const useRegisterProvider = () => {
  const router = useRouter();
  const { clearDraft } = useProviderRegistrationStore();

  return useMutation({
    mutationFn: registerProviderFn,
    onSuccess: () => {
      toast.success(
        "Registration submitted! Our team will verify your details.",
      );
      clearDraft(); // Wipe the local storage draft
      setTimeout(() => router.push("/work-with-us"), 1500);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit registration.",
      );
    },
  });
};
