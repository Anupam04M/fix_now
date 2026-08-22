"use client";

// src/app/(customerpanel)/booking-history/page.tsx
// ================================================================
// BOOKING HISTORY  (route: /booking-history)
// ----------------------------------------------------------------
// Converted 1:1 from FIX_NowHtml/FIX_Now/booking-history.html
// (body section, lines 331-1322). Uses the project's Tailwind theme
// tokens (globals.css @theme) and the gradient-btn status pills from
// css/booking-history.css (added to globals.css). Static page — the
// sidebar filters render but have no JS behavior, matching the HTML.
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

const Svg = ({ html }: { html: string }) => (
  <span dangerouslySetInnerHTML={{ __html: html }} />
);

// Gold star used in the booking-card rating rows
const Star = () => (
  <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-color-16" viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.845 1.548 8.254L12 18.896 4.516 23.405l1.548-8.254L0 9.306l8.332-1.151z" />
  </svg>
);

// One booking card: provider profile + status pill + booking details
const BookingCard = ({
  img,
  imgAlt,
  name,
  role,
  statusClass,
  statusText,
  service,
  payment,
  dateLabel,
  date,
  time,
  serviceClass = "font-semibold",
  paymentClass = "font-semibold",
  dateClass = "text-color4",
  dateTextClass = "text-color9",
  redDate = false,
}: {
  img: string | StaticImageData;
  imgAlt: string;
  name: string;
  role: string;
  statusClass: string;
  statusText: string;
  service: string;
  payment: string;
  dateLabel: string;
  date: string;
  time?: string;
  serviceClass?: string;
  paymentClass?: string;
  dateClass?: string;
  dateTextClass?: string;
  redDate?: boolean;
}) => (
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
          <div className="flex items-center mt-1">
            <Star />
            <span className="ml-1 text-[14px] sm:text-[16px] md:text-[18px] text-color9 font-medium font-outfit">
              4.9
            </span>
          </div>
        </div>
      </div>

      <a
        href="#"
        className={`${statusClass} self-start mt-3 sm:mt-0 capitalize text-[9px] sm:text-[11px] md:text-[12px] lg:text-[16px] font-medium font-albert inline-block`}
      >
        {statusText}
      </a>
    </div>

    {/* BOOKING DETAILS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-6">
      <div>
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1">
          Type Of Service
        </p>
        <h4
          className={`mt-1 ${serviceClass} text-color6 font-outfit text-[14px] sm:text-[16px] lg:text-[20px] leading-[20px] sm:leading-[24px] lg:leading-[28px]`}
        >
          {service}
        </h4>
      </div>

      <div>
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1">
          Payment Type
        </p>
        <h4
          className={`mt-1 ${paymentClass} text-color6 font-outfit text-[14px] sm:text-[16px] lg:text-[20px] leading-[20px] sm:leading-[24px] lg:leading-[28px]`}
        >
          {payment}
        </h4>
      </div>

      <div className="text-left sm:col-span-2 lg:col-span-1 lg:text-right">
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1">
          {dateLabel}
        </p>
        <h4
          className={`mt-1 font-bold ${dateClass} font-outfit text-[20px] sm:text-[25px] md:text-[30px] lg:text-[34px] leading-[26px] sm:leading-[32px] lg:leading-[40px] ${
            redDate ? "text-[#DC2626]" : ""
          }`}
        >
          {date}
        </h4>
        {time && (
          <p
            className={`text-[14px] sm:text-[16px] md:text-[18px] font-medium font-albert ${dateTextClass}`}
          >
            {time}
          </p>
        )}
      </div>
    </div>

    {/* ADDRESS + BUTTON */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mt-6 sm:mt-7 md:mt-8">
      <div className="w-full lg:w-auto">
        <p className="text-[12px] sm:text-[14px] md:text-[15px] text-color1 mb-1 sm:mb-2">
          Address
        </p>
        <h4 className="w-full lg:max-w-[520px] text-[14px] sm:text-[16px] md:text-[18px] leading-[22px] sm:leading-[25px] md:leading-[28px] text-color9 font-outfit font-semibold">
          Flat 502 Lake View Apartments,<br className="hidden sm:block" />
          Dumdum Park, Kolkata, West Bengal 700131
        </h4>
      </div>

      <div className="w-full lg:w-auto mt-5 lg:mt-0">
        <a
          href="#"
          className="w-full sm:w-auto lg:min-w-[180px] px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full border-2 border-color4 text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-color4 hover:bg-color4 hover:text-white transition inline-flex items-center justify-center"
        >
          View Booking
        </a>
      </div>
    </div>
  </div>
);

// Sidebar filter row: icon + label (mirrors the HTML menu items)
const FilterRow = ({
  icon,
  label,
  first = false,
}: {
  icon: string;
  label: string;
  first?: boolean;
}) => (
  <div
    className={`w-full min-h-[72px] lg:h-[99px] px-[16px] sm:px-[20px] lg:px-[24px] py-[20px] sm:py-[24px] lg:py-[36px] bg-white flex items-center border-b-2 border-[#9CA3AF] ${
      first ? "lg:min-h-[138px]" : ""
    }`}
  >
    <Svg html={icon} />
    <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-outfit font-semibold text-color9 ms-[14px] sm:ms-[18px] lg:ms-[24px] break-words capitalize">
      {label}
    </p>
  </div>
);

export default function BookingHistoryPage() {
  return (
    <section className="booking-history py-[100px]">
      <div className="max-w-[1350px] mx-auto px-[15px]">
        {/* ============ Breadcrumb ============ */}
        <div className="flex mt-[12px] mb-[72px]">
          <Link
            href="/"
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
          {/* ============ LEFT SIDEBAR ============ */}
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

            <FilterRow icon={allBookingsIcon} label="All Bookings" />
            <FilterRow icon={inProgressIcon} label="In Progress" />
            <FilterRow icon={upcomingIcon} label="Upcoming" />
            <FilterRow icon={completedIcon} label="completed" />
            <FilterRow icon={cancelledIcon} label="cancelled/Rescheduled" />
          </div>

          {/* ============ RIGHT SIDE ============ */}
          <div className="lg:col-span-8 w-full">
            {/* CARD 1 — Upcoming */}
            <div className="w-full rounded-[26px] border border-color11 p-4 sm:p-5 md:p-6 shadow-[inset_0_2px_13.7px_0_#E5E7EB]">
              <BookingCard
                img={avtDetails}
                imgAlt=""
                name="Ravi Kumar"
                role="AC Technician"
                statusClass="gradient-btn text-[#D97706]"
                statusText="Upcoming"
                service="Split AC General Service"
                payment="Paid Via UPI"
                dateLabel="Arriving On"
                date="18th May 2025"
                time="11 AM"
              />
            </div>

            {/* CARD 2 — Ongoing */}
            <BookingCard
              img={avtDetails2}
              imgAlt="details2"
              name="Pooja Mehta"
              role="Beautician"
              statusClass="gradient-btn1 text-color4"
              statusText="Ongoing"
              service="Party Makeup"
              payment="Pay on Completion"
              dateLabel="Today"
              date="1st May 2025"
              time="11 AM"
            />

            {/* CARD 3 — Completed */}
            <BookingCard
              img={avtDetails3}
              imgAlt="details3"
              name="Sanjay Mehta"
              role="House Cleaning Expert"
              statusClass="gradient-btn2 text-color2"
              statusText="Completed"
              service="Deep Kitchen Cleaning"
              payment="Paid Via UPI"
              dateLabel="Arriving On"
              date="18th April 2025"
              time="10 AM"
            />

            {/* CARD 4 — Cancelled */}
            <BookingCard
              img={avtDetails4}
              imgAlt="details4"
              name="Vikram Singh"
              role="Carpenter"
              statusClass="gradient-btn3 text-color2"
              statusText="Cancelled"
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