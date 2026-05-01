# QA Checklist

## Automated
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`

## Manual Pages
- Home: `/`, `/he`
- About: `/about`, `/he/about`
- Services overview and four service pages
- Gaming & VIP Player Gifting: `/gaming-vip-player-gifting`, `/he/gaming-vip-player-gifting`
- Who We Serve, Process, Gallery, Case Studies, Testimonials, FAQs
- Blog index and all five published posts
- Three resource pages
- Contact form
- Privacy, Terms, Data/Cookies Notice
- 404 page

## Responsive Views
Check at 390px, 768px, 1024px, and 1440px:
- Header and mobile menu
- Hero image framing
- Button text wrapping
- Contact form fields
- Gallery cards
- RTL spacing and alignment

## Contact Flow
- Required field validation works.
- Turnstile widget appears when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured.
- API verifies Turnstile when `TURNSTILE_SECRET_KEY` is configured.
- Resend sends internal email when `RESEND_API_KEY` and `CONTACT_FORM_TO_EMAIL` are configured.
- Visitor autoresponder sends after successful submission.
- Sanity stores submissions when `SANITY_API_TOKEN` is configured.
- Submission statuses available: New, Contacted, Archived.

## SEO
- `sitemap.xml` includes English and Hebrew routes.
- `robots.txt` disallows `/api/` and `/studio/`.
- Canonical and alternate language tags present.
- Organization, Service, FAQ, Article, and Breadcrumb schema render where appropriate.
- Redirects from legacy slugs work.

## Accessibility
- Keyboard navigation works in header, mobile menu, forms, accordions.
- Inputs have labels.
- Contrast is readable.
- Reduced-motion preference is respected.

## Notes From Initial Inspection
- Legacy WordPress site uses Elementor/JupiterX and old public images.
- Legacy sitemap has six pages.
- Public curl reported expired TLS certificate; verify certificate health before cutover.
