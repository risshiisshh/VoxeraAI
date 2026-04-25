import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "VoxeraAI — Know your vote. Own your voice.",
    template: "%s | VoxeraAI",
  },
  description:
    "VoxeraAI is your AI-powered civic education guide. Understand elections, candidates, and your voting rights — explained clearly, in seconds.",
  keywords: ["elections", "voting", "civic education", "AI", "democracy", "India"],
  openGraph: {
    title: "VoxeraAI — Know your vote. Own your voice.",
    description: "AI-powered civic education. Understand elections in seconds.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxeraAI — Know your vote. Own your voice.",
    description: "AI-powered civic education. Understand elections in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 relative z-[1]">{children}</main>
      </body>
    </html>
  );
}
