# Vercel Deployment Guide

## Current Recommendation

Use Vercel for the Next.js app and keep email/DNS records separate from hosting. The root path is V1; `/v2` and `/v3` are preview routes.

Current public DNS for `morepower2you.com` is served by Cloudflare nameservers:

- `deborah.ns.cloudflare.com`
- `guss.ns.cloudflare.com`

That means the Vercel DNS cutover should be made in Cloudflare DNS unless the nameservers are changed at Network Solutions first. Network Solutions can remain the registrar.

## First Deployment

1. Create a new Vercel project from this repository.
2. Use Node `20.19+`; the package declares `>=20.19 <25` so Vercel can use a supported current runtime.
3. Add environment variables from `.env.example`.
4. Deploy a preview branch first.
5. Confirm `/`, `/he`, `/studio`, `/contact`, `/sitemap.xml`, and `/robots.txt`.
6. Configure Sanity CORS for the Vercel preview and final production domains.
7. Configure Resend domain verification before relying on production email.
8. Configure Cloudflare Turnstile domains for preview and production.
9. Run Vercel build logs and confirm `next build` passes.

## Production Cutover
Do not change DNS until the preview is approved. Keep the existing WordPress site live while the Vercel preview is reviewed.
