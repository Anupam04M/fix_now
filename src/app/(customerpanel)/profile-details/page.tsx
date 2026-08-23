"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

import { useProfile } from "@/hooks/useProfile";
import { useProfileStore } from "@/store/useProfileStore";

const getInputCls = (disabled: boolean) =>
  `w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
    disabled
      ? "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
      : "border-gray-300 text-slate-800 placeholder-gray-400 bg-white"
  }`;

const labelCls = "block text-sm font-semibold text-slate-800 mb-1.5";

const SectionHeading = ({
  title,
  subtitle,
  onEdit,
  isEditing,
}: {
  title: string;
  subtitle: string;
  onEdit: () => void;
  isEditing: boolean;
}) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
    {!isEditing && (
      <button
        type="button"
        onClick={onEdit}
        className="px-6 py-1.5 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50 transition-colors"
      >
        Edit
      </button>
    )}
  </div>
);

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

  const {
    profile,
    address,
    preferences,
    updateProfile,
    updateAddress,
    updatePreferences,
  } = useProfileStore();

  const {
    profileQuery,
    addressQuery,
    isLoading,
    updateProfileMutation,
    updateAddressMutation,
  } = useProfile();

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPref, setIsEditingPref] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ========================================================================
  // BULLETPROOF DATA EXTRACTION
  // ========================================================================
  const populateFromAPI = () => {
    if (!profileQuery.data) return;

    const rawData = profileQuery.data as any;

    // Target the exact 'customer' object from your API response
    const user =
      rawData?.data?.customer || rawData?.customer || rawData?.data || rawData;

    if (user && user.name !== undefined) {
      const nameParts = (user.name || "").trim().split(/\s+/);

      // ==========================================
      // PUT THE DATE FORMATTING LOGIC HERE!
      // ==========================================
      let formattedDob = user.date_of_birth || user.dob || "";

      if (formattedDob) {
        // 1. Strip out any time/timestamp garbage (e.g., "T" or spaces)
        formattedDob = formattedDob.split("T")[0].split(" ")[0];

        // 2. Split the date into parts using either "-" or "/"
        const parts = formattedDob.split(/[-/]/);

        if (parts.length === 3) {
          if (parts[0].length === 2) {
            // It arrived as DD-MM-YYYY, so we flip it to YYYY-MM-DD
            formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
          } else if (parts[0].length === 4) {
            // It arrived correctly as YYYY-MM-DD, just rebuild it safely
            formattedDob = `${parts[0]}-${parts[1]}-${parts[2]}`;
          }
        }
      }
      // ==========================================

      updateProfile({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: user.phone || user.mobile || "",
        email: user.email || "",
        altPhone: user.alternate_phone || user.alt_phone || "",

        // 🚨 IMPORTANT: Use the new formattedDob variable here!
        dob: formattedDob,

        preferredLanguage: user.language || user.preferred_language || "",
        gender: user.gender || "",
        avatarPreview:
          user.customer_image || user.profile_image || user.avatar || null,
      });
    }
  };

  const populateAddressFromAPI = () => {
    if (!addressQuery.data) return;

    const rawData = addressQuery.data as any;

    // 1. Smartly find the actual ARRAY of addresses no matter how it's wrapped
    let list: any[] = [];
    if (Array.isArray(rawData)) {
      list = rawData;
    } else if (Array.isArray(rawData?.data)) {
      list = rawData.data;
    } else if (Array.isArray(rawData?.data?.addresses)) {
      list = rawData.data.addresses;
    } else if (Array.isArray(rawData?.addresses)) {
      list = rawData.addresses;
    } else if (rawData?.data?.address) {
      // Fallback if the backend returns a single object instead of an array
      list = [rawData.data.address];
    }

    // 2. Grab the default address, or fallback to the first one in the list
    const defaultAddr = list.find((a: any) => a?.is_default) || list[0];

    if (defaultAddr) {
      updateAddress({
        addressId: defaultAddr.id,
        label: defaultAddr.label || "Home",
        contactPerson: defaultAddr.contact_person || "",
        contactPhone: defaultAddr.contact_phone || "",

        // Target the nested "address" object from your JSON response
        line1: defaultAddr.address?.line_1 || defaultAddr.address_line_1 || "",
        line2: defaultAddr.address?.line_2 || defaultAddr.address_line_2 || "",
        city: defaultAddr.address?.city || defaultAddr.city || "",
        state: defaultAddr.address?.state || defaultAddr.state || "",
        postalCode:
          defaultAddr.address?.postal_code || defaultAddr.postal_code || "",
        landmark: defaultAddr.address?.landmark || defaultAddr.landmark || "",
      });
    }
  };

  // Run the population functions automatically when the API finishes loading
  useEffect(() => {
    if (profileQuery.isSuccess) populateFromAPI();
  }, [profileQuery.isSuccess, profileQuery.data]);

  useEffect(() => {
    if (addressQuery.isSuccess) populateAddressFromAPI();
  }, [addressQuery.isSuccess, addressQuery.data]);

  // ========================================================================
  // SAVE HANDLERS
  // ========================================================================
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

  const handleSaveBasic = async () => {
    if (!isAuthenticate) return toast.error("Please login first.");
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();
    if (!fullName || !profile.email)
      return toast.error("First name and email are required.");

    await updateProfileMutation.mutateAsync({
      name: fullName,
      email: profile.email,
      phone: profile.phone,
      alternate_phone: profile.altPhone,
      // FIX 1: Change 'dob' to 'date_of_birth'
      date_of_birth: profile.dob,

      language: profile.preferredLanguage,
      gender: profile.gender,

      // FIX 2: Change 'avatar' to 'profile_image'
      ...(profile.avatarFile && { customer_image: profile.avatarFile }),
    });
    setIsEditingBasic(false);
    updateProfile({ avatarFile: null }); // Clear file buffer
  };

  const handleSaveAddress = async () => {
    if (!isAuthenticate) return toast.error("Please login first.");
    if (
      !address.line1 ||
      !address.city ||
      !address.postalCode ||
      !address.state
    ) {
      return toast.error("Please fill in all required address fields.");
    }

    await updateAddressMutation.mutateAsync({
      addressId: address.addressId,
      payload: {
        label: address.label,
        contact_person:
          address.contactPerson ||
          `${profile.firstName} ${profile.lastName}`.trim(),
        contact_phone: address.contactPhone || profile.phone,
        address_line_1: address.line1,
        address_line_2: address.line2 || undefined,
        landmark: address.landmark || undefined,
        city: address.city,
        state: address.state,
        postal_code: address.postalCode,
        is_default: true,
      },
    });
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Complete Your Professional Profile
        </h1>

        {isLoading && (
          <div className="text-center text-sm text-blue-500 py-4 font-semibold">
            Loading your profile data...
          </div>
        )}

        {/* SECTION 1: Basic Information */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
          <SectionHeading
            title="Basic Information"
            subtitle="Update Your Basic Details"
            isEditing={isEditingBasic}
            onEdit={() => setIsEditingBasic(true)}
          />

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Profile Picture Box */}
              <div className="md:col-span-5 flex flex-col items-center">
                <span className="text-base font-bold text-slate-900 self-center mb-3">
                  Profile Picture
                </span>

                <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200">
                  {/* Show image from Zustand store */}
                  {profile.avatarPreview ? (
                    <img
                      src={profile.avatarPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                </div>

                {isEditingBasic && (
                  <>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-500 font-medium mt-3 text-sm hover:underline"
                    >
                      Change Photo
                    </button>
                    <span className="text-xs text-gray-400 mt-1">
                      JPG, PNG Up To 2MB
                    </span>
                  </>
                )}
              </div>

              {/* Names */}
              <div className="md:col-span-7 space-y-4 pt-2">
                <div>
                  <label className={labelCls}>First Name</label>
                  <input
                    type="text"
                    value={profile.firstName || ""}
                    onChange={(e) =>
                      updateProfile({ firstName: e.target.value })
                    }
                    disabled={!isEditingBasic}
                    className={getInputCls(!isEditingBasic)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName || ""}
                    onChange={(e) =>
                      updateProfile({ lastName: e.target.value })
                    }
                    disabled={!isEditingBasic}
                    className={getInputCls(!isEditingBasic)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                  disabled={!isEditingBasic}
                  className={getInputCls(!isEditingBasic)}
                />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                  disabled={!isEditingBasic}
                  className={getInputCls(!isEditingBasic)}
                />
              </div>
              <div>
                <label className={labelCls}>Alternative Phone Number</label>
                <input
                  type="tel"
                  value={profile.altPhone || ""}
                  onChange={(e) => updateProfile({ altPhone: e.target.value })}
                  disabled={!isEditingBasic}
                  className={getInputCls(!isEditingBasic)}
                />
              </div>
              <div>
                <label className={labelCls}>Date Of Birth</label>
                <input
                  type="date"
                  value={profile.dob || ""}
                  onChange={(e) => updateProfile({ dob: e.target.value })}
                  disabled={!isEditingBasic}
                  className={getInputCls(!isEditingBasic)}
                />
              </div>
              <div>
                <label className={labelCls}>Preferred Language</label>
                <div className="relative">
                  <select
                    value={profile.preferredLanguage || ""}
                    onChange={(e) =>
                      updateProfile({ preferredLanguage: e.target.value })
                    }
                    disabled={!isEditingBasic}
                    className={`${getInputCls(!isEditingBasic)} appearance-none pr-8`}
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
                    value={profile.gender || ""}
                    onChange={(e) => updateProfile({ gender: e.target.value })}
                    disabled={!isEditingBasic}
                    className={`${getInputCls(!isEditingBasic)} appearance-none pr-8`}
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

            {isEditingBasic && (
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    // Trigger a refetch to reset data to its original state
                    profileQuery.refetch();
                    setIsEditingBasic(false);
                  }}
                  className="px-6 py-2 text-slate-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBasic}
                  disabled={updateProfileMutation.isPending}
                  className="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {updateProfileMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: Address Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
            <SectionHeading
              title="Address Information"
              subtitle="Where Should We Reach You?"
              isEditing={isEditingAddress}
              onEdit={() => setIsEditingAddress(true)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>House / Flat / Building No.</label>
                <input
                  type="text"
                  value={address.line1 || ""}
                  onChange={(e) => updateAddress({ line1: e.target.value })}
                  disabled={!isEditingAddress}
                  className={getInputCls(!isEditingAddress)}
                />
              </div>
              <div>
                <label className={labelCls}>Street / Area / Locality</label>
                <input
                  type="text"
                  value={address.line2 || ""}
                  onChange={(e) => updateAddress({ line2: e.target.value })}
                  disabled={!isEditingAddress}
                  className={getInputCls(!isEditingAddress)}
                />
              </div>
              <div>
                <label className={labelCls}>City / Town</label>
                <input
                  type="text"
                  value={address.city || ""}
                  onChange={(e) => updateAddress({ city: e.target.value })}
                  disabled={!isEditingAddress}
                  className={getInputCls(!isEditingAddress)}
                />
              </div>
              <div>
                <label className={labelCls}>State</label>
                <div className="relative">
                  <select
                    value={address.state || ""}
                    onChange={(e) => updateAddress({ state: e.target.value })}
                    disabled={!isEditingAddress}
                    className={`${getInputCls(!isEditingAddress)} appearance-none pr-8`}
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
                  value={address.postalCode || ""}
                  onChange={(e) =>
                    updateAddress({ postalCode: e.target.value })
                  }
                  disabled={!isEditingAddress}
                  className={getInputCls(!isEditingAddress)}
                />
              </div>
              <div>
                <label className={labelCls}>
                  Landmark{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={address.landmark || ""}
                  onChange={(e) => updateAddress({ landmark: e.target.value })}
                  disabled={!isEditingAddress}
                  className={getInputCls(!isEditingAddress)}
                />
              </div>
            </div>

            {isEditingAddress && (
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    addressQuery.refetch();
                    setIsEditingAddress(false);
                  }}
                  className="px-6 py-2 text-slate-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAddress}
                  disabled={updateAddressMutation.isPending}
                  className="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {updateAddressMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: Account Preferences */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative">
            <SectionHeading
              title="Account Preferences"
              subtitle="Choose How You Want To Stay Updated"
              isEditing={isEditingPref}
              onEdit={() => setIsEditingPref(true)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label
                className={`flex items-center justify-between p-4 rounded-xl border ${isEditingPref ? "cursor-pointer hover:border-blue-200" : "cursor-not-allowed bg-gray-50 border-transparent opacity-80"}`}
              >
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
                  checked={preferences.smsNotif}
                  onChange={(e) =>
                    updatePreferences({ smsNotif: e.target.checked })
                  }
                  disabled={!isEditingPref}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                />
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-xl border ${isEditingPref ? "cursor-pointer hover:border-green-200" : "cursor-not-allowed bg-gray-50 border-transparent opacity-80"}`}
              >
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
                  checked={preferences.whatsappNotif}
                  onChange={(e) =>
                    updatePreferences({ whatsappNotif: e.target.checked })
                  }
                  disabled={!isEditingPref}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                />
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-xl border ${isEditingPref ? "cursor-pointer hover:border-blue-200" : "cursor-not-allowed bg-gray-50 border-transparent opacity-80"}`}
              >
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
                  checked={preferences.emailNotif}
                  onChange={(e) =>
                    updatePreferences({ emailNotif: e.target.checked })
                  }
                  disabled={!isEditingPref}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                />
              </label>
            </div>

            {isEditingPref && (
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditingPref(false)}
                  className="px-6 py-2 text-slate-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Preferences saved!");
                    setIsEditingPref(false);
                  }}
                  className="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
