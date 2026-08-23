"use client";
import React from "react";
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
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from "../../../assets/images/admin/avatar.jpg";
import { useCategories } from "@/hooks/useCategoryHooks";

const Service_Category = () => {
  const router = useRouter();
  const { categoriesQuery, updateCategoryMutation, deleteCategoryMutation } =
    useCategories();

  // Safely extract list from API
  const categories = categoriesQuery.data?.data || categoriesQuery.data || [];

  const toggleStatus = (category: any) => {
    // 1. Bulletproof check for current status
    const isCurrentlyActive =
      category.is_active == 1 ||
      category.is_active === "1" ||
      category.is_active === true ||
      category.status?.toLowerCase() === "active";

    // If it's currently active, make it 0. If it's inactive, make it 1.
    const newStatus = isCurrentlyActive ? 0 : 1;

    // 2. Package it into FormData
    const formData = new FormData();

    // We send both just in case, but using LOWERCASE for the status string
    // to pass the backend validation!
    formData.append("is_active", newStatus.toString());
    formData.append("status", newStatus === 1 ? "active" : "inactive");

    // 3. Send the PATCH request
    updateCategoryMutation.mutate({
      id: category.id,
      payload: formData,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(id);
    }
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
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1E57A8] px-5 text-sm font-medium text-white hover:bg-[#154385] transition-colors shadow-sm"
          onClick={() => router.push("/admin/service_categories/add_category")}
        >
          Add Categories
          <Plus size={16} />
        </button>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        {categoriesQuery.isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading categories...
          </div>
        ) : (
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
                {categories.map((category: any) => {
                  // 1. Safely parse the status (handles 1, "1", "active", and true)
                  const isActive =
                    category.is_active == 1 ||
                    category.is_active === "1" ||
                    category.is_active === true ||
                    category.status?.toLowerCase() === "active";

                  return (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-900">
                        {category.providers_count || 0}
                      </td>

                      <td className="px-6 py-4 text-center hidden md:table-cell">
                        <span
                          className={`inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium ${
                            isActive
                              ? "border-green-200 bg-green-50 text-green-600"
                              : "border-red-200 bg-red-50 text-red-600"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => toggleStatus(category)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              isActive ? "bg-green-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                                isActive ? "translate-x-4" : "translate-x-1"
                              }`}
                            />
                          </button>

                          {/* LINKED TO DYNAMIC EDIT PAGE */}
                          <button
                            onClick={() =>
                              router.push(
                                `/admin/service_categories/edit_category/${category.id}`,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-[#1E57A8] transition-colors"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() => handleDelete(category.id)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service_Category;
