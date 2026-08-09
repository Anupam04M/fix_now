import React from "react";
import Link from "next/link";

import heroBg from "@/assets/images/2.hero.png";
import milestoneBg from "@/assets/images/about-us/miletstone.png";
import aboutImg from "@/assets/images/about-us/Frame 7.png";
import successImg from "@/assets/images/about-us/sucess-img.png";
import founderImg from "@/assets/images/about-us/founder-desk.png";
import appImg from "@/assets/images/about-us/Frame 274.png";
import googlePlayImg from "@/assets/images/about-us/google-play 1.png";
import appStoreImg from "@/assets/images/about-us/Frame 289.png";

// Pure Tailwind equivalent of the .cmn-btn stylesheet class
const cmnBtnClass =
  "relative overflow-hidden z-10 rounded-[20px] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-white";

// Pure Tailwind equivalent of .heading-1 / .heading-2
const heading1Class =
  "font-outfit text-[56px] font-bold leading-[1.2] capitalize text-color5";
const heading2Class =
  "font-outfit text-[42px] font-semibold leading-[1.2] capitalize text-color5";

export default function About() {
  return (
    <div>
      {/* ==================== Banner Section ==================== */}
      <section
        className="relative flex flex-col justify-center items-center bg-cover bg-center min-h-[650px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.274) 50%, rgba(255,255,255) 100%), url(${heroBg.src})`,
        }}
      >
        <h1 className={`${heading1Class} text-center`}>Who we Are ?</h1>
        <p className="font-medium text-color-16 text-[32px] font-outfit">
          Making home services faster ,easier and more reliable.
        </p>
      </section>

      {/* ==================== About FixNow ==================== */}
      <section className="py-[100px]">
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-4">
              <figure>
                <img
                  src={aboutImg.src}
                  alt="About FixNow"
                  className="w-full h-auto object-cover"
                />
              </figure>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8">
              <p className="text-color-15 font-medium capitalize mb-[10px] text-[24px] font-outfit">
                About FixNow
              </p>

              <h2 className={heading2Class}>
                Reliable Home Services Since{" "}
                <span className="text-color10"> 2020 </span>
              </h2>

              <p className="text-color1 mb-[40px] font-albert font-medium text-[18px]">
                Established in 2020, FixNow has been simplifying home
                maintenance with fast, reliable, and professional solutions. We
                connect homeowners with verified experts for plumbing,
                electrical repairs, cleaning, appliance servicing, and more.
              </p>

              <div className="flex flex-col lg:flex-row justify-between">
                {/* Left */}
                <div>
                  {/* Item */}
                  <div className="flex items-center mb-5">
                    <svg
                      className="w-5 h-5 mr-3"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 6.83333L7.66667 10.1667L6 8.5M8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16Z"
                        stroke="#2772CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="capitalize font-albert font-medium text-[18px] text-color1">
                      Verified Service Professional
                    </p>
                  </div>

                  {/* Item */}
                  <div className="flex items-center mb-5">
                    <svg
                      className="w-5 h-5 mr-3"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 6.83333L7.66667 10.1667L6 8.5M8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16Z"
                        stroke="#2772CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="capitalize font-albert font-medium text-[18px] text-color1">
                      Verified Service Professional
                    </p>
                  </div>

                  {/* Item */}
                  <div className="flex items-center mb-[50px]">
                    <svg
                      className="w-5 h-5 mr-3"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 6.83333L7.66667 10.1667L6 8.5M8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16Z"
                        stroke="#2772CC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="capitalize font-albert font-medium text-[18px] text-color1">
                      Verified Service Professional
                    </p>
                  </div>

                  {/* Button + Call */}
                  <div className="flex flex-wrap items-center gap-5">
                    {/* Button */}
                    <Link
                      href="#"
                      className={`${cmnBtnClass} ml-4 bg-color4 inline-flex items-center py-[16px] px-[48px] font-outfit text-[18px] font-semibold text-color2 whitespace-nowrap`}
                    >
                      Explore Services

                      <svg
                        className="w-[28px] h-[28px]"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.83331 14H22.1666M15.1666 21L22.1666 14L15.1666 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    {/* Call Icon */}
                    <div className="w-14 h-14 rounded-full bg-color4 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.50246 2.25722C7.19873 1.4979 6.46332 1 5.64551 1H2.89474C1.8483 1 1 1.8481 1 2.89453C1 11.7892 8.21078 19 17.1055 19C18.1519 19 19 18.1516 19 17.1052L19.0005 14.354C19.0005 13.5361 18.5027 12.8009 17.7434 12.4971L15.1069 11.4429C14.4249 11.1701 13.6483 11.2929 13.0839 11.7632L12.4035 12.3307C11.6089 12.9929 10.4396 12.9402 9.7082 12.2088L7.79222 10.2911C7.06079 9.55962 7.00673 8.39134 7.66895 7.59668L8.23633 6.9163C8.70661 6.35195 8.83049 5.57516 8.55766 4.89309L7.50246 2.25722Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Number */}
                    <div>
                      <p className="font-semibold capitalize text-color1">
                        Call Us
                      </p>

                      <p className="font-semibold text-color1">
                        +91 987 654 3210
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Card */}
                <div className="bg-[#F4F1EC] rounded-2xl px-8 py-8 flex items-center shadow-sm">
                  <div className="w-[50px] h-[50px] rounded-full bg-color2 flex items-center justify-center">
                    <svg
                      className="w-[34px] h-[34px]"
                      viewBox="0 0 25 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5 19.75C18.5 17.6789 15.7018 16 12.25 16C8.79822 16 6 17.6789 6 19.75M23.5 16.0005C23.5 14.4627 21.9574 13.1412 19.75 12.5625M1 16.0005C1 14.4627 2.54262 13.1412 4.75 12.5625M19.75 7.54513C20.5172 6.85848 21 5.86062 21 4.75C21 2.67893 19.3211 1 17.25 1C16.2896 1 15.4134 1.36107 14.75 1.95487M4.75 7.54513C3.98281 6.85848 3.5 5.86062 3.5 4.75C3.5 2.67893 5.17893 1 7.25 1C8.21044 1 9.08655 1.36107 9.75 1.95487M12.25 12.25C10.1789 12.25 8.5 10.5711 8.5 8.5C8.5 6.42893 10.1789 4.75 12.25 4.75C14.3211 4.75 16 6.42893 16 8.5C16 10.5711 14.3211 12.25 12.25 12.25Z"
                        stroke="#3089E0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="ml-4">
                    <p className="text-[28px] font-medium text-color5 font-outfit">
                      10,000+
                    </p>

                    <p className="text-color1 capitalize">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Milestone ==================== */}
      <section
        className="w-full min-h-[620px] bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: `url(${milestoneBg.src})` }}
      >
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <h2 className={`${heading2Class} text-center mb-14`}>
            Milestone That Define Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div className="group bg-color2 rounded-[20px] min-h-[300px] shadow-[4px_0_22.9px_rgba(0,0,0,0.19)] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 hover:bg-color4">
              <div className="w-[70px] h-[70px] rounded-full bg-color12 flex items-center justify-center p-[23px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path
                    d="M4 27V19.9161M4 19.9161C12 13.8503 18 25.9817 26 19.9159V4.7513C18 10.8171 12 -1.3148 4 4.75102V19.9161Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-medium text-color6 transition group-hover:text-color2">
                2020
              </h3>

              <p className="mt-2 font-medium text-color1 transition group-hover:text-color2">
                Company Founded
              </p>

              <p className="mt-4 text-xs text-color1 opacity-0 max-h-0 overflow-hidden transition-all duration-700 group-hover:opacity-100 group-hover:max-h-32 group-hover:text-color2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                id. Non, eaque.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-color2 rounded-[20px] min-h-[300px] shadow-[4px_0_22.9px_rgba(0,0,0,0.19)] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 hover:bg-color4">
              <div className="w-[70px] h-[70px] rounded-full bg-color12 flex items-center justify-center p-[23px]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 0.75C24.0342 0.75 30.75 7.46572 30.75 15.75C30.75 24.0342 24.0342 30.75 15.75 30.75C7.46572 30.75 0.75 24.0342 0.75 15.75C0.75 7.46572 7.46572 0.75 15.75 0.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.75 6.75C20.7205 6.75 24.75 10.7794 24.75 15.75C24.75 20.7205 20.7205 24.75 15.75 24.75C10.7794 24.75 6.75 20.7205 6.75 15.75C6.75 10.7794 10.7794 6.75 15.75 6.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.75 12.75C17.4069 12.75 18.75 14.0931 18.75 15.75C18.75 17.4069 17.4069 18.75 15.75 18.75C14.0931 18.75 12.75 17.4069 12.75 15.75C12.75 14.0931 14.0931 12.75 15.75 12.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-medium text-color6 group-hover:text-color2">
                2021
              </h3>

              <p className="mt-2 font-medium text-color1 group-hover:text-color2">
                Platform Expansion
              </p>

              <p className="mt-4 text-xs text-color1 opacity-0 max-h-0 overflow-hidden transition-all duration-700 group-hover:opacity-100 group-hover:max-h-32 group-hover:text-color2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                id. Non, eaque.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-color2 rounded-[20px] min-h-[300px] shadow-[4px_0_22.9px_rgba(0,0,0,0.19)] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 hover:bg-color4">
              <div className="w-[70px] h-[70px] rounded-full bg-color12 flex items-center justify-center p-[23px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.25 25C21.25 22.9289 18.4518 21.25 15 21.25C11.5482 21.25 8.75 22.9289 8.75 25M26.25 21.2505C26.25 19.7127 24.7074 18.3912 22.5 17.8125M3.75 21.2505C3.75 19.7127 5.29262 18.3912 7.5 17.8125M22.5 12.7951C23.2672 12.1085 23.75 11.1106 23.75 10C23.75 7.92893 22.0711 6.25 20 6.25C19.0396 6.25 18.1634 6.61107 17.5 7.20487M7.5 12.7951C6.73281 12.1085 6.25 11.1106 6.25 10C6.25 7.92893 7.92893 6.25 10 6.25C10.9604 6.25 11.8366 6.61107 12.5 7.20487M15 17.5C12.9289 17.5 11.25 15.8211 11.25 13.75C11.25 11.6789 12.9289 10 15 10C17.0711 10 18.75 11.6789 18.75 13.75C18.75 15.8211 17.0711 17.5 15 17.5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-medium text-color6 font-outfit group-hover:text-color2">
                2022
              </h3>

              <p className="mt-2 font-medium text-color1 group-hover:text-color2">
                Growing Community
              </p>

              <p className="mt-4 text-xs text-color1 opacity-0 max-h-0 overflow-hidden transition-all duration-700 group-hover:opacity-100 group-hover:max-h-32 group-hover:text-color2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                id. Non, eaque.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-color2 rounded-[20px] min-h-[300px] shadow-[4px_0_22.9px_rgba(0,0,0,0.19)] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 hover:bg-color4">
              <div className="w-[70px] h-[70px] rounded-full bg-color12 flex items-center justify-center p-[23px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 9.37524V9.00024C7.5 7.60011 7.5 6.89953 7.77248 6.36475C8.01217 5.89434 8.39434 5.51217 8.86475 5.27248C9.39953 5 10.1001 5 11.5002 5H22.2502C23.6504 5 24.3495 5 24.8842 5.27248C25.3547 5.51217 25.7381 5.89434 25.9778 6.36475C26.25 6.899 26.25 7.59874 26.25 8.99614V17.2539C26.25 18.6513 26.25 19.35 25.9778 19.8842C25.7381 20.3546 25.3549 20.7381 24.8845 20.9778C24.3502 21.25 23.6513 21.25 22.2539 21.25H13.125M3.75 21.0002V14.0002C3.75 12.6001 3.75 11.8995 4.02248 11.3647C4.26217 10.8943 4.64434 10.5122 5.11475 10.2725C5.64953 10 6.35011 10 7.75024 10H8.50024C9.90038 10 10.5995 10 11.1342 10.2725C11.6046 10.5122 11.9881 10.8943 12.2278 11.3647C12.5 11.899 12.5 12.5987 12.5 13.9961V21.0039C12.5 22.4012 12.5 23.1 12.2278 23.6342C11.9881 24.1046 11.6046 24.4881 11.1342 24.7278C10.6 25 9.90126 25 8.50386 25H7.74614C6.34874 25 5.649 25 5.11475 24.7278C4.64434 24.4881 4.26217 24.1046 4.02248 23.6342C3.75 23.0995 3.75 22.4004 3.75 21.0002Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-medium text-color6 font-outfit group-hover:text-color2">
                2024
              </h3>

              <p className="mt-2 font-medium text-color1 group-hover:text-color2">
                Digital Innovation
              </p>

              <p className="mt-4 text-xs text-color1 opacity-0 max-h-0 overflow-hidden transition-all duration-700 group-hover:opacity-100 group-hover:max-h-32 group-hover:text-color2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                id. Non, eaque.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group bg-color2 rounded-[20px] min-h-[300px] shadow-[4px_0_22.9px_rgba(0,0,0,0.19)] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 hover:bg-color4">
              <div className="w-[70px] h-[70px] rounded-full bg-color12 flex items-center justify-center p-[23px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.0006 8.75L17.6929 16.1719C17.5616 16.3052 17.4953 16.372 17.4365 16.4245C16.4873 17.2741 15.052 17.2742 14.1028 16.4246C14.044 16.372 13.9772 16.3052 13.8458 16.1719C13.7145 16.0385 13.6488 15.9718 13.5901 15.9192C12.6409 15.0696 11.205 15.0696 10.2558 15.9192C10.1971 15.9717 10.1317 16.0382 10.001 16.1709L5 21.25M17.5 8.75H25.0006L25 16.25"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-2xl font-medium text-color6 font-outfit group-hover:text-color2">
                2025
              </h3>

              <p className="mt-2 font-medium text-color1 group-hover:text-color2">
                Future Growth
              </p>

              <p className="mt-4 text-xs text-color1 opacity-0 max-h-0 overflow-hidden transition-all duration-700 group-hover:opacity-100 group-hover:max-h-32 group-hover:text-color2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                id. Non, eaque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Speak Success ==================== */}
      <section className="py-24">
        <div className="max-w-[1350px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left */}
            <div className="lg:col-span-8">
              <h2 className={heading2Class}>
                Number That Speak For Our Success
              </h2>

              <p className="text-[16px] text-color1 mt-4 font-medium">
                Every booking, every provider, and every customer reflects the
                trust we&apos;ve built since 2020.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {/* Box */}
                <div className="py-3 px-7 text-center border-r-2 border-transparent bg-white [border-image:linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)_1]">
                  <h3 className="text-[24px] font-semibold text-color5">
                    10,000+
                  </h3>
                  <p className="mt-2 text-[16px] text-color1 capitalize">
                    Happy Customers
                  </p>
                </div>

                <div className="py-3 px-7 text-center border-r-2 border-transparent bg-white [border-image:linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)_1]">
                  <h3 className="text-[24px] font-semibold text-color5">
                    500+
                  </h3>
                  <p className="mt-2 text-[16px] text-color1 capitalize">
                    Verified Providers
                  </p>
                </div>

                <div className="py-3 px-7 text-center border-r-2 border-transparent bg-white [border-image:linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)_1]">
                  <h3 className="text-[24px] font-semibold text-color5">
                    50+
                  </h3>
                  <p className="mt-2 text-[16px] text-color1 capitalize">
                    Cities Covered
                  </p>
                </div>

                <div className="py-3 px-7 text-center border-r-2 border-transparent bg-white [border-image:linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)_1]">
                  <h3 className="text-[24px] font-semibold text-color5">
                    25,000+
                  </h3>
                  <p className="mt-2 text-[16px] text-color1 capitalize">
                    Service Completed
                  </p>
                </div>

                <div className="py-3 px-7 text-center border-r-2 border-transparent bg-white [border-image:linear-gradient(to_top,#F0F9FE,#3089E0,#F0F9FE)_1]">
                  <h3 className="text-[24px] font-semibold text-color5">
                    20+
                  </h3>
                  <p className="mt-2 text-[16px] text-color1 capitalize">
                    Services
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-[20px]">
                <img
                  src={successImg.src}
                  alt="success-image"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Founder Desk ==================== */}
      <section className="py-[100px]">
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-[20px]">
                <figure>
                  <img
                    src={founderImg.src}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </figure>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8">
              <h2 className="font-outfit text-[48px] font-semibold leading-[1.2] text-color5 capitalize">
                From the Founder&apos;s Desk
              </h2>

              {/* Quote Icon */}
              <div className="mt-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_616_2097)">
                    <path
                      d="M11.7969 1.25C11.7969 1.30156 11.7969 1.35312 11.7969 1.40625C11.8706 1.40353 11.9444 1.40081 12.0203 1.39801C13.2969 1.37109 14.412 1.69824 15.4151 2.51953C15.6409 2.75057 15.7716 2.90054 15.7932 3.22631C15.7849 3.32118 15.7849 3.32118 15.7764 3.41796C15.7723 3.4804 15.7682 3.54284 15.7639 3.60717C15.6126 4.15774 15.2125 4.59224 14.8389 5.00976C14.7488 5.11206 14.6586 5.2144 14.5685 5.31677C14.5232 5.368 14.4779 5.41924 14.4313 5.47203C14.2227 5.70953 14.0183 5.95059 13.8135 6.1914C13.5327 6.52073 13.2471 6.84435 12.9542 7.16308C12.5772 7.5748 12.2233 8.00137 11.8751 8.4375C11.8423 8.47804 11.8096 8.51859 11.7759 8.56037C10.4806 10.1673 9.40496 11.7801 8.75005 13.75C8.72799 13.8159 8.70592 13.8819 8.68318 13.9498C8.62715 14.1175 8.57132 14.2853 8.51568 14.4531C8.57248 14.4427 8.62928 14.4324 8.6878 14.4217C11.9184 13.8543 15.4975 14.316 18.2694 16.1639C18.4859 16.318 18.6968 16.4771 18.9063 16.6406C18.9788 16.6971 19.0513 16.7536 19.126 16.8118C20.6925 18.0628 21.7717 19.6277 22.5001 21.4844C22.5353 21.5737 22.5705 21.663 22.6069 21.7551C23.7649 24.9523 23.6503 28.7564 22.5782 31.9531C22.5599 32.009 22.5415 32.0649 22.5227 32.1225C21.7104 34.5668 20.144 36.634 17.8675 37.8748C15.2553 39.1353 12.1793 39.1929 9.44372 38.3056C8.31234 37.9094 7.21852 37.3453 6.25005 36.6406C6.16707 36.5809 6.08409 36.5212 5.99859 36.4597C2.72992 34.0361 0.765988 30.3432 0.108296 26.3847C0.0251198 25.797 -0.013071 25.2217 -0.0158156 24.628C-0.0163672 24.5486 -0.0169187 24.4693 -0.0174869 24.3875C-0.0343042 21.25 0.248816 18.2658 1.0938 15.2344C1.12166 15.1332 1.12166 15.1332 1.15007 15.0299C2.4723 10.2879 5.16455 4.37927 9.62926 1.83929C11.2831 0.924559 11.2831 0.924559 11.7969 1.25ZM5.31255 11.3281C4.81707 12.277 4.81707 12.277 4.45318 13.2812C4.60464 13.2679 4.60464 13.2679 4.76568 13.2031C4.87203 13.0541 4.87203 13.0541 4.94726 12.8647C4.97762 12.7958 5.00798 12.727 5.03927 12.6561C5.06983 12.5836 5.1004 12.5112 5.13189 12.4365C5.16336 12.365 5.19483 12.2934 5.22726 12.2197C5.35545 11.9249 5.47685 11.6427 5.54693 11.3281C5.46958 11.3281 5.39224 11.3281 5.31255 11.3281ZM7.18755 29.6875C7.18755 29.8164 7.18755 29.9453 7.18755 30.0781C7.2649 30.0781 7.34224 30.0781 7.42193 30.0781C7.37037 29.9492 7.3188 29.8203 7.26568 29.6875C7.2399 29.6875 7.21412 29.6875 7.18755 29.6875ZM11.3282 29.6875C11.4512 30.4382 11.7483 31.1444 12.3438 31.6406C12.3954 31.6664 12.4469 31.6922 12.5001 31.7187C12.3636 31.3498 12.1846 31.0068 12.002 30.6592C11.9718 30.6002 11.9416 30.5412 11.9105 30.4805C11.7479 30.1709 11.5973 29.9191 11.3282 29.6875ZM5.07818 32.2656C5.07818 32.3172 5.07818 32.3687 5.07818 32.4219C5.12974 32.3961 5.1813 32.3703 5.23443 32.3437C5.18287 32.318 5.1313 32.2922 5.07818 32.2656Z"
                      fill="#244F84"
                    />
                    <path
                      d="M25.0001 2.03125C25.141 2.13653 25.141 2.13653 25.2784 2.2705C25.5558 2.53864 25.8519 2.71283 26.1963 2.88085C26.249 2.90658 26.3018 2.9323 26.3561 2.95881C26.6595 3.10453 26.9655 3.24427 27.2724 3.38256C27.3719 3.42805 27.3719 3.42805 27.4734 3.47446C27.602 3.53304 27.7311 3.59055 27.8607 3.64681C28.3024 3.84782 28.6273 4.06463 28.8135 4.53552C28.8855 5.23467 28.5195 5.78309 28.1592 6.35253C28.1156 6.42236 28.0721 6.49218 28.0271 6.56412C27.6796 7.11629 27.3168 7.65783 26.9522 8.19876C26.3872 9.03723 25.8478 9.87826 25.3907 10.7812C25.3475 10.866 25.3475 10.866 25.3035 10.9526C24.9475 11.6604 24.6562 12.357 24.4532 13.125C24.5914 13.1063 24.5914 13.1063 24.7324 13.0872C28.5121 12.671 32.1008 13.8405 35.0782 16.1572C37.2651 17.9465 38.8951 20.1754 39.6729 22.9102C39.6881 22.9636 39.7034 23.017 39.7191 23.072C39.9669 23.998 40.0293 24.9205 40.0245 25.874C40.0243 25.9306 40.0242 25.9873 40.0241 26.0456C40.0209 26.9151 39.9696 27.7463 39.7657 28.5937C39.743 28.6928 39.7204 28.7919 39.697 28.894C38.938 31.9682 37.1304 34.6022 34.4156 36.2628C31.19 38.1793 27.4975 38.6325 23.8282 38.0469C23.7659 38.0373 23.7037 38.0277 23.6396 38.0178C22.6394 37.8597 22.6394 37.8597 22.2657 37.5C22.0231 37.1555 21.8805 36.8332 21.8604 36.4111C21.9328 36.0792 22.0985 35.8025 22.2663 35.5099C23.3951 33.5348 24.6402 30.9909 24.7068 28.6758C24.7106 28.5667 24.7106 28.5667 24.7146 28.4554C24.7193 28.305 24.7238 28.1547 24.728 28.0043C24.7409 27.6485 24.7657 27.3135 24.845 26.9659C24.9527 26.4707 24.9487 25.9787 24.9463 25.4736C24.9459 25.3733 24.9455 25.273 24.945 25.1697C24.9348 24.3632 24.8688 23.5981 24.6876 22.8125C24.672 22.7448 24.6565 22.6771 24.6405 22.6074C23.8044 19.0757 21.7443 16.3126 18.7501 14.2969C18.5398 14.1681 18.3278 14.0444 18.1138 13.9221C17.86 13.7575 17.7112 13.5474 17.5782 13.2812C17.5849 13.1287 17.5849 13.1287 17.6075 12.9492C17.6152 12.8862 17.623 12.8231 17.631 12.7582C17.6509 12.6163 17.6749 12.475 17.7002 12.334C17.7418 12.1071 17.7418 12.1071 17.7262 11.8658C17.7359 11.5098 17.807 11.2015 17.9004 10.8594C17.9181 10.7941 17.9359 10.7288 17.9541 10.6615C18.3758 9.15232 19.0856 7.73068 20.0364 6.48548C20.1777 6.30007 20.3168 6.11312 20.456 5.9262C21.0038 5.19473 21.5583 4.49136 22.1876 3.82812C22.2825 3.71955 22.3769 3.61053 22.4708 3.50097C24.0077 1.7414 24.0077 1.7414 25.0001 2.03125ZM33.0469 20.3125C33.0211 20.4414 32.9954 20.5703 32.9688 20.7031C33.0204 20.6516 33.0719 20.6 33.125 20.5469C33.0993 20.4695 33.0735 20.3922 33.0469 20.3125ZM37.1094 28.5937C37.1875 28.75 37.1875 28.75 37.1875 28.75L37.1094 28.5937ZM37.0313 28.75C37.1094 28.9844 37.1094 28.9844 37.1094 28.9844L37.0313 28.75ZM29.0626 35.625C29.1915 35.625 29.3204 35.625 29.4532 35.625C29.4532 35.5477 29.4532 35.4703 29.4532 35.3906C29.2994 35.3906 29.1793 35.5346 29.0626 35.625Z"
                      fill="#244F84"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_616_2097">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <p className="pt-10 text-[16px] leading-7 text-color1">
                At FixNow, we believe that finding trusted local services should
                be simple, transparent, and stress-free. Since our journey began
                in 2020, we have been dedicated to connecting customers with
                reliable service providers while empowering local businesses to
                grow and succeed.
              </p>

              <p className="mt-[10px] text-[16px] leading-7 text-color1">
                Every service booked through our platform reflects our
                commitment to trust, convenience, and quality. As we continue to
                expand, our goal remains the same—to build a platform that
                communities can rely on for all their everyday service needs.
              </p>

              <h3 className="pt-5 font-outfit text-2xl font-medium capitalize text-color-15">
                Thank You For Being Part Of Our Journey
              </h3>

              <h4 className="mt-4 font-outfit text-2xl font-medium capitalize text-color5">
                Rohini Mukherjee
              </h4>

              <p className="mt-2 text-[16px] font-medium capitalize text-color1">
                Founder and CEO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== What We Stand For ==================== */}
      <section className="py-[100px]">
        <div className="max-w-[1350px] mx-auto px-4">
          <h2 className="text-center font-outfit text-5xl font-semibold capitalize text-color5">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {/* Card 1 */}
            <div className="flex flex-col items-center justify-center w-full rounded-[20px] p-8 shadow-lg">
              <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-color12">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9258 20.6314C15.0319 19.6781 20 16.7333 20 10.165V6.19691C20 5.07899 20 4.5192 19.7822 4.0918C19.5905 3.71547 19.2837 3.40973 18.9074 3.21799C18.4796 3 17.9203 3 16.8002 3H7.2002C6.08009 3 5.51962 3 5.0918 3.21799C4.71547 3.40973 4.40973 3.71547 4.21799 4.0918C4 4.51962 4 5.08009 4 6.2002V10.165C4 16.7333 8.9678 19.6781 11.074 20.6314C11.2972 20.7325 11.4094 20.7829 11.6621 20.8263C11.8215 20.8537 12.1795 20.8537 12.3389 20.8263C12.5907 20.7831 12.7017 20.7328 12.9235 20.6324L12.9258 20.6314Z"
                    stroke="#F0F9FE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="pt-3 font-outfit text-2xl font-medium capitalize text-color5">
                Trust
              </p>

              <p className="mt-3 text-center font-medium text-color1">
                Building confidence through transparency and reliability.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-center w-full rounded-[20px] p-8 shadow-lg">
              <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-color12">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="pt-3 font-outfit text-2xl font-medium capitalize text-color5">
                Customer First
              </p>

              <p className="mt-3 text-center font-medium text-color1">
                Putting customer needs at the center of every decision.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-center w-full rounded-[20px] p-8 shadow-lg">
              <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-color12">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5.22895C11.2196 5.66333 8.95062 6.39904 6.71849 6.32568C6.13201 6.30641 5.7 5.74571 5.7 5.09251C5.7 4.56743 5.97926 4.09063 6.40271 3.8594C7.30574 3.3663 8.7303 2.54218 9.99381 1.7814C10.7607 1.31965 11.1446 1.08855 11.4353 0.97924C12.2145 0.686308 12.8416 0.675086 13.6287 0.940003C13.9226 1.03887 14.2755 1.23529 14.9812 1.62815L15.795 2.08116C15.8596 2.11709 15.8919 2.13506 15.9249 2.14994C16.0099 2.18826 16.0998 2.21186 16.1912 2.21994C16.2268 2.22308 16.2628 2.22308 16.335 2.22308C16.907 2.22308 17.1929 2.22308 17.4272 2.29479C18.0392 2.48212 18.5174 3.01441 18.6856 3.69572C18.75 3.95652 18.75 4.27488 18.75 4.91161V10.4534C18.75 11.1649 18.232 11.7416 17.5929 11.7416C17.4677 11.7416 17.3458 11.7868 17.2457 11.8705L16.95 12.1174C16.3259 12.6385 16.0139 12.899 15.6562 13.0498C15.5884 13.0783 15.5197 13.1039 15.4501 13.1262C15.0826 13.2446 14.6925 13.2446 13.9125 13.2446H11.55M12 5.22749L14.7642 8.71271C15.2321 9.28573 15.2133 10.1669 14.7214 10.7144C14.2126 11.2809 13.3874 11.2809 12.8786 10.7144C13.3756 11.2678 13.3971 12.1888 12.9 12.7422C12.4029 13.2956 11.5971 13.2956 11.1 12.7422L10.65 12.2412C11.1471 12.7946 11.1471 13.6917 10.65 14.2451C10.1529 14.7985 9.34707 14.7985 8.85 14.2451C9.34707 14.7985 9.34707 15.6956 8.85 16.249L8.79537 16.3097C8.5422 16.5916 8.19885 16.75 7.84081 16.75H7.725C7.2928 16.75 6.87831 16.5588 6.5727 16.2186L2.92279 12.1552C2.6841 11.8895 2.36036 11.7402 2.02279 11.7402C1.31985 11.7402 0.75 11.1058 0.75 10.3233V6.22945C0.75 4.34014 0.75 3.39549 1.27721 2.80855C1.80441 2.22162 2.65294 2.22162 4.35 2.22162H8.85"
                    stroke="#F0F9FE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="pt-3 font-outfit text-2xl font-medium capitalize text-color5">
                Integrity
              </p>

              <p className="mt-3 text-center font-medium text-color1">
                Creating honest and meaningful connections so that you can rely
                on us.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center justify-center w-full rounded-[20px] p-8 shadow-lg">
              <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-color12">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5474 7.25346L18.9539 6.79492L18.9539 6.79494L19.5474 7.25346ZM14.5492 9.07326L14.9568 8.44363L14.9567 8.44361L14.5492 9.07326ZM12.0501 4.82769L11.7226 5.5024L11.7226 5.50241L12.0501 4.82769ZM9.16039 21.036L9.86852 20.7889L9.86852 20.7889L9.16039 21.036ZM21.8417 15.1756L22.2795 15.7847L22.2795 15.7846L21.8417 15.1756ZM16.4524 17.1111L15.7875 16.7641L15.7874 16.7642L16.4524 17.1111ZM25.75 13.25H26.5C26.5 5.93222 20.5677 0 13.25 0V0.75V1.5C19.7393 1.5 25 6.76065 25 13.25H25.75ZM13.25 0.75V0C5.93222 0 0 5.93222 0 13.25H0.75H1.5C1.5 6.76065 6.76065 1.5 13.25 1.5V0.75ZM0.75 13.25H0C0 20.5677 5.93222 26.5 13.25 26.5V25.75V25C6.76065 25 1.5 19.7393 1.5 13.25H0.75ZM13.25 25.75V26.5C20.5677 26.5 26.5 20.5677 26.5 13.25H25.75H25C25 19.7393 19.7393 25 13.25 25V25.75ZM23.25 5.37374L23.1961 4.62568C21.8983 4.71922 20.1657 5.2264 18.9539 6.79492L19.5474 7.25346L20.1409 7.71201C21.0045 6.5942 22.265 6.19668 23.3039 6.1218L23.25 5.37374ZM19.5474 7.25346L18.9539 6.79494C18.0798 7.9264 17.2645 8.46206 16.6023 8.65689C15.9572 8.84672 15.4018 8.73168 14.9568 8.44363L14.5492 9.07326L14.1417 9.7029C14.9462 10.2235 15.9528 10.4116 17.0257 10.0959C18.0817 9.78516 19.1407 9.00658 20.1409 7.71198L19.5474 7.25346ZM14.5492 9.07326L14.9567 8.44361C14.3364 8.04219 14.2838 7.59344 14.1636 6.78563C14.106 6.39835 14.0249 5.89541 13.7649 5.4143C13.4909 4.90737 13.0523 4.48044 12.3776 4.15297L12.0501 4.82769L11.7226 5.50241C12.1479 5.70881 12.3374 5.9279 12.4453 6.12758C12.5672 6.35309 12.622 6.61736 12.6799 7.00638C12.7907 7.75117 12.8877 8.89132 14.1418 9.70291L14.5492 9.07326ZM12.0501 4.82769L12.3776 4.15297C11.9141 3.92798 11.63 3.50908 11.5344 2.95775C11.4365 2.39327 11.5471 1.71668 11.8755 1.10445L11.2145 0.75L10.5535 0.395554C10.0839 1.27138 9.89546 2.28568 10.0565 3.21405C10.2197 4.15557 10.7524 5.03148 11.7226 5.5024L12.0501 4.82769ZM0.75 12L0.258265 12.5663C1.28988 13.4621 2.79312 14.3352 4.61092 14.3352V13.5852V12.8352C3.28303 12.8352 2.11637 12.1932 1.24173 11.4337L0.75 12ZM4.61092 13.5852V14.3352C5.40714 14.3352 6.00297 14.3739 6.45307 14.4582C6.90206 14.5424 7.15277 14.6625 7.30413 14.7864C7.57754 15.0103 7.76046 15.4448 7.76046 16.6897H8.51046H9.26046C9.26046 15.4511 9.11842 14.3333 8.25446 13.6259C7.83714 13.2841 7.31607 13.0938 6.72925 12.9839C6.14353 12.8742 5.43952 12.8352 4.61092 12.8352V13.5852ZM8.51046 16.6897H7.76046C7.76046 17.906 7.75843 18.5947 7.84995 19.2067C7.94377 19.834 8.13431 20.3719 8.45226 21.2831L9.16039 21.036L9.86852 20.7889C9.53654 19.8375 9.40212 19.444 9.33346 18.9848C9.26249 18.5103 9.26046 17.9571 9.26046 16.6897H8.51046ZM9.16039 21.036L8.45225 21.2831C8.85145 22.4272 8.89364 23.3015 8.30535 24.0281L8.88825 24.5L9.47115 24.9719C10.5682 23.617 10.3148 22.0681 9.86852 20.7889L9.16039 21.036ZM25.75 15.0654L26.1245 14.4155C24.8467 13.6792 23.1231 13.3311 21.404 14.5666L21.8417 15.1756L22.2795 15.7846C23.3769 14.9959 24.4356 15.1735 25.3755 15.7152L25.75 15.0654ZM21.8417 15.1756L21.404 14.5666C20.2337 15.4078 19.272 15.48 18.4162 15.519C18.0081 15.5377 17.4934 15.5472 17.043 15.6892C16.523 15.8532 16.0902 16.184 15.7875 16.7641L16.4524 17.1111L17.1173 17.4581C17.233 17.2365 17.3462 17.1664 17.4942 17.1198C17.7117 17.0512 17.9868 17.0402 18.4846 17.0175C19.4407 16.9738 20.7552 16.8801 22.2795 15.7847L21.8417 15.1756ZM16.4524 17.1111L15.7874 16.7642C15.3603 17.5828 15.4293 18.2985 15.6629 18.9363C15.7701 19.229 15.9144 19.5127 16.04 19.7609C16.1718 20.0214 16.2919 20.2593 16.3926 20.5148C16.585 21.0029 16.7029 21.5484 16.5797 22.2705C16.4533 23.0115 16.0632 23.9928 15.1353 25.3203L15.75 25.75L16.3647 26.1797C17.3717 24.7391 17.8828 23.5516 18.0583 22.5228C18.2371 21.4749 18.0579 20.6493 17.7882 19.9648C17.6578 19.634 17.5057 19.3352 17.3783 19.0836C17.2448 18.8197 17.1429 18.6157 17.0714 18.4205C16.9475 18.0822 16.9285 17.8199 17.1173 17.4581L16.4524 17.1111Z"
                    fill="#F0F9FE"
                  />
                </svg>
              </div>

              <p className="pt-3 font-outfit text-2xl font-medium capitalize text-color5">
                Community
              </p>

              <p className="mt-3 text-center font-medium text-color1">
                Delivering quality experiences with passion and commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Download Our Mobile App ==================== */}
      <section className="py-[100px]">
        <div className="max-w-[1350px] mx-auto px-[15px]">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Image */}
            <div className="lg:col-span-4">
              <img
                src={appImg.src}
                alt="Download Mobile App"
                className="w-full"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
              <h2 className="font-outfit text-[48px] font-semibold capitalize text-color5 leading-tight">
                Download Our Mobile App
              </h2>

              <p className="mt-5 text-base leading-7 text-color1 capitalize">
                Experience a smarter and faster way to manage your services.
                Book, track, and stay connected anytime, anywhere with our
                easy-to-use mobile application.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-y-5 gap-x-10 mt-10">
                <div className="flex items-center gap-3">
                  <svg width="23" height="13" fill="none">
                    <path
                      d="M5.95 6.657L10.9 11.607 21.507 1M1 6.707l4.95 4.95M16.556 1.05l-5.303 5.304"
                      stroke="#2772CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-color6">Easy Service Booking</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="23" height="13" fill="none">
                    <path
                      d="M5.95 6.657L10.9 11.607 21.507 1M1 6.707l4.95 4.95M16.556 1.05l-5.303 5.304"
                      stroke="#2772CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-color6">Track Requests Anytime</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="23" height="13" fill="none">
                    <path
                      d="M5.95 6.657L10.9 11.607 21.507 1M1 6.707l4.95 4.95M16.556 1.05l-5.303 5.304"
                      stroke="#2772CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-color6">Real-Time Notifications</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="23" height="13" fill="none">
                    <path
                      d="M5.95 6.657L10.9 11.607 21.507 1M1 6.707l4.95 4.95M16.556 1.05l-5.303 5.304"
                      stroke="#2772CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-color6">User-Friendly Interface</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="23" height="13" fill="none">
                    <path
                      d="M5.95 6.657L10.9 11.607 21.507 1M1 6.707l4.95 4.95M16.556 1.05l-5.303 5.304"
                      stroke="#2772CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-color6">Secure and Fast Access</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg width="23" height="13" fill="none">
                    <path
                      d="M5.95 6.657L10.9 11.607 21.507 1M1 6.707l4.95 4.95M16.556 1.05l-5.303 5.304"
                      stroke="#2772CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-color6">24/7 Customer Support</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-6 mt-16">
                {/* Google Play */}
                <Link
                  href="#"
                  className="relative overflow-hidden inline-flex items-center rounded-2xl bg-color4 px-8 py-4 text-white before:absolute before:inset-0 before:bg-color-16 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 font-outfit"
                >
                  <div className="relative z-10 flex items-center">
                    <img
                      src={googlePlayImg.src}
                      className="w-10 mr-3"
                      alt="Google Play"
                    />

                    <div>
                      <p className="text-white mb-0">Get it on</p>
                      <h3 className="text-white text-lg font-semibold mb-0">
                        Google Play
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* App Store */}
                <Link
                  href="#"
                  className="relative overflow-hidden inline-flex items-center rounded-2xl bg-color4 px-8 py-4 text-white before:absolute before:inset-0 before:bg-color-16 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 font-outfit"
                >
                  <div className="relative z-10 flex items-center">
                    <img
                      src={appStoreImg.src}
                      className="w-10 mr-3"
                      alt="App Store"
                    />

                    <div>
                      <p className="text-white mb-0">Download on the</p>
                      <h3 className="text-white text-lg font-semibold mb-0">
                        App Store
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}