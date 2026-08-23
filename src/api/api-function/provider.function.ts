// src/api/api-function/provider.function.ts
// ================================================================
// SERVICE PROVIDER API LAYER
// ----------------------------------------------------------------
// Central place for every provider-dashboard network call.
// Follows the FixNow conventions used across the project:
//   - Bearer token attached (see ./axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND ENDPOINTS NOT LIVE YET !!!
// Every function below currently returns STATIC mock data so the
// dashboard pages render without a server. When the Laravel team
// ships an endpoint, uncomment the real api.get/post call and delete
// the mock return. This mirrors exactly how cart.function.ts works.
//
// BEGINNER MAP: which page uses which function?
//   /service-provider            -> fetchProviderDashboardFn
//   /service-provider/bookings   -> fetchProviderBookingsFn,
//                                   acceptBookingFn
//   /service-provider/service-management -> fetchProviderServicesFn,
//                                   toggleProviderServiceFn
//   /service-provider/customer-insight -> fetchProviderRatingsFn
//   /service-provider/profile    -> fetchProfileFn (profile.function.ts)
//   /service-provider/settings   -> changePasswordFn,
//                                   updateNotificationPrefsFn
// ============================================================

import api from "./axios.instance";

/* Response envelope shape (same as cart.interface.ts ApiResponse).
   Kept local here so this file is self-contained. */
interface ProviderApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

/* ---------------- SHARED TYPES ---------------- */
export interface TodayJob {
  id: string;
  name: string;
  time: string;
  done: boolean;
}

export interface ProviderDashboardData {
  todayJobs: {
    completed: number;
    total: number;
    items: TodayJob[];
  };
  currentBooking: {
    bookingId: string;
    customerName: string;
    service: string;
    status: string;
    time: string;
    location: string;
    /** used to build the google-maps iframe src */
    mapQuery: string;
  };
  messages: {
    id: string;
    sender: string;
    service: string;
    preview: string;
    timeLabel: string;
  }[];
  availability: {
    status: string;
    workingHours: string;
    availableDays: string[];
    allDays: string[];
  };
  earningsWeekly: {
    labels: string[];
    values: number[];
    total: number;
    growthPct: number;
  };
  incomeSplit: {
    monthlyPct: number;
    weeklyPct: number;
    centerLabel: string;
  };
  ratingInsight: {
    lift: number;
    periodLabel: string;
  };
}

export interface ProviderBooking {
  id: string;
  customer: string;
  service: string;
  date: string;
  amount: number; // rupees as a number, format at render time
  status: "new" | "accepted" | "in_progress" | "completed" | "cancelled";
}

export interface ProviderService {
  id: number;
  name: string;
  price: number;
  duration: string;
  is_active: boolean;
}

export interface ProviderReview {
  id: number;
  customer: string;
  service: string;
  rating: number; // 1..5
  date: string;
  comment: string;
}

export interface ProviderRatingSummary {
  overall: number;
  totalReviews: number;
  distribution: { stars: number; count: number }[];
  insights: { label: string; score: number }[];
  reviews: ProviderReview[];
}

/* ---------------- DASHBOARD ---------------- */
/* Mock payload mirrors backend-index.html value-for-value.
   Every field here feeds exactly one section of the dashboard page,
   so swapping to the real API needs NO page changes. */
export const fetchProviderDashboardFn = async (): Promise<
  ProviderApiResponse<ProviderDashboardData>
> => {
  // REAL CALL (uncomment when backend is live):
  // const { data } = await api.get("/provider/dashboard");
  // return { success: true, message: data.message, data: data.data };

  return {
    success: true,
    message: "Dashboard fetched successfully.",
    data: {
      /* --- greeting strip inside header (layout uses its own) --- */
      todayJobs: {
        completed: 3,
        total: 6,
        items: [
          { id: "j1", name: "AC Repair & Servicing", time: "09:00 AM - 10:30 PM", done: true },
          { id: "j2", name: "Washing machine repair", time: "11:00 AM - 12:00 PM", done: true },
          { id: "j3", name: "Refrigerator Repair", time: "12:30 PM - 01:30 PM", done: true },
          { id: "j4", name: "AC Repair & Servicing", time: "02:00 PM - 03:00 PM", done: false },
          { id: "j5", name: "Ceiling Fan Repair", time: "03:30 PM - 04:15 PM", done: false },
          { id: "j6", name: "Delivery Assistance", time: "04:45 PM - 05:15 PM", done: false },
        ],
      },
      currentBooking: {
        bookingId: "1234567890",
        customerName: "Amit Verma",
        service: "AC Repair & Servicing",
        status: "Confirmed",
        time: "10:00AM - 12:00PM",
        location: "Salt Lake, Kolkata",
        mapQuery: "Salt Lake, Kolkata",
      },
      messages: [
        {
          id: "m1",
          sender: "Rajesh Kumar",
          service: "AC Repair",
          preview: "Got it, thank you!",
          timeLabel: "10 Min Ago",
        },
        {
          id: "m2",
          sender: "Vikram Singh",
          service: "Refrigerator Repair",
          preview: "Can we reschedule to tomorrow?",
          timeLabel: "1 Hr Ago",
        },
      ],
      availability: {
        status: "Available",
        workingHours: "09:00 AM - 08:00 PM",
        availableDays: ["Mon", "Tue", "Wed"],
        allDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      earningsWeekly: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        values: [1400, 2600, 1700, 3100, 2500, 3600, 4200],
        total: 12450,
        growthPct: 12,
      },
      incomeSplit: {
        monthlyPct: 72,
        weeklyPct: 28,
        centerLabel: "₹36,450",
      },
      ratingInsight: {
        lift: 0.2,
        periodLabel: "This Month",
      },
    } as ProviderDashboardData,
  };
};

/* Mark one of today's jobs as completed */
export const completeJobFn = async (
  jobId: string,
): Promise<ProviderApiResponse> => {
  // await api.patch(`/provider/jobs/${jobId}/complete`);
  return { success: true };
};

/* ---------------- BOOKINGS ---------------- */
export const fetchProviderBookingsFn = async (
  status?: string,
): Promise<ProviderApiResponse<ProviderBooking[]>> => {
  // const { data } = await api.get("/provider/bookings", { params: { status } });
  // return { success: true, data: data.data };
  return { success: true, data: [] };
};

/* Accept a new booking request */
export const acceptBookingFn = async (
  bookingId: string,
): Promise<ProviderApiResponse> => {
  // const { data } = await api.patch(`/provider/bookings/${bookingId}/accept`);
  // return { success: true, message: data.message };
  return { success: true, message: "Booking accepted" };
};

/* ---------------- SERVICES ---------------- */
export const fetchProviderServicesFn = async (): Promise<
  ProviderApiResponse<ProviderService[]>
> => {
  // const { data } = await api.get("/provider/services");
  // return { success: true, data: data.data };
  return { success: true, data: [] };
};

/* Flip a service active/inactive */
export const toggleProviderServiceFn = async (
  serviceId: number,
  is_active: boolean,
): Promise<ProviderApiResponse> => {
  // await api.patch(`/provider/services/${serviceId}`, { is_active });
  return { success: true };
};

/* ---------------- RATINGS ---------------- */
export const fetchProviderRatingsFn = async (): Promise<
  ProviderApiResponse<ProviderRatingSummary>
> => {
  // const { data } = await api.get("/provider/ratings");
  // return { success: true, data: data.data };
  return { success: true, data: {} as ProviderRatingSummary };
};

/* ---------------- AVAILABILITY ---------------- */
export type AvailabilityStatus = "available" | "brb" | "offline";

export const updateAvailabilityFn = async (
  status: AvailabilityStatus,
): Promise<ProviderApiResponse> => {
  // await api.patch("/provider/availability", { status });
  return { success: true };
};

/* ---------------- SETTINGS ---------------- */
export const changePasswordFn = async (payload: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}): Promise<ProviderApiResponse> => {
  // await api.post("/auth/change-password", payload);
  return { success: true, message: "Password changed successfully." };
};

export const updateNotificationPrefsFn = async (payload: {
  email_notifications: boolean;
  push_notifications: boolean;
}): Promise<ProviderApiResponse> => {
  // await api.put("/customer/preferences", payload);
  return { success: true };
};
