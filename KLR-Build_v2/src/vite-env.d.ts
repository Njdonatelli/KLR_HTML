/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** n8n webhook that receives lead and review submissions. */
  readonly VITE_LEAD_WEBHOOK_URL?: string;
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX. Analytics is inert when unset. */
  readonly VITE_GA4_MEASUREMENT_ID?: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_SUPABASE_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Google Analytics globals, injected by the gtag.js snippet. */
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
