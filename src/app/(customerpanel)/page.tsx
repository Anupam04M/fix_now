"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import {
  Search,
  Mic,
  ArrowUpRight,
  ShieldCheck,
  MessageCircle,
  MoveRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// --- Image Imports ---
import bannerLeftCurve from "@/assets/images/banner-left-curve.png";
import heroRight from "@/assets/images/hero-right.png";
import vp1 from "@/assets/images/verified-professional1.png";
import vp2 from "@/assets/images/verified-professional2.png";
import vp3 from "@/assets/images/verified-professional3.png";

import ps1 from "@/assets/images/professional-services1.png";
import ps2 from "@/assets/images/professional-services2.png";
import ps3 from "@/assets/images/professional-services3.png";
import ps4 from "@/assets/images/professional-services4.png";

import cardSmall1 from "@/assets/images/card-small-image-1.png";
import cardSmall2 from "@/assets/images/card-small-image-2.png";
import cardSmall3 from "@/assets/images/card-small-image-3.png";

import pop1 from "@/assets/images/popular-service.png";
import pop2 from "@/assets/images/popular-service2.png";
import pop3 from "@/assets/images/popular-service1.png";

import whyImg from "@/assets/images/img.png";
import frame76 from "@/assets/images/Frame76.png";

import ellipse1 from "@/assets/images/Ellipse 1.png";

import insight1 from "@/assets/images/latest-insight.png";
import insight4 from "@/assets/images/latest-insight4.png";
import insight2 from "@/assets/images/latest-insight1.png";
import insight3 from "@/assets/images/latest-insight2.png";

import faqImage from "@/assets/images/faq-image.png";

import imgAppliance from "@/assets/images/Frame 677.png";
import imgAC from "@/assets/images/Frame 677 (1).png";
import imgWashingMachine from "@/assets/images/Frame 677 (2).png";
import imgMicrowave from "@/assets/images/Frame 677 (3).png";
import imgWaterPurifier from "@/assets/images/Frame 677 (4).png";
import imgTelevision from "@/assets/images/Frame 677 (5).png";
import imgCeilingFan from "@/assets/images/Frame 677 (6).png";
import imgWiring from "@/assets/images/Wiring.png";
import imgSwitch from "@/assets/images/switch.png";
import imgLight from "@/assets/images/light.png";
import imgMCB from "@/assets/images/MCB.png";
import imgInverter from "@/assets/images/Frame 677.png";

// --- Data ---
const professionalServicesData = [
  { img: ps1, tag: "Electrician", title: "Professional Electrical Solutions" },
  { img: ps2, tag: "Personal Grooming", title: "Beauty & Wellness At Home" },
  { img: ps3, tag: "Delivery Assistance", title: "Fast & Reliable Deliveries" },
  { img: ps4, tag: "House Help", title: "Trusted Home Assistance" },
];

const popularServicesData = [
  {
    img: pop1,
    title: "house help",
    desc: "Reliable housekeeping services for cleaning, laundry, cooking assistance, and everyday household tasks.",
  },
  {
    img: pop2,
    title: "beautiful grooming",
    desc: "Book certified beauty and wellness professionals for salon, spa, skincare, and grooming services at home.",
  },
  {
    img: pop3,
    title: "Home Repair",
    desc: "Quick and professional repair services for plumbing, carpentry, appliances, and general home maintenance.",
  },
  {
    img: pop1,
    title: "house help",
    desc: "Reliable housekeeping services for cleaning, laundry, cooking assistance, and everyday household tasks.",
  },
];

const latestInsightsData = [
  {
    img: insight1,
    tag: "Home Maintenance",
    title: "7 Essential Home Maintenance Tips Every Homeowner Should Know",
    meta: "Jul 06, 2026 • 5 min read",
  },
  {
    img: insight4,
    tag: "Home Cleaning",
    title: "Deep Cleaning vs. Regular Cleaning: Which One Is Right for You?",
    meta: "Jul 02, 2026 • 4 min read",
  },
  {
    img: insight2,
    tag: "Electrical Safety",
    title: "5 Warning Signs You Should Call a Professional Electrician",
    meta: "Oct 14, 2026 • 0 Comments",
  },
  {
    img: insight3,
    tag: "House Help",
    title: "How to Choose a Reliable House Helper for Your Home",
    meta: "Oct 14, 2026 • 0 Comments",
  },
];

const faqData = [
  {
    q: "How Do I Book A Service?",
    a: "Booking a service is quick and easy. Browse available services, choose your preferred professional, select a suitable date and time, and confirm your booking in just a few clicks.",
  },
  {
    q: "Are All Service Providers Verified?",
    a: "Yes. Every professional on FIXNOW undergoes identity verification and background checks before joining our platform.",
  },
  {
    q: "How Do Payments Work?",
    a: "FIXNOW offers secure online payment options with transparent pricing. You'll see the service cost before confirming your booking.",
  },
  {
    q: "Can I Cancel Or Reschedule My Booking?",
    a: "Absolutely. You can easily cancel or reschedule your booking from your account before the scheduled service time.",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Reusable Tailwind CSS string for the custom animated button
  const cmnBtnClasses =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-[20px] z-10 transition-colors duration-300 hover:text-white before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 bg-color4 text-white font-semibold font-outfit";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white transition-opacity duration-500">
          <h1 className="text-[70px] font-extrabold tracking-[2px] font-outfit text-color4">
            Fix<span className="text-color-15">Now</span>
          </h1>
          <div className="mt-8 h-2 w-[220px] overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-gradient-to-r from-color4 to-color-15 w-[50%] animate-loading-bar"></div>
          </div>
        </div>
      )}

      <div style={{ display: loading ? "none" : "block" }}>
        {/* BANNER */}
        <section className="relative overflow-hidden bg-white">
          <Image
            src={bannerLeftCurve}
            alt="curve"
            className="hidden lg:block absolute left-0 bottom-0 z-0 w-[1000px] xl:w-[1200px] h-auto pointer-events-none select-none"
          />
          <div className="relative z-10 max-w-[1350px] mx-auto px-[15px]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-y-[60px] lg:gap-x-[20px] min-h-[760px] xl:min-h-[893px] py-[70px] lg:py-0">
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

                <div className="mt-[48px] flex justify-center lg:justify-start items-center">
                  <div className="flex items-center w-full max-w-[520px] h-[64px] rounded-full bg-white shadow-md px-[8px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-color4 flex items-center justify-center flex-shrink-0 text-white">
                      <Search size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search Services..."
                      className="flex-1 bg-transparent outline-none px-[16px] text-[15px] text-black"
                    />
                    <button className="mr-[10px] text-gray-400 hover:text-color-15">
                      <Mic size={18} />
                    </button>
                  </div>
                  <button className="group w-[48px] h-[48px] ml-[18px] rounded-full bg-color4 flex items-center justify-center text-white border-color4 transition-all hover:bg-white hover:text-color4 shadow-md">
                    <ArrowUpRight
                      className="transition-transform group-hover:rotate-45"
                      size={24}
                    />
                  </button>
                </div>

                <div className="relative mt-[80px] z-10 max-w-[440px] mx-auto lg:mx-0 rounded-[24px] bg-white shadow-lg px-[32px] py-[28px]">
                  <div className="flex items-center">
                    <div className="flex">
                      <Image
                        src={vp1}
                        className="w-[48px] h-[48px] rounded-full object-cover"
                        alt="Pro"
                      />
                      <Image
                        src={vp2}
                        className="w-[48px] h-[48px] rounded-full object-cover -ml-[18px]"
                        alt="Pro"
                      />
                      <Image
                        src={vp3}
                        className="w-[48px] h-[48px] rounded-full object-cover -ml-[18px]"
                        alt="Pro"
                      />
                    </div>
                    <div className="ml-[18px]">
                      <h4 className="font-bold text-[28px] text-black font-outfit">
                        500+
                      </h4>
                      <p className="font-semibold text-[20px] text-black font-outfit">
                        Verified Professionals
                      </p>
                    </div>
                  </div>
                  <p className="mt-[28px] leading-[30px] text-[16px] text-gray-500">
                    Background-checked and identity-verified experts, ensuring
                    every service is delivered with trust, safety and
                    professionalism.
                  </p>
                </div>
              </div>

              <div className="relative z-10 w-full lg:w-[62vw] xl:w-[68vw] h-[320px] sm:h-[420px] md:h-[520px] lg:h-[893px] lg:-mr-[8vw]">
                <Image
                  src={heroRight}
                  alt="Hero"
                  className="w-full h-full object-contain scale-[1.15]"
                />

                <div className="flex absolute z-30 left-[10px] sm:left-[20px] lg:left-[-30px] bottom-[40px] sm:bottom-[70px] lg:bottom-[120px] w-[220px] sm:w-[260px] lg:w-[340px] items-center rounded-[22px] bg-white/85 backdrop-blur-xl border border-white/70 px-[22px] py-[18px] shadow-lg">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#EAF5FF] flex items-center justify-center">
                    <div className="w-[44px] h-[44px] rounded-full bg-color4 flex items-center justify-center text-white">
                      <ShieldCheck size={20} />
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
                  <div className="w-[58px] h-[58px] rounded-full bg-[#EAF5FF] flex items-center justify-center">
                    <div className="w-[44px] h-[44px] rounded-full bg-color12 flex items-center justify-center text-white">
                      <MessageCircle size={20} />
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

        {/* PROFESSIONAL SERVICES */}
        <section className="py-[40px] sm:py-[60px] overflow-hidden">
          <div className="max-w-[1350px] px-[15px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="w-full lg:w-[560px]">
                <span className="block text-color13 text-[18px] sm:text-[20px] font-medium capitalize font-outfit mb-[10px]">
                  Professional Services
                </span>
                <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-semibold text-color10 max-w-[500px] leading-[1.2] font-outfit">
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
                {professionalServicesData.map((service, idx) => (
                  <SwiperSlide key={idx} className="!flex h-auto">
                    <div className="group h-full w-full rounded-[20px] bg-white overflow-hidden shadow-md transition-all duration-300">
                      <figure className="relative rounded-t-[20px] overflow-hidden">
                        <Image
                          src={service.img}
                          alt={service.tag}
                          className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </figure>
                      <div className="pt-[18px] pb-[24px] px-[16px] sm:px-[20px]">
                        <span className="inline-block px-[16px] py-[8px] rounded-full border border-color4 text-[14px] text-color5">
                          {service.tag}
                        </span>
                        <h3 className="font-outfit text-[20px] sm:text-[22px] lg:text-[24px] leading-[28px] font-semibold text-color1 mt-[18px] capitalize">
                          {service.title}
                        </h3>
                        <div className="flex justify-between items-center mt-[24px]">
                          <div className="flex items-center">
                            <div className="flex items-center bg-color8 rounded-[31px] p-[6px]">
                              <Image
                                src={cardSmall1}
                                className="w-[30px] h-[30px] rounded-full relative z-10"
                                alt=""
                              />
                              <Image
                                src={cardSmall2}
                                className="w-[30px] h-[30px] rounded-full -ml-[18px] relative z-20"
                                alt=""
                              />
                              <Image
                                src={cardSmall3}
                                className="w-[30px] h-[30px] rounded-full -ml-[18px] relative z-30"
                                alt=""
                              />
                              <div className="w-[30px] h-[30px] rounded-full bg-[#99D7F7] -ml-[18px] relative z-40 flex items-center justify-center text-white text-[12px] font-bold">
                                +
                              </div>
                            </div>
                            <div className="ml-[10px]">
                              <p className="text-[12px] sm:text-[13px] text-color1">
                                200+ Trusted
                              </p>
                              <p className="text-[12px] sm:text-[13px] text-color1">
                                Professionals
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsServiceModalOpen(true)}
                            className="w-[46px] h-[46px] rounded-full border border-color4 flex items-center justify-center text-color4 transition-all group-hover:bg-color4 group-hover:text-white"
                          >
                            <ArrowUpRight
                              className="transition-transform group-hover:rotate-45"
                              size={20}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex justify-center mt-[40px] sm:mt-[76px]">
              <button className={`${cmnBtnClasses} py-[16px] px-[48px]`}>
                View More
              </button>
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="w-full overflow-hidden py-[80px] lg:py-[106px]">
          <div className="relative w-full h-[650px] lg:h-[900px] bg-coverage-map bg-center bg-no-repeat bg-contain">
            <p className="text-color-15 text-center font-medium capitalize mb-[8px] text-[18px] lg:text-[20px] font-outfit">
              Service Coverage
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 text-center mx-auto max-w-[460px] font-outfit">
              Bring service close to you
            </h2>

            <div className="absolute z-[2] w-[110px] sm:w-[155px] lg:w-[195px] h-[55px] sm:h-[75px] lg:h-[93px] rounded-[14px] sm:rounded-[20px] lg:rounded-[25px] bg-white shadow-lg top-[205px] sm:top-[225px] left-[3%] sm:left-[7%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] sm:text-[11px] lg:text-[16px]">
                Madhya Pradesh
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] sm:w-[115px] lg:w-[128px] h-[55px] sm:h-[70px] lg:h-[93px] rounded-[14px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[290px] sm:top-[315px] left-[20%] sm:left-[24%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] sm:text-[10px] lg:text-[15px]">
                Maharastra
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] sm:w-[115px] lg:w-[128px] h-[55px] sm:h-[70px] lg:h-[93px] rounded-[14px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[365px] sm:top-[390px] left-[8%] sm:left-[38%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] sm:text-[10px] lg:text-[15px]">
                West Bengal
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] sm:w-[115px] lg:w-[128px] h-[55px] sm:h-[70px] lg:h-[93px] rounded-[14px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[365px] sm:top-[390px] right-[8%] sm:right-[28%] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] sm:text-[10px] lg:text-[15px]">
                Tamil Nadu
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] sm:w-[115px] lg:w-[128px] h-[55px] sm:h-[70px] lg:h-[93px] rounded-[14px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[445px] sm:top-[470px] left-[20%] sm:left-auto lg:right-[244px] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] sm:text-[10px] lg:text-[15px]">
                Karnataka
              </p>
            </div>
            <div className="absolute z-[2] w-[90px] sm:w-[115px] lg:w-[128px] h-[55px] sm:h-[70px] lg:h-[93px] rounded-[14px] sm:rounded-[18px] lg:rounded-[25px] bg-white shadow-lg top-[445px] sm:top-[470px] right-[16%] sm:right-auto lg:right-[94px] flex items-center justify-center">
              <p className="text-color5 font-semibold text-[8px] sm:text-[10px] lg:text-[15px]">
                Manipur
              </p>
            </div>
          </div>
        </section>

        {/* POPULAR SERVICES */}
        <section className="py-[80px] lg:py-[106px] bg-gray-50">
          <div className="max-w-[1350px] px-[15px] mx-auto">
            <div className="w-full">
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
                {popularServicesData.map((service, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full">
                      <figure className="w-full h-[250px] sm:h-[280px] lg:h-[300px] overflow-hidden rounded-[20px]">
                        <Image
                          src={service.img}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </figure>
                      <p className="font-outfit text-[20px] text-black font-medium capitalize my-[10px]">
                        {service.title}
                      </p>
                      <p className="text-gray-600">{service.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-[80px] lg:py-[106px]">
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
                className={`${cmnBtnClasses} mt-[24px] w-fit py-[14px] px-[30px] sm:py-[16px] sm:px-[48px]`}
              >
                Contact Us{" "}
                <MoveRight className="ml-2 w-[24px] h-[24px] text-white" />
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
                className="h-[700px] w-full max-w-[584px]"
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <SwiperSlide
                    key={item}
                    className="flex justify-center items-center transition-transform duration-700"
                  >
                    <div className="flex w-full lg:w-[584px] lg:h-[303px] items-center rounded-[25px] overflow-hidden justify-center bg-white shadow-md">
                      <div className="w-3/5 px-[30px] py-[30px] lg:px-[50px] lg:py-[50px] bg-[linear-gradient(to_right,#DDF0FC_0%,#FFFFFF_100%)]">
                        <p className="font-outfit text-[56px] font-bold text-color4 mb-[11px]">
                          0{item}
                        </p>
                        <p className="text-black font-outfit text-[20px] font-bold whitespace-nowrap mb-[20px]">
                          Transparent Pricing
                        </p>
                        <p className="font-normal text-[14px] lg:text-[16px] text-black">
                          Know exactly what you're paying before confirming your
                          booking. No hidden charges.
                        </p>
                      </div>
                      <div className="w-2/5 h-full">
                        <Image
                          src={frame76}
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

        {/* HOW IT WORKS */}
        <section className="py-[80px] lg:py-[106px] bg-gray-50">
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
                  <p className="font-outfit font-medium text-[28px] transition-colors">
                    01
                  </p>
                  <p className="ms-[64px] font-outfit font-medium text-[28px] uppercase transition-colors">
                    choose your service
                  </p>
                </div>
                <div className="group flex items-center cursor-pointer py-[12px] hover:text-[#AEAEAE]">
                  <p className="font-outfit font-medium text-[28px] transition-colors">
                    02
                  </p>
                  <p className="ms-[64px] font-outfit font-medium text-[28px] uppercase transition-colors">
                    book when it suits you
                  </p>
                </div>
                <div className="group flex items-center cursor-pointer py-[12px] hover:text-[#AEAEAE]">
                  <p className="font-outfit font-medium text-[28px] transition-colors">
                    03
                  </p>
                  <p className="ms-[64px] font-outfit font-medium text-[28px] uppercase transition-colors">
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
              <Image
                src={whyImg}
                alt="How it works"
                className="object-contain h-[554px] mt-8"
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-[80px] lg:py-[106px] relative overflow-hidden">
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
              <div className="flex items-end justify-end mt-[30px] lg:mt-0 gap-3">
                <button className="testimonialPrev flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-[#D97706] hover:bg-white border-2 border-transparent hover:border-[#D97706] transition-all">
                  <ChevronLeft size={24} className="text-color10" />
                </button>
                <button className="testimonialNext flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-[#D97706] hover:bg-white border-2 border-transparent hover:border-[#D97706] transition-all">
                  <ChevronRight size={24} className="text-color10" />
                </button>
              </div>
            </div>

            <div className="relative">
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
                  320: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  992: { slidesPerView: 2 },
                }}
              >
                {[1, 2, 3].map((item) => (
                  <SwiperSlide key={item}>
                    <div className="h-[350px] sm:h-[400px] lg:h-[409px] w-full rounded-[20px] bg-white px-[30px] py-[50px] lg:px-[50px] lg:py-[109px] shadow-sm border border-gray-100">
                      <p className="mt-[41px] text-[16px] text-gray-700 font-medium">
                        Excellent service! The technician arrived on time,
                        quickly identified the issue, and fixed my AC
                        efficiently. Highly recommended.
                      </p>
                      <div className="flex mt-[24px] items-center">
                        <Image
                          src={ellipse1}
                          alt="Customer"
                          className="rounded-full w-[48px] h-[48px] object-cover"
                        />
                        <div className="ms-[10px]">
                          <p className="font-outfit text-color9 text-[16px] font-bold">
                            Aditi Roy
                          </p>
                          <p className="text-[14px] text-gray-500">
                            small business owner
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* EXPERT ADVICE */}
        <section className="py-[80px] lg:py-[106px] bg-gray-50">
          <div className="max-w-[1350px] px-[15px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div>
                <p className="text-color-15 font-medium capitalize mb-[10px] text-[18px] sm:text-[20px] font-outfit">
                  Latest Insight Tips
                </p>
                <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[42px] leading-[1.2] font-semibold text-color10 font-outfit">
                  Expert Advice for a Better Home
                </h2>
              </div>
              <div className="flex justify-end items-center mt-[20px] lg:mt-0">
                <button className="border-2 border-color4 rounded-[20px] px-[36px] py-[16px] font-semibold text-color4 hover:bg-color4 hover:text-white transition-all">
                  View More
                </button>
              </div>
            </div>

            <div className="mt-[46px]">
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={30}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  545: { slidesPerView: 2 },
                  991: { slidesPerView: 4 },
                }}
              >
                {latestInsightsData.map((insight, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full">
                      <figure className="w-full h-[253px] overflow-hidden">
                        <Image
                          src={insight.img}
                          alt="Insight"
                          className="w-full h-full object-cover rounded-[20px] transition-transform duration-500 hover:scale-105"
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

        {/* FAQs */}
        <section className="relative overflow-hidden isolate py-[60px] lg:py-[100px]">
          <div className="hidden lg:block absolute right-[-250px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-faq-glow blur-[65px] -z-10" />

          <div className="max-w-[1350px] px-[15px] mx-auto flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-5/12 mb-[30px] lg:mb-0">
              <Image
                src={faqImage}
                alt="FAQ"
                className="w-full max-w-[509px] mx-auto object-contain"
              />
            </div>
            <div className="w-full lg:w-7/12 lg:pl-[40px]">
              <span className="text-[18px] font-semibold uppercase text-color13 mb-[16px] font-outfit">
                Frequently Asked Questions
              </span>
              <h2 className="text-[36px] lg:text-[42px] font-bold text-color10 mb-[40px] font-outfit">
                Everything You Need To Know.
              </h2>

              <div className="w-full">
                {faqData.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border-b border-[rgba(2,139,245,0.15)]"
                  >
                    <button
                      onClick={() =>
                        setActiveFaq(activeFaq === idx ? null : idx)
                      }
                      className="w-full flex justify-between items-center py-[20px] lg:py-[30px] outline-none"
                    >
                      <span className="text-left text-[18px] lg:text-[20px] font-bold text-[#073E73] font-outfit">
                        {faq.q}
                      </span>
                      <span className="text-[#073E73] transition-transform duration-300">
                        {activeFaq === idx ? (
                          <Minus size={24} />
                        ) : (
                          <Plus size={24} />
                        )}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? "max-h-[500px] pb-6" : "max-h-0"}`}
                    >
                      <p className="text-[16px] leading-[30px] text-color5 font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODAL: Service Selection */}
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-[1140px] bg-white rounded-[16px] lg:rounded-[24px] px-[16px] py-[32px] sm:px-[20px] sm:py-[40px] lg:px-[30px] lg:py-[60px] shadow-2xl">
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="absolute right-[15px] top-[15px] z-50 text-[32px] text-gray-500 hover:text-black"
              >
                <X size={32} />
              </button>

              <div className="overflow-y-auto max-h-[75vh] pr-2">
                <p className="text-black font-bold text-[32px] font-outfit">
                  Appliance Repair Our Service
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-[12px] lg:gap-[24px] mt-[20px] lg:mt-[40px]">
                  {[
                    { img: imgAC, title: "AC" },
                    { img: imgAppliance, title: "Refrigerator" },
                    { img: imgWashingMachine, title: "Washing Machine" },
                    { img: imgMicrowave, title: "Microwave" },
                    { img: imgWaterPurifier, title: "Water Purifier" },
                    { img: imgTelevision, title: "Television" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="col-span-2 min-h-[180px] rounded-[15px] shadow-sm p-[10px] flex flex-col justify-center items-center border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="w-[80px] object-contain mb-4"
                      />
                      <div className="rounded-[10px] bg-[#16A34A]/15 flex items-center justify-center gap-2 py-[5px] px-[10px] mb-2">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#16A34A] animate-pulse"></div>
                        <p className="text-[12px] font-bold text-[#16A34A]">
                          5 Mins
                        </p>
                      </div>
                      <p className="text-[#374151] text-[15px] font-bold text-center font-outfit">
                        {item.title}
                      </p>
                    </div>
                  ))}

                  <div className="col-span-2 min-h-[180px] rounded-[15px] shadow-sm p-[10px] flex flex-col justify-center items-center bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
                    <p className="text-[#374151] text-[16px] font-bold font-outfit">
                      +3 More
                    </p>
                  </div>
                </div>

                <p className="text-black font-bold text-[32px] mt-[40px] font-outfit">
                  Electrical Installation Repair Service
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-[12px] lg:gap-[24px] mt-[20px] lg:mt-[40px]">
                  {[
                    { img: imgLight, title: "Light" },
                    { img: imgCeilingFan, title: "Ceiling Fan" },
                    { img: imgSwitch, title: "Switches & Sockets" },
                    { img: imgWiring, title: "Wiring" },
                    { img: imgMCB, title: "MCB/Fuse" },
                    { img: imgInverter, title: "Inverter" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="col-span-2 min-h-[180px] rounded-[15px] shadow-sm p-[10px] flex flex-col justify-center items-center border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="w-[80px] object-contain mb-4"
                      />
                      <div className="rounded-[10px] bg-[#16A34A]/15 flex items-center justify-center gap-2 py-[5px] px-[10px] mb-2">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#16A34A] animate-pulse"></div>
                        <p className="text-[12px] font-bold text-[#16A34A]">
                          5 Mins
                        </p>
                      </div>
                      <p className="text-[#374151] text-[15px] font-bold text-center font-outfit">
                        {item.title}
                      </p>
                    </div>
                  ))}

                  <div className="col-span-2 min-h-[180px] rounded-[15px] shadow-sm p-[10px] flex flex-col justify-center items-center bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
                    <p className="text-[#374151] text-[16px] font-bold font-outfit">
                      +2 More
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
