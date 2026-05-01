# MorePower2You Next.js Rebuild

Premium bilingual marketing site for MorePower2You, rebuilt from the public WordPress source into a modern Next.js App Router project.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Sanity Studio for CMS/admin editing
- Resend-ready contact emails
- Cloudflare Turnstile-ready spam protection
- Static fallback content in `src/content/site.ts`
- Vercel deployment target

Sanity was selected because it has a strong free-compatible editing workflow, a hosted admin UI, structured schemas, media fields, draft/published status, and a practical path for storing inquiry submissions without building a custom dashboard.

## Run Locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment
Create `.env.local` from `.env.example`.

Important variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_FORM_TO_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`

Helpful setup commands:
```bash
npm run cms:key-guide
npm run cms:check
npm run cms:seed:dry
```

The full click-by-click setup guide is in `CMS_SETUP.md`.

## CMS/Admin
Visit `/studio` after setting Sanity variables. The Studio uses Sanity authentication for admin-only access.

Schemas are in `src/sanity/schemaTypes/index.ts`.
Seed/fallback content is in `src/content/site.ts`.
Seed mapping is in `src/sanity/seed/seedContent.ts`.

Seed the CMS after creating the Sanity project:
```bash
npm run cms:seed
```

The frontend has static fallback content for safe local development. Keep `NEXT_PUBLIC_USE_SANITY=false` until the Sanity project is seeded and verified.

## Contact Form
The contact form posts to `/api/contact`.

It:
- validates fields with Zod
- verifies Turnstile when `TURNSTILE_SECRET_KEY` is configured
- sends internal email and visitor autoresponder through Resend when configured
- stores submissions in Sanity when `SANITY_API_TOKEN` is configured

Submission statuses: New, Contacted, Archived.

## Content
English routes live at `/`.
Hebrew routes live at `/he/...` with RTL layout.

Only V1 is public. Retired V2/V3 preview paths redirect to the matching V1 route.

Primary pages include home, about, services, four service pages, Gaming & VIP Player Gifting, Who We Serve, Process, Gallery, Case Studies, Testimonials, FAQs, Insights, Contact, Privacy, Terms, and Data/Cookies Notice.

## QA
```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright browsers may need installation:
```bash
npx playwright install chromium
```

## Documentation
- `design-system/MASTER.md`
- `image-prompts/README.md`
- `seo/redirect-map.md`
- `qa/CHECKLIST.md`
- `qa/BEFORE_AFTER.md`
- `STAGING_ADMIN_SETUP.md`
- `DEPLOYMENT.md`
- `DNS_CUTOVER_CHECKLIST.md`
- `CMS_SETUP.md`
- `NEXT_STEPS_FORM_AND_DEPLOY.md`

## Notes
- The old public site was inspected via sitemap and page source.
- Local curl reported an expired TLS certificate on the current WordPress site.
- Legacy public address is kept as private/admin context only and is not displayed publicly.
- Final premium imagery should be generated from the prompt pack before production launch.
