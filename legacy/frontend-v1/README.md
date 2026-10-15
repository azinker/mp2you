# Legacy front end (v1, warm porcelain / gold)

Snapshot of the public-site front end as it was before the October 2026 rebrand
(royal blue / teal / coral palette, new MP ribbon logo).

Nothing in this folder is compiled or served. It exists so the old look can be
restored or referenced without digging through git history.

## Three ways to revert

1. **Vercel instant rollback** (fastest, no code change): open the project in
   Vercel, go to Deployments, pick the last deployment before the rebrand and
   choose "Promote to Production" / "Instant Rollback".
2. **Git tag**: the full repository state before the rebrand is tagged
   `legacy-frontend-v1` and also lives on the branch `legacy/frontend-v1`.
   `git checkout legacy-frontend-v1` reproduces the old site exactly.
3. **File copies** (this folder): the files below are verbatim copies of the
   pre-rebrand sources. Copy them back over `src/app` and `src/components`
   (and restore `--font-v2-sans`, Cormorant Garamond and Inter in
   `src/app/layout.tsx`) if you only want to revert the front end.

```
app/globals.css              full old stylesheet (marketing + inventory portal)
app/layout.tsx               old font loading (Cormorant Garamond, Inter, Plus Jakarta Sans, DM Serif Display)
app/not-found.tsx
app/opengraph-image.tsx
app/favicon.ico
components/templates.tsx     all old page templates
components/header.tsx
components/footer.tsx
components/hero-visual.tsx
components/brand-mark.tsx    old generated logo lockups (v1/v2/v3)
components/site-chrome.tsx
components/mobile-nav.tsx
components/language-switcher.tsx
components/project-gallery.tsx
components/contact-form.tsx
logo-lockup-v1.png           old header logo
DESIGN-SYSTEM-v1.md          old design system notes
```

Content (`src/content/*`), routing, the CMS mapping, the contact API, and the
inventory portal were not changed by the rebrand.
