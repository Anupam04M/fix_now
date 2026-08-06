"use client"
import Footer from "@/layouts/user-panel/Footer";
import Navbar from "@/layouts/user-panel/Navbar";
import React from "react";

const Userlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Userlayout;
