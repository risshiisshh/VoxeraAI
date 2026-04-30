import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        {/* Skip to main content — accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#F5A623] focus:text-[#0A1628] focus:font-bold focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>

        <LanguageProvider>
          <Navbar />
          <main id="main-content" className="flex-1 relative z-[1]">
            {children}
          </main>
        </LanguageProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
