"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/toast-provider";
import { useTracker } from "@/components/tracker-provider";
import { CATEGORIES, EDUCATION_LEVELS, PROVINCES } from "@/lib/constants";
import type {
  Category,
  EducationLevel,
  Province,
  StudentProfile,
} from "@/lib/types";

export function ProfileForm() {
  const { profile, hydrated } = useTracker();

  if (!hydrated) {
    return (
      <div
        className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        aria-hidden="true"
      />
    );
  }

  // Inner form mounts only after hydration with the real stored profile as its
  // initial state — no effect-based syncing needed.
  return <ProfileFormInner initialProfile={profile} />;
}

function ProfileFormInner({
  initialProfile,
}: {
  initialProfile: StudentProfile;
}) {
  const { updateProfile } = useTracker();
  const { pushToast } = useToast();
  const [draft, setDraft] = useState<StudentProfile>(initialProfile);
  const [gpaError, setGpaError] = useState<string | null>(null);

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";
  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200";

  const toggleInterest = (c: Category) => {
    setDraft((prev) => ({
      ...prev,
      interests: prev.interests.includes(c)
        ? prev.interests.filter((x) => x !== c)
        : [...prev.interests, c],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const g = draft.gpa.trim();
    if (
      g !== "" &&
      (Number.isNaN(Number(g)) || Number(g) < 0 || Number(g) > 4)
    ) {
      setGpaError("Enter a GPA between 0 and 4 (4.0 scale), or leave empty.");
      return;
    }
    setGpaError(null);
    updateProfile(draft);
    pushToast("Profile preferences saved to this browser.", "success");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="p-edu" className={labelClass}>
            Education level
          </label>
          <select
            id="p-edu"
            value={draft.educationLevel}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                educationLevel: e.target.value as EducationLevel | "",
              }))
            }
            className={fieldClass}
          >
            <option value="">Select…</option>
            {EDUCATION_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="p-province" className={labelClass}>
            Province
          </label>
          <select
            id="p-province"
            value={draft.province}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                province: e.target.value as Province | "",
              }))
            }
            className={fieldClass}
          >
            <option value="">Select…</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="p-inst" className={labelClass}>
            University / institution
          </label>
          <input
            id="p-inst"
            type="text"
            value={draft.institution}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, institution: e.target.value }))
            }
            placeholder="e.g. NUST"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="p-gpa" className={labelClass}>
            GPA (4.0 scale)
          </label>
          <input
            id="p-gpa"
            type="text"
            inputMode="decimal"
            value={draft.gpa}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, gpa: e.target.value }))
            }
            placeholder="e.g. 3.2"
            aria-invalid={gpaError ? "true" : undefined}
            aria-describedby={gpaError ? "p-gpa-error" : undefined}
            className={fieldClass}
          />
          {gpaError && (
            <p
              id="p-gpa-error"
              role="alert"
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {gpaError}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="p-field" className={labelClass}>
            Field of study
          </label>
          <input
            id="p-field"
            type="text"
            value={draft.fieldOfStudy}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, fieldOfStudy: e.target.value }))
            }
            placeholder="e.g. Computer Science"
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Interested categories</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = draft.interests.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleInterest(c)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        <Save className="h-4 w-4" aria-hidden="true" />
        Save preferences
      </button>
    </form>
  );
}