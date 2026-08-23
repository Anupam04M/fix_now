// "use client";

// // src/app/(customerpanel)/work-with-us/registration-modal.tsx
// // ================================================================
// // Provider registration form, converted 1:1 from
// // FIX_Now_HTML/FIX_Now/registration-process.html (lines 482-1547).
// // Same markup, same order, same classes, same demo values.
// // ================================================================

// import React, { useState } from "react";
// import { toast } from "sonner";
// import { useAuthStore } from "@/store/useAuthStore";
// import { SignupPayload } from "@/types/interface/auth.interface";
// import {
//   selectChevron,
//   govtIdIcon,
//   certificationsIcon,
//   passportIcon,
//   plumbingIcon,
//   electricalIcon,
//   movingIcon,
//   gardeningIcon,
//   paintingIcon,
//   saveArrow,
//   submitArrow,
//   checkIcon,
//   mapPendingIcon,
//   standOutIcon,
//   securityIcon,
//   contactArrow,
// } from "./registration-assets";

// const sectionCard =
//   "w-full rounded-[25px] border border-[#E5E7EB] bg-white/75 backdrop-blur-[10px] p-[25px] sm:p-[28px] lg:p-[32px] shadow-[inset_0_1px_8px_rgba(229,231,235,0.75),0_2px_8px_rgba(229,231,235,0.35)]";

// const helpCard =
//   "w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] border border-[#B8E2FA] bg-[linear-gradient(135deg,rgba(240,249,254,0.95),rgba(255,255,255,0.82))] backdrop-blur-[10px] px-[18px] sm:px-[22px] lg:px-[30px] py-[18px] sm:py-[20px] lg:py-[20px] shadow-[0_2px_8px_rgba(153,215,247,0.12)]";

// const labelCls =
//   "block mb-[8px] font-[var(--albert-sans-r)] text-[14px] sm:text-[16px] font-semibold leading-none text-[var(--color10)]";

// const inputCls =
//   "w-full h-[45px] sm:h-[48px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] text-[13px] sm:text-[16px] text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]";

// const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
//   <div className="mb-[24px]">
//     <h3 className="font-[var(--outfit-r)] text-[15px] sm:text-[18px] lg:text-[24px] font-semibold leading-[1.2] text-[var(--color10)]">
//       {title}
//     </h3>
//     <p className="mt-[8px] text-[12px] sm:text-[16px] leading-[1.3] text-[var(--color1)] capitalize">
//       {subtitle}
//     </p>
//   </div>
// );

// const Svg = ({ html }: { html: string }) => (
//   <span dangerouslySetInnerHTML={{ __html: html }} />
// );

// export default function RegistrationModal({ onClose }: { onClose: () => void }) {
//   const { signupUser, isLoading } = useAuthStore();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!fullName.trim() || !email.trim() || !password) {
//       toast.error("Please fill in your name, email and password.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     const nameParts = fullName.trim().split(/\s+/);
//     const payload: SignupPayload = {
//       firstName: nameParts[0] || "",
//       lastName: nameParts.slice(1).join(" ") || "",
//       phone,
//       email,
//       password,
//       confirmPassword,
//     };

//     try {
//       const res = await signupUser(payload, "provider");
//       if (res.success) {
//         toast.success(res.message || "Registration submitted successfully!");
//         onClose();
//       } else {
//         toast.error(res.message || "Registration failed.");
//       }
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Something went wrong.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
//       <div className="relative w-full max-w-[1350px] my-[32px] rounded-[16px] bg-white border-0 p-[20px] sm:p-[28px] lg:p-[32px] shadow-[4px_0_18.5px_0_#D1D5DB]">
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-[15px] top-[15px] z-50 text-[32px] leading-none text-black"
//           aria-label="Close"
//         >
//           &times;
//         </button>

//         <div className="overflow-y-auto hide-scrollbar max-h-[80vh]">
//           <h2 className="font-[var(--outfit-r)] text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-semibold leading-[1.2] text-[var(--color5)] mb-[20px] lg:mb-[24px]">
//             Complete Your Professional Profile
//           </h2>

//           <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.3fr)_minmax(280px,1fr)] gap-[18px] items-start">
//             {/* LEFT SIDE FORM */}
//             <form className="order-2 lg:order-1 flex flex-col gap-[24px]" onSubmit={handleSubmit}>
//               {/* PERSONAL DETAILS */}
//               <div className={sectionCard}>
//                 <div className="mb-[10px]">
//                   <h3 className="font-[var(--outfit-r)] text-[15px] sm:text-[18px] lg:text-[24px] font-semibold leading-[1.2] text-[var(--color10)]">
//                     Personal Details
//                   </h3>
//                   <p className="mt-[8px] text-[12px] sm:text-[16px] leading-[1.3] text-[var(--color1)] capitalize">
//                     The Basics So Clients Can Reach You.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[10px]">
//                   <div>
//                     <label className={labelCls}>Full Legal Name</label>
//                     <input
//                       type="text"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       placeholder="Enter your full name"
//                       className={inputCls}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelCls}>Professional Email</label>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       className={inputCls}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelCls}>Phone Number</label>
//                     <input
//                       type="text"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       placeholder="+91 XXXXX XXXXX"
//                       className={inputCls}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelCls}>Password</label>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Create a password"
//                       className={inputCls}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelCls}>Confirm Password</label>
//                     <input
//                       type="password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="Re-enter your password"
//                       className={inputCls}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* PROFESSIONAL EXPERTISE */}
//               <div className={sectionCard}>
//                 <div className="mb-[10px]">
//                   <h3 className="font-[var(--outfit-r)] text-[15px] sm:text-[18px] lg:text-[24px] font-semibold leading-[1.2] text-[var(--color10)]">
//                     Professional Expertise
//                   </h3>
//                   <p className="mt-[8px] text-[12px] sm:text-[16px] leading-[1.3] text-[var(--color1)] capitalize">
//                     Detail Your Experience And Qualifications.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[10px]">
//                   <div>
//                     <label className={labelCls}>Years Of Experience</label>
//                     <div className="relative">
//                       <select
//                         defaultValue="8 Years"
//                         className="appearance-none w-full h-[45px] sm:h-[48px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] pr-[45px] text-[13px] sm:text-[16px] text-[#9CA3AF] outline-none cursor-pointer transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]"
//                       >
//                         <option>8 Years</option>
//                         <option>1 Year</option>
//                         <option>2 Years</option>
//                         <option>3 Years</option>
//                         <option>4 Years</option>
//                         <option>5 Years</option>
//                         <option>6 Years</option>
//                         <option>7 Years</option>
//                         <option>9 Years</option>
//                         <option>10+ Years</option>
//                       </select>
//                       <Svg html={selectChevron} />
//                     </div>
//                   </div>

//                   <div>
//                     <label className={labelCls}>Primary Skill Set</label>
//                     <input
//                       type="text"
//                       defaultValue="Residential plumbing & pipe repair"
//                       className={inputCls}
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-[16px]">
//                   <label className={labelCls}>Certifications &amp; Licenses</label>
//                   <div className="min-h-[70px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] py-[10px] text-[13px] sm:text-[16px] text-[#9CA3AF]">
//                     <div className="flex flex-wrap items-center justify-between">
//                       <span>Skill India – Plumbing Technician Certification</span>
//                     </div>
//                     <button
//                       type="button"
//                       className="mt-[16px] text-[13px] sm:text-[14px] font-semibold text-[#374151] hover:text-[var(--color-15)] transition-colors duration-300 ease-in-out"
//                     >
//                       Add More
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mt-[16px]">
//                   <div className="flex items-center justify-between mb-[8px]">
//                     <label className="font-[var(--albert-sans-r)] text-[14px] sm:text-[16px] font-semibold leading-none text-[var(--color10)]">
//                       Professional Bio
//                     </label>
//                     <span className="text-[11px] sm:text-[12px] text-[#8B929B]">0 / 500</span>
//                   </div>
//                   <textarea
//                     rows={5}
//                     defaultValue="Experienced and customer-focused AC technician specializing in residential and commercial air conditioning systems. Skilled in diagnostics, repairs, preventive maintenance, gas refilling, and installation. Committed to delivering timely, reliable, and high-quality service with complete customer satisfaction."
//                     className="resize-none w-full h-[120px] sm:h-[130px] rounded-[4px] border border-[#9CA3AF] bg-white px-[16px] py-[12px] text-[13px] sm:text-[16px] leading-[1.4] text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]"
//                   />
//                 </div>
//               </div>

//               {/* UPLOAD DOCUMENTS */}
//               <div className={sectionCard}>
//                 <SectionHeading
//                   title="Upload Documents"
//                   subtitle="Verify Your Identity And Qualifications."
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] sm:gap-[24px]">
//                   {/* GOVERNMENT ID */}
//                   <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center">
//                     <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
//                       <Svg html={govtIdIcon} />
//                     </div>
//                     <h4 className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] font-semibold text-[var(--color10)] capitalize">
//                       Government ID
//                     </h4>
//                     <p className="mt-[3px] text-[10px] sm:text-[14px] text-[var(--color1)]">
//                       Driver&apos;s License Or Passport (PDF, JPG, PNG)
//                     </p>
//                     <button
//                       type="button"
//                       className="mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-[var(--color4)] bg-transparent text-[12px] sm:text-[16px] font-medium text-[var(--color4)] hover:border-[var(--color-15)] hover:bg-[var(--color-15)] hover:text-white transition-all duration-300 ease-in-out"
//                     >
//                       Browse Files
//                     </button>
//                   </div>

//                   {/* PROFESSIONAL CERTIFICATIONS */}
//                   <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center">
//                     <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
//                       <Svg html={certificationsIcon} />
//                     </div>
//                     <h4 className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] font-semibold text-[var(--color10)] capitalize">
//                       Professional Certifications
//                     </h4>
//                     <p className="mt-[3px] text-[10px] sm:text-[14px] text-[var(--color1)]">
//                       Licenses Or Diplomas (PDF, JPG, PNG)
//                     </p>
//                     <button
//                       type="button"
//                       className="mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-[var(--color4)] bg-transparent text-[12px] sm:text-[16px] font-medium text-[var(--color4)] hover:border-[var(--color-15)] hover:bg-[var(--color-15)] hover:text-white transition-all duration-300 ease-in-out"
//                     >
//                       Browse Files
//                     </button>
//                   </div>

//                   {/* PASSPORT IMAGE */}
//                   <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center sm:col-span-1">
//                     <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
//                       <Svg html={passportIcon} />
//                     </div>
//                     <h4 className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] font-semibold text-[var(--color10)] capitalize">
//                       Passport Image
//                     </h4>
//                     <p className="mt-[3px] text-[10px] sm:text-[14px] text-[var(--color1)]">
//                       Passport Size Image (JPG, PNG)
//                     </p>
//                     <button
//                       type="button"
//                       className="mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-[var(--color4)] bg-transparent text-[12px] sm:text-[16px] font-medium text-[var(--color4)] hover:border-[var(--color-15)] hover:bg-[var(--color-15)] hover:text-white transition-all duration-300 ease-in-out"
//                     >
//                       Browse Files
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* SERVICE CATEGORIES */}
//               <div className={sectionCard}>
//                 <SectionHeading
//                   title="Service Categories"
//                   subtitle="Select All Areas Where You Offer Professional Services."
//                 />

//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-[20px] sm:gap-[24px]">
//                   <button
//                     type="button"
//                     className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-[var(--color4)] hover:bg-[#F8FBFF] group"
//                   >
//                     <span className="h-[30px] w-[30px] sm:w-[45px] sm:h-[45px] mb-[12px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
//                       <Svg html={plumbingIcon} />
//                     </span>
//                     <span className="text-[13px] sm:text-[16px] font-semibold text-[#0B1C30]">
//                       Plumbing
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-[var(--color4)] hover:bg-[#F8FBFF] group"
//                   >
//                     <span className="h-[30px] w-[30px] sm:w-[45px] sm:h-[45px] mb-[12px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
//                       <Svg html={electricalIcon} />
//                     </span>
//                     <span className="text-[13px] sm:text-[16px] font-semibold text-[#0B1C30]">
//                       Electrical
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-[var(--color4)] hover:bg-[#F8FBFF] group"
//                   >
//                     <span className="h-[30px] w-[30px] sm:w-[45px] sm:h-[45px] mb-[12px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
//                       <Svg html={movingIcon} />
//                     </span>
//                     <span className="text-[13px] sm:text-[16px] font-semibold text-[#0B1C30]">
//                       Moving
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-[var(--color4)] hover:bg-[#F8FBFF] group"
//                   >
//                     <span className="h-[30px] w-[30px] sm:w-[45px] sm:h-[45px] mb-[12px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
//                       <Svg html={gardeningIcon} />
//                     </span>
//                     <span className="text-[13px] sm:text-[16px] font-semibold text-[#0B1C30]">
//                       Gardening
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-[var(--color4)] hover:bg-[#F8FBFF] group"
//                   >
//                     <span className="h-[30px] w-[30px] sm:w-[45px] sm:h-[45px] mb-[12px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
//                       <Svg html={paintingIcon} />
//                     </span>
//                     <span className="text-[13px] sm:text-[16px] font-semibold text-[#0B1C30]">
//                       Painting
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     className="h-[100px] sm:h-[129px] rounded-[8px] border border-[#9CA3AF] bg-white flex items-center justify-center text-[13px] sm:text-[16px] font-semibold text-[#0B1C30] hover:border-[var(--color4)] hover:bg-[#F8FBFF] hover:text-[var(--color-15)] transition-all duration-300 group"
//                   >
//                     + 3 More
//                   </button>
//                 </div>
//               </div>

//               {/* SERVICE AREAS */}
//               <div className={sectionCard}>
//                 <SectionHeading
//                   title="Service Areas"
//                   subtitle="Where Can You Provide Your Services?"
//                 />

//                 <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-[16px] lg:gap-[18px] items-start">
//                   <div>
//                     <label className="block mb-[7px] font-[var(--albert-sans-r)] text-[12px] sm:text-[14px] font-semibold text-[var(--color10)]">
//                       Base Location (City Or Zip Code)
//                     </label>
//                     <input
//                       type="text"
//                       defaultValue="Kestopur,Kolkata-700102,West Bengal"
//                       className={inputCls}
//                     />

//                     <div className="mt-[16px]">
//                       <div className="flex items-center justify-between mb-[6px]">
//                         <label className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] font-semibold text-[var(--color10)]">
//                           Service Radius
//                         </label>
//                         <span className="text-[11px] sm:text-[14px] text-[#4D4632]">25 Miles</span>
//                       </div>

//                       <input
//                         type="range"
//                         min="1"
//                         max="40"
//                         defaultValue="20"
//                         onInput={(e) => {
//                           const el = e.currentTarget;
//                           el.style.setProperty(
//                             "--value",
//                             ((Number(el.value) - Number(el.min)) /
//                               (Number(el.max) - Number(el.min))) *
//                               100 +
//                               "%",
//                           );
//                         }}
//                         style={{ "--value": "48.7%" } as React.CSSProperties}
//                         className="w-full h-[8px] cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,#D8F0FC_0%,#D8F0FC_var(--value),transparent_var(--value),transparent_100%)] border border-[#68C0F2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-[#EAF7FF] [&::-webkit-slider-thumb]:bg-[#69B8ED] [&::-webkit-slider-thumb]:shadow-[0_5px_12px_rgba(39,114,204,0.25)] [&::-moz-range-thumb]:w-[28px] [&::-moz-range-thumb]:h-[28px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[4px] [&::-moz-range-thumb]:border-[#EAF7FF] [&::-moz-range-thumb]:bg-[#69B8ED] [&::-moz-range-thumb]:shadow-[0_5px_12px_rgba(39,114,204,0.25)]"
//                       />

//                       <div className="flex items-center justify-between mt-[12px] text-[9px] sm:text-[12px] text-[#4D4632]">
//                         <span> 1.6 km </span>
//                         <span> 40 km </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full h-[140px] sm:h-[190px] lg:h-[236px] overflow-hidden relative">
//                     <iframe
//                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29468.584816619936!2d88.41123059091534!3d22.595064458284313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759bb5d7c6a9%3A0x6e0766f360bbcff4!2sKestopur%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1786737524398!5m2!1sen!2sin"
//                       width="600"
//                       height="450"
//                       style={{ border: 0 }}
//                       allowFullScreen
//                       loading="lazy"
//                       referrerPolicy="strict-origin-when-cross-origin"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* BANK DETAILS */}
//               <div className={sectionCard}>
//                 <SectionHeading title="Bank Details" subtitle="Set Up Your Payments." />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[16px]">
//                   <div>
//                     <label className={labelCls}>Account Holder Name</label>
//                     <input type="text" defaultValue="Rahul Sharma" className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Bank Name</label>
//                     <input type="text" defaultValue="State Bank Of India" className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>IFSC Code</label>
//                     <input type="text" defaultValue="SBIN0001234" className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Account Number</label>
//                     <input type="text" defaultValue="123456789012" className={inputCls} />
//                   </div>
//                 </div>
//               </div>

//               {/* REVIEW & SUBMIT */}
//               <div className={sectionCard}>
//                 <SectionHeading
//                   title="Review & Submit"
//                   subtitle="Double-Check Your Information Before Finishing."
//                 />

//                 <div className="w-full rounded-[8px] border border-[#9CA3AF] bg-white px-[16px] py-[16px] flex flex-col gap-[12px]">
//                   <div className="flex items-center gap-[12px] min-h-[20px]">
//                     <span className="shrink-0">
//                       <Svg html={checkIcon} />
//                     </span>
//                     <span className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
//                       Personal Details Complete
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-[12px] min-h-[20px]">
//                     <span className="shrink-0">
//                       <Svg html={checkIcon} />
//                     </span>
//                     <span className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
//                       Professional Expertise Complete
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-[12px] min-h-[20px]">
//                     <span className="shrink-0">
//                       <Svg html={checkIcon} />
//                     </span>
//                     <span className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
//                       Service Categories Selected
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-[12px] min-h-[20px]">
//                     <span className="shrink-0">
//                       <Svg html={mapPendingIcon} />
//                     </span>
//                     <span className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] leading-[1.3] text-[#9CA3AF]">
//                       Service Areas Pending
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-[12px] min-h-[20px]">
//                     <span className="shrink-0">
//                       <Svg html={mapPendingIcon} />
//                     </span>
//                     <span className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] leading-[1.3] text-[#9CA3AF]">
//                       Documents Pending
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-[12px] min-h-[20px]">
//                     <span className="shrink-0">
//                       <Svg html={checkIcon} />
//                     </span>
//                     <span className="font-[var(--albert-sans-r)] text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
//                       Bank Details Pending
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] sm:gap-[24px]">
//                 <button
//                   type="button"
//                   className="group w-full sm:w-auto flex items-center justify-center gap-[16px] sm:gap-[24px] h-[45px] sm:h-[48px] px-[24px] sm:px-[36px] rounded-[20px] border-2 border-[var(--color4)] bg-white font-[var(--albert-sans-r)] text-[13px] sm:text-[16px] font-semibold text-[var(--color4)] transition-all duration-300 hover:bg-[var(--color-15)] hover:text-white hover:border-[var(--color-15)]"
//                 >
//                   <span> Save Draft </span>
//                   <span className="shrink-0">
//                     <Svg html={saveArrow} />
//                   </span>
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="group w-full sm:w-auto flex items-center justify-center gap-[16px] sm:gap-[24px] h-[45px] sm:h-[48px] px-[24px] sm:px-[36px] rounded-[20px] border-2 border-[var(--color4)] bg-[var(--color4)] font-[var(--albert-sans-r)] text-[13px] sm:text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[var(--color-15)] hover:border-[var(--color-15)] disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <span>
//                     {isLoading ? "Submitting..." : "Submit Registration"}
//                   </span>
//                   <span className="shrink-0">
//                     <Svg html={submitArrow} />
//                   </span>
//                 </button>
//               </div>
//             </form>

//             {/* RIGHT SIDE HELP CARDS */}
//             <div className="order-1 lg:order-2 flex flex-col gap-[24px]">
//               {/* STAND OUT */}
//               <div className={`${helpCard} min-h-[190px] sm:min-h-[200px] lg:min-h-[207px]`}>
//                 <div className="flex items-center">
//                   <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] shrink-0 rounded-[10px] bg-[#9DD8F6] flex items-center justify-center mr-[12px] sm:mr-[14px] lg:mr-[16px]">
//                     <Svg html={standOutIcon} />
//                   </div>
//                   <h2 className="font-[var(--outfit-r)] text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] font-semibold text-[#0B1C30]">
//                     Stand Out
//                   </h2>
//                 </div>
//                 <p className="mt-[18px] sm:mt-[20px] lg:mt-[24px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[1.45] text-[var(--color1)] font-medium capitalize">
//                   Profiles with detailed bios and specific certifications receive 40% more booking
//                   requests on average. Take the time to highlight what makes your service
//                   exceptional.
//                 </p>
//               </div>

//               {/* SECURITY AND PRIVACY */}
//               <div className={`${helpCard} min-h-[150px] sm:min-h-[160px] lg:min-h-[165px]`}>
//                 <div className="flex items-center">
//                   <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] shrink-0 rounded-[10px] bg-[#9DD8F6] flex items-center justify-center mr-[12px] sm:mr-[14px] lg:mr-[16px]">
//                     <Svg html={securityIcon} />
//                   </div>
//                   <h2 className="font-[var(--outfit-r)] text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] font-semibold text-[#0B1C30]">
//                     Security And Privacy
//                   </h2>
//                 </div>
//                 <p className="mt-[18px] sm:mt-[20px] lg:mt-[24px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[1.45] text-[var(--color1)] font-medium capitalize">
//                   Your bank details and uploaded documents are encrypted using bank-level security.
//                   We never share this sensitive information publicly.
//                 </p>
//               </div>

//               {/* NEED ASSISTANCE */}
//               <div className={`${helpCard} min-h-[145px] sm:min-h-[155px] lg:min-h-[160px]`}>
//                 <h2 className="font-[var(--outfit-r)] text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] font-semibold leading-[1.2] text-[#0B1C30]">
//                   Need Assistance?
//                 </h2>
//                 <p className="mt-[14px] sm:mt-[16px] lg:mt-[18px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[1.45] text-[var(--color1)] font-medium capitalize">
//                   Our onboarding team is available 24/7 to help you. complete your setup.
//                 </p>
//                 <a
//                   href="#"
//                   className="inline-flex items-center mt-[10px] sm:mt-[12px] lg:mt-[14px] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[var(--color4)] hover:text-[var(--color-15)] transition-colors duration-300 ease-in-out"
//                 >
//                   Contact Support
//                   <span className="ml-[6px] sm:ml-[12px] lg:ml-[15px] w-[10px] h-[8px] sm:w-[15px] sm:h-[13px] lg:w-[19px] lg:h-[16px]">
//                     <Svg html={contactArrow} />
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }