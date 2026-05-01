# Staging and Admin Setup

## Sanity
1. Create a Sanity project at https://www.sanity.io/manage.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN`.
3. Add the local and Vercel preview URLs to Sanity CORS.
4. Run `npm run cms:check`.
5. Run `npm run cms:seed:dry`.
6. Run `npm run cms:seed`.
7. Visit `/studio`.
8. Sign in with Sanity. This provides admin-only access through Sanity auth.

See `CMS_SETUP.md` for the exact click path.

## Content Managed in CMS
- Site settings
- Navigation
- Pages
- Services
- Industry pages
- Blog posts
- Case studies
- Gallery
- Testimonials
- FAQs
- Lead magnets/resources
- SEO metadata and OG images
- Contact/project inquiry submissions with New, Contacted, Archived status

## Forms
Submissions are stored in Sanity when `SANITY_API_TOKEN` is present. Without the token, the form can still validate and email through Resend when configured.

## Admin Notes
The default Sanity Studio is intentionally used instead of a custom dashboard. It is faster to secure, easier to maintain, and fits the requested admin-only editing requirement.
