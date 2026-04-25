"use client";
import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, getGoogleProvider } from "@/lib/firebase";

export type AuthError = {
  code: string;
  message: string;
};

export function useAuth() {
  const [user, setUser]       = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  /** Upsert user document in Firestore on first sign-in */
  async function upsertUserDoc(u: FirebaseUser) {
    const db  = getFirebaseDb();
    const ref = doc(db, "users", u.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid:                u.uid,
        email:              u.email,
        displayName:        u.displayName ?? u.email?.split("@")[0] ?? "User",
        photoURL:           u.photoURL ?? null,
        onboardingComplete: false,
        createdAt:          serverTimestamp(),
      });
    }
  }

  /** Sign in with Google popup */
  async function signInWithGoogle() {
    try {
      const auth     = getFirebaseAuth();
      const provider = getGoogleProvider();
      const result   = await signInWithPopup(auth, provider);
      await upsertUserDoc(result.user);
      return result;
    } catch (err) {
      console.error("Google sign-in error:", err);
      throw err;
    }
  }

  /** Sign in with email + password */
  async function signInWithEmail(email: string, password: string) {
    try {
      const auth   = getFirebaseAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      console.error("Email sign-in error:", err);
      throw err;
    }
  }

  /** Create account with email + password + display name */
  async function signUpWithEmail(email: string, password: string, displayName: string) {
    try {
      const auth   = getFirebaseAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name on the Firebase Auth profile
      await updateProfile(result.user, { displayName });
      await upsertUserDoc({ ...result.user, displayName });
      return result;
    } catch (err) {
      console.error("Email sign-up error:", err);
      throw err;
    }
  }

  /** Send a password reset email */
  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
    } catch (err) {
      console.error("Password reset error:", err);
      throw err;
    }
  }

  async function signOut() {
    await firebaseSignOut(getFirebaseAuth());
  }

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    signOut,
  };
}
