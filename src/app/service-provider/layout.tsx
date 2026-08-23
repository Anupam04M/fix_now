"use client";

// src/app/service-provider/layout.tsx
// ================================================================
// SERVICE PROVIDER LAYOUT  (all /service-provider/* routes)
// ----------------------------------------------------------------
// Matches the HTML dashboard shell:
//   - fixed left Sidebar (see layouts/service-provider-panel/Sidebar.tsx)
//   - fixed GLASS HEADER: page title, search, notifications,
//     profile button that opens an Availability dropdown
//     (Available / Be Right Back / Appear Offline)
//
// HOW THE HEADER TITLE WORKS:
//   usePathname() maps each route to its heading so every page gets
//   the right title without duplicating header markup:
//     /service-provider              -> "HI Rahul!"
//     /service-provider/bookings     -> "Bookings"
//     ... etc.
//
// HOW TO MAKE DYNAMIC (beginner guide):
//   STEP 1 - GREETING: replace "HI Rahul!" with
//            const { user } = useAuthStore(); -> user?.name
//   STEP 2 - AVAILABILITY: the dropdown buttons are visual only.
//            Wire selection to PATCH {{base_url}}/provider/availability
//            { status: "available" | "brb" | "offline" } and store the
//            chosen status in a provider store (or React Query cache).
//   STEP 3 - NOTIFICATIONS: bell icon should open a panel fed by
//            GET {{base_url}}/provider/notifications.
// ============================================================

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast as sonnerToast } from "sonner";

import ProviderSidebar from "@/layouts/service-provider-panel/Sidebar";
import providerAvatar from "@/assets/images/after-service/Frame 358.png";

/* Route -> header title map */
const TITLES: Record<string, { title: string; subtitle: string }> = {
  "/service-provider": {
    title: "HI Rahul!",
    subtitle: "Welcome to FixNow ! Ready to start ?",
  },
  "/service-provider/bookings": {
    title: "Bookings",
    subtitle: "Manage your incoming and past jobs.",
  },
  "/service-provider/service-management": {
    title: "Service Management",
    subtitle: "Control your services and coverage areas.",
  },
  "/service-provider/customer-insight": {
    title: "Customer Insights",
    subtitle: "Reviews and ratings from your customers.",
  },
  "/service-provider/profile": {
    title: "Profile",
    subtitle: "Introduce Your Personal Information And Availability",
  },
  "/service-provider/settings": {
    title: "Settings",
    subtitle: "Security & notification preferences.",
  },
};

export default function ServiceProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  /* Header meta falls back to Dashboard for unknown sub-routes */
  const meta =
    TITLES[pathname] ?? TITLES["/service-provider"];

  /* ---------------- AVAILABILITY DROPDOWN STATE ---------------- */
  // Dynamic later (STEP 2): send chosen status to the API.
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState("Available");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowAvailability(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F7F9FB] text-[#1A3151]">
      <ProviderSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ========================= GLASS HEADER ========================= */}
      <header className="fixed left-[6px] right-[6px] top-[6px] z-[9999] flex min-h-[58px] items-center justify-between overflow-visible rounded-[12px] border border-white/90 bg-white/50 px-[8px] py-[6px] shadow-[0_8px_28px_rgba(39,114,204,0.08)] backdrop-blur-[25px] backdrop-saturate-[150%] sm:left-[14px] sm:right-[14px] sm:top-[14px] sm:min-h-[64px] md:left-[20px] md:right-[20px] md:top-[18px] md:min-h-[70px] lg:left-[324px] lg:right-[24px] lg:top-[20px] lg:min-h-[90px] lg:px-[20px]">
        {/* Glass reflection blobs */}
        <div className="pointer-events-none absolute -left-[30px] -top-[25px] h-[90px] w-[180px] rounded-full bg-[#DDF4FF]/35 blur-[30px]" />
        <div className="pointer-events-none absolute -top-[35px] right-[20%] h-[70px] w-[180px] rounded-full bg-white/40 blur-[35px]" />

        {/* ===== LEFT: burger + title ===== */}
        <div className="relative z-10 flex min-w-0 flex-1 items-center">
          {/* Mobile menu button - opens sidebar via custom event
              (Sidebar listens? Simpler: hidden on mobile we rely on
               the sidebar's own trigger inside pages. Kept minimal.) */}
          {/* Mobile menu button - opens the sidebar */}
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
            className="mr-[7px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] border border-white/70 bg-white/30 text-[#2772CC] sm:h-[38px] sm:w-[38px] md:h-[40px] md:w-[40px] lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
              <path d="M4 6H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 18H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="min-w-0 truncate whitespace-nowrap text-[14px] font-semibold leading-none text-[#1F2937] sm:text-[17px] md:text-[19px] lg:text-[24px]">
              {meta.title}
            </h1>
            <p className="mt-[6px] text-[11px] leading-4 text-[#6B7280] sm:text-[13px]">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* ===== RIGHT: search, bell, profile ===== */}
        <div className="relative z-10 flex shrink-0 items-center">
          {/* Desktop search */}
          <div className="hidden h-[40px] w-[336px] items-center rounded-[9px] border border-white/80 bg-white px-[10px] shadow-[0_2px_10px_rgba(39,114,204,0.04)] backdrop-blur-[12px] lg:flex">
            <svg className="mr-[10px] h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M17 17L21 21" stroke="#A5A5A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#A5A5A5" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              placeholder="Search For Bookings, Jobs..."
              className="h-full w-full min-w-0 bg-transparent text-[14px] outline-none placeholder:text-[#D1D5DB]"
            />
          </div>

          {/* Mobile search icon */}
          <button
            type="button"
            aria-label="Search"
            className="ml-[4px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border border-[#D6D6D6] bg-white shadow-sm sm:h-[38px] sm:w-[38px] lg:ml-[10px] lg:h-10 lg:w-10"
          >
            <svg viewBox="0 0 25 25" fill="none" className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px]">
              <path d="M17.707 17.7083L21.8737 21.8749" stroke="#2772CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19.7917 11.4583C19.7917 6.85596 16.0607 3.125 11.4583 3.125C6.85596 3.125 3.125 6.85596 3.125 11.4583C3.125 16.0607 6.85596 19.7917 11.4583 19.7917C16.0607 19.7917 19.7917 16.0607 19.7917 11.4583Z" stroke="#2772CC" strokeWidth="1.5" />
            </svg>
          </button>

          {/* Notification bell */}
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => sonnerToast.info("Notifications panel coming soon.")}
            className="ml-[4px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border border-[#D6D6D6] bg-white shadow-sm sm:h-[38px] sm:w-[38px] lg:ml-[10px] lg:h-10 lg:w-10"
          >
            <svg viewBox="0 0 25 25" fill="none" className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px]">
              <path d="M16.1471 18.75C16.1471 20.7635 14.5148 22.3958 12.5013 22.3958C10.4878 22.3958 8.85547 20.7635 8.85547 18.75" stroke="#2772CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.0324 18.7501H4.96757C3.94995 18.7501 3.125 17.9251 3.125 16.9075C3.125 16.4188 3.31912 15.9502 3.66468 15.6046L4.29304 14.9762C4.87909 14.3902 5.20833 13.5953 5.20833 12.7665V9.89592C5.20833 5.86884 8.47293 2.60425 12.5 2.60425C16.5271 2.60425 19.7917 5.86883 19.7917 9.89592V12.7665C19.7917 13.5953 20.1209 14.3902 20.707 14.9762L21.3353 15.6046C21.6808 15.9502 21.875 16.4188 21.875 16.9075C21.875 17.9251 21.05 18.7501 20.0324 18.7501Z" stroke="#2772CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Profile button + availability dropdown */}
          <div className="relative ml-[8px]" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowAvailability(!showAvailability)}
              className="hidden h-[44px] w-[158px] shrink-0 items-center rounded-[8px] border border-[#DCE6F1] bg-white px-[5px] shadow-sm sm:flex md:h-[44px] md:w-[158px] lg:h-[60px] lg:w-[240px]"
            >
              <div className="relative shrink-0">
                <Image
                  src={providerAvatar}
                  alt="Profile"
                  className="h-[31px] w-[31px] rounded-full object-cover lg:h-[35px] lg:w-[35px]"
                  width={35}
                  height={35}
                />
                {/* Green online dot */}
                <span className="absolute bottom-[-1px] right-[1px] h-2 w-2 rounded-full border-[1.5px] border-white bg-[#4EDEA3]" />
              </div>

              <div className="ml-[8px] min-w-0 flex-1 text-left lg:ml-[10px]">
                <p className="truncate text-[11px] font-semibold leading-[11px] text-black lg:text-[14px]">
                  Rahul Sharma
                </p>
                <p className="mt-[5px] truncate text-[9px] leading-[9px] text-[#767676] lg:mt-[7px] lg:text-[12px]">
                  Service Provider
                </p>
              </div>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`ml-auto mr-1 h-[19px] w-[19px] shrink-0 transition-transform duration-300 lg:ml-[25px] lg:h-6 lg:w-6 ${
                  showAvailability ? "rotate-180" : ""
                }`}
              >
                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Availability dropdown (Available / BRB / Offline) */}
            {showAvailability && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[999999] w-[240px] rounded-[20px] border border-white/80 bg-white/90 p-[8px] shadow-[0_10px_30px_rgba(39,114,204,0.12)] backdrop-blur-[24px]">
                {/* Available */}
                <button
                  type="button"
                  onClick={() => {
                    setAvailability("Available");
                    setShowAvailability(false);
                  }}
                  className={`flex h-[48px] w-full items-center rounded-[13px] border px-[11px] transition-all duration-200 ${
                    availability === "Available"
                      ? "border-color4 bg-[#f0f9fe]"
                      : "border-white bg-white hover:bg-[#f8fbff]"
                  }`}
                >
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#00C514]">
                    <svg width="18" height="18" viewBox="0 0 27 27" fill="none">
                      <path d="M6 13.5L11.5 19L22 8" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="ml-[10px] text-[13px] font-medium text-[#1F2937]">Available</span>
                </button>

                {/* Be Right Back */}
                <button
                  type="button"
                  onClick={() => {
                    setAvailability("Be Right Back");
                    setShowAvailability(false);
                  }}
                  className={`mt-[7px] flex h-[48px] w-full items-center rounded-[13px] border px-[11px] transition-all duration-200 ${
                    availability === "Be Right Back"
                      ? "border-color4 bg-[#f0f9fe]"
                      : "border-white bg-white hover:bg-[#f8fbff]"
                  }`}
                >
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 42 42" fill="none">
                      <circle cx="21" cy="21" r="17" stroke="#FFB515" strokeWidth="3" />
                      <path d="M21 11V21L27 25" stroke="#FFB515" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="ml-[10px] text-[13px] font-medium text-[#1F2937]">Be Right Back</span>
                </button>

                {/* Appear Offline */}
                <button
                  type="button"
                  onClick={() => {
                    setAvailability("Appear Offline");
                    setShowAvailability(false);
                  }}
                  className={`mt-[7px] flex h-[48px] w-full items-center rounded-[13px] border px-[11px] transition-all duration-200 ${
                    availability === "Appear Offline"
                      ? "border-color4 bg-[#f0f9fe]"
                      : "border-white bg-white hover:bg-[#f8fbff]"
                  }`}
                >
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#FF3B3B]">
                    <svg width="17" height="17" viewBox="0 0 25 25" fill="none">
                      <path d="M6 6L19 19" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
                      <path d="M19 6L6 19" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="ml-[10px] text-[13px] font-medium text-[#1F2937]">Appear Offline</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      {/* pt matches the fixed header height; lg:ml clears the sidebar */}
      <main className="min-h-screen w-full p-3 pt-[100px] sm:p-4 sm:pt-[110px] md:p-5 md:pt-[124px] lg:ml-[300px] lg:w-[calc(100%-300px)] lg:max-w-none lg:p-5 lg:pt-[142px] xl:p-7 xl:pt-[150px]">
        {children}
      </main>
    </div>
  );
}

