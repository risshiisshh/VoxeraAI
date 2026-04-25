"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import { getGuidesByTopic } from "@/lib/learn-data";

export interface ProgressState {
  guidesRead: Set<string>;
  loading: boolean;
}

export function useProgress() {
  const { user } = useAuth();
  const [state, setState] = useState<ProgressState>({ guidesRead: new Set(), loading: true });

  // Load progress from Firestore on mount / user change
  useEffect(() => {
    if (!user) {
      setState({ guidesRead: new Set(), loading: false });
      return;
    }

    let cancelled = false;
    async function loadProgress() {
      try {
        const db = getFirebaseDb();
        const ref = doc(db, "users", user!.uid, "progress", "learn");
        const snap = await getDoc(ref);
        if (!cancelled) {
          if (snap.exists()) {
            const data = snap.data();
            setState({
              guidesRead: new Set(data.guidesRead ?? []),
              loading: false,
            });
          } else {
            setState({ guidesRead: new Set(), loading: false });
          }
        }
      } catch {
        if (!cancelled) setState({ guidesRead: new Set(), loading: false });
      }
    }

    loadProgress();
    return () => { cancelled = true; };
  }, [user]);

  // Mark a guide as read and persist to Firestore
  const markAsRead = useCallback(
    async (guideId: string) => {
      if (!user) return;

      setState((prev) => {
        if (prev.guidesRead.has(guideId)) return prev;
        return { ...prev, guidesRead: new Set([...prev.guidesRead, guideId]) };
      });

      try {
        const db = getFirebaseDb();
        const ref = doc(db, "users", user.uid, "progress", "learn");
        const snap = await getDoc(ref);
        const existing: string[] = snap.exists() ? (snap.data().guidesRead ?? []) : [];
        if (!existing.includes(guideId)) {
          await setDoc(ref, {
            guidesRead: [...existing, guideId],
            lastVisited: new Date().toISOString(),
          }, { merge: true });
        }
      } catch (err) {
        console.warn("Failed to persist progress:", err);
      }
    },
    [user]
  );

  // Check if a specific guide has been read
  const isRead = useCallback(
    (guideId: string) => state.guidesRead.has(guideId),
    [state.guidesRead]
  );

  // Get read count for a topic
  const getTopicProgress = useCallback(
    (topicSlug: string) => {
      const guides = getGuidesByTopic(topicSlug);
      const readCount = guides.filter((g) => state.guidesRead.has(g.id)).length;
      return { read: readCount, total: guides.length };
    },
    [state.guidesRead]
  );

  // Total read count across all guides
  const totalRead = state.guidesRead.size;

  return { isRead, markAsRead, getTopicProgress, totalRead, loading: state.loading };
}
