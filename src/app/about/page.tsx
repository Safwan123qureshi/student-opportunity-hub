import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Student Opportunity Hub Pakistan is, how it works, and its limitations.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="About this project"
        description="An independent, free guide built to help Pakistani students find real opportunities."
      />
      <div className="space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            What is the Student Opportunity Hub Pakistan?
          </h2>
          <p className="mt-2">
            It is a free web application that collects scholarships, internships,
            and free or subsidized courses relevant to students in Pakistan.
            Beyond a directory, it offers an eligibility checker, a personal
            application tracker, and a dashboard — all running entirely in your
            browser.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            How information is verified
          </h2>
          <p className="mt-2">
            Each entry is checked against the organization&apos;s official
            website wherever possible and is labelled accordingly. Entries that
            could not be verified are clearly marked as unverified. This hub
            never claims an application window is open unless an official source
            confirms it, and it never invents deadlines, funding amounts, or
            eligibility rules. Always confirm details on the official source
            before applying.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Limitations
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              The dataset is intentionally small and curated; it is not an
              exhaustive list of every opportunity in Pakistan.
            </li>
            <li>
              The eligibility checker is a guidance tool based only on listed
              requirements — it is never an official eligibility decision.
            </li>
            <li>
              Saved data lives in your browser&apos;s localStorage and is not
              synced across devices.
            </li>
            <li>
              This project is not affiliated with HEC, BISP, PEEF, PITB, Google,
              MLH, or any other listed organization.
            </li>
          </ul>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Get started
          </h2>
          <p className="mt-2">
            Browse the{" "}
            <Link
              href="/opportunities"
              className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              opportunities directory
            </Link>
            , run the{" "}
            <Link
              href="/eligibility"
              className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              eligibility checker
            </Link>
            , or read the{" "}
            <Link
              href="/privacy"
              className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              privacy policy
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}