import type { Opportunity } from "@/lib/types";

/**
 * Curated seed dataset.
 *
 * Entries are verified against official organization websites wherever possible
 * (checked October 2026). Entries that could not be verified are clearly
 * labelled "unverified". No deadline, funding amount, or eligibility rule in
 * this file is invented — where an official deadline is not published,
 * `deadline` is null and `deadlineNote` explains the situation.
 */
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "hec-need-based-scholarship",
    title: "HEC Need-Based Scholarship",
    organization: "Higher Education Commission (HEC), Pakistan",
    category: "Scholarships",
    description:
      "Financial assistance for undergraduate study at HEC-selected public sector Pakistani universities and degree-awarding institutions. Eligibility is linked to financial need as assessed by each participating university's Institutional Scholarship Award Committee. Funding covers the complete duration of the program; students on self-finance are not eligible.",
    educationLevels: ["Undergraduate"],
    provinces: [],
    minGpa: null,
    fieldOfStudy: null,
    deadline: null,
    deadlineNote:
      "HEC does not publish a single national deadline. Applications are submitted to the Financial Aid Office of the participating university, which runs its own cycle. Check your university's financial aid office for current dates.",
    applicationUrl:
      "https://www.hec.gov.pk/english/scholarshipsgrants/NBS/Pages/How-To-Apply.aspx",
    sourceUrl:
      "https://www.hec.gov.pk/english/scholarshipsgrants/NBS/Pages/Eligibility-Criteria.aspx",
    funding:
      "Full university fee support (up to the allocated grant per slot) plus a monthly stipend of Rs. 6,000 for the complete program, per the official HEC page.",
    verificationStatus: "verified",
    verificationNote:
      "Eligibility and funding details read directly from the official HEC scholarship page.",
    lastVerified: "2026-10-15",
    featured: true,
  },
  {
    id: "bisp-ehsaas-undergraduate-scholarship",
    title: "BISP Scholarship for Undergraduates (Ehsaas Undergraduate Scholarship)",
    organization: "HEC & Benazir Income Support Programme (BISP)",
    category: "Scholarships",
    description:
      "Need-based scholarships for students admitted on merit to HEC-recognized public sector universities. Students must demonstrate financial need. Students already receiving another scholarship, enrolled in distance learning or affiliated colleges, or admitted on self-finance/evening programs are ineligible.",
    educationLevels: ["Undergraduate"],
    provinces: [],
    minGpa: null,
    fieldOfStudy: null,
    deadline: null,
    deadlineNote:
      "The official HEC page references the Fall 2021 intake. New intakes are announced periodically — confirm the current cycle on the official HEC or BISP website before applying.",
    applicationUrl:
      "https://www.hec.gov.pk/english/scholarshipsgrants/Ehsaas/Pages/How-To-Apply.aspx",
    sourceUrl:
      "https://www.hec.gov.pk/english/scholarshipsgrants/Ehsaas/Pages/Eligibility-Criteria.aspx",
    funding:
      "Need-based scholarship covering tuition and related costs for the eligible undergraduate program. Confirm current coverage details on the official page.",
    verificationStatus: "verified",
    verificationNote:
      "Eligibility conditions read directly from the official HEC BISP/Ehsaas scholarship page.",
    lastVerified: "2026-10-15",
    featured: true,
  },
  {
    id: "peef-masters-level-scholarship",
    title: "PEEF Master's Level Scholarship",
    organization: "Punjab Educational Endowment Fund (PEEF)",
    category: "Scholarships",
    description:
      "Scholarships for students pursuing Master's (16-year) programs at approved universities in Punjab. PEEF programs are primarily for Punjab-domiciled students, with special quotas reserved for other categories such as students from less-developed areas.",
    educationLevels: ["Masters"],
    provinces: ["Punjab"],
    minGpa: null,
    fieldOfStudy: null,
    deadline: null,
    deadlineNote:
      "PEEF announces scholarship rounds through partner universities. Check peef.org.pk and your university's financial aid office for current dates.",
    applicationUrl: "https://peef.org.pk/",
    sourceUrl: "https://peef.org.pk/",
    funding:
      "Tuition fee support for the Master's program (amount varies by university and round). Confirm current details on the official PEEF website.",
    verificationStatus: "unverified",
    verificationNote:
      "Based on the well-known public PEEF program, but the official pages could not be loaded at verification time. Confirm every detail on peef.org.pk before applying.",
    lastVerified: null,
  },
  {
    id: "digiskills-free-training",
    title: "DigiSkills.pk Free Online Training",
    organization: "DigiSkills.pk (Ministry of IT & Telecommunication, Pakistan)",
    category: "Free Courses",
    description:
      "Pakistan's national online skills program offering free courses in in-demand areas such as freelancing, digital marketing, graphic design, web development, AI and more. Learners across Pakistan can enroll online when a new batch opens.",
    educationLevels: [
      "Matric / O-Levels",
      "Intermediate / A-Levels",
      "Undergraduate",
      "Masters",
      "PhD",
    ],
    provinces: [],
    minGpa: null,
    fieldOfStudy: null,
    deadline: null,
    deadlineNote:
      "Enrollment opens in scheduled batches several times a year rather than a single deadline. Check digiskills.pk for the current batch opening.",
    applicationUrl: "https://digiskills.pk/",
    sourceUrl: "https://digiskills.pk/",
    funding: "Free of cost for Pakistani learners, per the official program.",
    verificationStatus: "verified",
    verificationNote:
      "Confirmed as a national free-skills program; the official site was intermittently unreachable at check time, so always confirm the current batch on digiskills.pk.",
    lastVerified: "2026-10-15",
  },
  {
    id: "e-rozgaar-pitb",
    title: "e-Rozgaar Training Program",
    organization: "Punjab Information Technology Board (PITB)",
    category: "Free Courses",
    description:
      "e-Rozgaar 2.0 trains youth in digital skills such as web development, creative designing, UI/UX, e-commerce, AI, cloud and freelancing, delivered online and at partner training centers, with assessments and a certificate of completion. The official FAQ states a course fee applies that varies by center and course hours — verify current terms before enrolling.",
    educationLevels: ["Intermediate / A-Levels", "Undergraduate", "Masters"],
    provinces: ["Punjab"],
    minGpa: null,
    fieldOfStudy: null,
    deadline: null,
    deadlineNote:
      "e-Rozgaar runs periodic training phases through partner centers. Register on the official site to see current phases.",
    applicationUrl: "https://erozgaar.pitb.gov.pk/",
    sourceUrl: "https://erozgaar.pitb.gov.pk/faqs",
    funding:
      "Per the official FAQ, fees vary by course and center (subsidized, not always free). Confirm current terms on the official site.",
    verificationStatus: "verified",
    verificationNote:
      "Eligibility (Matric/O-Levels or above; CNIC/Form-B/domicile) read directly from the official e-Rozgaar FAQ.",
    lastVerified: "2026-10-15",
  },
  {
    id: "google-summer-of-code",
    title: "Google Summer of Code",
    organization: "Google Open Source",
    category: "Internships",
    description:
      "A global, online program bringing new contributors into open source software development. Contributors work with an open source organization on a 12+ week programming project under mentor guidance. Open to participants worldwide, including students in Pakistan, and free to apply.",
    educationLevels: [
      "Intermediate / A-Levels",
      "Undergraduate",
      "Masters",
      "PhD",
    ],
    provinces: [],
    minGpa: null,
    fieldOfStudy:
      "Computer Science, Software Engineering, or demonstrated programming experience",
    deadline: null,
    deadlineNote:
      "GSoC runs one annual program with the application window announced each year on the official site (historically opening around February–March). Check g.co/gsoc for the current timeline.",
    applicationUrl: "https://g.co/gsoc",
    sourceUrl: "https://g.co/gsoc",
    funding:
      "Selected contributors receive a stipend from Google; the amount varies by project length and region and is announced on the official site each year.",
    verificationStatus: "verified",
    verificationNote:
      "Program structure confirmed on the official Google Summer of Code website.",
    lastVerified: "2026-10-15",
    featured: true,
  },
  {
    id: "mlh-fellowship",
    title: "MLH Fellowship",
    organization: "Major League Hacking (MLH)",
    category: "Internships",
    description:
      "A fully remote, 12-week internship alternative where participants learn software engineering by contributing to real open source projects with mentors from top companies, while earning an educational stipend. Tracks include Software Engineering, Production Engineering and Web3 Engineering.",
    educationLevels: ["Intermediate / A-Levels", "Undergraduate", "Masters"],
    provinces: [],
    minGpa: null,
    fieldOfStudy:
      "Software engineering, computer science, or equivalent practical interest",
    deadline: null,
    deadlineNote:
      "The fellowship runs in multiple cohorts per year with rolling applications. Check fellowship.mlh.io for current start dates.",
    applicationUrl: "https://fellowship.mlh.io/",
    sourceUrl: "https://fellowship.mlh.io/",
    funding:
      "Fellows receive an educational stipend, per the official MLH Fellowship website.",
    verificationStatus: "verified",
    verificationNote:
      "Program details (remote, 12 weeks, stipend) confirmed on the official MLH Fellowship website.",
    lastVerified: "2026-10-15",
  },
];

export function getOpportunityById(id: string): Opportunity | undefined {
  return OPPORTUNITIES.find((o) => o.id === id);
}

export function getFeaturedOpportunities(): Opportunity[] {
  return OPPORTUNITIES.filter((o) => o.featured);
}
