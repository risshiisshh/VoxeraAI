"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage, LANGUAGES, type Language } from "@/lib/language-context";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // Close on Escape, return focus to trigger
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    },
    []
  );

  function select(lang: Language) {
    setLanguage(lang);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${language.label}`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-[#B0C0DF] hover:text-white hover:bg-white/[0.06] transition-all border border-transparent hover:border-white/[0.08]"
      >
        <span aria-hidden="true">🌐</span>
        <span className="hidden sm:inline">{language.code.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-2 w-52 z-[200] rounded-xl border border-white/[0.10] shadow-2xl overflow-hidden"
          style={{ background: "rgba(15,25,50,0.97)", backdropFilter: "blur(16px)" }}
        >
          <div className="px-3 py-2 border-b border-white/[0.06]">
            <p className="text-xs font-semibold text-[#8A9BB8] uppercase tracking-widest">
              Select Language
            </p>
          </div>
          <ul className="py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === language.code;
              return (
                <li key={lang.code}>
                  <button
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => select(lang)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition-colors ${
                      isSelected
                        ? "bg-[#F5A623]/10 text-[#F5A623]"
                        : "text-[#B0C0DF] hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span aria-hidden="true">{lang.flag}</span>
                      <span className="font-medium">{lang.nativeName}</span>
                    </span>
                    <span className="text-xs text-[#8A9BB8]">{lang.label}</span>
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-[#F5A623] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
