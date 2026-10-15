import { STORAGE_KEYS } from "@/lib/storage";

/**
 * Inline script that applies the stored (or system) theme class to <html>
 * before first paint to avoid a flash of the wrong theme.
 * Server-safe: must NOT live in a "use client" module.
 */
export function applyThemeScript() {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(
    STORAGE_KEYS.theme
  )});t=t?JSON.parse(t):(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;
}