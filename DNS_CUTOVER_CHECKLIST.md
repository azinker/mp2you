# DNS / Domain Cutover Checklist

Do not switch DNS until the Vercel preview is approved.

## DNS Owner

`morepower2you.com` currently uses Cloudflare nameservers, so edit the live DNS zone in Cloudflare unless the domain's nameservers are moved at Network Solutions first. Do not remove existing MX/TXT records for email while changing web records.

1. Confirm the current WordPress site has a valid TLS certificate or document the current certificate issue.
2. Confirm Vercel preview build passes.
3. Confirm stakeholder approval of English and Hebrew pages.
4. Confirm Sanity Studio access and content editing.
5. Confirm Resend verified sender/domain.
6. Confirm Turnstile production domain.
7. Confirm redirects from `/about-us/`, `/contact-us/`, and `/testimonial/`.
8. Export or backup the current WordPress site.
9. In Cloudflare DNS, point the apex/root and `www` web records according to Vercel's exact project instructions for this project.
10. Keep old hosting available temporarily during propagation.
11. After launch, check:
    - `https://www.morepower2you.com/`
    - `https://morepower2you.com/`
    - `/sitemap.xml`
    - `/robots.txt`
    - `/contact`
    - `/he`
    - legacy redirects
12. Submit sitemap in Google Search Console.
