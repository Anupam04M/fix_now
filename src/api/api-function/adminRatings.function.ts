"use client";

// src/api/api-function/adminRatings.function.ts
// ================================================================
// ADMIN RATINGS & REVIEWS API LAYER
// ----------------------------------------------------------------
// Central place for every ratings-monitoring network call.
// Follows the FixNow conventions used across the project:
//   - Bearer token attached (see ./axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND ENDPOINTS NOT LIVE YET !!!
// fetchAdminRatingsFn() currently returns STATIC mock data so the
// page renders without a server. When the backend ships the
// endpoint, uncomment the real api.get call and delete the mock
// return. This mirrors exactly how provider.function.ts works.
//
// BEGINNER MAP: which page uses which function?
//   /admin/ratings_reviews -> fetchAdminRatingsFn
// ============================================================

import api from "./axios.instance";

/* Response envelope shape (same convention as provider.function.ts).
   Kept local here so this file is self-contained. */
interface AdminApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

/* ---------------- SHARED TYPES ---------------- */
export interface RatingMetric {
  key: string;
  label: string;
  value: string;
  /** the Average-Ratings card shows a small gold star after the value */
  showStar?: boolean;
  subtext: string;
  /** drives the pastel icon box colour on the card */
  tone: "total" | "rating" | "reviews" | "complaints";
}

export interface ProviderRatingRow {
  id: string; // internal row key
  name: string; // "Rajesh Mondal"
  code: string; // "FNP-SP-0873"
  category: string;
  averageRating: string; // "4.8"
  totalReviews: string; // "385"
  complaints: string; // "2"
  status: "Active" | "Inactive"; // chip colour map on the page
}

export interface AdminRatingsData {
  metrics: RatingMetric[];
  providers: ProviderRatingRow[];
  showingText: string;
  totalPages: number;
}

/* ---------------- RATINGS OVERVIEW ---------------- */
/* Mock payload mirrors Ratings_&_Reviews.html value-for-value.
   Every field here feeds exactly one section of the page,
   so swapping to the real API needs NO page changes. */
export const fetchAdminRatingsFn = async (): Promise<
  AdminApiResponse<AdminRatingsData>
> => {
  // REAL CALL (uncomment when backend is live):
  // const { data } = await api.get("/admin/ratings");
  // return { success: true, message: data.message, data: data.data };

  return {
    success: true,
    message: "Ratings fetched successfully.",
    data: {
      metrics: [
        {
          key: "total",
          label: "Total Providers",
          value: "1,248",
          subtext: "All Registerd Providers",
          tone: "total",
        },
        {
          key: "rating",
          label: "Average Ratings",
          value: "4.3",
          showStar: true,
          subtext: "Overall Ratings",
          tone: "rating",
        },
        {
          key: "reviews",
          label: "Total Reviews",
          value: "2500+",
          subtext: "All Provider's Review",
          tone: "reviews",
        },
        {
          key: "complaints",
          label: "Complains",
          value: "58",
          subtext: "Total Complains",
          tone: "complaints",
        },
      ],
      providers: [
        {
          id: "r1",
          name: "Rajesh Mondal",
          code: "FNP-SP-0873",
          category: "Electrician",
          averageRating: "4.8",
          totalReviews: "385",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r2",
          name: "Kunal Ganguly",
          code: "FNP-SP-0823",
          category: "Repairing",
          averageRating: "4.8",
          totalReviews: "270",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r3",
          name: "Tapan Ghosh",
          code: "FNP-SP-0897",
          category: "Carpenter",
          averageRating: "4.8",
          totalReviews: "460",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r4",
          name: "Arif Hossin",
          code: "FNP-SP-0372",
          category: "Plumber",
          averageRating: "4.7",
          totalReviews: "315",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r5",
          name: "Sanjoy Mondal",
          code: "FNP-SP-0993",
          category: "Repairing",
          averageRating: "4.7",
          totalReviews: "190",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r6",
          name: "Saurav Mitra",
          code: "FNP-SP-1149",
          category: "Delivery Assistance",
          averageRating: "4.5",
          totalReviews: "420",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r7",
          name: "Abhijit Paul",
          code: "FNP-SP-1001",
          category: "Electrician",
          averageRating: "4.5",
          totalReviews: "225",
          complaints: "2",
          status: "Active",
        },
        {
          id: "r8",
          name: "Raju Saha",
          code: "FNP-SP-0888",
          category: "Delivery Assistance",
          averageRating: "4.4",
          totalReviews: "255",
          complaints: "2",
          status: "Active",
        },
      ],
      showingText: "Showing 1 - 8 Out Of 1,248 Providers",
      totalPages: 156,
    } as AdminRatingsData,
  };
};
