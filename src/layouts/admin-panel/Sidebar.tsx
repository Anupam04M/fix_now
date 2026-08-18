"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Home,
  UserCog,
  Settings,
  MessageSquare,
  Clock,
  FileEdit,
  LogOut,
  Menu,
  X,
  HeadphonesIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Logo from "../../assets/images/Frame 14.png";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    {
      icon: UserCog,
      label: "Provider Management",
      path: "/admin/provider_management",
    },
    {
      icon: Settings,
      label: "Service Categories",
      path: "/admin/service_categories",
    },
    {
      icon: MessageSquare,
      label: "Ratings & Reviews",
      path: "/admin/ratings_reviews",
    },
    { icon: Clock, label: "Activity Log", path: "/admin/activity_log" },
    { icon: FileEdit, label: "Static Pages", path: "/admin/static_pages" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    await logout();
    toast.success("Logout Successfully");
    router.push("/");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile/Tab Hamburger Menu Toggle (Visible only on smaller screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 rounded-md bg-white p-2 text-[#2B60A8] shadow-md xl:hidden"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity xl:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container - Figma Specs Applied Here */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#FFFFFF] transition-transform duration-300 ease-in-out xl:translate-x-0 w-[295px] pt-[20px] px-[16px] pb-[20px] shadow-[4px_0px_59.8px_0px_#D6D6D6] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header / Logo Image */}
        <div className="mb-8 mt-2 flex ml-4 shrink-0">
          <Image
            src={Logo}
            alt="FixNow Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Scrollable Area containing both Nav and Support Card */}
        {/* ADDED pb-4 here to ensure the scroll reaches the very bottom */}
        <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col pb-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    router.push(item.path);
                    setIsOpen(false);
                  }}
                  className={`group flex w-full items-center gap-4 rounded-[12px] px-4 py-3.5 text-left font-medium transition-colors ${
                    isActive
                      ? "bg-[#F4F8FF] text-[#1E57A8]"
                      : "text-[#475569] hover:bg-[#F4F8FF] hover:text-[#1E57A8]"
                  }`}
                >
                  <item.icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors ${
                      isActive
                        ? "text-[#1E57A8]"
                        : "text-[#64748B] group-hover:text-[#1E57A8]"
                    }`}
                  />
                  <span className="text-[16px]">{item.label}</span>
                </button>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="group flex w-full items-center gap-4 rounded-[12px] px-4 py-3.5 text-left font-medium text-[#475569] transition-colors hover:bg-[#F4F8FF] hover:text-[#1E57A8]"
            >
              <LogOut
                size={20}
                strokeWidth={2}
                className="text-[#64748B] transition-colors group-hover:text-[#1E57A8]"
              />
              <span className="text-[14px]">Log Out</span>
            </button>
          </nav>

          {/* Support Card */}
          {/* ADDED shrink-0 and mt-4, cleaned up duplicate padding */}
          <div className="shrink-0 mt-4 rounded-[16px] bg-gradient-to-b from-[#EBF4FF] to-[#F4F8FF] p-6 text-center relative overflow-hidden shadow-sm">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1E57A8] text-white shadow-sm">
              <HeadphonesIcon size={20} strokeWidth={2} />
            </div>
            <h4 className="mb-1 text-[14px] font-bold text-[#1E57A8]">
              Need Assistance ?
            </h4>
            <p className="mb-4 text-[11px] leading-relaxed text-[#64748B]">
              Contact Our Support Team
              <br />
              Anytime For Quick Help.
            </p>
            <button
              className="w-full rounded-full border border-[#1E57A8] bg-white py-2.5 text-[13px] font-semibold text-[#1E57A8] transition-colors hover:bg-yellow-400 hover:border-transparent hover:text-white"
            >
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#00000040] backdrop-blur-sm px-4">
          <div className="w-full max-w-[360px] rounded-3xl bg-white p-8 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F0]">
              <LogOut size={24} className="text-[#E53E3E]" strokeWidth={2} />
            </div>

            {/* Modal Text */}
            <h3 className="mb-3 text-xl font-bold text-gray-900">Log out?</h3>
            <p className="mb-8 text-[14px] leading-relaxed text-gray-500">
              Are you sure you want to log out of your account? You&apos;ll need
              to sign back in to access your data.
            </p>

            {/* Modal Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 rounded-full border border-[#2B60A8] bg-white py-2.5 text-[14px] font-semibold text-[#2B60A8] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-full border border-[#E53E3E] bg-gradient-to-b from-white to-[#FFF0F0] py-2.5 text-[14px] font-semibold text-[#E53E3E] transition-colors hover:bg-[#FFF0F0]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;