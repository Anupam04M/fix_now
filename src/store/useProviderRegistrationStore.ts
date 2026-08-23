import { create } from "zustand";
import { toast } from "sonner";

interface ProviderRegistrationState {
  // File objects
  govtIdFile: File | null;
  certFile: File | null;
  passportFile: File | null;

  // Actions
  setGovtIdFile: (file: File | null) => void;
  setCertFile: (file: File | null) => void;
  setPassportFile: (file: File | null) => void;

  // Draft Management
  saveDraft: (data: any) => void;
  loadDraft: () => any | null;
  clearDraft: () => void;
}

export const useProviderRegistrationStore = create<ProviderRegistrationState>(
  (set) => ({
    govtIdFile: null,
    certFile: null,
    passportFile: null,

    setGovtIdFile: (file) => set({ govtIdFile: file }),
    setCertFile: (file) => set({ certFile: file }),
    setPassportFile: (file) => set({ passportFile: file }),

    saveDraft: (data) => {
      localStorage.setItem("fixnow-provider-draft", JSON.stringify(data));
      toast.success("Draft saved successfully!");
    },
    loadDraft: () => {
      const draft = localStorage.getItem("fixnow-provider-draft");
      return draft ? JSON.parse(draft) : null;
    },
    clearDraft: () => {
      localStorage.removeItem("fixnow-provider-draft");
      set({ govtIdFile: null, certFile: null, passportFile: null });
    },
  }),
);
