import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Student Opportunity Hub Pakistan handles your data — it stays in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Privacy policy"
        description="The short version: your data never leaves your device."
      />
      <div className="space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Data we collect
          </h2>
          <p className="mt-2">
            This application collects no personal data on any server. There are
            no user accounts, no analytics, and no cookies. The only data stored
            is what you choose to save in your own browser (saved opportunities,
            tracker statuses, notes, dates, and profile preferences) using
            localStorage.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Where data is stored
          </h2>
          <p className="mt-2">
            All saved information stays in your browser&apos;s localStorage on
            your device. It is never transmitted to us or any third party by
            this application. Because it is local, it is not synchronized across
            devices and will be deleted if you clear your browser data.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Third-party links
          </h2>
          <p className="mt-2">
            The hub links to official organization websites (for example HEC,
            PITB, Google, MLH). Those sites have their own privacy policies,
            which this project does not control.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Deleting your data
          </h2>
          <p className="mt-2">
            You can remove individual entries from the application tracker at any
            time, or clear all data by clearing your browser&apos;s site data
            for this application.
          </p>
        </section>
      </div>
    </div>
  );
}