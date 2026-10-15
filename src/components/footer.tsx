import { GraduationCap } from "lucide-react";
import Link from "next/link";

// Evaluated once per module load (stable across prerenders).
const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            Student Opportunity Hub Pakistan
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            A free, independent guide to scholarships, internships, and free
            courses for students across Pakistan. Always confirm details on
            official organization websites before applying.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link className="hover:text-emerald-600 dark:hover:text-emerald-400" href="/opportunities">
                Opportunities directory
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-600 dark:hover:text-emerald-400" href="/eligibility">
                Eligibility checker
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-600 dark:hover:text-emerald-400" href="/tracker">
                Application tracker
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-600 dark:hover:text-emerald-400" href="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Information
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link className="hover:text-emerald-600 dark:hover:text-emerald-400" href="/about">
                About this project
              </Link>
            </li>
            <li>
              <Link className="hover:text-emerald-600 dark:hover:text-emerald-400" href="/privacy">
                Privacy policy
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            Not affiliated with HEC, BISP, PEEF, PITB, or any other listed
            organization.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400 dark:border-slate-900 dark:text-slate-500">
        © {BUILD_YEAR} Student Opportunity Hub Pakistan. Built as
        an open student project.
      </div>
    </footer>
  );
}
