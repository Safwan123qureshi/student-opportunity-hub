"use client";

import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  SearchCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryBadge } from "@/components/badges";
import { useTracker } from "@/components/tracker-provider";
import { PageHeader } from "@/components/ui";
import { EDUCATION_LEVELS, PROVINCES } from "@/lib/constants";
import { checkEligibility, type EligibilityInput } from "@/lib/eligibility";
import type { EducationLevel, EligibilityVerdict, Province } from "@/lib/types";

const VERDICT_META: Record<
  EligibilityVerdict,
  { label: string; icon: typeof CheckCircle2; classes: string }
> = {
  eligible: {
    label: "Eligible based on available information",
    icon: CheckCircle2,
    classes:
      "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  },
  potential: {
    label: "Potential match — requirements need verification",
    icon: HelpCircle,
    classes:
      "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  },
  "no-match": {
    label: "Does not appear to match the specified requirements",
    icon: AlertTriangle,
    classes:
      "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
  },
};

export function EligibilityChecker() {
  const { profile } = useTracker();

  const [input, setInput] = useState<EligibilityInput>({
    educationLevel: (profile.educationLevel as EducationLevel) || "",
    province: (profile.province as Province) || "",
    institution: profile.institution,
    gpa: profile.gpa,
    fieldOfStudy: profile.fieldOfStudy,
  });
  const [submitted, setSubmitted] = useState(false);
  const [gpaError, setGpaError] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!submitted) return null;
    return checkEligibility(input).sort((a, b) => {
      const order = { eligible: 0, potential: 1, "no-match": 2 } as const;
      return order[a.verdict] - order[b.verdict];
    });
  }, [submitted, input]);

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";
  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200";
  return (
    <div>
      <PageHeader
        title="Eligibility checker"
        description="Compare your profile against every opportunity in the hub. This is guidance only — never an official eligibility decision. Missing information is never treated as proof of eligibility."
      />

      <div className="grid gap-8 lg:grid-cols-[22rem,1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const g = input.gpa.trim();
            if (
              g !== "" &&
              (Number.isNaN(Number(g)) || Number(g) < 0 || Number(g) > 4)
            ) {
              setGpaError(
                "Enter a GPA between 0 and 4 (4.0 scale), or leave empty."
              );
              return;
            }
            setGpaError(null);
            setSubmitted(true);
          }}
          className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label htmlFor="edu-level" className={labelClass}>
              Education level <span className="text-red-500">*</span>
            </label>
            <select
              id="edu-level"
              required
              value={input.educationLevel}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  educationLevel: e.target.value as EducationLevel | "",
                }))
              }
              className={fieldClass}
            >
              <option value="">Select your level…</option>
              {EDUCATION_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="province" className={labelClass}>
              Province <span className="text-red-500">*</span>
            </label>
            <select
              id="province"
              required
              value={input.province}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  province: e.target.value as Province | "",
                }))
              }
              className={fieldClass}
            >
              <option value="">Select your province…</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="institution" className={labelClass}>
              University / institution{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="institution"
              type="text"
              value={input.institution}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, institution: e.target.value }))
              }
              placeholder="e.g. University of the Punjab"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="gpa" className={labelClass}>
              GPA (4.0 scale){" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="gpa"
              type="text"
              inputMode="decimal"
              value={input.gpa}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, gpa: e.target.value }))
              }
              placeholder="e.g. 3.4"
              aria-invalid={gpaError ? "true" : undefined}
              aria-describedby={gpaError ? "gpa-error" : undefined}
              className={fieldClass}
            />
            {gpaError && (
              <p
                id="gpa-error"
                role="alert"
                className="mt-1.5 text-xs text-red-600 dark:text-red-400"
              >
                {gpaError}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="field" className={labelClass}>
              Field of study{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="field"
              type="text"
              value={input.fieldOfStudy}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, fieldOfStudy: e.target.value }))
              }
              placeholder="e.g. Computer Science"
              className={fieldClass}
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <SearchCheck className="h-4 w-4" aria-hidden="true" />
            Check eligibility
          </button>
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Prefilled from your profile. You can update saved details on the{" "}
            <Link
              href="/profile"
              className="underline hover:text-emerald-600"
            >
              profile page
            </Link>
            .
          </p>
        </form>
        <div>
          {!results ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
              <SearchCheck className="h-10 w-10 text-slate-400" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                Fill in your details and check
              </h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Results will explain, for every opportunity, why it is a match,
                a potential match, or not a match.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400" role="status">
                {results.filter((r) => r.verdict === "eligible").length}{" "}
                eligible, {results.filter((r) => r.verdict === "potential").length}{" "}
                potential, {results.filter((r) => r.verdict === "no-match").length}{" "}
                not matching.
              </p>
              {results.map(({ opportunity, verdict, reasons }) => {
                const meta = VERDICT_META[verdict];
                const Icon = meta.icon;
                return (
                  <div
                    key={opportunity.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium ${meta.classes}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {meta.label}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <CategoryBadge category={opportunity.category} />
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                      <Link
                        href={`/opportunities/${opportunity.id}`}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {opportunity.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {opportunity.organization}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {reasons.map((reason, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                            aria-hidden="true"
                          />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <p className="rounded-xl bg-slate-100 p-4 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Reminder: this tool provides guidance based only on the
                information you entered and what is listed in this hub. It is
                not an official eligibility decision. Always confirm with the
                official organization before applying.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}