"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ServicePage() {
  // ==========================================
  // Dropdown State & Logic
  // ==========================================
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Choose Service");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsDropdownOpen(false);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* ========================================== */}
      {/* SERVICE BANNER */}
      {/* ========================================== */}
      <section className="bg-[url('/assets/images/service/service-banner.png')] bg-center bg-cover bg-no-repeat min-h-[520px]">
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <div className="min-h-[300px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[600px] flex items-center justify-center">
            <div className="text-center mt-10 lg:mt-20">
              <h1 className="max-w-[437px] mx-auto font-[family-name:var(--outfit-r)] text-[28px] min-[375px]:text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold leading-[120%] text-[var(--color5)] capitalize">
                Our Services For Every Needs
              </h1>
              <p className="mt-[10px] text-[18px] min-[375px]:text-[22px] sm:text-[26px] lg:text-[32px] font-semibold font-[family-name:var(--outfit-r)] text-[var(--color-16)] capitalize">
                We Are Here To Help!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SERVICE STACKING PART */}
      {/* ========================================== */}
      <section className="py-[40px] lg:py-[60px] bg-[var(--color2)] relative">
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div className="max-w-[499px] w-full">
              <h2 className="font-[family-name:var(--outfit-r)] text-[28px] min-[400px]:text-[32px] md:text-[38px] lg:text-[42px] font-semibold leading-[120%] text-[var(--color10)] capitalize">
                Simple Plans For Every Household
              </h2>
            </div>
            <div className="max-w-[611px] w-full mt-[20px] lg:mt-[8px]">
              <p className="font-[family-name:var(--albert-sans-r)] text-[16px] leading-[170%] font-medium text-[var(--color1)] capitalize">
                Choose The Plan That Fits Your Lifestyle And Enjoy Reliable
                Local Services Whenever You Need Them.
              </p>
            </div>
          </div>

          <div className="relative mt-[40px] lg:mt-[56px]">
            {/* CARD 01 */}
            <div className="sticky top-[10px] lg:top-[20px] z-[1] min-h-[720px] h-auto overflow-hidden rounded-[24px] border-2 border-[var(--color11)] bg-[var(--color2)] origin-top transition-transform duration-[250ms] ease-in-out will-change-transform">
              <img
                src="/assets/images/service/card-top-shape.svg"
                alt="card-top-shape"
                className="absolute top-0 left-0 w-[220px] min-[400px]:w-[280px] lg:w-[320px] pointer-events-none select-none z-[1]"
              />
              <img
                src="/assets/images/service/card-bottom-shape.png"
                alt="card-bottom-shape"
                className="absolute bottom-0 left-[100px] min-[400px]:left-[220px] lg:left-[380px] w-[280px] pointer-events-none select-none z-[1]"
              />

              <div className="relative z-[2] p-[16px] min-[400px]:p-[30px] lg:p-[55px]">
                <div className="flex items-start justify-between">
                  <h3 className="font-[family-name:var(--outfit-r)] text-[20px] min-[400px]:text-[28px] lg:text-[32px] font-semibold leading-[120%] text-[var(--color6)]">
                    Electrician
                  </h3>
                  <span className="font-[family-name:var(--outfit-r)] text-[26px] min-[400px]:text-[36px] lg:text-[42px] font-semibold text-[var(--color6)]">
                    01
                  </span>
                </div>

                <div className="mt-[20px] lg:mt-[22.5px] flex flex-col lg:flex-row lg:justify-between lg:items-center">
                  <div className="max-w-[650px]">
                    <div className="flex items-center mb-[16px]">
                      <svg
                        className="mr-[10px]"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0412 19.1224L19.1224 13.0412C19.9144 12.2492 20.3103 11.8529 20.4587 11.3962C20.5892 10.9945 20.5892 10.5627 20.4587 10.161C20.3103 9.70433 19.9144 9.30746 19.1224 8.51543L13.0399 2.43297C12.2488 1.64183 11.8531 1.24618 11.3967 1.09789C10.995 0.967371 10.5622 0.967371 10.1605 1.09789C9.70403 1.2462 9.30729 1.64294 8.51592 2.43431L2.4348 8.51543L2.43432 8.51634C1.64261 9.30805 1.24623 9.70442 1.09789 10.161C0.967371 10.5627 0.967371 10.9945 1.09789 11.3962C1.24618 11.8526 1.64232 12.2488 2.43346 13.0399L8.51968 19.1261C9.3092 19.9156 9.70457 20.311 10.1605 20.4592C10.5622 20.5897 10.995 20.5897 11.3967 20.4592C11.8532 20.3108 12.2489 19.9151 13.0404 19.1237L13.0412 19.1224Z"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-[20px] min-[400px]:text-[24px] font-normal text-[var(--color6)] capitalize">
                        What's Included?
                      </h4>
                    </div>

                    <p className="text-[14px] min-[400px]:text-[16px] leading-[180%] font-medium text-[var(--color9)] mb-[40px] lg:mb-[94px]">
                      Browse certified electricians for electrical repairs,
                      installations, wiring, lighting fixtures, switchboard
                      maintenance, fan installations, appliance connections, and
                      emergency electrical services. Choose the service that
                      best fits your requirements.
                    </p>

                    <ul className="space-y-[8px] border-b-2 border-[#000000] pb-[20px]">
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Explore Electrical Services
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Compare Ratings & Reviews
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Select Your Preferred Date & Time
                        </span>
                      </li>
                    </ul>

                    <div className="mt-[42px] mb-[30px] h-[1px] bg-[var(--color17)]"></div>

                    <div className="flex flex-wrap items-center gap-y-[15px]">
                      <h5 className="text-[20px] font-semibold text-[var(--color6)] capitalize">
                        Starting From ₹199
                      </h5>
                      <button className="group ml-[15px] min-[400px]:ml-[30px] w-[48px] h-[48px] rounded-full bg-[var(--color4)] border border-transparent text-white text-[22px] duration-300 flex items-center justify-center hover:bg-white hover:border-[var(--color4)] hover:text-[var(--color4)]">
                        <svg
                          className="transition duration-300 origin-center group-hover:rotate-45 group-hover:translate-y-[2px]"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12.6667L12.6667 1M12.6667 10.3333V1H3.33333"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-[40px] lg:mt-0">
                    <img
                      src="/assets/images/service/card1-image.svg"
                      alt="card1-image"
                      className="w-full max-w-[240px] min-[400px]:max-w-[380px] lg:max-w-[479px] mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 02 */}
            <div className="sticky top-[25px] lg:top-[40px] z-[2] min-h-[720px] h-auto overflow-hidden rounded-[24px] border-2 border-[var(--color11)] bg-[var(--color2)] origin-top transition-transform duration-[250ms] ease-in-out will-change-transform">
              <img
                src="/assets/images/service/left-bottom-shape.svg"
                alt="card-bottom-left-shape"
                className="absolute bottom-0 left-0 w-[100px] min-[400px]:w-[160px] lg:w-[220px] pointer-events-none select-none z-[1]"
              />
              <img
                src="/assets/images/service/right-bottom shape.svg"
                alt="card-bottom-right-shape"
                className="absolute bottom-0 right-[-60px] min-[400px]:right-0 w-[180px] min-[400px]:w-[280px] lg:w-[340px] pointer-events-none select-none z-[1]"
              />

              <div className="relative z-[2] p-[16px] min-[400px]:p-[30px] lg:p-[55px]">
                <div className="flex items-start justify-between">
                  <h3 className="font-[family-name:var(--outfit-r)] text-[20px] min-[400px]:text-[28px] lg:text-[32px] font-semibold leading-[120%] text-[var(--color6)]">
                    Personal Grooming
                  </h3>
                  <span className="font-[family-name:var(--outfit-r)] text-[26px] min-[400px]:text-[36px] lg:text-[42px] font-semibold text-[var(--color6)]">
                    02
                  </span>
                </div>

                <div className="mt-[20px] lg:mt-[22.5px] flex flex-col lg:flex-row lg:justify-between lg:items-center">
                  <div className="max-w-[650px]">
                    <div className="flex items-center mb-[16px]">
                      <svg
                        className="mr-[10px]"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0412 19.1224L19.1224 13.0412C19.9144 12.2492 20.3103 11.8529 20.4587 11.3962C20.5892 10.9945 20.5892 10.5627 20.4587 10.161C20.3103 9.70433 19.9144 9.30746 19.1224 8.51543L13.0399 2.43297C12.2488 1.64183 11.8531 1.24618 11.3967 1.09789C10.995 0.967371 10.5622 0.967371 10.1605 1.09789C9.70403 1.2462 9.30729 1.64294 8.51592 2.43431L2.4348 8.51543L2.43432 8.51634C1.64261 9.30805 1.24623 9.70442 1.09789 10.161C0.967371 10.5627 0.967371 10.9945 1.09789 11.3962C1.24618 11.8526 1.64232 12.2488 2.43346 13.0399L8.51968 19.1261C9.3092 19.9156 9.70457 20.311 10.1605 20.4592C10.5622 20.5897 10.995 20.5897 11.3967 20.4592C11.8532 20.3108 12.2489 19.9151 13.0404 19.1237L13.0412 19.1224Z"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-[20px] min-[400px]:text-[24px] font-normal text-[var(--color6)] capitalize">
                        What's Included?
                      </h4>
                    </div>

                    <p className="text-[14px] min-[400px]:text-[16px] leading-[180%] font-medium text-[var(--color9)] mb-[40px] lg:mb-[94px]">
                      Discover professional grooming services including salon at
                      home, haircuts, hairstyling, skincare, facials, makeup,
                      manicure, pedicure, waxing, and spa treatments. Book
                      experienced professionals at your convenience.
                    </p>

                    <ul className="space-y-[8px] border-b-2 border-[#000000] pb-[20px]">
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Browse Grooming Services
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Compare Ratings & Reviews
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Choose Your Preferred Date & Time
                        </span>
                      </li>
                    </ul>

                    <div className="mt-[42px] mb-[30px] h-[1px] bg-[var(--color17)]"></div>

                    <div className="flex flex-wrap items-center gap-y-[15px]">
                      <h5 className="text-[20px] font-semibold text-[var(--color6)] capitalize">
                        Starting From ₹299
                      </h5>
                      <button className="group ml-[15px] min-[400px]:ml-[30px] w-[48px] h-[48px] rounded-full bg-[var(--color4)] border border-transparent text-white duration-300 flex items-center justify-center hover:bg-white hover:border-[var(--color4)] hover:text-[var(--color4)]">
                        <svg
                          className="transition duration-300 origin-center group-hover:rotate-45 group-hover:translate-y-[2px]"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12.6667L12.6667 1M12.6667 10.3333V1H3.33333"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-[40px] lg:mt-0">
                    <img
                      src="/assets/images/service/card2-image.svg"
                      alt="card2-image"
                      className="w-full max-w-[240px] min-[400px]:max-w-[380px] lg:max-w-[479px] mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 03 */}
            <div className="sticky top-[40px] lg:top-[60px] z-[3] min-h-[720px] h-auto overflow-hidden rounded-[24px] border-2 border-[var(--color11)] bg-[var(--color2)] origin-top transition-transform duration-[250ms] ease-in-out will-change-transform">
              <img
                src="/assets/images/service/top-middle-shape.svg"
                alt="card-bottom-left-shape"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] min-[400px]:w-[360px] lg:w-[420px] pointer-events-none select-none z-[1]"
              />
              <img
                src="/assets/images/service/bottom-middle-shape.svg"
                alt="card-bottom-right-shape"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] min-[400px]:w-[420px] lg:w-[520px] pointer-events-none select-none z-[1]"
              />

              <div className="relative z-[2] p-[16px] min-[400px]:p-[30px] lg:p-[55px]">
                <div className="flex items-start justify-between">
                  <h3 className="font-[family-name:var(--outfit-r)] text-[20px] min-[400px]:text-[28px] lg:text-[32px] font-semibold leading-[120%] text-[var(--color6)]">
                    Delivery Assistance
                  </h3>
                  <span className="font-[family-name:var(--outfit-r)] text-[26px] min-[400px]:text-[36px] lg:text-[42px] font-semibold text-[var(--color6)]">
                    03
                  </span>
                </div>

                <div className="mt-[20px] lg:mt-[22.5px] flex flex-col lg:flex-row lg:justify-between lg:items-center">
                  <div className="max-w-[650px]">
                    <div className="flex items-center mb-[16px]">
                      <svg
                        className="mr-[10px]"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0412 19.1224L19.1224 13.0412C19.9144 12.2492 20.3103 11.8529 20.4587 11.3962C20.5892 10.9945 20.5892 10.5627 20.4587 10.161C20.3103 9.70433 19.9144 9.30746 19.1224 8.51543L13.0399 2.43297C12.2488 1.64183 11.8531 1.24618 11.3967 1.09789C10.995 0.967371 10.5622 0.967371 10.1605 1.09789C9.70403 1.2462 9.30729 1.64294 8.51592 2.43431L2.4348 8.51543L2.43432 8.51634C1.64261 9.30805 1.24623 9.70442 1.09789 10.161C0.967371 10.5627 0.967371 10.9945 1.09789 11.3962C1.24618 11.8526 1.64232 12.2488 2.43346 13.0399L8.51968 19.1261C9.3092 19.9156 9.70457 20.311 10.1605 20.4592C10.5622 20.5897 10.995 20.5897 11.3967 20.4592C11.8532 20.3108 12.2489 19.9151 13.0404 19.1237L13.0412 19.1224Z"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-[20px] min-[400px]:text-[24px] font-normal text-[var(--color6)] capitalize">
                        What's Included?
                      </h4>
                    </div>

                    <p className="text-[14px] min-[400px]:text-[16px] leading-[180%] font-medium text-[var(--color9)] mb-[40px] lg:mb-[94px]">
                      Find trusted delivery partners for document delivery,
                      parcel pickup, grocery delivery, medicine delivery, food
                      delivery, and local courier services. Schedule deliveries
                      based on your preferred time.
                    </p>

                    <ul className="space-y-[8px] border-b-2 border-[#000000] pb-[20px]">
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Browse Delivery Services
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Compare Ratings & Reviews
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-[10px] min-[400px]:ml-[15px]">
                          Schedule Pickup & Delivery
                        </span>
                      </li>
                    </ul>

                    <div className="mt-[42px] mb-[30px] h-[1px] bg-[var(--color17)]"></div>

                    <div className="flex flex-wrap items-center gap-y-[15px]">
                      <h5 className="text-[20px] font-semibold text-[var(--color6)] capitalize">
                        Starting From ₹99
                      </h5>
                      <button className="group ml-[15px] min-[400px]:ml-[30px] w-[48px] h-[48px] rounded-full bg-[var(--color4)] border border-transparent text-white duration-300 flex items-center justify-center hover:bg-white hover:border-[var(--color4)] hover:text-[var(--color4)]">
                        <svg
                          className="transition duration-300 origin-center group-hover:rotate-45 group-hover:translate-y-[2px]"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12.6667L12.6667 1M12.6667 10.3333V1H3.33333"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-[40px] lg:mt-0">
                    <img
                      src="/assets/images/service/card-3-image.svg"
                      alt="card3-image"
                      className="w-full max-w-[240px] min-[400px]:max-w-[380px] lg:max-w-[479px] mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 04 */}
            <div className="sticky top-[55px] lg:top-[80px] z-[4] min-h-[720px] h-auto overflow-hidden rounded-[24px] border-2 border-[var(--color11)] bg-[var(--color2)] origin-top transition-transform duration-[250ms] ease-in-out will-change-transform">
              <img
                src="/assets/images/service/left-corner-big-shape.svg"
                alt="left-corner-big-shape"
                className="absolute bottom-0 left-0 w-[180px] min-[400px]:w-[240px] lg:w-[520px] pointer-events-none select-none z-[1]"
              />

              <div className="relative z-[2] p-[16px] min-[400px]:p-[30px] lg:p-[55px]">
                <div className="flex items-start justify-between">
                  <h3 className="font-[family-name:var(--outfit-r)] text-[20px] min-[400px]:text-[28px] lg:text-[32px] font-semibold leading-[120%] text-[var(--color6)]">
                    House Help
                  </h3>
                  <span className="font-[family-name:var(--outfit-r)] text-[26px] min-[400px]:text-[36px] lg:text-[42px] font-semibold text-[var(--color6)]">
                    04
                  </span>
                </div>

                <div className="mt-[20px] lg:mt-[22.5px] flex flex-col lg:flex-row lg:justify-between lg:items-center">
                  <div className="max-w-[650px]">
                    <div className="flex items-center mb-[16px]">
                      <svg
                        className="mr-[10px]"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0412 19.1224L19.1224 13.0412C19.9144 12.2492 20.3103 11.8529 20.4587 11.3962C20.5892 10.9945 20.5892 10.5627 20.4587 10.161C20.3103 9.70433 19.9144 9.30746 19.1224 8.51543L13.0399 2.43297C12.2488 1.64183 11.8531 1.24618 11.3967 1.09789C10.995 0.967371 10.5622 0.967371 10.1605 1.09789C9.70403 1.2462 9.30729 1.64294 8.51592 2.43431L2.4348 8.51543L2.43432 8.51634C1.64261 9.30805 1.24623 9.70442 1.09789 10.161C0.967371 10.5627 0.967371 10.9945 1.09789 11.3962C1.24618 11.8526 1.64232 12.2488 2.43346 13.0399L8.51968 19.1261C9.3092 19.9156 9.70457 20.311 10.1605 20.4592C10.5622 20.5897 10.995 20.5897 11.3967 20.4592C11.8532 20.3108 12.2489 19.9151 13.0404 19.1237L13.0412 19.1224Z"
                          stroke="#1A3151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-[20px] min-[400px]:text-[24px] font-normal text-[var(--color6)] capitalize">
                        What's Included?
                      </h4>
                    </div>

                    <p className="text-[14px] min-[400px]:text-[16px] leading-[180%] font-medium text-[var(--color9)] mb-[40px] lg:mb-[94px]">
                      Book trusted house help professionals for cleaning,
                      cooking assistance, laundry, babysitting, gardening and
                      daily household support. Select the service that best
                      matches your needs.
                    </p>

                    <ul className="space-y-[8px] border-b-2 border-[#000000] pb-[20px]">
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[14px] min-[400px]:text-[16px] ml-[10px] min-[400px]:ml-[15px]">
                          Explore House Help Services
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[14px] min-[400px]:text-[16px] ml-[10px] min-[400px]:ml-[15px]">
                          Compare Ratings & Reviews
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          width="15"
                          height="11"
                          viewBox="0 0 15 11"
                          fill="none"
                        >
                          <path
                            d="M1 5.24268L5.24264 9.48532L13.727 1"
                            stroke="#1A3151"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[14px] min-[400px]:text-[16px] ml-[10px] min-[400px]:ml-[15px]">
                          Select Preferred Date & Time
                        </span>
                      </li>
                    </ul>

                    <div className="mt-[42px] mb-[30px] h-[1px] bg-[var(--color17)]"></div>

                    <div className="flex flex-wrap items-center gap-y-[15px]">
                      <h5 className="text-[20px] font-semibold text-[var(--color6)] capitalize">
                        Starting From ₹399
                      </h5>
                      <button className="group ml-[15px] min-[400px]:ml-[30px] w-[48px] h-[48px] rounded-full bg-[var(--color4)] border border-transparent text-white flex items-center justify-center hover:bg-white hover:border-[var(--color4)] hover:text-[var(--color4)] duration-300">
                        <svg
                          className="transition duration-300 group-hover:rotate-45 group-hover:translate-y-[2px]"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M1 12.6667L12.6667 1M12.6667 10.3333V1H3.33333"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-[40px] lg:mt-0">
                    <img
                      src="/assets/images/service/card-4-image.svg"
                      alt="card4-image"
                      className="w-full max-w-[240px] min-[400px]:max-w-[380px] lg:max-w-[479px] mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* ESTIMATED VALUE QUERY SECTION (Dropdown logic here) */}
      {/* ========================================== */}
      <section className="w-full bg-[var(--color2)] py-[30px] min-[480px]:py-[35px] md:py-[45px] lg:py-[60px]">
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <div className="relative w-full rounded-[28px] min-[480px]:rounded-[32px] md:rounded-[36px] lg:rounded-[41px] bg-[#F0F9FE] px-[18px] py-[28px] min-[375px]:px-[20px] min-[375px]:py-[30px] min-[480px]:px-[25px] min-[480px]:py-[35px] md:px-[40px] md:py-[45px] lg:px-[74px] lg:py-[56px]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="w-full md:w-[48%] lg:w-[50%]">
                <span className="block font-[family-name:var(--outfit-r)] font-medium leading-[1.2] text-[#111827] text-[17px] min-[375px]:text-[18px] min-[480px]:text-[20px] md:text-[22px] lg:text-[24px]">
                  Know Before You Book
                </span>
                <h2 className="mt-[8px] max-w-[400px] font-[family-name:var(--outfit-r)] font-semibold leading-[1.15] text-[#111827] text-[28px] min-[375px]:text-[30px] min-[480px]:text-[34px] md:text-[38px] lg:text-[42px]">
                  Have An Estimated Value Query
                </h2>
              </div>

              <div className="relative mt-[25px] w-full md:mt-0 md:w-[48%] lg:w-[50%]">
                {/* Custom React Dropdown Wrapper */}
                <div
                  ref={dropdownRef}
                  className="flex w-full items-center rounded-full bg-[#C2E6FB] p-[5px] min-[375px]:p-[6px] min-[480px]:p-[7px] md:p-[8px] lg:p-[10px]"
                >
                  <div className="relative min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex w-full min-w-0 items-center justify-between rounded-full px-[2px] py-[1px] min-[480px]:px-[3px] md:px-[4px]"
                    >
                      <div className="flex min-w-0 items-center">
                        <span className="mr-[8px] flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[var(--color4)] min-[375px]:mr-[9px] min-[375px]:h-[40px] min-[375px]:w-[40px] min-[480px]:mr-[11px] min-[480px]:h-[44px] min-[480px]:w-[44px] md:mr-[13px] md:h-[46px] md:w-[46px] lg:mr-[16px] lg:h-[48px] lg:w-[48px]">
                          <svg
                            className="h-[17px] w-[17px] min-[480px]:h-[19px] min-[480px]:w-[19px] lg:h-[22px] lg:w-[22px]"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.75 6.75V10.75M11.125 1H11M20.75 10.75C20.75 16.2728 16.2728 20.75 10.75 20.75C5.22715 20.75 0.75 16.2728 0.75 10.75C0.75 5.22715 5.22715 0.75 10.75 0.75C16.2728 0.75 20.75 5.22715 20.75 10.75ZM11.25 1C11.25 1.1381 11.1381 1.25 11 1.25C10.8619 1.25 10.75 1.1381 10.75 1C10.75 0.8619 10.8619 0.75 11 0.75C11.1381 0.75 11.25 0.8619 11.25 1Z"
                              stroke="#F4F1EC"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="min-w-0 truncate font-[family-name:var(--outfit-r)] font-medium text-[#4B5563] text-[14px] min-[375px]:text-[15px] min-[480px]:text-[16px] md:text-[18px] lg:text-[20px]">
                          {selectedService}
                        </span>
                      </div>
                      <svg
                        className={`mr-[8px] h-[7px] w-[13px] shrink-0 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 16 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 1L8 8L1 1"
                          stroke="#4B5563"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* React Conditional Rendering for Dropdown */}
                    <div
                      className={`absolute left-0 top-full z-[50] w-full overflow-hidden rounded-[14px] bg-white p-[16px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 ${isDropdownOpen ? "opacity-100 translate-y-2 visible" : "opacity-0 invisible translate-y-0"}`}
                    >
                      {[
                        "Deep Cleaning",
                        "Home Repair",
                        "Delivery Assistance",
                        "Grooming Essentials",
                      ].map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceSelect(service)}
                          className="group block w-full px-[15px] py-[12px] text-left font-[family-name:var(--outfit-r)] text-[14px] font-semibold text-[var(--color5)] transition-all duration-300 hover:text-[var(--color4)] min-[375px]:text-[15px] min-[480px]:text-[16px] md:text-[17px]"
                        >
                          <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-[1px] after:w-0 after:bg-[var(--color4)] after:transition-all after:duration-300 group-hover:after:w-full">
                            {service}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="group flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-transparent bg-[var(--color-15)] transition-all duration-300 hover:border-[var(--color-15)] hover:bg-[#C2E6FB] h-[38px] w-[38px] min-[375px]:h-[40px] min-[375px]:w-[40px] min-[480px]:h-[44px] min-[480px]:w-[44px] md:h-[46px] md:w-[46px] lg:h-[48px] lg:w-[48px]"
                  >
                    <svg
                      className="h-[11px] w-[11px] min-[480px]:h-[12px] min-[480px]:w-[12px] lg:h-[14px] lg:w-[14px] transition-transform duration-300 group-hover:rotate-45"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12.6667L12.6667 1M12.6667 10.3333V1H3.33333"
                        stroke="white"
                        className="transition-colors duration-300 group-hover:[stroke:var(--color-15)]"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* CURVED ORANGE ARROW */}
              <svg
                className="pointer-events-none absolute hidden z-[5] md:block md:-left-[75px] md:top-[70px] md:h-[40px] md:w-[92px] lg:-left-[98px] lg:top-[85px] lg:h-[48px] lg:w-[112px]"
                width="112"
                height="48"
                viewBox="0 0 112 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="112" height="48" fill="url(#pattern0_2215_2531)" />
                <defs>
                  <pattern
                    id="pattern0_2215_2531"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2215_2531"
                      transform="scale(0.00892857 0.0208333)"
                    />
                  </pattern>
                  <image
                    id="image0_2215_2531"
                    width="112"
                    height="48"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAwCAYAAADJuP4nAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVCSURBVHgB7ZxRctNIEIb/UcK+bZG9gXICkhOsOQHJCQIniPO8bOwsC68xJ8A5AeYEhBNgToC4gat4TLDo7hlZM7Jky7ZkKfF8VZSTGVkG/e6enu4eFDytI+7jCL/wmX6cYA/PVR9R0bUKnlZhiXdghqJFInoBWwSJFxrxwsxUoYhewJZA4h2QeF8xL15CrogBPO0gRg/F4kHmyDrFSi28gC0gvsQ5puhaQ5OCS+dE9AI2jIgRY2ANRfRntOAtjohewKbRQUuCrHNII1DNVMYiayTEPT7yDwGZby/+xzFfz5aIXzvrHu/5Tk2Q0kkvwli9xS3NHVPIOZ6NKxyRdmcBXdAlO7yOuxnVPbUiUadCPx3AKxJvLPtA2wKNaDQ3IZ2e03W3s7lfOGQBtap/eitsjCku1P9m3bvDiTOn0vWQRaTrWMRTes8VnmCoyH12SFmdtvmJQzUojIA8FUMu9ISe/VP1H25mY5e0F4zFCpmJeoO/Ft0jEP+qzfLAW+F2YatzxNMR6ZF1yWjZPZIo9L15PfdrYYPcW2siM03FLUIENP43grbCHjzNoPC39Vsk3nEJ6T4wxoX5qSvromerxP/iJexUmspYYwEzAcUKkxA18FbYAPYzj0iDL2Xe5GZiYgpNNR36RviAZkvMWR9ws6iIa+MIaCLSJKDpZTPfntpwrW8PQ5RkPhe6L76X94Jcn/oAT61k0mlMaetjVMFNT2jmo7miT3uVK3gqx1TguYg7a5+gjfvhCrfIr0aYgEbvQWL0fVRaE3rfZ+c9+1iR4nLSvgQxkbnqg18Pq0UCF4Uza2hoZ2XKUiigZL+pvAG9Hkr9yWdpqsEYw7U1xIHLWsvUwoIulzfoRd+Y6k+UpfFBTRW4bYM6zlghcLFZWpGnRXUgpQvNCZn+NTxrE/fk+YXW0NU6rjOhdFshRabDmc/2kelayJbBLeKOKWA8xgaU7omhD3o5S7VxZHrp022rIJ1nbpQZUaB4ig1ZramJPzDpy/AiloZ7VzKdZ0vPPJRl5c5s6eWY0iKcFh4HtE5ewJOLEW/oDO7h2ASIG7NWa71pA+eINOnfGOEnXvl2DJdc8UDP6U35XOcyNjobQYvygO5wbn6NqnILjwFZ81y3yVQqHrNRYy8FNl1ri6E7hl9nuqp2ENkqZNe8GKdVi8dUcjrJ1A45oDkwd93JbYZZWrgI0LGGk4ClkjUvS2XHy3LOtu2USzXtmRwXhNZw7c+gsrMR8pfk9u+0ICylksde2WerE5cZzB3MHJloM0KN1HLA07QI2IXKR2mNBVanO63fzgUwtVCLgIy4VK53ZUomnHV/6ELKWncvEfhZZioyB1RqWe/yqE3ABFPddxO4nFIKVmsdaAMmiXEuB4KyR8B46diXqsJW98K1C5iQ41b5Hzp6CBa5RDhuBLsq04RbB1sTkBG3ekdCBuJ6QmtqyG3kTT2EIuSo1xQvcoVjd6m3S2uXgqpgqwImLBCSH8qAxj81ZZXG2jgFxgmJTs4lE5p/jyeUA+43nzpsREAbca2xlFqO3AkJBL7Q66huy5QvlLY0Fs09YJmSfLlu2iBcQuMCJoi7uidXpQ94hJlpfmBjesDf6PWWHnak3q0X6YmF3dFn7eGZqah0cj7PekOza9wyWiOgjeyvlHRt5YlpE5k/E2jX9sOZVXKM+SnYomK6j5J7LW/MYtECCrBaZm15tFJAG/N/h7GlvIB2byGqJyLRPtEXYIw/yGW3XDSb1guYxXGBU+lifgaIpbFlhQveGplXdsU/yLq+0xfjGwUj44ck2M6wK43IvwEEc94oQkGZcQAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* QUICK & EASY BOOKING PROCESS */}
      {/* ========================================== */}
      <section className="py-[40px] lg:py-[60px] bg-[var(--color2)]">
        <div className="max-w-[1350px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-[45px]">
            <span className="inline-flex items-center justify-center px-[34px] py-[14px] bg-[#FFF0D2] text-[#F5A623] rounded-full text-[16px] font-medium mb-[20px]">
              Book In 60 Seconds
            </span>
            <h2 className="text-[#19345A] text-[32px] sm:text-[36px] lg:text-[40px] leading-[120%] font-bold text-center">
              Quick & Easy Booking Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="group relative overflow-hidden p-8 md:p-10 min-h-[220px] flex flex-col items-center text-center rounded-[36px] border border-[#E8F5FC] bg-white shadow-[inset_0_2px_13.7px_0_#DCEFFA,inset_0_-2px_13.7px_0_#F7FCFF] transition-all duration-300 ease-in-out hover:shadow-none hover:border-transparent">
              <div className="absolute bottom-0 left-0 h-[6px] w-0 bg-[#F5A623] transition-all duration-500 ease-out group-hover:w-full"></div>
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-[84px] h-[84px] rounded-full border-[6px] border-[#FFF4D4] bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.08]">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_5001_2691" fill="white">
                      <path
                        d="M1.86726 0.0386041C2.01278 0.0973814 2.01278 0.0973814 2.1593 0.185966C2.20177 0.21117 2.20177 0.21117 2.2451 0.236883C2.34834 0.298524 2.45071 0.361484 2.55316 0.424424C2.64182 0.478065 2.73052 0.531647 2.81925 0.585182C2.96926 0.67584 3.11917 0.766646 3.26866 0.858167C3.54846 1.02941 3.82934 1.19845 4.11235 1.36436C4.2007 1.41641 4.28904 1.4685 4.37737 1.52059C4.43441 1.55408 4.49155 1.58739 4.54879 1.62051C4.62876 1.6668 4.70834 1.71369 4.78787 1.76073C4.83343 1.78729 4.879 1.81386 4.92594 1.84123C5.05145 1.93359 5.10115 1.99945 5.16816 2.13918C5.16862 2.25383 5.16862 2.25383 5.15006 2.37867C5.10425 2.86063 5.10878 3.26058 5.41571 3.64732C5.67497 3.95589 5.96985 4.23266 6.26281 4.50864C6.41017 4.64869 6.55418 4.7921 6.69861 4.93515C6.9716 5.20457 7.24739 5.4709 7.52437 5.73621C7.83997 6.03879 8.15222 6.34474 8.46426 6.65098C9.10528 7.27996 9.75032 7.90469 10.3982 8.52664C10.6036 8.35415 10.8008 8.17534 10.9934 7.98866C11.0212 7.96185 11.0489 7.93505 11.0776 7.90743C11.331 7.66236 11.5828 7.41558 11.834 7.16825C12.0024 7.0025 12.1714 6.83738 12.3417 6.67358C12.5071 6.5145 12.671 6.35399 12.8339 6.19238C12.896 6.13125 12.9587 6.07064 13.0218 6.01059C13.3722 5.704 13.3722 5.704 13.5457 5.29459C13.5237 5.1634 13.4887 5.04983 13.4418 4.92565C13.4273 4.73526 13.4275 4.54587 13.4285 4.35496C13.4287 4.30417 13.4289 4.25338 13.4291 4.20105C13.4428 3.17716 13.8193 2.2093 14.5136 1.45328C14.5323 1.43246 14.5511 1.41164 14.5705 1.39019C15.2034 0.694686 15.9923 0.267567 16.9142 0.081473C16.9465 0.0741613 16.9788 0.0668496 17.0121 0.0593164C17.5679 -0.0395422 18.2239 -0.010355 18.7737 0.113625C18.8186 0.123711 18.8186 0.123711 18.8645 0.134002C19.0555 0.183429 19.2041 0.257971 19.3577 0.381555C19.4046 0.465786 19.4046 0.465786 19.4221 0.550351C19.4287 0.578147 19.4353 0.605943 19.4421 0.634582C19.4445 0.793915 19.3881 0.903902 19.2849 1.02275C19.2427 1.06212 19.2427 1.06212 19.1997 1.10229C19.0882 1.20706 18.987 1.31454 18.8892 1.43184C18.7509 1.59218 18.5998 1.73049 18.4416 1.87041C17.8153 2.3906 17.8153 2.3906 17.4832 3.09995C17.4799 3.47519 17.6216 3.70051 17.8744 3.97015C18.008 4.10033 18.1465 4.2224 18.2912 4.34008C18.3718 4.41123 18.3718 4.41123 18.4575 4.53983C18.7463 4.61991 19.0276 4.63539 19.3149 4.53983C19.6671 4.31961 19.9452 3.99304 20.2233 3.68782C20.3264 3.57555 20.4319 3.46561 20.5373 3.3555C20.7215 3.16274 20.9034 2.96802 21.0837 2.77161C21.19 2.66441 21.2322 2.6545 21.386 2.64289C21.5569 2.65447 21.6279 2.67345 21.7584 2.78221C21.9573 3.09892 21.9864 3.44058 21.9887 3.80436C21.989 3.84412 21.9894 3.88387 21.9898 3.92483C21.9904 4.00871 21.9908 4.09258 21.991 4.17645C21.9915 4.30253 21.9936 4.42851 21.9958 4.55457C22.0001 5.0603 21.9484 5.48485 21.7584 5.95451C21.744 5.99042 21.7297 6.02634 21.7149 6.06335C21.6788 6.14701 21.6399 6.22749 21.5976 6.30817C21.5762 6.35015 21.5762 6.35015 21.5543 6.39297C21.4081 6.66975 21.2271 6.91209 21.0296 7.15483C20.9792 7.22247 20.9792 7.22247 20.9278 7.29148C20.1538 8.1208 19.0566 8.60536 17.9295 8.66244C17.6023 8.66441 17.2915 8.63782 16.969 8.58826C16.8994 8.57898 16.8994 8.57898 16.8285 8.5695C16.7954 8.56449 16.7622 8.55948 16.7281 8.55431C16.561 8.57659 16.4778 8.67756 16.3655 8.79381C16.3416 8.81765 16.3178 8.84148 16.2932 8.86603C16.2145 8.94487 16.1366 9.02443 16.0587 9.10403C16.0043 9.15886 15.9498 9.21364 15.8953 9.26838C15.7519 9.41253 15.6092 9.55731 15.4667 9.70223C15.3211 9.85002 15.1749 9.9972 15.0287 10.1444C14.7421 10.4334 14.4561 10.723 14.1706 11.013C14.2042 11.0466 14.2378 11.0802 14.2724 11.1148C14.4099 11.2523 14.5475 11.3899 14.685 11.5275C14.7042 11.5099 14.7234 11.4923 14.7432 11.4742C14.9403 11.2985 15.075 11.1823 15.3495 11.1872C15.5357 11.2371 15.6045 11.2827 15.7139 11.4417C15.7476 11.5781 15.748 11.6912 15.7139 11.8275C15.641 11.9425 15.5564 12.0353 15.4567 12.1276C15.5849 12.4133 15.8457 12.6039 16.0786 12.8046C16.2221 12.9318 16.3618 13.0629 16.5016 13.194C16.7155 13.3944 16.9308 13.5928 17.1493 13.7881C17.3015 13.9251 17.4517 14.0642 17.602 14.2033C17.7582 14.3477 17.9147 14.4918 18.0717 14.6354C18.2507 14.7993 18.4293 14.9637 18.6075 15.1284C18.8501 15.3526 19.0934 15.5759 19.337 15.799C19.444 15.8969 19.5509 15.995 19.6578 16.093C19.7007 16.1323 19.7436 16.1716 19.7864 16.2109C20.0437 16.4467 20.3009 16.6824 20.5581 16.9182C20.5793 16.9377 20.6005 16.9571 20.6224 16.9771C20.6652 17.0164 20.7079 17.0557 20.7506 17.0951C20.8585 17.1946 20.9673 17.2926 21.0785 17.3883C21.3726 17.6438 21.6159 17.9111 21.8013 18.2579C21.8166 18.286 21.832 18.3141 21.8478 18.343C22.0004 18.6626 22.0003 18.9851 21.9975 19.3317C21.9969 19.431 21.9983 19.5301 22 19.6293C22.0029 20.2012 21.8439 20.6259 21.5012 21.0872C21.4711 21.1296 21.4411 21.1721 21.4101 21.2158C21.0157 21.6682 20.4074 21.9866 19.8083 22.0398C19.3235 22.0608 18.8651 22.059 18.4146 21.8588C18.375 21.8417 18.3353 21.8245 18.2944 21.8068C17.8343 21.5819 17.4822 21.2018 17.149 20.8213C17.0164 20.6715 16.8797 20.5258 16.7427 20.3799C16.546 20.1699 16.3517 19.9581 16.16 19.7435C16.0272 19.5969 15.892 19.4525 15.7568 19.3082C15.5601 19.0981 15.3657 18.8864 15.174 18.6718C15.0412 18.5252 14.906 18.3808 14.7708 18.2364C14.6048 18.0592 14.4396 17.8816 14.2778 17.7006C14.0922 17.4929 13.9022 17.2897 13.7119 17.0865C13.4772 16.8355 13.245 16.5824 13.0132 16.3288C12.9725 16.2845 12.9319 16.2403 12.8913 16.1961C12.6579 15.9424 12.4266 15.6871 12.1987 15.4285C12.178 15.4466 12.1573 15.4647 12.136 15.4833C12.1089 15.5068 12.0819 15.5303 12.054 15.5544C12.0271 15.5778 12.0003 15.6012 11.9726 15.6253C11.8389 15.7345 11.7294 15.7435 11.5571 15.7403C11.4135 15.721 11.3494 15.6648 11.2555 15.5571C11.1747 15.3786 11.159 15.2932 11.2153 15.1043C11.2984 14.957 11.2984 14.957 11.5127 14.6998C11.3571 14.53 11.2015 14.3602 11.0412 14.1853C10.6256 14.531 10.2427 14.9141 9.85684 15.2922C9.72735 15.419 9.59733 15.5452 9.46594 15.6701C9.33806 15.7916 9.21173 15.9146 9.08633 16.0387C9.03856 16.0855 8.99027 16.1317 8.94146 16.1774C8.66189 16.4262 8.66189 16.4262 8.54531 16.7657C8.56739 16.8965 8.60049 17.017 8.64054 17.1433C8.65505 17.3337 8.65489 17.5231 8.65393 17.714C8.65369 17.7648 8.65345 17.8157 8.6532 17.8681C8.63722 19.0234 8.16402 20.0216 7.35447 20.83C7.32911 20.8584 7.30374 20.8868 7.27761 20.9161C6.85869 21.3791 6.26417 21.6616 5.68259 21.8588C5.65491 21.8685 5.62723 21.8781 5.59871 21.888C4.79758 22.1542 3.77703 22.1432 2.98185 21.8588C2.74682 21.7272 2.74682 21.7272 2.67775 21.6031C2.672 21.5752 2.66625 21.5473 2.66033 21.5186C2.6537 21.4908 2.64707 21.463 2.64024 21.4343C2.63785 21.2741 2.69778 21.1601 2.8033 21.042C2.85099 20.9988 2.85099 20.9988 2.89965 20.9548C2.93569 20.9216 2.97173 20.8885 3.00886 20.8544C3.06727 20.8012 3.06727 20.8012 3.12687 20.7469C3.20876 20.6698 3.29054 20.5926 3.37219 20.5152C3.50049 20.3938 3.62927 20.2731 3.76058 20.155C4.34281 19.6572 4.34281 19.6572 4.60632 18.9688C4.60477 18.5904 4.51379 18.304 4.24698 18.0302C4.20791 17.9948 4.16884 17.9594 4.12859 17.923C4.09284 17.8841 4.05708 17.8452 4.02025 17.8051C3.75659 17.5505 3.47634 17.4485 3.11497 17.4464C2.57099 17.5014 2.20637 17.9999 1.85912 18.3811C1.75601 18.4934 1.65047 18.6033 1.54507 18.7134C1.36088 18.9062 1.17895 19.1009 0.998665 19.2973C0.893975 19.4029 0.8499 19.4142 0.699082 19.4287C0.495808 19.4118 0.426432 19.3892 0.28111 19.2438C0.202367 19.0629 0.154478 18.8784 0.109635 18.6866C0.0999092 18.6462 0.0901833 18.6059 0.0801627 18.5643C-0.148675 17.436 0.125204 16.256 0.738769 15.2955C0.903233 15.0599 1.10728 14.8593 1.30996 14.6569C1.33533 14.6285 1.36069 14.6001 1.38683 14.5708C2.0144 13.8771 3.09616 13.4562 4.01545 13.409C4.10948 13.4064 4.20332 13.4056 4.29739 13.4056C4.3308 13.4056 4.36422 13.4056 4.39864 13.4056C4.64991 13.4078 4.89092 13.4341 5.13818 13.4807C5.17637 13.4869 5.21455 13.493 5.2539 13.4994C5.28539 13.5056 5.31687 13.5117 5.34932 13.5181C5.54144 13.488 5.63988 13.3558 5.77198 13.22C5.80169 13.1903 5.83141 13.1606 5.86203 13.1301C5.9602 13.0317 6.05758 12.9327 6.15498 12.8336C6.22287 12.7653 6.2908 12.6971 6.35878 12.6289C6.53763 12.4492 6.71583 12.2689 6.8939 12.0885C7.0757 11.9045 7.2581 11.7211 7.44046 11.5377C7.79821 11.1776 8.15528 10.8169 8.51193 10.4557C8.32665 10.2342 8.13219 10.0274 7.92727 9.82402C7.89551 9.79233 7.86376 9.76064 7.83105 9.72799C7.76254 9.65964 7.69398 9.59135 7.62538 9.52309C7.51659 9.41485 7.40793 9.30648 7.29931 9.19806C7.02956 8.92888 6.75958 8.65993 6.4896 8.39098C6.2612 8.16343 6.03289 7.93579 5.8047 7.70803C5.69805 7.60166 5.59127 7.49542 5.48449 7.38918C5.41859 7.32344 5.3527 7.25769 5.28681 7.19193C5.25743 7.16277 5.22805 7.13361 5.19777 7.10357C5.00763 6.91344 4.82836 6.71623 4.65373 6.5118C4.6302 6.4843 4.60667 6.45681 4.58243 6.42848C4.56182 6.40439 4.54121 6.38031 4.51998 6.35549C3.89491 5.56864 3.89491 5.56864 3.03476 5.13665C2.7948 5.12204 2.56176 5.13811 2.32525 5.18099C2.16794 5.18355 2.08448 5.13917 1.953 5.05426C1.86982 4.95124 1.86982 4.95124 1.79709 4.82736C1.76921 4.78064 1.74133 4.73392 1.7126 4.68578C1.68287 4.63446 1.65315 4.58313 1.62344 4.5318C1.59197 4.47856 1.56043 4.42536 1.52884 4.3722C1.46175 4.25907 1.39507 4.14573 1.32868 4.03219C1.22244 3.8506 1.1151 3.66968 1.00754 3.48888C0.902344 3.31206 0.797157 3.13524 0.69252 2.95809C0.660267 2.90354 0.628014 2.84899 0.595761 2.79443C0.580277 2.76819 0.564793 2.74195 0.54884 2.71492C0.471318 2.58404 0.392618 2.45412 0.311483 2.32544C0.295708 2.30033 0.279933 2.27521 0.26368 2.24933C0.220554 2.18097 0.177065 2.11283 0.13355 2.04471C0.0440036 1.88397 -0.0157615 1.72261 0.0238973 1.53901C0.146745 1.33471 0.291653 1.17347 0.460791 1.0065C0.485935 0.981379 0.511078 0.956255 0.536983 0.93037C0.589808 0.877673 0.642737 0.82508 0.695764 0.772587C0.776913 0.692224 0.85771 0.61152 0.938461 0.530759C0.989989 0.479441 1.04154 0.428143 1.09311 0.376866C1.11722 0.352798 1.14134 0.328729 1.16619 0.303931C1.40287 0.0701148 1.53981 -0.000557168 1.86726 0.0386041ZM15.4996 1.75336C15.465 1.78403 15.4304 1.8147 15.3947 1.8463C14.9639 2.25007 14.663 2.73936 14.4707 3.29664C14.4571 3.3335 14.4434 3.37035 14.4293 3.40833C14.25 3.98104 14.2855 4.66647 14.4409 5.24064C14.4863 5.414 14.5121 5.5642 14.4707 5.74016C14.4148 5.82012 14.4148 5.82012 14.3409 5.90046C14.3136 5.93034 14.2862 5.96023 14.2581 5.99102C14.1137 6.14304 13.9675 6.29299 13.8195 6.44142C13.7853 6.47582 13.7512 6.51022 13.716 6.54566C13.6023 6.66012 13.4885 6.77443 13.3746 6.88873C13.3136 6.95006 13.2527 7.01141 13.1917 7.07276C12.9029 7.3633 12.6139 7.65354 12.3247 7.94372C12.3019 7.96663 12.2791 7.98954 12.2556 8.01315C11.8019 8.46855 11.348 8.92382 10.8939 9.37886C10.7944 9.47862 10.6948 9.57839 10.5953 9.67816C10.5582 9.71535 10.5582 9.71535 10.5203 9.7533C10.1188 10.1557 9.71793 10.5587 9.31727 10.9619C8.90548 11.3763 8.49312 11.7902 8.08022 12.2035C7.84856 12.4354 7.61717 12.6676 7.38641 12.9004C7.1901 13.0984 6.9933 13.2959 6.79582 13.4928C6.69511 13.5932 6.59474 13.694 6.49485 13.7952C6.3865 13.905 6.27727 14.0137 6.16777 14.1223C6.13645 14.1545 6.10513 14.1867 6.07285 14.2198C5.87321 14.4153 5.75023 14.4854 5.46824 14.4854C5.33277 14.463 5.33277 14.463 5.20835 14.4265C5.16397 14.4144 5.1196 14.4023 5.07388 14.3898C5.03426 14.3789 4.99464 14.368 4.95381 14.3568C4.24876 14.2132 3.49204 14.3375 2.85324 14.6569C2.81102 14.678 2.7688 14.6991 2.7253 14.7208C2.3765 14.9097 2.10273 15.1502 1.82439 15.4285C1.79521 15.4577 1.76603 15.4869 1.73597 15.5169C1.08133 16.2183 0.901389 17.1182 0.924143 18.0435C1.12134 17.8833 1.30231 17.7108 1.48043 17.5298C1.50344 17.5064 1.52644 17.4831 1.55015 17.459C1.64644 17.3612 1.74261 17.2632 1.83837 17.1648C1.909 17.0924 1.98003 17.0203 2.05113 16.9484C2.08322 16.9151 2.08322 16.9151 2.11596 16.8811C2.38761 16.6075 2.63387 16.6155 3.00211 16.6129C3.04862 16.613 3.04862 16.613 3.09607 16.613C3.19027 16.6128 3.28437 16.6112 3.37855 16.6096C3.43912 16.6093 3.49968 16.6092 3.56024 16.6091C3.61478 16.6087 3.66931 16.6084 3.7255 16.608C4.04647 16.6507 4.24422 16.8434 4.46166 17.0657C4.48672 17.0909 4.51179 17.116 4.53761 17.1419C4.5901 17.1947 4.64244 17.2476 4.69462 17.3007C4.77452 17.382 4.85487 17.4627 4.93531 17.5434C4.98644 17.5949 5.03754 17.6465 5.08862 17.6981C5.11255 17.7222 5.13649 17.7463 5.16114 17.7711C5.4661 18.0817 5.4482 18.3384 5.45303 18.7502C5.45423 18.8234 5.45627 18.8965 5.45919 18.9696C5.48634 19.653 5.48634 19.653 5.26294 19.9053C5.1897 19.972 5.11513 20.0372 5.03955 20.1012C4.9758 20.1635 4.91352 20.2271 4.85122 20.2908C4.743 20.4014 4.63255 20.5097 4.52245 20.6183C4.43341 20.7062 4.34451 20.7943 4.25569 20.8824C4.21684 20.9208 4.17799 20.9591 4.13796 20.9986C4.04864 21.072 4.04864 21.072 4.05357 21.1301C5.03095 21.1708 5.8886 20.949 6.6257 20.2727C6.67427 20.23 6.67427 20.23 6.72383 20.1865C7.13927 19.8003 7.42753 19.306 7.61168 18.7723C7.62533 18.7354 7.63898 18.6986 7.65305 18.6606C7.83238 18.0879 7.79692 17.4025 7.64149 16.8283C7.59604 16.6549 7.57033 16.5047 7.61168 16.3288C7.6676 16.2488 7.6676 16.2488 7.74145 16.1685C7.7688 16.1386 7.79614 16.1087 7.82431 16.0779C7.96868 15.9259 8.11484 15.7759 8.2629 15.6275C8.29705 15.5931 8.3312 15.5587 8.36639 15.5233C8.48008 15.4088 8.59392 15.2945 8.70776 15.1802C8.76875 15.1189 8.82972 15.0575 8.89069 14.9962C9.17945 14.7056 9.46851 14.4154 9.75764 14.1252C9.79188 14.0908 9.79188 14.0908 9.82681 14.0558C10.2805 13.6004 10.7344 13.1451 11.1884 12.6901C11.288 12.5903 11.3875 12.4905 11.4871 12.3908C11.5118 12.366 11.5366 12.3412 11.5621 12.3156C11.9636 11.9132 12.3644 11.5102 12.7651 11.107C13.1769 10.6926 13.5893 10.2787 14.0022 9.86544C14.2338 9.63353 14.4652 9.40137 14.696 9.16857C14.8923 8.97053 15.0891 8.77299 15.2866 8.57612C15.3873 8.47569 15.4876 8.37495 15.5875 8.2737C15.6959 8.16396 15.8051 8.05518 15.9146 7.94659C15.9459 7.91443 15.9773 7.88226 16.0095 7.84912C16.2092 7.65367 16.3321 7.58356 16.6141 7.58352C16.7496 7.60596 16.7496 7.60596 16.874 7.64247C16.9184 7.65457 16.9628 7.66667 17.0085 7.67914C17.0481 7.69003 17.0877 7.70091 17.1286 7.71213C18.0223 7.89419 18.8766 7.63967 19.6444 7.19234C20.4057 6.68024 20.9306 5.86466 21.1154 4.96852C21.1524 4.75281 21.1629 4.54692 21.1609 4.32817C21.1606 4.28419 21.1606 4.28419 21.1603 4.23933C21.1598 4.16802 21.1591 4.09671 21.1582 4.02541C20.961 4.18566 20.7801 4.35811 20.602 4.53916C20.5789 4.56251 20.5559 4.58585 20.5322 4.6099C20.4359 4.70776 20.3398 4.80574 20.244 4.90411C20.1734 4.97656 20.1024 5.04859 20.0313 5.12057C20.0099 5.14277 19.9885 5.16496 19.9664 5.18782C19.6948 5.46144 19.4485 5.45342 19.0803 5.45599C19.0493 5.45598 19.0183 5.45597 18.9863 5.45597C18.8921 5.45615 18.798 5.45771 18.7038 5.45934C18.6433 5.45959 18.5827 5.45976 18.5221 5.45984C18.4403 5.46037 18.4403 5.46037 18.3569 5.46091C18.1105 5.42813 17.922 5.30992 17.7502 5.12928C17.7251 5.10314 17.7001 5.077 17.6743 5.05007C17.6026 4.97129 17.5329 4.89124 17.4635 4.81044C17.3055 4.6265 17.1342 4.45726 16.9608 4.28795C16.7405 4.0713 16.6856 3.9387 16.681 3.63507C16.6804 3.60086 16.6798 3.56664 16.6792 3.5314C16.6782 3.45893 16.6774 3.38647 16.6769 3.314C16.6758 3.20395 16.6726 3.09408 16.6693 2.98408C16.6596 2.3941 16.6596 2.3941 16.8256 2.20013C16.8825 2.1498 16.9407 2.10096 17 2.05344C17.0671 1.98691 17.1337 1.91983 17.1999 1.85232C17.3066 1.74728 17.4135 1.64257 17.5208 1.53809C17.7126 1.34888 17.8806 1.16413 18.0288 0.93885C17.0868 0.899599 16.2157 1.10069 15.4996 1.75336ZM1.67082 1.08755C1.62805 1.13065 1.62805 1.13065 1.58442 1.17463C1.55362 1.20557 1.52281 1.23652 1.49107 1.2684C1.45871 1.30112 1.42636 1.33383 1.39302 1.36754C1.3605 1.40025 1.32798 1.43297 1.29447 1.46667C1.2138 1.54785 1.13323 1.62913 1.05275 1.71049C1.11457 1.87706 1.19236 2.02534 1.28217 2.17853C1.29632 2.20283 1.31048 2.22713 1.32507 2.25216C1.40403 2.38727 1.48418 2.52163 1.5651 2.65557C1.59909 2.712 1.63305 2.76845 1.66698 2.82491C1.68402 2.85325 1.70106 2.88158 1.71862 2.91078C1.8167 3.07604 1.90621 3.24286 1.98903 3.41626C2.21026 3.89337 2.21026 3.89337 2.55316 4.28262C2.80007 4.36491 3.03954 4.36157 3.29623 4.33323C3.66262 4.29335 3.66262 4.29335 3.81617 4.39616C3.84904 4.42816 3.88192 4.46016 3.91579 4.49313C3.95269 4.52849 3.98959 4.56385 4.02761 4.60028C4.06447 4.63692 4.10133 4.67356 4.13931 4.71131C4.17319 4.74419 4.20708 4.77707 4.242 4.81095C4.34786 4.91432 4.45256 5.01876 4.55706 5.12351C4.61601 5.18235 4.61601 5.18235 4.67616 5.24238C4.78262 5.34866 4.88895 5.45506 4.99526 5.5615C5.10724 5.6736 5.21934 5.78559 5.33142 5.8976C5.5194 6.08551 5.7073 6.2735 5.89514 6.46155C6.11154 6.67819 6.3281 6.89467 6.54474 7.11107C6.73171 7.29784 6.91859 7.4847 7.1054 7.67163C7.21656 7.78285 7.32774 7.89404 7.439 8.00516C7.56304 8.12905 7.6869 8.25311 7.81074 8.37719C7.84707 8.41343 7.88339 8.44968 7.92082 8.48702C8.10457 8.67142 8.28191 8.85879 8.4513 9.05651C8.52473 9.14164 8.60206 9.22183 8.6819 9.30095C8.72396 9.34281 8.72396 9.34281 8.76688 9.38552C8.79504 9.41332 8.82319 9.44111 8.8522 9.46975C8.89617 9.51343 8.89617 9.51343 8.94104 9.558C9.01225 9.62871 9.08355 9.69932 9.15496 9.76983C9.32002 9.69344 9.42417 9.59507 9.5515 9.46439C9.58974 9.42538 9.62798 9.38636 9.66738 9.34617C9.69634 9.31622 9.72529 9.28627 9.75513 9.25541C9.68769 9.09253 9.58568 8.98998 9.46139 8.86649C9.44005 8.84517 9.41871 8.82385 9.39673 8.80188C9.32522 8.73053 9.25341 8.65949 9.1816 8.58845C9.13025 8.53733 9.07892 8.4862 9.02761 8.43505C8.91708 8.32494 8.80643 8.21496 8.69568 8.10509C8.52053 7.9313 8.34573 7.75717 8.17099 7.58298C7.73688 7.15032 7.30237 6.71807 6.86765 6.28603C6.52987 5.95033 6.19223 5.61449 5.85504 5.2782C5.6814 5.10505 5.50747 4.93221 5.33331 4.75958C5.22495 4.65205 5.11686 4.54425 5.00885 4.43637C4.95876 4.38645 4.90856 4.33664 4.85824 4.28696C4.78947 4.21902 4.72111 4.15069 4.65283 4.08226C4.61449 4.04415 4.57615 4.00604 4.53665 3.96678C4.40947 3.81922 4.30839 3.68153 4.31402 3.48206C4.32162 3.4437 4.32923 3.40533 4.33707 3.3658C4.3756 3.06964 4.3943 2.80252 4.26791 2.525C3.96476 2.22088 3.55964 2.04019 3.1781 1.85263C2.88305 1.7074 2.60609 1.53918 2.32875 1.36295C2.21345 1.28979 2.0974 1.21786 1.9813 1.14599C1.94356 1.12244 1.90582 1.09889 1.86693 1.07463C1.76035 1.00576 1.76035 1.00576 1.67082 1.08755ZM13.3648 11.7657C13.3338 11.7969 13.3027 11.8281 13.2708 11.8603C13.2356 11.8955 13.2004 11.9307 13.1642 11.9669C13.1262 12.0054 13.0881 12.0438 13.049 12.0834C13.0101 12.1224 12.9712 12.1614 12.9311 12.2016C12.8276 12.3055 12.7244 12.4096 12.6212 12.5137C12.5159 12.6199 12.4103 12.7258 12.3048 12.8318C12.0977 13.0398 11.8909 13.2481 11.6842 13.4566C11.7525 13.6015 11.8277 13.6938 11.9441 13.8049C12.1087 13.9626 12.1087 13.9626 12.1558 14.0567C12.2998 13.9942 12.3938 13.9149 12.5041 13.8038C12.5385 13.7695 12.5728 13.7352 12.6081 13.6998C12.6447 13.6628 12.6814 13.6257 12.7191 13.5875C12.7569 13.5496 12.7947 13.5116 12.8337 13.4725C12.9339 13.3719 13.034 13.2711 13.1339 13.1702C13.2361 13.0672 13.3385 12.9644 13.4408 12.8616C13.6415 12.66 13.8418 12.4582 14.042 12.2562C13.9671 12.0941 13.876 12.0004 13.7419 11.8811C13.7039 11.8469 13.6659 11.8126 13.6267 11.7773C13.5067 11.6824 13.4813 11.6647 13.3648 11.7657ZM14.6048 12.9264C14.5722 12.9591 14.5396 12.9919 14.5061 13.0256C14.4692 13.0625 14.4323 13.0994 14.3943 13.1374C14.354 13.1782 14.3137 13.2189 14.2734 13.2596C14.2322 13.301 14.191 13.3423 14.1498 13.3836C14.0412 13.4925 13.9329 13.6017 13.8246 13.7109C13.7142 13.8223 13.6035 13.9334 13.4928 14.0445C13.2755 14.2627 13.0585 14.4811 12.8417 14.6998C12.9003 14.8211 12.9573 14.9128 13.0505 15.0105C13.0749 15.0364 13.0993 15.0622 13.1244 15.0888C13.1635 15.1296 13.1635 15.1296 13.2034 15.1713C13.2582 15.2292 13.3129 15.2872 13.3677 15.3451C13.4084 15.3881 13.4084 15.3881 13.45 15.432C13.5574 15.5459 13.6631 15.6612 13.7687 15.7768C13.9308 15.9541 14.0933 16.1309 14.2564 16.3073C14.4405 16.5067 14.6242 16.7065 14.8075 16.9067C14.952 17.0645 15.0971 17.2219 15.2423 17.3791C15.4071 17.5573 15.5714 17.7359 15.7353 17.9149C15.9846 18.1871 16.235 18.4583 16.4855 18.7294C16.7554 19.0215 17.025 19.3137 17.2935 19.607C17.3969 19.72 17.5007 19.8328 17.6048 19.9452C17.6271 19.9692 17.6494 19.9933 17.6723 20.0181C17.7167 20.066 17.7612 20.1139 17.8056 20.1617C17.9225 20.2878 18.0346 20.416 18.144 20.5487C18.297 20.7241 18.4694 20.8453 18.6718 20.9586C18.7035 20.9764 18.7351 20.9942 18.7676 21.0125C19.1564 21.1991 19.6382 21.1946 20.0437 21.0604C20.4791 20.874 20.8415 20.5375 21.0392 20.1041C21.2104 19.6489 21.1837 19.2289 21.0296 18.7723C20.9699 18.6474 20.8993 18.5391 20.8153 18.4293C20.7958 18.4039 20.7764 18.3785 20.7563 18.3523C20.6257 18.1919 20.4808 18.0575 20.3235 17.9238C20.1787 17.7974 20.039 17.6659 19.899 17.5345C19.6851 17.334 19.4698 17.1357 19.2512 16.9403C19.0991 16.8033 18.9489 16.6642 18.7986 16.5252C18.6424 16.3807 18.4858 16.2366 18.3289 16.093C18.1499 15.9291 17.9713 15.7647 17.793 15.6C17.5504 15.3759 17.3072 15.1525 17.0636 14.9295C16.9566 14.8315 16.8497 14.7335 16.7427 14.6354C16.6999 14.5962 16.657 14.5569 16.6141 14.5176C15.8425 13.8102 15.8425 13.8102 15.7781 13.7512C15.7355 13.7122 15.6929 13.6731 15.6503 13.6341C15.5387 13.5319 15.4272 13.4294 15.316 13.3266C15.2929 13.3053 15.2698 13.284 15.246 13.2621C15.1818 13.2028 15.1176 13.1435 15.0534 13.0841C14.8463 12.863 14.8463 12.863 14.6048 12.9264Z"
                        fill="#38D140"
                      />
                    </mask>
                  </svg>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#F5A623] text-white flex items-center justify-center text-[12px] font-bold shadow-sm transition-transform duration-300 group-hover:scale-[1.08]">
                  02
                </div>
              </div>
              <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1E5CB3] mb-3">
                Get Confirmation
              </h3>
              <p className="text-[14px] leading-[160%] text-[#8892A3] max-w-[300px]">
                We'll Match You With The Right Professional And Send You The
                Best Option And Price Details
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative overflow-hidden p-8 md:p-10 min-h-[220px] flex flex-col items-center text-center rounded-[36px] border border-[#E8F5FC] bg-white shadow-[inset_0_2px_13.7px_0_#DCEFFA,inset_0_-2px_13.7px_0_#F7FCFF] transition-all duration-300 ease-in-out hover:shadow-none hover:border-transparent">
              <div className="absolute bottom-0 left-0 h-[6px] w-0 bg-[#F5A623] transition-all duration-500 ease-out group-hover:w-full"></div>
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="w-[84px] h-[84px] rounded-full border-[6px] border-[#FFF4D4] bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.08]">
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_5001_66" fill="white">
                      <path
                        d="M8.06044 0.000752884C8.13863 0.000622577 8.21682 0.000435207 8.29501 0.000194621C8.45752 -8.64796e-05 8.62001 0.000314233 8.78252 0.001223C8.98846 0.00231994 9.19436 0.00168673 9.4003 0.000535088C9.56135 -0.000168281 9.72239 6.41357e-05 9.88344 0.000559696C9.95928 0.000686079 10.0351 0.000538015 10.1109 8.22344e-05C10.7777 -0.00304781 11.4345 0.0823409 12.03 0.399411C12.0621 0.415883 12.0942 0.432355 12.1273 0.449326C13.1197 0.971936 13.7927 1.7856 14.1224 2.84251C14.4678 4.15336 14.6552 5.51518 14.3627 6.84734C14.3356 6.98372 14.3129 7.10833 14.3145 7.24731C14.4152 7.39661 14.4152 7.39661 14.5592 7.48801C14.6048 7.54174 14.649 7.59672 14.6907 7.65349C14.7197 7.69212 14.7197 7.69212 14.7494 7.73153C14.9693 8.10886 14.9646 8.61212 14.8681 9.02943C14.7099 9.45157 14.4303 9.74548 14.0209 9.94315C13.8134 10.0293 13.6521 10.0414 13.4281 10.0307C13.2439 10.0251 13.0709 10.0275 12.8955 10.0876C12.7191 10.2631 12.6192 10.4549 12.5057 10.6728C12.3089 11.0179 12.0093 11.2699 11.6692 11.4686C11.5378 11.555 11.4462 11.6154 11.3994 11.7677C11.3631 11.9942 11.3665 12.218 11.3786 12.4464C11.471 12.4613 11.471 12.4613 11.5652 12.4765C11.8756 12.5357 12.1721 12.636 12.4703 12.7379C12.7527 12.8325 12.7527 12.8325 13.0423 12.7834C13.0746 12.7675 13.1069 12.7516 13.1402 12.7353C13.5278 12.7041 13.8795 12.793 14.2511 12.8892C14.3547 12.9159 14.4586 12.9413 14.5625 12.9666C14.629 12.9834 14.6955 13.0003 14.762 13.0173C14.8217 13.0325 14.8814 13.0476 14.9429 13.0632C15.1059 13.1235 15.1852 13.1801 15.2932 13.3129C15.3092 13.4092 15.3092 13.4092 15.3054 13.5055C15.3079 13.6063 15.3079 13.6063 15.3421 13.6981C15.4629 13.7893 15.5903 13.8418 15.7335 13.8906C15.7478 13.851 15.762 13.8114 15.7767 13.7706C16.1144 12.8659 16.6329 12.2265 17.5257 11.8056C17.9527 11.6124 18.3243 11.5634 18.7887 11.5649C18.8369 11.5641 18.8851 11.5633 18.9348 11.5625C19.2404 11.5623 19.5174 11.59 19.7949 11.7243C19.9177 11.8558 19.9398 11.9235 19.9478 12.1004C19.8338 12.418 19.5462 12.6461 19.301 12.872C19.2577 12.9122 19.2144 12.9525 19.1698 12.9939C19.0802 13.0769 18.9897 13.159 18.8984 13.2403C18.6676 13.4443 18.6676 13.4443 18.5509 13.7157C18.5625 13.8284 18.5867 13.9269 18.6205 14.035C18.6333 14.0982 18.6456 14.1614 18.6574 14.2248C18.677 14.3111 18.677 14.3111 18.697 14.3991C18.7101 14.4577 18.7233 14.5164 18.7369 14.5768C18.752 14.6422 18.752 14.6422 18.7673 14.709C18.9089 14.7414 19.0506 14.7734 19.1924 14.8053C19.2523 14.8191 19.2523 14.8191 19.3135 14.8331C19.3719 14.8461 19.3719 14.8461 19.4315 14.8594C19.4671 14.8675 19.5027 14.8756 19.5394 14.8839C19.5753 14.8897 19.6111 14.8955 19.6481 14.9016C19.6868 14.908 19.7256 14.9144 19.7656 14.9211C19.959 14.8914 20.0578 14.766 20.1863 14.6311C20.2136 14.6036 20.2409 14.576 20.2691 14.5477C20.3563 14.4596 20.4426 14.3707 20.5288 14.2818C20.6152 14.1932 20.7016 14.1048 20.7886 14.0169C20.8426 13.9622 20.8963 13.9071 20.9495 13.8517C21.0921 13.7068 21.2098 13.6062 21.4096 13.5536C21.5574 13.5624 21.6618 13.5771 21.7888 13.6529C22.0939 14.1182 22.0098 14.9846 21.8989 15.5003C21.6392 16.3224 21.1091 17.0004 20.3331 17.4048C19.8214 17.6656 19.3784 17.7581 18.804 17.7508C18.7567 17.7508 18.7094 17.7508 18.6606 17.7507C18.4433 17.7494 18.2464 17.7375 18.0333 17.6937C18.0338 17.73 18.0342 17.7664 18.0346 17.8039C18.0386 18.1467 18.0415 18.4895 18.0435 18.8323C18.0445 19.0086 18.0459 19.1848 18.0481 19.3611C18.0502 19.5312 18.0514 19.7013 18.0519 19.8714C18.0524 19.9678 18.054 20.0642 18.0555 20.1607C18.0555 20.2194 18.0555 20.2782 18.0555 20.3388C18.056 20.3905 18.0564 20.4423 18.0569 20.4956C18.0273 20.6648 17.9775 20.7223 17.8376 20.8228C17.773 20.8228 17.7084 20.8228 17.6419 20.8228C17.6419 21.8395 17.6419 22.8562 17.6419 23.9037C17.3835 23.9037 17.1252 23.9037 16.859 23.9037C16.859 22.887 16.859 21.8703 16.859 20.8228C16.3322 20.8287 16.3322 20.8287 15.7947 20.8348C15.6841 20.8356 15.5735 20.8363 15.4595 20.8371C15.3717 20.8385 15.2839 20.84 15.1961 20.8416C15.1506 20.8416 15.1051 20.8417 15.0582 20.8417C14.8666 20.8459 14.7421 20.8496 14.5758 20.9477C14.4816 21.1141 14.5069 21.2177 14.5374 21.4046C14.5426 21.4382 14.5478 21.4718 14.5531 21.5064C14.5703 21.6157 14.5891 21.7247 14.6081 21.8337C14.6203 21.9072 14.6324 21.9808 14.6445 22.0543C14.6884 22.3188 14.7349 22.5828 14.7816 22.8468C14.8016 22.96 14.8213 23.0733 14.8409 23.1865C14.847 23.2205 14.8531 23.2545 14.8594 23.2895C14.8924 23.4805 14.9078 23.662 14.9017 23.8556C14.6409 23.9375 14.3913 23.9769 14.1188 24C14.0417 23.7518 13.989 23.507 13.9471 23.251C13.9408 23.213 13.9344 23.175 13.9278 23.1359C13.9077 23.0158 13.8879 22.8956 13.868 22.7754C13.8543 22.6935 13.8406 22.6115 13.8269 22.5296C13.7935 22.3297 13.7604 22.1299 13.7273 21.93C13.6258 21.9195 13.6258 21.9195 13.5566 21.992C13.5282 22.0211 13.4998 22.0501 13.4705 22.0801C13.4381 22.1129 13.4057 22.1457 13.3723 22.1795C13.3372 22.2154 13.3021 22.2514 13.2659 22.2884C13.1909 22.3639 13.1159 22.4394 13.0408 22.5148C12.9227 22.634 12.8048 22.7533 12.6875 22.8732C11.7037 23.8769 11.7037 23.8769 11.1148 23.937C10.4612 23.9155 10.1262 23.8077 9.66601 23.326C9.45428 23.0456 9.40957 22.7776 9.39995 22.4355C9.39698 22.3724 9.39402 22.3094 9.39096 22.2444C9.54223 21.1587 10.8446 20.3372 11.4765 19.7155C8.10974 19.6917 8.10974 19.6917 4.67499 19.6674C4.65884 19.8422 4.64269 20.0169 4.62605 20.1969C4.60632 20.3325 4.58554 20.4669 4.56211 20.6018C4.55589 20.6385 4.54968 20.6752 4.54328 20.713C4.52309 20.832 4.50261 20.951 4.48213 21.07C4.46792 21.1535 4.45372 21.2369 4.43955 21.3203C4.40248 21.5382 4.36518 21.7561 4.32782 21.9739C4.28962 22.1969 4.25166 22.4199 4.21367 22.643C4.13932 23.0793 4.06471 23.5156 3.98994 23.9519C3.81697 24.0086 3.72469 23.989 3.5465 23.9579C3.46844 23.9447 3.46844 23.9447 3.38881 23.9312C3.25597 23.9037 3.25597 23.9037 3.1581 23.8556C3.18525 23.4734 3.23035 23.0987 3.29572 22.7211C3.30423 22.671 3.31273 22.6208 3.32149 22.5692C3.33931 22.4644 3.35724 22.3597 3.37529 22.255C3.40295 22.0944 3.43021 21.9337 3.45743 21.7731C3.47486 21.6709 3.49232 21.5686 3.5098 21.4664C3.51796 21.4185 3.52611 21.3705 3.53452 21.321C3.54219 21.2766 3.54987 21.2323 3.55778 21.1865C3.56447 21.1475 3.57117 21.1086 3.57807 21.0684C3.59849 20.9672 3.59849 20.9672 3.64742 20.8228C2.84005 20.8228 2.03268 20.8228 1.20084 20.8228C1.20084 21.8395 1.20084 22.8562 1.20084 23.9037C0.94248 23.9037 0.684121 23.9037 0.417932 23.9037C0.417932 22.887 0.417932 21.8703 0.417932 20.8228C0.321048 20.8069 0.224163 20.791 0.124343 20.7746C0.0109885 20.6073 0.0134571 20.5402 0.0114868 20.3426C0.0107045 20.2832 0.00992218 20.2239 0.00911618 20.1627C0.0088036 20.0975 0.0085399 20.0323 0.00832101 19.9672C0.00788149 19.8996 0.00743513 19.8321 0.00698229 19.7646C0.00617405 19.6224 0.00579855 19.4802 0.00565701 19.338C0.00544856 19.1941 0.00444537 19.0502 0.00264657 18.9063C-0.00964556 17.905 0.00139374 16.9144 0.482155 16.0028C0.501046 15.9654 0.519938 15.928 0.539401 15.8895C0.69736 15.585 0.879265 15.3081 1.10298 15.046C1.15501 14.9848 1.15501 14.9848 1.2081 14.9224C1.61155 14.4663 2.04454 14.1054 2.57092 13.7943C2.72703 13.7159 2.72703 13.7159 2.74314 13.5884C2.75268 13.5032 2.76186 13.418 2.77067 13.3327C2.81558 13.2167 2.81558 13.2167 2.94563 13.1427C3.21625 13.0261 3.49897 12.9645 3.78504 12.8947C3.84537 12.8793 3.90571 12.8639 3.96787 12.848C4.29263 12.768 4.58466 12.7065 4.91964 12.7353C4.96809 12.767 5.01653 12.7988 5.06644 12.8315C5.38426 12.8154 5.68247 12.7061 5.98391 12.6119C6.08451 12.5806 6.18518 12.5494 6.28591 12.5184C6.33011 12.5046 6.37431 12.4908 6.41985 12.4766C6.53439 12.4464 6.53439 12.4464 6.68118 12.4464C6.7079 11.9877 6.7079 11.9877 6.55732 11.5743C6.45524 11.5037 6.35031 11.446 6.2408 11.3873C5.87584 11.1125 5.50974 10.7492 5.31774 10.3328C5.27088 10.2258 5.27088 10.2258 5.1643 10.0876C5.01612 10.058 4.91389 10.0494 4.76673 10.0545C4.303 10.0488 3.92884 9.96651 3.57899 9.64679C3.18528 9.20086 3.12207 8.77521 3.14912 8.20536C3.18189 7.87145 3.39497 7.60029 3.59849 7.34359C3.627 7.32361 3.65551 7.30363 3.68488 7.28304C3.70482 7.25537 3.72475 7.22769 3.74528 7.19917C3.72248 7.08113 3.69308 6.97617 3.6566 6.86219C3.41238 5.95556 3.54032 5.02216 3.68106 4.10919C3.68702 4.06981 3.69298 4.03042 3.69912 3.98984C3.89234 2.73734 4.31387 1.59673 5.36003 0.796566C6.1889 0.211044 7.05658 -0.00528071 8.06044 0.000752884ZM5.50682 1.8075C5.47617 1.83599 5.44551 1.86447 5.41393 1.89382C4.87654 2.43567 4.69692 3.15524 4.57712 3.87752C4.56615 3.9392 4.55517 4.00089 4.54386 4.06444C4.50228 4.31046 4.47476 4.54236 4.47926 4.79218C4.52224 4.78057 4.52224 4.78057 4.5661 4.76872C5.32564 4.56622 6.0806 4.42782 6.86102 4.32934C6.97557 4.3163 6.97557 4.3163 7.07264 4.26264C7.07335 4.2109 7.07406 4.15915 7.0748 4.10584C7.07763 3.91393 7.08141 3.72204 7.08548 3.53014C7.08711 3.44707 7.08848 3.364 7.08959 3.28093C7.09123 3.16153 7.09379 3.04218 7.09653 2.92281C7.09684 2.88564 7.09715 2.84848 7.09748 2.81019C7.10459 2.55558 7.10459 2.55558 7.17518 2.44759C7.31675 2.35277 7.43622 2.36681 7.60611 2.3665C7.64025 2.36624 7.6744 2.36599 7.70959 2.36573C7.82247 2.36509 7.93532 2.36551 8.04821 2.366C8.12664 2.3659 8.20506 2.36576 8.28349 2.36558C8.44786 2.36537 8.61222 2.36568 8.77659 2.36635C8.98738 2.36718 9.19814 2.3667 9.40893 2.36584C9.57088 2.36532 9.73282 2.36548 9.89477 2.36586C9.9725 2.36595 10.0502 2.36583 10.1279 2.3655C10.2365 2.36513 10.3451 2.36569 10.4537 2.3665C10.5155 2.36661 10.5773 2.36673 10.641 2.36684C10.7914 2.38518 10.7914 2.38518 10.8846 2.44759C10.9785 2.59118 10.9619 2.7572 10.9633 2.92281C10.9642 2.96107 10.965 2.99933 10.9659 3.03875C10.9686 3.16088 10.9702 3.283 10.9719 3.40515C10.9735 3.48798 10.9752 3.57082 10.9769 3.65365C10.9811 3.85664 10.9844 4.05963 10.9872 4.26264C11.1072 4.32168 11.2089 4.33062 11.3423 4.34745C12.1041 4.44826 12.8393 4.59193 13.5805 4.79218C13.4929 3.56414 13.2779 2.38018 12.2878 1.53136C11.3766 0.815032 10.2992 0.779593 9.18472 0.784014C9.03015 0.78453 8.8756 0.784016 8.72102 0.783403C7.48069 0.782518 6.42641 0.90746 5.50682 1.8075ZM7.85554 3.10728C7.85554 3.48855 7.85554 3.86982 7.85554 4.26264C8.63062 4.26264 9.4057 4.26264 10.2043 4.26264C10.2043 3.88137 10.2043 3.5001 10.2043 3.10728C9.42918 3.10728 8.65411 3.10728 7.85554 3.10728ZM4.72392 5.56242C4.93208 5.82096 5.13034 6.03268 5.45789 6.1401C5.91462 6.17135 6.34442 6.10949 6.79128 6.02275C6.90874 6.00062 7.02623 5.97862 7.14374 5.95675C7.19478 5.94692 7.24583 5.93709 7.29842 5.92696C7.66265 5.86636 8.02046 5.84332 8.38959 5.84148C8.43483 5.84114 8.48007 5.84081 8.52668 5.84047C8.67199 5.83964 8.8173 5.83933 8.96262 5.83922C9.01208 5.83916 9.06155 5.83909 9.11251 5.83903C9.974 5.83927 10.7858 5.90192 11.6294 6.07691C12.0547 6.16442 12.5141 6.23993 12.9058 6.01279C13.0652 5.89401 13.2025 5.75657 13.3359 5.61056C11.3819 4.32897 6.77736 4.84349 4.72392 5.56242ZM4.47926 6.52521C4.49541 6.6523 4.51155 6.77939 4.52819 6.91033C4.60893 6.92622 4.68966 6.94211 4.77285 6.95847C4.789 6.89493 4.80514 6.83138 4.82178 6.76591C4.70875 6.68648 4.59572 6.60705 4.47926 6.52521ZM13.238 6.71777C13.2542 6.79721 13.2703 6.87664 13.287 6.95847C13.3515 6.95847 13.4161 6.95847 13.4827 6.95847C13.515 6.8155 13.5473 6.67252 13.5805 6.52521C13.4635 6.52521 13.3317 6.65501 13.238 6.71777ZM6.54826 6.84098C6.33008 6.88503 6.11793 6.9226 5.89522 6.93741C5.73476 6.93617 5.73476 6.93617 5.60469 7.00661C5.44442 7.80299 5.46515 8.71574 5.80041 9.46175C5.81978 9.50724 5.83914 9.55272 5.85909 9.59959C6.21729 10.3711 6.90336 10.9897 7.69097 11.3168C8.72109 11.6801 9.68343 11.6301 10.6661 11.1767C11.5402 10.713 12.1206 9.96037 12.4106 9.03883C12.4253 8.98776 12.44 8.93669 12.4551 8.88407C12.464 8.85533 12.4728 8.82659 12.482 8.79698C12.5107 8.65971 12.5104 8.52985 12.5105 8.3897C12.5106 8.30169 12.5106 8.30169 12.5107 8.2119C12.5105 8.15074 12.5104 8.08959 12.5102 8.02658C12.5104 7.96598 12.5105 7.90538 12.5107 7.84295C12.5107 7.78409 12.5106 7.72523 12.5105 7.66459C12.5105 7.58437 12.5105 7.58437 12.5104 7.50253C12.5164 7.20983 12.5164 7.20983 12.4062 6.95847C12.2984 6.94347 12.1902 6.93096 12.082 6.91936C11.6841 6.87434 11.2911 6.80804 10.8971 6.73746C10.8517 6.72941 10.8063 6.72136 10.7595 6.71307C10.6997 6.70227 10.6997 6.70227 10.6387 6.69125C10.2962 6.63869 9.9579 6.6133 9.61135 6.61002C9.5699 6.60956 9.52845 6.6091 9.48574 6.60862C9.35214 6.60744 9.21855 6.60683 9.08495 6.60645C9.01656 6.60621 9.01656 6.60621 8.94679 6.60597C8.12694 6.60505 7.35234 6.6781 6.54826 6.84098ZM4.18567 7.96941C3.99306 8.17885 3.95868 8.35057 3.97121 8.62419C4.01006 8.86367 4.13751 8.98865 4.32023 9.13981C4.51357 9.23858 4.65468 9.25453 4.87071 9.26919C4.86097 9.22861 4.86097 9.22861 4.85102 9.1872C4.75155 8.72144 4.74185 8.25096 4.72392 7.77685C4.48227 7.76639 4.37615 7.81789 4.18567 7.96941ZM13.3359 7.77685C13.3335 7.84021 13.3311 7.90357 13.3286 7.96885C13.2922 8.83993 13.2922 8.83993 13.1891 9.26919C13.5219 9.22583 13.7372 9.17473 13.972 8.93221C14.1053 8.71702 14.1014 8.50333 14.0699 8.25825C13.9556 8.02476 13.8125 7.89794 13.5805 7.77685C13.452 7.77031 13.452 7.77031 13.3359 7.77685ZM7.46409 12.1094C7.40631 12.3586 7.42799 12.532 7.56329 12.7526C8.17489 13.562 8.17489 13.562 8.98097 14.1313C9.21052 14.0803 9.36256 13.9285 9.52839 13.7733C9.55608 13.7477 9.58377 13.7221 9.6123 13.6958C9.87307 13.452 10.117 13.1966 10.3511 12.9278C10.3789 12.8978 10.4068 12.8678 10.4355 12.8368C10.6109 12.6306 10.6179 12.4597 10.6043 12.2029C10.6015 12.1721 10.5986 12.1412 10.5957 12.1094C10.5331 12.1233 10.4706 12.1372 10.4061 12.1516C10.3226 12.1701 10.239 12.188 10.1553 12.2057C10.1043 12.2177 10.1043 12.2177 10.0522 12.23C9.71629 12.3041 9.39188 12.3205 9.04825 12.3201C8.99261 12.3201 8.93698 12.3202 8.87965 12.3202C8.4823 12.3154 8.13092 12.2655 7.75175 12.1516C7.61201 12.1024 7.61201 12.1024 7.46409 12.1094ZM17.7887 12.5908C17.2189 12.8868 16.7945 13.3688 16.5715 13.9628C16.5075 14.197 16.5029 14.4288 16.5012 14.6699C16.5009 14.7065 16.5006 14.7431 16.5003 14.7808C16.5034 15.013 16.5423 15.2082 16.6143 15.4311C16.6605 15.749 16.6605 15.749 16.5573 15.8992C16.2765 16.2021 15.9823 16.4911 15.6865 16.7796C15.6277 16.837 15.569 16.8945 15.5103 16.952C15.3846 17.075 15.2588 17.198 15.133 17.3209C14.934 17.5153 14.7352 17.7101 14.5366 17.9048C14.4684 17.9717 14.4002 18.0385 14.332 18.1053C14.2979 18.1388 14.2638 18.1722 14.2286 18.2067C13.7665 18.6596 13.3041 19.1123 12.8412 19.5645C12.5283 19.8703 12.2156 20.1764 11.9034 20.4828C11.7384 20.6448 11.5732 20.8066 11.4076 20.968C11.252 21.1195 11.0969 21.2715 10.9421 21.4239C10.8853 21.4797 10.8283 21.5353 10.7711 21.5907C10.693 21.6665 10.6155 21.7428 10.5382 21.8193C10.473 21.8831 10.473 21.8831 10.4064 21.9482C10.2529 22.134 10.2043 22.291 10.2043 22.5287C10.2792 22.7914 10.4293 22.9642 10.663 23.1094C10.8484 23.1442 11.005 23.1453 11.1829 23.0853C11.5467 22.8348 11.8524 22.481 12.1652 22.1717C12.2239 22.1139 12.2826 22.0561 12.3414 21.9982C12.4671 21.8744 12.5927 21.7505 12.7183 21.6265C12.9168 21.4306 13.1154 21.2349 13.3141 21.0392C13.7354 20.6242 14.1565 20.209 14.5775 19.7938C15.0331 19.3445 15.4888 18.8952 15.9447 18.4462C16.1423 18.2515 16.3399 18.0567 16.5373 17.8618C16.6598 17.7409 16.7823 17.6202 16.9049 17.4995C16.9619 17.4433 17.0188 17.3872 17.0757 17.3309C17.1531 17.2544 17.2307 17.1781 17.3082 17.1018C17.3517 17.059 17.3951 17.0161 17.4398 16.972C17.5997 16.8236 17.6997 16.8208 17.9177 16.8161C18.0333 16.8272 18.0333 16.8272 18.1912 16.8747C18.7249 17.0155 19.3491 16.9724 19.8438 16.7309C20.4718 16.3707 20.893 15.8865 21.099 15.1966C21.1257 15.0855 21.1257 15.0855 21.0671 14.9497C21.0439 14.9728 21.0207 14.9959 20.9968 15.0196C20.8919 15.1238 20.7868 15.2278 20.6817 15.3318C20.6452 15.3681 20.6087 15.4045 20.5711 15.4419C20.5186 15.4938 20.5186 15.4938 20.465 15.5467C20.4327 15.5788 20.4004 15.6108 20.3672 15.6438C20.2179 15.7808 20.0904 15.7835 19.8892 15.7812C19.6109 15.7557 19.3422 15.6818 19.0727 15.6115C18.9685 15.5844 18.8641 15.5584 18.7597 15.5325C18.693 15.5155 18.6263 15.4985 18.5597 15.4813C18.4997 15.4659 18.4398 15.4505 18.378 15.4347C18.1659 15.361 18.1659 15.361 18.0823 15.2385C18.0297 15.092 18.0297 15.092 17.9823 14.9132C17.9696 14.8654 17.9696 14.8654 17.9566 14.8166C17.9388 14.7491 17.9212 14.6815 17.9039 14.6138C17.8777 14.5116 17.8503 14.4097 17.8228 14.3077C17.6037 13.4783 17.6037 13.4783 17.7485 13.2033C17.7896 13.1637 17.7896 13.1637 17.8315 13.1234C17.8622 13.0927 17.8929 13.062 17.9246 13.0303C17.9605 12.9965 17.9963 12.9627 18.0333 12.9278C18.0768 12.8846 18.1202 12.8413 18.165 12.7968C18.2833 12.679 18.4026 12.5624 18.5226 12.4464C18.2672 12.3627 18.0296 12.493 17.7887 12.5908ZM11.134 13.2167C11.0637 13.2934 10.997 13.3732 10.9321 13.4544C10.5468 13.9269 10.1516 14.3357 9.66601 14.709C9.73835 14.9321 9.86977 15.0891 10.0238 15.2626C10.047 15.2894 10.0702 15.3161 10.0941 15.3437C10.2383 15.5086 10.3886 15.6643 10.5468 15.8162C10.8086 15.3635 11.0649 14.908 11.3175 14.4502C11.344 14.4022 11.3705 14.3542 11.3979 14.3048C11.5606 14.0091 11.7172 13.711 11.8679 13.4092C11.764 13.377 11.66 13.3449 11.556 13.3129C11.4981 13.2951 11.4402 13.2772 11.3805 13.2588C11.2419 13.2122 11.2419 13.2122 11.134 13.2167ZM6.50381 13.3129C6.41657 13.3397 6.41657 13.3397 6.32758 13.3671C6.2604 13.3879 6.2604 13.3879 6.19187 13.4092C6.42874 13.8883 6.67877 14.36 6.93502 14.8293C6.96407 14.8827 6.99312 14.9361 7.02306 14.9911C7.17738 15.2726 7.33692 15.5474 7.51302 15.8162C7.72511 15.617 7.90776 15.4003 8.09103 15.1754C8.12026 15.1397 8.1495 15.1041 8.17962 15.0673C8.25114 14.9801 8.32252 14.8927 8.39379 14.8053C8.30928 14.624 8.21689 14.5413 8.05433 14.4202C7.63897 14.0946 7.2812 13.7122 6.9807 13.2806C6.9626 13.2595 6.94449 13.2384 6.92584 13.2167C6.77614 13.2167 6.64619 13.269 6.50381 13.3129ZM13.6295 13.6018C13.0579 15.8032 13.0579 15.8032 12.4981 18.0075C12.4797 18.0808 12.4612 18.1541 12.4426 18.2274C12.4177 18.3255 12.3932 18.4237 12.3689 18.522C12.3558 18.5744 12.3427 18.6267 12.3292 18.6807C12.296 18.8004 12.296 18.8004 12.3573 18.8972C12.5019 18.7677 12.6438 18.6356 12.7854 18.503C12.8258 18.4669 12.8661 18.4309 12.9077 18.3937C13.1169 18.1954 13.2559 18.0298 13.3352 17.7522C13.3513 17.697 13.3673 17.6418 13.3838 17.585C13.4003 17.5255 13.4168 17.4661 13.4337 17.4048C13.4513 17.3427 13.4689 17.2806 13.4865 17.2185C13.5442 17.0136 13.6003 16.8082 13.6562 16.6028C13.6768 16.5275 13.6974 16.4523 13.7179 16.377C13.7606 16.2206 13.8032 16.0643 13.8457 15.9079C13.9002 15.7076 13.955 15.5074 14.0099 15.3072C14.0523 15.1524 14.0945 14.9976 14.1366 14.8427C14.1568 14.7688 14.177 14.695 14.1973 14.6211C14.2255 14.5183 14.2534 14.4155 14.2812 14.3126C14.3051 14.225 14.3051 14.225 14.3295 14.1356C14.3706 13.981 14.3706 13.981 14.3635 13.7943C14.1212 13.7308 13.879 13.6673 13.6295 13.6018ZM4.3814 13.6018C4.15533 13.6653 3.92927 13.7289 3.69635 13.7943C3.72688 14.0894 3.78795 14.3651 3.86685 14.6511C3.87919 14.6966 3.89152 14.7421 3.90423 14.789C3.94478 14.9384 3.9857 15.0876 4.02664 15.2368C4.055 15.3409 4.08333 15.4449 4.11165 15.5489C4.17088 15.7663 4.23029 15.9836 4.28984 16.2009C4.36632 16.48 4.44242 16.7593 4.51839 17.0385C4.57678 17.253 4.63533 17.4674 4.69394 17.6819C4.72208 17.7849 4.75017 17.8879 4.77822 17.9909C4.81729 18.1343 4.85659 18.2777 4.89594 18.421C4.90759 18.4639 4.91923 18.5068 4.93123 18.551C4.96924 18.7391 4.96924 18.7391 5.06644 18.8972C5.18158 18.9007 5.29682 18.9012 5.41202 18.9002C5.47516 18.8997 5.5383 18.8993 5.60335 18.8989C5.65223 18.8983 5.70112 18.8977 5.75148 18.8972C5.69194 18.5565 5.62175 18.2209 5.53626 17.8856C5.52495 17.8407 5.51364 17.7957 5.50198 17.7495C5.46504 17.6029 5.42784 17.4565 5.39061 17.3101C5.36465 17.2075 5.33869 17.105 5.31275 17.0025C5.25857 16.7887 5.20427 16.5749 5.14987 16.3611C5.08012 16.0869 5.0108 15.8126 4.94158 15.5383C4.88821 15.3271 4.83459 15.1159 4.78089 14.9047C4.7552 14.8036 4.7296 14.7024 4.7041 14.6012C4.66855 14.4602 4.63263 14.3193 4.59662 14.1784C4.58614 14.1366 4.57567 14.0947 4.56487 14.0516C4.555 14.0132 4.54513 13.9749 4.53495 13.9355C4.52651 13.9022 4.51807 13.8689 4.50937 13.8347C4.47869 13.7317 4.47869 13.7317 4.3814 13.6018ZM5.3111 13.6981C5.37068 14.0394 5.44116 14.3754 5.5271 14.7112C5.53849 14.7563 5.54988 14.8013 5.56161 14.8478C5.5988 14.9947 5.63623 15.1417 5.67369 15.2886C5.69977 15.3913 5.72584 15.494 5.7519 15.5968C5.80629 15.811 5.8608 16.0252 5.9154 16.2394C5.98551 16.5145 6.05531 16.7896 6.12502 17.0648C6.17866 17.2765 6.23248 17.4881 6.28634 17.6996C6.31216 17.8012 6.33793 17.9027 6.36365 18.0043C6.39944 18.1455 6.43545 18.2866 6.47152 18.4277C6.48217 18.4699 6.49282 18.5122 6.50379 18.5556C6.53769 18.7414 6.53769 18.7414 6.63225 18.8972C6.78049 18.9014 6.92765 18.9027 7.07589 18.9019C7.13497 18.9018 7.13497 18.9018 7.19525 18.9017C7.34297 18.9015 7.49069 18.9008 7.63841 18.9002C7.96842 18.8992 8.29844 18.8982 8.63845 18.8972C8.63845 17.8805 8.63845 16.8637 8.63845 15.8162C8.43711 16.0124 8.43711 16.0124 8.25904 16.2211C8.22512 16.2642 8.22512 16.2642 8.19051 16.3082C8.16778 16.3375 8.14504 16.3668 8.12161 16.3969C7.72351 16.9082 7.72351 16.9082 7.56023 16.9473C7.28945 16.9396 7.28945 16.9396 7.19112 16.8642C7.1099 16.7647 7.05111 16.6639 6.99045 16.5511C6.96548 16.5051 6.94052 16.4591 6.9148 16.4118C6.88817 16.3622 6.86154 16.3126 6.83409 16.2615C6.61291 15.8543 6.38762 15.4501 6.15517 15.049C5.89723 14.6032 5.64928 14.1532 5.40896 13.6981C5.37667 13.6981 5.34437 13.6981 5.3111 13.6981ZM12.6508 13.6981C12.6319 13.7331 12.613 13.7681 12.5936 13.8042C12.2363 14.4655 11.876 15.1243 11.4985 15.7747C11.3119 16.0966 11.1341 16.4219 10.9621 16.7516C10.8893 16.8753 10.8893 16.8753 10.7914 16.9234C10.5133 16.9503 10.5133 16.9503 10.4 16.9234C10.1812 16.7387 10.0076 16.5095 9.8281 16.2886C9.77189 16.2197 9.71563 16.1508 9.65932 16.0819C9.62245 16.0366 9.62245 16.0366 9.58484 15.9903C9.5166 15.9069 9.5166 15.9069 9.42136 15.8162C9.42136 16.8329 9.42136 17.8496 9.42136 18.8972C10.0834 18.8972 10.7454 18.8972 11.4276 18.8972C11.5412 18.5685 11.5412 18.5685 11.6366 18.2373C11.6467 18.1981 11.6567 18.1588 11.6671 18.1183C11.6828 18.0562 11.6828 18.0562 11.6988 17.9928C11.7103 17.9479 11.7218 17.903 11.7336 17.8567C11.7711 17.7098 11.8083 17.5628 11.8456 17.4157C11.8717 17.3131 11.8978 17.2104 11.9239 17.1078C11.9785 16.8934 12.0329 16.6791 12.0872 16.4647C12.1569 16.1896 12.2269 15.9146 12.297 15.6396C12.3509 15.428 12.4046 15.2164 12.4583 15.0048C12.484 14.9033 12.5098 14.8018 12.5357 14.7004C12.5717 14.559 12.6075 14.4176 12.6432 14.2762C12.654 14.2342 12.6647 14.1922 12.6758 14.1489C12.6855 14.1105 12.6951 14.072 12.7051 14.0324C12.7136 13.999 12.722 13.9656 12.7308 13.9312C12.7535 13.834 12.7535 13.834 12.7487 13.6981C12.7164 13.6981 12.6841 13.6981 12.6508 13.6981ZM2.96238 14.5164C1.88347 15.257 1.1186 16.1822 0.873799 17.4868C0.74951 18.3281 0.803361 19.208 0.809386 20.0525C1.79438 20.0525 2.77937 20.0525 3.79422 20.0525C3.85881 19.7348 3.9234 19.4171 3.98994 19.0897C4.05453 19.0262 4.11912 18.9626 4.18567 18.8972C4.17281 18.7614 4.1519 18.6564 4.11373 18.5274C4.10403 18.4912 4.09434 18.4551 4.08435 18.4179C4.06391 18.3421 4.04297 18.2664 4.02157 18.1909C3.99191 18.0858 3.96375 17.9804 3.93626 17.8747C3.88247 17.6682 3.82682 17.4622 3.7709 17.2563C3.75056 17.1812 3.73023 17.106 3.70991 17.0309C3.66781 16.8755 3.62561 16.7201 3.58334 16.5647C3.52922 16.3656 3.47546 16.1664 3.42179 15.9672C3.38017 15.813 3.3383 15.6588 3.29636 15.5046C3.27641 15.4311 3.25655 15.3576 3.23678 15.2841C3.20931 15.182 3.18149 15.08 3.15359 14.978C3.13788 14.9201 3.12217 14.8622 3.10599 14.8025C3.0653 14.6539 3.0653 14.6539 2.96238 14.5164ZM15.0485 14.5164C14.9634 14.8153 14.8789 15.1143 14.7949 15.4135C14.7663 15.5153 14.7375 15.617 14.7085 15.7187C14.6669 15.8648 14.6259 16.0109 14.585 16.1571C14.5653 16.2255 14.5653 16.2255 14.5453 16.2953C14.5277 16.3589 14.5277 16.3589 14.5097 16.4238C14.4991 16.4611 14.4886 16.4984 14.4777 16.5368C14.4518 16.644 14.4518 16.644 14.5102 16.779C14.6954 16.6136 14.8782 16.4459 15.0592 16.276C15.1209 16.2186 15.1833 16.1618 15.2463 16.1057C15.6214 15.7914 15.6214 15.7914 15.8075 15.3641C15.769 15.0836 15.6934 14.9326 15.4705 14.7511C15.3346 14.6612 15.1951 14.5878 15.0485 14.5164ZM17.0432 18.5171C17.0099 18.5497 16.9766 18.5823 16.9423 18.6159C16.9062 18.6516 16.87 18.6872 16.8328 18.724C16.7959 18.7602 16.7591 18.7964 16.7211 18.8337C16.643 18.9105 16.565 18.9874 16.487 19.0643C16.3671 19.1825 16.247 19.3004 16.1268 19.4183C16.0512 19.4928 15.9756 19.5672 15.9 19.6416C15.8638 19.6772 15.8275 19.7128 15.7902 19.7494C15.7571 19.7821 15.7239 19.8149 15.6898 19.8487C15.6603 19.8776 15.6309 19.9066 15.6006 19.9365C15.5323 19.995 15.5323 19.995 15.5378 20.0525C16.103 20.0525 16.6681 20.0525 17.2504 20.0525C17.2504 19.4965 17.2504 18.9405 17.2504 18.3676C17.16 18.3676 17.1037 18.4577 17.0432 18.5171Z"
                        fill="#38D140"
                      />
                    </mask>
                  </svg>
                  <span className="font-[family-name:var(--albert-sans-r)] text-[14px] font-medium leading-none text-[#16A34A] min-[400px]:text-[16px]">
                    Trusted By 10,000+ Happy Customers
                  </span>
                </div>
                <h2 className="max-w-[500px] font-[family-name:var(--outfit-r)] text-[30px] min-[400px]:text-[34px] md:text-[38px] lg:text-[42px] font-bold leading-[120%] text-[var(--color10)] capitalize">
                  Simple Plans For Every Household
                </h2>
              </div>
              <div className="mt-[20px] w-full min-[650px]:mt-[65px] min-[650px]:w-[45%]">
                <p className="max-w-[520px] font-[family-name:var(--albert-sans-r)] text-[13px] font-medium leading-[170%] text-[#4B5563] capitalize min-[400px]:text-[14px] md:text-[16px]">
                  Choose the plan that fits your lifestyle and enjoy reliable
                  local services whenever you need them.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-[20px] min-[900px]:grid-cols-3 min-[900px]:gap-[24px] lg:gap-[30px]">
              {/* Add Pricing Cards here just like previously provided */}
              <div className="col-span-1 rounded-[25px] bg-[#C2E6FB] h-[400px] p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
                <h3 className="font-bold text-2xl">Essential</h3>
                <p className="mt-2 text-gray-700">₹299/month</p>
                <ul className="mt-4 space-y-2">
                  <li>Priority Booking</li>
                  <li>Verified Professionals</li>
                </ul>
              </div>
              <div className="col-span-1 rounded-[25px] bg-[#FFD34F] h-[400px] p-6 shadow-md hover:-translate-y-2 transition-transform duration-300 relative">
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-[15px] font-bold">
                  Most Popular
                </div>
                <h3 className="font-bold text-2xl">Plus</h3>
                <p className="mt-2 text-gray-700">₹699/month</p>
                <ul className="mt-4 space-y-2">
                  <li>Everything in Essential</li>
                  <li>Free Booking Cancellations</li>
                </ul>
              </div>
              <div className="col-span-1 rounded-[25px] bg-[#C2E6FB] h-[400px] p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
                <h3 className="font-bold text-2xl">Premium</h3>
                <p className="mt-2 text-gray-700">₹999/month</p>
                <ul className="mt-4 space-y-2">
                  <li>Everything in Plus</li>
                  <li>Dedicated Support Executive</li>
                </ul>
              </div>
            </div>

            <div className="mt-[40px] text-center lg:mt-[56px]">
              <p className="font-[family-name:var(--albert-sans-r)] text-[11px] leading-[150%] text-[#9CA3AF] min-[400px]:text-[12px] md:text-[13px]">
                * All plans include verified professionals, secure payments, and
                transparent pricing with{" "}
                <span className="font-semibold text-[#16A34A]">
                  No Hidden Charges.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
