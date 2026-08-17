# KLR Build LLC — Design System

KLR Build LLC is a family-owned outdoor living design-build company based in Oceanside, CA (697 Chimney Rock Dr, Oceanside CA 92058 · klrbuildllc@gmail.com · (619) 739-1135 · klrbuild.com). The name comes from the owner's daughter's initials. The company designs and builds patios, hardscape, pools and water features, turf and planting, fire features, and four-season rooms, and runs the whole job — design, HOA submission, construction, planting, final walk-through — through one team.

Tagline: **"Designed with intent. Built to endure."**

## Sources

- `uploads/PNG01A.png`, `uploads/PNG01B.png` — primary logo lockup (full color, two crops)
- `uploads/PDF1.pdf` — business card print file (front/back, logo + tagline only, no extra content)
- `uploads/KLR_Presentation.pdf` — 10-page company overview deck (process, vision questions, value stats, testimonial, contact) — the main source for copy and content structure in this system
- `uploads/AI1.ai`, `uploads/EPS1.eps` — referenced in the original brief but not present in the uploads folder; not used
- No codebase, Figma file, or existing website was provided. Everything here (components, UI kit, slide templates) is built from scratch, styled from the logo's palette and the presentation's content and structure.

## Index

- `styles.css` — root stylesheet, imports everything below
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`
- `assets/` — `logo-full.png` (primary lockup), `logo-full-alt.png` (tighter crop), `logo-mark.png` (house icon only), `logo-wordmark.png` (type only)
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand) shown in the Design System tab
- `components/core/` — `Button`, `Badge`, `Input`
- `components/marketing/` — `SectionHeading`, `StatCard`, `ProcessStep`, `TestimonialCard`, `FeatureCard`
- `ui_kits/website/` — marketing website recreation (home page, process, contact)
- `slides/` — slide templates matching the presentation's structure (title, process, stats, testimonial, contact)
- `SKILL.md` — portable skill file for use outside this product

## Components

No design-system source (codebase or Figma) defined a component inventory, so the set below was authored from scratch, sized to what the presentation content actually needs — not a generic UI-kit checklist.

**Core** — `Button` (primary/secondary/ghost/tan, on-dark variant), `Badge` (pill label, 5 tones), `Input` (labeled text field / textarea)

**Marketing** — `SectionHeading` (eyebrow + title + intro), `StatCard` (big number stat), `ProcessStep` (numbered step), `TestimonialCard` (client quote), `FeatureCard` (accent-bordered benefit card)

### Intentional additions

None of these are inventions beyond what the source content calls for — every component maps directly to a recurring pattern in the presentation (process steps, value stats, testimonial, feature grid, CTA buttons, contact form).

## Content fundamentals

**Voice**: direct, reassuring, a little folksy — "when KLR Build says something will get done, it gets done." Sentences are short and concrete. Copy speaks about "you" and "your vision," and often about "we" as a small team, not a faceless company — family-owned is repeated as a selling point, not a footnote.

**Casing**: section headers and callouts in the deck are frequently set in ALL CAPS (e.g. "WHY CUSTOMERS CHOOSE KLR BUILD," "CHOOSE LOCAL"). Body paragraphs are normal sentence case. This system reflects that split: eyebrows/labels/taglines are uppercase with wide tracking (Barlow Semi Condensed); paragraphs are sentence case (Work Sans).

**Structure**: content leans on short numbered/stepped lists (the 7-step process) and small stat call-outs (8–15% ROI, "3 costs," "1 vision") rather than long paragraphs. Headlines ask direct questions of the reader ("DO YOU LEAN BRIGHT, EARTHY, AIRY, WARM, MODERN, CALM, OR DRAMATIC?").

**No emoji.** No slang, no exclamation-heavy hype copy — confidence comes from specificity (exact day ranges: "5–7 days," "3–4 days") rather than superlatives.

**Vibe**: warm, grounded, craftsman — a small local business proud of doing the work right, not a slick national franchise.

## Visual foundations

**Color**: five-color palette sampled directly from the logo's four house quadrants plus the wordmark — tan/taupe `#b4a593` (brick), olive `#5f6043` (grass), navy `#20404e` (pool), bronze `#7e6e52` (fire pit), charcoal `#181e23` (wordmark). Navy is the primary accent (CTAs, links, headings on light surfaces); olive and bronze are secondary accents for variety across cards/badges; tan is used sparingly as a warm highlight (one CTA button style, tagline text). No more than one saturated accent dominates a given screen — this is an earthy, muted palette, not a bright brand palette.

**Type**: three-family system. `Archivo` (display/heading, 700–900 weight) for headlines and stat numbers — bold and geometric, closest open match to the blocky lettering in the "KLR" wordmark. `Work Sans` (body, 400–600) for paragraphs and UI copy — plain and legible, no personality competing with the headlines. `Barlow Semi Condensed` (label, 500–700, uppercase, wide tracking) for eyebrows, taglines, and button labels — matches the condensed all-caps treatment used throughout the presentation and on the tagline lockup. **Font substitution note**: no font files were provided with the brand assets. These three are Google Fonts substitutes chosen to match the logo's letterforms and the deck's condensed-caps labels — flag this to the user; if KLR has licensed brand fonts, swap the `@import` in `tokens/fonts.css`.

**Spacing**: 4px base unit, scale from 4px to 128px (`--space-1` … `--space-32`). Generous section padding (64–96px) between page sections, tighter (12–24px) inside cards.

**Backgrounds**: flat color fields, no gradients, no textures or patterns. The presentation source uses full-bleed photography behind some section headers (not included — these are un-cleared stock/placeholder-style images) — this system uses flat navy or off-white section backgrounds as the safe default and calls out where a client photo should go.

**Imagery**: none of the client's actual project photography was included in the source files. Real job-site and finished-space photography (patios, fire pits, pools, turf) should replace all image placeholders — do not substitute generic stock.

**Animation**: the source is a static deck; no motion system exists. Recommend restrained, functional motion only — 120–180ms ease transitions on hover/focus, no bounce, no elaborate entrance animations. This matches the brand's grounded, craftsman tone.

**Hover / press states**: buttons darken (primary navy → lighter navy is used for *hover fill*, actual press should darken further) or gain a light tint fill (outline/ghost buttons on hover). No scale/shrink effects — keep interactions calm and solid, consistent with "built to endure."

**Borders & shadows**: 1px hairline borders (`--border-default`, warm stone gray) for input fields and outline cards. Shadows are soft and low-elevation (`--shadow-sm`/`md`/`lg`) — never heavy or dark; cards read as sitting gently on the page, not floating dramatically.

**Corner radii**: small and consistent — 4px (inputs/buttons), 8px (small cards), 14px (larger content cards), pill (badges only). Nothing fully rounded except pills and the numbered circles in the process steps.

**Layout**: centered container, max width 1200px. Section-based marketing page structure (hero → process → value stats → features → testimonial → contact), matching the flow of the source presentation almost page-for-page.

## Iconography

The only graphic marks in the source material are the four pictograms built into the logo itself (brick wall, blades of grass, pool ladder, fire pit) — there is no separate icon font, SVG icon set, or icon usage anywhere else in the presentation or business card. Numerals (in circles) stand in for icons in the process steps, matching how the deck itself represents its 7-step process as plain numbered text, not icons.

**No icon system exists to carry forward.** If a consuming project needs functional UI icons (checkmarks, arrows, form icons) that aren't in the brand material, [Lucide](https://lucide.dev) is a reasonable open, thin-stroke CDN fallback that won't clash with the muted, hand-drawn feel of the logo's pictograms — flag any such addition as a substitution, the same way the fonts above are flagged. No emoji are used anywhere in the source material.

## Caveats

- `uploads/AI1.ai` and `uploads/EPS1.eps` were listed in the brief but not present in the uploads folder — not used. If they contain the real brand fonts or vector assets, re-attach them.
- Fonts are Google Fonts substitutes (see Visual Foundations) — no licensed brand font files were provided.
- No knockout/white version of the logo was provided — the full-color mark isn't legible directly on navy or charcoal. On dark surfaces, place it on a light chip/panel (see "Logo on Navy" in Brand guidelines) rather than directly on the dark fill.
- No real job-site photography was provided — all imagery slots in the UI kit and slides are placeholders.
- No codebase or Figma file was attached, so the component inventory and UI kit are original constructions built to serve the presentation's actual content, not a recreation of an existing product.
