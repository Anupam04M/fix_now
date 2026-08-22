"use client";

import React, { useState } from "react";
import { Search, Bell, ChevronDown, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from "../../../../../../assets/images/admin/avatar.jpg";


const AddService = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);

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
              Dashboard &gt; Service Categories &gt; Add Category &gt; Add Subcategory&gt;{" "} 
              <span className="text-gray-900 font-medium">Add Services</span>
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
        <h2 className="text-lg font-bold text-gray-900">Add Services</h2>
        <p className="text-sm text-gray-500 mt-1">Add Services Under The Subcategories. You Can Add Multiple Services</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Add New Service Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Add New Service</h2>
          </div>

          <div className="space-y-5">
            {/* Select Subcategory */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Select Subcategory</label>
              <div className="relative">
                <select className="w-full h-11 appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-600 outline-none focus:border-[#1E57A8] transition-colors cursor-pointer">
                  <option value="" disabled selected>Select</option>
                  <option value="1">Subcategory 1</option>
                  <option value="2">Subcategory 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Service Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Service Name</label>
              <input 
                type="text" 
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#1E57A8] transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Description (Optional)</label>
              <textarea 
                className="w-full h-28 rounded-lg border border-gray-200 p-4 text-sm outline-none focus:border-[#1E57A8] transition-colors resize-none"
              ></textarea>
            </div>

            {/* Status Toggle */}
            <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Status</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm font-bold text-gray-900">{isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#1E57A8] px-6 text-sm font-semibold text-white hover:bg-[#154385] transition-colors">
                Add Services
                <Plus size={16} />
              </button>
              <button className="h-10 px-8 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Added Subcategories (Services) List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit min-h-[400px]">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Added Subcategories</h2>
            <p className="text-sm text-gray-500 mt-1">Drag & Drop To Reorder Subcategories</p>
          </div>

          <div className="w-full rounded-lg border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 bg-white px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-sm">Service</span>
              <span className="font-bold text-gray-900 text-sm text-center">Status</span>
              <span className="font-bold text-gray-900 text-sm text-right">Action</span>
            </div>
            
            {/* Empty State / List Area */}
            <div className="h-32 flex items-center justify-center text-sm text-gray-400 bg-white">
              {/* Data rows would go here */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[295px] bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between z-40 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => router.back()}
          className="text-sm font-semibold text-[#1E57A8] hover:underline"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          <button 
            className="h-10 px-6 rounded-full border border-[#1E57A8] text-[#1E57A8] text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Save As Draft
          </button>
          <button className="h-10 px-6 rounded-full bg-[#1E57A8] text-white text-sm font-semibold hover:bg-[#154385] transition-colors flex items-center gap-2">
            Publish
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;