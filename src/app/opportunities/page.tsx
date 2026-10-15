import type { Metadata } from "next";
import { Suspense } from "react";
import { OpportunitiesExplorer } from "@/components/opportunities-explorer";
import { LoadingGrid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Opportunities directory",
  description:
    "Browse and filter scholarships, internships, and free courses for Pakistani students.",
};

/** Awaits searchParams inside the Suspense boundary (required by Next 16). */
async function ExplorerWithParams({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  return (
    <OpportunitiesExplorer
      initialQuery={typeof params.q === "string" ? params.q : ""}
      initialCategory={
        typeof params.category === "string" ? params.category : ""
      }
    />
  );
}

export default function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-10">
          <LoadingGrid />
        </div>
      }
    >
      <ExplorerWithParams searchParams={searchParams} />
    </Suspense>
  );
}