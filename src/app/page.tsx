import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Building2,
  CheckCircle2,
  Compass,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { OpportunityCard } from "@/components/opportunity-card";
import { CATEGORY_DESCRIPTIONS, CATEGORIES } from "@/lib/constants";
import { getFeaturedOpportunities } from "@/lib/opportunities";
import type { Category } from "@/lib/types";

const CATEGORY_ICONS: Record<Category, typeof Search> = {
  Scholarships: Sparkles,
  Internships: Building2,
  "Free Courses": BookOpen,
};

export default function HomePage() {
  const featured = getFeaturedOpportunities();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verified against official sources
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl sm:leading-tight">
              Discover Opportunities. Build Your Future.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Find scholarships, internships, and learning opportunities designed
              to help Pakistani students move forward.
            </p>

            <form
              action="/opportunities"
              method="get"
              className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="home-search" className="sr-only">
                Search opportunities
              </label>
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="home-search"
                  name="q"
                  type="search"
                  placeholder="Search by title or organization…"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                Search
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Browse all opportunities
              </Link>
              <Link
                href="/eligibility"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <Target className="h-4 w-4" aria-hidden="true" />
                Check my eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Browse by category
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Start with the category that matches your goal.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            return (
              <Link
                key={category}
                href={`/opportunities?category=${encodeURIComponent(category)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                  {category}
                  <ArrowRight
                    className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {CATEGORY_DESCRIPTIONS[category]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Featured opportunities
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Popular programs verified against official organization websites.
              </p>
            </div>
            <Link
              href="/opportunities"
              className="hidden text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 sm:inline-flex sm:items-center sm:gap-1"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/opportunities"
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400"
            >
              View all opportunities →
            </Link>
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "1. Discover",
              text: "Search and filter verified scholarships, internships, and free courses built for Pakistani students.",
            },
            {
              icon: Target,
              title: "2. Check eligibility",
              text: "Enter your education level, province, and GPA to get a guidance-only match with clear reasoning.",
            },
            {
              icon: LineChart,
              title: "3. Track applications",
              text: "Save opportunities, set statuses, add notes, and never lose track of an important deadline.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-emerald-600">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-slate-200 bg-emerald-50/60 dark:border-slate-800 dark:bg-emerald-950/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Why students use this hub
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Honest information",
                text: "Every entry shows its verification status. Nothing is claimed open unless an official source says so.",
              },
              {
                icon: Bookmark,
                title: "Everything in one place",
                text: "Scholarships, internships, and free courses from trusted Pakistani and global organizations.",
              },
              {
                icon: CheckCircle2,
                title: "Actionable guidance",
                text: "The eligibility checker explains exactly why something matches — and why it might not.",
              },
              {
                icon: Compass,
                title: "Free to use",
                text: "No accounts, no payments. Your data stays in your browser and never leaves your device.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <b.icon
                  className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center sm:px-12 dark:bg-emerald-950">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25),transparent_60%)]"
          />
          <h2 className="relative text-2xl font-bold text-white sm:text-3xl">
            Ready to take the next step?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Set up your student profile once, and the eligibility checker will
            personalize results for you.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
            >
              Set up my profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400"
            >
              Explore opportunities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
