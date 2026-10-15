"use client";

import { SearchX, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/opportunity-card";
import { PageHeader } from "@/components/ui";
import { CATEGORIES, EDUCATION_LEVELS, PROVINCES } from "@/lib/constants";
import { OPPORTUNITIES } from "@/lib/opportunities";
import { daysUntil } from "@/lib/format";
import type { Category, EducationLevel, Province } from "@/lib/types";

type SortOption = "deadline-soon" | "deadline-latest" | "title";

const SORT_LABELS: Record<SortOption, string> = {
  "deadline-soon": "Deadline (soonest first)",
  "deadline-latest": "Deadline (latest first)",
  title: "Title (A–Z)",
};

export function OpportunitiesExplorer({
  initialQuery = "",
  initialCategory = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(
    CATEGORIES.includes(initialCategory as Category) ? initialCategory : ""
  );
  const [level, setLevel] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("deadline-soon");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = OPPORTUNITIES.filter((opp) => {
      if (
        q &&
        !opp.title.toLowerCase().includes(q) &&
        !opp.organization.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (category && opp.category !== category) return false;
      if (level && !opp.educationLevels.includes(level as EducationLevel))
        return false;
      if (
        province &&
        opp.provinces.length > 0 &&
        !opp.provinces.includes(province as Province)
      ) {
        return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      // Entries without verified deadlines always sort last.
      if (a.deadline && b.deadline) {
        const diff = daysUntil(a.deadline) - daysUntil(b.deadline);
        return sort === "deadline-soon" ? diff : -diff;
      }
      if (a.deadline) return -1;
      if (b.deadline) return 1;
      return 0;
    });

    return list;
  }, [query, category, level, province, sort]);

  const hasActiveFilters = Boolean(query || category || level || province);

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setLevel("");
    setProvince("");
  };

  const selectClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Opportunities directory"
        description="Search scholarships, internships, and free courses. Every entry shows its verification status — always confirm details on the official source before applying."
      />

      <div className="grid gap-8 lg:grid-cols-[16rem,1fr]">
        <div>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {filtersOpen ? "Hide filters" : "Show filters"}
          </button>

          <form
            role="search"
            aria-label="Filter opportunities"
            onSubmit={(e) => e.preventDefault()}
            className={`${filtersOpen ? "block" : "hidden"} space-y-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block`}
          >
            <div>
              <label htmlFor="filter-search" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Search
              </label>
              <input
                id="filter-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title or organization"
                className={selectClass}
              />
            </div>
            <div>
              <label htmlFor="filter-category" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Category
              </label>
              <select id="filter-category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                <option value="">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-level" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Education level
              </label>
              <select id="filter-level" value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
                <option value="">All levels</option>
                {EDUCATION_LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-province" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Province
              </label>
              <select id="filter-province" value={province} onChange={(e) => setProvince(e.target.value)} className={selectClass}>
                <option value="">All provinces</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                Nationwide opportunities always appear.
              </p>
            </div>
            <div>
              <label htmlFor="filter-sort" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Sort by
              </label>
              <select id="filter-sort" value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className={selectClass}>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <option key={key} value={key}>{SORT_LABELS[key]}</option>
                ))}
              </select>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300"
              >
                Clear all filters
              </button>
            )}
          </form>
        </div>
        <div>
          <p
            className="mb-4 text-sm text-slate-500 dark:text-slate-400"
            role="status"
          >
            {results.length}{" "}
            {results.length === 1 ? "opportunity" : "opportunities"} found
            {hasActiveFilters ? " with current filters" : ""}.
          </p>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
              <SearchX
                className="mx-auto h-10 w-10 text-slate-400"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                No opportunities match your filters
              </h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Try a different search term, or clear the filters to see the
                full directory.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}