# CMS and API Setup

This project uses Sanity for the admin/CMS, Resend for contact form email, and Cloudflare Turnstile for spam protection.

The frontend can run with static fallback content today. After Sanity is created and seeded, set `NEXT_PUBLIC_USE_SANITY=true` when you are ready for CMS-backed content reads.

## What I Need From You

### 1. Sanity CMS
Go to https://www.sanity.io/manage

1. Create a free Sanity account or sign in.
2. Create a new project named `MorePower2You`.
3. Open the project settings and copy the Project ID.
4. Use dataset `production`.
5. Go to `API` > `Tokens` > `Add API token`.
6. Name it `MorePower2You site write token`.
7. Choose `Editor` permissions.
8. Copy the token once.
9. Go to `API` > `CORS origins` and add:
   - `http://localhost:3000`
   - the Vercel preview URL after deployment
   - `https://morepower2you.com` only after final approval/cutover

Put these in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_editor_token
SANITY_PREVIEW_SECRET=make_a_long_random_value
NEXT_PUBLIC_USE_SANITY=false
```

Keep `NEXT_PUBLIC_USE_SANITY=false` until the seed import is complete. Then we can switch it to `true`.

### 2. Resend Email
Go to https://resend.com/api-keys

1. Create a Resend account or sign in.
2. Click `Create API Key`.
3. Copy the API key.
4. Decide which inbox should receive form submissions.

Put these in `.env.local`:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_FORM_TO_EMAIL=the_inbox_that_receives_leads@example.com
CONTACT_FORM_FROM_EMAIL=MorePower2You <onboarding@resend.dev>
```

For production, verify a sending domain in Resend and replace `onboarding@resend.dev` with a MorePower2You sender address.

### 3. Cloudflare Turnstile
Go to https://dash.cloudflare.com

1. Open `Turnstile`.
2. Click `Add widget`.
3. Choose a managed widget.
4. Add `localhost`, the Vercel preview domain, and later `morepower2you.com`.
5. Copy the site key and secret key.

Put these in `.env.local`:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

## Local Commands

```bash
npm run cms:key-guide
npm run cms:check
npm run cms:seed:dry
npm run cms:seed
npm run dev
```

After `npm run dev`, open:

- Website: http://localhost:3000
- Admin/CMS: http://localhost:3000/studio

Sanity handles admin login. Only users invited to the Sanity project can edit content.

## Seed Content

The seed imports:

- Site settings
- Navigation
- Home page
- Primary pages
- Service pages
- Gaming and VIP Player Gifting as a published industry page
- Draft future industry pages
- Gallery references
- Testimonials
- FAQs
- Case studies
- Published and draft blog posts
- Lead magnets/resources
- SEO metadata

Run this before seeding:

```bash
npm run cms:seed:dry
```

Then seed:

```bash
npm run cms:seed
```

The seed uses `createOrReplace`, so it can be rerun during setup. After real editing begins in Sanity, avoid reseeding unless you intentionally want to overwrite matching seeded documents.
