"use client";

// src/store/useProviderStore.ts
// ================================================================
// PROVIDER MANAGEMENT STORE  (Zustand)
// ----------------------------------------------------------------
// Holds EVERY piece of UI state for /admin/provider_management so
// the page itself stays stateless (no useState anywhere):
//
//   LIST VIEW   : searchQuery, currentPage, showRequestsDropdown,
//                 selectedProviderId (null = list view)
//   DETAIL VIEW : credential form fields (userName/email/password/
//                 confirmPassword/sendCredentials)
//
// FLOW:
//   "Application Requests" click -> toggleRequestsDropdown()
//   pick an application          -> setSelectedProviderId(id)
//                                    (hooks fetch the detail and
//                                     seed the form via
//                                     setFormDefaults)
//   Back / Approve / Reject      -> resetForm()  (clears selection
//                                   + credential form)
// ================================================================

import { create } from "zustand";

interface ProviderState {
  /* ---- list-view state ---- */
  searchQuery: string;
  currentPage: string;
  showRequestsDropdown: boolean;
  selectedProviderId: string | null;

  /* ---- approval-credential form state ---- */
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  sendCredentials: boolean;

  /* ---- actions ---- */
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: string) => void;
  setShowRequestsDropdown: (show: boolean) => void;
  toggleRequestsDropdown: () => void;
  setSelectedProviderId: (id: string | null) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setSendCredentials: (send: boolean) => void;
  /** seed User Name / Email from the fetched application detail */
  setFormDefaults: (userName: string, email: string) => void;
  /** clear the selection + reset the credential form */
  resetForm: () => void;
}

export const useProviderStore = create<ProviderState>((set) => ({
  /* ---- initial state ---- */
  searchQuery: "",
  currentPage: "1",
  showRequestsDropdown: false,
  selectedProviderId: null,

  userName: "",
  email: "",
  password: "Rmg@123",
  confirmPassword: "Rmg@123",
  sendCredentials: true,

  /* ---- actions ---- */
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setShowRequestsDropdown: (showRequestsDropdown) =>
    set({ showRequestsDropdown }),
  toggleRequestsDropdown: () =>
    set((state) => ({ showRequestsDropdown: !state.showRequestsDropdown })),
  setSelectedProviderId: (selectedProviderId) => set({ selectedProviderId }),
  setUserName: (userName) => set({ userName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setSendCredentials: (sendCredentials) => set({ sendCredentials }),
  setFormDefaults: (userName, email) => set({ userName, email }),
  resetForm: () =>
    set({
      selectedProviderId: null,
      userName: "",
      email: "",
      password: "Rmg@123",
      confirmPassword: "Rmg@123",
      sendCredentials: true,
    }),
}));
