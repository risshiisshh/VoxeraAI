"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthModal from "@/components/ui/AuthModal";

const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Timeline",     href: "/timeline" },
  { label: "Learn",        href: "/learn" },
  { label: "Find Booths",  href: "/booths" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.06]">
        <div className="section-container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
              style={{ background: "linear-gradient(135deg,#F5A623,#D4891A)" }}
              aria-hidden="true"
            >
              V
            </span>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Voxera<span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#8899BB] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Auth / CTA */}
          <div className="flex items-center gap-3 relative">
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      aria-label="User profile menu"
                      aria-expanded={profileOpen}
                    >
                      {user.photoURL ? (
                        <Image src={user.photoURL} alt={user.displayName ?? "User"} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-white/20" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0A1628] font-black text-sm">
                          {(user.displayName ?? user.email ?? "U").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-48 card py-2 shadow-xl z-50 border border-white/[0.08]">
                        <div className="px-4 py-2 border-b border-white/[0.06] mb-2">
                          <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                          <p className="text-xs text-[#8899BB] truncate">{user.email}</p>
                        </div>
                        {pathname !== "/assistant" && (
                          <Link
                            href="/assistant"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 text-sm text-[#8899BB] hover:text-white hover:bg-white/[0.04]"
                          >
                            AI Assistant
                          </Link>
                        )}
                        <button
                          onClick={() => { setProfileOpen(false); signOut(); }}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/[0.04] transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowAuth(true)}
                      className="text-sm font-medium text-[#8899BB] hover:text-white transition-colors hidden sm:block"
                    >
                      Sign In
                    </button>
                    <Link href="/onboarding" className="btn-primary text-sm py-2 px-4">
                      Get Started
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
