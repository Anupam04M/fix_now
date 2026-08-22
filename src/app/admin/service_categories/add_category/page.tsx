"use client";

import React, { useState } from "react";
import { Search, Bell, ChevronDown, Upload, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from "../../../../assets/images/admin/avatar.jpg";


const AddCategory = () => {
  const router = useRouter();

  // State for toggles
  const [showInHome, setShowInHome] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

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
              Dashboard &gt; Service Categories &gt;{" "}
              <span className="text-gray-900 font-medium">Add Category</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5 self-end md:self-auto">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Search size={18} />
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-gray-200 cursor-pointer">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
              {/* Replace src with your actual user avatar path */}
              <Image
                src={avatar}
                alt="Admin Avatar"
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Category Information */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Category Information
            </h2>
            <p className="text-sm text-gray-500">
              Upload The Detail Of Your Category
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Enter Category Name"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#1E57A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category Slug (Url)
              </label>
              <input
                type="text"
                placeholder="Url"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#1E57A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category Description
              </label>
              <textarea className="w-full h-28 rounded-lg border border-gray-200 p-4 text-sm outline-none focus:border-[#1E57A8] transition-colors resize-none"></textarea>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-2/3 h-32 rounded-xl bg-gray-100 border border-gray-200 border-dashed flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={20} className="mb-2" />
                <span className="text-sm font-medium">Upload Banner</span>
                <span className="text-xs text-gray-400 mt-1">
                  Svg, Png Or Jpg (Max 12 Mb)
                </span>
              </div>
              <div className="w-full sm:w-1/3 flex flex-col items-center justify-center gap-3">
                <button className="w-full h-10 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors">
                  Browse Banner
                </button>
                <span className="text-xs text-gray-500 font-medium">
                  Or Choose From Library
                </span>
              </div>
            </div>

            {/* Preview Section */}
            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Preview
              </label>
              <p className="text-xs text-gray-500 mb-3">
                How It Will Appear On Site
              </p>
              <div className="w-full h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Category Settings */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Category Settings
            </h2>
            <p className="text-sm text-gray-500">
              Configure How This Category Will Behave
            </p>
          </div>

          <div className="space-y-6">
            {/* Toggle: Display In Home Page */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Display In Home Page
                </p>
                <p className="text-xs text-gray-500">
                  Show This Category In The Home Page Section
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowInHome(!showInHome)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showInHome ? "bg-green-500" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showInHome ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-sm font-semibold text-gray-900 w-8">
                  {showInHome ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {/* Toggle: Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Status</p>
                <p className="text-xs text-gray-500">
                  Activate Or Deactivate This Category
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-sm font-semibold text-gray-900 w-12">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Toggle: Featured Category */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Featured Category
                </p>
                <p className="text-xs text-gray-500">
                  Make As Featured To Highlight On The Home Page
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isFeatured ? "bg-green-500" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFeatured ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-sm font-semibold text-gray-900 w-8">
                  {isFeatured ? "Yes" : "No"}
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* SEO Inputs */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Meta Title (Seo)
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Enter The Meta Title For This Category
              </p>
              <input
                type="text"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#1E57A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Meta Description (Seo)
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Enter Meta Description For This Category
              </p>
              <textarea className="w-full h-24 rounded-lg border border-gray-200 p-4 text-sm outline-none focus:border-[#1E57A8] transition-colors resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[295px] bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between z-40 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => router.push("/admin/service_categories")}
          className="text-sm font-semibold text-[#1E57A8] hover:underline"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/service_categories")}
            className="h-10 px-6 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button onClick={() => router.push("/admin/service_categories/add_category/add_subcategory")}
          className="h-10 px-6 rounded-full bg-[#1E57A8] text-white text-sm font-semibold hover:bg-[#154385] transition-colors flex items-center gap-2">
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
