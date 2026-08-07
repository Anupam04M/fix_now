import type { Metadata } from "next";
import { Outfit, Albert_Sans } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${outfit.variable} ${albertSans.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </head>
      <body className="font-[family-name:var(--albert-sans-r)] min-h-screen flex flex-col w-full antialiased">
        {children}
      </body>
    </html>
  );
}