import type { Metadata } from "next";
import { HardDriveDownload } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { TrackerView } from "@/components/tracker-view";

export const metadata: Metadata = {
  title: "My saved opportunities",
  description: "All the opportunities you have saved in this browser.",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="My saved opportunities"
        description="Everything you have saved, with its current application status."
      />
      <TrackerView mode="saved" />
      <p className="mt-8 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <HardDriveDownload
          className="mt-0.5 h-4 w-4 shrink-0"
          aria-hidden="true"
        />
        Saved information is stored only in this browser (localStorage). It is
        not synchronized across devices and will be lost if you clear browser
        data.
      </p>
    </div>
  );
}