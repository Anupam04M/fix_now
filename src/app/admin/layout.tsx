"use client";

import Sidebar from "@/layouts/admin-panel/Sidebar";




export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Only apply margin once the fixed sidebar is visible (xl+),
          cleared by the sidebar's real width so nothing overlaps */}
      <div className="xl:ml-[295px]">
        

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
