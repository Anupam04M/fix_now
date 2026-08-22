"use client";

// src/app/(customerpanel)/profile-details/page.tsx
// ================================================================
// PROFILE DETAILS  (route: /profile-details)
// ----------------------------------------------------------------
// Converted 1:1 from FIX_NowHtml/FIX_Now/profile-details.html.
// Self-contained profile form (Basic Info / Address / Preferences).
// ================================================================

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  fetchProfileFn,
  fetchAddressesFn,
  addAddressFn,
  setDefaultAddressFn,
} from "@/api/api-function/profile.function";
import { useAuthStore } from "@/store/useAuthStore";
import { CustomerAddress, ApiResponse } from "@/types/interface/profile.interface";

const inputCls =
  "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm placeholder-gray-400";

const labelCls = "block text-sm font-semibold text-slate-800 mb-1.5";

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
    <button
      type="button"
      className="px-6 py-1.5 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50 transition-colors"
    >
      Edit
    </button>
  </div>
);

// Chevron-down icon used inside the select dropdowns
const ChevronDown = () => (
  <svg
    className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default function ProfileDetailsPage() {
  const { isAuthenticate } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressId, setAddressId] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [gender, setGender] = useState("");

  const [label, setLabel] = useState("Home");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileRes = await fetchProfileFn();
        if (profileRes.success && profileRes.data) {
          const user = profileRes.data;
          const nameParts = (user.name || "").trim().split(/\s+/);
          setFirstName(nameParts[0] || "");
          setLastName(nameParts.slice(1).join(" ") || "");
          setPhone(user.phone || "");
          setEmail(user.email || "");
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    const loadAddresses = async () => {
      try {
        const addrRes = await fetchAddressesFn();
        if (addrRes.success && addrRes.data) {
          const list: CustomerAddress[] =
            addrRes.data.addresses || [];
          const defaultAddr = list.find((a) => a.is_default) || list[0];
          if (defaultAddr) {
            setAddressId(defaultAddr.id);
            setLabel(defaultAddr.label || "");
            setContactPerson(defaultAddr.contact_person || "");
            setContactPhone(defaultAddr.contact_phone || "");
            setLine1(defaultAddr.address?.line_1 || "");
            setLine2(defaultAddr.address?.line_2 || "");
            setCity(defaultAddr.address?.city || "");
            setState(defaultAddr.address?.state || "");
            setPostalCode(defaultAddr.address?.postal_code || "");
            setLandmark(defaultAddr.address?.landmark || "");
          }
        }
      } catch (error) {
        console.error("Failed to load addresses:", error);
      }
    };

    Promise.all([loadProfile(), loadAddresses()]).finally(() =>
      setIsLoading(false),
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticate) {
      toast.error("Please login to save your profile details.");
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    if (!fullName || !email) {
      toast.error("First name and email are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        label,
        contact_person: contactPerson || fullName,
        contact_phone: contactPhone || phone,
        address_line_1: line1,
        address_line_2: line2 || undefined,
        landmark: landmark || undefined,
        city,
        state,
        postal_code: postalCode,
        is_default: true,
      };

      let res: ApiResponse<CustomerAddress>;
      if (addressId) {
        res = await setDefaultAddressFn(String(addressId), true);
      } else {
        res = await addAddressFn(payload);
        if (res.success && res.data?.id) {
          setAddressId(res.data.id);
        }
      }

      if (res.success) {
        toast.success(res.message || "Profile saved successfully!");
      } else {
        toast.error(res.message || "Failed to save profile.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Main Title */}
        <h1 className="text-3xl font-bold text-slate-800">
          Complete Your Professional Profile
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {isLoading && (
            <div className="text-center text-sm text-gray-500 py-8">
              Loading your profile...
            </div>
          )}
          {/* SECTION 1: Basic Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
            <SectionHeading
              title="Basic Information"
              subtitle="Update Your Basic Details"
            />

            <div className="space-y-6">
              {/* Top Row: Profile Picture + First/Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Profile Picture Box */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <span className="text-base font-bold text-slate-900 self-center mb-3">
                    Profile Picture
                  </span>
                  <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-2xl flex items-center justify-center">
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow border border-gray-100 hover:bg-gray-50"
                    >
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 font-medium mt-3 text-sm hover:underline"
                  >
                    Change Photo
                  </button>
                  <span className="text-xs text-gray-400 mt-1">
                    JPG, PNG Up To 2MB
                  </span>
                </div>

                {/* First Name & Last Name */}
                <div className="md:col-span-7 space-y-4 pt-2">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter Your First Name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter Your Last Name"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {/* Remaining Fields in Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Your Mobile Number"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Alternative Phone Number</label>
                  <input
                    type="tel"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    placeholder="Enter Alternative Mobile Number"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Date Of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DD / MM / YYYY"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Preferred Language</label>
                  <div className="relative">
                    <select
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-gray-400 appearance-none bg-white pr-8"
                    >
                      <option value="">Select Your Preferred Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                    <ChevronDown />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Gender</label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-gray-400 appearance-none bg-white pr-8"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Address Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
            <SectionHeading
              title="Address Information"
              subtitle="Where Should We Reach You?"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>House / Flat / Building No.</label>
                <input
                  type="text"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  placeholder="Enter House / Flat / Building No."
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Street / Area / Locality</label>
                <input
                  type="text"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  placeholder="Enter Street, Area Or Locality"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>City / Town</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter Your City"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>State</label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-gray-400 appearance-none bg-white pr-8"
                  >
                    <option value="">Select Your State</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>
              <div>
                <label className={labelCls}>PIN Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter PIN Code"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  Landmark{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Nearby Landmark"
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Account Preferences */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
            <SectionHeading
              title="Account Preferences"
              subtitle="Choose How You Want To Stay Updated"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* SMS */}
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    SMS
                    <br />
                    Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </label>

              {/* WhatsApp */}
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-green-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    WhatsApp
                    <br />
                    Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </label>

              {/* Email */}
              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    Email
                    <br />
                    Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-3 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}