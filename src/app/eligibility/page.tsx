import type { Metadata } from "next";
import { EligibilityChecker } from "@/components/eligibility-checker";

export const metadata: Metadata = {
  title: "Eligibility checker",
  description:
    "Guidance-only eligibility comparison for scholarships, internships, and free courses in the hub.",
};

export default function EligibilityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <EligibilityChecker />
    </div>
  );
}