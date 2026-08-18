// src/store/useAuthStore.ts
import { create } from "zustand";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import {
  loginFns,
  signupFns,
  logoutFns,
} from "@/api/api-function/auth.function";
import {
  AuthState,
  LoginPayload,
  SignupPayload,
} from "@/types/interface/auth.interface";

export const useAuthStore = create<AuthState>((set) => ({
  // ==========================================
  // 1. UI STATE (Controls the Shadcn Dialog)
  // ==========================================
  drawer: false,
  openDrawer: () => set({ drawer: true }),
  closeDrawer: () => set({ drawer: false }),

  // ==========================================
  // 2. AUTHENTICATION & USER STATE
  // ==========================================
  isLoading: false,
  isError: null,
  isAuthenticate: !!getCookie("token"),
  role: (getCookie("role") as string) || null,

  // Safely parse the user cookie if it exists
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,

  // ==========================================
  // 3. ASYNC ACTIONS
  // ==========================================
  signupUser: async (
    payload: SignupPayload,
    endpointRole: "customer" | "provider",
  ) => {
    set({ isLoading: true, isError: null });
    try {
      const res = await signupFns(payload, endpointRole);

      if (res.success && res.data?.token) {
        // Auto-login the user using the token returned from registration
        const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
        setCookie("token", res.data.token, { maxAge: SEVEN_DAYS_IN_SECONDS });
        setCookie("role", res.data.user.role, {
          maxAge: SEVEN_DAYS_IN_SECONDS,
        });
        setCookie("user", JSON.stringify(res.data.user), {
          maxAge: SEVEN_DAYS_IN_SECONDS,
        });

        set({
          isAuthenticate: true,
          role: res.data.user.role,
          user: res.data.user,
          isError: null,
        });
      } else {
        set({ isError: res.message });
      }

      return res;
    } catch (error: any) {
      set({ isError: error.message });
      return { success: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (payload: LoginPayload) => {
    set({ isLoading: true, isError: null });
    try {
      const res = await loginFns(payload);

      // If login is successful, update state and automatically close the dialog
      if (res.success) {
        set({
          isAuthenticate: true,
          role: res.data.role,
          user: res.data,
          isError: null,
          drawer: false, // Automatically closes the Shadcn modal
        });
      } else {
        set({ isError: res.message });
      }

      return res;
    } catch (error: any) {
      set({ isError: error.message });
      return { success: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    // 1. Call the backend API to securely invalidate the token
    await logoutFns();

    // 2. Clear all local cookies
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("user");

    // 3. Reset the Zustand store state
    set({
      isAuthenticate: false,
      role: null,
      user: null,
      isError: null,
    });

    return true;
  },
}));
