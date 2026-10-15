import { Building2, CalendarClock, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import { CategoryBadge, VerificationBadge } from "@/components/badges";
import { SaveButton } from "@/components/save-button";
import { daysUntil, formatDate } from "@/lib/format";
import type { Opportunity } from "@/lib/types";

function DeadlineHint({ opportunity }: { opportunity: Opportunity }) {
  if (opportunity.deadline) {
    const days = daysUntil(opportunity.deadline);
    return (
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Deadline: {formatDate(opportunity.deadline)}
        {days >= 0 ? ` (in ${days} day${days === 1 ? "" : "s"})` : " (passed)"}
      </p>
    );
  }
  return (
    <p className="text-xs text-slate-500 dark:text-slate-400">
      No fixed national deadline published — check official source
    </p>
  );
}

export function OpportunityCard({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <CategoryBadge category={opportunity.category} />
        <SaveButton opportunityId={opportunity.id} compact />
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
        <Link href={`/opportunities/${opportunity.id}`} className="after:absolute after:inset-0">
          {opportunity.title}
        </Link>
      </h3>

      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {opportunity.organization}
      </p>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {opportunity.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          {opportunity.educationLevels.join(", ")}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {opportunity.provinces.length === 0
            ? "Nationwide"
            : opportunity.provinces.join(", ")}
        </span>
        <span className="inline-flex items-center gap-1">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
          {opportunity.deadline ? formatDate(opportunity.deadline) : "Rolling"}
        </span>
      </div>

      <div className="mt-auto pt-4">
        <VerificationBadge status={opportunity.verificationStatus} />
        <div className="mt-2">
          <DeadlineHint opportunity={opportunity} />
        </div>
      </div>
    </article>
  );
}
