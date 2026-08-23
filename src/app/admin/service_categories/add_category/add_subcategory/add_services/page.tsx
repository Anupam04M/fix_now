"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Search, Bell, ChevronDown, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import avatar from "../../../../../../assets/images/admin/avatar.jpg";
import DynamicInput from "@/components/common/DyanmicInput";
import { serviceInputs } from "@/services/json/category.input";
import { serviceSchema } from "@/services/validation/category.validation";
import { useServices } from "@/hooks/useCategoryHooks";
import { useCategoryWizard } from "@/store/useCategoryWizard";

export default function AddService() {
  const router = useRouter();
  const { createServiceMutation } = useServices();

  // Pull active subcategories and reset method from Zustand
  const { activeSubcategories, resetWizard } = useCategoryWizard();

  // Local state just for displaying added services in the UI table on this step
  const [addedServices, setAddedServices] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
    defaultValues: { is_active: true },
  });

  const isActive = watch("is_active");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    try {
      const res = await createServiceMutation.mutateAsync(formData);

      // Update local table UI
      const newService = res?.data || res;
      setAddedServices([...addedServices, newService]);

      toast.success("Service added!");
      // Reset form but keep is_active default
      reset({ is_active: true });
    } catch (err) {
      // Error toast handled by hook
    }
  };

  const handlePublish = () => {
    toast.success(
      "Wizard Completed! Category, Subcategories, and Services created successfully.",
    );
    resetWizard(); // Clear Zustand buffers
    router.push("/admin/service_categories"); // Return to list view
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
              Dashboard &gt; Add Category &gt; Add Subcategory &gt;{" "}
              <span className="text-gray-900 font-medium">Add Services</span>
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
        <h2 className="text-lg font-bold text-gray-900">Add Services</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add Services Under The Subcategories. You Can Add Multiple Services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit"
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Add New Service</h2>
          </div>

          <div className="space-y-5">
            {/* Select Subcategory linked to Zustand */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Subcategory
              </label>
              <div className="relative">
                <select
                  {...register("subcategory_id")}
                  className={`w-full h-11 appearance-none rounded-lg border bg-white px-4 pr-10 text-sm outline-none focus:border-[#1E57A8] transition-colors cursor-pointer ${errors.subcategory_id ? "border-red-500" : "border-gray-200"}`}
                >
                  <option value="">Select a Subcategory</option>
                  {activeSubcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
              {errors.subcategory_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subcategory_id.message as string}
                </p>
              )}
            </div>

            {/* Dynamic Inputs for Name and Description */}
            {serviceInputs.map((field) => (
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

            {/* Status Toggle */}
            <div className="pt-2 flex justify-between items-center">
              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Status
                </label>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setValue("is_active", !isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-sm font-bold text-gray-900 w-12">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={createServiceMutation.isPending}
                className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#1E57A8] px-6 text-sm font-semibold text-white hover:bg-[#154385] disabled:opacity-70"
              >
                {createServiceMutation.isPending ? "Adding..." : "Add Service"}{" "}
                <Plus size={16} />
              </button>
            </div>
          </div>
        </form>

        {/* Right List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit min-h-[400px]">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Added Services</h2>
          </div>

          <div className="w-full rounded-lg border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 bg-white px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-sm">
                Service Name
              </span>
              <span className="font-bold text-gray-900 text-sm text-right">
                Status
              </span>
            </div>

            {addedServices.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-sm text-gray-400 bg-gray-50">
                No services added yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {addedServices.map((srv, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {srv.name}
                    </span>
                    <span className="text-sm text-right">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${srv.is_active || srv.is_active === 1 ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}
                      >
                        {srv.is_active || srv.is_active === 1
                          ? "Active"
                          : "Inactive"}
                      </span>
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
            onClick={handlePublish}
            className="h-10 px-6 rounded-full bg-[#1E57A8] text-white text-sm font-semibold hover:bg-[#154385] flex items-center gap-2"
          >
            Publish <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
