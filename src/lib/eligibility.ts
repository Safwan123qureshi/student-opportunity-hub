import { OPPORTUNITIES } from "@/lib/opportunities";
import type {
  EducationLevel,
  EligibilityResult,
  Opportunity,
  Province,
} from "@/lib/types";

export interface EligibilityInput {
  educationLevel: EducationLevel | "";
  province: Province | "";
  institution: string;
  /** GPA on a 4.0 scale, or empty. */
  gpa: string;
  fieldOfStudy: string;
}

/**
 * Guidance-only eligibility comparison. Missing information is NEVER treated as
 * proof of eligibility — it downgrades the result to "potential match".
 */
export function checkEligibility(
  input: EligibilityInput,
  opportunities: Opportunity[] = OPPORTUNITIES
): EligibilityResult[] {
  const gpa = input.gpa.trim() === "" ? null : Number(input.gpa);

  return opportunities.map((opp) => {
    const reasons: string[] = [];
    let mismatch = false;
    let unknown = false;

    // Education level
    if (input.educationLevel) {
      if (opp.educationLevels.includes(input.educationLevel)) {
        reasons.push(
          `Your education level (${input.educationLevel}) is within the accepted levels: ${opp.educationLevels.join(", ")}.`
        );
      } else {
        mismatch = true;
        reasons.push(
          `This opportunity targets ${opp.educationLevels.join(", ")} students; you selected ${input.educationLevel}.`
        );
      }
    } else {
      unknown = true;
      reasons.push(
        "Education level not provided — it cannot be confirmed against this opportunity's requirements."
      );
    }

    // Province
    if (opp.provinces.length === 0) {
      reasons.push("Open to students nationwide (no province restriction listed).");
    } else if (input.province) {
      if (opp.provinces.includes(input.province)) {
        reasons.push(
          `Your province (${input.province}) is within the listed provinces: ${opp.provinces.join(", ")}.`
        );
      } else {
        mismatch = true;
        reasons.push(
          `Listed for students from ${opp.provinces.join(", ")}; you selected ${input.province}. Confirm domicile rules on the official source.`
        );
      }
    } else {
      unknown = true;
      reasons.push(
        `Province requirement (${opp.provinces.join(", ")}) could not be compared — province not provided.`
      );
    }

    // GPA
    if (opp.minGpa != null) {
      if (gpa != null) {
        if (gpa >= opp.minGpa) {
          reasons.push(
            `Your GPA (${gpa}) meets the listed minimum of ${opp.minGpa}.`
          );
        } else {
          mismatch = true;
          reasons.push(
            `Your GPA (${gpa}) is below the listed minimum of ${opp.minGpa}.`
          );
        }
      } else {
        unknown = true;
        reasons.push(
          `A minimum GPA of ${opp.minGpa} is listed, but you did not provide a GPA.`
        );
      }
    }

    // Field of study (soft signal — free-text on both sides)
    if (opp.fieldOfStudy && input.fieldOfStudy) {
      const oppTokens = opp.fieldOfStudy.toLowerCase().split(/[^a-z]+/);
      const userTokens = input.fieldOfStudy.toLowerCase().split(/[^a-z]+/);
      const overlap = userTokens.some(
        (t) => t.length > 3 && oppTokens.includes(t)
      );
      if (overlap) {
        reasons.push(
          `Your field of study appears related to the listed preference: "${opp.fieldOfStudy}".`
        );
      } else {
        unknown = true;
        reasons.push(
          `The opportunity lists a field preference ("${opp.fieldOfStudy}") that could not be matched with your input — confirm with the official source.`
        );
      }
    }

    if (opp.verificationStatus !== "verified") {
      unknown = true;
      reasons.push(
        "This entry is not verified against an official source, so requirements must be confirmed independently."
      );
    }

    const verdict = mismatch
      ? "no-match"
      : unknown
        ? "potential"
        : "eligible";

    return { opportunity: opp, verdict, reasons };
  });
}
