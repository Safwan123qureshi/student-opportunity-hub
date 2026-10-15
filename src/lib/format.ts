/** Date helpers — everything works with ISO yyyy-mm-dd strings or ISO datetimes. */

/** Parse a yyyy-mm-dd string as local time (avoids UTC off-by-one). */
export function parseDateOnly(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Not published";
  const date = iso.length <= 10 ? parseDateOnly(iso) : new Date(iso);
  if (Number.isNaN(date.getTime())) return "Not published";
  return date.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Days from now until the given ISO date. Positive = future. */
export function daysUntil(iso: string): number {
  const target = parseDateOnly(iso);
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return Math.round((target.getTime() - startOfToday.getTime()) / 86_400_000);
}

export function isPastDeadline(iso: string): boolean {
  return daysUntil(iso) < 0;
}
