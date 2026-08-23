"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import successImg from "@/assets/images/after-service/Frame 587.png";
import providerImg from "@/assets/images/after-service/Frame 358.png";

/* ============================================================
   STATIC MOCK DATA
   ------------------------------------------------------------
   This page is currently STATIC (hardcoded values).
   When the backend API is ready, replace this object with real
   data fetched from the API (see the DYNAMIC GUIDE below).
   ============================================================ */
const bookingDetails = {
  serviceName: "AC repair",
  provider: {
    name: "Rahul Sharma",
    title: "Certified AC Repair & Maintenance Technician",
    isVerified: true,
    rating: 4.9,
    successfulServices: 2500,
    experienceYears: 8,
  },
  /* Payment rows live in ONE array so swapping hardcoded numbers
     with API fields later = change values only, markup untouched */
  paymentRows: [
    { label: "service amount", value: 1499 },
    { label: "convenience fee", value: 30 },
    { label: "taxes & charges", value: 51, hasInfoIcon: true },
    { label: "discount", value: 200, hasInfoIcon: true },
  ],
  totalAmount: 1479,
  savings: 200,
  /* Tip options rendered with .map() - adding/removing amounts
     later only needs a data change, not new JSX */
  tipOptions: [50, 100, 200, 500],
};

/* ============================================================
   HOW TO MAKE THIS PAGE DYNAMIC (beginner guide)
   ============================================================
   STEP 1 - Create an API function inside:
            src/api/api-function/bookings.function.ts

            export const fetchBookingByIdFn = async (bookingId: string) => {
              try {
                const res = await axios.get(
                  `${BASE_URL}/customer/bookings/${bookingId}`,
                  { headers: { Authorization: `Bearer ${getCookie("token")}` } }
                );
                return res.data; // -> { success, message, data }
              } catch {
                return { success: false, message: "Failed to load booking" };
              }
            };

   STEP 2 - Create a React Query hook inside src/hooks/useBookings.ts:

            export const useBookingDetails = (bookingId: string) =>
              useQuery({
                queryKey: ["booking-details", bookingId],
                queryFn: () => fetchBookingByIdFn(bookingId),
                enabled: !!bookingId, // don't run without an id
              });

   STEP 3 - Make the route dynamic: rename this folder to
            after-service/[id]/page.tsx then read the URL param:

            const { id } = await params;
            const { data, isLoading } = useBookingDetails(id);
            if (isLoading) return <Loader />;
            // then replace every bookingDetails.x usage with data.data.x

   STEP 4 - Interactive parts (tips + review) become mutations:

            export const useSubmitReview = () => {
              const queryClient = useQueryClient();
              return useMutation({
                mutationFn: submitReviewFn,      // POST /ratings
                onSuccess: () => toast.success("Review submitted!"),
              });
            };

            - "Send Tips" button  -> POST /customer/tips { amount }
            - "Submit" button     -> POST /ratings { stars, comment, image_url }

   STEP 5 - Image upload flow (for the review photo):
            1) <input type="file"> onChange -> get the File
            2) upload it to storage (Cloudinary / Supabase)
            3) send the returned public URL inside the review payload

   STEP 6 - Download Invoice button:
            Either call an invoice API endpoint, or generate a PDF
            client-side exactly like AgriLink does in
            src/utils/generateInvoice.ts (jsPDF + autotable).
   ============================================================ */

export default function AfterServicePage() {
  /* ---------------- INTERACTIVE STATE ---------------- */
  // Selected tip amount. null = nothing chosen yet ("Others" selected).
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  // Star rating for the provider. Clicking a star sets the value.
  // Later: send this number inside POST /ratings together with the comment.
  const [rating, setRating] = useState(4);

  return (
    <main>
      {/* ==================== AFTER SERVICE SECTION ==================== */}
      <section className="py-[50px] sm:py-[70px] lg:py-[106px]">
        <div className="max-w-[1350px] px-[15px] mx-auto">
          {/* 12-column grid: 7 cols left content, 5 cols right sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-7">
              {/* ---------- Card 1 : Service Completed Banner ---------- */}
              <div className="shadow-[inset_2px_0_13.5px_0_#E5E7EB] w-full min-h-[193px] rounded-[20px] p-[12px] min-[350px]:p-[15px] min-[375px]:p-[18px] sm:p-[20px] md:p-[25px] lg:p-[30px]">
                {/* Dynamic later: swap image with booking service image_url */}
                <Image
                  src={successImg}
                  alt="Service completed successfully"
                  className="mx-auto w-auto h-auto"
                  priority
                />
                <p className="text-black font-outfit font-medium text-[28px] text-center">
                  service comlpeted
                  <span className="text-[#16A34A]"> successfully !</span>
                </p>
                {/* Dynamic later: `your ${booking.serviceName} service ...` */}
                <p className="text-center">
                  your AC repair service has been completed.thanks for choosing
                  FIXNOW
                </p>
              </div>

              {/* ---------- Card 2 : Provider Profile ---------- */}
              <div className="w-full shadow-[inset_2px_0_13.5px_0_#E5E7EB] min-h-[264px] rounded-[20px] p-[20px] sm:p-[30px] mt-[20px]">
                <div className="flex flex-col sm:flex-row">
                  {/* Provider avatar - dynamic: provider.avatar_url */}
                  <div>
                    <div className="rounded-[87px] bg-[#F3F4F6] p-[15px] w-[150px] h-[150px] mx-auto sm:mx-0 shrink-0">
                      <figure>
                        <Image
                          src={providerImg}
                          alt="after-service-profile"
                          loading="lazy"
                          className="object-contain"
                        />
                      </figure>
                    </div>
                  </div>

                  {/* Provider details */}
                  <div className="flex flex-col gap-[6px] sm:gap-[10px] md:gap-[14px] lg:gap-[16px] sm:ms-[9px]">
                    {/* Name + Verified badge */}
                    <div className="flex items-center justify-center sm:justify-start">
                      <p className="font-outfit text-color10 text-[15px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-medium capitalize">
                        Rahul Sharma
                      </p>

                      {/* gradient-btn2 = green pill (defined in globals.css).
                          Dynamic later: only show when provider.is_verified */}
                      <div className="gradient-btn2 inline-flex items-center justify-center ms-[8px] px-[10px] py-[6px] md:px-[14px] md:py-[8px] lg:px-[16px] rounded-[10px] lg:rounded-[11px] text-[10px] md:text-[12px] lg:text-[16px] text-white capitalize font-medium font-albert whitespace-nowrap">
                        <svg
                          className="w-[12px] h-[12px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] shrink-0 me-[5px]"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Simple checkmark inside shield-style circle */}
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
                      </div>
                    </div>

                    {/* Provider job title */}
                    <p className="text-center sm:text-left text-[10px] sm:text-[12px] md:text-[15px] lg:text-[16px]">
                      Certified AC Repair &amp; Maintenance Technician
                    </p>

                    {/* Stats row: Rating | Successful Services | Experience */}
                    <div className="flex items-center justify-center lg:justify-start gap-[4px] max-lg:flex-wrap max-lg:justify-center max-sm:gap-[2px]">
                      {/* ITEM 1 : rating */}
                      <div className="h-[74px] px-[16px] py-[6px] md:px-[20px] md:py-[8px] lg:px-[28px] lg:py-[12px] bg-white">
                        <div className="flex gap-2 items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                              fill="#FFC106"
                            />
                          </svg>
                          <div className="flex flex-col">
                            <p className="font-outfit font-medium text-[22px] leading-[26px] md:text-[24px] md:leading-[29px] text-color10">
                              4.9
                            </p>
                            <p className="whitespace-nowrap text-[16px] max-[420px]:text-[10px]">
                              Average Customer
                              <br />
                              Rating
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Gradient vertical divider between stats */}
                      <div className="h-[84px] w-[2px] bg-[linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)]"></div>

                      {/* ITEM 2 : successful services */}
                      <div className="h-[74px] bg-white text-center px-[16px] py-[6px] md:px-[20px] md:py-[8px] lg:px-[28px] lg:py-[12px]">
                        <div className="flex justify-center h-full flex-col">
                          <p className="font-outfit font-medium text-[22px] leading-[26px] md:text-[24px] md:leading-[29px] text-color10">
                            2,500
                          </p>
                          <p className="text-[16px] max-[420px]:text-[10px]">
                            Successful Services
                          </p>
                        </div>
                      </div>

                      <div className="h-[84px] w-[2px] bg-[linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)]"></div>

                      {/* ITEM 3 : experience */}
                      <div className="h-[74px] bg-white text-center px-[16px] py-[6px] md:px-[20px] md:py-[8px] lg:px-[28px] lg:py-[12px]">
                        <div className="flex justify-center h-full flex-col">
                          <p className="font-outfit font-medium text-[22px] leading-[26px] md:text-[24px] md:leading-[29px] text-color10">
                            8+years
                          </p>
                          <p className="text-[16px] max-[420px]:text-[10px]">
                            of industry experience
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------- Card 3 : Appreciate Your Professional (Tips) ---------- */}
              <div className="shadow-[inset_2px_0_13.5px_0_#E5E7EB] mt-[20px] w-full min-h-[193px] rounded-[20px] p-[12px] min-[350px]:p-[15px] min-[375px]:p-[18px] sm:p-[20px] md:p-[25px] lg:p-[30px]">
                <p className="text-center font-outfit text-black font-medium text-[24px] capitalize">
                  appreciate your professional
                </p>
                <p className="text-center">
                  your tips motivates them to do better
                </p>

                {/* Tip buttons generated from bookingDetails.tipOptions array */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-[14px] mt-[38px] justify-items-center">
                  {bookingDetails.tipOptions.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedTip(amount)}
                      className={`shadow-[2px_0_4px_0_#000000] w-[120px] h-[79px] rounded-[20px] flex justify-center items-center cursor-pointer transition-colors duration-300 ${
                        selectedTip === amount
                          ? "bg-color4 text-white"
                          : "bg-white text-[#030712]"
                      }`}
                    >
                      {/* Rupee symbol SVG (same as HTML design) */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 3h12M6 8h12M9 21l3-13m0 0c4 0 6 1.5 6 4s-2 4-6 4H9"
                          stroke="#030712"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="ms-2 font-medium">{amount}</span>
                    </button>
                  ))}

                  {/* "Others" = clear selection / custom tip placeholder */}
                  <button
                    type="button"
                    onClick={() => setSelectedTip(null)}
                    className={`shadow-[2px_0_4px_0_#000000] w-[120px] h-[79px] rounded-[20px] flex justify-center items-center cursor-pointer transition-colors duration-300 ${
                      selectedTip === null
                        ? "bg-color4 text-white"
                        : "bg-white text-[#030712]"
                    }`}
                  >
                    <p className="font-medium">Others</p>
                  </button>
                </div>

                {/* Send Tips button.
                    Static now -> dynamic later: onClick={() => sendTipMutation.mutate(selectedTip)} */}
                <Link
                  href="#"
                  className="relative overflow-hidden inline-block mt-[28px] bg-color4 z-10 py-[16px] w-full rounded-[20px] font-outfit text-[18px] font-semibold text-white text-center before:absolute before:inset-0 before:-z-10 before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-white"
                >
                  Send Tips
                </Link>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="lg:col-span-5 lg:ms-[9px]">
              {/* ---------- Card 4 : Payment Summary ---------- */}
              <div className="w-full shadow-[inset_2px_0_13.5px_0_#E5E7EB] min-h-[264px] rounded-[20px] p-[20px] sm:p-[30px] mt-[6px] lg:mt-0">
                <p className="text-black font-outfit capitalize text-[24px] font-medium">
                  payment summary
                </p>

                {/* Rows mapped from bookingDetails.paymentRows.
                    Dynamic later: use API response
                    data.summary.{service_charge, tax, discount...} */}
                <div className="mt-[28px] space-y-[24px]">
                  {bookingDetails.paymentRows.map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <p className="text-black font-bold capitalize flex items-center">
                        {row.label}
                        {/* small "i" info icon shown on tax & discount rows */}
                        {row.hasInfoIcon && (
                          <svg
                            className="ms-2 shrink-0"
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
                      </p>
                      <p className="text-black font-bold capitalize">
                        ₹ {row.value.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dashed divider before total */}
                <div className="border-dashed border-t-2 border-black opacity-40 w-full my-[26px]"></div>

                <div className="flex justify-between">
                  <p className="font-outfit text-black font-medium text-[20px]">
                    Total Amount
                  </p>
                  <p className="font-outfit text-black font-medium text-[20px]">
                    ₹{bookingDetails.totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Download Invoice.
                    Static now -> dynamic later: generate PDF client-side
                    (see AgriLink src/utils/generateInvoice.ts) or hit an
                    invoice download endpoint with the auth token. */}
                <a
                  href="#"
                  className="block w-full py-[18px] rounded-[16px] border-2 border-color4 text-center mt-[38px] text-color4 font-medium font-outfit hover:bg-color4 hover:text-white transition-all duration-500"
                >
                  Download Invoice
                </a>

                {/* Savings banner */}
                <div className="w-full py-[18px] rounded-[16px] bg-[#F0FAF3] border-2 border-[#16A34A] mt-[38px] font-medium flex items-center justify-center gap-[9px]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="15" stroke="#16A34A" strokeWidth="2" />
                    <path
                      d="M10 16.5l4 4 8-8"
                      stroke="#16A34A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[#16A34A] font-semibold">
                    you saved {bookingDetails.savings} with FIXNOW
                  </p>
                </div>
              </div>

              {/* ---------- Card 5 : Rate Your Experience ---------- */}
              <div className="shadow-[inset_2px_0_13.5px_0_#E5E7EB] mt-[20px] w-full min-h-[193px] rounded-[20px] p-[12px] min-[350px]:p-[15px] min-[375px]:p-[18px] sm:p-[20px] md:p-[25px] lg:p-[30px]">
                <p className="font-outfit font-medium text-[20px] text-black">
                  how was your experience ?
                </p>

                {/* Stars + photo-upload row */}
                <div className="flex items-center justify-between mt-[42px]">
                  {/* Click-to-rate stars. Filled color depends on rating state.
                      Dynamic later: include `rating` value in POST /ratings */}
                  <div className="flex gap-[8px]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} star`}
                        onClick={() => setRating(star)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <svg width="21" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                            fill={star <= rating ? "#FFC106" : "#E5E7EB"}
                          />
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* Upload icon: label triggers the hidden file input below.
                      Dynamic later: onChange -> upload file -> save returned URL */}
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16V4m0 0L7 9m5-5l5 5"
                        stroke="#2772CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        stroke="#2772CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Review message box.
                    Dynamic later: bind with useState and send with rating */}
                <textarea
                  name=""
                  id=""
                  placeholder="share your message"
                  className="w-full min-h-[150px] border-2 border-black rounded-[20px] mt-[42px] p-[12px] outline-none focus:border-color4 transition-colors resize-none"
                ></textarea>

                {/* Submit review.
                    Static now -> dynamic later: onSubmit -> mutation -> toast feedback */}
                <Link
                  href="#"
                  className="relative overflow-hidden inline-block mt-[28px] bg-color4 z-10 py-[16px] w-full rounded-[20px] font-outfit text-[18px] font-semibold text-white text-center before:absolute before:inset-0 before:-z-10 before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-white"
                >
                  Submit
                </Link>
              </div>

              {/* ---------- Card 6 : You Might Need This ---------- */}
              <div className="shadow-[inset_2px_0_13.5px_0_#E5E7EB] mt-[20px] w-full min-h-[193px] rounded-[20px] p-[12px] min-[350px]:p-[15px] min-[375px]:p-[18px] sm:p-[20px] md:p-[25px] lg:p-[30px] pb-[40px]">
                <p className="text-center capitalize text-black text-[24px] font-outfit font-medium">
                  you might need this
                </p>

                {/* Suggested services.
                    Dynamic later: fetch GET /categories or GET /services,
                    .map() over the results, each tile links to /service/{slug}.
                    Icons come from category.icon (Cloudinary URL) via <Image /> */}
                <div className="flex gap-[12px] mt-[48px] justify-center">
                  {/* Tile 1 : electrician */}
                  <Link href="/service/electrician" className="text-center group">
                    <div className="w-[58px] h-[58px] rounded-full bg-[#C2E6FB] mx-auto flex items-center justify-center group-hover:bg-color12 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
                          stroke="#1F2937"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 text-black capitalize font-medium">
                      electrician
                    </p>
                  </Link>

                  {/* Tile 2 : plumber */}
                  <Link href="/service/plumber" className="text-center group">
                    <div className="w-[58px] h-[58px] rounded-full bg-[#C2E6FB] mx-auto flex items-center justify-center group-hover:bg-color12 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                          stroke="#1F2937"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 text-black capitalize font-medium">plumber</p>
                  </Link>

                  {/* Tile 3 : carpenter */}
                  <Link href="/service/carpenter" className="text-center group">
                    <div className="w-[58px] h-[58px] rounded-full bg-[#C2E6FB] mx-auto flex items-center justify-center group-hover:bg-color12 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect
                          x="4"
                          y="2"
                          width="16"
                          height="20"
                          rx="2"
                          stroke="#1F2937"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 6h8M8 10h8M8 14h5"
                          stroke="#1F2937"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 text-black capitalize font-medium">
                      carpenter
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
