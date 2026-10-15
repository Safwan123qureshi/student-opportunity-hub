export type Category = "Scholarships" | "Internships" | "Free Courses";

export type EducationLevel =
  | "Matric / O-Levels"
  | "Intermediate / A-Levels"
  | "Undergraduate"
  | "Masters"
  | "PhD";

export type Province =
  | "Punjab"
  | "Sindh"
  | "KPK"
  | "Balochistan"
  | "Islamabad Capital Territory"
  | "Gilgit-Baltistan"
  | "AJK";

export type VerificationStatus =
  | "verified"
  | "unverified"
  | "sample";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: Category;
  description: string;
  educationLevels: EducationLevel[];
  /** Empty array means the opportunity is open to students from all provinces / nationwide. */
  provinces: Province[];
  minGpa?: number | null;
  fieldOfStudy?: string | null;
  /** Official deadline (ISO yyyy-mm-dd) only when officially verified. */
  deadline?: string | null;
  /** Human-readable note about deadlines when no fixed date is officially published. */
  deadlineNote?: string;
  applicationUrl: string;
  sourceUrl: string;
  funding?: string | null;
  verificationStatus: VerificationStatus;
  verificationNote?: string;
  lastVerified?: string | null;
  featured?: boolean;
}

export type ApplicationStatus =
  | "Interested"
  | "Planning to Apply"
  | "Applied"
  | "Completed";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Interested",
  "Planning to Apply",
  "Applied",
  "Completed",
];

export interface TrackerEntry {
  opportunityId: string;
  status: ApplicationStatus;
  notes: string;
  savedAt: string;
  appliedAt?: string | null;
  completedAt?: string | null;
}

export interface StudentProfile {
  educationLevel: EducationLevel | "";
  province: Province | "";
  institution: string;
  /** GPA on a 4.0 scale, stored as string for flexible input. */
  gpa: string;
  fieldOfStudy: string;
  interests: Category[];
}

export type EligibilityVerdict = "eligible" | "potential" | "no-match";

export interface EligibilityResult {
  opportunity: Opportunity;
  verdict: EligibilityVerdict;
  reasons: string[];
}
