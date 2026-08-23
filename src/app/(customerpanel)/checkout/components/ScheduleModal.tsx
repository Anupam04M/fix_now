"use client";

// src/app/(customerpanel)/checkout/components/ScheduleModal.tsx
// ================================================================
// SCHEDULE MODAL  (opens when user clicks "Change" on the Slot card)
// ----------------------------------------------------------------
// Pixel-matched to #arrivalModal in FIX_Now_HTML/checkout.html.
//
// WHAT THE USER CAN DO HERE:
//   1. Pick "Instant"  -> professional arrives in ~50 mins
//   2. Or keep "Schedule For Later" selected -> pick a date from the
//      calendar and a time slot, then hit "Proceed To Checkout".
//
// HOW IT BECOMES FULLY DYNAMIC (beginner notes):
//   STEP 1 - CALENDAR: the May-2026 grid below is hardcoded to match
//            the HTML design. Replace it with a real month generator:
//
//              const [month, setMonth] = useState(new Date(2026, 4)); // May
//              // build weeks with date-fns:
//              // import { getDaysInMonth, startOfMonth, ... }
//
//            Prev/next arrow buttons already call setMonth() handlers.
//
//   STEP 2 - AVAILABLE SLOTS: the 5 static slots become an API call,
//            e.g. GET /slots?date=2026-05-05 -> data[] of slots with
//            available:true/false. Disabled styling already exists
//            (see the 04:00 PM slot) so unavailable slots just reuse it.
//
//   STEP 3 - INSTANT: if backend supports instant booking, send
//            scheduledDate = today + scheduledTime = "ASAP".
// ================================================================

import React, { useState } from "react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  /* Fires when "Proceed To Checkout" is clicked.
     Parent uses this to update the Slot card text. */
  onConfirm: (dateText: string, timeText: string) => void;
}

/* Static time slots - mirrors the HTML exactly.
   Dynamic later: fetch per-date availability (STEP 2 above).
   `disabled` renders the grayed-out look used for sold-out slots. */
const TIME_SLOTS: { label: string; disabled?: boolean }[] = [
  { label: "10:00 AM - 12:00 PM" },
  { label: "12:00 PM - 02:00 PM" },
  { label: "02:00 PM - 04:00 PM" },
  { label: "04:00 PM - 06:00 PM", disabled: true },
  { label: "06:00 PM - 08:00 PM" },
];

/* Calendar grid for May 2026, laid out exactly like the HTML:
   - starts with Apr 26-30 (current-month color),
   - May 1..31,
   - ends with Jun 1-6 in GRAY (other-month color).
   Dynamic later: generate programmatically (STEP 1 above). */
const CALENDAR_LEADING = [26, 27, 28, 29, 30]; // from previous month
const CALENDAR_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const CALENDAR_TRAILING = [1, 2, 3, 4, 5, 6]; // next month (gray)
const DEFAULT_SELECTED_DAY = 5; // blue circle on load, like the HTML

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ScheduleModal = ({ isOpen, onClose, onConfirm }: ScheduleModalProps) => {
  /* ---------------- INTERACTIVE STATE ---------------- */
  // Which arrival mode is chosen: instant vs scheduled
  const [arrivalType, setArrivalType] = useState("schedule");

  // Currently highlighted calendar day (blue circle)
  const [selectedDay, setSelectedDay] = useState(DEFAULT_SELECTED_DAY);

  // Currently chosen time-slot chip
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0].label);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/20 backdrop-blur-md px-[8px] min-[360px]:px-[15px] py-[15px] min-[360px]:py-[20px] lg:py-[36px]">
      <div className="h-full flex items-center justify-center">
        {/* ==================== MODAL BOX ==================== */}
        <section className="relative w-full max-w-[1140px] max-h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white rounded-[24px] p-[18px] min-[360px]:p-[20px] sm:p-[28px] lg:p-[40px] shadow-[0_4px_35px_rgba(255,255,255,0.85)]">
          {/* Orange decorative blur (top-right) from the HTML */}
          <div className="absolute top-[-130px] right-[-130px] w-[320px] h-[320px] rounded-full bg-[#D97706]/15 blur-[80px]"></div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close schedule modal"
            className="absolute top-[10px] right-[12px] min-[360px]:top-[14px] min-[360px]:right-[16px] sm:top-[18px] sm:right-[20px] text-[20px] sm:text-[24px] leading-none font-semibold text-[#6B7280] hover:text-color4 transition-colors duration-300"
          >
            &times;
          </button>

          {/* Heading */}
          <div className="pr-[25px] sm:pr-[35px]">
            <h2 className="text-[18px] min-[360px]:text-[20px] sm:text-[24px] lg:text-[32px] leading-[1.3] font-semibold text-[#030712] font-outfit capitalize">
              When Should The Professional Arrive?
            </h2>
          </div>

          {/* ---------- OPTION 1 : INSTANT ---------- */}
          <label className="block mt-[18px] min-[360px]:mt-[20px] sm:mt-[24px] cursor-pointer">
            <input
              type="radio"
              name="arrivalType"
              checked={arrivalType === "instant"}
              onChange={() => setArrivalType("instant")}
              className="sr-only"
            />
            <div
              onClick={() => setArrivalType("instant")}
              className={`flex items-center justify-between min-h-[68px] min-[360px]:min-h-[72px] sm:min-h-[76px] px-[10px] min-[360px]:px-[14px] sm:px-[24px] py-[24px] rounded-[9px] min-[360px]:rounded-[10px] border transition-all duration-300 ${
                arrivalType === "instant"
                  ? "border-color4 bg-[#EFF8FF]"
                  : "border-[#D9E0E7] hover:border-color4"
              }`}
            >
              <div>
                {/* Green "Instant" pill badge with bolt icon */}
                <span className="inline-flex items-center px-[6px] min-[360px]:px-[10px] py-[8px] rounded-[8px] bg-[#DDF5E7] text-[#16A34A] text-[10px] min-[360px]:text-[14px] sm:text-[16px] font-semibold">
                  <svg className="mr-[4px]" width="15" height="15" viewBox="0 0 24 24" fill="#16A34A">
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                  </svg>
                  Instant
                </span>
                <p className="mt-[6px] min-[360px]:mt-[10px] text-[12px] min-[360px]:text-[15px] sm:text-[20px] font-semibold text-[#030712]">
                  In 50 Mins
                </p>
              </div>

              {/* Radio dot (visual only - state lives above) */}
              <span className="w-[18px] h-[18px] min-[360px]:w-[20px] min-[360px]:h-[20px] rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                {arrivalType === "instant" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-color4"></span>
                )}
              </span>
            </div>
          </label>

          {/* ---------- OPTION 2 : SCHEDULE FOR LATER ---------- */}
          <div className="mt-[15px] min-[360px]:mt-[18px] sm:mt-[20px] rounded-[10px] min-[360px]:rounded-[11px] border border-[#BFE3FF] shadow-[0_0_12px_rgba(39,114,204,0.10)] p-[10px] min-[360px]:p-[14px] sm:p-[16px]">
            {/* Header + radio */}
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => setArrivalType("schedule")}
            >
              <div>
                <h3 className="text-[13px] min-[360px]:text-[15px] sm:text-[20px] font-semibold text-[#030712]">
                  Schedule For Later
                </h3>
                <p className="mt-[6px] min-[360px]:mt-[10px] text-[10px] min-[360px]:text-[13px] sm:text-[16px] text-[#6B7280]">
                  Select Your Preferred Date And Time
                </p>
              </div>
              <span className="w-[18px] h-[18px] min-[360px]:w-[20px] min-[360px]:h-[20px] mt-[1px] rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                {arrivalType === "schedule" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-color4"></span>
                )}
              </span>
            </div>

            {/* Calendar + Time columns */}
            <div className="flex flex-col lg:flex-row mt-[20px] min-[360px]:mt-[28px] sm:mt-[34px]">
              {/* ===== CALENDAR ===== */}
              <div className="w-full lg:w-[46%] border border-[#DDF0FC] rounded-[20px] p-[7px] min-[360px]:p-[9px] sm:p-[10px]">
                {/* Month header with prev/next arrows.
                    Dynamic later: wire these to change the month (STEP 1). */}
                <div className="flex items-center justify-between h-[30px] sm:h-[50px] px-[4px] min-[360px]:px-[10px] rounded-[49px] bg-[#F3F4F6]">
                  <button
                    type="button"
                    aria-label="Previous month"
                    className="w-[22px] h-[22px] min-[360px]:w-[30px] min-[360px]:h-[30px] rounded-full bg-white flex items-center justify-center text-[#030712] hover:text-color4 transition-colors"
                  >
                    <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                      <path d="M5.75 0.75C5.75 0.75 0.750008 4.06418 0.75 5.25C0.749992 6.4359 5.75 9.75 5.75 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <span className="text-[10px] min-[360px]:text-[14px] sm:text-[16px] font-semibold text-black">
                    May 2026
                  </span>

                  <button
                    type="button"
                    aria-label="Next month"
                    className="w-[22px] h-[22px] min-[360px]:w-[30px] min-[360px]:h-[30px] rounded-full bg-white flex items-center justify-center text-[#030712] hover:text-color4 transition-colors"
                  >
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
                      <path d="M0.750033 0.75C0.750033 0.75 4.75 4.06418 4.75 5.25C4.75 6.4359 0.75 9.75 0.75 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Week-day labels */}
                <div className="grid grid-cols-7 mt-[8px] min-[360px]:mt-[13px] text-center">
                  {WEEK_DAYS.map((day) => (
                    <span key={day} className="text-[8px] min-[360px]:text-[11px] sm:text-[14px] font-semibold text-black">
                      {day}
                    </span>
                  ))}
                </div>

                {/* Date grid */}
                <div className="grid grid-cols-7 mt-[4px] min-[360px]:mt-[7px] text-center">
                  {/* Leading days from previous month (normal color) */}
                  {CALENDAR_LEADING.map((day) => (
                    <span
                      key={`lead-${day}`}
                      className="h-[29px] min-[360px]:h-[34px] flex items-center justify-center text-[8px] min-[360px]:text-[14px] text-[#030712] cursor-pointer hover:bg-[#F3F4F6] hover:rounded-full transition-all duration-200"
                    >
                      {day}
                    </span>
                  ))}

                  {/* May 1-31 - clickable, selected day gets blue circle */}
                  {CALENDAR_DAYS.map((day) =>
                    day === selectedDay ? (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        aria-label={`Select May ${day}`}
                        className="w-[23px] h-[23px] min-[360px]:w-[25px] min-[360px]:h-[25px] my-auto mx-auto rounded-full bg-color4 text-white text-[8px] min-[360px]:text-[14px] flex items-center justify-center cursor-pointer hover:opacity-90 transition-all duration-200"
                      >
                        {day}
                      </button>
                    ) : (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className="h-[29px] min-[360px]:h-[34px] flex items-center justify-center text-[8px] min-[360px]:text-[14px] text-[#030712] cursor-pointer hover:bg-[#F3F4F6] hover:rounded-full transition-all duration-200"
                      >
                        {day}
                      </button>
                    ),
                  )}

                  {/* Trailing days from next month (gray color) */}
                  {CALENDAR_TRAILING.map((day) => (
                    <span
                      key={`trail-${day}`}
                      className="h-[29px] min-[360px]:h-[34px] flex items-center justify-center text-[8px] min-[360px]:text-[14px] text-[#6B7280] cursor-pointer hover:bg-[#F3F4F6] hover:rounded-full transition-all duration-200"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===== TIME SLOTS + SELECTION SUMMARY ===== */}
              <div className="w-full lg:w-[54%] lg:ml-[14px] mt-[14px] lg:mt-0">
                <div className="border border-[#C2E6FB] rounded-[15px] min-[360px]:rounded-[20px] p-[9px] min-[360px]:p-[10px] sm:p-[16px]">
                  <h4 className="text-[12px] min-[360px]:text-[15px] sm:text-[20px] font-semibold text-[#111827]">
                    Select A Time Slot
                  </h4>

                  {/* Slot chips - selected one gets blue fill.
                      Dynamic later: availability comes from API (STEP 2). */}
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-2 mt-[22px] min-[360px]:mt-[32px]">
                    {TIME_SLOTS.map((slot, idx) => {
                      const isSelected =
                        selectedTime === slot.label && !slot.disabled;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          disabled={slot.disabled}
                          onClick={() => setSelectedTime(slot.label)}
                          className={`w-full h-[36px] min-[360px]:h-[38px] sm:h-[40px] px-[4px] rounded-[8px] min-[360px]:rounded-[9px] text-[10px] min-[360px]:text-[11px] sm:text-[16px] font-semibold transition-all duration-300 ${
                            idx > 0 ? "mt-[8px] min-[400px]:mt-[8px]" : ""
                          } ${idx % 2 === 1 ? "min-[400px]:ml-[8px]" : ""} ${
                            slot.disabled
                              ? "border border-[#DCEFFB] bg-[#F0F9FE] text-[#99D7F7]"
                              : isSelected
                                ? "border-color4 bg-color4 text-white"
                                : "border border-[#BFE3FF] text-color4 hover:bg-[#EFF8FF]"
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Date + Time summary boxes (live values) */}
                <div className="flex flex-col min-[500px]:flex-row mt-[9px] min-[360px]:mt-[10px]">
                  {/* Selected Date */}
                  <div className="w-full min-[500px]:w-1/2 min-h-[58px] min-[360px]:min-h-[64px] rounded-[10px] min-[360px]:rounded-[12px] border border-[#BFE3FF] flex items-center px-[8px] min-[360px]:px-[12px]">
                    <div className="w-[34px] h-[34px] min-[360px]:w-[38px] min-[360px]:h-[38px] shrink-0 rounded-full bg-[#EFF8FF] flex items-center justify-center">
                      {/* Calendar icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="17" rx="2" stroke="#3089E0" strokeWidth="1.5" />
                        <path d="M16 2v4M8 2v4M3 9.5h18" stroke="#3089E0" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="ml-[8px] min-[360px]:ml-[10px] min-w-0">
                      <p className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] text-[#9CA3AF]">
                        Selected Date
                      </p>
                      <p className="mt-[2px] text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-semibold text-color4 truncate">
                        May {selectedDay}, 2026
                      </p>
                    </div>
                  </div>

                  {/* Selected Time */}
                  <div className="w-full min-[500px]:w-1/2 min-h-[58px] min-[360px]:min-h-[64px] rounded-[10px] min-[360px]:rounded-[12px] border border-[#BFE3FF] flex items-center px-[8px] min-[360px]:px-[12px] mt-[8px] min-[500px]:mt-0 min-[500px]:ml-[10px]">
                    <div className="w-[34px] h-[34px] min-[360px]:w-[38px] min-[360px]:h-[38px] shrink-0 rounded-full bg-[#EFF8FF] flex items-center justify-center">
                      {/* Clock icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#3089E0" strokeWidth="1.5" />
                        <path d="M12 6.5V12l3.5 2" stroke="#3089E0" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="ml-[8px] min-[360px]:ml-[10px] min-w-0">
                      <p className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] text-[#9CA3AF]">
                        Selected Time
                      </p>
                      <p className="mt-[2px] text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-semibold text-color4 truncate">
                        {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proceed button -> sends chosen date/time to parent page */}
            <div className="flex justify-end mt-[14px] min-[360px]:mt-[18px]">
              <button
                type="button"
                onClick={() => onConfirm(`May ${selectedDay}, 2026`, selectedTime)}
                className="w-full min-[450px]:w-auto min-h-[42px] min-[360px]:min-h-[45px] px-[18px] min-[360px]:px-[22px] sm:px-[25px] rounded-[10px] min-[360px]:rounded-[12px] bg-color4 text-white text-[11px] min-[360px]:text-[12px] sm:text-[13px] font-semibold transition-all duration-300 hover:bg-color-15 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(39,114,204,0.25)]"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScheduleModal;
