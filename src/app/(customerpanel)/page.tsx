"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// --- DATA ARRAYS ---
const professionalServices = [
  {
    img: "/assets/images/professional-services1.png",
    tag: "Electrician",
    title: "Professional Electrical Solutions",
    count: "200+",
  },
  {
    img: "/assets/images/professional-services2.png",
    tag: "Personal Grooming",
    title: "Beauty & Wellness At Home",
    count: "150+",
  },
  {
    img: "/assets/images/professional-services3.png",
    tag: "Delivery Assistance",
    title: "Fast & Reliable Deliveries",
    count: "600+",
  },
  {
    img: "/assets/images/professional-services4.png",
    tag: "House Help",
    title: "Trusted Home Assistance",
    count: "300+",
  },
];

const popularServices = [
  {
    img: "/assets/images/popular-service.png",
    title: "house help",
    desc: "Reliable housekeeping services for cleaning, laundry, cooking assistance, and everyday household tasks.",
  },
  {
    img: "/assets/images/popular-service2.png",
    title: "beautiful grooming",
    desc: "Book certified beauty and wellness professionals for salon, spa, skincare, and grooming services at home.",
  },
  {
    img: "/assets/images/popular-service1.png",
    title: "Home Repair",
    desc: "Quick and professional repair services for plumbing, carpentry, appliances, and general home maintenance.",
  },
  {
    img: "/assets/images/popular-service.png",
    title: "house help",
    desc: "Reliable housekeeping services for cleaning, laundry, cooking assistance, and everyday household tasks.",
  },
];

const insights = [
  {
    img: "/assets/images/latest-insight.png",
    tag: "Home Maintenance",
    title: "7 Essential Home Maintenance Tips Every Homeowner Should Know",
    meta: "Jul 06, 2026 • 5 min read",
  },
  {
    img: "/assets/images/latest-insight4.png",
    tag: "Home Cleaning",
    title: "Deep Cleaning vs. Regular Cleaning: Which One Is Right for You?",
    meta: "Jul 02, 2026 • 4 min read",
  },
  {
    img: "/assets/images/latest-insight1.png",
    tag: "Electrical Safety",
    title: "5 Warning Signs You Should Call a Professional Electrician",
    meta: "Oct 14, 2026 • 0 Comments",
  },
  {
    img: "/assets/images/latest-insight2.png",
    tag: "House Help",
    title: "How to Choose a Reliable House Helper for Your Home",
    meta: "Oct 14, 2026 • 0 Comments",
  },
];

const faqs = [
  {
    q: "How Do I Book A Service?",
    a: "Booking a service is quick and easy. Browse available services, choose your preferred professional, select a suitable date and time, and confirm your booking in just a few clicks.",
  },
  {
    q: "Are All Service Providers Verified?",
    a: "Yes. Every professional On FIXNOW Undergoes Identity Verification And Background checks before joining our platform. We also monitor customer ratings and reviews to maintain high service standards.",
  },
  {
    q: "How Do Payments Work?",
    a: "FIXNOW offers secure online payment options with transparent pricing. You'll see the service cost before confirming your booking, with no hidden charges or unexpected fees.",
  },
  {
    q: "Can I Cancel Or Reschedule My Booking?",
    a: "Absolutely. You can easily cancel or reschedule your booking from your account before the scheduled service time. Cancellation policies may vary depending on the service category.",
  },
];

const applianceServices = [
  { img: "/assets/images/Frame 677 (1).png", title: "AC" },
  { img: "/assets/images/Frame 677.png", title: "Refrigerator" },
  { img: "/assets/images/Frame 677 (2).png", title: "Washing Machine" },
  { img: "/assets/images/Frame 677 (3).png", title: "Microwave" },
  { img: "/assets/images/Frame 677 (4).png", title: "Water Purifier" },
  { img: "/assets/images/Frame 677 (5).png", title: "Television" },
];

const electricalServices = [
  { img: "/assets/images/light.png", title: "Light" },
  { img: "/assets/images/fan.png", title: "Ceiling Fan" },
  { img: "/assets/images/switch.png", title: "Switches & Sockets" },
  { img: "/assets/images/Wiring.png", title: "Wiring" },
  { img: "/assets/images/MCB.png", title: "MCB/Fuse" },
  { img: "/assets/images/Frame 677.png", title: "Inverter" },
];

// --- MAIN COMPONENT ---
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Pure Tailwind Button Class (Replaces custom .cmn-btn CSS)
  const cmnBtnClasses =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-[20px] z-10 transition-colors duration-300 hover:text-white before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 bg-color4 text-white font-semibold font-outfit";

  useEffect(() => {
    // Hide loader after 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
        {/* ================= BANNER ================= */}
        <section className="relative overflow-hidden bg-white">
          <img
            src="/assets/images/banner-left-curve.png"
            alt="banner-left-curve"
            className="hidden lg:block absolute left-0 bottom-0 z-0 w-[1000px] xl:w-[1200px] h-auto pointer-events-none select-none"
          />

          <div className="relative z-10 max-w-[1350px] mx-auto px-[15px]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-y-[60px] lg:gap-x-[20px] min-h-[760px] xl:min-h-[893px] py-[70px] lg:py-0">
              {/* Left Content */}
              <div className="relative z-20 w-full lg:w-[38%]">
                <h1 className="font-bold leading-[1.15] text-center lg:text-left text-[38px] sm:text-[52px] text-color9 font-outfit">
                  Reliable Local Services. Anytime. At{" "}
                  <span className="text-color-15"> Your Doorstep. </span>
                </h1>

                <p className="mt-[32px] text-center lg:text-left text-[16px] sm:text-[18px] leading-[32px] text-color1 max-w-[620px]">
                  Find verified local professionals for cleaning, plumbing,
                  electrical work, repairs, deliveries, and more—all in one
                  place.
                </p>

                {/* Search */}
                <div className="mt-[48px] flex justify-center lg:justify-start items-center">
                  <div className="flex items-center w-full max-w-[520px] h-[64px] rounded-full bg-white shadow-md px-[8px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-color4 flex items-center justify-center flex-shrink-0 text-white">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Services..."
                      className="flex-1 bg-transparent outline-none px-[16px] text-[15px] text-black"
                    />
                    <button className="mr-[10px] text-gray-400 hover:text-color-15 transition-colors">
                      <i className="fa-solid fa-microphone"></i>
                    </button>
                  </div>
                  <button className="group w-[48px] h-[48px] ml-[18px] rounded-full bg-color4 flex items-center justify-center text-white border border-color4 transition-all hover:bg-white hover:text-color4 shadow-md shrink-0">
                    <i className="fa-solid fa-arrow-up-right transition-transform duration-300 group-hover:rotate-45"></i>
                  </button>
                </div>

                {/* Verified Card */}
                <div className="relative mt-[80px] z-10 max-w-[440px] mx-auto lg:mx-0 rounded-[24px] bg-white shadow-lg px-[32px] py-[28px]">
                  <div className="flex items-center">
                    <div className="flex">
                      <img
                        src="/assets/images/verified-professional1.png"
                        className="w-[48px] h-[48px] rounded-full object-cover"
                        alt="pro"
                      />
                      <img
                        src="/assets/images/verified-professional2.png"
                        className="w-[48px] h-[48px] rounded-full object-cover -ml-[18px]"
                        alt="pro"
                      />
                      <img
                        src="/assets/images/verified-professional3.png"
                        className="w-[48px] h-[48px] rounded-full object-cover -ml-[18px]"
                        alt="pro"
                      />
                    </div>
                    <div className="ml-[18px]">
                      <h4 className="font-bold text-[28px] text-black font-outfit">
                        500+
                      </h4>
                      <p className="font-semibold text-[20px] font-outfit text-black">
                        Verified Professionals
                      </p>
                    </div>
                  </div>
                  <p className="mt-[28px] leading-[30px] text-[16px] text-[#5F6B7A]">
                    Background-checked and identity-verified experts, ensuring
                    every service is delivered with trust, safety and
                    professionalism.
                  </p>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative z-10 w-full lg:w-[62vw] xl:w-[68vw] h-[320px] sm:h-[420px] md:h-[520px] lg:h-[893px] lg:-mr-[8vw]">
                <img
                  src="/assets/images/hero-right.png"
                  alt="Hero Illustration"
                  className="w-full h-full object-contain scale-[1.15] origin-center"
                />

                {/* Float Cards */}
                <div className="flex absolute z-30 left-[10px] sm:left-[20px] lg:left-[-30px] bottom-[40px] sm:bottom-[70px] lg:bottom-[120px] w-[220px] sm:w-[260px] lg:w-[340px] items-center rounded-[22px] bg-white/85 backdrop-blur-xl border border-white/70 px-[22px] py-[18px] shadow-lg">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#EAF5FF] flex items-center justify-center shrink-0">
                    <div className="w-[44px] h-[44px] rounded-full bg-color4 flex items-center justify-center text-white">
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                  </div>
                  <div className="ml-[18px]">
                    <h5 className="text-[20px] font-semibold text-color9 font-outfit">
                      On-Time Guarantee
                    </h5>
                    <p className="mt-[6px] text-[15px] leading-[24px] text-gray-500">
                      Reliable Service Delivered Exactly When Promised.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex absolute z-30 right-0 bottom-[20px] w-[340px] items-center rounded-[22px] bg-white/85 backdrop-blur-xl border border-white/70 px-[22px] py-[18px] shadow-lg">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#EAF5FF] flex items-center justify-center shrink-0">
                    <div className="w-[44px] h-[44px] rounded-full bg-color12 flex items-center justify-center text-white">
                      <i className="fa-solid fa-comment-dots"></i>
                    </div>
                  </div>
                  <div className="ml-[18px]">
                    <span className="text-[13px] text-color4 font-medium">
                      Need Help?
                    </span>
                    <h5 className="mt-[4px] text-[20px] font-semibold text-color9 font-outfit">
                      Chat With FIXBOT
                    </h5>
                    <p className="mt-[5px] text-[15px] leading-[24px] text-gray-500">
                      We're here to help 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROFESSIONAL SERVICES ================= */}
        <section className="py-[40px] sm:py-[50px] lg:py-[60px] overflow-hidden">
          <div className="max-w-[1350px] px-[15px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="w-full lg:w-[560px]">
                <span className="block text-color13 text-[18px] sm:text-[20px] font-medium capitalize font-outfit mb-[10px]">
                  Professional Services
                </span>
                <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 max-w-[500px] font-outfit">
                  Trusted Experts For Every Home Service
                </h2>
              </div>
              <div className="w-full lg:w-[480px] lg:ml-auto mt-[20px] lg:mt-0">
                <p className="text-[15px] sm:text-[16px] text-left lg:text-right text-color10">
                  From everyday maintenance to specialized home care, connect
                  with verified professionals committed to quality workmanship,
                  transparent pricing, and dependable service.
                </p>
              </div>
            </div>

            <div className="mt-[40px] sm:mt-[55px] lg:mt-[76px]">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={3}
                loop={true}
                speed={800}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 16 },
                  576: { slidesPerView: 2, spaceBetween: 20 },
                  992: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {professionalServices.map((service, idx) => (
                  <SwiperSlide key={idx} className="!flex h-auto">
                    <div className="group h-full w-full rounded-[20px] bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <figure className="relative rounded-t-[20px] overflow-hidden">
                        <img
                          src={service.img}
                          alt={service.tag}
                          className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </figure>
                      <div className="pt-[18px] pb-[24px] sm:pb-[32px] lg:pb-[40px] px-[16px] sm:px-[20px]">
                        <span className="inline-block px-[12px] sm:px-[14px] lg:px-[16px] py-[6px] sm:py-[7px] lg:py-[8px] rounded-full border border-color4 text-[13px] sm:text-[14px] lg:text-[16px] text-color5">
                          {service.tag}
                        </span>
                        <h3 className="font-outfit text-[20px] sm:text-[22px] lg:text-[24px] leading-[28px] sm:leading-[32px] lg:leading-[34px] font-semibold text-color1 mt-[18px] sm:mt-[20px] lg:mt-[23px] capitalize">
                          {service.title}
                        </h3>
                        <div className="flex justify-between items-center mt-[18px] sm:mt-[22px] lg:mt-[24px]">
                          <div className="flex items-center">
                            <div className="flex items-center bg-color8 rounded-[31px] p-[6px]">
                              <img
                                src="/assets/images/card-small-image-1.png"
                                className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px] rounded-full relative z-10"
                                alt=""
                              />
                              <img
                                src="/assets/images/card-small-image-2.png"
                                className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px] rounded-full -ml-[14px] sm:-ml-[18px] lg:-ml-[20px] relative z-20"
                                alt=""
                              />
                              <img
                                src="/assets/images/card-small-image-3.png"
                                className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px] rounded-full -ml-[14px] sm:-ml-[18px] lg:-ml-[20px] relative z-30"
                                alt=""
                              />
                              <div className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px] rounded-full bg-[#99D7F7] ml-[9px] flex items-center justify-center text-black text-xs font-bold">
                                +
                              </div>
                            </div>
                            <div className="ml-[10px]">
                              <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-color1">
                                {service.count} Trusted
                              </p>
                              <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-color1">
                                Professionals
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsServiceModalOpen(true)}
                            className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[50px] lg:h-[50px] shrink-0 rounded-full border border-color4 flex items-center justify-center text-color4 transition-all duration-300 group-hover:bg-color4 group-hover:text-white shadow-md"
                          >
                            <i className="fa-solid fa-arrow-up-right transition-transform duration-300 group-hover:rotate-45"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex justify-center mt-[40px] sm:mt-[55px] lg:mt-[76px]">
              <button
                className={`${cmnBtnClasses} py-[16px] px-[48px] text-[16px]`}
              >
                View More
              </button>
            </div>
          </div>
        </section>

        {/* ================= COVERAGE ================= */}
        <section className="w-full overflow-hidden py-[80px] sm:py-[90px] md:py-[100px] lg:py-[106px]">
          <div className="relative w-full h-[650px] min-[375px]:h-[680px] sm:h-[720px] md:h-[780px] lg:h-[900px] bg-[url('/assets/images/location.png')] bg-center bg-no-repeat bg-contain">
            <p className="text-color-15 text-center font-medium capitalize mb-[8px] text-[15px] min-[375px]:text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] font-outfit">
              Service Coverage
            </p>
            <h2 className="text-[20px] min-[375px]:text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 text-center mx-auto max-w-[280px] min-[375px]:max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] font-outfit">
              Bring service close to you
            </h2>

            <div className="absolute z-[2] w-[110px] min-[350px]:w-[120px] min-[375px]:w-[135px] sm:w-[155px] md:w-[175px] lg:w-[195px] h-[55px] min-[350px]:h-[60px] min-[375px]:h-[65px] sm:h-[75px] md:h-[82px] lg:h-[93px] rounded-[14px] min-[375px]:rounded-[16px] sm:rounded-[20px] lg:rounded-[25px] bg-white shadow-lg top-[205px] min-[375px]:top-[215px] sm:top-[225px] md:top-[230px] lg:top-[228px] left-[3%] sm:left-[7%] md:left-[8%] lg:left-[5.4%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] min-[375px]:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[16px]">
                Madhya Pradesh
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] min-[350px]:w-[95px] min-[375px]:w-[105px] sm:w-[115px] md:w-[120px] lg:w-[128px] h-[55px] min-[350px]:h-[58px] min-[375px]:h-[62px] sm:h-[70px] md:h-[80px] lg:h-[93px] rounded-[14px] min-[375px]:rounded-[16px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[290px] min-[375px]:top-[300px] sm:top-[315px] md:top-[325px] lg:top-[328px] left-[20%] sm:left-[24%] md:left-[26%] lg:left-[20.8%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[15px]">
                Maharastra
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] min-[350px]:w-[95px] min-[375px]:w-[105px] sm:w-[115px] md:w-[120px] lg:w-[128px] h-[55px] min-[350px]:h-[58px] min-[375px]:h-[62px] sm:h-[70px] md:h-[80px] lg:h-[93px] rounded-[14px] min-[375px]:rounded-[16px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[365px] min-[375px]:top-[375px] sm:top-[390px] md:top-[400px] lg:top-[328px] left-[8%] sm:left-[38%] md:left-[39%] lg:left-[35.1%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[15px]">
                West Bengal
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] min-[350px]:w-[95px] min-[375px]:w-[105px] sm:w-[115px] md:w-[120px] lg:w-[128px] h-[55px] min-[350px]:h-[58px] min-[375px]:h-[62px] sm:h-[70px] md:h-[80px] lg:h-[93px] rounded-[14px] min-[375px]:rounded-[16px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[365px] min-[375px]:top-[375px] sm:top-[390px] md:top-[400px] lg:top-[328px] right-[8%] sm:right-[28%] md:right-[29%] lg:right-[34.1%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[15px]">
                Tamil Nadu
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] min-[350px]:w-[95px] min-[375px]:w-[105px] sm:w-[115px] md:w-[120px] lg:w-[128px] h-[55px] min-[350px]:h-[58px] min-[375px]:h-[62px] sm:h-[70px] md:h-[80px] lg:h-[93px] rounded-[14px] min-[375px]:rounded-[16px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[445px] min-[375px]:top-[455px] sm:top-[470px] md:top-[480px] lg:top-[328px] left-[20%] sm:left-auto lg:right-[244px] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[15px]">
                Karnataka
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] min-[350px]:w-[95px] min-[375px]:w-[105px] sm:w-[115px] md:w-[120px] lg:w-[128px] h-[55px] min-[350px]:h-[58px] min-[375px]:h-[62px] sm:h-[70px] md:h-[80px] lg:h-[93px] rounded-[14px] min-[375px]:rounded-[16px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[445px] min-[375px]:top-[455px] sm:top-[470px] md:top-[480px] lg:top-[328px] right-[16%] sm:right-auto lg:right-[94px] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[15px]">
                Manipur
              </p>
            </div>
          </div>
        </section>

        {/* ================= POPULAR SERVICES ================= */}
        <section className="py-[80px] sm:py-[90px] md:py-[100px] lg:py-[106px] bg-gray-50">
          <div className="max-w-[1350px] px-[15px] mx-auto">
            <div className="w-full lg:w-1/2">
              <p className="text-color-15 font-medium capitalize mb-[10px] text-[18px] sm:text-[20px] font-outfit">
                Popular services
              </p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 font-outfit">
                Your one-stop destination for trusted local services, delivered
                with quality and care.
              </h2>
            </div>
            <div className="mt-[46px]">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 15 },
                  545: { slidesPerView: 2, spaceBetween: 20 },
                  991: { slidesPerView: 3, spaceBetween: 30 },
                }}
              >
                {popularServices.map((service, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full">
                      <figure className="w-full h-[250px] sm:h-[280px] lg:h-[300px] overflow-hidden rounded-[20px]">
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </figure>
                      <p className="font-outfit text-[20px] text-black font-medium capitalize my-[10px]">
                        {service.title}
                      </p>
                      <p className="text-color1">{service.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="py-[80px] sm:py-[90px] md:py-[100px] lg:py-[106px]">
          <div className="max-w-[1350px] px-[15px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
            <div className="col-span-12 lg:col-span-6 flex justify-center flex-col">
              <p className="text-color-15 font-medium capitalize mb-[10px] text-[18px] sm:text-[20px] font-outfit">
                Why choose Us
              </p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 font-outfit">
                Trusted Professionals. Seamless Experience. Reliable Service.
              </h2>
              <p className="text-black mt-[20px] sm:mt-[24px] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.6] max-w-full lg:max-w-[600px]">
                At FIXNOW, we simplify everyday living by connecting you with
                verified local professionals who deliver quality service,
                transparent pricing, and dependable support—every time.
              </p>
              <button
                className={`${cmnBtnClasses} w-fit mt-[20px] sm:mt-[24px] py-[14px] px-[30px] sm:py-[16px] sm:px-[48px]`}
              >
                Contact Us{" "}
                <i className="fa-solid fa-arrow-right ml-2 text-white"></i>
              </button>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Swiper
                modules={[Autoplay]}
                direction="vertical"
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={140}
                loop={true}
                speed={1000}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                className="mySwiper h-[700px] w-full lg:max-w-[584px]"
              >
                {[1, 2, 3].map((item) => (
                  <SwiperSlide
                    key={item}
                    className="flex justify-center items-center"
                  >
                    <div className="flex w-full lg:w-[584px] lg:h-[303px] items-center rounded-[25px] overflow-hidden justify-center bg-white shadow-md">
                      <div className="w-3/5 px-[30px] py-[30px] lg:px-[50px] lg:py-[50px] bg-[linear-gradient(to_right,#DDF0FC_0%,#FFFFFF_100%)] h-full">
                        <p className="font-outfit text-[56px] font-bold text-color4 mb-[11px]">
                          0{item}
                        </p>
                        <p className="text-black font-outfit text-[20px] font-bold whitespace-nowrap mb-[20px]">
                          Transparent Pricing
                        </p>
                        <p className="font-albert font-normal text-[14px] lg:text-[16px] text-black">
                          Know exactly what you're paying before confirming your
                          booking. No hidden charges, no unexpected surprises.
                        </p>
                      </div>
                      <div className="w-2/5 h-full">
                        <img
                          src="/assets/images/Frame76.png"
                          alt="Feature"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-[80px] sm:py-[90px] md:py-[100px] lg:py-[106px] bg-gray-50">
          <div className="max-w-[1350px] px-[15px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
            <div className="w-full">
              <p className="text-color-15 font-medium capitalize mb-[10px] text-[18px] sm:text-[20px] font-outfit">
                How it works
              </p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 font-outfit">
                Book trusted local services in just three simple steps—fast,
                secure, and hassle-free.
              </h2>
              <div className="mt-[20px] w-full h-[2px] bg-black opacity-50"></div>

              <div className="lg:pt-[260px] sm:py-[10px]">
                <div className="group flex items-center cursor-pointer py-[12px] hover:text-[#AEAEAE]">
                  <p className="font-outfit font-medium text-[28px] text-black transition-colors duration-300 group-hover:text-[#AEAEAE]">
                    01
                  </p>
                  <p className="ms-[64px] font-outfit font-medium text-[28px] uppercase text-black transition-colors duration-300 group-hover:text-[#AEAEAE]">
                    choose your service
                  </p>
                </div>
                <div className="group flex items-center cursor-pointer py-[12px] hover:text-[#AEAEAE]">
                  <p className="font-outfit font-medium text-[28px] text-black transition-colors duration-300 group-hover:text-[#AEAEAE]">
                    02
                  </p>
                  <p className="ms-[64px] font-outfit font-medium text-[28px] uppercase text-black transition-colors duration-300 group-hover:text-[#AEAEAE]">
                    book when it suits you
                  </p>
                </div>
                <div className="group flex items-center cursor-pointer py-[12px] hover:text-[#AEAEAE]">
                  <p className="font-outfit font-medium text-[28px] text-black transition-colors duration-300 group-hover:text-[#AEAEAE]">
                    03
                  </p>
                  <p className="ms-[64px] font-outfit font-medium text-[28px] uppercase text-black transition-colors duration-300 group-hover:text-[#AEAEAE]">
                    relax while we do the rest
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-start flex-col lg:mt-[-110px] mt-[40px]">
              <p className="text-black text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.6] max-w-[600px] lg:mt-[160px]">
                Browse through a wide range of verified local services, from
                home cleaning and repairs to personal grooming and electrical
                work. Compare professionals, ratings, and pricing before making
                your choice.
              </p>
              <button
                className={`${cmnBtnClasses} w-fit mt-[20px] sm:mt-[24px] py-[14px] px-[30px] sm:py-[16px] sm:px-[48px]`}
              >
                Read More
              </button>
              <img
                src="/assets/images/img.png"
                alt="How it works"
                className="object-contain h-[554px] mt-8"
              />
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-[80px] sm:py-[90px] md:py-[100px] lg:py-[106px] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 h-[700px] w-[1000px] -translate-y-1/2 rounded-full bg-[#D97706]/30 blur-[100px] -z-10"></div>
          <div className="max-w-[1350px] px-[15px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row justify-between mb-[66px]">
              <div className="w-full">
                <p className="text-color-15 font-medium capitalize mb-[10px] text-[18px] sm:text-[20px] font-outfit">
                  Testimonial
                </p>
                <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 font-outfit">
                  Trusted by Thousands of Happy Customers
                </h2>
              </div>
            </div>

            <div className="overflow-hidden">
              <Swiper
                modules={[Autoplay, Navigation, FreeMode]}
                spaceBetween={30}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={{
                  prevEl: ".testimonialPrev",
                  nextEl: ".testimonialNext",
                }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 15 },
                  768: { slidesPerView: 1, spaceBetween: 20 },
                  992: { slidesPerView: 2, spaceBetween: 30 },
                }}
              >
                {[1, 2, 3].map((item) => (
                  <SwiperSlide key={item}>
                    <div className="h-[350px] sm:h-[400px] lg:h-[409px] w-full overflow-hidden rounded-[20px] bg-white px-[30px] py-[50px] lg:px-[50px] lg:py-[109px] shadow-sm border border-gray-100">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7969 38.75C11.7969 38.6984 11.7969 38.6469 11.7969 38.5938C11.8706 38.5965 11.9444 38.5992 12.0203 38.602C13.2969 38.6289 14.412 38.3018 15.4151 37.4805C15.6409 37.2494 15.7716 37.0995 15.7932 36.7737C15.7849 36.6788 15.7849 36.6788 15.7764 36.582C15.7723 36.5196 15.7682 36.4572 15.7639 36.3928C15.6126 35.8423 15.2125 35.4078 14.8389 34.9902C14.7488 34.8879 14.6586 34.7856 14.5685 34.6832C14.5232 34.632 14.4779 34.5808 14.4313 34.528C14.2227 34.2905 14.0183 34.0494 13.8135 33.8086C13.5327 33.4793 13.2471 33.1556 12.9542 32.8369C12.5772 32.4252 12.2233 31.9986 11.8751 31.5625C11.8423 31.522 11.8096 31.4814 11.7759 31.4396C10.4806 29.8327 9.40496 28.2199 8.75005 26.25C8.72799 26.1841 8.70592 26.1181 8.68318 26.0502C8.62715 25.8825 8.57132 25.7147 8.51568 25.5469C8.57248 25.5573 8.62928 25.5676 8.6878 25.5783C11.9184 26.1457 15.4975 25.684 18.2694 23.8361C18.4859 23.682 18.6968 23.5229 18.9063 23.3594C18.9788 23.3029 19.0513 23.2464 19.126 23.1882C20.6925 21.9372 21.7717 20.3723 22.5001 18.5156C22.5353 18.4263 22.5705 18.337 22.6069 18.2449C23.7649 15.0477 23.6503 11.2436 22.5782 8.04688C22.5599 7.99098 22.5415 7.93509 22.5227 7.8775C21.7104 5.43322 20.144 3.366 17.8675 2.12525C15.2553 0.864658 12.1793 0.807064 9.44372 1.69438C8.31234 2.09064 7.21852 2.65469 6.25005 3.35938C6.16707 3.4191 6.08409 3.47882 5.99859 3.54035C2.72992 5.9639 0.765988 9.65679 0.108296 13.6153C0.0251198 14.203 -0.013071 14.7783 -0.0158156 15.372C-0.0163672 15.4514 -0.0169187 15.5307 -0.0174869 15.6125C-0.0343042 18.75 0.248816 21.7342 1.0938 24.7656C1.12166 24.8668 1.12166 24.8668 1.15007 24.9701C2.4723 29.7121 5.16455 35.6207 9.62926 38.1607C11.2831 39.0754 11.2831 39.0754 11.7969 38.75ZM5.31255 28.6719C4.81707 27.723 4.81707 27.723 4.45318 26.7188C4.60464 26.7321 4.60464 26.7321 4.76568 26.7969C4.87203 26.9459 4.87203 26.9459 4.94726 27.1353C4.97762 27.2042 5.00798 27.273 5.03927 27.3439C5.06983 27.4164 5.1004 27.4888 5.13189 27.5635C5.16336 27.635 5.19483 27.7066 5.22726 27.7803C5.35545 28.0751 5.47685 28.3573 5.54693 28.6719C5.46958 28.6719 5.39224 28.6719 5.31255 28.6719ZM7.18755 10.3125C7.18755 10.1836 7.18755 10.0547 7.18755 9.92188C7.2649 9.92188 7.34224 9.92188 7.42193 9.92188C7.37037 10.0508 7.3188 10.1797 7.26568 10.3125C7.2399 10.3125 7.21412 10.3125 7.18755 10.3125ZM11.3282 10.3125C11.4512 9.56176 11.7483 8.8556 12.3438 8.35938C12.3954 8.3336 12.4469 8.30782 12.5001 8.28125C12.3636 8.65022 12.1846 8.99323 12.002 9.34082C11.9718 9.39979 11.9416 9.45875 11.9105 9.5195C11.7479 9.82906 11.5973 10.0809 11.3282 10.3125ZM5.07818 7.73438C5.07818 7.68282 5.07818 7.63125 5.07818 7.57813C5.12974 7.60391 5.1813 7.62969 5.23443 7.65625C5.18287 7.68203 5.1313 7.70782 5.07818 7.73438Z"
                          fill="#D97706"
                        />
                      </svg>
                      <p className="mt-[41px] text-gray-700">
                        Excellent service! The technician arrived on time,
                        quickly identified the issue, and fixed my AC
                        efficiently. Highly recommended.
                      </p>
                      <div className="flex mt-[24px] items-center">
                        <img
                          src="/assets/images/Ellipse 1.png"
                          alt=""
                          className="rounded-full object-cover w-12 h-12"
                        />
                        <div className="ms-[10px]">
                          <p className="font-outfit text-color9 text-[16px] capitalize font-medium">
                            Aditi Roy
                          </p>
                          <p className="capitalize mt-[5px] text-gray-500 text-sm">
                            small business owner
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-[30px] flex w-full justify-end">
              <div className="flex items-center gap-[10px]">
                <button className="testimonialPrev flex h-[50px] w-[50px] px-[16px] py-[18px] items-center justify-center rounded-[10px] bg-[#D97706] border-2 border-transparent hover:border-[#D97706] hover:bg-white transition-all duration-300">
                  <i className="fa-solid fa-arrow-left text-color10"></i>
                </button>
                <button className="testimonialNext flex h-[50px] w-[50px] px-[16px] py-[18px] items-center justify-center rounded-[10px] bg-[#D97706] border-2 border-transparent hover:border-[#D97706] hover:bg-white transition-all duration-300">
                  <i className="fa-solid fa-arrow-right text-color10"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= EXPERT ADVICE ================= */}
        <section className="py-[80px] sm:py-[90px] md:py-[100px] lg:py-[106px] bg-gray-50">
          <div className="max-w-[1350px] px-[15px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div>
                <p className="text-color-15 font-medium capitalize mb-[10px] text-[18px] sm:text-[20px] font-outfit">
                  Latest Insight Tips
                </p>
                <h2 className="heading-2 text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 font-outfit">
                  Expert Advice for a Better Home
                </h2>
              </div>
              <div className="flex justify-end items-center mt-[20px] lg:mt-0">
                <a
                  href="#"
                  className="border-2 border-color4 rounded-[20px] px-[36px] py-[16px] font-semibold text-color4 hover:bg-color4 hover:text-white transition-all"
                >
                  View More
                </a>
              </div>
            </div>

            <div className="mt-[46px]">
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 15 },
                  545: { slidesPerView: 2, spaceBetween: 20 },
                  780: { slidesPerView: 2, spaceBetween: 25 },
                  991: { slidesPerView: 4, spaceBetween: 30 },
                }}
              >
                {insights.map((insight, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full overflow-hidden">
                      <figure className="w-full h-[253px] overflow-hidden rounded-[20px]">
                        <img
                          src={insight.img}
                          alt="Insight"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </figure>
                      <p className="text-[14px] text-color4 font-semibold mt-[15px]">
                        {insight.tag}
                      </p>
                      <p className="text-[18px] text-color10 font-bold mt-[10px] leading-[1.4] font-outfit">
                        {insight.title}
                      </p>
                      <p className="text-[13px] font-medium text-gray-500 mt-[10px]">
                        {insight.meta}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* ================= FAQs ================= */}
        <section className="faq-section relative py-[40px] sm:py-[50px] lg:py-[60px]">
          <div className="max-w-[1350px] px-[15px] mx-auto relative z-[1]">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-5/12 mb-[30px] sm:mb-[40px] lg:mb-0">
                <img
                  src="/assets/images/faq-image.png"
                  alt="FAQ"
                  className="w-full max-w-none lg:max-w-[509px] mx-auto object-contain"
                />
              </div>
              <div className="w-full lg:w-7/12 lg:pl-[40px]">
                <span className="inline-block text-[16px] sm:text-[18px] lg:text-[20px] font-medium uppercase text-[var(--color13)] mb-[12px] sm:mb-[16px] font-[var(--outfit-r)]">
                  Frequently Asked Questions
                </span>
                <h2 className="heading-2 text-[32px] sm:text-[36px] lg:text-[42px] font-semibold text-[var(--color10)] mb-[25px] sm:mb-[30px] lg:mb-[40px] font-outfit">
                  Everything You Need To Know.
                </h2>

                <div className="w-full">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border-b border-[rgba(2,139,245,0.15)]"
                    >
                      <button
                        onClick={() =>
                          setActiveFaq(activeFaq === idx ? null : idx)
                        }
                        className="w-full flex justify-between items-center py-[20px] sm:py-[25px] lg:py-[30px] outline-none"
                      >
                        <span className="text-left text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-[#073E73] font-outfit">
                          {faq.q}
                        </span>
                        <span className="text-[24px] sm:text-[28px] lg:text-[30px] font-light transition-transform duration-300">
                          {activeFaq === idx ? (
                            <i className="fa-solid fa-minus text-[#073E73]"></i>
                          ) : (
                            <i className="fa-solid fa-plus text-[#073E73]"></i>
                          )}
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? "max-h-[500px]" : "max-h-0"}`}
                      >
                        <p className="pb-[20px] sm:pb-[24px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[26px] sm:leading-[28px] lg:leading-[30px] capitalize text-[var(--color4)]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= MODAL: SERVICE SELECTION ================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-[95%] max-w-[1140px] max-h-[90vh] rounded-[16px] min-[375px]:rounded-[20px] lg:rounded-[24px] bg-white border-0 px-[12px] py-[24px] min-[350px]:px-[14px] min-[350px]:py-[28px] min-[375px]:px-[16px] min-[375px]:py-[32px] sm:px-[20px] sm:py-[40px] md:px-[24px] md:py-[50px] lg:px-[30px] lg:py-[60px] shadow-[4px_0_18.5px_0_#D1D5DB]">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute right-[15px] top-[15px] z-50 text-[32px] leading-none text-black"
            >
              &times;
            </button>
            <div className="overflow-y-auto hide-scrollbar max-h-[75vh]">
              <p className="text-black font-semibold text-[32px] font-outfit">
                Appliance Repair Our Service
              </p>

              <div className="grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-[10px] min-[375px]:gap-[12px] sm:gap-[16px] md:gap-[20px] lg:gap-[24px] mt-[20px] sm:mt-[30px] lg:mt-[40px]">
                {applianceServices.map((item, i) => (
                  <div
                    key={i}
                    className="col-span-2 min-h-[180px] rounded-[15px] shadow-[5px_0_10.1px_0_#F3F4F6] p-[10px] relative flex flex-col justify-center items-center hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <figure>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full object-contain max-h-[80px] mb-2"
                      />
                    </figure>
                    <div className="rounded-[10px] bg-[#16A34A]/15 flex items-center justify-center gap-1 py-[5px] px-[10px] mb-2">
                      <div className="w-[6px] h-[6px] rounded-full bg-[#16A34A] animate-pulse duration-700"></div>
                      <p className="text-[12px] font-semibold text-[#16A34A]">
                        5 Mins
                      </p>
                    </div>
                    <p className="text-[#374151] text-[16px] font-bold text-center font-outfit">
                      {item.title}
                    </p>
                  </div>
                ))}
                <div className="col-span-2 min-h-[180px] rounded-[15px] shadow-[5px_0_10.1px_0_#F3F4F6] p-[10px] relative flex flex-col justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
                  <p className="text-[#374151] text-[16px] font-bold font-outfit">
                    +3 More
                  </p>
                </div>
              </div>

              <p className="text-black font-semibold text-[32px] mt-[40px] font-outfit">
                Electrical Installation Repair Service
              </p>

              <div className="grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-[10px] min-[375px]:gap-[12px] sm:gap-[16px] md:gap-[20px] lg:gap-[24px] mt-[20px] sm:mt-[30px] lg:mt-[40px]">
                {electricalServices.map((item, i) => (
                  <div
                    key={i}
                    className="col-span-2 min-h-[180px] rounded-[15px] shadow-[5px_0_10.1px_0_#F3F4F6] p-[10px] relative flex flex-col justify-center items-center hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <figure>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full object-contain max-h-[80px] mb-2"
                      />
                    </figure>
                    <div className="rounded-[10px] bg-[#16A34A]/15 flex items-center justify-center gap-1 py-[5px] px-[10px] mb-2">
                      <div className="w-[6px] h-[6px] rounded-full bg-[#16A34A] animate-pulse duration-700"></div>
                      <p className="text-[12px] font-semibold text-[#16A34A]">
                        5 Mins
                      </p>
                    </div>
                    <p className="text-[#374151] text-[16px] font-bold text-center font-outfit">
                      {item.title}
                    </p>
                  </div>
                ))}
                <div className="col-span-2 min-h-[180px] rounded-[15px] shadow-[5px_0_10.1px_0_#F3F4F6] p-[10px] relative flex flex-col justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
                  <p className="text-[#374151] text-[16px] font-bold font-outfit">
                    +2 More
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
