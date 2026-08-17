# Employee Dashboard — Setup & Wiring

Adds a gated `/dashboard` route to the KLR Build site (Vite + React + Supabase). Access is
restricted to **verified email addresses on an approved domain** (`klrbuild.com`).

## Files added
| File | Purpose |
|---|---|
| `src/lib/auth/employee.ts` | Domain allowlist (`ALLOWED_EMPLOYEE_DOMAINS`) + `isEmployeeEmail()` |
| `src/hooks/useAuth.ts` | Session/user hook over the existing Supabase client |
| `src/components/ProtectedRoute.tsx` | 3-gate guard: session → verified email → allowed domain |
| `src/data/opsOverview.ts` | Seed initiatives/KPIs mirrored from the Ops Command Center |
| `src/pages/Dashboard.tsx` | Native Overview: KPI bar, health distribution, initiative cards |

## Files modified
- `src/App.tsx` — registers `/dashboard` inside `<ProtectedRoute>`.
- `src/components/Navigation.tsx` — discreet **Team** link (desktop + mobile). The link is
  visible to everyone; the route enforces access, so a non-employee just hits the denial screen.

## How the gate works
1. **No session** → redirect to `/login?next=/dashboard` (your existing Login page).
2. **Signed in, email not verified** → denial screen asking them to confirm first. Prevents an
   unconfirmed password signup from *claiming* a `@klrbuild.com` address it doesn't own.
3. **Signed in, wrong domain** → explicit "Employees only" screen with a switch-account button.
4. **Signed in, verified, `@klrbuild.com`** → dashboard renders.

Google OAuth logins arrive provider-verified, so staff using "Continue with Google" with their
company Google Workspace account pass straight through.

### Changing who gets in
One line in `src/lib/auth/employee.ts`:
```ts
export const ALLOWED_EMPLOYEE_DOMAINS = ["klrbuild.com"] as const; // add domains here
```

## Required Supabase configuration
The gate is only as strong as your Supabase auth settings. In the Supabase dashboard for project
`tadbcnnfjigbagcmypvp`:

1. **Authentication → Providers → Email**: keep **"Confirm email" ON**. Without it,
   `email_confirmed_at` is set immediately and gate #2 is bypassed — anyone could sign up as
   `whoever@klrbuild.com` without owning the inbox.
2. **Authentication → URL Configuration**: add your production domain to **Redirect URLs** so the
   email confirmation + OAuth `next=/dashboard` redirects resolve.
3. *(Optional, hardening)* If you don't want the public creating accounts at all, disable
   **"Allow new users to sign up"** and invite staff from **Authentication → Users**. The domain
   gate already blocks non-staff from the dashboard either way.

> This is client-side route gating — correct for showing/hiding an internal UI. It is **not** a
> substitute for row-level security. When the dashboard starts pulling real data (below), enforce
> the same domain rule server-side via Supabase RLS / Edge Function auth so the data can't be
> fetched directly by a signed-in non-employee.

## What's live vs. stubbed
- **Overview** tab: fully functional, renders from `src/data/opsOverview.ts`.
- **Trello Pipeline / Roadmap / Kanban / County Permits** tabs: shown, locked, labeled "live data
  soon." These mirror the views in the `klr-operations` Command Center, which today are served by
  the local `server.py` (Dropbox permit digests, Trello board, CF webhook). That backend is **not**
  part of this deploy.

## Wiring live data (next phase)
The `klr-operations` app reads from a local Python server on `localhost:8000`. To surface real
numbers on the public site, re-plumb those sources through Supabase rather than shipping `server.py`:
- **Permits**: move the digest parser into a Supabase **Edge Function** (or scheduled job) that
  writes parsed permits to a `permits` table; read it client-side with RLS restricting to staff.
- **Trello**: proxy the board read through an Edge Function holding the Trello token (never expose
  the key in the Vite bundle).
- **Contractor Foreman**: point the existing CF webhook at an Edge Function that inserts leads.

Then swap the `INITIATIVES` import in `Dashboard.tsx` for a `react-query` fetch — the KPI math in
`getExecutiveStats()` already derives from whatever array it's given.

## Run locally
```bash
npm install
npm run dev   # Team link in the nav → /dashboard
```
