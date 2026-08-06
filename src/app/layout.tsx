import type { Metadata } from "next";
import { Outfit, Albert_Sans } from "next/font/google";
import "./globals.css";

// Configure Google Fonts
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
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
    <html lang="en" className={`${outfit.variable} ${albertSans.variable} scroll-smooth`}>
      {/* 
        Tailwind global resets:
        bg-color2 = white background
        text-color6 = dark text
        font-albert = default font
      */}
      <body className="bg-color2 text-color6 font-albert overflow-x-hidden min-h-screen flex flex-col w-full antialiased">
        {children}
      </body>
    </html>
  );
}