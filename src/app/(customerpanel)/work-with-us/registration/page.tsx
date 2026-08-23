"use client";

// src/app/(customerpanel)/work-with-us/registration/page.tsx
// ================================================================
// PROVIDER REGISTRATION PROCESS  (route: /work-with-us/registration)
// ----------------------------------------------------------------
// Pixel-matched to FIX_Now_HTML/FIX_Now/registration-process.html.
//
// PAGE LAYOUT (matches HTML):
//   Grid: [form 2.3fr | side-cards 1fr]
//   RIGHT side cards : Stand Out | Security & Privacy | Need Assistance
//   LEFT form cards  : 1 Personal Details   2 Professional Expertise
//                      3 Upload Documents   4 Service Categories
//                      5 Service Areas      6 Bank Details
//                      7 Review & Submit    8 Action buttons
//
// CONNECTIONS:
//   - Work With Us page CTA navigates here (same flow as the HTML site).
//   - Icons come from ../registration-assets.ts (pre-extracted SVGs).
//
// HOW TO MAKE THIS FULLY DYNAMIC (beginner guide)
// ============================================================
//  STEP 1 - SUBMIT REGISTRATION:
//           After login-as-provider exists, POST everything to
//             POST {{base_url}}/provider/register   (ask backend team)
//           Build one payload object from all useState fields below.
//           Until then handleSubmit just shows a toast (STATIC mode).
//
//  STEP 2 - FILE UPLOADS (Govt ID / Certificates / Passport):
//           Each hidden <input type="file"> already opens its picker.
//           Dynamic flow:
//             onChange -> store File in state -> upload to Cloudinary/
//             Supabase -> collect returned URLs -> include them in the
//             STEP 1 payload as { govt_id_url, certificate_urls[], passport_url }.
//
//  STEP 3 - SERVICE CATEGORIES:
//           Tiles are hardcoded (Plumbing..More). Fetch real ones from
//             GET {{base_url}}/categories      (FixNow API docs)
//           then .map() over the response instead of the static array.
//           Track selections in selectedCategories[] and send ids.
//
//  STEP 4 - MAP + RADIUS:
//           Map iframe is hardcoded to Kestopur. When the base location
//           changes, geocode it (see Agrilink src/utils/geocode.ts for a
//           cached Nominatim helper) and rebuild the iframe src with
//           new lat/lng. Radius already updates live client-side.
//
//  STEP 5 - SAVE DRAFT:
//           Persist all fields to localStorage under a key like
//           "fixnow-provider-draft" so users can resume later;
//           restore on mount. Submit clears it.
//
//  STEP 6 - REVIEW CHECKLIST:
//           Statuses below mirror the HTML statically. To compute them,
//           derive booleans from field values, e.g.
//             const personalDone = !!(fullName && email && dob && phone);
//           and render check vs pending icon accordingly.
// ============================================================

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  selectChevron,
  govtIdIcon,
  certificationsIcon,
  passportIcon,
  plumbingIcon,
  electricalIcon,
  movingIcon,
  gardeningIcon,
  paintingIcon,
  saveArrow,
  submitArrow,
  checkIcon,
  mapPendingIcon,
  standOutIcon,
  securityIcon,
  contactArrow,
} from "../registration-assets";

const Svg = ({ html }: { html: string }) => (
  <span dangerouslySetInnerHTML={{ __html: html }} />
);

/* ---------------- SHARED STYLE CONSTANTS (from HTML) ---------------- */
const cardCls =
  "w-full rounded-[25px] border border-[#E5E7EB] bg-white/75 backdrop-blur-[10px] p-[25px] sm:p-[28px] lg:p-[32px] shadow-[inset_0_1px_8px_rgba(229,231,235,0.75),0_2px_8px_rgba(229,231,235,0.35)]";

const helpCardCls =
  "w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] border border-[#B8E2FA] bg-[linear-gradient(135deg,rgba(240,249,254,0.95),rgba(255,255,255,0.82))] backdrop-blur-[10px] px-[18px] sm:px-[22px] lg:px-[30px] py-[18px] sm:py-[20px] shadow-[0_2px_8px_rgba(153,215,247,0.12)]";

const labelCls =
  "block mb-[8px] font-albert text-[14px] sm:text-[16px] font-semibold leading-none text-color10";

const inputCls =
  "w-full h-[45px] sm:h-[48px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] text-[13px] sm:text-[16px] text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]";

/* Section heading block reused by every left-side card */
const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="mb-[24px]">
    <h3 className="font-outfit text-[15px] sm:text-[18px] lg:text-[24px] font-semibold leading-[1.2] text-color10">
      {title}
    </h3>
    <p className="mt-[8px] text-[12px] sm:text-[16px] leading-[1.3] text-color1 capitalize">
      {subtitle}
    </p>
  </div>
);

/* Static category list - dynamic later: GET /categories (STEP 3) */
const CATEGORY_TILES = [
  { id: "plumbing", label: "Plumbing", icon: plumbingIcon },
  { id: "electrical", label: "Electrical", icon: electricalIcon },
  { id: "moving", label: "Moving", icon: movingIcon },
  { id: "gardening", label: "Gardening", icon: gardeningIcon },
  { id: "painting", label: "Painting", icon: paintingIcon },
];

export default function RegistrationProcessPage() {
  const router = useRouter();

  /* ---------------- FORM STATE (prefilled = HTML demo values) ---------------- */
  // Card 1: personal details
  const [fullName, setFullName] = useState("Rahul Sharma");
  const [email, setEmail] = useState("rahulsharma.plumber@gmail.com");
  const [dob, setDob] = useState("2000-01-01");
  const [phone, setPhone] = useState("+91 98765 43210");

  // Card 2: expertise
  const [experience, setExperience] = useState("8 Years");
  const [primarySkill, setPrimarySkill] = useState(
    "Residential plumbing & pipe repair",
  );
  const [certification, setCertification] = useState(
    "Skill India – Plumbing Technician Certification",
  );
  const [bio, setBio] = useState(
    "Experienced and customer-focused AC technician specializing in residential and commercial air conditioning systems. Skilled in diagnostics, repairs, preventive maintenance, gas refilling, and installation.",
  );

  // Card 4: categories (toggleable set). Dynamic later (STEP 3).
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "plumbing",
  ]);

  // Card 5: service area
  const [baseLocation, setBaseLocation] = useState(
    "Kestopur,Kolkata-700102,West Bengal",
  );
  // Range slider: 1..40 (km). HTML displays miles -> convert.
  const [radiusKm, setRadiusKm] = useState(20);
  const radiusMiles = Math.round(radiusKm * 0.625); // 40km ~= 25mi

  // Card 6: bank details
  const [accountHolder, setAccountHolder] = useState("Rahul Sharma");
  const [bankName, setBankName] = useState("State Bank Of India");
  const [ifscCode, setIfscCode] = useState("SBIN0001234");
  const [accountNumber, setAccountNumber] = useState("123456789012");

  /* Category toggle handler */
  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  /* ---------------- ACTIONS (STATIC MODE) ---------------- */
  const handleSaveDraft = () => {
    /* Dynamic later (STEP 5): JSON.stringify every field into
       localStorage, then toast.success("Draft saved"). */
    toast.info("Draft saving will be enabled soon.");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* STATIC behaviour: validate the essentials + confirm.
       Dynamic later (STEP 1): gather ALL fields into one payload and
       POST to /provider/register, then router.push("/work-with-us")
       on success. File uploads handled per STEP 2 before submitting. */
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in your name, email and phone number.");
      return;
    }
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one service category.");
      return;
    }
    toast.success(
      "Registration submitted! Our team will verify your details shortly.",
    );
    setTimeout(() => router.push("/work-with-us"), 1500);
  };

  return (
    <main>
      {/* White band wrapper (same as HTML section) */}
      <section className="w-full bg-white py-[32px] sm:py-[40px] md:py-[50px] lg:py-[60px]">
        <div className="w-full max-w-[1350px] mx-auto px-[16px] sm:px-[20px] lg:px-[15px]">
          {/* ================= PAGE HEADING ================= */}
          <h2 className="font-outfit text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-semibold leading-[1.2] text-color5 mb-[20px] lg:mb-[24px]">
            Complete Your Professional Profile
          </h2>

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.3fr)_minmax(280px,1fr)] gap-[18px] items-start">
            {/* ================= RIGHT SIDE CARDS ================= */}
            <div className="order-1 lg:order-2 flex flex-col gap-[24px]">
              {/* ---- Stand Out card ---- */}
              <div className={`${helpCardCls} min-h-[190px] sm:min-h-[200px] lg:min-h-[207px]`}>
                <div className="flex items-center">
                  <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] shrink-0 rounded-[10px] bg-[#9DD8F6] flex items-center justify-center mr-[12px] sm:mr-[14px] lg:mr-[16px]">
                    <Svg html={standOutIcon} />
                  </div>
                  <h2 className="font-outfit text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] font-semibold text-[#0B1C30]">
                    Stand Out
                  </h2>
                </div>
                <p className="mt-[18px] sm:mt-[20px] lg:mt-[24px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[1.45] text-color1 font-medium capitalize">
                  Profiles with detailed bios and specific certifications
                  receive 40% more booking requests on average. Take the time
                  to highlight what makes your service exceptional.
                </p>
              </div>

              {/* ---- Security & Privacy card ---- */}
              <div className={`${helpCardCls} min-h-[150px] sm:min-h-[160px] lg:min-h-[165px]`}>
                <div className="flex items-center">
                  <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] shrink-0 rounded-[10px] bg-[#9DD8F6] flex items-center justify-center mr-[12px] sm:mr-[14px] lg:mr-[16px]">
                    <Svg html={securityIcon} />
                  </div>
                  <h2 className="font-outfit text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] font-semibold text-[#0B1C30]">
                    Security And Privacy
                  </h2>
                </div>
                <p className="mt-[14px] sm:mt-[16px] lg:mt-[18px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[1.45] text-color1 font-medium capitalize">
                  Your bank details and uploaded documents are encrypted using
                  bank-level security. We never share this sensitive
                  information with third parties.
                </p>
              </div>

              {/* ---- Need Assistance card ---- */}
              <div className={`${helpCardCls} min-h-[145px] sm:min-h-[155px] lg:min-h-[160px]`}>
                <h2 className="font-outfit text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] font-semibold leading-[1.2] text-[#0B1C30]">
                  Need Assistance?
                </h2>
                <p className="mt-[14px] sm:mt-[16px] lg:mt-[18px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[1.45] text-color1 font-medium capitalize">
                  Our onboarding team is available 24/7 to help you. complete
                  your setup.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center mt-[10px] sm:mt-[12px] lg:mt-[14px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-color4 hover:text-color-15 transition-colors duration-300 ease-in-out"
                >
                  Contact Support
                  <Svg html={contactArrow} />
                </a>
              </div>
            </div>

            {/* ================= LEFT SIDE FORM ================= */}
            <form
              className="order-2 lg:order-1 flex flex-col gap-[24px]"
              onSubmit={handleSubmit}
            >
              {/* ---------- CARD 1 : PERSONAL DETAILS ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Personal Details"
                  subtitle="The Basics So Clients Can Reach You."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[10px]">
                  <div>
                    <label className={labelCls}>Full Legal Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Professional Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    <label className={labelCls}>Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {/* ---------- CARD 2 : PROFESSIONAL EXPERTISE ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Professional Expertise"
                  subtitle="Detail Your Experience And Qualifications."
                />

                {/* Experience select + Primary skill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[10px]">
                  <div>
                    <label className={labelCls}>Years Of Experience</label>
                    <div className="relative">
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="appearance-none w-full h-[45px] sm:h-[48px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] pr-[45px] text-[13px] sm:text-[16px] text-[#9CA3AF] outline-none cursor-pointer transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]"
                      >
                        {/* Options exactly as HTML order */}
                        <option>8 Years</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>3 Years</option>
                        <option>4 Years</option>
                        <option>5 Years</option>
                        <option>6 Years</option>
                        <option>7 Years</option>
                        <option>9 Years</option>
                        <option>10+ Years</option>
                      </select>
                      <span className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                        <Svg html={selectChevron} />
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Primary Skill Set</label>
                    <input
                      type="text"
                      value={primarySkill}
                      onChange={(e) => setPrimarySkill(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Certification chip-style input + Add More.
                    Dynamic later (STEP 2/3): render saved certifications
                    as removable chips from an array. */}
                <div className="mt-[16px]">
                  <label className={labelCls}>Certifications &amp; Licenses</label>
                  <div className="flex items-center justify-between gap-[12px] h-[45px] sm:h-[48px] rounded-[8px] border border-[#9CA3AF] bg-white px-[16px]">
                    <input
                      type="text"
                      value={certification}
                      onChange={(e) => setCertification(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent text-[13px] sm:text-[16px] text-[#9CA3AF] outline-none"
                    />
                    <input
                      type="file"
                      id="certificationFile"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files?.length)
                          toast.info("Certificate upload coming soon.");
                      }}
                    />
                    <label
                      htmlFor="certificationFile"
                      className="shrink-0 inline-block px-[12px] py-[8px] rounded-[19px] border-2 border-color4 bg-transparent text-[12px] sm:text-[16px] font-medium text-color4 hover:border-color-15 hover:bg-color-15 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Add More
                    </label>
                  </div>
                </div>

                {/* Professional Bio textarea */}
                <div className="mt-[16px]">
                  <label className={labelCls}>Professional Bio</label>
                  <textarea
                    rows={5}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full min-h-[120px] sm:min-h-[140px] rounded-[8px] border border-[#9CA3AF] bg-white p-[16px] text-[13px] sm:text-[16px] text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)] resize-none"
                  ></textarea>
                </div>
              </div>

              {/* ---------- CARD 3 : UPLOAD DOCUMENTS ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Upload Documents"
                  subtitle="Verify Your Identity To Build Trust."
                />

                {/* Three dashed dropzone cards.
                    Dynamic later (STEP 2): each Browse Files stores the
                    chosen File; show filename after selection. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] sm:gap-[24px]">
                  {/* GOVERNMENT ID */}
                  <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center">
                    <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
                      <Svg html={govtIdIcon} />
                    </div>
                    <h4 className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10 capitalize">
                      Government ID
                    </h4>
                    <p className="mt-[3px] text-[10px] sm:text-[14px] text-color1">
                      Driver&apos;s License Or Passport (PDF, JPG, PNG)
                    </p>
                    <input
                      type="file"
                      id="identityFile"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="identityFile"
                      className="inline-block mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-color4 bg-transparent text-[12px] sm:text-[16px] font-medium text-color4 hover:border-color-15 hover:bg-color-15 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>

                  {/* PROFESSIONAL CERTIFICATIONS */}
                  <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center">
                    <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
                      <Svg html={certificationsIcon} />
                    </div>
                    <h4 className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10 capitalize">
                      Professional Certifications
                    </h4>
                    <p className="mt-[3px] text-[10px] sm:text-[14px] text-color1">
                      Trade Licenses Or Course Completion (PDF)
                    </p>
                    <input
                      type="file"
                      id="certDocFile"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="certDocFile"
                      className="inline-block mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-color4 bg-transparent text-[12px] sm:text-[16px] font-medium text-color4 hover:border-color-15 hover:bg-color-15 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>

                  {/* PASSPORT IMAGE */}
                  <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center sm:col-span-2">
                    <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
                      <Svg html={passportIcon} />
                    </div>
                    <h4 className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10 capitalize">
                      Passport Image
                    </h4>
                    <p className="mt-[3px] text-[10px] sm:text-[14px] text-color1">
                      Passport Size Image (JPG, PNG)
                    </p>
                    <input
                      type="file"
                      id="passportFile"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="passportFile"
                      className="inline-block mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-color4 bg-transparent text-[12px] sm:text-[16px] font-medium text-color4 hover:border-color-15 hover:bg-color-15 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>
              </div>

              {/* ---------- CARD 4 : SERVICE CATEGORIES ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Service Categories"
                  subtitle="Pick The Work You Want Bookings For."
                />

                {/* Tile grid - selected tiles get blue border/fill.
                    Dynamic later (STEP 3): replace static array with
                    GET /categories results mapped over this same markup. */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-[20px] sm:gap-[24px]">
                  {CATEGORY_TILES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`h-[100px] sm:h-[129px] rounded-[8px] border flex flex-col items-center justify-center gap-[6px] transition-all duration-300 group ${
                          isSelected
                            ? "border-color4 bg-[#F8FBFF]"
                            : "border-[#9CA3AF] bg-white hover:border-color4 hover:bg-[#F8FBFF]"
                        }`}
                      >
                        <span className="[&_svg]:w-[34px] [&_svg]:h-[34px] sm:[&_svg]:w-[42px] sm:[&_svg]:h-[42px]">
                          <Svg html={cat.icon} />
                        </span>
                        <span className="text-[11px] sm:text-[14px] font-semibold text-[#0B1C30] capitalize">
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* MORE tile (no icon, centered text like HTML) */}
                  <button
                    type="button"
                    onClick={() =>
                      toast.info("More categories coming soon.")
                    }
                    className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex items-center justify-center text-[13px] sm:text-[16px] font-semibold text-[#0B1C30] hover:border-color4 hover:bg-[#F8FBFF] hover:text-color-15 transition-all duration-300"
                  >
                    More
                  </button>
                </div>
              </div>

              {/* ---------- CARD 5 : SERVICE AREAS ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Service Areas"
                  subtitle="Where Can You Provide Your Services?"
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-[16px] lg:gap-[18px] items-start">
                  {/* LEFT: base location + radius slider */}
                  <div>
                    <label className="block mb-[7px] font-albert text-[12px] sm:text-[14px] font-semibold text-color10">
                      Base Location (City Or Zip Code)
                    </label>
                    {/* Dynamic later (STEP 4): geocode on blur and swap map */}
                    <input
                      type="text"
                      value={baseLocation}
                      onChange={(e) => setBaseLocation(e.target.value)}
                      className="w-full h-[40px] sm:h-[44px] rounded-[4px] border border-[#9CA3AF] bg-white px-[12px] sm:px-[14px] text-[10px] sm:text-[12px] text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]"
                    />

                    {/* RADIUS slider - value updates live.
                        Styling copied verbatim from HTML (webkit/moz thumbs). */}
                    <div className="mt-[16px]">
                      <div className="flex items-center justify-between mb-[6px]">
                        <label className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10">
                          Service Radius
                        </label>
                        <span className="text-[11px] sm:text-[14px] text-[#4D4632]">
                          {radiusMiles} Miles
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={40}
                        value={radiusKm}
                        onChange={(e) => setRadiusKm(Number(e.target.value))}
                        style={
                          {
                            "--value": `${
                              ((radiusKm - 1) / 39) * 100
                            }%`,
                          } as React.CSSProperties
                        }
                        className="w-full h-[8px] cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,#D8F0FC_0%,#D8F0FC_var(--value),transparent_var(--value),transparent_100%)] border border-[#68C0F2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-[#EAF7FF] [&::-webkit-slider-thumb]:bg-[#69B8ED] [&::-webkit-slider-thumb]:shadow-[0_5px_12px_rgba(39,114,204,0.25)] [&::-moz-range-thumb]:w-[28px] [&::-moz-range-thumb]:h-[28px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[4px] [&::-moz-range-thumb]:border-[#EAF7FF] [&::-moz-range-thumb]:bg-[#69B8ED] [&::-moz-range-thumb]:shadow-[0_5px_12px_rgba(39,114,204,0.25)]"
                      />
                      <div className="flex items-center justify-between mt-[12px] text-[9px] sm:text-[12px] text-[#4D4632]">
                        <span>1.6 km</span>
                        <span>40 km</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Google map embed (same URL as HTML).
                      Dynamic later (STEP 4): rebuild src from geocoded
                      coordinates when base location changes. */}
                  <div className="w-full h-[140px] sm:h-[190px] lg:h-[236px] overflow-hidden relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29468.584816619936!2d88.41123059091534!3d22.595064458284313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759bb5d7c6a9%3A0x6e0766f360bbcff4!2sKestopur%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1786737524398!5m2!1sen!2sin"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Service Area Map"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* ---------- CARD 6 : BANK DETAILS ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Bank Details"
                  subtitle="Set Up Your Payments."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px]">
                  <div>
                    <label className={labelCls}>Account Holder Name</label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>IFSC Code</label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {/* ---------- CARD 7 : REVIEW & SUBMIT ---------- */}
              <div className={cardCls}>
                <SectionHeading
                  title="Review & Submit"
                  subtitle="Double-Check Your Information Before Finishing."
                />

                {/* Checklist mirrors the HTML: 3 complete + 2 pending.
                    Dynamic later (STEP 6): compute booleans from field
                    values and swap the icon per row. */}
                <div className="w-full rounded-[8px] border border-[#9CA3AF] bg-white px-[16px] py-[16px] flex flex-col gap-[12px]">
                  {[
                    "Personal Details Complete",
                    "Professional Expertise Complete",
                    "Service Categories Selected",
                  ].map((labelText) => (
                    <div key={labelText} className="flex items-center gap-[12px] min-h-[20px]">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path
                          d="M6.75 11.25L8.75 13.25L14.25 8.25M10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75Z"
                          stroke="#030712"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                        {labelText}
                      </span>
                    </div>
                  ))}

                  {["Service Areas Pending", "Bank Details Pending"].map(
                    (labelText) => (
                      <div
                        key={labelText}
                        className="flex items-center gap-[12px] min-h-[20px]"
                      >
                        <span className="w-[22px] h-[22px] flex items-center justify-center">
                          <Svg html={mapPendingIcon} />
                        </span>
                        <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                          {labelText}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* ---------- ACTION BUTTONS ----------
                  Outline Save Draft + filled Submit Registration.
                  Both arrow icons slide on hover (group-hover). */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] sm:gap-[24px]">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="group w-full sm:w-auto flex items-center justify-center gap-[16px] sm:gap-[24px] h-[45px] sm:h-[48px] px-[24px] sm:px-[36px] rounded-[20px] border-2 border-color4 bg-white font-albert text-[13px] sm:text-[16px] font-semibold text-color4 transition-all duration-300 hover:bg-color-15 hover:text-white hover:border-color-15"
                >
                  <span>Save Draft</span>
                  <span className="[&_svg]:w-[14px] [&_svg]:h-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]">
                    <Svg html={saveArrow} />
                  </span>
                </button>

                <button
                  type="submit"
                  className="group w-full sm:w-auto flex items-center justify-center gap-[16px] sm:gap-[24px] h-[45px] sm:h-[48px] px-[24px] sm:px-[36px] rounded-[20px] border-2 border-color4 bg-color4 font-albert text-[13px] sm:text-[16px] font-semibold text-white transition-all duration-300 hover:bg-color-15 hover:border-color-15"
                >
                  <span>Submit Registration</span>
                  <span className="[&_svg]:w-[14px] [&_svg]:h-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]">
                    <Svg html={submitArrow} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
