"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Mic, MapPin, LayoutGrid, Map, History, X,
  User, ShoppingCart, ChevronDown, Menu, ArrowRight
} from "lucide-react";

import logoImg from "@/assets/images/Frame 14.png";
import createAccountIllus from "@/assets/images/Create Account Illustration.png";
import loginIllus from "@/assets/images/Main Illustration Container.png";
import googleIcon from "@/assets/images/Vector.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [locationType, setLocationType] = useState("Choose Location");
  
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  // Reusable Tailwind CSS string for the custom animated button
  const cmnBtnClasses = "group relative inline-flex items-center justify-center overflow-hidden rounded-[20px] z-10 transition-colors duration-300 hover:text-white before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 bg-color4 text-white font-semibold font-outfit";

  return (
    <>
      <header className="w-full">
        {/* Header Top */}
        <div className="w-full min-h-[74px] bg-color-14 px-[20px] py-[10px] flex items-center">
          <div className="max-w-[1350px] mx-auto w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-auto shrink-0 text-center md:text-left">
              <p className="font-albert text-[14px] sm:text-[15px] text-color5 whitespace-nowrap">
                Trusted Local Services, Right When You Need Them.
              </p>
            </div>

            <div className="w-auto flex items-center justify-end gap-6 mt-4 md:mt-0">
              <div className="relative w-[250px] shrink-0">
                <select
                  className="w-full h-[45px] bg-white rounded-[10px] px-[15px] text-[15px] text-gray-700 outline-none cursor-pointer appearance-none shadow-sm"
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                >
                  <option value="Choose Location">Choose Location</option>
                  <option value="search">🔍 Search By Area</option>
                  <option value="current">📍 Use My Current Location</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />

                {locationType === "search" && (
                  <div className="absolute top-[50px] w-full z-50">
                    <input type="text" placeholder="Search your area..." className="w-full h-[45px] border border-gray-300 bg-white shadow-lg rounded-[8px] px-[15px] outline-none text-black" />
                  </div>
                )}
                {locationType === "current" && (
                  <div className="absolute top-[50px] w-full z-50 bg-gray-50 shadow-lg rounded-[10px] p-[15px]">
                    <h4 className="mb-[10px] text-sm font-bold text-black">Your Current Address</h4>
                    <p className="text-gray-700 text-sm leading-[24px]">Getting your location...</p>
                  </div>
                )}
              </div>

              <p className="hidden lg:block text-[15px] text-color-15 whitespace-nowrap font-medium">
                Help & Support
              </p>

              <Link href="#" className="hidden lg:block text-[15px] font-medium rounded-[20px] border-[1.5px] border-color4 px-[32px] py-[10px] whitespace-nowrap text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all duration-500 ease-in-out">
                Work With Us
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[linear-gradient(90deg,rgb(240,249,254)_1%,rgb(48,137,224)_47%,rgb(240,249,254)_100%)]"></div>

        {/* Main Nav */}
        <nav className="w-full bg-color2 px-[20px] py-[11px] border-b border-gray-100 shadow-sm">
          <div className="max-w-[1350px] mx-auto w-full">
            <div className="flex items-center justify-between h-[70px] py-[14px]">
              
              <Link href="/" className="shrink-0">
                <Image src={logoImg} alt="logo-image" className="w-[160px] md:w-[200px] h-auto object-contain" />
              </Link>

              <div className="hidden lg:flex items-center flex-1 justify-center">
                <ul className="flex items-center">
                  <li className="mr-[50px]">
                    <Link href="/" className="relative text-[16px] font-bold text-color4 after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-full after:bg-color4 after:transition-all duration-300 after:-translate-x-1/2">
                      Home
                    </Link>
                  </li>

                  <li className="relative mr-[50px]">
                    <button onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)} className="relative outline-none text-[16px] font-semibold text-color10 hover:text-color4 transition-all duration-300 flex items-center gap-1 group">
                      Service
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180 text-color4" : ""}`} />
                    </button>

                    {isMegaMenuOpen && (
                      <div className="absolute -left-1/2 mt-[30px] w-[600px] bg-white shadow-2xl rounded-xl p-8 z-50 border border-gray-100">
                        <div className="grid grid-cols-12 gap-8">
                          <div className="col-span-6">
                            <ul className="space-y-4 text-left">
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">Electrician</Link></li>
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">Plumber</Link></li>
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">Personal Grooming</Link></li>
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">House Help</Link></li>
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">Repairing</Link></li>
                            </ul>
                          </div>
                          <div className="col-span-6">
                            <ul className="space-y-4 text-left">
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">Carpenter</Link></li>
                              <li><Link href="#" className="text-[16px] font-semibold text-color10 hover:text-color4">Delivery Assistance</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>

                  <li className="mr-[50px]">
                    <Link href="/about" className="relative text-[16px] font-semibold text-color10 hover:text-color4 transition-all duration-300">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="relative text-[16px] font-semibold text-color10 hover:text-color4 transition-all duration-300">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="hidden lg:flex items-center justify-end">
                <div className="relative group mx-2">
                  <div className="absolute right-0 top-[48px] w-[440px] h-[25px] z-40"></div>
                  <button 
                    onMouseEnter={() => setIsSearchOpen(true)}
                    className="relative z-40 w-11 h-11 rounded-full border border-color5 flex items-center justify-center bg-white text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all duration-300"
                  >
                    <Search size={18} />
                  </button>

                  <div 
                    onMouseLeave={() => setIsSearchOpen(false)}
                    className={`absolute right-0 top-[73px] w-[440px] transition-all duration-300 z-[9999] ${isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                  >
                    <div className="relative w-full h-[62px] bg-white rounded-[30px] border border-color-15 shadow-md">
                      <input type="search" placeholder="Search By City, Service Type, OR ZIP Code" className="w-full h-full rounded-[30px] pl-[25px] pr-[55px] outline-none text-[14px] text-gray-600 placeholder:text-gray-400" />
                      <button className="absolute right-[17px] top-1/2 -translate-y-1/2 text-color5 hover:text-color-15 transition">
                        <Mic size={20} />
                      </button>
                    </div>

                    <div className="mt-[15px] w-full bg-white rounded-[16px] border border-[#e0e4e9] shadow-lg overflow-hidden">
                      <div className="flex items-center min-h-[70px] px-[20px] bg-[#eef5ff] border-b border-[#dce3eb] cursor-pointer hover:bg-[#e7f1ff]">
                        <MapPin className="w-[40px] text-color5" size={22} />
                        <p className="flex-1 text-[14px] text-gray-600">Search by city</p>
                      </div>
                      <div className="flex items-center min-h-[70px] px-[20px] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f7f9fc]">
                        <LayoutGrid className="w-[40px] text-color5" size={21} />
                        <p className="flex-1 text-[14px] text-gray-600">Search by service type</p>
                      </div>
                      <div className="flex items-center min-h-[70px] px-[20px] border-b border-[#e0e0e0] cursor-pointer hover:bg-[#f7f9fc]">
                        <Map className="w-[40px] text-color5" size={21} />
                        <p className="flex-1 text-[14px] text-gray-600">Search by zip code</p>
                      </div>
                      <div className="px-[20px] py-[20px]">
                        <div className="flex items-center">
                          <History className="w-[40px] text-color5" size={19} />
                          <p className="flex-1 text-[14px] text-gray-600">Recent Searches</p>
                          <button className="text-gray-400 hover:text-color-15"><X size={17} /></button>
                        </div>
                        <div className="mt-[15px] flex overflow-hidden">
                          <button className="shrink-0 bg-[#f1f3f6] rounded-[15px] px-[18px] py-[11px] mr-[10px] text-[13px] text-gray-500 hover:bg-[#e6eaf0]">Electrician Near Salt Lake</button>
                          <button className="shrink-0 bg-[#f1f3f6] rounded-[15px] px-[18px] py-[11px] mr-[10px] text-[13px] text-gray-500 hover:bg-[#e6eaf0]">Salon At Home</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="#" className="w-11 h-11 rounded-full border border-color5 flex items-center justify-center bg-white text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all mx-2">
                  <User size={18} />
                </Link>
                <Link href="#" className="w-11 h-11 rounded-full border border-color5 flex items-center justify-center bg-white text-color5 hover:bg-color-15 hover:border-color-15 hover:text-white transition-all mx-2">
                  <ShoppingCart size={18} />
                </Link>

                <button onClick={() => setIsSignupOpen(true)} className={`${cmnBtnClasses} py-[12px] px-[36px] ml-4 text-[16px]`}>
                  Sign Up
                </button>
              </div>

              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-color6">
                <Menu size={32} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <div className={`fixed top-0 w-[300px] h-screen bg-white z-50 transition-all duration-300 shadow-2xl overflow-y-auto ${isMobileMenuOpen ? "right-0" : "right-[-100%]"}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-color11">
          <Image src={logoImg} alt="logo" width={140} />
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-color6"><X size={32} /></button>
        </div>
        <ul className="mt-6">
          <li className="border-b border-color11"><Link href="/" className="block px-8 py-4 text-[20px] text-color6 hover:bg-color-14">Home</Link></li>
          <li className="border-b border-color11"><Link href="/service" className="block px-8 py-4 text-[20px] text-color6 hover:bg-color-14">Service</Link></li>
          <li className="border-b border-color11"><Link href="/about" className="block px-8 py-4 text-[20px] text-color6 hover:bg-color-14">About</Link></li>
          <li className="border-b border-color11"><Link href="/contact" className="block px-8 py-4 text-[20px] text-color6 hover:bg-color-14">Contact Us</Link></li>
        </ul>
        <div className="px-8 mt-6 space-y-4">
          <button onClick={() => setIsSignupOpen(true)} className={`${cmnBtnClasses} w-full py-[16px] text-[18px]`}>Sign Up</button>
        </div>
      </div>

      {/* SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/30 backdrop-blur-sm py-[20px] lg:py-[36px] flex items-center justify-center">
          <div className="w-full max-w-[1320px] mx-[15px] bg-color2 rounded-[20px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="relative w-full lg:w-1/2 min-h-[260px] lg:min-h-[821px] bg-[linear-gradient(180deg,_#DDF0FC_13%,_#2772CC_86%)] flex items-center justify-center p-6">
               <Image src={createAccountIllus} alt="Signup" className="w-[80%] object-contain" />
            </div>
            <div className="w-full lg:w-1/2 pt-[30px] pb-[35px] px-[20px] sm:px-[50px] lg:px-[94px]">
              <div className="flex justify-end">
                <button onClick={() => setIsSignupOpen(false)} className="text-[16px] font-semibold text-color4 hover:text-color-15 transition-colors">Skip</button>
              </div>
              <h2 className="text-[32px] font-semibold text-color10 mt-[5px] font-outfit">Create An Account</h2>
              <form className="mt-[30px]">
                <div className="flex gap-4 mb-[20px]">
                  <input type="text" placeholder="First Name*" className="w-1/2 p-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" required />
                  <input type="text" placeholder="Last Name*" className="w-1/2 p-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" required />
                </div>
                <div className="flex gap-4 mb-[20px]">
                  <input type="tel" placeholder="Phone Number*" className="w-1/2 p-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" required />
                  <input type="email" placeholder="Enter Your Email" className="w-1/2 p-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" />
                </div>
                <input type="password" placeholder="Enter Your Password" className="w-full p-[20px] mb-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" />
                <input type="password" placeholder="Confirm Password" className="w-full p-[20px] mb-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" />
                <button type="submit" className={`${cmnBtnClasses} w-full h-[60px] text-[16px] mt-4`}>
                  Create Account <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </button>
                <p className="mt-[28px] text-center text-[16px] font-medium text-color1">
                  Already Have An Account? <button type="button" onClick={openLogin} className="text-color4 font-semibold ml-1 hover:text-color-15 transition-colors">Sign In</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/30 backdrop-blur-sm py-[20px] lg:py-[36px] flex items-center justify-center">
          <div className="w-full max-w-[1320px] mx-[15px] bg-color2 rounded-[20px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="relative w-full lg:w-1/2 min-h-[260px] lg:min-h-[821px] bg-[linear-gradient(180deg,_#DDF0FC_13%,_#2772CC_86%)] flex items-center justify-center p-6">
               <Image src={loginIllus} alt="Login" className="w-[80%] object-contain" />
            </div>
            <div className="w-full lg:w-1/2 pt-[30px] pb-[35px] px-[20px] sm:px-[50px] lg:px-[94px]">
              <div className="flex justify-end">
                <button onClick={() => setIsLoginOpen(false)} className="text-[24px] font-semibold text-color10 hover:text-gray-600 transition-colors"><X/></button>
              </div>
              <h2 className="text-[32px] font-semibold text-color10 mt-[5px] font-outfit">Welcome Back</h2>
              <p className="text-color1 mt-2">Login to continue your account.</p>
              <form className="mt-[30px]">
                <input type="email" placeholder="Enter Your Email" className="w-full p-[20px] mb-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" required />
                <input type="password" placeholder="Enter Your Password" className="w-full p-[20px] mb-[20px] border-b-2 border-color4 rounded-b-[20px] outline-none focus:border-color5 transition-all bg-transparent text-black" required />
                <button type="submit" className={`${cmnBtnClasses} w-full h-[60px] text-[16px] mt-4`}>
                  Login <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </button>
                <div className="flex items-center my-[24px]">
                  <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                  <span className="mx-[20px] text-[#9CA3AF]">OR</span>
                  <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                </div>
                <button type="button" className="w-full h-[66px] rounded-[20px] border-2 border-color4 flex items-center justify-center hover:bg-color-15 hover:border-color-15 transition-all group">
                  <span className="text-color4 group-hover:text-white font-semibold mr-2 transition-colors">Continue with Google</span>
                  <Image src={googleIcon} alt="Google" width={24} height={24} className="object-contain" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}