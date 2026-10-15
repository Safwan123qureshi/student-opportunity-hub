import type { Category, EducationLevel, Province } from "@/lib/types";

export const CATEGORIES: Category[] = [
  "Scholarships",
  "Internships",
  "Free Courses",
];

export const EDUCATION_LEVELS: EducationLevel[] = [
  "Matric / O-Levels",
  "Intermediate / A-Levels",
  "Undergraduate",
  "Masters",
  "PhD",
];

export const PROVINCES: Province[] = [
  "Punjab",
  "Sindh",
  "KPK",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "AJK",
];

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Scholarships:
    "Need-based and merit-based funding for students across Pakistan.",
  Internships:
    "Real-world experience programs, including global remote opportunities.",
  "Free Courses":
    "Free or low-cost digital skills training from trusted providers.",
};

export const APP_NAME = "Student Opportunity Hub Pakistan";
