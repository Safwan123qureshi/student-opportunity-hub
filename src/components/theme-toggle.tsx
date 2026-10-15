"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { STORAGE_KEYS, createLocalStore } from "@/lib/storage";

type Theme = "light" | "dark";

const themeStore = createLocalStore<Theme | null>(STORAGE_KEYS.theme, null);

const subscribeTheme = (onChange: () => void) => themeStore.subscribe(onChange);

const getThemeClient = (): Theme => {
  const stored = themeStore.getSnapshot();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getThemeServer = (): Theme => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeClient,
    getThemeServer
  );

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    themeStore.set(next);
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
