"use client";

// src/api/api-function/adminStaticPages.function.ts
// ================================================================
// ADMIN STATIC PAGES API LAYER
// ----------------------------------------------------------------
// Central place for every static-page CMS network call.
// Follows the FixNow conventions used across the project:
//   - Bearer token attached (see ./axios.instance)
//   - Response envelope: { success, message, data }
//
// !!! BACKEND ENDPOINTS NOT LIVE YET !!!
// fetchAdminStaticPagesFn() currently returns STATIC mock data so
// the page renders without a server. When the backend ships the
// endpoint, uncomment the real api.get call and delete the mock
// return. This mirrors exactly how provider.function.ts works.
//
// BEGINNER MAP: which page uses which function?
//   /admin/static_pages -> fetchAdminStaticPagesFn
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
/** which lucide icon the left-list tile should show */
export type StaticPageIcon = "about" | "services" | "contact";

export interface StaticPageRevision {
  version: string; // "Version 3.0"
  date: string; // pre-formatted
  badge: string; // "Published"
}

/* One static page = left-list tile AND right-editor payload.
   Keeping them together means selecting a tile instantly swaps
   every field in the editor without extra calls. */
export interface StaticPage {
  id: string;

  /* ---- left-list tile ---- */
  name: string; // "About Us"
  routeLabel: string; // "/About Us"
  icon: StaticPageIcon;
  publishedOn: string; // "2nd Aug,2026"

  /* ---- top action bar ---- */
  urlSlug: string; // value of the "Page Url" input

  /* ---- editor ---- */
  title: string; // "About Us"
  description: string; // textarea content
  /** number of grey placeholder thumbnails under "Uploded Media" */
  mediaCount: number;

  /* ---- status / information cards ---- */
  status: "Published" | "Draft";
  createdBy: string; // "Arghya Sen"
  createdOn: string; // "2nd Jan,2026 7:30 PM"
  lastUpdated: string; // "2nd Aug,2026 12:10 PM"

  /* ---- revision history card ---- */
  revisions: StaticPageRevision[];
}

export interface AdminStaticPagesData {
  pages: StaticPage[];
}

/* ---------------- STATIC PAGES OVERVIEW ---------------- */
/* Mock payload mirrors Static_Pages.html value-for-value.
   Every field here feeds exactly one section of the page,
   so swapping to the real API needs NO page changes. */
export const fetchAdminStaticPagesFn = async (): Promise<
  AdminApiResponse<AdminStaticPagesData>
> => {
  // REAL CALL (uncomment when backend is live):
  // const { data } = await api.get("/admin/static-pages");
  // return { success: true, message: data.message, data: data.data };

  return {
    success: true,
    message: "Static pages fetched successfully.",
    data: {
      pages: [
        {
          id: "sp1",
          name: "About Us",
          routeLabel: "/About Us",
          icon: "about",
          publishedOn: "2nd Aug,2026",
          urlSlug: "",
          title: "About Us",
          description:
            "Learn More About Our Mission, Vision And How We Connect You With Trusted Local Service Provider",
          mediaCount: 4,
          status: "Published",
          createdBy: "Arghya Sen",
          createdOn: "2nd Jan,2026 7:30 PM",
          lastUpdated: "2nd Aug,2026 12:10 PM",
          revisions: [
            {
              version: "Version 3.0",
              date: "22nd Jul,2026 10:10 AM",
              badge: "Published",
            },
            {
              version: "Version 2.0",
              date: "2nd Aug,2026 12:10 PM",
              badge: "Published",
            },
            {
              version: "Version 1.1",
              date: "2nd Aug,2026 12:10 PM",
              badge: "Published",
            },
          ],
        },
        {
          id: "sp2",
          name: "Services",
          routeLabel: "/Service",
          icon: "services",
          publishedOn: "2nd Aug,2026",
          urlSlug: "",
          title: "Services",
          description:
            "Explore The Wide Range Of Home Services Offered By Our Verified And Trained Professionals",
          mediaCount: 4,
          status: "Published",
          createdBy: "Arghya Sen",
          createdOn: "5th Jan,2026 9:00 AM",
          lastUpdated: "28th Jul,2026 4:20 PM",
          revisions: [
            {
              version: "Version 2.1",
              date: "18th Jul,2026 11:30 AM",
              badge: "Published",
            },
            {
              version: "Version 2.0",
              date: "2nd Jul,2026 12:10 PM",
              badge: "Published",
            },
            {
              version: "Version 1.0",
              date: "5th Jan,2026 9:15 AM",
              badge: "Published",
            },
          ],
        },
        {
          id: "sp3",
          name: "Contact Us",
          routeLabel: "/Contact Us",
          icon: "contact",
          publishedOn: "2nd Aug,2026",
          urlSlug: "",
          title: "Contact Us",
          description:
            "Reach Out To Our Support Team Anytime For Queries, Feedback Or Assistance With Your Bookings",
          mediaCount: 4,
          status: "Published",
          createdBy: "Arghya Sen",
          createdOn: "8th Jan,2026 6:45 PM",
          lastUpdated: "30th Jul,2026 2:05 PM",
          revisions: [
            {
              version: "Version 2.0",
              date: "21st Jul,2026 9:40 AM",
              badge: "Published",
            },
            {
              version: "Version 1.2",
              date: "12th Jun,2026 1:25 PM",
              badge: "Published",
            },
            {
              version: "Version 1.0",
              date: "8th Jan,2026 7:00 PM",
              badge: "Published",
            },
          ],
        },
      ],
    } as AdminStaticPagesData,
  };
};
