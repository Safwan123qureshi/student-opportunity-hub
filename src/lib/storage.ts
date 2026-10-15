/** Safe localStorage access for Next.js (SSR-safe, tolerant of blocked storage). */

export function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked (private mode) — fail silently; UI keeps working in memory.
  }
}

export function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}

export const STORAGE_KEYS = {
  tracker: "sohp.tracker.entries.v1",
  profile: "sohp.profile.v1",
  theme: "sohp.theme.v1",
} as const;

/* ---------------------- Reactive localStorage store ----------------------- */

const LOCAL_CHANGE_EVENT = "sohp:local-change";

export interface LocalStore<T> {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (value: T) => void;
}

/**
 * A tiny external store backed by localStorage, designed for
 * `useSyncExternalStore`. Safe during SSR: the server snapshot is a constant
 * fallback, so hydration never mismatches. Falls back to in-memory state if
 * browser storage is blocked or full.
 */
export function createLocalStore<T>(
  key: string,
  serverFallback: T,
  resolveClientFallback?: () => T
): LocalStore<T> {
  let cachedRaw: string | null | undefined;
  let cachedValue: T = serverFallback;
  let storageBroken = false;

  const resolveFallback = (): T =>
    resolveClientFallback ? resolveClientFallback() : serverFallback;

  const parse = (raw: string | null): T => {
    if (raw === null) return resolveFallback();
    try {
      return JSON.parse(raw) as T;
    } catch {
      return resolveFallback();
    }
  };

  const readRaw = (): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      storageBroken = true;
      return cachedRaw ?? null;
    }
  };

  const getSnapshot = (): T => {
    if (storageBroken) return cachedValue;
    const raw = readRaw();
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedValue = parse(raw);
    }
    return cachedValue;
  };

  const getServerSnapshot = (): T => serverFallback;

  const subscribe = (onChange: () => void): (() => void) => {
    const onLocal = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (!detail || detail.key === key) onChange();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === key) onChange();
    };
    window.addEventListener(LOCAL_CHANGE_EVENT, onLocal);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(LOCAL_CHANGE_EVENT, onLocal);
      window.removeEventListener("storage", onStorage);
    };
  };

  const set = (value: T): void => {
    if (typeof window === "undefined") return;
    const raw = JSON.stringify(value);
    try {
      window.localStorage.setItem(key, raw);
    } catch {
      storageBroken = true; // Keep working from memory instead.
    }
    cachedRaw = raw;
    cachedValue = value;
    window.dispatchEvent(
      new CustomEvent(LOCAL_CHANGE_EVENT, { detail: { key } })
    );
  };

  return { subscribe, getSnapshot, getServerSnapshot, set };
}
