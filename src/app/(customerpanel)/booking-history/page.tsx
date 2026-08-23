"use client";

// src/app/(customerpanel)/booking-history/page.tsx
// ================================================================
// BOOKING HISTORY  (route: /booking-history)
// ----------------------------------------------------------------
// Converted 1:1 from FIX_Now_HTML/FIX_Now/booking-history.html
// (body section). Uses the project's Tailwind theme tokens
// (globals.css @theme) and the gradient-btn status pills from
// css/booking-history.css (copied into globals.css).
//
// Currently STATIC — all bookings are hardcoded below.
// See the DYNAMIC GUIDE right under this block to learn how a
// beginner would wire this page to the real backend.
// ================================================================

import React from "react";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import {
  allBookingsIcon,
  inProgressIcon,
  upcomingIcon,
  completedIcon,
  cancelledIcon,
} from "./booking-history-assets";

import avtFrame528 from "@/assets/images/booking-history/Frame 528.png";
import avtDetails from "@/assets/images/booking-history/details.png";
import avtDetails2 from "@/assets/images/booking-history/details2.png";
import avtDetails3 from "@/assets/images/booking-history/details3.png";
import avtDetails4 from "@/assets/images/booking-history/details4.png";

/* ============================================================
   HOW TO MAKE THIS PAGE DYNAMIC (beginner guide)
   ============================================================
   Matching API endpoint (FixNow docs):
     GET {{base_url}}/customer/bookings?page=1&per_page=10
     Authorization: Bearer <customer token>

   Response shape:
   {
     success: true,
     data: [
       {
         id: 1,
         booking_number: "FXN-12345",
         booking_date: "2025-05-18",
         booking_time: "11:00",
         status: "confirmed",          // confirmed | in_progress |
                                       // completed | cancelled
         address: { id, label, city, state },
         services_count: 2,
         summary: { subtotal, service_charge, tax, discount, total }
       }
     ],
     pagination: { current_page, per_page, total, last_page }
   }

   STEP 1 - Create an API function in:
            src/api/api-function/bookings.function.ts

            export const fetchCustomerBookingsFn = async (
              page = 1
            ) => {
              try {
                const res = await axios.get(
                  `${BASE_URL}/customer/bookings?page=${page}`,
                  { headers: { Authorization: `Bearer ${getCookie("token")}` } }
                );
                return res.data; // { success, data, pagination }
              } catch {
                return { success: false, message: "Failed to load bookings" };
              }
            };

   STEP 2 - Create a React Query hook in src/hooks/useBookings.ts

            export const useCustomerBookings = (page: number) =>
              useQuery({
                queryKey: ["customer-bookings", page],
                queryFn: () => fetchCustomerBookingsFn(page),
              });

   STEP 3 - Inside this page call the hook and map over results:

            const [page, setPage] = useState(1);
            const { data, isLoading } = useCustomerBookings(page);
            if (isLoading) return <Loader />;
            const bookings: Booking[] = data?.data ?? [];

            Then render: {bookings.map(b => <BookingCard key={b.id} ... />)}

   STEP 4 - Sidebar filters become real filtering:

            const [activeFilter, setActiveFilter] =
              useState("all"); // all | in_progress | upcoming | ...
            // Option A (simple): filter client-side
            const visible = bookings.filter(b =>
              activeFilter === "all" ? true : b.status === activeFilter);
            // Option B (server-side): pass ?status=... to the API
            // and invalidate/refetch on filter change.

   STEP 5 - Status pill + date column depend on status:

            const statusStyles: Record<string, string> = {
              confirmed:    "gradient-btn text-[#D97706]",  // Upcoming
              in_progress:  "gradient-btn1 text-color4",    // Ongoing
              completed:    "gradient-btn2 text-white",     // Completed
              cancelled:    "gradient-btn3 text-white",     // Cancelled
            };
            const label = statusTextMap[b.status]; // e.g. "Upcoming"
            const isCancelled = b.status === "cancelled";
            const dateLabel = isCancelled ? "Booking Status" : "Arriving On";

   STEP 6 - Profile header (name/email/avatar) comes from
            GET {{base_url}}/auth/me -> data.name, data.email, data.avatar.
            Use the existing useAuthStore() instead of hardcoding.

   STEP 7 - Pagination footer (not in HTML yet):
            Use data.pagination.last_page to render page buttons
            exactly like AgriLink does in farmer/inventory/page.tsx.

   NOTE: The "View Booking" button already links to the real
   /booking-details route. When that page becomes dynamic
   ([id] folder), change the Link to:
        href={`/booking-details/${b.id}`}
   ============================================================ */

/* ---------- STATIC MOCK DATA ----------
   Replace this whole array with the hook result (STEP 3).
   Field names intentionally mirror the API response above so the
   swap is mostly renaming, not rewriting. */
const mockBookings = [
  {
    id: 1,
    name: "Ravi Kumar",
    role: "AC Technician",
    avatar: avtDetails,
    rating: 4.9,
    status: "confirmed", // renders as "Upcoming"
    service: "Split AC General Service",
    payment: "Paid Via UPI",
    dateLabel: "Arriving On",
    date: "18th May 2025",
    time: "11 AM",
    isCancelled: false,
    /* This is the ONLY card whose View Booking button navigates
       somewhere real - matching the original HTML which pointed at
       booking-details.html. Others keep "#" until their detail
       pages exist. */
    detailsHref: "/booking-details",
  },
  {
    id: 2,
    name: "Pooja Mehta",
    role: "Beautician",
    avatar: avtDetails2,
    rating: 4.9,
    status: "in_progress", // renders as "Ongoing"
    service: "Party Makeup",
    payment: "Pay on Completion",
    dateLabel: "Today",
    date: "1st May 2025",
    time: "11 AM",
    isCancelled: false,
    detailsHref: "#",
  },
  {
    id: 3,
    name: "Sanjay Mehta",
    role: "House Cleaning Expert",
    avatar: avtDetails3,
    rating: 4.9,
    status: "completed",
    service: "Deep Kitchen Cleaning",
    payment: "Paid Via UPI",
    dateLabel: "Arriving On",
    date: "18th April 2025",
    time: "10 AM",
    isCancelled: false,
    detailsHref: "#",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Carpenter",
    avatar: avtDetails4,
    rating: 4.9,
    status: "cancelled",
    service: "Wooden Door Repair",
    payment: "Refund Initiated",
    dateLabel: "Booking Status",
    date: "Cancelled",
    time: undefined,
    isCancelled: true, // makes the big date text red (#DC2626)
    detailsHref: "#",
  },
];

/* Status -> Tailwind classes for the gradient pill.
   Dynamic version of this lives in STEP 5 above. */
const statusStyles: Record<string, string> = {
  confirmed: "gradient-btn text-[#D97706]",
  in_progress: "gradient-btn1 text-color4",
  completed: "gradient-btn2 text-color2",
  cancelled: "gradient-btn3 text-color2",
};

const statusLabels: Record<string, string> = {
  confirmed: "Upcoming",
  in_progress: "Ongoing",
  completed: "Completed",
  cancelled: "Cancelled",
};

const Svg = ({ html }: { html: string }) => (
  <span dangerouslySetInnerHTML={{ __html: html }} />
);

/* Gold star used in every booking-card rating row */
const Star = () => (
  <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-color-16" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.845 1.548 8.254L12 18.896 4.516 23.405l1.548-8.254L0 9.306l8.332-1.151z" />
  </svg>
);

interface BookingCardProps {
  img: string | StaticImageData;
  imgAlt?: string;
  name: string;
  role: string;
  rating?: number;
  statusClass: string;
  statusText: string;
  service: string;
  payment: string;
  dateLabel: string;
  date: string;
  time?: string;
  redDate?: boolean;
  /* Where the View Booking button goes.
     "#" = placeholder; real pages pass "/booking-details/{id}". */
  detailsHref?: string;
}

/* One booking card: provider profile + status pill + booking details */
const BookingCard = ({
  img,
  imgAlt = "",
  name,
  role,
  statusClass,
  statusText,
  service,
  payment,
  dateLabel,
  date,
  time,
  redDate = false,
  detailsHref = "#",
}: BookingCardProps) => (
  <div className="w-full rounded-[26px] border border-color11 p-4 sm:p-5 md:p-6 shadow-[inset_0_2px_13.7px_0_#E5E7EB] mt-[16px]">
    {/* TOP PROFILE */}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start">
        <img
          src={typeof img === "string" ? img : img.src}
          alt={imgAlt}
          loading="lazy"
          className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[70px] md:h-[70px] rounded-full object-cover shrink-0"
        />
        <div className="ml-3 sm:ml-4">
          <h3 className="font-outfit font-semibold text-color6 text-[16px] sm:text-[18px] lg:text-[20px]">
            {name}
          </h3>
          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-color1 font-albert">
            {role}
          </p>
          {/* Rating row */}
          <div className="flex items-center mt-1">
            <Star />
            <span className="ml-1 text-[14px] sm:text-[16px] md:text-[18px] text-color9 font-medium font-outfit">
              4.9
            </span>
          </div>
        </div>
      </div>

      {/* Gradient status pill (class comes from statusStyles map) */}
      <a
        href="#"
        className={`${statusClass} self-start mt-3 sm:mt-0 capitalize text-[9px] sm:text-[11px] md:text-[12px] lg:text-[16px] font-medium font-albert inline-block`}
      >
        {statusText}
      </a>
    </div>

    {/* BOOKING DETAILS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-6">
      {/* Service */}
      <div>
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1">
          Type Of Service
        </p>
        <h4 className="mt-1 font-semibold text-color6 font-outfit text-[14px] sm:text-[16px] lg:text-[20px] leading-[20px] sm:leading-[24px] lg:leading-[28px]">
          {service}
        </h4>
      </div>

      {/* Payment */}
      <div>
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1">
          Payment Type
        </p>
        <h4 className="mt-1 font-semibold text-color6 font-outfit text-[14px] sm:text-[16px] lg:text-[20px] leading-[20px] sm:leading-[24px] lg:leading-[28px]">
          {payment}
        </h4>
      </div>

      {/* Date column - turns RED when booking was cancelled */}
      <div className="text-left sm:col-span-2 lg:col-span-1 lg:text-right">
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1">
          {dateLabel}
        </p>
        <h4
          className={`mt-1 font-bold font-outfit text-[20px] sm:text-[25px] md:text-[30px] lg:text-[34px] leading-[26px] sm:leading-[32px] lg:leading-[40px] ${
            redDate ? "text-[#DC2626]" : "text-color4"
          }`}
        >
          {date}
        </h4>
        {time && (
          <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium font-albert text-color9">
            {time}
          </p>
        )}
      </div>
    </div>

    {/* ADDRESS + BUTTON */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mt-6 sm:mt-7 md:mt-8">
      {/* Address - dynamic later: b.address.label + city + state */}
      <div className="w-full lg:w-auto">
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1 mb-1 sm:mb-2">
          Address
        </p>
        <h4 className="w-full lg:max-w-[520px] text-[14px] sm:text-[16px] md:text-[18px] leading-[22px] sm:leading-[25px] md:leading-[28px] text-color9 font-outfit font-semibold">
          Flat 502 Lake View Apartments,<br className="hidden sm:block" />
          Dumdum Park, Kolkata, West Bengal 700131
        </h4>
      </div>

      {/* View Booking - Card 1 links to the REAL /booking-details page
          (same connection as the HTML's booking-details.html link) */}
      <div className="w-full lg:w-auto mt-5 lg:mt-0">
        <Link
          href={detailsHref}
          className="w-full sm:w-auto lg:min-w-[180px] px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full border-2 border-color4 text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-color4 hover:bg-color4 hover:text-white transition inline-flex items-center justify-center"
        >
          View Booking
        </Link>
      </div>
    </div>
  </div>
);

/* Sidebar filter row: icon + label.
   Dynamic later (STEP 4): wrap in <button onClick={() => setActiveFilter(...)}>
   and highlight the active one with a background color. */
const FilterRow = ({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => (
  <button
    type="button"
    className="w-full min-h-[72px] lg:h-[99px] px-[16px] sm:px-[20px] lg:px-[24px] py-[20px] sm:py-[24px] lg:py-[36px] bg-white flex items-center border-b-2 border-[#9CA3AF] cursor-pointer hover:bg-color-14 transition-colors text-left"
  >
    <Svg html={icon} />
    <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-outfit font-semibold text-color9 ms-[14px] sm:ms-[18px] lg:ms-[24px] break-words">
      {label}
    </p>
  </button>
);

export default function BookingHistoryPage() {
  return (
    <section className="booking-history py-[100px]">
      <div className="max-w-[1350px] mx-auto px-[15px]">
        {/* ============ Breadcrumb ============
            Dynamic later: last crumb can show active filter name */}
        <div className="flex mt-[12px] mb-[72px]">
          <Link
            href="/profile-details"
            className="text-[#99D7F7] text-[18px] font-albert font-semibold"
          >
            Profile
          </Link>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="#99D7F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <a
            href="#"
            className="text-[#265DA7] text-[18px] font-albert font-semibold"
          >
            Booking History
          </a>
        </div>

        {/* ============ Main Grid ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full rounded-[26px] border border-[#9CA3AF] py-[34px] px-[10px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          {/* ============ LEFT SIDEBAR ============
              Profile header is hardcoded now -> use useAuthStore()
              (STEP 6) so the logged-in user's info appears here */}
          <div className="lg:col-span-4 w-full min-h-0 lg:min-h-[1344px] border-b-2 lg:border-r-2 border-[#9CA3AF] rounded-[18px] sm:rounded-[22px] lg:rounded-[26px]">
            {/* Profile header */}
            <div className="w-full min-h-[110px] lg:h-[138px] bg-color17 border-b-2 border-[#9CA3AF] py-[20px] sm:py-[26px] lg:py-[34px] px-[16px] sm:px-[20px] lg:px-[10px] flex items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
              <figure>
                <img
                  src={avtFrame528.src}
                  alt=""
                  className="w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] lg:w-[70px] lg:h-[70px] shrink-0"
                />
              </figure>
              <div className="ms-[14px] sm:ms-[18px] lg:ms-[24px] min-w-0">
                <p className="text-[17px] sm:text-[19px] lg:text-[20px] font-outfit font-semibold text-color9 break-words">
                  Rajesh Kummar
                </p>
                <p className="mt-[5px] text-[13px] sm:text-[14px] lg:text-[16px] break-all">
                  Rajeshkumar09@gmail.com
                </p>
              </div>
            </div>

            {/* Filter menu rows - labels kept EXACTLY as the HTML source
                ("completed" and "cancelled/Rescheduled" lowercase on purpose) */}
            <FilterRow icon={allBookingsIcon} label="All Bookings" />
            <FilterRow icon={inProgressIcon} label="In Progress" />
            <FilterRow icon={upcomingIcon} label="Upcoming" />
            <FilterRow icon={completedIcon} label="completed" />
            <FilterRow icon={cancelledIcon} label="cancelled/Rescheduled" />
          </div>

          {/* ============ RIGHT SIDE ============
              Static cards below -> replace with
              {visibleBookings.map(b => (...))} after wiring the hook */}
          <div className="lg:col-span-8 w-full">
            {/* CARD 1 - Upcoming. First card has NO top margin in the HTML */}
            <BookingCard
              img={avtDetails}
              imgAlt=""
              name="Ravi Kumar"
              role="AC Technician"
              statusClass={statusStyles.confirmed}
              statusText={statusLabels.confirmed}
              service="Split AC General Service"
              payment="Paid Via UPI"
              dateLabel="Arriving On"
              date="18th May 2025"
              time="11 AM"
              detailsHref="/booking-details"
            />

            {/* CARD 2 - Ongoing */}
            <BookingCard
              img={avtDetails2}
              imgAlt="details2"
              name="Pooja Mehta"
              role="Beautician"
              statusClass={statusStyles.in_progress}
              statusText={statusLabels.in_progress}
              service="Party Makeup"
              payment="Pay on Completion"
              dateLabel="Today"
              date="1st May 2025"
              time="11 AM"
            />

            {/* CARD 3 - Completed */}
            <BookingCard
              img={avtDetails3}
              imgAlt="details3"
              name="Sanjay Mehta"
              role="House Cleaning Expert"
              statusClass={statusStyles.completed}
              statusText={statusLabels.completed}
              service="Deep Kitchen Cleaning"
              payment="Paid Via UPI"
              dateLabel="Arriving On"
              date="18th April 2025"
              time="10 AM"
            />

            {/* CARD 4 - Cancelled (big date text turns red via redDate) */}
            <BookingCard
              img={avtDetails4}
              imgAlt="details4"
              name="Vikram Singh"
              role="Carpenter"
              statusClass={statusStyles.cancelled}
              statusText={statusLabels.cancelled}
              service="Wooden Door Repair"
              payment="Refund Initiated"
              dateLabel="Booking Status"
              date="Cancelled"
              redDate
            />
          </div>
        </div>
      </div>
    </section>
  );
}
