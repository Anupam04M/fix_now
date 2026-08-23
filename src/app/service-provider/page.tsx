"use client";

// src/app/service-provider/page.tsx
// ================================================================
// PROVIDER DASHBOARD  (route: /service-provider)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to Fix_now-Dashboard-_backend_part/backend-index.html
// (same grid spans, same stacked-jobs visual, same tiny responsive
//  text sizes like text-[9px] lg:text-[11px], same -mt bottom row).
//
// ============================================================
// DATA FLOW  (read this before changing anything!)
// ============================================================
//   useProviderDashboard()          <-- src/hooks/useProviderDashboard.ts
//        |  one call, one payload
//        v
//   ProviderDashboardData           <-- types in provider.function.ts
//        |
//        +-- d.todayJobs      -> <TodaysJobs/>        (stacked card)
//        +-- d.currentBooking -> <CurrentBooking/>
//        +-- d.messages       -> <MessagesList/>
//        +-- d.availability   -> <AvailabilityCard/>
//        +-- calendar         -> <CalendarView/>       (static month grid)
//        +-- d.incomeSplit    -> <IncomeDonut/>        (SVG doughnut)
//        +-- d.ratingInsight  -> rating strip
//        +-- d.earningsWeekly -> <EarningsChart/>      (SVG line chart)
//
// CONVERT STATIC -> DYNAMIC IN 3 STEPS (any dev can do this):
//   STEP 1: open src/api/api-function/provider.function.ts
//   STEP 2: inside fetchProviderDashboardFn(), delete the mock return
//           and uncomment api.get("/provider/dashboard")
//   STEP 3: done. This page never changes - it already renders
//           whatever that function returns.
// ============================================================

import React from "react";
import Image from "next/image";

import { useProviderDashboard } from "@/hooks/useProviderDashboard";
import {
  TodayJob,
  ProviderDashboardData,
} from "@/api/api-function/provider.function";

/* Reusable card shadow from the HTML tailwind config (shadow-card) */
const CARD =
  "rounded-xl bg-white shadow-[0_4px_18px_rgba(28,61,92,.07)]";

export default function ProviderDashboardPage() {
  const { data: res, isLoading } = useProviderDashboard();

  /* Simple centered loader while the query resolves */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2772CC] border-t-transparent" />
      </div>
    );
  }

  /* Payload (mock today, API tomorrow) */
  const d = res?.data as ProviderDashboardData | undefined;

  if (!d) {
    return (
      <p className="p-8 text-center text-sm text-[#7A8796]">
        Unable to load dashboard. Please try again later.
      </p>
    );
  }

  return (
    <div>
      {/* ==================== TOP ROW ==================== */}
      {/* xl:grid-cols-12 split exactly like the HTML reference image */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
        <TodaysJobs jobs={d.todayJobs.items} completed={d.todayJobs.completed} total={d.todayJobs.total} />
        <CurrentBooking booking={d.currentBooking} />
        <MessagesAndAvailability messages={d.messages} availability={d.availability} />
        <RightRail income={d.incomeSplit} rating={d.ratingInsight} />
      </section>

      {/* ==================== BOTTOM ROW ====================
          The HTML pulls this up beside the right rail using a negative
          margin on >=1280px screens; kept identical here. */}
      <section className="mt-3 grid grid-cols-1 gap-3 xl:-mt-[140px] xl:grid-cols-12 xl:w-[calc(66.666667%-3.33px)]">
        <article className={`${CARD} p-3 sm:p-4 xl:col-span-12`}>
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h2 className="font-outfit text-[13px] font-semibold sm:text-[15px]">
                Weekly Earnings
              </h2>
              <p className="text-[10px] text-[#7A8796] lg:text-[11px]">
                Track Your Income For This Week
              </p>
            </div>
            <label className="flex items-center gap-1 text-[10px] text-[#7A8796]">
              <input type="checkbox" defaultChecked className="h-2.5 w-2.5 accent-[#2772CC]" />
              Earnings
            </label>
          </div>

          <div className="relative h-[200px] lg:h-[245px]">
            {/* SVG line chart fed by d.earningsWeekly */}
            <EarningsChart
              values={d.earningsWeekly.values}
              labels={d.earningsWeekly.labels}
            />
            {/* Total overlay card */}
            <div className="absolute bottom-1 left-0 rounded-xl bg-[#1A3151] px-5 py-4 text-white shadow-lg">
              <div className="font-outfit text-[17px] font-bold">
                ₹{d.earningsWeekly.total.toLocaleString("en-IN")}
              </div>
              <div className="text-[9px] text-white/70">
                Total Earnings{" "}
                <span className="font-semibold text-emerald-300">
                  +{d.earningsWeekly.growthPct}% This Week
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

/* ================================================================
   SECTION COMPONENTS
   Each takes typed props so you can SEE which payload field feeds it.
   ================================================================ */

/* ---------- TODAY'S JOBS ----------
   props.jobs     <- d.todayJobs.items
   props.completed<- d.todayJobs.completed
   props.total    <- d.todayJobs.total                              */
function TodaysJobs({
  jobs,
  completed,
  total,
}: {
  jobs: TodayJob[];
  completed: number;
  total: number;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl bg-white shadow-[0_4px_18px_rgba(28,61,92,.07)] xl:col-span-3">
      {/* Stacked-cards decoration (three layers behind main card) */}
      <div className="absolute left-4 right-4 top-2 h-8 rounded-lg bg-[#B9E4F8]" />
      <div className="absolute left-5 right-5 top-5 h-9 rounded-lg bg-[#7DBEEA]" />
      <div className="absolute left-6 right-6 top-8 h-10 rounded-lg bg-[#2C6EAF]" />

      <div className="relative mx-6 mb-5 mt-12 rounded-lg bg-[#163B63] p-3 text-white shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-outfit text-[14px] font-semibold">Today&apos;s Jobs</h2>
          <span className="text-[12px] font-semibold text-white/80">
            {completed}/{total}
          </span>
        </div>

        <div className="space-y-2.5">
          {jobs.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      </div>
    </article>
  );
}

/* One job line. Clicking the circle should PATCH completion later. */
function JobRow({ job }: { job: TodayJob }) {
  return (
    <div className="flex gap-2">
      <span
        className={`mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-white/40 text-[11px] leading-none text-white ${
          job.done ? "bg-white/20" : ""
        }`}
      >
        {job.done ? "✓" : ""}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold leading-tight">{job.name}</p>
        <p className="text-[10px] text-white/50">{job.time}</p>
      </div>
      <span className="ml-auto text-[11px] text-[#45A5EC]">●</span>
    </div>
  );
}

/* ---------- CURRENT BOOKING ----------
   prop.booking <- d.currentBooking                                */
function CurrentBooking({
  booking,
}: {
  booking: ProviderDashboardData["currentBooking"];
}) {
  return (
    <article className={`${CARD} p-3 xl:col-span-2`}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-outfit text-[13px] font-semibold text-[#1A3151]">
          Current Booking
        </h2>
        <span className="text-[9px] text-[#2772CC]">
          Booking ID: {booking.bookingId}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-1.5">
        <Image
          src="https://i.pravatar.cc/60?img=32"
          alt={booking.customerName}
          width={24}
          height={24}
          className="h-6 w-6 rounded-full object-cover"
          unoptimized
        />
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold">{booking.customerName}</p>
          <p className="truncate text-[9px] text-[#7A8796]">{booking.service}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
          {booking.status}
        </span>
      </div>

      <div className="space-y-1 text-[10px] text-[#7A8796]">
        <p className="flex items-center gap-1">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          {booking.time}
        </p>
        <p className="flex items-center gap-1">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {booking.location}
        </p>
      </div>

      {/* Map built straight from booking.mapQuery */}
      <div className="mt-2 h-[108px] overflow-hidden rounded-lg bg-slate-100">
        <iframe
          title={`${booking.location} Map`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            booking.mapQuery,
          )}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>

      <button className="mt-2 flex h-7 w-full items-center justify-center gap-1 rounded-full bg-[#2772CC] text-[11px] font-semibold text-white hover:bg-[#1A3151]">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
        Start Session
      </button>
    </article>
  );
}

/* ---------- MESSAGES + AVAILABILITY ----------
   props.messages     <- d.messages
   props.availability <- d.availability                          */
function MessagesAndAvailability({
  messages,
  availability,
}: {
  messages: ProviderDashboardData["messages"];
  availability: ProviderDashboardData["availability"];
}) {
  return (
    <div className="flex flex-col gap-3 xl:col-span-3">
      {/* Messages card */}
      <article className={`${CARD} p-3`}>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-outfit text-[13px] font-semibold">Messages</h2>
          <span className="cursor-pointer text-[13px] text-[#7A8796]" title="Refresh">
            ↻
          </span>
        </div>
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="flex gap-2">
              <Image
                src={`https://i.pravatar.cc/60?u=${m.id}`}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
                unoptimized
              />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between">
                  <b className="truncate text-[11px]">{m.sender}</b>
                  <span className="shrink-0 pl-1 text-right text-[9px] text-[#2772CC]">
                    {m.timeLabel}
                  </span>
                </div>
                <p className="text-[9px] text-[#7A8796]">{m.service}</p>
                <p className="truncate text-[10px] text-[#1A3151]/80">{m.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Availability card */}
      <article className={`${CARD} p-3`}>
        <h2 className="mb-2 font-outfit text-[13px] font-semibold">
          Availability Status
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] text-[#7A8796]">Current Status</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-1 text-[9px] font-semibold text-emerald-600">
              <i className="h-1 w-1 rounded-full bg-emerald-500" />
              {availability.status}
            </span>
            <p className="mt-1 text-[9px] leading-relaxed text-[#7A8796]">
              You are available to receive new booking requests.
            </p>
          </div>
          <div>
            <p className="text-[9px] text-[#7A8796]">Working Hours</p>
            <p className="mt-1 text-[10px] font-semibold">{availability.workingHours}</p>
            <p className="mt-2 text-[9px] text-[#7A8796]">Available Days</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {availability.allDays.map((day) => {
                const isOn = availability.availableDays.includes(day);
                return (
                  <span
                    key={day}
                    className={`rounded px-1.5 py-1 text-[9px] font-semibold ${
                      isOn
                        ? "bg-[#2772CC] text-white"
                        : "bg-[#F2F9FD] text-[#2772CC]"
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ---------- RIGHT RAIL ----------
   props.income <- d.incomeSplit
   props.rating <- d.ratingInsight                                  */
function RightRail({
  income,
  rating,
}: {
  income: ProviderDashboardData["incomeSplit"];
  rating: ProviderDashboardData["ratingInsight"];
}) {
  return (
    <div className="flex flex-col gap-3 xl:col-span-4 xl:row-span-2 xl:self-start">
      {/* Calendar view - static June-style grid like the HTML.
          Dynamic later: generate days for current month via date-fns. */}
      <article className={`${CARD} p-3`}>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-outfit text-[13px] font-semibold">Calender View</h2>
          <select className="rounded-full bg-[#F2F9FD] px-2 py-1 text-[9px] font-semibold text-[#2772CC] outline-none">
            <option>Monthly View</option>
            <option>Weekly View</option>
          </select>
        </div>
        <div className="calendar-grid grid grid-cols-7 gap-y-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day} className="text-[9px] font-semibold text-[#1A3151]">
              {day}
            </span>
          ))}

          {/* Leading days from previous month (gray) */}
          {[26, 27, 28, 29, 30, 31].map((day) => (
            <span key={`lead-${day}`} className="py-1 text-[10px] text-slate-300">
              {day}
            </span>
          ))}

          {/* Days 1..30, day 13 highlighted (today) */}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) =>
            day === 13 ? (
              <span
                key={day}
                className="flex h-4 w-4 items-center justify-center justify-self-center rounded-full bg-[#45A5EC] text-[10px] font-bold text-white"
              >
                {day}
              </span>
            ) : (
              <span key={day} className="py-1 text-[10px]">
                {day}
              </span>
            ),
          )}

          {/* Trailing next-month days (gray) */}
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <span key={`trail-${day}`} className="py-1 text-[10px] text-slate-300">
              {day}
            </span>
          ))}
        </div>
      </article>

      {/* Income Overview donut */}
      <article className={`${CARD} p-3`}>
        <h2 className="font-outfit text-[13px] font-semibold">Income Overview</h2>
        <div className="relative mx-auto mt-2 h-[175px] w-full max-w-[210px]">
          <IncomeDonut
            monthlyPct={income.monthlyPct}
            weeklyPct={income.weeklyPct}
            centerLabel={income.centerLabel}
          />
        </div>
        <div className="mt-1 flex justify-center gap-3 text-[9px] text-[#7A8796]">
          <span>
            <i className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#2772CC]" />
            Monthly
          </span>
          <span>
            <i className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            Weekly
          </span>
        </div>
      </article>

      {/* Rating insight strip */}
      <article className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[#EAF7FE] to-[#DDF3FC] px-3 py-2.5 shadow-[0_4px_18px_rgba(28,61,92,.07)]">
        <div>
          <h2 className="font-outfit text-[12px] font-semibold">Rating Insight</h2>
          <p className="mt-1 text-[10px] text-[#7A8796]">
            🎉 Up By{" "}
            <b className="text-emerald-600">{rating.lift}</b>
          </p>
          <p className="text-[9px] text-[#7A8796]">{rating.periodLabel}</p>
        </div>
        <span className="text-[20px]">📈</span>
      </article>
    </div>
  );
}

/* ================================================================
   EarningsChart — dependency-free SVG line chart.
   props.values <- d.earningsWeekly.values  [1400,2600,...]
   props.labels <- d.earningsWeekly.labels  ["Sun",...]
   Swap for recharts <LineChart> any time; data shape already matches.
   ================================================================ */
function EarningsChart({
  values,
  labels,
}: {
  values: number[];
  labels: string[];
}) {
  const W = 700;
  const H = 230;
  const PAD_X = 34;
  const PAD_Y = 16;
  const MAX_Y = 5000;

  const pts = values.map((v, i) => ({
    x: PAD_X + (i * (W - PAD_X * 2)) / Math.max(values.length - 1, 1),
    y: H - PAD_Y - (v / MAX_Y) * (H - PAD_Y * 2),
  }));

  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1]?.x ?? 0},${
    H - PAD_Y
  } L${pts[0]?.x ?? 0},${H - PAD_Y} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#45A5EC" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#45A5EC" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* horizontal gridlines every ₹1000 */}
      {[1000, 2000, 3000, 4000].map((v) => {
        const y = H - PAD_Y - (v / MAX_Y) * (H - PAD_Y * 2);
        return <line key={v} x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} stroke="#EEF2F5" />;
      })}

      {/* y-axis tick labels */}
      {[0, 1000, 2000, 3000, 4000, 5000].map((v) => {
        const y = H - PAD_Y - (v / MAX_Y) * (H - PAD_Y * 2);
        return (
          <text key={v} x={PAD_X - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#7A8796">
            {v === 0 ? "0₹" : `${Math.round(v / 1000)}k`}
          </text>
        );
      })}

      <path d={areaPath} fill="url(#earnGrad)" />
      <path d={linePath} fill="none" stroke="#2772CC" strokeWidth="1.7" />

      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x.toFixed(1)}
          cy={p.y.toFixed(1)}
          r="2.5"
          fill="#fff"
          stroke="#45A5EC"
          strokeWidth="1.5"
        />
      ))}

      {labels.map((label, i) => (
        <text
          key={label}
          x={pts[i].x.toFixed(1)}
          y={H - 2}
          textAnchor="middle"
          fontSize="10"
          fill="#7A8796"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ================================================================
   IncomeDonut — dependency-free SVG doughnut with center label.
   Same visuals as Chart.js config in the HTML:
     cutout 67%, monthly=blue #2772CC, weekly=gold #F59E0B,
     white borders, center amount drawn over the hole.
   ================================================================ */
function IncomeDonut({
  monthlyPct,
  weeklyPct,
  centerLabel,
}: {
  monthlyPct: number;
  weeklyPct: number;
  centerLabel: string;
}) {
  const SIZE = 180;
  const C = SIZE / 2;
  const R = 78;
  const STROKE = 26;
  const CIRC = 2 * Math.PI * R;

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full -rotate-90">
      {/* Monthly slice */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="#2772CC"
        strokeWidth={STROKE}
        strokeDasharray={`${(monthlyPct / 100) * CIRC} ${CIRC}`}
      />
      {/* Weekly slice starts where monthly ends */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="#F59E0B"
        strokeWidth={STROKE}
        strokeDasharray={`${(weeklyPct / 100) * CIRC} ${CIRC}`}
        strokeDashoffset={`${-(monthlyPct / 100) * CIRC}`}
      />
      {/* Center total (counter-rotated upright) */}
      <text
        x={C}
        y={C}
        transform={`rotate(90 ${C} ${C})`}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="17"
        fontWeight="700"
        fill="#1A3151"
        fontFamily="Outfit, sans-serif"
      >
        {centerLabel}
      </text>
    </svg>
  );
}
