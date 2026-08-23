"use client";

// src/app/(customerpanel)/profile-details/page.tsx
// ================================================================
// PERSONAL DETAILS  (route: /profile-details)
// ----------------------------------------------------------------
// Pixel-matched to FIX_Now_HTML/FIX_Now/personal-details.html:
//   Card 1  Basic Information   (photo, names, phone, password,
//                               alt phone, DOB, language, gender)
//   Card 2  Address Information (house .. landmark, state select)
//   Card 3  Account Preferences (SMS / WhatsApp / Email toggles)
//
// CONNECTIONS THAT ALREADY WORK:
//   - Navbar user-menu "Personal Details" links here.
//   - On mount we call fetchProfileFn() + fetchAddressesFn() from
//     src/api/api-function/profile.function.ts and prefill fields
//     with the logged-in customer's real data.
//   - Submit calls addAddressFn / setDefaultAddressFn and toasts.
//
// HOW TO MAKE IT FULLY DYNAMIC (beginner guide)
// ============================================================
//  STEP 1 - LOAD PROFILE: already wired via fetchProfileFn().
//           Maps to GET {{base_url}}/auth/me -> data.{name,email,phone}.
//
//  STEP 2 - SAVE PROFILE: currently only the address saves. Ask the
//           backend for PATCH {{base_url}}/customer/profile accepting
//           { name, phone, alternative_phone, dob, language, gender }.
//           Create updateProfileFn() then call it inside handleSubmit
//           BEFORE the address logic.
//
//  STEP 3 - PASSWORD: never send it with profile updates! Use a
//           dedicated POST {{base_url}}/auth/change-password
//           { current_password, new_password }. Only fire when the
//           password field is non-empty.
//
//  STEP 4 - PHOTO UPLOAD:
//           1) hidden file input already works - store the File
//           2) preview via URL.createObjectURL(file)
//           3) upload to storage -> get public URL
//           4) send avatar_url inside the PATCH profile payload
//
//  STEP 5 - PREFERENCES: persist toggles with
//             PUT {{base_url}}/customer/preferences
//             { sms, whatsapp, email_notifications }
// ============================================================

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

/* ------------- SHARED STYLE CONSTANTS (from HTML) ------------- */
const inputCls =
  "w-full h-[45px] sm:h-[48px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] text-[13px] sm:text-[16px] text-[#9CA3AF] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]";

const labelCls =
  "block mb-[8px] font-albert text-[14px] sm:text-[16px] font-semibold leading-none text-color10";

const cardCls =
  "w-full rounded-[25px] border border-[#E5E7EB] bg-white/75 backdrop-blur-[10px] p-[25px] sm:p-[28px] lg:p-[32px] shadow-[inset_0_1px_8px_rgba(229,231,235,0.75),0_2px_8px_rgba(229,231,235,0.35)]";

/* Section header: title+subtitle left, Edit pill right */
const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-start justify-between mb-[24px]">
    <div>
      <h3 className="font-outfit text-[15px] sm:text-[18px] lg:text-[24px] font-semibold leading-[1.2] text-color10">
        {title}
      </h3>
      <p className="mt-[8px] text-[12px] sm:text-[16px] leading-[1.3] text-color1 capitalize">
        {subtitle}
      </p>
    </div>

    {/* Blue outline pill -> amber fill on hover (exact HTML classes).
        Dynamic later: toggle this section's inputs disabled/enabled. */}
    <button
      type="button"
      className="rounded-[20px] px-[14px] py-[8px] sm:px-[28px] sm:py-[12px] lg:px-[36px] lg:py-[16px] border border-color4 bg-white text-[11px] sm:text-[14px] lg:text-[16px] font-semibold text-color4 transition-all duration-300 ease-in-out hover:bg-color-15 hover:border-color-15 hover:text-white hover:shadow-[0_4px_10px_rgba(39,114,204,0.18)] shrink-0"
    >
      Edit
    </button>
  </div>
);

const ChevronDown = () => (
  <svg
    className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function PersonalDetailsPage() {
  const { isAuthenticate } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressId, setAddressId] = useState<number | null>(null);

  /* Basic info fields. Password is WRITE-ONLY (never preloaded). */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [dob, setDob] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [gender, setGender] = useState("");

  /* Address fields */
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");

  /* Preference toggles - dynamic later (STEP 5) */
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [emailNotifEnabled, setEmailNotifEnabled] = useState(true);

  /* Load real profile + default address on mount */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileRes = await fetchProfileFn();
        if (profileRes.success && profileRes.data) {
          const user = profileRes.data;
          // Split "Rajesh Kumar" -> first / last
          const nameParts = (user.name || "").trim().split(/\s+/);
          setFirstName(nameParts[0] || "");
          setLastName(nameParts.slice(1).join(" ") || "");
          setPhone(user.phone || "");
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    const loadAddresses = async () => {
      try {
        const addrRes = await fetchAddressesFn();
        if (addrRes.success && addrRes.data) {
          const list: CustomerAddress[] = addrRes.data.addresses || [];
          // Prefer default address, else first row
          const defaultAddr = list.find((a) => a.is_default) || list[0];
          if (defaultAddr) {
            setAddressId(defaultAddr.id);
            setLine1(defaultAddr.address?.line_1 || "");
            setLine2(defaultAddr.address?.line_2 || "");
            setCity(defaultAddr.address?.city || "");
            setStateName(defaultAddr.address?.state || "");
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
      toast.error("Please login to save your details.");
      return;
    }

    setIsSubmitting(true);
    try {
      /* Address payload for POST/PATCH /customer/addresses.
         Dynamic later: call updateProfileFn first (STEP 2) and
         change-password API if password filled (STEP 3). */
      const payload = {
        label: "Home",
        contact_person: `${firstName} ${lastName}`.trim(),
        contact_phone: phone,
        address_line_1: line1,
        address_line_2: line2 || undefined,
        landmark: landmark || undefined,
        city,
        state: stateName,
        postal_code: postalCode,
        is_default: true,
      };

      let res: ApiResponse<CustomerAddress>;
      if (addressId) {
        res = await setDefaultAddressFn(String(addressId), true);
      } else {
        res = await addAddressFn(payload);
        if (res.success && res.data?.id) setAddressId(res.data.id);
      }

      if (res.success) {
        toast.success(res.message || "Details saved successfully!");
      } else {
        toast.error(res.message || "Failed to save details.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="w-full bg-white py-[32px] sm:py-[40px] md:py-[50px] lg:py-[60px]">
        <div className="w-full max-w-[1350px] mx-auto px-[16px] sm:px-[20px] lg:px-[15px]">
          {/* ================= PAGE HEADING ================= */}
          <h2 className="font-outfit text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-semibold leading-[1.2] text-color5 mb-[20px] lg:mb-[24px]">
            Complete Your Professional Profile
          </h2>

          {isLoading && (
            <p className="mb-[16px] text-[13px] text-gray-500">
              Loading your details...
            </p>
          )}

          {/* One form wraps all three cards, like the HTML */}
          <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
            {/* ==================== CARD 1 : BASIC INFO ==================== */}
            <div className={cardCls}>
              <SectionHeader
                title="Basic Information"
                subtitle="Update Your Basic Details."
              />

              {/* Photo left (449px on lg) + names right */}
              <div className="grid grid-cols-1 lg:grid-cols-[449px_1fr] gap-x-[24px] gap-y-[10px]">
                {/* ----- PROFILE PICTURE ----- */}
                <div className="flex flex-col items-center">
                  <label className="block mb-[8px] font-albert text-[18px] sm:text-[24px] font-semibold leading-none text-[#030712]">
                    Profile Picture
                  </label>

                  <div className="relative">
                    {/* Gray placeholder box. Dynamic later (STEP 4):
                        show uploaded photo preview here instead. */}
                    <div className="w-[160px] h-[78px] sm:w-[295px] sm:h-[90px] lg:w-[449px] lg:h-[172px] rounded-[30px] bg-[#E5E7EB]" />

                    {/* Hidden file input triggered by camera badge below */}
                    <input
                      type="file"
                      id="profilePicture"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          toast.info("Photo upload will be enabled soon.");
                        }
                      }}
                    />

                    {/* Camera badge bottom-right (opens picker via htmlFor) */}
                    <label
                      htmlFor="profilePicture"
                      className="absolute right-[-8px] bottom-[-8px] flex items-center justify-center w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full border border-[#E5E7EB] bg-white text-color4 shadow-[0_2px_6px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-300 hover:bg-color4 hover:text-white"
                    >
                      <svg className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px]" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7H7L9 4H15L17 7H20C21.1 7 22 7.9 22 9V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V9C2 7.9 2.9 7 4 7Z" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("profilePicture")?.click()
                    }
                    className="mt-[16px] text-[13px] sm:text-[16px] font-semibold text-[#45A5EC] transition-colors duration-300 hover:text-color-15"
                  >
                    Change Photo
                  </button>

                  <span className="mt-[8px] text-[9px] sm:text-[12px] text-[#1F2937]">
                    JPG, PNG up to 5MB
                  </span>
                </div>

                {/* ----- FIRST + LAST NAME ----- */}
                <div className="grid grid-cols-1 content-start gap-y-[24px]">
                  <div>
                    <label className={`${labelCls} mt-[30px]`}>First Name</label>
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

              {/* ----- OTHER INFO GRID -----
                  Phone | Password | Alt Phone | DOB | Language | Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[17px] mt-[52px]">
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Your Mobile Number"
                    className={inputCls}
                  />
                </div>

                {/* PASSWORD - write-only; dedicated API later (STEP 3) */}
                <div>
                  <label className={labelCls}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Change Your Password"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Alternative Phone Number</label>
                  <input
                    type="text"
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
                    className={`${inputCls} cursor-pointer`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Preferred Language</label>
                  <div className="relative">
                    <select
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className={`${inputCls} appearance-none cursor-pointer pr-8`}
                    >
                      <option value="">Select Your Preferred Language</option>
                      <option value="English">English</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Hindi">Hindi</option>
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
                      className={`${inputCls} appearance-none cursor-pointer pr-8`}
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

            {/* ==================== CARD 2 : ADDRESS ==================== */}
            <div className={cardCls}>
              <SectionHeader
                title="Address Information"
                subtitle="Where Should We Reach You?"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[17px]">
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
                  <label className={labelCls}>Street, Area or Locality</label>
                  <input
                    type="text"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    placeholder="Enter Street, Area or Locality"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter Your City"
                    className={inputCls}
                  />
                </div>

                {/* State select - options mirror the HTML exactly.
                    Dynamic later: swap for GET /regions/states list. */}
                <div>
                  <label className={labelCls}>State</label>
                  <div className="relative">
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className={`${inputCls} appearance-none cursor-pointer pr-8`}
                    >
                      <option value="">Select Your State</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <ChevronDown />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>ZIP Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter ZIP Code"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Landmark</label>
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

            {/* ==================== CARD 3 : PREFERENCES ==================== */}
            <div className={cardCls}>
              <SectionHeader
                title="Account Preferences"
                subtitle="Choose How You Want To Stay Updated."
              />

              {/* Three toggle cards: SMS (blue), WhatsApp (green),
                  Email (blue). Checkbox state is live; persist via API
                  later (STEP 5 in the guide at top of file). */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[10px]">
                {/* SMS */}
                <label className="flex items-center justify-between min-h-[48px] rounded-[8px] border border-[#E5E7EB] bg-white px-[16px] py-[10px] cursor-pointer transition-all duration-300 hover:border-color4 hover:shadow-[0_3px_8px_rgba(39,114,204,0.10)]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center p-[8px] rounded-full bg-[#EFF6FF] text-color4">
                      {/* Chat-bubble icon */}
                      <svg width="19" height="18" viewBox="0 0 19 18" fill="none">
                        <path
                          d="M17.5 12.5C17.5 13.4205 16.7537 14.1667 15.8333 14.1667H4.85659C4.41459 14.1668 3.99074 14.3425 3.67825 14.655L1.84325 16.49C1.67404 16.6592 1.41958 16.7098 1.19851 16.6183C0.977437 16.5267 0.833283 16.311 0.833252 16.0717V2.50004C0.833252 1.57957 1.57944 0.833374 2.49992 0.833374H15.8333C16.7537 0.833374 17.4999 1.57957 17.4999 2.50004V12.5Z"
                          stroke="#3B82F6"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-[8px]">
                      <p className="text-[12px] sm:text-[14px] font-semibold leading-[1.1] text-color10">
                        SMS
                      </p>
                      <p className="mt-[2px] text-[10px] sm:text-[12px] text-[#8B929B]">
                        Notifications
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsEnabled}
                    onChange={(e) => setSmsEnabled(e.target.checked)}
                    className="w-[16px] h-[16px] accent-color4"
                  />
                </label>

                {/* WHATSAPP */}
                <label className="flex items-center justify-between min-h-[48px] rounded-[8px] border border-[#E5E7EB] bg-white px-[16px] py-[10px] cursor-pointer transition-all duration-300 hover:border-[#22C55E] hover:shadow-[0_3px_8px_rgba(34,197,94,0.10)]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center p-[8px] rounded-full bg-[#F0FDF4] text-[#22C55E]">
                      {/* Phone-call icon */}
                      <svg width="19" height="19" viewBox="0 0 19 18" fill="none">
                        <path
                          d="M11.7041 12.7209C11.4678 13.0313 11.0478 13.1362 10.6933 12.9734C8.37861 11.8374 6.50549 9.9666 5.36659 7.65337C5.19267 7.29663 5.29448 6.86673 5.60992 6.62587L5.99992 6.33337C6.41959 6.01862 6.66658 5.52464 6.66658 5.00004V2.50004C6.66658 1.57957 5.92039 0.833374 4.99992 0.833374H2.49992C1.57944 0.833374 0.833252 1.57957 0.833252 2.50004C0.833252 10.7843 7.54898 17.5 15.8333 17.5C16.7537 17.5 17.4999 16.7538 17.4999 15.8334V13.3334C17.4999 12.4129 16.7537 11.6667 15.8333 11.6667H13.3333C12.8087 11.6667 12.3147 11.9137 11.9999 12.3334L11.7041 12.7209Z"
                          stroke="#22C55E"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-[8px]">
                      <p className="text-[12px] sm:text-[14px] font-semibold leading-[1.1] text-color10">
                        WhatsApp
                      </p>
                      <p className="mt-[2px] text-[10px] sm:text-[12px] text-[#8B929B]">
                        Notifications
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappEnabled}
                    onChange={(e) => setWhatsappEnabled(e.target.checked)}
                    className="w-[16px] h-[16px] accent-[#22C55E]"
                  />
                </label>

                {/* EMAIL NOTIFICATIONS */}
                <label className="flex items-center justify-between min-h-[48px] rounded-[8px] border border-[#E5E7EB] bg-white px-[16px] py-[10px] cursor-pointer transition-all duration-300 hover:border-color4 hover:shadow-[0_3px_8px_rgba(39,114,204,0.10)]">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center p-[8px] rounded-full bg-[#EFF6FF] text-color4">
                      {/* Envelope icon */}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M18.3334 5.83337L10.8409 10.6059C10.3233 10.9065 9.68432 10.9065 9.16675 10.6059L1.66675 5.83337"
                          stroke="#3B82F6"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.33341 3.33337H16.6667C17.5872 3.33337 18.3334 4.07957 18.3334 5.00004V15C18.3334 15.9205 17.5872 16.6667 16.6667 16.6667H3.33341C2.41294 16.6667 1.66675 15.9205 1.66675 15V5.00004C1.66675 4.07957 2.41294 3.33337 3.33341 3.33337V3.33337"
                          stroke="#3B82F6"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-[8px]">
                      <p className="text-[12px] sm:text-[14px] font-semibold leading-[1.1] text-color10">
                        Email
                      </p>
                      <p className="mt-[2px] text-[10px] sm:text-[12px] text-[#8B929B]">
                        Notifications
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifEnabled}
                    onChange={(e) => setEmailNotifEnabled(e.target.checked)}
                    className="w-[16px] h-[16px] accent-color4"
                  />
                </label>
              </div>
            </div>

            {/* ==================== SUBMIT ====================
                Blue pill -> amber hover lift (exact HTML classes).
                Dynamic later: disable while any save API is running. */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[20px] bg-color4 px-[14px] py-[8px] text-[11px] sm:px-[28px] sm:py-[12px] sm:text-[14px] lg:px-[36px] lg:py-[16px] lg:text-[16px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-color-15 hover:-translate-y-[1px] hover:shadow-[0_4px_10px_rgba(39,114,204,0.22)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
