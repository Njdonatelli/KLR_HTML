# klrbuild.com — build rules

## What this is

Public marketing site for KLR Build, a design-build/landscape firm in Oceanside / San Diego
(hardscape, softscape, pools, patios, four-season rooms). Next.js (App Router, SSR for SEO) +
Tailwind + headless CMS. This is a PORT of an existing design system, not a new design.

## Non-negotiable: the design system is the source of truth

- The palette, type, spacing, and radii come ONLY from the token CSS in `brand/` wired into the Tailwind theme. Never introduce a hex, font, or spacing value that isn't a token.
- Port these EIGHT components to React+Tailwind keeping their exact names and visual design:
  StatCard, SectionHeading, FeatureCard, Badge, ProcessStep, TestimonialCard, Input, Button.
  Preserve their current look; do not redesign them. Match `ui_kits/website/` exactly.
- `ui_kits/website/` (home, process, contact) is the visual reference. Where it pins a visual
  decision, follow it exactly — its words win over your defaults.

## Stack rules

- Server Components by default; add 'use client' only at the leaf where interactivity is needed.
- Use generateMetadata (or static metadata export) for SEO on EVERY page. Never hardcode
  <title>/<meta> in JSX. Every route with async data gets loading.tsx + error.tsx.
- Every content image uses next/image with meaningful alt text. Photography is the primary
  quality lever — treat image layout, aspect ratios, and art direction as first-class.
- WCAG 2.2 AA: visible keyboard focus, semantic HTML, honor prefers-reduced-motion. Per W3C
  WCAG SC 1.4.3 (Level AA), text contrast must be at least 4.5:1 (3:1 for large text).

## Scope discipline

Don't add features, refactor, or introduce abstractions beyond what the task requires. Don't add error handling for scenarios that can't happen. Only validate at system boundaries (form input, CMS API).

## Verification

After building a page, run the build, then screenshot it and diff against the matching
`ui_kits/website/` reference. Report failing states with the actual output; don't claim done
without evidence.
