import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { OPPORTUNITIES } from "@/lib/opportunities";

/**
 * Sitemap for the public, crawler-friendly pages only.
 * Personal, localStorage-only pages (tracker, saved, dashboard, profile)
 * are intentionally excluded — see app/robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/opportunities`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/eligibility`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const opportunityPages: MetadataRoute.Sitemap = OPPORTUNITIES.map((opp) => ({
    url: `${SITE_URL}/opportunities/${opp.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...opportunityPages];
}
