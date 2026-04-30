"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-6"
        style={{ background: "linear-gradient(135deg,#F5A623,#D4891A)" }}
        aria-hidden="true"
      >
        V
      </div>
      <h1 className="text-5xl font-extrabold text-white mb-3">404</h1>
      <p className="text-lg text-[#B0C0DF] mb-8 max-w-md">
        This page doesn&apos;t exist. It may have moved or the link may be incorrect.
      </p>
      <Link href="/" className="btn-primary px-6 py-3">
        Back to Home
      </Link>
    </div>
  );
}
