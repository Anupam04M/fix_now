"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Search,
  Bell,
  ChevronDown,
  Upload,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import avatar from "../../../../../assets/images/admin/avatar.jpg";
import DynamicInput from "@/components/common/DyanmicInput";
import { subcategoryInputs } from "@/services/json/category.input";
import { subcategorySchema } from "@/services/validation/category.validation";
import { useSubcategories } from "@/hooks/useCategoryHooks";
import { useCategoryWizard } from "@/store/useCategoryWizard";

export default function AddSubcategory() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { createSubcategoryMutation } = useSubcategories();

  // Pull context from Zustand Wizard
  const {
    createdCategoryId,
    subcategoryBanner,
    setSubcategoryBanner,
    activeSubcategories,
    addSubcategory,
  } = useCategoryWizard();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subcategorySchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 12 * 1024 * 1024)
        return toast.error("Image must be smaller than 12MB");
      setSubcategoryBanner(file, URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: any) => {
    if (!createdCategoryId) {
      return toast.error("Parent category missing. Please go back to Step 1.");
    }

    const formData = new FormData();
    formData.append("category_id", createdCategoryId.toString()); // Link to Parent
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    if (subcategoryBanner.file) {
      formData.append("banner", subcategoryBanner.file);
    }

    try {
      const res = await createSubcategoryMutation.mutateAsync(formData);
      // Add the new subcategory to Zustand so it appears in the list & Step 3 dropdown
      addSubcategory(res?.data || res);

      toast.success("Subcategory added!");
      // Reset form for the next subcategory
      reset();
      setSubcategoryBanner(null, null);
    } catch (err) {
      // hook handles error toast
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8 font-sans pb-24">
      {/* Top Header */}
      <header className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
              Service Categories
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Dashboard &gt; Service Categories &gt; Add Category &gt;{" "}
              <span className="text-gray-900 font-medium">Add Subcategory</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5 self-end md:self-auto">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
            <Search size={18} />
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-gray-200 cursor-pointer">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
              <Image
                src={avatar}
                alt="Admin"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Arghya Sen</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
          </div>
        </div>
      </header>

      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Add Subcategories</h2>
        <p className="text-sm text-gray-500">
          Add Subcategories Under The Categories. You Can Add Multiple.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit"
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Add New Subcategory
            </h2>
          </div>

          <div className="space-y-5">
            {subcategoryInputs.map((field) => (
              <DynamicInput
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                register={register}
                error={
                  errors[field.name as keyof typeof errors]?.message as string
                }
              />
            ))}

            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Add Subcategory Banner
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-full sm:w-2/3 h-32 rounded-xl bg-[#E2E8F0] flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200 overflow-hidden"
                >
                  {subcategoryBanner.preview ? (
                    <img
                      src={subcategoryBanner.preview}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload size={20} className="mb-2" />
                      <span className="text-sm font-medium">Upload Image</span>
                    </>
                  )}
                </div>
                <div className="w-full sm:w-1/3 flex flex-col items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-10 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50"
                  >
                    Browse Image
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={createSubcategoryMutation.isPending}
                className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#1E57A8] px-6 text-sm font-semibold text-white hover:bg-[#154385] disabled:opacity-70"
              >
                {createSubcategoryMutation.isPending
                  ? "Adding..."
                  : "Add Subcategory"}{" "}
                <Plus size={16} />
              </button>
            </div>
          </div>
        </form>

        {/* Right: Added List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit min-h-[400px]">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Added Subcategories
            </h2>
          </div>
          <div className="w-full rounded-lg border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-sm">
                Subcategory Name
              </span>
            </div>

            {activeSubcategories.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-sm text-gray-400 bg-gray-50">
                No subcategories added yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activeSubcategories.map((sub, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {sub.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-[295px] bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between z-40">
        <button
          onClick={() => router.back()}
          className="text-sm font-semibold text-[#1E57A8] hover:underline"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              router.push(
                "/admin/service_categories/add_category/add_subcategory/add_services",
              )
            }
            className="h-10 px-6 rounded-full bg-[#1E57A8] text-white text-sm font-semibold hover:bg-[#154385] flex items-center gap-2"
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
