import { useEffect } from "react";
import { site } from "@/config/site";

interface SeoOptions {
  title: string;
  description: string;
  /** Path only, e.g. "/journal". Combined with the canonical origin. */
  path: string;
  /** Absolute URL. Falls back to the site-wide social image. */
  image?: string;
  type?: "website" | "article";
}

const DEFAULT_IMAGE = `${site.url}/og-image.jpg`;

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-route document head for a client-rendered SPA.
 *
 * Google renders JS before indexing, so this is enough for canonical/title/
 * description. Link-unfurlers (Slack, iMessage, Facebook) do not run JS and
 * will only ever see the defaults baked into index.html — that is the ceiling
 * of this approach, and the reason to move to prerendering later.
 */
export function useSeo({ title, description, path, image, type = "website" }: SeoOptions) {
  useEffect(() => {
    const canonical = `${site.url}${path}`;
    const socialImage = image ?? DEFAULT_IMAGE;

    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", socialImage);
    setMeta('meta[property="og:type"]', "property", "og:type", type);

    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImage);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [title, description, path, image, type]);
}
