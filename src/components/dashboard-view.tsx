"use client";

import {
  BarChart3,
  Bookmark,
  CalendarClock,
  CheckCircle2,
  Loader2,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useTracker } from "@/components/tracker-provider";
import { PageHeader } from "@/components/ui";
import { daysUntil, formatDate } from "@/lib/format";
import { getOpportunityById } from "@/lib/opportunities";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/types";

const BAR_COLORS: Record<ApplicationStatus, string> = {
  Interested: "bg-sky-500",
  "Planning to Apply": "bg-amber-500",
  Applied: "bg-violet-500",
  Completed: "bg-emerald-500",
};

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bookmark;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <Icon
        className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
        aria-hidden="true"
      />
      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

export function DashboardView() {
  const { hydrated, entries } = useTracker();

  const stats = useMemo(() => {
    const all = Object.values(entries);
    const counts = Object.fromEntries(
      APPLICATION_STATUSES.map((s) => [s, 0])
    ) as Record<ApplicationStatus, number>;
    for (const e of all) counts[e.status] += 1;

    const upcoming = all
      .map((e) => ({ e, opp: getOpportunityById(e.opportunityId) }))
      .filter((r) => r.opp?.deadline && daysUntil(r.opp.deadline) >= 0)
      .sort(
        (a, b) => daysUntil(a.opp!.deadline!) - daysUntil(b.opp!.deadline!)
      )
      .slice(0, 5);

    const recent = all
      .slice()
      .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
      .slice(0, 4);

    return {
      total: all.length,
      inProgress:
        counts["Interested"] +
        counts["Planning to Apply"] +
        counts["Applied"],
      completed: counts["Completed"],
      counts,
      upcoming,
      recent,
    };
  }, [entries]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading dashboard…</span>
      </div>
    );
  }
  const totalForBar = Math.max(
    1,
    APPLICATION_STATUSES.reduce((sum, s) => sum + stats.counts[s], 0)
  );

  return (
    <div>
      <PageHeader
        title="Student dashboard"
        description="A live overview computed from your saved opportunities and application tracker."
      >
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Rocket className="h-4 w-4" aria-hidden="true" />
          Find more opportunities
        </Link>
      </PageHeader>

      {stats.total === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <BarChart3
            className="mx-auto h-10 w-10 text-slate-400"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            Nothing to show yet
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Save your first opportunity and your dashboard will come alive with
            stats, deadlines, and progress.
          </p>
          <Link
            href="/opportunities"
            className="mt-5 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Browse opportunities
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Bookmark} label="Total saved" value={stats.total} />
            <StatCard
              icon={Loader2}
              label="In progress"
              value={stats.inProgress}
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={stats.completed}
            />
            <StatCard
              icon={CalendarClock}
              label="Upcoming deadlines"
              value={stats.upcoming.length}
            />
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Application progress
            </h2>
            <div
              className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              role="img"
              aria-label={APPLICATION_STATUSES.map(
                (s) => `${s}: ${stats.counts[s]}`
              ).join(", ")}
            >
              {APPLICATION_STATUSES.map((s) =>
                stats.counts[s] > 0 ? (
                  <div
                    key={s}
                    className={BAR_COLORS[s]}
                    style={{
                      width: `${(stats.counts[s] / totalForBar) * 100}%`,
                    }}
                  />
                ) : null
              )}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {APPLICATION_STATUSES.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${BAR_COLORS[s]}`}
                    aria-hidden="true"
                  />
                  {s}: <strong>{stats.counts[s]}</strong>
                </li>
              ))}
            </ul>
          </section>
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                Upcoming verified deadlines
              </h2>
              {stats.upcoming.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  No saved opportunity currently has a verified upcoming
                  deadline. Most listings publish deadlines through their
                  official universities or websites.
                </p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {stats.upcoming.map(({ e, opp }) => (
                    <li
                      key={e.opportunityId}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <Link
                        href={`/opportunities/${opp!.id}`}
                        className="font-medium text-slate-800 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
                      >
                        {opp!.title}
                      </Link>
                      <span className="shrink-0 text-slate-500 dark:text-slate-400">
                        {formatDate(opp!.deadline)} (
                        {daysUntil(opp!.deadline!)}d)
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                Recently saved
              </h2>
              <ul className="mt-3 space-y-3">
                {stats.recent.map((e) => {
                  const opp = getOpportunityById(e.opportunityId);
                  if (!opp) return null;
                  return (
                    <li
                      key={e.opportunityId}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <Link
                        href={`/opportunities/${opp.id}`}
                        className="font-medium text-slate-800 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
                      >
                        {opp.title}
                      </Link>
                      <span className="shrink-0 rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {e.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}