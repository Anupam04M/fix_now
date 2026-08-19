"use client";

import React from "react";
import { Search, Bell, ChevronDown, Upload, ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from "../../../../../assets/images/admin/avatar.jpg";

const AddSubcategory = () => {
  const router = useRouter();

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

      {/* Page Title Box */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Add Subcategories</h2>
        <p className="text-sm text-gray-500">
          Add Subcategories Under The Categories. You Can Add Multiple
          Subcategories
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Add New Subcategory Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Add New Subcategory
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Subcategory Name
              </label>
              <input
                type="text"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#1E57A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description (Optional)
              </label>
              <textarea className="w-full h-28 rounded-lg border border-gray-200 p-4 text-sm outline-none focus:border-[#1E57A8] transition-colors resize-none"></textarea>
            </div>

            {/* Upload Section */}
            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Add Subcategory Banner (Optional)
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-2/3 h-32 rounded-xl bg-[#E2E8F0] flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload size={20} className="mb-2" />
                  <span className="text-sm font-medium">Upload Image</span>
                  <span className="text-xs text-gray-400 mt-1">
                    Svg, Png Or Jpg (Max 12 Mb)
                  </span>
                </div>
                <div className="w-full sm:w-1/3 flex flex-col items-center justify-center gap-3">
                  <button className="w-full h-10 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors">
                    Browse Image
                  </button>
                  <span className="text-xs text-gray-500 font-medium">
                    Or Choose From Library
                  </span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#1E57A8] px-6 text-sm font-semibold text-white hover:bg-[#154385] transition-colors">
                Add Subcategory
                <Plus size={16} />
              </button>
              <button className="h-10 px-6 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Added Subcategories List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit min-h-[400px]">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Added Subcategories
            </h2>
            <p className="text-sm text-gray-500">
              Drag & Drop To Reorder Subcategories
            </p>
          </div>

          <div className="w-full rounded-lg border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-sm">
                Subcategory Name
              </span>
              <span className="font-bold text-gray-900 text-sm">Action</span>
            </div>

            {/* Empty State / List Area */}
            <div className="h-40 flex items-center justify-center text-sm text-gray-400 bg-gray-50">
              No subcategories added yet.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[295px] bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between z-40 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => router.back()} // Goes back to the Add Category page
          className="text-sm font-semibold text-[#1E57A8] hover:underline"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/service_categories/add_category")}
            className="h-10 px-6 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button onClick={() => router.push("/admin/service_categories/add_category/add_subcategory/add_services")}
          className="h-10 px-6 rounded-full bg-[#1E57A8] text-white text-sm font-semibold hover:bg-[#154385] transition-colors flex items-center gap-2">
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategory;
