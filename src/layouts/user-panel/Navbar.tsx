"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Replace with actual filenames from your assets folder if different
import logoImg from "@/assets/images/Frame 14.png";
import signupIllus from "@/assets/images/Create Account Illustration.png";
import loginIllus from "@/assets/images/Main Illustration Container.png";
import googleIcon from "@/assets/images/Vector.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [locationType, setLocationType] = useState("Choose Location");
  const [address, setAddress] = useState("No location selected.");

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setLocationType(val);
    if (val === "current" && navigator.geolocation) {
      setAddress("Getting your location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            );
            const data = await res.json();
            setAddress(data.display_name);
          } catch {
            setAddress("Unable to fetch address.");
          }
        },
        () => setAddress("Location permission denied."),
      );
    }
  };

  // Pure Tailwind equivalent of .cmn-btn
  const btnClass =
    "relative overflow-hidden z-10 transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-[var(--color-15)] before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-white";

  return (
    <>
      <header>
        {/* Header Top */}
        <div className="w-full min-h-[74px] bg-[var(--color-14)] px-[20px] py-[10px]">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-auto shrink-0 text-center md:text-left">
              <p className="font-[family-name:var(--albert-sans-r)] text-[14px] text-[var(--color5)] whitespace-nowrap">
                Trusted Local Services, Right When You Need Them.
              </p>
            </div>

            <div className="w-auto flex items-center justify-end gap-6 mt-4 md:mt-0">
              <div className="location-box w-[250px] shrink-0 relative">
                <select
                  className="w-full h-[50px] rounded-[10px] px-[15px] text-[16px] outline-none cursor-pointer bg-white appearance-none"
                  value={locationType}
                  onChange={handleLocationChange}
                >
                  <option value="Choose Location">Choose Location</option>
                  <option value="search">🔍 Search By Area</option>
                  <option value="current">📍 Use My Current Location</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>

                {locationType === "search" && (
                  <div className="absolute top-[55px] w-full z-50">
                    <input
                      type="text"
                      placeholder="Search your area..."
                      className="w-full h-[45px] border border-[#ccc] rounded-[8px] px-[15px] outline-none bg-white shadow-lg"
                    />
                  </div>
                )}
                {locationType === "current" && (
                  <div className="absolute top-[55px] w-full bg-[#f8f8f8] rounded-[10px] p-[15px] shadow-lg z-50">
                    <h4 className="mb-[10px] font-semibold text-black">
                      Your Current Address
                    </h4>
                    <p className="text-[#444] leading-[24px] text-sm">
                      {address}
                    </p>
                  </div>
                )}
              </div>

              <p className="hidden lg:block text-[16px] text-[var(--color-15)] whitespace-nowrap">
                Help & Support
              </p>

              <Link
                href="#"
                className="hidden lg:block text-[16px] rounded-[20px] border-2 border-[var(--color4)] px-[36px] py-[16px] whitespace-nowrap text-[var(--color5)] hover:bg-[var(--color-15)] hover:border-[var(--color-15)] hover:text-white transition-all duration-500 ease-in-out"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[linear-gradient(90deg,rgb(240,249,254)_1%,rgb(48,137,224)_47%,rgb(240,249,254)_100%)]"></div>

        {/* Main Nav */}
        <nav className="w-full bg-[var(--color2)] px-[20px] py-[11px]">
          <div className="w-full">
            <div className="flex items-center justify-between h-[70px] py-[14px]">
              <Link href="/" className="shrink-0">
                <img
                  src={logoImg.src}
                  alt="logo-image"
                  className="w-[160px] md:w-[200px] h-auto object-contain"
                />
              </Link>

              <div className="hidden lg:flex items-center w-full">
                <ul className="flex mx-auto">
                  <li className="mr-[50px]">
                    <Link
                      href="/"
                      className="relative text-[16px] font-semibold text-[var(--color4)] after:absolute after:left-1/2 after:-bottom-2 after:h-[1.5px] after:w-full after:bg-[var(--color10)] transition-all duration-300 after:-translate-x-1/2"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="relative mr-[50px]">
                    <button
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className="relative outline-none text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300 after:absolute after:left-1/2 after:-bottom-2 after:h-[1.5px] after:w-0 after:bg-[var(--color10)] hover:after:w-full after:-translate-x-1/2 flex items-center gap-1 group"
                    >
                      Service
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isMegaMenuOpen && (
                      <div className="absolute -left-[200px] mt-[30px] w-[600px] bg-white shadow-2xl rounded-xl p-8 z-50">
                        <div className="grid grid-cols-12 gap-8">
                          <div className="col-span-6">
                            <ul className="space-y-2 text-left">
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  Electrician
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  Plumber
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  Personal Grooming
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  House Help
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  Repairing
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="col-span-6">
                            <ul className="space-y-2 text-left">
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  Carpenter
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300"
                                >
                                  Delivery Assistance
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>

                  <li className="mr-[50px]">
                    <Link
                      href="/about"
                      className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300 after:absolute after:left-1/2 after:-bottom-2 after:h-[1.5px] after:w-0 after:bg-[var(--color10)] hover:after:w-full after:-translate-x-1/2"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="relative text-[16px] font-semibold text-[var(--color10)] hover:text-[var(--color4)] transition-all duration-300 after:absolute after:left-1/2 after:-bottom-2 after:h-[1.5px] after:w-0 after:bg-[var(--color10)] hover:after:w-full after:-translate-x-1/2"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>

                <div className="flex items-center">
                  {/* Search */}
                  <div
                    className="relative group mx-4"
                    onMouseEnter={() => setIsSearchOpen(true)}
                    onMouseLeave={() => setIsSearchOpen(false)}
                  >
                    <div className="absolute right-0 top-[48px] w-[440px] h-[25px] z-40"></div>
                    <button className="relative z-40 w-12 h-12 rounded-full border border-[var(--color5)] flex items-center justify-center bg-white text-[var(--color5)] hover:bg-[var(--color-15)] hover:border-[var(--color-15)] hover:text-white transition-all duration-300">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 15L22 22M9.16667 17.3333C4.65634 17.3333 1 13.677 1 9.16667C1 4.65634 4.65634 1 9.16667 1C13.677 1 17.3333 4.65634 17.3333 9.16667C17.3333 13.677 13.677 17.3333 9.16667 17.3333Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className={`absolute right-0 top-[73px] w-[440px] transition-all duration-300 z-[9999] ${isSearchOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-[10px]"}`}
                    >
                      <div className="relative w-full h-[62px] bg-white rounded-[30px] border border-[var(--color-15)] shadow-[0_4px_15px_rgba(0,0,0,0.10)]">
                        <input
                          type="search"
                          placeholder="Search By City, Service Type, OR ZIP Code"
                          className="w-full h-full rounded-[30px] pl-[25px] pr-[55px] outline-none text-[14px] text-gray-600 placeholder:text-gray-400 bg-white"
                        />
                        <button className="absolute right-[17px] top-1/2 -translate-y-1/2 text-[var(--color5)] hover:text-[var(--color-15)] transition">
                          <i className="fa-solid fa-microphone text-[20px]"></i>
                        </button>
                      </div>

                      <div className="mt-[15px] w-full bg-white rounded-[16px] border border-[#e0e4e9] shadow-[0_5px_20px_rgba(0,0,0,0.12)] overflow-hidden">
                        <div className="flex items-center min-h-[70px] px-[20px] bg-[#eef5ff] border-b border-[#dce3eb] cursor-pointer hover:bg-[#e7f1ff]">
                          <div className="w-[40px] text-[var(--color5)]">
                            <i className="fa-solid fa-location-dot text-[22px]"></i>
                          </div>
                          <p className="flex-1 text-[14px] text-gray-600">
                            Search by city
                          </p>
                          <i className="fa-solid fa-chevron-right text-[12px] text-gray-400"></i>
                        </div>
                        <div className="flex items-center min-h-[70px] px-[20px] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f7f9fc]">
                          <div className="w-[40px] text-[var(--color5)]">
                            <i className="fa-solid fa-border-all text-[21px]"></i>
                          </div>
                          <p className="flex-1 text-[14px] text-gray-600">
                            Search by service type
                          </p>
                          <i className="fa-solid fa-chevron-right text-[12px] text-gray-400"></i>
                        </div>
                        <div className="flex items-center min-h-[70px] px-[20px] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f7f9fc]">
                          <div className="w-[40px] text-[var(--color5)]">
                            <i className="fa-solid fa-map-location-dot text-[21px]"></i>
                          </div>
                          <p className="flex-1 text-[14px] text-gray-600">
                            Search by zip code
                          </p>
                          <i className="fa-solid fa-chevron-right text-[12px] text-gray-400"></i>
                        </div>
                        <div className="px-[20px] pt-[20px] pb-[20px]">
                          <div className="flex items-center">
                            <div className="w-[40px] text-[var(--color5)]">
                              <i className="fa-solid fa-clock-rotate-left text-[19px]"></i>
                            </div>
                            <p className="flex-1 text-[14px] text-gray-600">
                              Recent Searches
                            </p>
                            <button className="text-gray-400 hover:text-[var(--color-15)]">
                              <i className="fa-solid fa-xmark text-[17px]"></i>
                            </button>
                          </div>
                          <div className="mt-[15px] flex overflow-hidden">
                            <button className="shrink-0 bg-[#f1f3f6] rounded-[15px] px-[18px] py-[11px] mr-[10px] text-[13px] text-gray-500 hover:bg-[#e6eaf0]">
                              Electrician Near Salt Lake
                            </button>
                            <button className="shrink-0 bg-[#f1f3f6] rounded-[15px] px-[18px] py-[11px] mr-[10px] text-[13px] text-gray-500 hover:bg-[#e6eaf0]">
                              Salon At Home
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="#"
                    className="flex items-center justify-center w-12 h-12 border border-[var(--color5)] rounded-full mx-2 text-[var(--color5)] hover:bg-[var(--color-15)] hover:border-[var(--color-15)] hover:text-white transition-all duration-300"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 22.167C21 19.5897 17.866 17.5003 14 17.5003C10.134 17.5003 7 19.5897 7 22.167M14 14.0003C11.4227 14.0003 9.33333 11.911 9.33333 9.33366C9.33333 6.75633 11.4227 4.66699 14 4.66699C16.5773 4.66699 18.6667 6.75633 18.6667 9.33366C18.6667 11.911 16.5773 14.0003 14 14.0003Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-center w-12 h-12 border border-[var(--color5)] rounded-full mx-2 text-[var(--color5)] hover:bg-[var(--color-15)] hover:border-[var(--color-15)] hover:text-white transition-all duration-300"
                  >
                    <svg
                      className="transition-transform duration-300"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 3.5H3.81307C4.36581 3.5 4.64267 3.5 4.86811 3.59972C5.06688 3.68765 5.23683 3.82921 5.35937 4.00871C5.49814 4.21197 5.54825 4.48338 5.64827 5.02515L8.16671 18.6667L20.3254 18.6667C20.8542 18.6667 21.1194 18.6667 21.3384 18.5732C21.5318 18.4907 21.6987 18.3571 21.8226 18.1871C21.9627 17.9949 22.0221 17.7376 22.1407 17.2236L22.1416 17.22L23.9724 9.28662L23.9728 9.28496C24.1527 8.50518 24.2429 8.11435 24.1439 7.80778C24.057 7.53879 23.8741 7.31073 23.6315 7.16557C23.3549 7 22.9551 7 22.1535 7H6.41667M21 24.5C20.3557 24.5 19.8333 23.9777 19.8333 23.3333C19.8333 22.689 20.3557 22.1667 21 22.1667C21.6443 22.1667 22.1667 22.689 22.1667 23.3333C22.1667 23.9777 21.6443 24.5 21 24.5ZM9.33333 24.5C8.689 24.5 8.16667 23.9777 8.16667 23.3333C8.16667 22.689 8.689 22.1667 9.33333 22.1667C9.97767 22.1667 10.5 22.689 10.5 23.3333C10.5 23.9777 9.97767 24.5 9.33333 24.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className={`${btnClass} ml-4 bg-[var(--color4)] py-[16px] px-[48px] font-[family-name:var(--outfit-r)] text-[18px] font-semibold text-[var(--color2)]`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-[var(--color6)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 w-[300px] h-screen bg-white z-50 transition-all duration-300 shadow-2xl overflow-y-auto ${isMobileMenuOpen ? "right-0" : "right-[-100%]"}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-[var(--color11)]">
          <img src={logoImg.src} alt="logo" className="w-[140px]" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl text-[var(--color6)]"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-start px-8 gap-4 mt-8">
          <div className="flex items-center justify-center w-12 h-12 border border-[var(--color5)] rounded-full mx-2 text-[var(--color10)]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="flex items-center justify-center w-12 h-12 border border-[var(--color5)] rounded-full mx-2 text-[var(--color10)]">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="flex items-center justify-center w-12 h-12 border border-[var(--color5)] rounded-full mx-2 text-[var(--color10)]">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
        <ul className="mt-6">
          <li className="border-b border-[var(--color11)]">
            <Link
              href="/"
              className="block px-8 py-4 text-[20px] text-[var(--color6)] hover:bg-[var(--color-14)]"
            >
              Home
            </Link>
          </li>
          <li className="border-b border-[var(--color11)]">
            <Link
              href="/service"
              className="block px-8 py-4 text-[20px] text-[var(--color6)] hover:bg-[var(--color-14)]"
            >
              Service
            </Link>
          </li>
          <li className="border-b border-[var(--color11)]">
            <Link
              href="/about"
              className="block px-8 py-4 text-[20px] text-[var(--color6)] hover:bg-[var(--color-14)]"
            >
              About
            </Link>
          </li>
          <li className="border-b border-[var(--color11)]">
            <Link
              href="/contact"
              className="block px-8 py-4 text-[20px] text-[var(--color6)] hover:bg-[var(--color-14)]"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="px-8 py-5 border-t border-[var(--color11)]">
          <Link
            href="#"
            className="block text-[18px] text-[var(--color-15)] hover:text-[var(--color4)] transition"
          >
            Help & Support
          </Link>
        </div>
        <div className="px-8 mt-6 space-y-4">
          <button
            onClick={() => setIsSignupOpen(true)}
            className={`${btnClass} block w-full bg-[var(--color4)] py-[16px] text-center text-[18px] font-semibold text-white`}
          >
            Sign Up
          </button>
          <Link
            href="#"
            className="block w-full border-2 border-[var(--color4)] rounded-[20px] py-[16px] text-center text-[18px] font-semibold text-[var(--color5)] hover:bg-[var(--color4)] hover:text-white transition-all duration-300"
          >
            Work With Us
          </Link>
        </div>
      </div>

      {/* SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm py-[20px] lg:py-[36px] flex items-center justify-center">
          <div className="max-w-[1350px] mx-auto px-[15px] flex items-center justify-center min-h-full w-full">
            <section className="flex flex-col lg:flex-row lg:flex-nowrap w-full max-w-[1320px] bg-[var(--color2)] rounded-[20px] overflow-hidden shadow-[0px_4px_52.7px_0px_#FFFFFF]">
              <div className="relative z-0 w-full lg:w-1/2 shrink-0 min-h-[260px] sm:min-h-[380px] lg:min-h-[821px] bg-[linear-gradient(180deg,_#DDF0FC_13%,_#2772CC_86%)] overflow-hidden rounded-none lg:rounded-tr-[70px] lg:rounded-br-[70px] flex items-center justify-center p-6 lg:p-0">
                <span className="absolute top-[20px] left-[20px] sm:top-[30px] sm:left-[30px] lg:top-[36px] lg:left-[42px] w-[90px] h-[24px] sm:w-[110px] sm:h-[28px] lg:w-[128px] lg:h-[32px] rounded-full bg-white/20 pointer-events-none"></span>
                <span className="absolute top-[40px] right-[20px] sm:top-[50px] sm:right-[50px] lg:top-[58px] lg:right-[92px] w-[130px] h-[30px] sm:w-[160px] sm:h-[35px] lg:w-[192px] lg:h-[40px] rounded-full bg-white/20 pointer-events-none"></span>
                <figure className="w-[220px] sm:w-[320px] md:w-[420px] lg:w-[560px] max-w-full">
                  <img
                    src={signupIllus.src}
                    alt="Create Account"
                    className="block w-full h-auto object-contain"
                  />
                </figure>
              </div>

              <div className="w-full lg:w-1/2 shrink-0 min-w-0 bg-[var(--color2)] pt-[30px] pb-[35px] px-[20px] sm:px-[35px] md:px-[50px] lg:px-[94px]">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsSignupOpen(false)}
                    className="text-[16px] font-semibold text-[var(--color4)] hover:text-[var(--color-15)] transition-colors duration-300"
                  >
                    Skip
                  </button>
                </div>
                <div className="mt-[5px]">
                  <h2 className="text-[28px] sm:text-[32px] lg:text-[32px] leading-none font-semibold text-[var(--color10)] font-[family-name:var(--outfit-r)]">
                    Create An Account
                  </h2>
                </div>

                <form className="mt-[30px] lg:mt-[44px]">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="w-full sm:w-[48%] mb-[20px] sm:mb-0">
                      <input
                        type="text"
                        placeholder="First Name*"
                        required
                        className="w-full h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                      />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <input
                        type="text"
                        placeholder="Last Name*"
                        required
                        className="w-full h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between mt-[20px]">
                    <div className="w-full sm:w-[48%] mb-[20px] sm:mb-0">
                      <input
                        type="tel"
                        placeholder="Phone Number*"
                        required
                        className="w-full h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                      />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                      />
                    </div>
                  </div>

                  <div className="mt-[20px]">
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      className="w-full h-[55px] sm:h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[15px] sm:text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="mt-[20px]">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full h-[55px] sm:h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[15px] sm:text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="flex items-start mt-[20px]">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="w-[22px] h-[22px] mt-[2px] rounded-[6px] accent-[#F4F1EC] flex-shrink-0"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-[5.5px] text-[14px] sm:text-[16px] leading-6 text-[var(--color1)]"
                    >
                      I Agree To The{" "}
                      <Link
                        href="#"
                        className="font-semibold text-[var(--color10)] hover:text-[var(--color-15)] transition-colors duration-300"
                      >
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`${btnClass} group w-full h-[60px] sm:h-[68px] lg:h-[76px] mt-[20px] bg-[var(--color4)] flex items-center justify-center text-[15px] sm:text-[16px] font-semibold text-[var(--color2)]`}
                  >
                    Create Account
                    <svg
                      className="ml-[16px] transition-transform duration-500 ease-in-out group-hover:translate-x-1"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center my-[24px]">
                    <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                    <span className="mx-[14px] sm:mx-[20px] text-[14px] sm:text-[16px] font-medium text-[#9CA3AF]">
                      OR
                    </span>
                    <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between mt-[20px]">
                    <button
                      type="button"
                      className="group relative overflow-hidden z-10 w-full sm:w-[48%] mb-[15px] sm:mb-0 h-[66.25px] rounded-[20px] border-2 border-[var(--color4)] flex items-center justify-center transition-all duration-500 hover:bg-[var(--color-15)] hover:border-[var(--color-15)] hover:-translate-y-[3px] after:absolute after:top-0 after:left-[-120%] after:w-[50%] after:h-full after:bg-white/40 after:skew-x-[-25deg] after:transition-all after:duration-700 hover:after:left-[150%]"
                    >
                      <span className="mr-[12px] lg:mr-[24px] text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-[var(--color4)] transition-colors duration-500 group-hover:text-[var(--color2)]">
                        Continue With
                      </span>
                      <svg
                        className="text-[var(--color4)] group-hover:text-[var(--color2)]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9892 0.000179964C12.0366 0.000280848 12.0841 0.000381732 12.1331 0.000485674C12.815 0.00281232 13.4816 0.0175196 14.1518 0.155241C14.1983 0.164292 14.2448 0.173343 14.2927 0.182669C16.9684 0.713372 19.0749 2.07541 20.9605 3.99372C20.8962 4.13864 20.8225 4.23746 20.7108 4.34921C20.6785 4.38176 20.6462 4.41431 20.6129 4.44786C20.5775 4.48308 20.5421 4.5183 20.5056 4.55458C20.4683 4.59205 20.4309 4.62951 20.3925 4.66812C20.2691 4.79194 20.1453 4.91543 20.0216 5.03892C19.9359 5.12469 19.8503 5.21048 19.7648 5.29629C19.5625 5.49905 19.3599 5.7016 19.1573 5.90404C18.9266 6.13457 18.6962 6.36537 18.4658 6.59618C17.9919 7.0709 17.5176 7.54528 17.0432 8.01945C16.8508 7.93136 16.7265 7.79982 16.5826 7.64788C15.6833 6.72534 14.5724 6.0941 13.3124 5.81934C13.2441 5.80441 13.2441 5.80441 13.1743 5.78917C11.5705 5.48262 9.89012 5.83051 8.53293 6.73526C8.3126 6.88666 8.10442 7.04787 7.90282 7.22366C7.83781 7.27797 7.83781 7.27797 7.77148 7.33338C6.63257 8.32307 5.94644 9.7607 5.75764 11.2494C5.71524 12.0705 5.71865 12.8883 5.94418 13.6835C5.95266 13.7148 5.96114 13.746 5.96988 13.7781C6.21091 14.6458 6.67316 15.4336 7.24994 16.1177C7.28204 16.1563 7.31414 16.1948 7.34722 16.2345C8.40228 17.4599 9.96612 18.1562 11.556 18.3052C13.286 18.4279 14.95 17.8084 16.2504 16.6794C16.8223 16.1641 17.2062 15.5641 17.6028 14.9006C15.7561 14.9006 13.9093 14.9006 12.0066 14.9006C12.0066 13.0315 12.0066 11.1623 12.0066 9.23652C15.854 9.23652 19.7013 9.23652 23.6652 9.23652C24.0261 10.8061 24.1292 12.5627 23.8051 14.1517C23.7961 14.1983 23.7871 14.245 23.7778 14.293C23.3992 16.2164 22.5892 17.9528 21.3802 19.4881C21.3423 19.5367 21.3044 19.5852 21.2654 19.6353C20.6744 20.3642 19.9954 21.0451 19.235 21.5946C19.1815 21.6344 19.1281 21.6744 19.0747 21.7143C18.6927 21.9974 18.2958 22.2495 17.8826 22.484C17.8496 22.5028 17.8166 22.5216 17.7826 22.541C16.7317 23.1349 15.6002 23.5306 14.4229 23.783C14.3798 23.7923 14.3366 23.8016 14.2922 23.8112C13.5364 23.9653 12.7934 23.9995 12.0241 23.9965C11.9529 23.9964 11.9529 23.9964 11.8802 23.9962C11.1984 23.9939 10.5315 23.9796 9.86147 23.8415C9.81425 23.8322 9.76702 23.8229 9.71837 23.8133C7.80204 23.4286 6.07959 22.6122 4.54514 21.4073C4.52 21.3877 4.49486 21.3681 4.46895 21.3479C3.71139 20.7502 3.00951 20.039 2.4466 19.254C2.40687 19.2003 2.3671 19.1467 2.32728 19.0931C2.04526 18.7097 1.79414 18.3113 1.56054 17.8965C1.54179 17.8634 1.52303 17.8303 1.50371 17.7962C0.51149 16.0272 0.046034 14.0404 0.053669 12.0188C0.0537695 11.9711 0.05387 11.9233 0.0539735 11.874C0.0562894 11.1887 0.0703715 10.5185 0.208145 9.84506C0.217411 9.79767 0.226676 9.75027 0.236222 9.70143C0.685976 7.44382 1.73919 5.37184 3.33265 3.71286C3.36364 3.68048 3.39463 3.64809 3.42656 3.61473C3.86651 3.15745 4.31019 2.72675 4.82495 2.35535C4.85035 2.33687 4.87575 2.31839 4.90192 2.29935C6.34365 1.25645 7.94637 0.549693 9.68659 0.190349C9.72066 0.18327 9.75473 0.176191 9.78983 0.168897C10.5217 0.0270435 11.2456 -0.00266194 11.9892 0.000179964Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="group relative overflow-hidden z-10 w-full sm:w-[48%] h-[66.25px] rounded-[20px] border-2 border-[var(--color4)] flex items-center justify-center transition-all duration-500 hover:bg-[var(--color-15)] hover:border-[var(--color-15)] hover:-translate-y-[3px] after:absolute after:top-0 after:left-[-120%] after:w-[50%] after:h-full after:bg-white/40 after:skew-x-[-25deg] after:transition-all after:duration-700 hover:after:left-[150%]"
                    >
                      <span className="mr-[12px] lg:mr-[24px] text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-[var(--color4)] transition-colors duration-500 group-hover:text-[var(--color2)]">
                        Continue With
                      </span>
                      <i className="fa-brands fa-apple text-[24px] text-[var(--color4)] group-hover:text-white transition-colors"></i>
                    </button>
                  </div>
                  <p className="mt-[28px] sm:mt-[38px] text-center text-[14px] sm:text-[16px] font-medium text-[var(--color1)]">
                    Already Have An Account?{" "}
                    <button
                      type="button"
                      onClick={openLogin}
                      className="font-semibold text-[var(--color4)] hover:text-[var(--color-15)] transition-colors duration-300"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm py-[20px] lg:py-[36px] flex items-center justify-center">
          <div className="max-w-[1350px] mx-auto px-[15px] flex items-center justify-center min-h-full w-full">
            <section className="flex flex-col lg:flex-row lg:flex-nowrap w-full max-w-[1320px] bg-[var(--color2)] rounded-[20px] overflow-hidden shadow-[0px_4px_52.7px_0px_#FFFFFF]">
              <div className="relative z-0 w-full lg:w-1/2 shrink-0 min-h-[260px] sm:min-h-[380px] lg:min-h-[821px] bg-[linear-gradient(180deg,_#DDF0FC_13%,_#2772CC_86%)] overflow-hidden rounded-none lg:rounded-tr-[70px] lg:rounded-br-[70px] flex items-center justify-center p-6 lg:p-0">
                <span className="absolute top-[36px] left-[42px] w-[128px] h-[32px] rounded-full bg-white/20"></span>
                <span className="absolute top-[58px] right-[92px] w-[192px] h-[40px] rounded-full bg-white/20"></span>
                <figure className="w-[220px] sm:w-[320px] md:w-[420px] lg:w-[560px] max-w-full">
                  <img
                    src={loginIllus.src}
                    alt="Login Illustration"
                    className="block w-full h-auto object-contain"
                  />
                </figure>
              </div>

              <div className="w-full lg:w-1/2 shrink-0 min-w-0 bg-[var(--color2)] pt-[30px] pb-[35px] px-[20px] sm:px-[35px] md:px-[50px] lg:px-[94px]">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsLoginOpen(false)}
                    className="text-[24px] font-semibold text-[var(--color10)] hover:text-gray-600 transition-colors duration-300"
                  >
                    &times;
                  </button>
                </div>
                <div className="mt-[5px]">
                  <h2 className="text-[32px] font-semibold leading-none text-[var(--color10)] font-[family-name:var(--outfit-r)]">
                    Welcome Back
                  </h2>
                  <p className="mt-[12px] text-[16px] text-[var(--color1)]">
                    Login to continue your account.
                  </p>
                </div>

                <form className="mt-[44px]">
                  <div className="mt-[20px]">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      required
                      className="w-full h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                    />
                  </div>
                  <div className="mt-[20px]">
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      required
                      className="w-full h-[59px] p-[20px] bg-transparent border-0 border-b-2 border-[var(--color4)] rounded-b-[20px] outline-none text-[16px] font-medium placeholder:text-[var(--color1)] focus:border-[var(--color5)] transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-[24px]">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] accent-[var(--color4)]"
                      />
                      <span className="ml-[10px] text-[15px] text-[var(--color1)]">
                        Remember Me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-[15px] font-medium text-[var(--color4)] hover:text-[var(--color-15)] transition-all duration-300"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className={`${btnClass} w-full h-[60px] lg:h-[76px] mt-[20px] bg-[var(--color4)] flex items-center justify-center text-[18px] font-semibold text-white`}
                  >
                    Login
                    <svg
                      className="ml-[16px] transition-transform duration-500 group-hover:translate-x-1"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center my-[24px]">
                    <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                    <span className="mx-[20px] text-[16px] font-medium text-[#9CA3AF]">
                      OR
                    </span>
                    <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between mt-[20px]">
                    <button
                      type="button"
                      className="group w-full sm:w-[48%] mb-[15px] sm:mb-0 h-[66px] rounded-[20px] border-2 border-[var(--color4)] flex items-center justify-center hover:bg-[var(--color-15)] hover:border-[var(--color-15)] transition-all duration-500"
                    >
                      <span className="text-[14px] font-semibold text-[var(--color4)] group-hover:text-[var(--color2)] capitalize">
                        continue of Google
                      </span>
                      <img
                        src={googleIcon.src}
                        alt="google"
                        className="object-contain ms-[12px] w-5 h-5"
                      />
                    </button>
                    <button
                      type="button"
                      className="group w-full sm:w-[48%] h-[66px] rounded-[20px] border-2 border-[var(--color4)] flex items-center justify-center hover:bg-[var(--color-15)] hover:border-[var(--color-15)] transition-all duration-500"
                    >
                      <span className="text-[14px] font-semibold text-[var(--color4)] group-hover:text-[var(--color2)]">
                        Continue with
                      </span>
                      <i className="fa-brands fa-apple text-[24px] ms-[12px] text-[var(--color4)] group-hover:text-white transition-colors"></i>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
