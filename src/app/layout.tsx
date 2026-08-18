import type { Metadata } from "next";
import { Outfit, Albert_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--outfit-r",
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--albert-sans-r",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixNow",
  description: "Trusted Local Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", outfit.variable, albertSans.variable, "font-sans", geist.variable)}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </head>
      <body className="font-[family-name:var(--albert-sans-r)] min-h-screen flex flex-col w-full antialiased">
        {children}
      </body>
    </html>
  );
}