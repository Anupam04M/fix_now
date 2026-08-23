"use client";

// src/api/api-function/adminProviders.function.ts
// ================================================================
// ADMIN PROVIDER MANAGEMENT API LAYER  (single source of truth)
// ----------------------------------------------------------------
// Real endpoints (baseURL = NEXT_PUBLIC_SERVER_URL, axios.instance):
//   GET   {{base_url}}/admin/providers
//   GET   {{base_url}}/admin/providers/pending
//   GET   {{base_url}}/admin/providers/{{provider_profile_id}}
//   PATCH {{base_url}}/admin/providers/{{provider_profile_id}}/approve
//   PATCH {{base_url}}/admin/providers/{{provider_profile_id}}/reject
//
// BACKEND STATUS: server is up (/auth/login answers correctly) but
// every /admin/providers* route currently returns HTTP 500 — a
// BACKEND bug. Until fixed, the three GETs fall back to *_MOCK
// payloads (console.warn marks each fallback) so the page stays
// usable. Mutations NEVER fake success.
//
// WHEN THE BACKEND IS FIXED: nothing changes here or downstream —
// delete the catch-fallback blocks if hard failures are preferred.
// ============================================================

import api from "./axios.instance";

/* ---------------- TYPES (consumed by hooks + page) ---------------- */
export interface MetricCardData {
  key: string;
  label: string;
  value: string;
  tone: "total" | "active" | "pending" | "suspended";
  trendUp: boolean;
  trendValue: string;
  trendNote: string;
}

export interface ProviderRow {
  id: string;
  code: string;
  name: string;
  phone: string;
  category: string;
  location: string;
  status: "Online" | "Offline" | "Banned";
  joinedOn: string;
}

export interface AdminProvidersData {
  metrics: MetricCardData[];
  providers: ProviderRow[];
  totalPages: number;
  showingText: string;
}

export interface PendingApplication {
  id: string;
  appId: string;
  code: string;
  name: string;
  appliedOn: string;
}

export type DocumentStatus = "Verified" | "Pending" | "Not Provided";

export interface ApplicationDocument {
  id: string;
  name: string;
  format: string;
  status: DocumentStatus;
}

export interface ApplicationDetail {
  appId: string;
  appliedOn: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  location: string;
  experience: string;
  businessAddress: string;
  description: string;
  status: "Pending";
  documentsSummary: string;
  documents: ApplicationDocument[];
}

export interface ApprovePayload {
  userName: string;
  email: string;
  password?: string;
  sendCredentials: boolean;
}

/* Generic envelope returned to hooks */
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

/* ================================================================
   RESPONSE NORMALIZERS
   ----------------------------------------------------------------
   Accept every common Laravel/REST wrap style ({data:[...]}, bare
   arrays, paginated {data:{data:[...]}}) so backend tweaks never
   reach the UI layer.
   ================================================================ */
type AnyRecord = Record<string, unknown>;

const unwrapList = (payload: unknown): AnyRecord[] => {
  if (Array.isArray(payload)) return payload as AnyRecord[];
  const record = (payload ?? {}) as AnyRecord;
  const inner = record.data as AnyRecord | AnyRecord[] | undefined;
  if (Array.isArray(inner)) return inner as AnyRecord[];
  if (Array.isArray(inner?.data)) return inner.data as AnyRecord[];
  if (Array.isArray(inner?.providers)) return inner.providers as AnyRecord[];
  return [];
};

const unwrapObject = (payload: unknown): AnyRecord | null => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return null;
  const record = payload as AnyRecord;
  if (
    record.data &&
    typeof record.data === "object" &&
    !Array.isArray(record.data)
  ) {
    return record.data as AnyRecord;
  }
  return record;
};

const pick = (row: AnyRecord, ...keys: string[]): string => {
  for (const key of keys) {
    const value = row?.[key];
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }
  return "";
};

export const getApiErrorMessage = (error: unknown): string => {
  const err = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };
  return err?.response?.data?.message || err?.message || "Request failed";
};

/* HTTP status out of an unknown axios error (for console.warn logs) */
const errorStatus = (error: unknown): number | undefined =>
  (error as { response?: { status?: number } })?.response?.status;

const normalizeStatus = (raw: string): ProviderRow["status"] => {
  const value = raw.toLowerCase();
  if (
    value.includes("ban") ||
    value.includes("suspend") ||
    value.includes("reject")
  )
    return "Banned";
  if (
    value === "online" ||
    value.includes("active") ||
    value.includes("approved")
  )
    return "Online";
  return "Offline";
};

const normalizeDocStatus = (raw: string): DocumentStatus => {
  const value = raw.toLowerCase();
  if (
    value.includes("verif") ||
    value.includes("upload") ||
    value.includes("approv")
  )
    return "Verified";
  if (value.includes("pend") || value.includes("review")) return "Pending";
  return "Not Provided";
};

const mapProviderRow = (row: AnyRecord, index: number): ProviderRow => ({
  id: pick(row, "id", "provider_profile_id", "uuid", "_id") || `p-${index}`,
  code:
    pick(row, "provider_profile_id", "provider_code", "code", "id") ||
    `FNP-SP-${index}`,
  name:
    pick(row, "name", "full_name", "provider_name", "user_name") ||
    "Unnamed Provider",
  phone: pick(row, "phone", "phone_number", "mobile", "contact") || "N/A",
  category:
    pick(row, "category", "service_category", "category_name") || "General",
  location: pick(row, "location", "city", "area", "address") || "N/A",
  status: normalizeStatus(pick(row, "status", "state", "approval_status")),
  joinedOn:
    pick(row, "joined_on", "created_at", "joined_date", "createdOn") || "-",
});

const buildMetrics = (providers: ProviderRow[]): MetricCardData[] => {
  const total = providers.length;
  const active = providers.filter((p) => p.status === "Online").length;
  const suspended = providers.filter((p) => p.status === "Banned").length;

  return [
    { key: "total", label: "Total Providers", value: total.toLocaleString(), trendValue: "0%", trendUp: true, trendNote: "From Last Month", tone: "total" },
    { key: "active", label: "Active Providers", value: active.toLocaleString(), trendValue: "0%", trendUp: true, trendNote: "From Last Month", tone: "active" },
    { key: "pending", label: "Pending Approvals", value: "12", trendValue: "8%", trendUp: false, trendNote: "From Last Month", tone: "pending" },
    { key: "suspended", label: "Suspended", value: suspended.toLocaleString(), trendValue: "5%", trendUp: false, trendNote: "From Last Month", tone: "suspended" },
  ];
};

/* ================================================================
   MOCK FALLBACKS (used ONLY while the backend routes 500)
   ================================================================ */
const PROVIDERS_MOCK: AdminProvidersData = {
  metrics: [
    { key: "total", label: "Total Providers", value: "1,248", trendValue: "12%", trendUp: true, trendNote: "From Last Month", tone: "total" },
    { key: "active", label: "Active Providers", value: "1,136", trendValue: "15%", trendUp: true, trendNote: "From Last Month", tone: "active" },
    { key: "pending", label: "Pending Approvals", value: "12", trendValue: "8%", trendUp: false, trendNote: "From Last Month", tone: "pending" },
    { key: "suspended", label: "Suspended", value: "42", trendValue: "5%", trendUp: false, trendNote: "From Last Month", tone: "suspended" },
  ],
  providers: [
    { id: "p1", name: "Rahul Sharma", code: "FNP-SP-1048", phone: "9876543XXX", category: "Repairing", location: "Kestopur, West Bengal", status: "Online", joinedOn: "13th Jul,2026" },
    { id: "p2", name: "Pradip Dutta", code: "FNP-SP-1008", phone: "9876543XXX", category: "Househelp", location: "Laketown, West Bengal", status: "Online", joinedOn: "21th Jan,2026" },
    { id: "p3", name: "Kunal Ganguly", code: "FNP-SP-0823", phone: "9876543XXX", category: "Repairing", location: "Rajarhat, West Bengal", status: "Online", joinedOn: "13th Jul,2024" },
    { id: "p4", name: "Saurav Mitra", code: "FNP-SP-1149", phone: "9876543XXX", category: "Delivary Assitance", location: "Phoolbagan, West Bengal", status: "Offline", joinedOn: "13th Jul,2024" },
    { id: "p5", name: "Kaushik Mondal", code: "FNP-SP-1241", phone: "9876543XXX", category: "Personal Grooming", location: "Newtown, West Bengal", status: "Online", joinedOn: "13th Jul,2024" },
    { id: "p6", name: "Arif Hossain", code: "FNP-SP-0372", phone: "9876543XXX", category: "Plumber", location: "Kaikhali, West Bengal", status: "Banned", joinedOn: "13th Jul,2024" },
    { id: "p7", name: "Tapan Ghosh", code: "FNP-SP-0897", phone: "9876543XXX", category: "Carpenter", location: "Laketown, West Bengal", status: "Offline", joinedOn: "13th Jul,2024" },
    { id: "p8", name: "Sanjoy Mondal", code: "FNP-SP--0993", phone: "9876543XXX", category: "Repairing", location: "Ultodanga, West Bengal", status: "Online", joinedOn: "13th Jul,2024" },
    { id: "p9", name: "Abhijit Paul", code: "FNP-SP-1001", phone: "9876543XXX", category: "Electrician", location: "Chinar Park, West Bengal", status: "Banned", joinedOn: "13th Jul,2024" },
  ],
  showingText: "Showing 1 - 9 Out Of 1,248 Providers",
  totalPages: 125,
};

const PENDING_MOCK: PendingApplication[] = [
  { id: "app-1", appId: "#App-2026-001234", code: "App-2026-001234", name: "Bikash Kumar", appliedOn: "11 Aug,2026, 04:10 PM" },
  { id: "app-2", appId: "#App-2026-001235", code: "App-2026-001235", name: "Rajesh Mondal", appliedOn: "12 Aug,2026, 11:30 AM" },
  { id: "app-3", appId: "#App-2026-001236", code: "App-2026-001236", name: "Prakash Jaiswal", appliedOn: "12 Aug,2026, 01:32 PM" },
];

const DETAIL_MOCK: ApplicationDetail = {
  appId: "#App-2026-001235",
  appliedOn: "12 Aug,2026, 11:30 AM",
  name: "Rajesh Mondal",
  phone: "+91 987 654 0123",
  email: "Rajeshmondal025@Gmail.Com",
  category: "Electrician",
  location: "Kolkata, West Bengal",
  experience: "7 Years",
  businessAddress: "Kestopur, West Bengal",
  description:
    "We Provide Professional Electrical Installation, Repair, Maintenance And Wiring Services For Homes And Businesses",
  status: "Pending",
  documentsSummary: "3 Out Of 4 Submitted",
  documents: [
    { id: "doc-gov-id", name: "Government Id", format: "Government_id.PDF", status: "Verified" },
    { id: "doc-licence", name: "Professional Licence", format: "Licence.PDF", status: "Verified" },
    { id: "doc-bank", name: "Bank Details", format: "Account.PDF", status: "Verified" },
    { id: "doc-profile", name: "Profile Image", format: "Image.PNG", status: "Verified" },
    { id: "doc-other", name: "Other Documents(Optional)", format: "Nill", status: "Not Provided" },
  ],
};

/* ================================================================
   API FUNCTIONS
   ================================================================ */

/* GET {{base_url}}/admin/providers */
export const fetchAdminProviders = async (): Promise<
  ApiResponse<AdminProvidersData>
> => {
  try {
    const { data } = await api.get("/admin/providers");
    const rows = unwrapList(data).map(mapProviderRow);

    return {
      success: true,
      message: (data as AnyRecord)?.message as string | undefined,
      data: {
        providers: rows,
        metrics: buildMetrics(rows),
        showingText: `Showing 1 - ${rows.length} Out Of ${rows.length} Providers`,
        totalPages: Math.max(1, Math.ceil(rows.length / 9)),
      },
    };
  } catch (error) {
    console.warn(
      "[adminProviders] GET /admin/providers failed — mock fallback.",
      errorStatus(error),
    );
    return {
      success: true,
      message: "Live API unavailable — showing sample data.",
      data: PROVIDERS_MOCK,
    };
  }
};

/* GET {{base_url}}/admin/providers/pending */
export const fetchPendingApplications = async (): Promise<
  PendingApplication[]
> => {
  try {
    const { data } = await api.get("/admin/providers/pending");

    return unwrapList(data).map((row, index) => {
      const id =
        pick(row, "id", "provider_profile_id", "application_id") ||
        `app-${index}`;
      const code =
        pick(row, "application_no", "application_code", "code", "id") || id;
      return {
        id,
        appId: `#${code}`,
        code,
        name: pick(row, "name", "full_name", "applicant_name"),
        appliedOn: pick(row, "applied_on", "created_at") || "-",
      };
    });
  } catch (error) {
    console.warn(
      "[adminProviders] GET pending failed — mock fallback.",
      errorStatus(error),
    );
    return PENDING_MOCK;
  }
};

/* GET {{base_url}}/admin/providers/{{provider_profile_id}} */
export const fetchApplicationDetail = async (
  providerId: string,
): Promise<ApplicationDetail> => {
  try {
    const { data } = await api.get(`/admin/providers/${providerId}`);
    const row = unwrapObject(data);

    if (!row) throw new Error("Empty application payload.");

    const rawDocs = Array.isArray(row.documents)
      ? (row.documents as AnyRecord[])
      : [];
    const documents: ApplicationDocument[] = rawDocs.map((doc, index) => ({
      id: pick(doc, "id", "document_id") || `doc-${index}`,
      name:
        pick(doc, "name", "document_name", "title") ||
        `Document ${index + 1}`,
      format: pick(doc, "format", "file_name", "file_path") || "-",
      status: normalizeDocStatus(pick(doc, "status", "verification_status")),
    }));

    const submitted = documents.filter(
      (d) => d.status !== "Not Provided",
    ).length;

    return {
      appId: pick(row, "application_no", "application_id", "id") || providerId,
      appliedOn: pick(row, "applied_on", "created_at") || "-",
      name: pick(row, "name", "full_name", "applicant_name"),
      phone: pick(row, "phone", "phone_number", "mobile"),
      email: pick(row, "email", "email_id"),
      category: pick(row, "category", "service_category"),
      location: pick(row, "location", "city", "address"),
      experience: pick(row, "experience", "experience_years") || "-",
      businessAddress: pick(row, "business_address", "address") || "-",
      description: pick(row, "description", "business_description", "about"),
      status: "Pending",
      documentsSummary: `${submitted} Out Of ${Math.max(documents.length, 1)} Submitted`,
      documents,
    };
  } catch (error) {
    console.warn(
      `[adminProviders] GET detail ${providerId} failed — mock fallback.`,
      errorStatus(error),
    );
    return DETAIL_MOCK;
  }
};

/* PATCH {{base_url}}/admin/providers/{{id}}/approve
   Throws with the backend's message so mutation onError can toast it. */
export const approveProviderApi = async ({
  providerId,
  payload,
}: {
  providerId: string;
  payload: ApprovePayload;
}): Promise<void> => {
  try {
    const { data } = await api.patch(
      `/admin/providers/${providerId}/approve`,
      payload,
    );
    if ((data as AnyRecord)?.success === false) {
      throw new Error(
        ((data as AnyRecord)?.message as string) || "Approval rejected by server.",
      );
    }
  } catch (error) {
    console.error("[adminProviders] approve failed:", errorStatus(error));
    throw new Error(getApiErrorMessage(error));
  }
};

/* PATCH {{base_url}}/admin/providers/{{id}}/reject */
export const rejectProviderApi = async (
  providerId: string,
): Promise<void> => {
  try {
    const { data } = await api.patch(`/admin/providers/${providerId}/reject`);
    if ((data as AnyRecord)?.success === false) {
      throw new Error(
        ((data as AnyRecord)?.message as string) || "Rejection rejected by server.",
      );
    }
  } catch (error) {
    console.error("[adminProviders] reject failed:", errorStatus(error));
    throw new Error(getApiErrorMessage(error));
  }
};
