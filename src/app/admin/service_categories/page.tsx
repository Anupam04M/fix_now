"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LayoutGrid,
  CheckCircle2,
  Layers,
  Wrench,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import Image from "next/image";
import avatar from "../../../assets/images/admin/avatar.jpg";
import { useRouter } from "next/navigation";

const Service_Category = () => {
  // Dummy data based on the Figma image
  const categoriesData = [
    {
      id: 1,
      name: "Electrician",
      providers: 304,
      status: "Active",
      isToggled: true,
    },
    {
      id: 2,
      name: "Househelp",
      providers: 138,
      status: "Active",
      isToggled: true,
    },
    {
      id: 3,
      name: "Plumber",
      providers: 160,
      status: "Active",
      isToggled: true,
    },
    {
      id: 4,
      name: "Delivery Assistance",
      providers: 64,
      status: "Active",
      isToggled: false,
    },
    {
      id: 5,
      name: "Repairing",
      providers: 134,
      status: "Active",
      isToggled: true,
    },
    {
      id: 6,
      name: "Carpenter",
      providers: 256,
      status: "Active",
      isToggled: true,
    },
    {
      id: 7,
      name: "Personal Grooming",
      providers: 80,
      status: "Active",
      isToggled: true,
    },
  ];

  const [categories, setCategories] = useState(categoriesData);
  const router = useRouter();

  const toggleStatus = (id:number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, isToggled: !cat.isToggled } : cat,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8 font-sans">
      {/* Top Header */}
      <header className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-2xl shadow-sm">
        {/* Left: Title & Breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-gray-500 hover:text-gray-700">
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
              Service Category
            </h1>
            <p className="text-xs md:text-sm text-gray-500 hidden md:block mt-1">
              Dashboard &gt; Service Category
            </p>
          </div>
        </div>

        {/* Right: Actions & Profile */}
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
        {/* Card 1 */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <LayoutGrid size={24} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              Total Categories
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">7</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-green-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              Active Categories
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">7</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              Sub Categories
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">35</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-red-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-400">
            <Wrench size={24} />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              Total Services
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">140</h3>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search Categories"
              className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-[#2B60A8] transition-colors"
            />
          </div>

          {/* Status/Sort Dropdown */}
          <div className="relative w-full sm:w-32">
            <select className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-600 outline-none focus:border-[#2B60A8] cursor-pointer">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* Add Button */}
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-lg
         bg-[#1E57A8] px-5 text-sm font-medium text-white hover:bg-[#154385]
          transition-colors shadow-sm"
          onClick={() => router.push("/admin/service_categories/add_category")}
        >
          Add Categories
          <Plus size={16} />
        </button>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-100 bg-white text-gray-900">
              <tr>
                <th className="px-6 py-5 font-bold text-[15px]">
                  Category Name
                </th>
                <th className="px-6 py-5 font-bold text-[15px] text-center">
                  Providers
                </th>
                <th className="px-6 py-5 font-bold text-[15px] text-center hidden md:table-cell">
                  Status
                </th>
                <th className="px-6 py-5 font-bold text-[15px] text-right hidden md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">
                    {category.providers}
                  </td>

                  {/* Status column (Hidden on tablet/mobile as per your 2nd image) */}
                  <td className="px-6 py-4 text-center hidden md:table-cell">
                    <span className="inline-flex items-center rounded border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600">
                      {category.status}
                    </span>
                  </td>

                  {/* Actions column (Hidden on tablet/mobile as per your 2nd image) */}
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center justify-end gap-3">
                      {/* Custom Toggle Switch */}
                      <button
                        onClick={() => toggleStatus(category.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          category.isToggled ? "bg-green-500" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            category.isToggled
                              ? "translate-x-4"
                              : "translate-x-1"
                          } shadow-sm`}
                        />
                      </button>

                      {/* Edit Button */}
                      <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-[#1E57A8] hover:border-blue-200 transition-all">
                        <Pencil size={14} />
                      </button>

                      {/* Delete Button */}
                      <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Wrapper */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 p-4 sm:p-6 gap-4">
          <p className="text-sm text-gray-500 font-medium">
            Showing 1 - 8 Out Of 1,248 Providers
          </p>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E57A8] text-white font-medium shadow-sm">
              1
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">
              2
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">
              3
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="flex h-9 w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium">
              156
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service_Category;
