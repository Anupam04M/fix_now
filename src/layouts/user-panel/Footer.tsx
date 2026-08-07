import React from "react";
import Link from "next/link";
import Image from "next/image";

import footerLogo from "@/assets/images/footer-logo.png";

export default function Footer() {
  return (
    <footer className="bg-color-15 py-[40px] sm:py-[60px] lg:py-[80px]">
      <div className="max-w-[1350px] mx-auto px-[15px]">
        {/* ================= Top Row: Logo & Newsletter ================= */}
        <div className="flex flex-col lg:flex-row justify-between gap-[40px] lg:gap-0">
          {/* Left Side: Logo & Slogan */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-[40px]">
            <Link href="/" className="inline-block mb-[16px] lg:mb-[24px]">
              <Image
                src={footerLogo}
                alt="FixNow Logo"
                className="w-[160px] md:w-[180px] lg:w-[208px] h-auto object-contain"
              />
            </Link>
            <div className="text-color10 text-[20px] md:text-[24px] lg:text-[28px] font-outfit font-semibold leading-[1.4] max-w-[450px]">
              Making Everyday Services Simple & Reliable
            </div>
          </div>

          {/* Right Side: Stay Updated (Newsletter) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-start text-left">
            <div className="text-white text-[20px] md:text-[22px] lg:text-[24px] font-outfit font-semibold mb-[16px]">
              Stay Updated
            </div>
            <p className="text-white text-[14px] lg:text-[16px] mb-[24px] max-w-[535px] leading-[1.6] font-albert">
              Get The Latest Service Offers, Home Care Tips, And Exclusive
              Discounts Delivered Straight To Your Inbox.
            </p>
            <form className="flex w-full max-w-[635px] h-[50px] lg:h-[60px] rounded-[5px] overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Email Address..."
                className="flex-1 bg-[#FFFBEB] px-[20px] text-[15px] outline-none text-color5 placeholder:text-color5 font-albert"
                required
              />
              <button
                type="submit"
                className="w-[55px] lg:w-[60px] bg-color4 flex items-center justify-center transition-colors duration-300 hover:bg-color5 group"
              >
                <i className="fa-solid fa-arrow-right text-white text-[20px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>
          </div>
        </div>

        {/* ================= Middle Row (Grid) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px] mt-[60px] lg:mt-[80px]">
          {/* Column 1: Contact Info */}
          <div className="text-left flex flex-col">
            <div>
              <h4 className="text-color10 text-[18px] lg:text-[20px] font-semibold mb-[16px] font-outfit">
                Contact Info
              </h4>
              <p className="text-color10 text-[14px] lg:text-[16px] leading-[1.8] font-albert font-medium mb-[30px] lg:mb-[51px]">
                28 Park Street,
                <br />
                Kolkata, West Bengal,
                <br />
                India - 700016
              </p>
            </div>
            <div>
              <h4 className="text-color10 text-[18px] lg:text-[20px] font-semibold mb-[10px] font-outfit">
                Support Care
              </h4>
              <a
                href="tel:+6121234456"
                className="text-color10 text-[14px] lg:text-[16px] font-albert font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
              >
                +(612) 123-4456
              </a>
            </div>
          </div>

          {/* Column 2: Pages */}
          <div className="text-left">
            <h4 className="text-color10 text-[18px] lg:text-[20px] font-semibold mb-[16px] font-outfit">
              Pages
            </h4>
            <ul className="space-y-[12px] font-albert">
              <li>
                <Link
                  href="/"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="text-left">
            <h4 className="text-color10 text-[18px] lg:text-[20px] font-semibold mb-[16px] font-outfit">
              Services
            </h4>
            <ul className="space-y-[12px] font-albert">
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  House Help
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  House Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Electrical Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Plumbing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Home Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="text-left">
            <h4 className="text-color10 text-[18px] lg:text-[20px] font-semibold mb-[16px] font-outfit">
              Company
            </h4>
            <ul className="space-y-[12px] font-albert">
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  FAQ's
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-color10 text-[14px] lg:text-[16px] font-medium hover:text-white transition-colors duration-300 inline-block hover:translate-x-2"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= Bottom Row ================= */}
        <div className="mt-[60px] lg:mt-[80px] flex flex-col items-center lg:items-end text-center lg:text-right">
          <p className="text-color10 text-[14px] lg:text-[16px] font-semibold mb-[16px] font-albert">
            © 2026 FIXNOW. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap justify-center lg:justify-end gap-[15px] lg:gap-[20px] text-color10 text-[14px] lg:text-[16px] font-bold font-albert">
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Youtube
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
