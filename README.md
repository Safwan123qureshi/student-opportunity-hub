# Student Opportunity Hub Pakistan

A free, production-ready web application that helps students across Pakistan discover **scholarships**, **internships**, and **free or subsidized courses** — with an eligibility checker, application tracker, and student dashboard.

**Built with:** Next.js (App Router) · TypeScript · Tailwind CSS 4 · Lucide icons

## Features

- **Home page** — hero, search box, category browsing, featured opportunities, how-it-works, benefits, CTAs
- **Opportunities directory** — search by title/organization, category / education-level / province filters, deadline sorting, mobile-friendly collapsible filters, clear empty state
- **Opportunity details** — full requirements, funding, verification status, official application and source links
- **Eligibility checker** — compares your education level, province, GPA, and field of study against every listing. Three verdicts (eligible / potential match / does not match) with per-item reasoning. Missing information is never treated as proof of eligibility. Guidance only.
- **Application tracker** — save/unsave, statuses (Interested → Planning to Apply → Applied → Completed), personal notes, applied/completed dates, status filters, delete with confirmation
- **Student dashboard** — totals, in-progress, completed, upcoming verified deadlines, recently saved, and a progress bar — all computed from real tracker data
- **Profile & preferences** — study details and category interests, persisted locally. No sensitive data is collected.
- **Light/dark mode**, keyboard navigation, visible focus states, toast notifications, responsive layouts, custom 404

## Data integrity rules

The seed dataset in `src/lib/opportunities.ts` follows strict honesty rules:

- Details are checked against **official organization websites** wherever possible (each entry records `verificationStatus` and `lastVerified`).
- Entries that could not be verified are labelled **unverified** — never presented as confirmed.
- **No deadline, funding amount, or eligibility rule is invented.** Where no official deadline is published, `deadline` is `null` and `deadlineNote` explains how applications actually work.
- Nothing is claimed "currently open" unless an official source confirms it.

## Privacy (localStorage)

Saved opportunities, tracker data, and profile preferences are stored **only in the browser's localStorage** — no accounts, no server sync, no analytics. Clearing browser data deletes everything.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command         | Purpose                    |
| --------------- | -------------------------- |
| `npm run dev`   | Development server         |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                     |

## Architecture

```
src/
  app/                  # App Router pages (home, opportunities, opportunities/[id],
                        #   saved, tracker, dashboard, eligibility, profile,
                        #   about, privacy, not-found)
  components/           # UI components + client providers (tracker, toasts,
                        #   theme), explorer, tracker view, dashboard, forms
  lib/
    types.ts            # Shared TypeScript models
    constants.ts        # Categories, education levels, provinces
    opportunities.ts    # Curated seed dataset (verified against official sources)
    eligibility.ts      # Eligibility comparison logic (guidance only)
    format.ts           # Date helpers (local-time safe)
    storage.ts          # SSR-safe localStorage wrappers
```

Server components render static content; interactivity (tracker, filters, forms) lives in client components hydrated with the same markup to avoid React hydration mismatches.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it in the Vercel dashboard (framework auto-detected as Next.js) **or** run `vercel` in the project directory.
3. No environment variables are required.
4. `vercel --prod` promotes a deployment to production.

## Notes / limitations

- The dataset is intentionally small and curated — not an exhaustive list.
- The eligibility checker is guidance, not an official decision.
- Not affiliated with HEC, BISP, PEEF, PITB, Google, MLH, or any other listed organization.
