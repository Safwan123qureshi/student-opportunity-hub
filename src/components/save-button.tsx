"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";
import { useTracker } from "@/components/tracker-provider";

export function SaveButton({
  opportunityId,
  compact = false,
}: {
  opportunityId: string;
  compact?: boolean;
}) {
  const { isSaved, saveOpportunity, unsaveOpportunity } = useTracker();
  const { pushToast } = useToast();
  const router = useRouter();
  const saved = isSaved(opportunityId);

  const handleClick = () => {
    if (saved) {
      unsaveOpportunity(opportunityId);
      pushToast("Removed from your saved opportunities.", "info");
    } else {
      saveOpportunity(opportunityId);
      pushToast("Saved to your opportunities. Track it from the tracker.", "success");
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Unsave opportunity" : "Save opportunity"}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        compact ? "h-9 w-9 sm:w-auto" : "w-full sm:w-auto"
      } ${
        saved
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900"
          : "border-slate-300 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-600 dark:hover:text-emerald-300"
      }`}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden="true" />
      )}
      <span className={compact ? "hidden sm:inline" : ""}>
        {saved ? "Saved" : "Save"}
      </span>
    </button>
  );
}
