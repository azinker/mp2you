# Dependency Notes

`npm audit fix` was attempted and did not produce a non-breaking fix path.

Remaining advisories are currently upstream in:
- Sanity / Sanity CLI dependency tree
- Next.js bundled PostCSS audit report
- Resend / svix dependency tree

NPM reports that the available fixes require `npm audit fix --force`, which would install breaking or unsafe major changes such as downgrading Sanity or Next. Do not force those changes without a separate dependency review.

Operational recommendation:
- Deploy on Node `20.19+` or Node `22+`.
- Re-run `npm audit` before Vercel production approval.
- Update Sanity, Next, and Resend when upstream non-breaking patched releases are available.
