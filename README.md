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

Inventory Portal variables:
- `DATABASE_URL`
- `DIRECT_DATABASE_URL`
- `SESSION_SECRET`
- `AUTH_SECRET`
- `APP_URL`
- `INVENTORY_BASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_REPLY_TO_EMAIL`
- `CLOUDFLARE_R2_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET_NAME`
- `CLOUDFLARE_R2_PUBLIC_URL`
- `CRON_SECRET`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

Helpful setup commands:
```bash
npm run cms:key-guide
npm run cms:check
npm run cms:seed:dry
```

The full click-by-click setup guide is in `CMS_SETUP.md`.

## Inventory Portal
The private internal Inventory Management Portal lives at `/inventory`. It is intentionally hidden from public navigation and marked `noindex`; `robots.ts` also disallows `/inventory/`.

It includes email/password login, 30-day secure sessions, first-admin seeding, user invites, password resets, profile theme/report preferences, Studio/Product/Supplier/Location management, R2 image uploads, transaction-based inventory, Studio/product valuations, activity logs, weekly report previews, manual report sending, scheduled report endpoint protection, and CSV/XLSX exports.

### Service Setup Checklist
Neon Postgres:
- Create a Neon project/database for production.
- Add pooled `DATABASE_URL` and direct `DIRECT_DATABASE_URL` to Vercel and `.env.local`.
- Run `npm run db:deploy` in production deployment or `npm run db:migrate` locally.
- Run `npm run inventory:seed` after migrations to create the original admin.

Cloudflare R2:
- Bucket name: `morepower`.
- Create R2 access keys with object read/write permissions for that bucket.
- Configure public custom domain or public bucket URL and set `CLOUDFLARE_R2_PUBLIC_URL`.
- Required env vars: `CLOUDFLARE_R2_ACCOUNT_ID`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_R2_BUCKET_NAME`, `CLOUDFLARE_R2_PUBLIC_URL`.
- Accepted uploads: JPG, PNG, WebP, GIF up to 5MB. Images are stored in R2; Postgres stores metadata/URLs only.

Resend:
- Verify the sending domain/address before production sends.
- Required env vars: `RESEND_API_KEY`, `RESEND_FROM_EMAIL=inventory@morepower2you.com`, `RESEND_REPLY_TO_EMAIL=eli@morepower2you.com`.
- Invite, reset, and report emails are skipped with a server warning if `RESEND_API_KEY` is absent.

Vercel environment variables:
- Add every Inventory Portal variable from `.env.example` to Vercel Production and Preview as appropriate.
- Do not expose secrets with `NEXT_PUBLIC_`.
- Set `APP_URL=https://www.morepower2you.com` and `INVENTORY_BASE_URL=https://www.morepower2you.com/inventory`.

Vercel Cron:
- `vercel.json` schedules `/api/inventory/reports/weekly` at both `0 21 * * 5` and `0 22 * * 5` UTC.
- The route checks that the actual local time is Friday 5:00 PM America/New_York, so daylight saving time is handled safely.
- Protect the endpoint with `CRON_SECRET`. Vercel should call with `?secret=...` or a `Bearer` token if configured.

Seed user:
- Production seed creates/updates `eli@morepower2you.com` with password `1234`, active status, and original-admin protection.
- Users can change this password in `/inventory/settings/profile`.
- Demo inventory is not seeded unless `npm run inventory:seed:demo` is run locally.

Local dev commands:
```bash
npm install
npm run db:generate
npm run db:migrate
npm run inventory:seed
npm run dev
```

Migration commands:
```bash
npm run db:migrate
npm run db:deploy
```

Test/check commands:
```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Deployment notes:
- Pushing to GitHub triggers Vercel auto-deployment for this repo.
- Run migrations and seed against the production Neon database before using `/inventory`.
- Do not seed demo inventory into production without explicit approval.
- Confirm `/inventory` redirects logged-out users to `/inventory/login`, then log in with the seeded admin and change the temporary password.

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
