"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import providerImg from "@/assets/images/booking-details/provider-profile-image.png";

/* ============================================================
   STATIC MOCK DATA
   ------------------------------------------------------------
   This page is currently STATIC (hardcoded values).
   When the backend is ready, replace this object with real data
   fetched from the API (see DYNAMIC GUIDE below).

   Matching API endpoint (FixNow docs):
     GET {{base_url}}/customer/bookings/{{booking_id}}
   Response shape:
   {
     success: true,
     data: {
       booking: { id, booking_number, booking_date, booking_time },
       address: { id, label, contact_person, address: { line_1 ... } },
       services: [{ name, quantity, unit_price, subtotal }],
       summary: { subtotal, service_charge, tax, discount, total },
       status: { current: "confirmed", history: [...] }
     }
   }
   ============================================================ */
const bookingDetails = {
  bookingId: "1234567890",
  status: "Confirmed",
  provider: {
    name: "Rahul Sharma",
    title: "Certified AC Repair & Maintenance Technician",
    isVerified: true,
    rating: 4.9,
    successfulServices: 2500,
    experienceYears: 8,
  },
  service: {
    name: "Air Conditioner Repair",
    duration: "Duration 2hrs",
    address:
      "Flat 502, Lake View Apartments, Dumdum Park, Kolkata, West Bengal 7000131",
  },
  /* Timeline steps rendered with .map() - order comes straight from
     data so later you can drive it from booking.status.history */
  timelineSteps: [
    { label: "Service Completed", icon: "check" },
    { label: "Service Started", icon: "wrench" },
    { label: "Service On The Way", icon: "truck" },
    { label: "Service Booked", icon: "calendar" },
  ],
  schedule: {
    date: "18 May 2025, Sunday",
    time: "10:00 AM - 12:03 PM",
  },
  paymentRows: [
    { label: "Service Amount", value: 1499 },
    { label: "Convenience Fee", value: 30 },
    { label: "Taxes & Charges", value: 51, hasInfoIcon: true },
    { label: "Discount", value: 200, hasInfoIcon: true },
  ],
  totalAmount: 1479,
  savings: 200,
};

/* ============================================================
   HOW TO MAKE THIS PAGE DYNAMIC (beginner guide)
   ============================================================
   STEP 1 - API function in src/api/api-function/bookings.function.ts

            export const fetchBookingByIdFn = async (bookingId: string) => {
              const res = await axios.get(
                `${BASE_URL}/customer/bookings/${bookingId}`,
                { headers: { Authorization: `Bearer ${getCookie("token")}` } }
              );
              return res.data;
            };

   STEP 2 - Hook in src/hooks/useBookings.ts

            export const useBookingDetails = (bookingId: string) =>
              useQuery({
                queryKey: ["booking-details", bookingId],
                queryFn: () => fetchBookingByIdFn(bookingId),
                enabled: !!bookingId,
              });

   STEP 3 - Make route dynamic: rename folder to [id]/
            then read params and call the hook:

            const { id } = await params;
            const { data, isLoading } = useBookingDetails(id);
            if (isLoading) return <Loader />;

            Then swap every bookingDetails.x with fields coming from
            data.data.booking / .address / .services / .summary.

   STEP 4 - Action buttons become mutations:

            - Cancel      -> PATCH /customer/bookings/{id}/cancel
                             body: { remarks }  (see FixNow API docs)
            - Reschedule  -> PATCH endpoint when backend adds it
            - Contact Support -> open chat widget / support modal

            export const useCancelBooking = () =>
              useMutation({
                mutationFn: cancelBookingFn,
                onSuccess: () => toast.success("Booking cancelled"),
              });

   STEP 5 - Timeline steps dynamically:
            Use data.status.history array -> map each entry to a step.
            Steps BEFORE current status = completed (green circle),
            steps AFTER = pending (gray circle). Example:

            const currentIndex = history.findIndex(s => s === current);
            // render circle color: idx <= currentIndex ? green : gray

   STEP 6 - Print Summary button:
            Call window.print() or generate PDF like AgriLink's
            src/utils/generateInvoice.ts (jsPDF + autotable).

   STEP 7 - Copy Booking ID already works below via navigator.clipboard.
            No change needed!
   ============================================================ */

export default function BookingDetailsPage() {
  /* ---------------- INTERACTIVE STATE ---------------- */
  // Feedback text shown briefly after clicking the copy icon.
  const [copied, setCopied] = useState(false);

  // Copies the booking number to clipboard using the browser API.
  // This part is ALREADY dynamic-friendly - no backend needed.
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(bookingDetails.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* ==================== BOOKING DETAILS SECTION ==================== */}
      <section className="bg-white pt-[12.5px] pb-[60px] min-[400px]:pb-[91.5px]">
        <div className="max-w-[1350px] mx-auto px-[10px] min-[400px]:px-[15px]">
          {/* ---------- Breadcrumb & Header ---------- */}
          <div className="mb-[48px]">
            {/* Breadcrumb trail: Profile > Booking History > Upcoming.
                Dynamic later: last crumb can show booking status instead */}
            <div className="flex flex-wrap items-center mb-[12.5px] text-[14px] sm:text-[16px] font-semibold text-color12">
              <Link href="/profile-details">
                <span>Profile</span>
              </Link>
              <svg
                className="mx-[10px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="#99D7F7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Link href="/booking-history">
                <span className="text-color4 hover:text-color12 transition-colors duration-300 cursor-pointer">
                  Booking History
                </span>
              </Link>
              <svg
                className="mx-[10px]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="#99D7F7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-color4 hover:text-color12 transition-colors duration-300 cursor-pointer">
                Upcoming
              </span>
            </div>

            {/* Booking ID + copy action + status badge */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[20px] sm:text-[24px] font-semibold text-black break-words">
                Booking ID : {bookingDetails.bookingId}
              </h1>

              {/* Copy button - uses navigator.clipboard (works without backend) */}
              <button onClick={handleCopyId} aria-label="Copy booking ID">
                <svg
                  className="w-[16px] h-[16px]"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  {/* Simple two-square copy icon (same visual as HTML design) */}
                  <rect
                    x="8"
                    y="8"
                    width="12"
                    height="12"
                    rx="2"
                    stroke="#1A3151"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
                    stroke="#1A3151"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {copied && (
                <span className="text-[12px] text-[#16A34A] font-semibold">
                  Copied!
                </span>
              )}

              {/* Status badge - green pill.
                  Dynamic later: color depends on booking.status.current
                  e.g. confirmed=green, cancelled=red, pending=amber */}
              <span className="inline-block bg-[#16A34A] rounded-full px-[18px] py-[6px] text-white capitalize text-[16px] font-semibold font-albert">
                Confirmed
              </span>
            </div>
          </div>

          {/* ---------- Provider Profile Card ---------- */}
          <div className="w-full bg-white rounded-[25px] border border-color11 p-[16px] sm:p-[20px] shadow-[inset_0_2px_13.7px_0_#E5E7EB] mb-[48px] flex flex-col gap-y-[24px]">
            {/* TOP ROW: profile info + action buttons */}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full">
              {/* LEFT: image, details, stats */}
              <div className="flex flex-col sm:flex-row items-start">
                {/* Avatar - dynamic: provider.avatar_url */}
                <Image
                  src={providerImg}
                  alt="profile-image"
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] rounded-full object-cover border-8 border-[#F3F4F6] mb-[15px] sm:mb-0 sm:mr-[10px]"
                />

                <div>
                  {/* Name + verified badge */}
                  <div className="flex flex-wrap items-center gap-y-[8px]">
                    <h2 className="text-[20px] font-semibold text-color10 font-outfit mr-[10px]">
                      Rahul Sharma
                    </h2>

                    {/* gradient-btn2 class = green pill (defined in globals.css) */}
                    <span className="gradient-btn2 text-white capitalize px-[10px] py-[6px] text-[14px] font-normal font-albert inline-flex items-center">
                      <svg
                        className="mr-[8px] shrink-0"
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        {/* Simple checkmark badge (same look as HTML design) */}
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="white"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <path
                          d="M6 10.2l2.6 2.6L14 7.4"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Verified Provider
                    </span>
                  </div>

                  <p className="mt-[10px]">
                    Certified AC Repair &amp; Maintenance Technician
                  </p>

                  {/* Stats row: rating | services | experience */}
                  <div className="flex flex-wrap items-center mt-[26px] gap-y-[16px]">
                    {/* STAT 1 : rating with star icon */}
                    <div className="shrink-0">
                      <h3 className="flex items-center gap-[4px] font-bold mb-[10px] text-[16px] sm:text-[20px] lg:text-[24px] text-color10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                            fill="#FFC106"
                          />
                        </svg>
                        4.9
                      </h3>
                      <p className="text-[10px] sm:text-[14px] w-[75px] sm:w-[125px]">
                        Average Customer Rating
                      </p>
                    </div>

                    {/* STAT 2 : left gradient border divider (border-image trick) */}
                    <div className="flex-shrink-0 border-l-2 [border-image:linear-gradient(to_bottom,rgb(240,249,254)_1%,rgb(48,137,224)_47%,rgb(240,249,254)_100%)_1] pl-[8px] sm:pl-[20px] lg:pl-[34px] ml-[4px] sm:ml-[10px]">
                      <h3 className="font-bold mb-[10px] text-[16px] sm:text-[20px] lg:text-[24px] text-color10">
                        2,500+
                      </h3>
                      <p className="text-[10px] sm:text-[14px] w-[75px] lg:w-[125px]">
                        Successful Services
                      </p>
                    </div>

                    {/* STAT 3 */}
                    <div className="flex-shrink-0 border-l-2 [border-image:linear-gradient(to_bottom,rgb(240,249,254)_1%,rgb(48,137,224)_47%,rgb(240,249,254)_100%)_1] pl-[8px] sm:pl-[20px] lg:pl-[34px] ml-[4px] sm:ml-[10px]">
                      <h3 className="font-bold mb-[10px] text-[16px] sm:text-[20px] lg:text-[24px] text-color10">
                        8+ Years
                      </h3>
                      <p className="text-[10px] sm:text-[14px] w-[80px] lg:w-[145px]">
                        Of Industry Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: message & call round buttons */}
              <div className="flex items-start mt-6 lg:mt-0">
                {/* Message button - dynamic later: opens chat widget */}
                <button
                  className="w-10 h-10 rounded-full border border-color5 flex items-center justify-center text-[#030712] hover:bg-color-15 hover:text-white hover:border-color-15 transition-all duration-300 ease-in-out mr-[16px]"
                  aria-label="Message"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
                {/* Call button - dynamic later: href={`tel:${provider.phone}`} */}
                <button
                  className="w-10 h-10 rounded-full border border-color5 flex items-center justify-center text-[#030712] hover:bg-color-15 hover:text-white hover:border-color-15 transition-all duration-300 ease-in-out"
                  aria-label="Call"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* BOTTOM ROW: view profile link */}
            <div className="flex justify-end w-full mt-[10px] sm:mt-0">
              <button
                type="button"
                className="group inline-flex items-center text-color4 text-[16px] font-semibold hover:text-color-15 transition-colors duration-300 ease-in-out"
              >
                View Profile
                <svg
                  className="w-4 h-4 ml-[10px] transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ---------- Grid: LEFT details + RIGHT summary ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-0">
            {/* ============ LEFT COLUMN ============ */}
            <div className="lg:col-span-5 lg:pr-[24px]">
              {/* Card: Service Details (name + duration + address) */}
              <div className="bg-white rounded-[25px] border border-color11 p-[16px] min-[400px]:p-[32px] shadow-[inset_0_2px_13.7px_0_#E5E7EB] mb-[24px]">
                <h3 className="text-[20px] font-semibold font-outfit text-[#111827] mb-[24.96px]">
                  Service Details
                </h3>

                {/* Row 1: service name + duration */}
                <div className="flex flex-wrap items-start justify-between gap-y-[12px] mb-4">
                  <div className="flex items-start">
                    <div className="text-color10 mt-1 mr-[24px]">
                      {/* Wrench/service tool icon */}
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      {/* Dynamic later: services[0].name */}
                      <h4 className="font-medium text-[16px] text-[#374151]">
                        Air Conditioner Repair
                      </h4>
                    </div>
                  </div>

                  <div className="text-right text-[14px] text-color9 flex max-[399px]:ml-[48px]">
                    <svg
                      className="mr-[13.5px] shrink-0"
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                    >
                      {/* Clock icon */}
                      <circle
                        cx="11.5"
                        cy="11.5"
                        r="10.5"
                        stroke="#1A3151"
                        strokeWidth="2"
                      />
                      <path
                        d="M11.5 5.67V11.5h5.83"
                        stroke="#1A3151"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="w-[50px]">Duration 2hrs</span>
                  </div>
                </div>

                {/* Row 2: service address with location pin icon */}
                <div className="flex items-start">
                  <div className="text-color10 mt-[24.96px] mr-[24px] shrink-0">
                    {/* Location pin icon */}
                    <svg width="24" height="30" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"
                        stroke="#1A3151"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="#1A3151"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[16px] text-black">
                      Service Address
                    </h4>
                    <p className="text-[14px] text-color1 mt-[21.5px]">
                      Flat 502, Lake View Apartments, Dumdum Park, Kolkata, West
                      Bengal 7000131
                    </p>
                  </div>
                </div>
              </div>

              {/* Card: Timeline Tracking.
                  The vertical line is drawn by the ::before pseudo-element
                  on this wrapper (before:absolute before:bg-[#B9FFD3]).
                  Dynamic later: loop over data.status.history and compare
                  each step index with the current status index - past steps
                  keep the green (#B9F3B6) circle, future steps turn gray. */}
              <div className="bg-white rounded-[26px] border border-color11 px-[12px] min-[400px]:px-[20px] py-[20px] min-[400px]:py-[28px] shadow-[inset_0_2px_13.7px_0_#E5E7EB] mb-[24px]">
                <div className="relative pl-[10px] space-y-6 before:absolute before:left-[38px] min-[400px]:before:left-[43px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[#B9FFD3]">
                  {bookingDetails.timelineSteps.map((step) => (
                    <div
                      key={step.label}
                      className="relative flex items-center space-x-[8px] min-[400px]:space-x-4"
                    >
                      {/* Green circle marker - z-10 keeps it above the line */}
                      <span className="relative z-10 flex-shrink-0 w-[56px] h-[56px] min-[400px]:w-[70px] min-[400px]:h-[70px] rounded-full bg-[#B9F3B6] flex items-center justify-center">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            fill="#00BA00"
                            opacity="0.15"
                          />
                          <circle cx="12" cy="12" r="8" fill="#00BA00" />
                          <path
                            d="M8 12.2l2.6 2.6L16 9.4"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <div className="ml-0 min-[400px]:ml-[20px]">
                        <h4 className="text-[16px] font-semibold text-color9 mb-[5px]">
                          {step.label}
                        </h4>
                        {/* Small dash under each title (matches HTML) */}
                        <p className="text-[14px] text-[#4A4F55]">
                          <svg
                            className="w-3 h-3 inline-block"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card: Reschedule & Cancel buttons.
                  Static now -> dynamic later wire both to mutations
                  (see STEP 4 of the guide at top of file) */}
              <div className="bg-white rounded-[25px] border border-color11 p-[10px] shadow-[inset_0_2px_13.7px_0_#E5E7EB] mb-[24px]">
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-[10px] min-[400px]:gap-0">
                  {/* Reschedule button (blue outline) */}
                  <div className="min-[400px]:pr-[5px]">
                    <button className="w-full py-[16px] px-[16px] min-[360px]:px-[20px] min-[400px]:px-[36px] rounded-[20px] border border-color4 text-color4 text-[16px] font-semibold hover:bg-blue-50 transition flex items-center justify-center">
                      Reschedule
                      <svg
                        className="ml-[16px] min-[360px]:ml-[20px] min-[400px]:ml-[24px] shrink-0"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        {/* Calendar icon */}
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 2v4M8 2v4M3 10h18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Cancel button (red outline) */}
                  <div className="min-[400px]:pl-[5px]">
                    <button className="w-full py-[16px] px-[16px] min-[360px]:px-[20px] min-[400px]:px-[36px] rounded-[20px] border border-[#DC2626] text-[#DC2626] text-[16px] font-semibold flex items-center justify-center">
                      Cancel
                      <svg
                        className="ml-[16px] min-[360px]:ml-[20px] min-[400px]:ml-[24px] shrink-0"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M13 1L7 7m0 0L1 13M7 7L1 1m6 6l6 6"
                          stroke="#DC2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card: Need Help / Contact Support */}
              <div className="bg-white rounded-[25px] border border-color11 p-[16px] min-[400px]:p-[32px] shadow-[inset_0_2px_13.7px_0_#E5E7EB]">
                <h3 className="text-[20px] font-semibold font-outfit text-[#111827] mb-[13.5px]">
                  Need Help
                </h3>
                <p className="text-[14px] text-color1 mb-[13.5px]">
                  Our Support Team Is Here To Help You
                </p>
                <button className="w-full py-[16px] rounded-[20px] bg-color4 text-white text-[16px] font-semibold font-outfit hover:bg-color5 transition-colors duration-300 flex items-center justify-center">
                  Contact Support
                  <svg
                    className="ml-[24px]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    {/* Headset/support icon */}
                    <path
                      d="M3 18v-6a9 9 0 0118 0v6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <rect
                      x="3"
                      y="14"
                      width="4"
                      height="6"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="17"
                      y="14"
                      width="4"
                      height="6"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ============ RIGHT COLUMN: BOOKING SUMMARY ============ */}
            <div className="lg:col-span-7 lg:pl-[24px]">
              <div className="bg-white rounded-[25px] border border-color11 p-[16px] min-[400px]:p-[32px] shadow-[inset_0_2px_13.7px_0_#E5E7EB]">
                {/* Header + print link */}
                <div className="flex flex-wrap items-center justify-between mb-[32px]">
                  <h3 className="text-[20px] font-semibold font-outfit text-[#111827]">
                    Booking Summary
                  </h3>

                  {/* Print Summary.
                      Static now -> dynamic later: window.print() or jsPDF
                      invoice generation (STEP 6 of guide above) */}
                  <button
                    onClick={() => window.print()}
                    className="text-color4 text-[16px] font-semibold flex items-center transition-colors duration-300 hover:text-color-15"
                  >
                    Print Summary
                    <svg
                      className="ml-[10px]"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      {/* Printer icon */}
                      <path
                        d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="6"
                        y="14"
                        width="12"
                        height="8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>

                {/* Section 1: Service details summary */}
                <div className="flex items-start justify-between border-b border-gray-200 pb-[32px] mb-[24px]">
                  <div className="flex items-start">
                    <div className="text-color10 mr-[24px] shrink-0 mt-1">
                      {/* Location pin icon */}
                      <svg width="24" height="30" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="#1A3151"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[20px] text-black mb-[24px]">
                        Service Details
                      </h4>
                      {/* Dynamic later: address.line_1 + line_2 + city */}
                      <p className="text-[14px] text-color1 max-w-[300px] leading-relaxed">
                        Flat 502, Lake View Apartments, Dumdum Park, Kolkata,
                        West Bengal 7000131
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: date & time summary */}
                <div className="flex items-start justify-between border-b border-gray-200 pb-[32px] mb-[72px]">
                  <div className="flex items-start">
                    <div className="text-color10 mr-[24px] shrink-0 mt-1">
                      {/* Calendar icon */}
                      <svg width="24" height="27" viewBox="0 0 24 24" fill="none">
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="17"
                          rx="2"
                          stroke="#1A3151"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 2v4M8 2v4M3 9.5h18"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[20px] text-black mb-[24px]">
                        Date &amp; Time
                      </h4>
                      {/* Dynamic later: format booking.booking_date +
                          booking.booking_time with date-fns or toLocaleString */}
                      <p className="text-[14px] text-color1 max-w-[150px] leading-relaxed">
                        18 May 2025, Sunday 10:00 AM - 12:03 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: payment breakdown.
                    Rows mapped from bookingDetails.paymentRows -
                    dynamic later replace values with
                    summary.{subtotal, service_charge, tax, discount} */}
                <div className="flex items-start">
                  <div className="text-color10 mr-[24px] shrink-0 mt-1">
                    {/* Wallet/payment icon */}
                    <svg width="24" height="20" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="2"
                        y="5"
                        width="20"
                        height="14"
                        rx="2"
                        stroke="#1A3151"
                        strokeWidth="2"
                      />
                      <path d="M2 10h20" stroke="#1A3151" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[20px] text-black mb-[24px]">
                      Payment Details
                    </h4>

                    {bookingDetails.paymentRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between items-center mb-[26px]"
                      >
                        <span className="flex items-center text-[16px] leading-[24px] text-color1">
                          <p className="mr-[10px]">{row.label}</p>
                          {/* small "i" info icon for tax/discount rows */}
                          {row.hasInfoIcon && (
                            <svg
                              className="shrink-0"
                              width="18"
                              height="18"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <circle
                                cx="11"
                                cy="11"
                                r="10"
                                stroke="#9CA3AF"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M11 7.5v-.75M11 10.5V15"
                                stroke="#9CA3AF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </span>
                        {/* Rupee amount - ₹ glyph inside small svg-like span */}
                        <h4 className="font-bold text-[20px] text-black inline-flex items-center">
                          <span className="mr-[4px]">₹</span>
                          {row.value.toLocaleString("en-IN")}
                        </h4>
                      </div>
                    ))}

                    {/* Dashed divider before total */}
                    <div className="border-t border-dashed border-gray-300 mb-[42px]"></div>

                    {/* Grand total row */}
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[20px] text-black">
                        Total Amount
                      </h4>
                      <h4 className="font-bold text-[20px] text-black inline-flex items-center">
                        <span className="mr-[4px]">₹</span>
                        {bookingDetails.totalAmount.toLocaleString("en-IN")}
                      </h4>
                    </div>

                    {/* Savings banner */}
                    <div className="w-full py-[16px] rounded-[16px] bg-[#F0FAF3] border-2 border-[#16A34A] mt-[38px] font-medium flex items-center justify-center gap-[6px]">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="15"
                          stroke="#16A34A"
                          strokeWidth="2"
                        />
                        <path
                          d="M10 16.5l4 4 8-8"
                          stroke="#16A34A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="whitespace-nowrap text-[#16A34A] font-semibold">
                        You Saved
                      </span>
                      <span className="whitespace-nowrap text-[#16A34A] mx-[4px] font-semibold inline-flex items-center">
                        ₹{bookingDetails.savings}
                      </span>
                      <span className="whitespace-nowrap text-[#16A34A] font-semibold">
                        With FIXNOW
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
