"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

type Mode = "signin" | "signup" | "reset";

interface Props {
  onClose: () => void;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.5 26.8 36.5 24 36.5c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.5 39.5 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.1-2.2 3.9-4 5.1l6.2 5.2C37 36.5 44 31 44 24c0-1.3-.1-2.7-.4-3.9z"/>
    </svg>
  );
}

/** Minimal shape of a Firebase Auth error */
interface FirebaseError {
  code?: string;
}

function emailToFirebaseError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":    return "This email is already registered. Sign in instead.";
    case "auth/invalid-email":           return "Please enter a valid email address.";
    case "auth/weak-password":           return "Password must be at least 6 characters.";
    case "auth/user-not-found":          return "No account found with this email.";
    case "auth/wrong-password":          return "Incorrect password. Try again or reset it.";
    case "auth/too-many-requests":       return "Too many attempts. Please wait a moment.";
    case "auth/invalid-credential":      return "Incorrect email or password.";
    case "auth/popup-closed-by-user":    return "Sign-in popup was closed. Please try again.";
    default:                             return "Something went wrong. Please try again.";
  }
}

export default function AuthModal({ onClose }: Props) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const [mode, setMode]             = useState<Mode>("signin");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [name, setName]             = useState("");
  const [busy, setBusy]             = useState(false);
  const [error, setError]           = useState("");
  const [resetSent, setResetSent]   = useState(false);

  const firstFocusRef  = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on open
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Trap focus and close on Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Basic focus trap: Tab cycles within the modal
      if (e.key === "Tab") {
        const focusable = Array.from(
          (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), a[href]'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  function clearError() { setError(""); }

  async function handleGoogle() {
    setBusy(true); clearError();
    try {
      await signInWithGoogle();
      onClose();
    } catch (e: unknown) {
      const err = e as FirebaseError;
      setError(emailToFirebaseError(err.code ?? ""));
    } finally { setBusy(false); }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); clearError();
    try {
      if (mode === "signup") {
        if (!name.trim()) { setError("Please enter your name."); setBusy(false); return; }
        await signUpWithEmail(email, password, name.trim());
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (e: unknown) {
      const err = e as FirebaseError;
      setError(emailToFirebaseError(err.code ?? ""));
    } finally { setBusy(false); }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); clearError();
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (e: unknown) {
      const err = e as FirebaseError;
      setError(emailToFirebaseError(err.code ?? ""));
    } finally { setBusy(false); }
  }

  const modalTitle =
    mode === "signup" ? "Create account" :
    mode === "reset"  ? "Reset password" :
    "Welcome back";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="card w-full max-w-md p-8 animate-fade-up relative"
        style={{ border: "1px solid rgba(245,166,35,0.2)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onKeyDown={handleKeyDown}
      >
        {/* Close */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A9BB8] hover:text-white transition-colors text-lg"
          aria-label="Close sign in dialog"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6" aria-hidden="true">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
            style={{ background: "linear-gradient(135deg,#F5A623,#D4891A)" }}
          >V</span>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Voxera<span className="text-gradient">AI</span>
          </span>
        </div>

        {/* Title */}
        <h2 id="auth-modal-title" className="text-2xl font-extrabold text-white mb-1">
          {modalTitle}
        </h2>
        <p className="text-sm text-[#B0C0DF] mb-6">
          {mode === "signup"
            ? "Join VoxeraAI — your AI civic guide."
            : mode === "reset"
            ? "We'll send a reset link to your email."
            : "Sign in to save your progress and preferences."}
        </p>

        {/* Error */}
        {error && (
          <div role="alert" className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300 bg-red-500/10 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Reset success */}
        {resetSent && (
          <div role="status" className="mb-4 px-4 py-3 rounded-xl text-sm text-green-300 bg-green-500/10 border border-green-500/20">
            ✅ Reset link sent! Check your inbox.
          </div>
        )}

        {mode !== "reset" && (
          <>
            {/* Google button */}
            <button
              ref={firstFocusRef}
              id="auth-google-btn"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-sm transition-all mb-4 disabled:opacity-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4" aria-hidden="true">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-xs text-[#8A9BB8]">or</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailAuth} className="space-y-3" noValidate>
              {mode === "signup" && (
                <div>
                  <label htmlFor="auth-name" className="text-xs font-medium text-[#B0C0DF] block mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    className="input-base"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError(); }}
                    required
                    autoComplete="name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="auth-email" className="text-xs font-medium text-[#B0C0DF] block mb-1.5">
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  className="input-base"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="auth-password" className="text-xs font-medium text-[#B0C0DF] block mb-1.5">
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  className="input-base"
                  placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  required
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>

              {mode === "signin" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => { setMode("reset"); clearError(); }}
                    className="text-xs text-[#F5A623] hover:opacity-80 transition-opacity"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                id={mode === "signup" ? "auth-signup-submit" : "auth-signin-submit"}
                type="submit"
                className="btn-primary w-full mt-2"
                disabled={busy}
              >
                {busy ? "Please wait…" : mode === "signup" ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Switch mode */}
            <p className="text-center text-sm text-[#B0C0DF] mt-5">
              {mode === "signin" ? (
                <>Don&apos;t have an account?{" "}
                  <button
                    onClick={() => { setMode("signup"); clearError(); }}
                    className="text-[#F5A623] hover:opacity-80 font-medium"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button
                    onClick={() => { setMode("signin"); clearError(); }}
                    className="text-[#F5A623] hover:opacity-80 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </>
        )}

        {/* Reset password form */}
        {mode === "reset" && !resetSent && (
          <form onSubmit={handleReset} className="space-y-3" noValidate>
            <div>
              <label htmlFor="reset-email" className="text-xs font-medium text-[#B0C0DF] block mb-1.5">
                Email
              </label>
              <input
                id="reset-email"
                type="email"
                className="input-base"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                required
                autoComplete="email"
              />
            </div>
            <button
              id="auth-reset-submit"
              type="submit"
              className="btn-primary w-full"
              disabled={busy}
            >
              {busy ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}

        {mode === "reset" && (
          <button
            onClick={() => { setMode("signin"); clearError(); setResetSent(false); }}
            className="btn-ghost w-full mt-3 text-sm"
          >
            ← Back to Sign In
          </button>
        )}

        {/* Guest note */}
        {mode !== "reset" && (
          <p className="text-xs text-[#8A9BB8] text-center mt-4">
            No account? You can still use VoxeraAI as a guest.{" "}
            <button onClick={onClose} className="text-[#B0C0DF] hover:text-white underline">
              Continue as guest
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
