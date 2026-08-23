"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import DynamicInput from "@/components/common/DyanmicInput";
import {
  personalInputs,
  expertiseInputs,
  bankInputs,
} from "@/services/json/provider-registration.input";
import { providerRegistrationSchema } from "@/services/validation/provider-registration.validation";
import { useRegisterProvider } from "@/hooks/useAuthHooks";
import { useProviderRegistrationStore } from "@/store/useProviderRegistrationStore";

// --- IMPORT YOUR ICONS HERE ---
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

// Styles
const cardCls =
  "w-full rounded-[25px] border border-[#E5E7EB] bg-white/75 backdrop-blur-[10px] p-[25px] sm:p-[28px] lg:p-[32px] shadow-[inset_0_1px_8px_rgba(229,231,235,0.75),0_2px_8px_rgba(229,231,235,0.35)]";
const helpCardCls =
  "w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] border border-[#B8E2FA] bg-[linear-gradient(135deg,rgba(240,249,254,0.95),rgba(255,255,255,0.82))] backdrop-blur-[10px] px-[18px] sm:px-[22px] lg:px-[30px] py-[18px] sm:py-[20px] shadow-[0_2px_8px_rgba(153,215,247,0.12)]";
const labelCls =
  "block mb-[8px] font-albert text-[14px] sm:text-[16px] font-semibold leading-none text-color10";

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

const CATEGORY_TILES = [
  { id: "plumbing", label: "Plumbing", icon: plumbingIcon },
  { id: "electrical", label: "Electrical", icon: electricalIcon },
  { id: "moving", label: "Moving", icon: movingIcon },
  { id: "gardening", label: "Gardening", icon: gardeningIcon },
  { id: "painting", label: "Painting", icon: paintingIcon },
];

export default function RegistrationProcessPage() {
  const router = useRouter();
  const registerMutation = useRegisterProvider();

  // Zustand Files & Drafts
  const {
    govtIdFile,
    certFile,
    passportFile,
    setGovtIdFile,
    setCertFile,
    setPassportFile,
    saveDraft,
    loadDraft,
  } = useProviderRegistrationStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(providerRegistrationSchema),
    defaultValues: {
      categories: [],
      service_radius: 20,
      base_location: "Kestopur,Kolkata-700102,West Bengal",
    },
  });

  // Watch fields to dynamically update UI
  const selectedCategories = watch("categories") || [];
  const radiusKm = watch("service_radius") || 20;
  const radiusMiles = Math.round(radiusKm * 0.625);

  // Load Draft on Mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) reset(draft);
  }, [loadDraft, reset]);

  // Actions
  const toggleCategory = (id: string) => {
    // Force TypeScript to recognize this as a strict array of strings
    const current = (getValues("categories") as string[]) || [];

    const updatedArray = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];

    // { shouldValidate: true } fixes the silent validation block
    setValue("categories", updatedArray, { shouldValidate: true });
  };

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "govt" | "cert" | "passport",
  ) => {
    const file = e.target.files?.[0] || null;
    if (type === "govt") setGovtIdFile(file);
    if (type === "cert") setCertFile(file);
    if (type === "passport") setPassportFile(file);
  };

  const onSubmit = async (data: any) => {
    if (!govtIdFile || !passportFile) {
      return toast.error("Government ID and Passport Image are required.");
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "categories") {
        formData.append("categories", JSON.stringify(data[key]));
      } else if (key === "confirmPassword") {
        // 🚨 Map frontend name to backend requirement!
        formData.append("password_confirmation", data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });

    if (govtIdFile) formData.append("govt_id", govtIdFile);
    if (certFile) formData.append("certification", certFile);
    if (passportFile) formData.append("passport", passportFile);

    registerMutation.mutate(formData);
  };

  // Catch silent validation errors
  const onInvalid = (errors: any) => {
    console.error("Validation Errors blocking submission:", errors);
    toast.error("Please fill in all required fields correctly.");
  };

  // Compute Review Checklist Dynamically
  const vals = watch();
  const personalDone = !!(
    vals.name &&
    vals.email &&
    vals.dob &&
    vals.phone &&
    vals.password
  );
  const expertiseDone = !!(vals.experience && vals.primary_skill && vals.bio);
  const categoriesDone = selectedCategories.length > 0;
  const areaDone = !!vals.base_location;
  const bankDone = !!(
    vals.account_holder &&
    vals.bank_name &&
    vals.ifsc_code &&
    vals.account_number
  );

  return (
    <main>
      <section className="w-full bg-white py-[32px] sm:py-[40px] md:py-[50px] lg:py-[60px]">
        <div className="w-full max-w-[1350px] mx-auto px-[16px] sm:px-[20px] lg:px-[15px]">
          <h2 className="font-outfit text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-semibold leading-[1.2] text-color5 mb-[20px] lg:mb-[24px]">
            Complete Your Professional Profile
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.3fr)_minmax(280px,1fr)] gap-[18px] items-start">
            {/* RIGHT SIDE */}
            <div className="order-1 lg:order-2 flex flex-col gap-[24px]">
              <div
                className={`${helpCardCls} min-h-[190px] sm:min-h-[200px] lg:min-h-[207px]`}
              >
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
                  receive 40% more booking requests on average. Take the time to
                  highlight what makes your service exceptional.
                </p>
              </div>

              <div
                className={`${helpCardCls} min-h-[150px] sm:min-h-[160px] lg:min-h-[165px]`}
              >
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
                  bank-level security. We never share this sensitive information
                  with third parties.
                </p>
              </div>

              <div
                className={`${helpCardCls} min-h-[145px] sm:min-h-[155px] lg:min-h-[160px]`}
              >
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

            {/* LEFT SIDE (Dynamic Form) */}
            <form
              className="order-2 lg:order-1 flex flex-col gap-[24px]"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
            >
              {/* 1. Personal Details */}
              <div className={cardCls}>
                <SectionHeading
                  title="Personal Details"
                  subtitle="The Basics So Clients Can Reach You."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[10px]">
                  {personalInputs.map((inp) => (
                    <DynamicInput
                      key={inp.name}
                      name={inp.name}
                      label={inp.label}
                      type={inp.type}
                      register={register}
                      error={
                        errors[inp.name as keyof typeof errors]
                          ?.message as string
                      }
                    />
                  ))}
                </div>
              </div>

              {/* 2. Professional Expertise */}
              <div className={cardCls}>
                <SectionHeading
                  title="Professional Expertise"
                  subtitle="Detail Your Experience And Qualifications."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[10px]">
                  {expertiseInputs.map((inp) => (
                    <DynamicInput
                      key={inp.name}
                      {...inp}
                      register={register}
                      error={
                        errors[inp.name as keyof typeof errors]
                          ?.message as string
                      }
                    />
                  ))}
                </div>
                <div className="mt-[16px]">
                  <label className={labelCls}>Professional Bio</label>
                  <textarea
                    rows={5}
                    {...register("bio")}
                    className="w-full min-h-[120px] rounded-[8px] border border-[#9CA3AF] p-[16px] outline-none focus:border-[#AEB6C0] resize-none"
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bio.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Upload Documents */}
              <div className={cardCls}>
                <SectionHeading
                  title="Upload Documents"
                  subtitle="Verify Your Identity To Build Trust."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                  <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center">
                    <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
                      <Svg html={govtIdIcon} />
                    </div>
                    <h4 className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10">
                      Government ID
                    </h4>
                    <p className="mt-[3px] text-[10px] sm:text-[14px] text-color1">
                      {govtIdFile
                        ? govtIdFile.name
                        : "Driver's License Or Passport (PDF, JPG, PNG)"}
                    </p>
                    <input
                      type="file"
                      id="govtId"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFile(e, "govt")}
                    />
                    <label
                      htmlFor="govtId"
                      className="inline-block mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-color4 text-color4 hover:bg-color-15 hover:text-white cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>

                  <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center">
                    <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
                      <Svg html={certificationsIcon} />
                    </div>
                    <h4 className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10">
                      Certifications
                    </h4>
                    <p className="mt-[3px] text-[10px] sm:text-[14px] text-color1">
                      {certFile ? certFile.name : "Trade Licenses (PDF)"}
                    </p>
                    <input
                      type="file"
                      id="certFile"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFile(e, "cert")}
                    />
                    <label
                      htmlFor="certFile"
                      className="inline-block mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-color4 text-color4 hover:bg-color-15 hover:text-white cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>

                  <div className="min-h-[192px] rounded-[8px] border-2 border-dashed border-[#C2E6FB] bg-[#F8F9FF] px-[24px] py-[14px] flex flex-col items-center justify-center text-center sm:col-span-2">
                    <div className="w-[48px] h-[48px] flex items-center justify-center mb-[5px]">
                      <Svg html={passportIcon} />
                    </div>
                    <h4 className="font-albert text-[12px] sm:text-[16px] font-semibold text-color10">
                      Passport Image
                    </h4>
                    <p className="mt-[3px] text-[10px] sm:text-[14px] text-color1">
                      {passportFile
                        ? passportFile.name
                        : "Passport Size Image (JPG, PNG)"}
                    </p>
                    <input
                      type="file"
                      id="passportFile"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFile(e, "passport")}
                    />
                    <label
                      htmlFor="passportFile"
                      className="inline-block mt-[24px] px-[12px] py-[8px] rounded-[19px] border-2 border-color4 text-color4 hover:bg-color-15 hover:text-white cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>
              </div>

              {/* 4. Categories */}
              <div className={cardCls}>
                <SectionHeading
                  title="Service Categories"
                  subtitle="Pick The Work You Want Bookings For."
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-[20px] sm:gap-[24px]">
                  {CATEGORY_TILES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className={`h-[100px] sm:h-[129px] rounded-[8px] border flex flex-col items-center justify-center gap-[6px] transition-all duration-300 ${
                        selectedCategories.includes(cat.id)
                          ? "border-color4 bg-[#F8FBFF]"
                          : "border-[#9CA3AF] bg-white hover:border-color4 hover:bg-[#F8FBFF]"
                      }`}
                    >
                      <span>
                        <Svg html={cat.icon} />
                      </span>
                      <span className="text-[11px] sm:text-[14px] font-semibold text-[#0B1C30]">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.categories.message as string}
                  </p>
                )}
              </div>

              {/* 5. Service Areas */}
              <div className={cardCls}>
                <SectionHeading
                  title="Service Areas"
                  subtitle="Where Can You Provide Your Services?"
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-[16px] lg:gap-[18px] items-start">
                  {/* LEFT: base location + radius slider */}
                  <div>
                    <label className={labelCls}>Base Location</label>
                    <input
                      type="text"
                      {...register("base_location")}
                      className="w-full h-[40px] sm:h-[44px] rounded-[4px] border border-[#9CA3AF] bg-white px-[12px] sm:px-[14px] text-[10px] sm:text-[12px] text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#AEB6C0] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(174,182,192,0.10)]"
                    />

                    {/* RADIUS slider with restored gradient and thumb styles */}
                    <div className="mt-[16px]">
                      <div className="flex justify-between mb-[6px]">
                        <label className={labelCls}>Service Radius</label>
                        <span className="text-[11px] sm:text-[14px] text-[#4D4632]">
                          {radiusMiles} Miles
                        </span>
                      </div>

                      <input
                        type="range"
                        min={1}
                        max={40}
                        {...register("service_radius")}
                        style={
                          {
                            "--value": `${((radiusKm - 1) / 39) * 100}%`,
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

                  {/* RIGHT: Restored Google map embed */}
                  <div className="w-full h-[140px] sm:h-[190px] lg:h-[236px] overflow-hidden relative rounded-[8px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29468.584816619936!2d88.41123059091534!3d22.595064458284313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759bb5d7c6a9%3A0x6e0766f360bbcff4!2sKestopur%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1786737524398!5m2!1sen!2sin"
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Service Area Map"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* 6. Bank Details */}
              <div className={cardCls}>
                <SectionHeading
                  title="Bank Details"
                  subtitle="Set Up Your Payments."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  {bankInputs.map((inp) => (
                    <DynamicInput
                      key={inp.name}
                      {...inp}
                      register={register}
                      error={
                        errors[inp.name as keyof typeof errors]
                          ?.message as string
                      }
                    />
                  ))}
                </div>
              </div>

              {/* 7. Checklist dynamically updated via watch() */}
              <div className={cardCls}>
                <SectionHeading
                  title="Review & Submit"
                  subtitle="Double-Check Your Information Before Finishing."
                />
                <div className="w-full rounded-[8px] border border-[#9CA3AF] p-[16px] flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[12px]">
                    {personalDone ? (
                      <Svg html={checkIcon} />
                    ) : (
                      <Svg html={mapPendingIcon} />
                    )}{" "}
                    <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                      Personal Details
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    {expertiseDone ? (
                      <Svg html={checkIcon} />
                    ) : (
                      <Svg html={mapPendingIcon} />
                    )}{" "}
                    <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                      Professional Expertise
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    {categoriesDone ? (
                      <Svg html={checkIcon} />
                    ) : (
                      <Svg html={mapPendingIcon} />
                    )}{" "}
                    <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                      Service Categories
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    {areaDone ? (
                      <Svg html={checkIcon} />
                    ) : (
                      <Svg html={mapPendingIcon} />
                    )}{" "}
                    <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                      Service Areas
                    </span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    {bankDone ? (
                      <Svg html={checkIcon} />
                    ) : (
                      <Svg html={mapPendingIcon} />
                    )}{" "}
                    <span className="font-albert text-[12px] sm:text-[16px] leading-[1.3] text-[#374151]">
                      Bank Details
                    </span>
                  </div>
                </div>
              </div>

              {/* 8. Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] sm:gap-[24px]">
                <button
                  type="button"
                  onClick={() => saveDraft(getValues())}
                  className="group w-full sm:w-auto flex items-center justify-center gap-[16px] sm:gap-[24px] h-[45px] sm:h-[48px] px-[24px] sm:px-[36px] rounded-[20px] border-2 border-color4 bg-white font-albert text-[13px] sm:text-[16px] font-semibold text-color4 transition-all duration-300 hover:bg-color-15 hover:text-white hover:border-color-15"
                >
                  <span>Save Draft</span>
                  <span className="[&_svg]:w-[14px] [&_svg]:h-[10px] shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]">
                    <Svg html={saveArrow} />
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="group w-full sm:w-auto flex items-center justify-center gap-[16px] sm:gap-[24px] h-[45px] sm:h-[48px] px-[24px] sm:px-[36px] rounded-[20px] border-2 border-color4 bg-color4 font-albert text-[13px] sm:text-[16px] font-semibold text-white transition-all duration-300 hover:bg-color-15 hover:border-color-15"
                >
                  <span>
                    {registerMutation.isPending
                      ? "Submitting..."
                      : "Submit Registration"}
                  </span>
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
