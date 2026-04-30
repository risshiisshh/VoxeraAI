"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Language {
  code: string;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en",  label: "English",   nativeName: "English",    flag: "🇬🇧" },
  { code: "hi",  label: "Hindi",     nativeName: "हिन्दी",       flag: "🇮🇳" },
  { code: "ta",  label: "Tamil",     nativeName: "தமிழ்",       flag: "🇮🇳" },
  { code: "te",  label: "Telugu",    nativeName: "తెలుగు",       flag: "🇮🇳" },
  { code: "bn",  label: "Bengali",   nativeName: "বাংলা",        flag: "🇮🇳" },
  { code: "mr",  label: "Marathi",   nativeName: "मराठी",        flag: "🇮🇳" },
  { code: "kn",  label: "Kannada",   nativeName: "ಕನ್ನಡ",       flag: "🇮🇳" },
];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: LANGUAGES[0],
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Lazy initializer — reads localStorage once, before first render
    // The typeof window guard makes it safe in SSR environments
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("voxeraai-language");
        if (saved) {
          const found = LANGUAGES.find((l) => l.code === saved);
          if (found) return found;
        }
      } catch {
        // localStorage not available
      }
    }
    return LANGUAGES[0];
  });

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    try {
      localStorage.setItem("voxeraai-language", lang.code);
    } catch {
      // ignore
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
