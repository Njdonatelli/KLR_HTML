# klrbuild.com — build rules

## What this is

Public marketing site for KLR Build LLC, a family-owned outdoor-living design-build firm in
Oceanside / North San Diego County — patios and hardscape, pools and water features, turf and
planting, fire features, four-season rooms, and landscape lighting.

**The site lives in `KLR-Build_v2/`.** Run every command from that directory, not the repo root.

## Stack (what it actually is)

- **Vite 5 + React 18 SPA**, TypeScript, `react-router-dom` v6. Client-rendered — there is no
  server, no SSR, and no App Router. Earlier revisions of this file specified Next.js; that was
  never built and the spec has been corrected to match the code.
- **Tailwind 3** for layout utilities, plus the design-system token CSS for all colour, type,
  spacing, and radii.
- **Content is static and versioned in the repo** (`src/content/`). There is no headless CMS.
- **Supabase** backs only the Lovable auth pages and the MCP edge function — nothing the
  marketing pages need. Keep it off the critical path.
- **n8n** receives lead and review form submissions via `VITE_LEAD_WEBHOOK_URL`.

## Non-negotiable: the design system is the source of truth

- Palette, type, spacing, and radii come ONLY from
  `src/design-system/klr-build-design-system-40bc4c/styles/tokens.css`. Never introduce a hex,
  font, or spacing value that is not a token.
- These EIGHT components keep their exact names and visual design:
  StatCard, SectionHeading, FeatureCard, Badge, ProcessStep, TestimonialCard, Input, Button.
  Preserve their look. Behavioural additions are fine when they do not change rendering — e.g.
  `Button` accepts `href` and renders an `<a>` so navigation CTAs are real links.
- `brand/ui_kits/website/` (home, process, contact) is the visual reference. Where it pins a
  visual decision, follow it exactly — its words win over your defaults.
- `brand/readme.md` is the canonical brand voice and content guide: direct, grounded, no emoji,
  no hype, specificity over superlatives.

## Business facts

`src/config/site.ts` is the single source of truth for phone, email, address, hours, and the
CSLB licence number. Never hardcode any of these in a component.

**California Business & Professions Code §7030.5 requires the contractor licence number on all
advertising, which includes this site.** It renders in the footer, the contact block, the About
grid, and the LocalBusiness JSON-LD in `index.html`. Do not remove any of those.

Never invent client work, testimonials, project names, dimensions, schedules, or completion
claims. If there is no photograph and no client permission, the page says so.

**Photography source: `brand/uploads/KLR_Presentation.pdf`.** Page 2 is the hero. Page 3 is a
front-yard before/after pair (the "after" also appears at higher resolution on page 9). Pages 7
and 10 hold finished patios and an entry walkway; page 5 has a grading shot. Do not use:
**page 8, which is AI-generated examples, not built work**; page 4, which is a 3D rendering;
page 5's second image, which is a screenshot carrying a "11 of 20" UI overlay; and page 9's
portrait, which is a Canva stock headshot rather than the client who wrote the quote beside it.
Captions describe only what is visible in frame — no names, addresses, or budgets.

Never publish pricing, rates, margins, or financial terms — surface the question, let the team
answer it.

## Stack rules

- Routes are lazy-loaded except the home page. Anything that pulls Supabase or auth stays lazy.
- Every route sets its own head via `useSeo` (title, description, canonical, og/twitter). Never
  hardcode a `<title>` in JSX. Site-wide defaults and the LocalBusiness JSON-LD live in
  `index.html` so crawlers see them without executing JavaScript.
- `sitemap.xml` is generated at build time by the `klr-sitemap` plugin in `vite.config.ts` from
  the same data the app renders. Add a route → add it there.
- Content images use `<picture>` with WebP sources and intrinsic `width`/`height`. Photography
  is the primary quality lever — treat image layout, aspect ratios, and art direction as
  first-class. There is no `next/image`; size and convert assets deliberately.
- WCAG 2.2 AA: visible keyboard focus, semantic HTML, honour `prefers-reduced-motion`. Per W3C
  WCAG SC 1.4.3 (Level AA), text contrast must be at least 4.5:1 (3:1 for large text).
- Validate only at system boundaries — form input and the webhook payload, via the zod schemas
  in `src/integrations/crm.ts`.

## Known constraints

- **Deep links need a host rewrite.** `public/_redirects` (Netlify / Cloudflare Pages) and
  `vercel.json` are committed. A different host needs its own equivalent or `/journal/...` 404s.
- **Link unfurlers see only `index.html`.** Slack, iMessage, and Facebook do not run JS, so
  per-route og tags set by `useSeo` are invisible to them. Fixing that means prerendering.
- **The MCP Vite plugin is disabled on Windows.** `@lovable.dev/mcp-js` externalises any import
  not starting with `.` or `/`, so on Windows it rewrites the entry as `npm:C:\Users\...` and
  corrupts `supabase/functions/mcp/index.ts` on every build. `vite.config.ts` gates it to
  non-win32; Linux CI still regenerates the function normally.

## Scope discipline

Don't add features, refactor, or introduce abstractions beyond what the task requires. Don't add
error handling for scenarios that can't happen.

## Verification

From `KLR-Build_v2/`:

```bash
npm run verify
```

That runs `typecheck`, `lint`, and `build`. After building a page, screenshot it and diff against
the matching `brand/ui_kits/website/` reference. Report failing states with the actual output;
don't claim done without evidence.
