import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import footerLogo from "@/assets/images/footer-logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#f59e0b] pt-[80px] pb-[40px]">
      <div className="max-w-[1350px] mx-auto px-[15px]">
        {/* ================= Top Row ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-[40px] mb-[60px]">
          {/* Left: Logo & Slogan (Spans 2 columns) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start text-left pr-0 lg:pr-10">
            <Link href="/" className="inline-block mb-[24px]">
              <Image
                src={footerLogo}
                alt="FixNow Logo"
                className="w-[180px] lg:w-[220px] h-auto object-contain"
              />
            </Link>
            <p className="text-[#1a3151] text-[22px] lg:text-[26px] font-albert font-medium leading-[1.4] max-w-[400px]">
              Making Everyday Services Simple & Reliable
            </p>
          </div>

          {/* Right: Newsletter (Spans 2 columns) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start text-left">
            <h3 className="text-white text-[22px] lg:text-[24px] font-albert font-medium mb-[16px]">
              Stay Updated
            </h3>
            <p className="text-white text-[14px] lg:text-[15px] mb-[24px] max-w-[600px] leading-[1.6]">
              Get The Latest Service Offers, Home Care Tips, And Exclusive
              Discounts Delivered Straight To Your Inbox.
            </p>
            <form className="flex w-full h-[50px] lg:h-[55px] rounded-[4px] overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Email Address..."
                className="flex-1 bg-[#FFFBEB] px-[20px] text-[15px] lg:text-[16px] outline-none text-black placeholder:text-[#1a3151]/50"
                required
              />
              <button
                type="submit"
                className="w-[60px] lg:w-[65px] bg-[#2772cc] flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
              >
                <ArrowRight className="text-white" size={24} />
              </button>
            </form>
          </div>
        </div>

        {/* ================= Middle Row (Grid) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]">
          {/* Column 1: Contact Info */}
          <div className="text-left flex flex-col">
            <div>
              <h4 className="text-[#1a3151] text-[18px] lg:text-[20px] font-semibold mb-[20px]">
                Contact Info
              </h4>
              <p className="text-[#1a3151] text-[15px] lg:text-[16px] leading-[1.8]">
                28 Park Street,
                <br />
                Kolkata, West Bengal,
                <br />
                India - 700016
              </p>
            </div>

            <div className="mt-[40px]">
              <h4 className="text-[#1a3151] text-[18px] lg:text-[20px] font-semibold mb-[15px]">
                Support Care
              </h4>
              <a
                href="tel:+6121234456"
                className="text-[#1a3151] text-[15px] lg:text-[16px] hover:underline"
              >
                +(612) 123-4456
              </a>
            </div>
          </div>

          {/* Column 2: Pages */}
          <div className="text-left">
            <h4 className="text-[#1a3151] text-[18px] lg:text-[20px] font-semibold mb-[20px]">
              Pages
            </h4>
            <ul className="space-y-[16px]">
              <li>
                <Link
                  href="/"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="text-left">
            <h4 className="text-[#1a3151] text-[18px] lg:text-[20px] font-semibold mb-[20px]">
              Services
            </h4>
            <ul className="space-y-[16px]">
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  House Help
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  House Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Electrical Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Plumbing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Home Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="text-left">
            <h4 className="text-[#1a3151] text-[18px] lg:text-[20px] font-semibold mb-[20px]">
              Company
            </h4>
            <ul className="space-y-[16px]">
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  FAQ's
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#1a3151] text-[14px] lg:text-[15px] hover:underline"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= Bottom Row ================= */}
        <div className="mt-[80px] lg:mt-[100px] flex flex-col items-center lg:items-end text-center lg:text-right">
          <p className="text-[#1a3151] text-[15px] lg:text-[16px] font-semibold mb-[20px]">
            © 2026 FIXNOW. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap justify-center lg:justify-end gap-[24px] text-[#1a3151] text-[14px] lg:text-[15px] font-medium">
            <li>
              <Link
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Youtube
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:underline hover:text-white transition-colors"
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
