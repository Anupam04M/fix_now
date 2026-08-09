import React from "react";
import Navbar from "@/layouts/user-panel/Navbar";
import Footer from "@/layouts/user-panel/Footer";

export default function UserLayout({
  children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}