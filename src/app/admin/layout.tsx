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

      {/* Only apply margin on desktop */}
      <div className="lg:ml-64">
        

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
