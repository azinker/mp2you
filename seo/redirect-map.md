# Redirect Map

Legacy WordPress sitemap inspected at `https://morepower2you.com/wp-sitemap-posts-page-1.xml`.

| Current URL | Proposed new URL | Type | Notes |
|---|---:|---:|---|
| `/` | `/` | 200 | Homepage rebuilt with preserved “The Magnificent Power of Gifting” meaning. |
| `/about-us/` | `/about` | 301 | Implemented in `next.config.ts`. |
| `/services/` | `/services` | 200 | Same slug without trailing slash. New service detail pages added. |
| `/contact-us/` | `/contact` | 301 | Implemented in `next.config.ts`. Physical address removed from public display. |
| `/testimonial/` | `/testimonials` | 301 | Implemented in `next.config.ts`. Testimonials rewritten while preserving meaning. |
| `/gallery/` | `/gallery` | 200 | Same slug without trailing slash. Legacy images used as local placeholders. |

## New SEO URLs
- `/corporate-gifting`
- `/custom-gift-boxes`
- `/concierge-services`
- `/fulfillment-warehousing-distribution`
- `/gaming-vip-player-gifting`
- `/who-we-serve`
- `/process`
- `/case-studies`
- `/insights`
- `/resources/corporate-gifting-planning-checklist`
- `/he/...` Hebrew equivalents

## Notes
- Current local curl reported an expired TLS certificate on the existing WordPress site. Verify SSL before DNS cutover.
- Do not redirect old WordPress admin URLs. Keep `/studio` disallowed in robots and protected by Sanity authentication.
