"use client";

// src/layouts/service-provider-panel/Sidebar.tsx
// ================================================================
// SERVICE PROVIDER SIDEBAR
// ----------------------------------------------------------------
// Pixel-matched to the <aside> in Fix_now-Dashboard-_backend_part/*.html
//
// HOW IT WORKS:
//   - usePathname() detects the current route and highlights the
//     matching nav item (blue bg + shadow), exactly like the HTML's
//     "active" class on backend-index.html.
//   - Badges (Bookings=10, Insights=4) are STATIC here.
//     Dynamic later: fetch unread counts from
//       GET {{base_url}}/provider/notifications/unread-count
//
// HOW TO MAKE IT DYNAMIC (beginner guide):
//   STEP 1 - BADGE COUNTS: replace the hardcoded badge numbers with
//            React Query hooks hitting provider endpoints.
//   STEP 2 - PROFILE INFO: the help-card is static; nothing dynamic needed.
//   STEP 3 - LOGOUT: wire the Log Out item to useAuthStore().logout()
//            then router.push("/") - same pattern as user-panel Navbar.
// ============================================================

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* Dashboard logo (blue FixNow wordmark on transparent bg) —
   copied from Fix_now-Dashboard-_backend_part/assets/images/logo.png.
   NOTE: this is NOT the same as footer-logo.png (amber version made
   for the dark footer). Using the wrong one kills contrast. */
import logoImg from "@/assets/images/dashboard-logo.png";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
  /* Inline SVG markup copied from the HTML sidebar */
  icon: string;
}

/* Nav icons extracted verbatim from the HTML design */
const ICONS = {
  dashboard: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="#244F84" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M15 17C14.2005 17.6224 13.1502 18 12 18C10.8497 18 9.79953 17.6224 9 17" stroke="#244F84" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>`,
  bookings: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><path d="M5.33333 3.00001C7.79379 2.99657 10.1685 3.88709 12 5.5V21C10.1685 19.3871 7.79379 18.4966 5.33333 18.5C3.77132 18.5 2.99032 18.5 2.64526 18.2792C2.4381 18.1466 2.35346 18.0619 2.22086 17.8547C2 17.5097 2 16.8941 2 15.6629V6.40322C2 4.97543 2 4.26154 2.54874 3.68286C3.09748 3.10418 3.65923 3.07432 4.78272 3.0146C4.965 3.00491 5.14858 3.00001 5.33333 3.00001Z" stroke="#244F84" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 21V5.5C13.8315 3.88709 16.2062 2.99657 18.6667 3.00001C18.8514 3.00001 19.035 3.00491 19.2173 3.0146C20.3408 3.07432 20.9025 3.10418 21.4513 3.68286C22 4.26154 22 4.97543 22 6.40322V11.5" stroke="#244F84" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M21.6887 14.9339L21.0661 14.3113C20.651 13.8962 19.978 13.8962 19.5629 14.3113L16.2141 17.6601C15.769 18.1052 15.4656 18.6722 15.3421 19.2895L15 21L16.7105 20.6579C17.3278 20.5344 17.8948 20.231 18.3399 19.7859L21.6887 16.4371C22.1038 16.022 22.1038 15.349 21.6887 14.9339Z" stroke="#244F84" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>`,
  service: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="9" stroke="#2772CC" stroke-width="1.7"/><circle cx="12" cy="12" r="3.2" stroke="#2772CC" stroke-width="1.7"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="#2772CC" stroke-width="1.7"/></svg>`,
  customers: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><circle cx="9" cy="8" r="3.4" stroke="#2772CC" stroke-width="1.7"/><path d="M2.8 20c.7-3.4 3.2-5.2 6.2-5.2s5.5 1.8 6.2 5.2" stroke="#2772CC" stroke-width="1.7" stroke-linecap="round"/><circle cx="17" cy="9" r="2.6" stroke="#2772CC" stroke-width="1.7"/><path d="M15.6 14.9c2.8-.4 5.1 1.1 5.7 4" stroke="#2772CC" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  profile: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="10" stroke="#2772CC" stroke-width="1.7"/><circle cx="12" cy="9.4" r="3" stroke="#2772CC" stroke-width="1.7"/><path d="M5.8 19.2c1.2-2.8 3.5-4.1 6.2-4.1s5 1.3 6.2 4.1" stroke="#2772CC" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  settings: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="#244F84" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.63.28 1.1.84 1.26 1.51H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="#244F84" stroke-width="1.5"/></svg>`,
  logout: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24"><path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" stroke="#2772CC" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/service-provider", icon: ICONS.dashboard },
  {
    label: "Bookings",
    href: "/service-provider/bookings",
    badge: 10,
    icon: ICONS.bookings,
  },
  {
    label: "Service Management",
    href: "/service-provider/service-management",
    icon: ICONS.service,
  },
  {
    label: "Customer Insights",
    href: "/service-provider/customer-insight",
    badge: 4,
    icon: ICONS.customers,
  },
  { label: "Profile", href: "/service-provider/profile", icon: ICONS.profile },
  {
    label: "Settings",
    href: "/service-provider/settings",
    icon: ICONS.settings,
  },
];

export default function ProviderSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - fixed left, slides in on mobile (matches HTML aside) */}
      <aside className="fixed left-0 top-0 z-[10000] flex h-screen w-[min(280px,100vw)] sm:w-[300px] -translate-x-full flex-col overflow-y-auto overflow-x-hidden border-r border-[#edf1f5] bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Logo + mobile close */}
        <div className="flex min-h-[88px] items-center px-[26px] sm:px-[36px] pb-[18px] pt-[16px]">
          <Link href="/" className="block">
            {/* Exact sizing classes from the HTML sidebar */}
            <Image
              src={logoImg}
              alt="FIXNOW logo"
              width={120}
              height={60}
              className="w-[105px] min-[375px]:w-[115px] sm:w-[120px] shrink-0 object-contain"
              priority
            />
          </Link>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="ml-auto flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] text-[#244F84] transition-all duration-200 hover:bg-[#f0f9fe] hover:text-[#2772CC] lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Navigation - active item gets blue pill (driven by pathname) */}
        <nav className="min-w-0 flex-1 px-[18px] sm:px-[26px]">
          <ul className="space-y-[18px] sm:space-y-[24px] pb-[50px] sm:pb-[80px]">
            {NAV_ITEMS.map((item) => {
              // Exact match for dashboard, prefix match for sub-routes
              const isActive =
                item.href === "/service-provider"
                  ? pathname === "/service-provider"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex h-[60px] sm:h-[64px] min-w-0 items-center rounded-[15px] px-[14px] sm:px-[15px] text-[14px] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#f0f9fe] font-semibold text-[#2772cc] shadow-[0_5px_18px_rgba(39,114,204,0.14)]"
                        : "text-color5 hover:bg-[#f0f9fe] hover:shadow-[0_5px_18px_rgba(39,114,204,0.14)]"
                    }`}
                  >
                    <span
                      className="mr-[14px] sm:mr-[16px] shrink-0 [&_svg]:h-6 [&_svg]:w-6"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                    <span>{item.label}</span>
                    {/* Badge (Bookings / Insights counts) - static now */}
                    {typeof item.badge === "number" && (
                      <span className="ml-auto flex items-center justify-center rounded-[45px] bg-[#45a5ec] px-[8px] py-[4px] text-[12px] font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}

            {/* Log Out - wired to auth store later (see STEP 3 in guide) */}
            <li>
              <button
                type="button"
                onClick={() => toast("Logout will be wired to the auth store.")}
                className="flex h-[60px] sm:h-[64px] min-w-0 w-full items-center rounded-[15px] px-[14px] sm:px-[15px] text-left text-[14px] font-medium text-color5 transition-all duration-300 hover:bg-[#f0f9fe] hover:shadow-[0_5px_18px_rgba(39,114,204,0.14)]"
              >
                <span
                  className="mr-[14px] sm:mr-[16px] shrink-0 [&_svg]:h-6 [&_svg]:w-6"
                  dangerouslySetInnerHTML={{ __html: ICONS.logout }}
                />
                Log Out
              </button>
            </li>
          </ul>
        </nav>

        {/* Help / support card at bottom (from HTML) */}
        <div className="px-[36px] pb-[80px]">
          <div className="relative overflow-hidden rounded-[15px] bg-[#F0F9FE] px-[20px] py-[14px]">
            {/* Headset icon */}
            <div className="relative mb-[12px]">
              <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
                <path
                  d="M33 28v-8a13 13 0 1 0-26 0v8m26 0a4 4 0 0 1-4 4h-2v-10h2a4 4 0 0 1 4 4v2Zm-26 0v2a4 4 0 0 0 4 4h2V24h-2a4 4 0 0 0-4 4Z"
                  stroke="#3089E0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="relative text-[15px] font-bold text-color4">
              Need Assistance?
            </p>
            <p className="relative mt-[8px] max-w-[214px] text-[14px] leading-[1.45] text-color1">
              Contact Our Support Team Anytime For Quick Help.
            </p>
            <Link
              href="/contact"
              className="relative mt-[20px] inline-block rounded-[20px] border-[1.5px] border-color4 bg-transparent px-[30px] py-[10px] text-[12px] font-semibold text-color4 transition-all duration-300 hover:border-color-15 hover:bg-color-15 hover:text-white"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

// Small helper so the logout button compiles before wiring the store
function toast(message: string) {
  if (typeof window !== "undefined") {
    import("sonner").then(({ toast }) => toast(message));
  }
}
