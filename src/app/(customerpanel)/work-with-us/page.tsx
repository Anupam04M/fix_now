"use client";

// src/app/(customerpanel)/work-with-us/page.tsx
// ================================================================
// WORK WITH US  (route: /work-with-us)
// ----------------------------------------------------------------
// Converted from FIX_NowHtml/work-with-us.html. Uses the project's
// Tailwind theme tokens (globals.css @theme) instead of the raw
// CSS vars the static HTML relied on. FAQ accordion is client-driven.
// ================================================================

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { ctaArrowSvg, joinArrowSvg } from "./cta-assets";
import RegistrationModal from "./registration-modal";

// ------------------------------------------------------------------
// Images (imported from the shared assets folder — copied from
// FIX_NowHtml/assets/images/hpw-it-works without modifying the source)
// ------------------------------------------------------------------
import whyImg1 from "@/assets/images/hpw-it-works/dc875c0e74413068bdebdfb179fc37ea4d442534.jpg";
import pouchImg from "@/assets/images/hpw-it-works/df05c26caed5610afb218a85317e860933f2c8b0.jpg";
import whyImg2 from "@/assets/images/hpw-it-works/74ebf3aeceb28a274523086939949df7383e7594.jpg";
import howImg1 from "@/assets/images/hpw-it-works/01.png";
import howImg2 from "@/assets/images/hpw-it-works/b15aa5b1d26c97d8b2c8a47df1312cb45fb1a337.png";
import howImg3 from "@/assets/images/hpw-it-works/b6bf9bc8ac980bb1d593a38b7859eccd35ebf4f8.png";
import howImg4 from "@/assets/images/hpw-it-works/b9f5239e686a8b6f949168225a8fa319219a2900.png";
import aviPriya from "@/assets/images/hpw-it-works/priya.png";
import aviAmit from "@/assets/images/hpw-it-works/amit.png";
import aviVishal from "@/assets/images/hpw-it-works/vishal.png";
import aviRahul from "@/assets/images/hpw-it-works/f8c9847dca88af148c57d7b316a089bf1867f898 (1).png";
import aviNeha from "@/assets/images/hpw-it-works/neha.png";
import heroBg from "@/assets/images/hpw-it-works/Frame_947.png";

// ------------------------------------------------------------------
// FAQ data
// ------------------------------------------------------------------
const FAQS = [
  {
    q: "How Do I Join FixNow As A Service Provider?",
    a: "Sign up on FixNow, complete your profile, upload the required documents for verification, and once approved you can start accepting service requests in your area.",
  },
  {
    q: "How Do I Manage My Availability And Schedule?",
    a: "You Can Update Your Availability Directly Through The FixNow App. Set Your Working Hours, Manage Your Schedule, And Keep Your Availability Up To Date So The Only Receive Jobs You Can Take.",
  },
  {
    q: "How Do I Receive Payments?",
    a: "Payments are processed securely through the app once a job is marked complete, and funds are transferred directly to your linked bank account or wallet.",
  },
  {
    q: "What Are The Charges For Using FixNow?",
    a: "FixNow charges a small service fee per completed job. There are no hidden costs, and the fee structure is clearly shown before you accept any request.",
  },
  {
    q: "How Can I Grow My Business On FixNow?",
    a: "Build a strong rating by delivering great service, respond quickly to requests, keep your profile updated, and take advantage of promotional opportunities within the app.",
  },
];

// Small speech-bubble quote mark used on the testimonial avatars
const QuoteBubble = () => (
  <svg
    width="10"
    height="7"
    viewBox="0 0 13 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.63097 3.49808C2.32107 3.49739 2.02928 3.55144 1.75561 3.66021L1.75597 3.49615C1.77528 3.004 1.94936 2.59423 2.2782 2.26683C2.60705 1.93943 3.01759 1.76715 3.50981 1.75001C3.76502 1.75057 3.97484 1.669 4.13926 1.5053C4.30368 1.34159 4.38617 1.13214 4.38674 0.876933C4.3873 0.621725 4.30573 0.411909 4.14203 0.247486C3.97833 0.0830634 3.76887 0.000571135 3.51366 9.66969e-06C2.52925 0.0160731 1.70818 0.360622 1.05045 1.03366C0.374525 1.68842 0.0263666 2.50797 0.00597178 3.4923L0.000196701 6.11729C0.0167815 6.86473 0.270626 7.48508 0.761729 7.97835C1.25283 8.47162 1.87206 8.72819 2.61942 8.74806C3.36685 8.73148 3.9872 8.47763 4.48047 7.98653C4.97374 7.49543 5.23031 6.8762 5.25018 6.12884C5.2336 5.38141 4.97975 4.76106 4.48865 4.26779C3.99755 3.77452 3.37832 3.51795 2.63097 3.49808ZM9.63095 3.51348C9.32105 3.51279 9.02927 3.56684 8.75559 3.67561L8.75595 3.51155C8.77526 3.01941 8.94934 2.60963 9.27819 2.28223C9.60703 1.95483 10.0176 1.78255 10.5098 1.76541C10.765 1.76597 10.9748 1.6844 11.1392 1.5207C11.3037 1.35699 11.3862 1.14754 11.3867 0.892333C11.3873 0.637125 11.3057 0.42731 11.142 0.262887C10.9783 0.0984636 10.7689 0.0159713 10.5136 0.0154099C9.52923 0.0314731 8.70816 0.376022 8.05043 1.04906C7.37451 1.70382 7.02635 2.52337 7.00595 3.5077L7.00018 6.13269C7.01676 6.88013 7.27061 7.50048 7.76171 7.99375C8.25282 8.48702 8.87204 8.74359 9.6194 8.76346C10.3668 8.74688 10.9872 8.49303 11.4805 8.00193C11.9737 7.51083 12.2303 6.8916 12.2502 6.14424C12.2336 5.39681 11.9797 4.77646 11.4886 4.28319C10.9975 3.78992 10.3783 3.53335 9.63095 3.51348Z"
      fill="white"
    />
  </svg>
);

// One testimonial: avatar + quote bubble + name card
const Testimonial = ({
  avatar,
  name,
  text,
  className,
  bubbleRight = false,
  bubbleWidth = 150,
  bubbleTop = 22,
  bubbleLeft = 32,
}: {
  avatar: string;
  name: string;
  text: string;
  className: string;
  bubbleRight?: boolean;
  bubbleWidth?: number;
  bubbleTop?: number;
  bubbleLeft?: number;
}) => (
  <div className={`relative mx-auto w-[190px] h-[80px] min-[480px]:w-[205px] ${className}`}>
    {/* Avatar */}
    <div className="absolute left-0 top-0 w-[45px] h-[45px] min-[480px]:w-[50px] min-[480px]:h-[50px] rounded-[10px] overflow-hidden bg-gray-200">
      <img src={avatar} alt={name} className="w-full h-full object-cover" />
    </div>

    {/* Quote bubble */}
    <span className="absolute left-[-5px] top-[43px] z-10 w-[16px] h-[16px] rounded-full bg-color12 flex items-center justify-center">
      <QuoteBubble />
    </span>

    {/* Review card */}
    <div
      className="absolute bg-white rounded-[5px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] px-[9px] py-[7px]"
      style={{
        width: bubbleWidth,
        top: bubbleTop,
        left: bubbleRight ? undefined : bubbleLeft,
        right: bubbleRight ? 0 : undefined,
      }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[8px] font-semibold text-[#263b55]">{name}</span>
        <span className="text-[7px] text-[#e9bd32]">★ 5.0</span>
      </div>
      <p className="text-[6px] leading-[1.35] text-[#555] mt-[3px]">{text}</p>
    </div>
  </div>
);

// ------------------------------------------------------------------
// Earning stat row
// ------------------------------------------------------------------
const StatRow = ({
  icon,
  title,
  percent,
  caption,
}: {
  icon: React.ReactNode;
  title: string;
  percent: string;
  caption: string;
}) => (
  <div className="flex items-start gap-[16px]">
    <span className="shrink-0 flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-color-14 text-color4">
      {icon}
    </span>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-[3px]">
        <h5 className="font-semibold text-color10">{title}</h5>
        <span className="text-[13px] font-semibold text-color6 ml-[10px]">
          {percent}
        </span>
      </div>
      <p className="text-color1 mb-[10px] text-[14px]">{caption}</p>
      <div className="w-full h-[6px] rounded-full bg-color-14 overflow-hidden">
        <div
          className="h-full rounded-full bg-color4"
          style={{ width: percent }}
        ></div>
      </div>
    </div>
  </div>
);

export default function WorkWithUs() {
  // ------------------------------------------------------------------
  // FAQ accordion state (all items closed by default, one at a time)
  // ------------------------------------------------------------------
  const [openFaq, setOpenFaq] = useState<number>(-1);

  // ------------------------------------------------------------------
  // Provider registration modal (opened by "Join As A Provvider")
  // ------------------------------------------------------------------
  const [showRegistration, setShowRegistration] = useState(false);

  // ------------------------------------------------------------------
  // Loader (matches the home page + static HTML)
  // ------------------------------------------------------------------
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ------------------------------------------------------------------
  // Animated earnings counter (HTML: rAF count-up 0 -> 48,320 over 2s)
  // ------------------------------------------------------------------
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const target = 48320;
    const duration = 2000;
    let hasStarted = false;

    const startCounter = () => {
      let startTime: number | null = null;
      const countUp = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = Math.floor(progress * target);
        el.textContent = currentValue.toLocaleString("en-IN");
        if (progress < 1) {
          requestAnimationFrame(countUp);
        } else {
          el.textContent = target.toLocaleString("en-IN");
        }
      };
      requestAnimationFrame(countUp);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            hasStarted = true;
            startCounter();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ------------------------------------------------------------------
  // FAQ measured height (HTML uses answer.scrollHeight + resize handler)
  // ------------------------------------------------------------------
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    answerRefs.current.forEach((node, i) => {
      if (node) {
        node.style.maxHeight =
          i === openFaq ? `${node.scrollHeight}px` : "0px";
      }
    });
  }, [openFaq]);

  useEffect(() => {
    const handleResize = () => {
      const node = answerRefs.current[openFaq];
      if (node && openFaq >= 0) {
        node.style.maxHeight = `${node.scrollHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openFaq]);

  return (
    <>
      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white transition-opacity duration-500">
          <h1 className="text-[70px] font-extrabold tracking-[2px] font-outfit text-color4">
            Fix<span className="text-color-15">Now</span>
          </h1>
          <div className="mt-8 h-2 w-[220px] overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-gradient-to-r from-color4 to-color-15 loader-progress"></div>
          </div>
        </div>
      )}

      <div style={{ display: loading ? "none" : "block" }}>
      <main className="w-full overflow-x-hidden">
      {/* ==================== Hero Banner ==================== */}
      <section className="py-[60px] lg:py-[100px] bg-color2 overflow-hidden">
        <div
          className="relative w-full min-h-[600px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg.src})` }}
        >
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center capitalize z-10 font-outfit text-[56px] font-bold leading-[1.2] text-color5">
            Your Skills.
            <br />
            Our Platform.
            <br />
            <span className="text-color13">More Opportunities</span>.
          </p>
        </div>
      </section>

      {/* ==================== Why Choose FixNow ==================== */}
      <section className="py-[60px] lg:py-[100px] bg-color2 overflow-hidden">
        <div className="max-w-[1350px] px-[15px] mx-auto">
          {/* Row 1 : Image / Copy / Tool-pouch image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-center">
            {/* Left large photo */}
            <div className="lg:col-span-5 order-1">
              <figure className="rounded-tl-[70px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[70px] overflow-hidden h-[280px] sm:h-[320px] lg:h-[340px]">
                <img
                  src={whyImg1.src}
                  alt="Two FixNow technicians reviewing a job on a tablet"
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>

            {/* Middle copy */}
            <div className="lg:col-span-5 order-3 lg:order-2">
              <p className="text-[16px] font-semibold text-color4 mb-[10px] tracking-wide">
                Why Choose FIXNOW
              </p>
              <h2 className="font-outfit text-[38px] sm:text-[42px] font-semibold leading-[1.2] text-color5 mb-[20px]">
                More Jobs.
                <br />
                More Growth.
              </h2>
              <p className="text-color1 text-[16px] leading-[1.7] max-w-[420px]">
                Join thousands of service providers who trust FixNow to grow
                their business and serve more customers. We provide you with
                the platform, support and customers – you bring the expertise.
              </p>
            </div>

            {/* Right tall tool-pouch photo */}
            <div className="lg:col-span-2 order-2 lg:order-3 flex justify-start lg:justify-end">
              <figure className="rounded-t-full rounded-b-[16px] overflow-hidden w-[120px] sm:w-[140px] h-[220px] sm:h-[260px] lg:h-[300px]">
                <img
                  src={pouchImg.src}
                  alt="Technician's tool pouch"
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>
          </div>

          {/* Row 2 : Feature grid / Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-center mt-[50px] lg:mt-[70px]">
            {/* Left 2x2 feature grid */}
            <div className="lg:col-span-6">
              <div className="relative grid grid-cols-2 gap-x-[40px] sm:gap-x-[64px] gap-y-[36px] max-w-[460px]">
                {/* cross divider */}
                <span className="hidden sm:block pointer-events-none absolute left-1/2 top-[6px] bottom-[6px] w-px -translate-x-1/2 bg-color7"></span>
                <span className="hidden sm:block pointer-events-none absolute top-1/2 left-[6px] right-[6px] h-px -translate-y-1/2 bg-color7"></span>

                {/* More Work */}
                <div>
                  <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-color-14 text-color4 mb-[16px]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M18.5 8.5v3M20 10h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="18.5" cy="14.5" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <h6 className="text-color10 mb-[8px] text-[16px] font-semibold">More Work</h6>
                  <p className="text-[14px] leading-[1.5] max-w-[190px] text-color1">
                    Get regular job opportunities and increase your bookings.
                  </p>
                </div>

                {/* Grow your Business */}
                <div>
                  <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-color-14 text-color4 mb-[16px]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17l6-6 4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 7h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h6 className="text-color10 mb-[8px] text-[16px] font-semibold">Grow your Business</h6>
                  <p className="text-[14px] leading-[1.5] max-w-[190px] text-color1">
                    Expand your reach, increase revenue and grow brand.
                  </p>
                </div>

                {/* Trusted By Customers */}
                <div>
                  <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-color-14 text-color4 mb-[16px]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h6 className="text-color10 mb-[8px] text-[16px] font-semibold">Trusted By Customers</h6>
                  <p className="text-[14px] leading-[1.5] max-w-[190px] text-color1">
                    We connect you with verified customers who trust FixNow.
                  </p>
                </div>

                {/* We Support You */}
                <div>
                  <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-color-14 text-color4 mb-[16px]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M19 19v1a2 2 0 0 1-2 2h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <h6 className="text-color10 mb-[8px] text-[16px] font-semibold">We Support You</h6>
                  <p className="text-[14px] leading-[1.5] max-w-[190px] text-color1">
                    From onboarding to support, we are with you on every step.
                  </p>
                </div>
              </div>
            </div>

            {/* Right photo */}
            <div className="lg:col-span-6">
              <figure className="rounded-tr-[90px] rounded-br-[90px] rounded-tl-[16px] rounded-bl-[16px] overflow-hidden h-[300px] sm:h-[360px] lg:h-[400px]">
                <img src={whyImg2.src} alt="FixNow service professional at work" className="w-full h-full object-cover" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Benefits ==================== */}
      <section className="relative py-[70px] lg:py-[100px] bg-gradient-to-br from-color-14 via-color2 to-[#fdf6e9] overflow-hidden">
        <div className="max-w-[1350px] px-[15px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-[56px] lg:mb-[70px]">
            <p className="text-[15px] font-semibold text-color4 mb-[8px]">Benefits</p>
            <h2 className="font-outfit text-[38px] sm:text-[42px] font-semibold leading-[1.2] text-color5">
              Everything You Need To Get Started
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[70px] max-w-[900px] mx-auto pt-[28px]">
            {/* Card 1 */}
            <div className="relative cursor-pointer">
              <span className="absolute -top-[28px] left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-color4 text-white font-outfit text-[20px] font-semibold shadow-[0_8px_16px_rgba(39,114,204,0.35)]">
                1
              </span>
              <div className="group relative isolate rounded-[16px] bg-[#cfe8fb] shadow-[0_10px_25px_rgba(0,0,0,0.06)] px-[24px] pt-[44px] pb-[28px] text-center h-full before:content-[''] before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:rounded-[16px] before:bg-[#2772cc] before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:opacity-30 hover:before:rotate-[40deg]">
                <h6 className="relative z-10 mb-[12px] text-[16px] font-semibold text-color10">
                  More Job Opportunities
                </h6>
                <p className="relative z-10 text-color1 text-[14px] leading-[1.5]">
                  Get matched with customers in your area and receive regular
                  service requests based on your skills and availability.
                </p>
              </div>
            </div>

            {/* Card 2 (highlighted) */}
            <div className="relative cursor-pointer">
              <span className="absolute -top-[28px] left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-color13 text-white font-outfit text-[20px] font-semibold shadow-[0_8px_16px_rgba(217,119,6,0.35)]">
                2
              </span>
              <div className="group relative isolate rounded-[16px] bg-color-16 shadow-[0_10px_25px_rgba(0,0,0,0.08)] px-[24px] pt-[44px] pb-[28px] text-center h-full before:content-[''] before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:rounded-[16px] before:bg-color13 before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:opacity-30 hover:before:rotate-[40deg]">
                <h6 className="relative z-10 mb-[12px] text-[16px] font-semibold text-color10">
                  Secure &amp; Timely Payments
                </h6>
                <p className="relative z-10 text-color1 text-[14px] leading-[1.5]">
                  Receive secure online payments with transparent earnings,
                  detailed invoices, and easy payout tracking.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative cursor-pointer">
              <span className="absolute -top-[28px] left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-color4 text-white font-outfit text-[20px] font-semibold shadow-[0_8px_16px_rgba(39,114,204,0.35)]">
                3
              </span>
              <div className="group relative isolate rounded-[16px] bg-[#cfe8fb] shadow-[0_10px_25px_rgba(0,0,0,0.06)] px-[24px] pt-[44px] pb-[28px] text-center h-full before:content-[''] before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:rounded-[16px] before:bg-[#2772cc] before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:opacity-30 hover:before:rotate-[40deg]">
                <h6 className="relative z-10 mb-[12px] text-[16px] font-semibold text-color10">
                  Build Your Reputation
                </h6>
                <p className="relative z-10 text-color1 text-[14px] leading-[1.5]">
                  Grow your profile through verified reviews, customer
                  ratings, and repeat bookings that help attract more clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== How It Works ==================== */}
      <section className="py-[50px]">
        <div className="max-w-[1350px] px-[15px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-[20px]">
            <p className="font-outfit text-[11px] font-semibold leading-[1.2] text-color4 mb-[7px]">
              How It Works
            </p>
            <h2 className="font-outfit font-bold text-[25px] leading-[1.2] text-color5 max-[767px]:text-[23px] max-[545px]:text-[21px] max-[480px]:text-[19px] max-[320px]:text-[17px]">
              Everything You Need To Get Started
            </h2>
          </div>

          {/* Cards */}
          <div className="flex items-start justify-center max-[767px]:flex-wrap">
            {/* Card 1 */}
            <div className="w-2/5 min-h-[208px] bg-white border border-color17 rounded-[10px] overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.08)] mt-[22px] max-[991px]:w-[120px] max-[767px]:w-[45%] max-[767px]:mt-0 max-[545px]:w-[80%] max-[545px]:mx-auto">
              <img src={howImg1.src} alt="Join FixNow" className="w-full object-contain" />
              <div className="px-[9px] pt-[8px] pb-[10px]">
                <div className="w-[13px] h-[13px] rounded-full bg-color4 flex items-center justify-center mb-[7px]">
                  <span className="text-white text-[7px]">✓</span>
                </div>
                <h3 className="font-outfit font-semibold text-[12px] leading-[1.2] text-color6">
                  Join FixNow
                </h3>
                <p className="font-albert text-[8px] leading-[1.35] text-color1 mt-[4px]">
                  Create your profile and register your business in just a few simple steps.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-2/5 min-h-[292px] bg-white border border-color17 rounded-[10px] overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.08)] mx-[15px] max-[991px]:w-[120px] max-[767px]:w-[45%] max-[767px]:mx-[2%] max-[545px]:w-[80%] max-[545px]:mx-auto max-[545px]:mt-[15px]">
              <img src={howImg2.src} alt="Get Verified" className="w-full object-contain" />
              <div className="px-[9px] pt-[8px] pb-[10px]">
                <div className="w-[13px] h-[13px] rounded-full bg-color4 flex items-center justify-center mb-[7px]">
                  <span className="text-white text-[7px]">✓</span>
                </div>
                <h3 className="font-outfit font-semibold text-[12px] leading-[1.2] text-color6">
                  Get Verified
                </h3>
                <p className="font-albert text-[8px] leading-[1.35] text-color1 mt-[4px]">
                  Complete document verification to start receiving trusted customer requests.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-2/5 min-h-[208px] bg-white border border-color17 rounded-[10px] overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.08)] mt-[22px] max-[991px]:w-[120px] max-[767px]:w-[45%] max-[767px]:mt-[20px] max-[545px]:w-[80%] max-[545px]:mx-auto">
              <img src={howImg3.src} alt="Accept Bookings" className="w-full object-contain" />
              <div className="px-[9px] pt-[8px] pb-[10px]">
                <div className="w-[13px] h-[13px] rounded-full bg-color4 flex items-center justify-center mb-[7px]">
                  <span className="text-white text-[7px]">✓</span>
                </div>
                <h3 className="font-outfit font-semibold text-[12px] leading-[1.2] text-color6">
                  Accept Bookings
                </h3>
                <p className="font-albert text-[8px] leading-[1.35] text-color1 mt-[4px]">
                  Receive nearby service requests, accept jobs, and manage your schedule with ease.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-2/5 min-h-[292px] bg-white border border-color17 rounded-[10px] overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.08)] ml-[15px] max-[991px]:w-[120px] max-[767px]:w-[45%] max-[767px]:ml-[2%] max-[767px]:mt-[20px] max-[545px]:w-[80%] max-[545px]:mx-auto max-[545px]:mt-[15px]">
              <img src={howImg4.src} alt="Complete and Earn" className="w-full h-[174px] object-cover" />
              <div className="px-[9px] pt-[8px] pb-[10px]">
                <div className="w-[13px] h-[13px] rounded-full bg-color4 flex items-center justify-center mb-[7px]">
                  <span className="text-white text-[7px]">✓</span>
                </div>
                <h3 className="font-outfit font-semibold text-[12px] leading-[1.2] text-color6">
                  Complete &amp; Earn
                </h3>
                <p className="font-albert text-[8px] leading-[1.35] text-color1 mt-[4px]">
                  Deliver quality service, collect payments, earn reviews, and grow your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Grow Your Business CTA ==================== */}
      <section className="relative py-[70px] lg:py-[100px] overflow-hidden">
        <div className="max-w-[1320px] px-[15px] mx-auto bg-[#F0F9FE] min-h-[300px] w-full">
          <div className="grid grid-cols-12 px-[122px] py-[66px] gap-5">
            {/* LEFT CARD : 8 COLUMNS */}
            <div className="col-span-8 min-h-[320px] relative py-[44px]">
              <p className="font-outfit text-color5 font-medium text-[24px] capitalize">
                GROW YOUR BUSINESS WITH US
              </p>
              <p className="text-[42px] leading-[1.25] text-color9 font-outfit font-medium capitalize">
                Get More Customers <br /> Grow Your Business
              </p>
              {/* ARROW */}
              <div className="absolute right-0 bottom-0">
                <div dangerouslySetInnerHTML={{ __html: ctaArrowSvg }} />
              </div>
            </div>

            {/* RIGHT CARD : 4 COLUMNS */}
            <div className="col-span-4 min-h-[320px] flex justify-center items-center">
              <button
                type="button"
                onClick={() => setShowRegistration(true)}
                className="inline-block py-[16px] px-[36px] bg-color4 rounded-[20px] text-white flex gap-1.5"
              >
                Join As A Provvider
                <span dangerouslySetInnerHTML={{ __html: joinArrowSvg }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Earning Overview ==================== */}
      <section className="relative py-[70px] lg:py-[100px] bg-color2 overflow-hidden">
        <div className="max-w-[1350px] px-[15px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-[50px] lg:mb-[60px]">
            <p className="text-[15px] font-semibold text-color4 mb-[8px]">Earning Overview</p>
            <h2 className="font-outfit text-[38px] sm:text-[42px] font-semibold leading-[1.2] text-color5">
              Your Work, Your Earnings
              <br />
              Your Growth.
            </h2>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-[40px] lg:gap-x-0 max-w-[900px] mx-auto">
            {/* Left: stat rows */}
            <div className="lg:col-span-7 lg:pr-[50px] lg:border-r lg:border-color11 space-y-[26px]">
              <StatRow
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="16.5" cy="14" r="1.4" fill="currentColor" />
                  </svg>
                }
                title="Total Earnings"
                percent="75%"
                caption="All time earnings from completed jobs"
              />
              <StatRow
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M8 13.5l2 2 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                title="Completed Jobs"
                percent="68%"
                caption="Total job completed successfully"
              />
              <StatRow
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16l-5.2 2.9 1-5.8-4.3-4.1 5.9-.8L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                }
                title="Customer Rating"
                percent="85%"
                caption="Average rating from your customers"
              />
            </div>

            {/* Right: amount + CTA */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:pl-[50px] mt-[20px] lg:mt-0">
              <p className="flex items-baseline justify-center font-outfit text-color10 font-bold mb-[24px]">
                <span className="text-[34px] mr-[4px]">₹</span>
                <span ref={counterRef} className="text-[52px] leading-none">
                  0
                </span>
              </p>
              <button
                type="button"
                className="px-[28px] py-[12px] rounded-[24px] border-2 border-color4 text-color4 text-[15px] font-semibold hover:bg-color4 hover:text-white transition-all duration-300"
              >
                See Breakdown
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Success Stories ==================== */}
      <section className="w-full bg-white py-[40px] sm:py-[50px] lg:py-[60px]">
        <div className="relative w-full max-w-[1920px] min-h-[650px] min-[320px]:min-h-[900px] min-[480px]:min-h-[850px] min-[545px]:min-h-[760px] min-[780px]:min-h-[650px] mx-auto px-[15px] overflow-hidden">
          {/* Heading */}
          <div className="text-center relative z-20">
            <p className="text-color5 text-[10px] min-[320px]:text-[11px] sm:text-[12px] lg:text-[13px] font-medium mb-[7px]">
              Success Stories
            </p>
            <h2 className="text-[#203854] font-bold leading-[1.15] text-[21px] min-[320px]:text-[23px] min-[480px]:text-[25px] min-[545px]:text-[27px] min-[780px]:text-[30px] lg:text-[34px] xl:text-[36px]">
              Real People. Real Service. Real Results.
            </h2>
          </div>

          {/* Soft center background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[120px] w-[260px] h-[300px] min-[480px]:w-[330px] min-[480px]:h-[330px] min-[545px]:w-[390px] min-[545px]:h-[320px] min-[780px]:w-[470px] min-[780px]:h-[340px] lg:w-[520px] lg:h-[350px] rounded-full bg-[#eef8ff] blur-[30px]"></div>

          {/* Testimonials */}
          <div className="relative w-full mt-[55px] min-[545px]:mt-0 min-[545px]:min-h-[550px]">
            {/* 1. Priya */}
            <Testimonial
              avatar={aviPriya.src}
              name="Priya Sharma"
              text="I Love How Simple It Is To Accept Bookings And Manage My Services"
              className="min-[545px]:absolute min-[545px]:top-[70px] min-[545px]:left-[7%] min-[780px]:left-[10%] lg:left-[12%] xl:left-[14%]"
              bubbleWidth={145}
              bubbleTop={20}
            />

            {/* 2. Amit — top center */}
            <Testimonial
              avatar={aviAmit.src}
              name="Amit Kumar"
              text="The Bookings Are Consistent, And I Can Manage My Schedule Easily."
              className="min-[545px]:absolute min-[545px]:top-[15px] min-[545px]:left-1/2 min-[545px]:-translate-x-1/2"
            />

            {/* 3. Vikram — right */}
            <Testimonial
              avatar={aviVishal.src}
              name="Vikram Singh"
              text="Getting Service Requests And Communicating With Customers Is Quick And Easy."
              className="min-[545px]:absolute min-[545px]:top-[80px] min-[545px]:right-[7%] min-[780px]:right-[10%] lg:right-[12%] xl:right-[14%]"
              bubbleRight
            />

            {/* 4. Amit — center */}
            <Testimonial
              avatar={aviAmit.src}
              name="Amit Kumar"
              text="The Bookings Are Consistent, And I Can Manage My Schedule Easily."
              className="min-[545px]:absolute min-[545px]:top-[190px] min-[545px]:left-1/2 min-[545px]:-translate-x-1/2 w-[205px] h-[85px] min-[480px]:w-[215px]"
              bubbleWidth={155}
              bubbleTop={23}
              bubbleLeft={35}
            />

            {/* 5. Rahul — bottom left */}
            <Testimonial
              avatar={aviRahul.src}
              name="Rahul Mehta"
              text="Fix Now Projects Helped Me Reach More Customers In My Area."
              className="min-[545px]:absolute min-[545px]:top-[315px] min-[545px]:left-[12%] lg:left-[16%]"
            />

            {/* 6. Neha — bottom right */}
            <Testimonial
              avatar={aviNeha.src}
              name="Neha Kapoor"
              text="I've Built A Great Customer Base Through Fix Now Projects."
              className="min-[545px]:absolute min-[545px]:top-[315px] min-[545px]:right-[12%] lg:right-[16%]"
              bubbleRight
            />
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="w-full bg-color2 py-[40px] min-[320px]:py-[45px] min-[480px]:py-[50px] min-[545px]:py-[55px] min-[778px]:py-[60px] min-[991px]:py-[65px] min-[1200px]:py-[70px]">
        <div className="w-full max-w-[1350px] mx-auto px-[15px]">
          <div className="w-full max-w-[900px] mx-auto rounded-[6px] px-[15px] py-[24px] min-[480px]:px-[20px] min-[480px]:py-[26px] min-[545px]:px-[28px] min-[545px]:py-[30px] min-[778px]:px-[35px] min-[778px]:py-[32px] min-[991px]:px-[40px] min-[991px]:pt-[32px] min-[991px]:pb-[40px]">
            {/* FAQ eyebrow */}
            <div className="w-full text-center font-albert font-semibold text-[11px] min-[320px]:text-[12px] min-[545px]:text-[13px] tracking-[0.12em] text-color1 uppercase mb-[6px] min-[545px]:mb-[8px]">
              FAQ
            </div>

            {/* FAQ title */}
            <h2 className="w-full text-center font-outfit font-semibold text-[28px] min-[320px]:text-[30px] min-[480px]:text-[32px] min-[545px]:text-[35px] min-[778px]:text-[38px] min-[991px]:text-[42px] leading-[1.2] text-color5 capitalize mb-[22px] min-[480px]:mb-[24px] min-[545px]:mb-[28px]">
              Common Questions
            </h2>

            {/* FAQ list */}
            <div className="w-full flex flex-col">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className={`w-full overflow-hidden rounded-[6px] transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "bg-color-14 outline outline-1 outline-color7"
                        : "bg-color8"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full min-h-[58px] flex items-center px-[14px] py-[15px] min-[480px]:px-[17px] min-[480px]:py-[17px] min-[545px]:px-[20px] min-[545px]:py-[18px] min-[778px]:px-[22px] bg-transparent border-0 cursor-pointer text-left select-none"
                    >
                      {/* Number */}
                      <span className="shrink-0 font-outfit font-semibold text-[12px] min-[480px]:text-[13px] min-[545px]:text-[14px] text-color12 mr-[10px] min-[545px]:mr-[16px]">
                        {index + 1}
                      </span>

                      {/* Question */}
                      <span
                        className={`flex-1 min-w-0 font-outfit font-medium text-[14px] min-[480px]:text-[15px] min-[545px]:text-[16px] leading-[1.4] normal-case ${
                          isOpen ? "text-color5" : "text-color9"
                        }`}
                      >
                        {faq.q}
                      </span>

                      {/* Plus icon */}
                      <span
                        className={`relative shrink-0 w-[20px] h-[20px] min-[480px]:w-[21px] min-[480px]:h-[21px] min-[545px]:w-[22px] min-[545px]:h-[22px] rounded-full flex items-center justify-center ml-[10px] transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "bg-color12 border border-color12 rotate-180"
                            : "bg-color2 border border-color17"
                        }`}
                      >
                        <span
                          className={`absolute w-[10px] h-[1.5px] ${
                            isOpen ? "bg-color2" : "bg-color1"
                          }`}
                        ></span>
                        <span
                          className={`absolute w-[1.5px] h-[10px] transition-opacity duration-200 ${
                            isOpen ? "bg-color2 opacity-0" : "bg-color1 opacity-100"
                          }`}
                        ></span>
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      ref={(el) => {
                        answerRefs.current[index] = el;
                      }}
                      className="max-h-0 overflow-hidden transition-[max-height] duration-[350ms] ease-in-out"
                    >
                      <div className="px-[14px] pb-[18px] min-[480px]:px-[17px] min-[545px]:px-[22px] min-[545px]:pb-[20px] min-[778px]:pl-[58px]">
                        <p className="font-albert text-[13px] min-[480px]:text-[14px] min-[545px]:text-[15px] leading-[1.6] text-color1 normal-case">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </main>
      {showRegistration && <RegistrationModal onClose={() => setShowRegistration(false)} />}
      </div>
    </>
  );
}