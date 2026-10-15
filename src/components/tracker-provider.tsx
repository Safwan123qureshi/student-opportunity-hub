"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  STORAGE_KEYS,
  createLocalStore,
} from "@/lib/storage";
import type {
  ApplicationStatus,
  StudentProfile,
  TrackerEntry,
} from "@/lib/types";

export const DEFAULT_PROFILE: StudentProfile = {
  educationLevel: "",
  province: "",
  institution: "",
  gpa: "",
  fieldOfStudy: "",
  interests: [],
};

const entriesStore = createLocalStore<Record<string, TrackerEntry>>(
  STORAGE_KEYS.tracker,
  {}
);
const profileStore = createLocalStore<StudentProfile>(
  STORAGE_KEYS.profile,
  DEFAULT_PROFILE
);

/** "Mounted" detection without setState-in-effect. */
const subscribeMounted = () => () => {};
const getMountedClient = () => true;
const getMountedServer = () => false;

interface TrackerContextValue {
  /** False during SSR/first hydration paint — render loading states meanwhile. */
  hydrated: boolean;
  entries: Record<string, TrackerEntry>;
  profile: StudentProfile;
  isSaved: (id: string) => boolean;
  saveOpportunity: (id: string) => void;
  unsaveOpportunity: (id: string) => void;
  setStatus: (id: string, status: ApplicationStatus) => void;
  setNotes: (id: string, notes: string) => void;
  setAppliedDate: (id: string, date: string) => void;
  setCompletedDate: (id: string, date: string) => void;
  deleteEntry: (id: string) => void;
  updateProfile: (profile: StudentProfile) => void;
}

const TrackerContext = createContext<TrackerContextValue | null>(null);

export function useTracker(): TrackerContextValue {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error("useTracker must be used within TrackerProvider");
  return ctx;
}

export function TrackerProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(
    subscribeMounted,
    getMountedClient,
    getMountedServer
  );
  const entries = useSyncExternalStore(
    entriesStore.subscribe,
    entriesStore.getSnapshot,
    entriesStore.getServerSnapshot
  );
  const profile = useSyncExternalStore(
    profileStore.subscribe,
    profileStore.getSnapshot,
    profileStore.getServerSnapshot
  );

  const isSaved = useCallback((id: string) => Boolean(entries[id]), [entries]);

  const saveOpportunity = useCallback(
    (id: string) => {
      if (entries[id]) return;
      entriesStore.set({
        ...entries,
        [id]: {
          opportunityId: id,
          status: "Interested",
          notes: "",
          savedAt: new Date().toISOString(),
          appliedAt: null,
          completedAt: null,
        },
      });
    },
    [entries]
  );

  const unsaveOpportunity = useCallback(
    (id: string) => {
      if (!entries[id]) return;
      const next = { ...entries };
      delete next[id];
      entriesStore.set(next);
    },
    [entries]
  );

  const patchEntry = useCallback(
    (id: string, patch: Partial<TrackerEntry>) => {
      const existing = entries[id];
      if (!existing) return;
      entriesStore.set({ ...entries, [id]: { ...existing, ...patch } });
    },
    [entries]
  );

  const setStatus = useCallback(
    (id: string, status: ApplicationStatus) => {
      const patch: Partial<TrackerEntry> = { status };
      const now = new Date().toISOString();
      if (status === "Applied") patch.appliedAt = entries[id]?.appliedAt ?? now;
      if (status === "Completed") {
        patch.completedAt = now;
        patch.appliedAt = entries[id]?.appliedAt ?? now;
      }
      patchEntry(id, patch);
    },
    [entries, patchEntry]
  );

  const updateProfile = useCallback((next: StudentProfile) => {
    profileStore.set(next);
  }, []);

  const value = useMemo<TrackerContextValue>(
    () => ({
      hydrated,
      entries,
      profile,
      isSaved,
      saveOpportunity,
      unsaveOpportunity,
      setStatus,
      setNotes: (id, notes) => patchEntry(id, { notes }),
      setAppliedDate: (id, date) => patchEntry(id, { appliedAt: date || null }),
      setCompletedDate: (id, date) =>
        patchEntry(id, { completedAt: date || null }),
      deleteEntry: unsaveOpportunity,
      updateProfile,
    }),
    [
      hydrated,
      entries,
      profile,
      isSaved,
      saveOpportunity,
      unsaveOpportunity,
      setStatus,
      patchEntry,
      updateProfile,
    ]
  );

  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  );
}
