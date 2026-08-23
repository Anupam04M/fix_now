"use client";

// src/app/admin/provider_management/page.tsx
// ================================================================
// ADMIN PROVIDER MANAGEMENT  (route: /admin/provider_management)
// ----------------------------------------------------------------
// STATELESS PAGE — every value comes from Zustand
// (useProviderStore) and every request from React Query
// (useAdminProviders.ts). There is NO useState in this file.
//
// VIEWS:
//   LIST VIEW   (selectedProviderId === null)
//     1. HEADER        : title + breadcrumb, search/bell/profile
//     2. METRICS CARDS : Total | Active | Pending Approvals | Susp.
//     3. CONTROLS BAR  : live search + Application Requests dropdown
//     4. DATA TABLE    : rows + View action + pagination footer
//
//   DETAIL VIEW  (selectedProviderId !== null)
//     A. PROVIDER DETAILS card      (read-only info grid)
//     B. DOCUMENT VERIFICATION table
//     C. LOGIN CREDENTIAL form       (approve payload)
//     D. SIDEBAR summary + documents badges
//     E. BOTTOM ACTIONS              (Back / Reject / Accept)
//
// DATA FLOW:
//   page  -> useAdminProviders / usePendingApplications /
//            useProviderDetail / useApproveProvider / useRejectProvider
//         -> adminProviders.function.ts (axios, real routes)
//   state -> useProviderStore (search, pagination, dropdown,
//            selected id, credential form)
// ============================================================

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  CircleCheck,
  Clock,
  Ban,
  ArrowUp,
  ArrowDown,
  FileText,
} from "lucide-react";

import {
  useAdminProviders,
  usePendingApplications,
  useProviderDetail,
  useApproveProvider,
  useRejectProvider,
} from "@/hooks/useAdminProviders";
import { useProviderStore } from "@/store/useProviderStore";
import {
  AdminProvidersData,
  DocumentStatus,
  PendingApplication,
  ProviderRow,
} from "@/api/api-function/adminProviders.function";
import adminAvatar from "@/assets/images/admin/avatar.jpg";

/* Shared card look */
const CARD = "bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]";

/* Metric card pastel icon tones */
const METRIC_TONES = {
  total: "bg-[#F1F5F9] text-[#64748B]",
  active: "bg-[#DCFCE7] text-[#16A34A]",
  pending: "bg-[#FEF9C3] text-[#CA8A04]",
  suspended: "bg-[#FEE2E2] text-[#DC2626]",
};

const METRIC_ICONS = {
  total: Users,
  active: CircleCheck,
  pending: Clock,
  suspended: Ban,
};

/* Status chip colours */
const STATUS_BADGE: Record<ProviderRow["status"], string> = {
  Online: "border-[#86EFAC] bg-[#F0FDF4] text-[#16A34A]",
  Offline: "border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B]",
  Banned: "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
};

/* Category chip is blue for every row */
const CATEGORY_CHIP = "border-[#93C5FD] bg-[#EFF6FF] text-[#2563EB]";

/* Document verification chips — table view */
const DOC_TABLE_BADGE: Record<DocumentStatus, string> = {
  Verified: "border-[#86EFAC] bg-[#F0FDF4] text-[#16A34A]",
  Pending: "border-[#FEF08A] bg-[#FEF9C3] text-[#CA8A04]",
  "Not Provided": "border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B]",
};

/* Document badges in the sidebar card */
const DOC_SIDE_BADGE: Record<
  DocumentStatus,
  { label: string; cls: string }
> = {
  Verified: {
    label: "Uploaded",
    cls: "border border-[#86EFAC] bg-[#F0FDF4] text-[#16A34A]",
  },
  Pending: {
    label: "Pending",
    cls: "border border-[#FEF08A] bg-[#FEF9C3] text-[#CA8A04]",
  },
  "Not Provided": {
    label: "Not Provided",
    cls: "border border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B]",
  },
};

export default function ProviderManagement() {
  /* ================= STORE (all page state) ================= */
  const searchQuery = useProviderStore((s) => s.searchQuery);
  const currentPage = useProviderStore((s) => s.currentPage);
  const showRequestsDropdown = useProviderStore(
    (s) => s.showRequestsDropdown,
  );
  const selectedProviderId = useProviderStore(
    (s) => s.selectedProviderId,
  );
  const userName = useProviderStore((s) => s.userName);
  const email = useProviderStore((s) => s.email);
  const password = useProviderStore((s) => s.password);
  const confirmPassword = useProviderStore((s) => s.confirmPassword);
  const sendCredentials = useProviderStore((s) => s.sendCredentials);

  const setSearchQuery = useProviderStore((s) => s.setSearchQuery);
  const setCurrentPage = useProviderStore((s) => s.setCurrentPage);
  const setShowRequestsDropdown = useProviderStore(
    (s) => s.setShowRequestsDropdown,
  );
  const toggleRequestsDropdown = useProviderStore(
    (s) => s.toggleRequestsDropdown,
  );
  const setSelectedProviderId = useProviderStore(
    (s) => s.setSelectedProviderId,
  );
  const setUserName = useProviderStore((s) => s.setUserName);
  const setEmail = useProviderStore((s) => s.setEmail);
  const setPassword = useProviderStore((s) => s.setPassword);
  const setConfirmPassword = useProviderStore(
    (s) => s.setConfirmPassword,
  );
  const setSendCredentials = useProviderStore(
    (s) => s.setSendCredentials,
  );
  /* resetForm() itself is invoked inside the mutation hooks
     (useApprove/useReject) after a decision — not needed here. */

  /* ================= TANSTACK QUERY ================= */
  const { data: res, isLoading: isListLoading } = useAdminProviders();
  const { data: pendingApplications = [], isLoading: isPendingLoading } =
    usePendingApplications();
  const { data: applicationDetail, isLoading: isDetailLoading } =
    useProviderDetail(selectedProviderId);

  const approveMutation = useApproveProvider();
  const rejectMutation = useRejectProvider();

  /* ================= HANDLERS (no local state) ================= */
  const handleSelectApplication = (id: string) => {
    setShowRequestsDropdown(false);
    setSelectedProviderId(id);
  };

  const handleApprove = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!selectedProviderId) return;

    approveMutation.mutate({
      providerId: selectedProviderId,
      payload: { userName, email, password, sendCredentials },
    });
  };

  const handleReject = () => {
    if (!selectedProviderId) return;
    rejectMutation.mutate(selectedProviderId);
  };

  const goPrevPage = () =>
    setCurrentPage(String(Math.max(1, Number(currentPage) - 1)));

  const goNextPage = () =>
    setCurrentPage(
      String(Number(currentPage) + 1), // capped by totalPages below
    );

  /* ================= LOADERS ================= */
  if (isListLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
      </div>
    );
  }

  const d = res?.data as AdminProvidersData | undefined;

  /* ================================================================
     RENDER DETAILED APPLICATION APPROVAL VIEW
     ================================================================ */
  if (selectedProviderId) {
    if (isDetailLoading || !applicationDetail) {
      return (
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
        </div>
      );
    }

    return (
      <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[20px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:gap-5 lg:px-8">
        {/* ---------- HEADER ---------- */}
        <header
          className={`${CARD} flex items-center justify-between gap-4 rounded-2xl px-[16px] py-[16px] md:px-6`}
        >
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-[#0F172A]">
              Provider Management
            </h1>
            <p className="mt-[2px] truncate text-[11px] text-[#94A3B8]">
              Dashboard &gt; Provider Management &gt; Application
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              onClick={() => toast.info("Search panel coming soon.")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
            >
              <Search size={15} />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() =>
                toast.info("Notifications panel coming soon.")
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
            >
              <Bell size={15} />
            </button>
            <div className="hidden cursor-pointer items-center gap-2.5 pl-2 sm:flex">
              <Image
                src={adminAvatar}
                alt="Admin"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold leading-tight text-[#1E293B]">
                  Arghya Sen
                  <ChevronDown size={12} className="ml-1 inline" />
                </span>
                <span className="text-[10px] leading-tight text-[#94A3B8]">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ---------- DETAILS GRID ---------- */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_280px]">
          {/* ===== MAIN FORM AREA ===== */}
          <div className="flex flex-col gap-5">
            {/* Provider Details card */}
            <div className={`${CARD} rounded-2xl p-6`}>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Provider Details
              </h2>
              <p className="mb-4 text-[11px] text-[#94A3B8]">
                Review Provider Application Details Before Accepting
              </p>

              <div className="grid grid-cols-[140px_1fr] gap-y-3 border-t border-[#F1F5F9] pt-4 text-[11px]">
                <span className="font-bold text-[#0F172A]">Application ID :</span>
                <span className="text-[#64748B]">{applicationDetail.appId}</span>

                <span className="font-bold text-[#0F172A]">Applied On :</span>
                <span className="text-[#64748B]">{applicationDetail.appliedOn}</span>

                <span className="font-bold text-[#0F172A]">Provider Name :</span>
                <span className="text-[#64748B]">{applicationDetail.name}</span>

                <span className="font-bold text-[#0F172A]">Phone No :</span>
                <span className="text-[#64748B]">{applicationDetail.phone}</span>

                <span className="font-bold text-[#0F172A]">Email Id :</span>
                <span className="text-[#64748B]">{applicationDetail.email}</span>

                <span className="font-bold text-[#0F172A]">Service Category :</span>
                <span className="text-[#64748B]">{applicationDetail.category}</span>

                <span className="font-bold text-[#0F172A]">Location :</span>
                <span className="text-[#64748B]">{applicationDetail.location}</span>

                <span className="font-bold text-[#0F172A]">Experience :</span>
                <span className="text-[#64748B]">{applicationDetail.experience}</span>

                <span className="font-bold text-[#0F172A]">Business Address :</span>
                <span className="text-[#64748B]">{applicationDetail.businessAddress}</span>

                <span className="font-bold text-[#0F172A]">Business Description :</span>
                <span className="max-w-md text-[#64748B]">{applicationDetail.description}</span>
              </div>
            </div>

            {/* Document Verification table */}
            <div className={`${CARD} rounded-2xl p-6`}>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Document Verification
              </h2>
              <p className="mb-4 text-[11px] text-[#94A3B8]">
                All Documents Has Been Verified And Valid
              </p>

              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-[#F1F5F9] font-bold text-[#0F172A]">
                    <th className="py-2">Document</th>
                    <th className="py-2">Format</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {applicationDetail.documents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-[#94A3B8]">
                        No documents submitted yet.
                      </td>
                    </tr>
                  ) : (
                    applicationDetail.documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="py-3 text-[#64748B]">{doc.name}</td>
                        <td className="py-3 text-[#64748B]">{doc.format}</td>
                        <td className="py-3">
                          <span
                            className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${DOC_TABLE_BADGE[doc.status]}`}
                          >
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Login Credential form */}
            <div className={`${CARD} rounded-2xl p-6`}>
              <h2 className="text-[14px] font-bold text-[#0F172A]">
                Login Credential For Provider
              </h2>
              <p className="mb-4 text-[11px] text-[#94A3B8]">
                Set LogIncredential For Providers
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-bold text-[#0F172A]">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-[11px] outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-bold text-[#0F172A]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-[11px] outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-bold text-[#0F172A]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-[11px] outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-bold text-[#0F172A]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-[11px] outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#64748B]">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendCredentials}
                  onChange={(e) => setSendCredentials(e.target.checked)}
                />
                <label htmlFor="sendEmail" className="font-semibold text-[#0F172A]">
                  Send Login Credential To Provider Via Email
                </label>
              </div>
            </div>
          </div>

          {/* ===== SIDEBAR SUMMARY & DOCUMENTS ===== */}
          <div className="flex flex-col gap-4">
            {/* Application Summary */}
            <div className={`${CARD} rounded-2xl p-4`}>
              <h3 className="mb-3 text-[12px] font-bold text-[#0F172A]">
                Application Summary
              </h3>
              <div className="space-y-2 text-[10px]">
                <div>
                  <div className="font-bold text-[#0F172A]">Application ID:</div>
                  <div className="text-[#94A3B8]">{applicationDetail.appId}</div>
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Applied On:</div>
                  <div className="text-[#94A3B8]">{applicationDetail.appliedOn}</div>
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Applicant Name:</div>
                  <div className="text-[#94A3B8]">{applicationDetail.name}</div>
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Status</div>
                  <span className="rounded bg-[#FEF9C3] px-2 py-0.5 text-[9px] font-bold text-[#CA8A04]">
                    {applicationDetail.status}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Document</div>
                  <div className="text-[#94A3B8]">
                    {applicationDetail.documentsSummary}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents badges */}
            <div className={`${CARD} rounded-2xl p-4`}>
              <h3 className="mb-3 text-[12px] font-bold text-[#0F172A]">
                Documents
              </h3>
              <div className="space-y-2 text-[10px]">
                {applicationDetail.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[#475569]">
                      <FileText size={12} /> {doc.name}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[8px] font-semibold ${DOC_SIDE_BADGE[doc.status].cls}`}
                    >
                      {DOC_SIDE_BADGE[doc.status].label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => toast.info("Request document flow coming soon.")}
                className="mt-4 w-full cursor-pointer rounded-full border border-[#2563EB] py-1.5 text-[10px] font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white"
              >
                Request Document
              </button>
            </div>
          </div>
        </div>

        {/* ---------- BOTTOM ACTIONS ---------- */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => setSelectedProviderId(null)}
            className="cursor-pointer rounded-full border border-[#2563EB] px-5 py-1.5 text-[11px] font-semibold text-[#2563EB]"
          >
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReject}
              disabled={rejectMutation.isPending}
              className="cursor-pointer rounded-full border border-[#EF4444] px-6 py-2 text-[11px] font-semibold text-[#EF4444] transition-colors hover:bg-[#EF4444] hover:text-white disabled:opacity-60"
            >
              {rejectMutation.isPending ? "Rejecting..." : "Reject Provider"}
            </button>
            <button
              onClick={handleApprove}
              disabled={approveMutation.isPending}
              className="cursor-pointer rounded-full bg-[#16A34A] px-6 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#15803D] disabled:opacity-60"
            >
              {approveMutation.isPending ? "Accepting..." : "Accept Provider"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================
     RENDER MAIN TABLE VIEW
     ================================================================ */
  const q = searchQuery.trim().toLowerCase();
  const filteredProviders = d
    ? q
      ? d.providers.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.code.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        )
      : d.providers
    : [];

  const pages: string[] = d
    ? ["1", "2", "3", "...", String(d.totalPages)]
    : ["1"];

  return (
    <div className="flex min-h-[calc(100vh-32px)] flex-col gap-[20px] rounded-[16px] bg-[#F3F5F9] p-4 md:min-h-[calc(100vh-48px)] md:p-6 lg:gap-5 lg:px-8">
      {/* ---------- HEADER ---------- */}
      <header
        className={`${CARD} flex items-center justify-between gap-4 rounded-2xl px-[16px] py-[16px] md:px-6`}
      >
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-[#0F172A]">
            Provider Management
          </h1>
          <p className="mt-[2px] truncate text-[11px] text-[#94A3B8]">
            Dashboard &gt; Provider Management
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            onClick={() => toast.info("Search panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Search size={15} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => toast.info("Notifications panel coming soon.")}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[13px] text-[#64748B]"
          >
            <Bell size={15} />
          </button>
          <div className="hidden cursor-pointer items-center gap-2.5 pl-2 sm:flex">
            <Image
              src={adminAvatar}
              alt="Admin Avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold leading-tight text-[#1E293B]">
                Arghya Sen
                <ChevronDown size={12} className="ml-1 inline" />
              </span>
              <span className="text-[10px] leading-tight text-[#94A3B8]">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- METRICS CARDS ---------- */}
      <section className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {(d?.metrics ?? []).map((metric) => {
          const Icon = METRIC_ICONS[metric.tone];
          return (
            <div
              key={metric.key}
              className={`${CARD} flex items-center gap-4 rounded-2xl p-5`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${METRIC_TONES[metric.tone]}`}
              >
                <Icon size={18} />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-[#1E293B]">
                  {metric.label}
                </span>
                <span className="my-0.5 text-xl font-bold leading-tight text-[#0F172A]">
                  {metric.value}
                </span>
                <span
                  className={`inline-flex items-center gap-[3px] text-[10px] font-medium ${
                    metric.trendUp ? "text-[#16A34A]" : "text-[#DC2626]"
                  }`}
                >
                  {metric.trendUp ? (
                    <ArrowUp size={10} />
                  ) : (
                    <ArrowDown size={10} />
                  )}
                  {metric.trendValue}
                  <span className="font-normal text-[#94A3B8]">
                    {metric.trendNote}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* ---------- CONTROLS BAR + DROPDOWN ---------- */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Live search pill */}
        <div className="relative w-full sm:w-[320px]">
          <Search
            size={12}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search By Id, Name Or Category...."
            className="w-full rounded-full border border-[#E2E8F0] bg-white py-2 pl-9 pr-4 text-[11px] text-[#334155] outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        <div className="relative">
          <button
            onClick={toggleRequestsDropdown}
            className="cursor-pointer rounded-lg border-none bg-[#F59E0B] px-5 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#D97706]"
          >
            Application Requests
          </button>

          {/* PENDING REQUESTS DROPDOWN */}
          {showRequestsDropdown && (
            <div className="absolute right-0 top-12 z-50 max-h-[350px] w-[240px] overflow-y-auto rounded-2xl border border-[#F1F5F9] bg-white p-2 shadow-xl">
              {isPendingLoading ? (
                <div className="p-4 text-center text-[11px] text-[#94A3B8]">
                  Loading...
                </div>
              ) : pendingApplications.length === 0 ? (
                <div className="p-4 text-center text-[11px] text-[#94A3B8]">
                  No pending requests
                </div>
              ) : (
                pendingApplications.map((app: PendingApplication) => (
                  <button
                    key={app.id}
                    onClick={() => handleSelectApplication(app.id)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg border-b border-[#F8FAFC] p-2.5 text-left transition-colors last:border-none hover:bg-[#F8FAFC]"
                  >
                    <span className="text-[11px] font-bold text-[#0F172A]">
                      Application Id:
                    </span>
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {app.code}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ---------- DATA TABLE ---------- */}
      <section
        className={`${CARD} flex flex-1 flex-col justify-between rounded-2xl p-5`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr>
                {[
                  "Provider Name",
                  "Ph No.",
                  "Service Category",
                  "Location",
                  "Status",
                  "Joined On",
                  "Action",
                ].map((th) => (
                  <th
                    key={th}
                    className="border-b border-[#F1F5F9] px-4 py-3 text-[13px] font-semibold text-[#1E293B]"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredProviders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-[12px] text-[#94A3B8]"
                  >
                    No providers match your search.
                  </td>
                </tr>
              ) : (
                filteredProviders.map((provider) => (
                  <tr key={provider.id}>
                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px]">
                      <div className="text-[12px] font-bold text-[#0F172A]">
                        {provider.name}
                      </div>
                      <div className="mt-0.5 text-[9px] font-medium text-[#94A3B8]">
                        Provider ID: {provider.code}
                      </div>
                    </td>

                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px] font-semibold text-[#334155]">
                      {provider.phone}
                    </td>

                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px]">
                      <span
                        className={`inline-block rounded-md border px-2.5 py-0.5 text-center text-[10px] font-semibold ${CATEGORY_CHIP}`}
                      >
                        {provider.category}
                      </span>
                    </td>

                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px] font-medium text-[#334155]">
                      {provider.location}
                    </td>

                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px]">
                      <span
                        className={`inline-block rounded-md border px-2.5 py-0.5 text-center text-[10px] font-semibold ${STATUS_BADGE[provider.status]}`}
                      >
                        {provider.status}
                      </span>
                    </td>

                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px] font-medium text-[#334155]">
                      {provider.joinedOn}
                    </td>

                    <td className="border-b border-[#F8FAFC] px-4 py-3.5 align-middle text-[11px]">
                      <button
                        onClick={() => handleSelectApplication(provider.id)}
                        className="inline-block cursor-pointer rounded-md border border-[#93C5FD] bg-[#EFF6FF] px-3 py-0.5 text-[10px] font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- TABLE FOOTER ---------- */}
        <div className="flex flex-col gap-3 pt-5 text-[11px] text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <div>{d?.showingText}</div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              onClick={goPrevPage}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B]"
            >
              <ChevronLeft size={13} />
            </button>

            {pages.map((page) =>
              page === "..." ? (
                <span key="dots" className="px-1 text-[#94A3B8]">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border text-[11px] ${
                    currentPage === page
                      ? "border-[#2563EB] bg-[#2563EB] font-semibold text-white"
                      : "border-[#E2E8F0] bg-white text-[#64748B]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => {
                if (d && Number(currentPage) < d.totalPages) goNextPage();
              }}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B]"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
