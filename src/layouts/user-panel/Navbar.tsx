"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Replace with actual filenames from your assets folder if different
import logoImg from "@/assets/images/Frame 14.png";
import SignupForm from "@/components/SignupForm";
import LoginForm from "@/components/LoginForm";
import { useAuthStore } from "@/store/useAuthStore";

// Import your extracted modal components

type NavItem = {
  name: string;
  path?: string;
  dropdown?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/service",
   
  },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // Added for dynamic active states

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const [locationType, setLocationType] = useState("Choose Location");
  const [address, setAddress] = useState("No location selected.");

  // Modal State
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // User profile dropdown state
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { isAuthenticate, logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
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
    "relative overflow-hidden rounded-[20px] z-10 transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-white";
  return (
    <>
      <header>
        {/* Header Top */}
        <div className="w-full min-h-[74px] bg-color-14 px-[20px] py-[10px]">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-auto shrink-0 text-center md:text-left">
              <p className="font-[family-name:var(--albert-sans-r)] text-[14px] text-color5 whitespace-nowrap">
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

              <p className="hidden lg:block text-[16px] text-color-15 whitespace-nowrap">
                Help & Support
              </p>

              <Link
                href="/work-with-us"
                className="hidden lg:block text-[16px] rounded-[20px] border-2 border-color4 px-[36px] py-[16px]
                 whitespace-nowrap text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all duration-500 ease-in-out"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[linear-gradient(90deg,rgb(240,249,254)_1%,rgb(48,137,224)_47%,rgb(240,249,254)_100%)]"></div>

        {/* Main Nav */}
        <nav className="w-full bg-color2 px-[20px] py-[11px]">
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
                {/* DYNAMIC NAVIGATION LIST */}
                <ul className="flex mx-auto">
                  {navItems.map((nav, idx) => {
                    // 1. Calculate active states dynamically
                    const isActive = pathname === nav.path;
                    const isDropdownActive = nav.dropdown?.some(
                      (item) => pathname === item.path,
                    );

                    return (
                      <li
                        key={idx}
                        className="relative mr-[50px] last:mr-0 group py-4" // Added py-4 to create a safe hover bridge
                        onMouseEnter={() =>
                          nav.dropdown && setIsMegaMenuOpen(true)
                        }
                        onMouseLeave={() =>
                          nav.dropdown && setIsMegaMenuOpen(false)
                        }
                      >
                        {nav.dropdown ? (
                          <>
                            {/* Mega Menu Trigger Link (Now Clickable) */}
                            <Link
                              href={nav.path || "/service"}
                              className={`relative outline-none text-[18px] font-semibold transition-all duration-300 after:absolute after:left-1/2 after:-bottom-2 after:h-[1.5px] after:bg-color10 after:-translate-x-1/2 flex items-center gap-1 ${
                                isDropdownActive || isMegaMenuOpen
                                  ? "text-color4 after:w-full" // Active state
                                  : "text-color10 hover:text-color4 after:w-0 hover:after:w-full" // Default state
                              }`}
                            >
                              {nav.name}
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
                            </Link>

                            {/* Mega Menu Dropdown (Uses CSS visibility for smooth hover) */}
                            <div
                              className={`absolute -left-[200px] top-[100%] mt-[10px] w-[600px] bg-white shadow-2xl rounded-xl p-8 z-50 transition-all duration-300 ${
                                isMegaMenuOpen
                                  ? "opacity-100 visible translate-y-0"
                                  : "opacity-0 invisible translate-y-2 pointer-events-none"
                              }`}
                            >
                              <div className="grid grid-cols-12 gap-8">
                                {/* Column 1: First 5 items */}
                                <div className="col-span-6">
                                  <ul className="space-y-2 text-left">
                                    {nav.dropdown
                                      .slice(0, 5)
                                      .map((item, dropIdx) => {
                                        const isItemActive =
                                          pathname === item.path;
                                        return (
                                          <li key={dropIdx}>
                                            <Link
                                              href={item.path}
                                              onClick={() =>
                                                setIsMegaMenuOpen(false)
                                              }
                                              className={`relative text-[18px] font-semibold transition-all duration-300 ${
                                                isItemActive
                                                  ? "text-color4"
                                                  : "text-color10 hover:text-color4"
                                              }`}
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </div>

                                {/* Column 2: Remaining items */}
                                <div className="col-span-6">
                                  <ul className="space-y-2 text-left">
                                    {nav.dropdown
                                      .slice(5)
                                      .map((item, dropIdx) => {
                                        const isItemActive =
                                          pathname === item.path;
                                        return (
                                          <li key={dropIdx}>
                                            <Link
                                              href={item.path}
                                              onClick={() =>
                                                setIsMegaMenuOpen(false)
                                              }
                                              className={`relative text-[18px] font-semibold transition-all duration-300 ${
                                                isItemActive
                                                  ? "text-color4"
                                                  : "text-color10 hover:text-color4"
                                              }`}
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Standard Navigation Links */
                          <Link
                            href={nav.path || "#"}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className={`relative text-[18px] font-semibold transition-all duration-300 after:absolute after:left-1/2 after:-bottom-2 after:h-[1.5px] after:bg-color10 after:-translate-x-1/2 flex items-center ${
                              isActive
                                ? "text-color4 after:w-full" // Active state
                                : "text-color10 hover:text-color4 after:w-0 hover:after:w-full" // Default state
                            }`}
                          >
                            {nav.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="flex items-center">
                  {/* Search */}
                  <div
                    className="relative group mx-4"
                    onMouseEnter={() => setIsSearchOpen(true)}
                    onMouseLeave={() => setIsSearchOpen(false)}
                  >
                    {/* FIX: Added dynamic visibility to the invisible bridge so it doesn't block "Contact Us" */}
                    <div
                      className={`absolute right-0 top-[48px] w-[440px] h-[25px] z-40 ${isSearchOpen ? "block" : "hidden"}`}
                    ></div>

                    <button className="relative z-40 w-12 h-12 rounded-full border border-color5 flex items-center justify-center bg-white text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all duration-300">
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
                      <div className="relative w-full h-[62px] bg-white rounded-[30px] border border-color-15 shadow-[0_4px_15px_rgba(0,0,0,0.10)]">
                        <input
                          type="search"
                          placeholder="Search By City, Service Type, OR ZIP Code"
                          className="w-full h-full rounded-[30px] pl-[25px] pr-[55px] outline-none text-[14px] text-gray-600 placeholder:text-gray-400 bg-white"
                        />
                        <button className="absolute right-[17px] top-1/2 -translate-y-1/2 text-color5 hover:text-color-15 transition">
                          <i className="fa-solid fa-microphone text-[20px]"></i>
                        </button>
                      </div>

                      <div className="mt-[15px] w-full bg-white rounded-[16px] border border-[#e0e4e9] shadow-[0_5px_20px_rgba(0,0,0,0.12)] overflow-hidden">
                        <div className="flex items-center min-h-[70px] px-[20px] bg-[#eef5ff] border-b border-[#dce3eb] cursor-pointer hover:bg-[#e7f1ff]">
                          <div className="w-[40px] text-color5">
                            <i className="fa-solid fa-location-dot text-[22px]"></i>
                          </div>
                          <p className="flex-1 text-[14px] text-gray-600">
                            Search by city
                          </p>
                          <i className="fa-solid fa-chevron-right text-[12px] text-gray-400"></i>
                        </div>
                        <div className="flex items-center min-h-[70px] px-[20px] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f7f9fc]">
                          <div className="w-[40px] text-color5">
                            <i className="fa-solid fa-border-all text-[21px]"></i>
                          </div>
                          <p className="flex-1 text-[14px] text-gray-600">
                            Search by service type
                          </p>
                          <i className="fa-solid fa-chevron-right text-[12px] text-gray-400"></i>
                        </div>
                        <div className="flex items-center min-h-[70px] px-[20px] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f7f9fc]">
                          <div className="w-[40px] text-color5">
                            <i className="fa-solid fa-map-location-dot text-[21px]"></i>
                          </div>
                          <p className="flex-1 text-[14px] text-gray-600">
                            Search by zip code
                          </p>
                          <i className="fa-solid fa-chevron-right text-[12px] text-gray-400"></i>
                        </div>
                        <div className="px-[20px] pt-[20px] pb-[20px]">
                          <div className="flex items-center">
                            <div className="w-[40px] text-color5">
                              <i className="fa-solid fa-clock-rotate-left text-[19px]"></i>
                            </div>
                            <p className="flex-1 text-[14px] text-gray-600">
                              Recent Searches
                            </p>
                            <button className="text-gray-400 hover:text-color-15">
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

                  <div className="relative mx-2" ref={userMenuRef}>
                    <button
                      onClick={() => {
                        if (isAuthenticate) {
                          setIsUserMenuOpen(!isUserMenuOpen);
                        } else {
                          setIsLoginOpen(true);
                        }
                      }}
                      className="flex items-center justify-center w-12 h-12 border border-color5 rounded-full text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all duration-300"
                      aria-label="Profile menu"
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
                    </button>

                    {isAuthenticate && isUserMenuOpen && (
                      <div className="absolute right-0 top-[60px] z-50 w-72 bg-white rounded-3xl p-6 shadow-sm border border-gray-100/80">
                        <nav className="flex flex-col space-y-6">
                          <Link
                            href="/profile-details"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="text-[#1E427B] font-semibold text-lg hover:opacity-80 transition-opacity"
                          >
                            Personal Details
                          </Link>
                          <Link
                            href="/booking-history"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="text-[#1E427B] font-semibold text-lg hover:opacity-80 transition-opacity"
                          >
                            Booking History
                          </Link>
                          <button
                            onClick={async () => {
                              await logout();
                              setIsUserMenuOpen(false);
                            }}
                            className="text-left text-[#1E427B] font-semibold text-lg hover:opacity-80 transition-opacity cursor-pointer"
                          >
                            Logout
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/cart"
                    className="flex items-center justify-center w-12 h-12 border border-color5 rounded-full mx-2 text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all duration-300"
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

                  {isAuthenticate ? (
                    <button
                      onClick={async () => {
                        await logout();
                      }}
                      className={`${btnClass} ml-4 bg-red-500 before:bg-red-700 py-[16px] px-[48px] font-outfit text-[18px] font-semibold text-white`}
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsSignupOpen(true)}
                      className={`${btnClass} ml-4 bg-color4 py-[16px] px-[48px] font-outfit text-[18px] font-semibold text-color2`}
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-color6"
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
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 w-[300px] h-screen bg-white z-50 transition-all duration-300 shadow-2xl overflow-y-auto ${isMobileMenuOpen ? "right-0" : "right-[-100%]"}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-color11">
          <img src={logoImg.src} alt="logo" className="w-[140px]" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl text-color6"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-start px-8 gap-4 mt-8">
          <div className="flex items-center justify-center w-12 h-12 border border-color5 rounded-full mx-2 text-color10">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="flex items-center justify-center w-12 h-12 border border-color5 rounded-full mx-2 text-color10">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="flex items-center justify-center w-12 h-12 border border-color5 rounded-full mx-2 text-color10">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>

        {/* DYNAMIC MOBILE NAV LIST */}
        <ul className="mt-6">
          {navItems.map((nav, idx) => {
            const isActive = pathname === nav.path;

            return (
              <li key={idx} className="border-b border-color11 flex flex-col">
                {nav.dropdown ? (
                  <>
                    {/* Mobile Dropdown Trigger */}
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === nav.name ? null : nav.name)
                      }
                      className="flex items-center justify-between px-8 py-4 text-[20px] text-color6 hover:bg-color-14 w-full outline-none"
                    >
                      {nav.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openMenu === nav.name ? "rotate-180" : ""
                        }`}
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

                    {/* Mobile Dropdown Items */}
                    {openMenu === nav.name && (
                      <ul className="bg-[#f8f8f8] flex flex-col border-t border-color11">
                        {nav.dropdown.map((item, i) => {
                          const isItemActive = pathname === item.path;
                          return (
                            <li key={i}>
                              <Link
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)} // Closes drawer
                                className={`block px-12 py-3 text-[16px] transition-colors ${
                                  isItemActive
                                    ? "text-color4 font-semibold"
                                    : "text-color6 hover:bg-color-14"
                                }`}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Standard Mobile Link */
                  <Link
                    href={nav.path || "#"}
                    onClick={() => setIsMobileMenuOpen(false)} // Closes drawer
                    className={`block px-8 py-4 hover:bg-color-14 transition-colors ${
                      nav.name === "Home" ? "text-[22px]" : "text-[20px]"
                    } ${isActive ? "text-color4 font-semibold" : "text-color6"}`}
                  >
                    {nav.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="px-8 py-5 border-t border-color11">
          <Link
            href="#"
            className="block text-[18px] text-color-15 hover:text-color4 transition"
          >
            Help & Support
          </Link>
        </div>

        <div className="px-8 mt-6 space-y-4">
          {isAuthenticate ? (
            <button
              onClick={async () => {
                await logout();
                setIsMobileMenuOpen(false); // Optional: closes the mobile menu after logging out
              }}
              className={`${btnClass} block w-full bg-red-500 before:bg-red-700 py-[16px] text-center text-[18px] font-semibold text-white`}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsSignupOpen(true)}
              className={`${btnClass} block w-full bg-color4 py-[16px] text-center text-[18px] font-semibold text-white`}
            >
              Sign Up
            </button>
          )}
          <Link
            href="#"
            className="block w-full border-2 border-color4 rounded-[20px] py-[16px] text-center text-[18px] font-semibold text-color5 hover:bg-color4 hover:text-white transition-all duration-300"
          >
            Work With Us
          </Link>
        </div>
      </div>

      {/* RENDER EXTRACTED MODALS */}
      {isSignupOpen && (
        <SignupForm
          onClose={() => setIsSignupOpen(false)}
          onSwitchToLogin={openLogin}
        />
      )}

      {isLoginOpen && (
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignup={openSignup}
        />
      )}
    </>
  );
}
