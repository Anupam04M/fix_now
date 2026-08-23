"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  ChevronDown,
  LocateFixed,
  ImagePlus,
  MessageSquare,
  MessageCircle,
  Mail,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

import DynamicInput from "../components/common/DyanmicInput";
import {
  personalInfoInputs,
  addressInfoInputs,
  additionalInfoInputs,
  selectOptions,
} from "@/services/json/profile.input";
import {
  completeAccountSchema,
  CompleteAccountPayload,
} from "@/services/validation/profile.validation";
import {
  addAddressFn,
  updateProfileFn,
} from "@/api/api-function/profile.function";
import { useProfileStore } from "@/store/useProfileStore";
// Use your Zustand store!

interface CompleteAccountModalProps {
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}

export default function CompleteAccountModal({
  onClose,
  onSubmitSuccess,
}: CompleteAccountModalProps) {
  const router = useRouter();

  // Bring in the Zustand store for the image
  const { profile, updateProfile, resetProfileStore } = useProfileStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset the store when the modal opens so it's a completely blank slate
  useEffect(() => {
    resetProfileStore();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteAccountPayload>({
    resolver: yupResolver(
      completeAccountSchema,
    ) as Resolver<CompleteAccountPayload>,
    defaultValues: { smsNotif: false, whatsappNotif: false, emailNotif: false },
  });

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024)
        return toast.error("Image must be smaller than 2MB");
      updateProfile({
        avatarFile: file,
        avatarPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      toast.info("Fetching location...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          toast.success("Location captured!");
        },
        () => toast.error("Failed to fetch location."),
      );
    }
  };

  const onSubmitForm = async (data: CompleteAccountPayload) => {
    setIsSubmitting(true);
    try {
      // 1. Prepare Profile Data (Text + Image)
      const profilePayload: any = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,

        // FIX: Match these keys EXACTLY to what your backend expects!
        alternate_phone: data.altPhone,
        language: data.language,
        date_of_birth: data.dob,
        gender: data.gender,
      };

      if (profile.avatarFile) {
        // FIX: Send the file using 'profile_image' instead of 'avatar'
        profilePayload.customer_image = profile.avatarFile;
      }

      await updateProfileFn(profilePayload);

      // 2. Prepare Address Data
      const addressPayload = {
        label: "Home",
        contact_person: data.fullName,
        contact_phone: data.phone,
        address_line_1: data.houseBuildingNo,
        address_line_2: data.streetLocality,
        city: data.city,
        state: data.state,
        postal_code: data.pinCode,
        landmark: data.landmark || "",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        is_default: true,
      };

      await addAddressFn(addressPayload);

      toast.success("Account profile and address saved!");
      resetProfileStore(); // Clean up Zustand
      router.push("/");

      if (onSubmitSuccess) setTimeout(() => onSubmitSuccess(), 500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#F4F7FA] font-sans">
      <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F]">
            Complete Your Account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* PERSONAL INFO CARD */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              {personalInfoInputs.map((field) => (
                <DynamicInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  register={register}
                  error={
                    errors[field.name as keyof CompleteAccountPayload]
                      ?.message as string
                  }
                />
              ))}
            </div>
          </div>

          {/* ADDRESS INFO CARD */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              {addressInfoInputs.map((field) => (
                <React.Fragment key={field.name}>
                  <div
                    className={field.name === "landmark" ? "md:col-span-1" : ""}
                  >
                    <DynamicInput
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      register={register}
                      error={
                        errors[field.name as keyof CompleteAccountPayload]
                          ?.message as string
                      }
                    />
                  </div>
                  {field.name === "city" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        State
                      </label>
                      <div className="relative">
                        <select
                          {...register("state")}
                          className="w-full h-11 rounded-lg border border-gray-200 px-4 outline-none"
                        >
                          <option value="" disabled>
                            Select State
                          </option>
                          {selectOptions.state.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {field.name === "pinCode" && (
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={handleLocationClick}
                        className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-[#2B60A8] text-[#2B60A8] font-semibold text-sm hover:bg-blue-50"
                      >
                        Use Current Location <LocateFixed size={18} />
                      </button>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ADDITIONAL INFO CARD (WITH IMAGE) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-5">
                {additionalInfoInputs.map((field) => (
                  <DynamicInput
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    register={register}
                    error={
                      errors[field.name as keyof CompleteAccountPayload]
                        ?.message as string
                    }
                  />
                ))}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Preferred Language
                  </label>
                  <select
                    {...register("language")}
                    className="w-full h-11 rounded-lg border border-gray-200 px-4 outline-none"
                  >
                    <option value="" disabled>
                      Select Language
                    </option>
                    {selectOptions.language.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="w-full h-11 rounded-lg border border-gray-200 px-4 outline-none"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    {selectOptions.gender.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* IMAGE UPLOAD USING ZUSTAND */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-[105px] mt-2 rounded-xl bg-[#F8FAFC] border-2 border-dashed border-[#B8D4EA] flex flex-col items-center justify-center text-gray-600 cursor-pointer overflow-hidden"
                >
                  {profile.avatarPreview ? (
                    <img
                      src={profile.avatarPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <ImagePlus size={24} className="text-[#2B60A8] mb-2" />
                      <span className="text-sm font-bold text-gray-800">
                        Upload Photo
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 pt-2 pb-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-4 bg-[#2B60A8] text-white rounded-xl font-bold hover:bg-[#1E4378] disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
