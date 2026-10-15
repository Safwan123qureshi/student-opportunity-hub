"use client";

import {
  CalendarDays,
  ExternalLink,
  Info,
  MessageSquareText,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryBadge } from "@/components/badges";
import { useToast } from "@/components/toast-provider";
import { useTracker } from "@/components/tracker-provider";
import { daysUntil } from "@/lib/format";
import { getOpportunityById } from "@/lib/opportunities";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/types";

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Interested:
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-300",
  "Planning to Apply":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-slate-900 dark:text-amber-300",
  Applied:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-slate-900 dark:text-violet-300",
  Completed:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300",
};

const FILTERS: Array<ApplicationStatus | "All"> = [
  "All",
  ...APPLICATION_STATUSES,
];

export function TrackerView({ mode }: { mode: "saved" | "tracker" }) {
  const {
    hydrated,
    entries,
    setStatus,
    setNotes,
    setAppliedDate,
    setCompletedDate,
    deleteEntry,
  } = useTracker();
  const { pushToast } = useToast();
  const [filter, setFilter] = useState<ApplicationStatus | "All">("All");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState<Record<string, boolean>>({});

  const rows = useMemo(() => {
    return Object.values(entries)
      .map((entry) => ({ entry, opp: getOpportunityById(entry.opportunityId) }))
      .filter((r) => r.opp !== undefined)
      .filter((r) => filter === "All" || r.entry.status === filter)
      .sort((a, b) => {
        const da = a.opp?.deadline ? daysUntil(a.opp.deadline) : Infinity;
        const db = b.opp?.deadline ? daysUntil(b.opp.deadline) : Infinity;
        if (da !== db) return da - db;
        return b.entry.savedAt.localeCompare(a.entry.savedAt);
      });
  }, [entries, filter]);

  if (!hydrated) {
    return (
      <div className="space-y-4" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          />
        ))}
      </div>
    );
  }

  const total = Object.keys(entries).length;

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
        <Info className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
        <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
          {mode === "saved"
            ? "You haven't saved any opportunities yet"
            : "Your application tracker is empty"}
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Browse the directory and click “Save” on any opportunity to start
          tracking it here.
        </p>
        <Link
          href="/opportunities"
          className="mt-5 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Browse opportunities
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div
        className="mb-4 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter by status"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400" role="status">
        {rows.length} {rows.length === 1 ? "entry" : "entries"}
        {filter !== "All" ? ` with status “${filter}”` : ""}.
      </p>

      <div className="space-y-4">
        {rows.map(({ entry, opp }) => {
          if (!opp) return null;
          const deadlineDays = opp.deadline ? daysUntil(opp.deadline) : null;
          return (
            <div
              key={entry.opportunityId}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryBadge category={opp.category} />
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {opp.title}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {opp.organization}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={opp.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    Official page
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  {confirmDelete === entry.opportunityId ? (
                    <button
                      type="button"
                      onClick={() => {
                        deleteEntry(entry.opportunityId);
                        setConfirmDelete(null);
                        pushToast("Entry deleted.", "info");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Confirm delete
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(entry.opportunityId)}
                      aria-label={`Delete ${opp.title} from tracker`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:border-red-400 hover:text-red-600 dark:border-slate-700 dark:text-slate-400"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`status-${entry.opportunityId}`}
                    className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
                  >
                    Application status
                  </label>
                  <select
                    id={`status-${entry.opportunityId}`}
                    value={entry.status}
                    onChange={(e) => {
                      setStatus(
                        entry.opportunityId,
                        e.target.value as ApplicationStatus
                      );
                      pushToast("Status updated.", "success");
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {APPLICATION_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {deadlineDays !== null ? (
                      <>
                        Verified deadline: {deadlineDays >= 0
                          ? `in ${deadlineDays} day${deadlineDays === 1 ? "" : "s"}`
                          : "passed"}
                      </>
                    ) : (
                      "No verified deadline published"
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      Applied:
                      <input
                        type="date"
                        value={entry.appliedAt ? entry.appliedAt.slice(0, 10) : ""}
                        onChange={(e) =>
                          setAppliedDate(entry.opportunityId, e.target.value)
                        }
                        aria-label="Application date"
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      Completed:
                      <input
                        type="date"
                        value={
                          entry.completedAt ? entry.completedAt.slice(0, 10) : ""
                        }
                        onChange={(e) =>
                          setCompletedDate(entry.opportunityId, e.target.value)
                        }
                        aria-label="Completion date"
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={() =>
                    setNotesOpen((prev) => ({
                      ...prev,
                      [entry.opportunityId]: !prev[entry.opportunityId],
                    }))
                  }
                  aria-expanded={notesOpen[entry.opportunityId] ?? false}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  {entry.notes ? "Edit notes" : "Add notes"}
                </button>
                {(notesOpen[entry.opportunityId] ?? false) && (
                  <textarea
                    value={entry.notes}
                    onChange={(e) =>
                      setNotes(entry.opportunityId, e.target.value)
                    }
                    rows={3}
                    placeholder="Personal notes — e.g. documents to prepare, contact person, next step…"
                    aria-label={`Personal notes for ${opp.title}`}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                )}
                {!notesOpen[entry.opportunityId] && entry.notes && (
                  <p className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {entry.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}