# klrbuild.com

Public marketing site for **KLR Build LLC** — a family-owned outdoor-living design-build firm in
Oceanside, CA.

Vite 5 + React 18 + TypeScript, client-rendered SPA with `react-router-dom`. Originally
scaffolded with [Lovable](https://lovable.dev).

## Development

Requires Node 18+.

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # http://localhost:3000
```

## Verification

```bash
npm run verify
```

Runs `typecheck` → `lint` → `build`. All three must be clean before deploying.

Individually: `npm run typecheck`, `npm run lint`, `npm run build`.

## Environment variables

All are read at **build time** and inlined into the browser bundle. Never put a secret in any of
them. See `.env.example` for the template.

| Variable | Required | Purpose | Behaviour if unset |
| --- | --- | --- | --- |
| `VITE_LEAD_WEBHOOK_URL` | **Yes** | n8n Production webhook receiving lead and review submissions | Both forms show an error telling visitors to call instead. **The site should not go live without this.** |
| `VITE_GA4_MEASUREMENT_ID` | No | GA4 measurement ID (`G-XXXXXXXXXX`) | No script is injected and every `trackEvent` call is a no-op |
| `VITE_SUPABASE_URL` | No | Supabase project URL | Only the `/login` and OAuth-consent routes are affected |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | No | Supabase anon/publishable key | As above |
| `VITE_SUPABASE_PROJECT_ID` | No | Supabase project ref | As above |

### Webhook contract

Both forms POST JSON to `VITE_LEAD_WEBHOOK_URL`:

```json
{
  "kind": "lead",
  "submittedAt": "2026-09-07T18:04:11.201Z",
  "sourceUrl": "https://klrbuild.com/",
  "data": { }
}
```

`kind` is `"lead"` or `"review"` — branch on it in the n8n workflow.

- `kind: "lead"` → `data` matches `leadSchema` in `src/integrations/crm.ts`
  (name, phone, email, project type, budget, and full site address).
- `kind: "review"` → `data` is `{ name, rating, review }`.

Any non-2xx response, or no response within 15 seconds, surfaces an error to the visitor that
names the phone number. Return 200 quickly and do the slow work asynchronously in n8n.

## Deployment

The build output is a static `dist/`. **The host must rewrite all unmatched paths to
`/index.html`**, or deep links like `/journal/pavers-vs-stamped-concrete-patio` will 404 on a
hard refresh or a shared link.

Committed config:

- `public/_redirects` — Netlify, Cloudflare Pages
- `vercel.json` — Vercel

Any other host needs its own equivalent. Verify after deploying by loading a deep link directly
rather than by clicking through from the home page.

## Structure

| Path | What |
| --- | --- |
| `src/config/site.ts` | Single source of truth for phone, email, address, hours, CSLB licence |
| `src/content/articles.ts` | Journal articles — static, hand-written, versioned |
| `src/design-system/` | Ported KLR design system: tokens plus the eight brand components |
| `src/integrations/crm.ts` | Zod schemas and webhook delivery for both forms |
| `src/hooks/useSeo.ts` | Per-route title, description, canonical, and social tags |
| `supabase/functions/mcp/` | Generated Deno bundle — edit `src/lib/mcp/` instead |

Build rules and constraints live in [`../CLAUDE.md`](../CLAUDE.md).
