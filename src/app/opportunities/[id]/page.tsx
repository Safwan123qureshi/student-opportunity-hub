import {
  ArrowLeft,
  Building2,
  CalendarClock,
  CircleDollarSign,
  ExternalLink,
  GraduationCap,
  MapPin,
  Scale,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CategoryBadge, VerificationBadge } from "@/components/badges";
import { SaveButton } from "@/components/save-button";
import { formatDate } from "@/lib/format";
import { getOpportunityById, OPPORTUNITIES } from "@/lib/opportunities";

export function generateStaticParams() {
  return OPPORTUNITIES.map((opp) => ({ id: opp.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opp = getOpportunityById(id);
  if (!opp) return { title: "Opportunity not found" };
  return {
    title: opp.title,
    description: `${opp.organization} — ${opp.description.slice(0, 150)}…`,
  };
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Building2;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 py-3">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm text-slate-900 dark:text-slate-100">
          {children}
        </dd>
      </div>
    </div>
  );
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opp = getOpportunityById(id);
  if (!opp) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to opportunities
      </Link>

      <article className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={opp.category} />
          <VerificationBadge status={opp.verificationStatus} />
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {opp.title}
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {opp.organization}
        </p>

        <p className="mt-6 leading-7 text-slate-700 dark:text-slate-300">
          {opp.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={opp.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Go to official application page
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <SaveButton opportunityId={opp.id} />
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Requirements & details
            </h2>
            <dl className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
              <DetailRow icon={GraduationCap} label="Eligible education levels">
                {opp.educationLevels.join(", ")}
              </DetailRow>
              <DetailRow icon={MapPin} label="Province requirement">
                {opp.provinces.length === 0
                  ? "Open nationwide"
                  : opp.provinces.join(", ")}
              </DetailRow>
              <DetailRow icon={Scale} label="Minimum GPA">
                {opp.minGpa != null ? String(opp.minGpa) : "Not officially specified"}
              </DetailRow>
              {opp.fieldOfStudy && (
                <DetailRow icon={ShieldCheck} label="Field of study">
                  {opp.fieldOfStudy}
                </DetailRow>
              )}
              <DetailRow icon={CircleDollarSign} label="Funding / benefit">
                {opp.funding ?? "Not verified"}
              </DetailRow>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              Dates & verification
            </h2>
            <dl className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
              <DetailRow icon={CalendarClock} label="Deadline">
                {opp.deadline ? (
                  formatDate(opp.deadline)
                ) : (
                  <span>
                    No fixed national deadline published.
                    {opp.deadlineNote && (
                      <span className="mt-1 block text-slate-500 dark:text-slate-400">
                        {opp.deadlineNote}
                      </span>
                    )}
                  </span>
                )}
              </DetailRow>
              <DetailRow icon={ShieldCheck} label="Verification">
                {opp.verificationStatus === "verified"
                  ? "Verified against official source"
                  : "Not verified — confirm on the official site"}
                {opp.lastVerified && (
                  <span className="block text-slate-500 dark:text-slate-400">
                    Last verified: {formatDate(opp.lastVerified)}
                  </span>
                )}
              </DetailRow>
              <DetailRow icon={Building2} label="Official source">
                <a
                  href={opp.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  {opp.sourceUrl}
                </a>
              </DetailRow>
            </dl>
            {opp.verificationNote && (
              <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <strong className="font-semibold">Note:</strong>{" "}
                {opp.verificationNote}
              </p>
            )}
          </section>
        </div>
      </article>
    </div>
  );
}