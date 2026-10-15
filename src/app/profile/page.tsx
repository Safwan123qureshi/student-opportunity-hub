import type { Metadata } from "next";
import { HardDriveDownload } from "lucide-react";
import { ProfileForm } from "@/components/profile-form";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Profile & preferences",
  description:
    "Set your study details and interests to personalize the eligibility checker.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Profile & preferences"
        description="Tell us a little about your studies so the eligibility checker can personalize results. We only ask for what is needed — no name, email, CNIC, or other sensitive data."
      />
      <ProfileForm />
      <p className="mt-6 flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <HardDriveDownload className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        Preferences are stored only in this browser (localStorage). They are not
        sent to any server and will be lost if you clear browser data.
      </p>
    </div>
  );
}