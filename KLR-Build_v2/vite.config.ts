import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
import { articles } from "./src/content/articles";
import { site } from "./src/config/site";

/**
 * Emits sitemap.xml from the same route table the app renders, so the sitemap
 * cannot drift from the articles that actually exist.
 */
function sitemapPlugin(): Plugin {
  return {
    name: "klr-sitemap",
    apply: "build",
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const entries = [
        { loc: "/", lastmod: today, priority: "1.0", changefreq: "monthly" },
        { loc: "/projects", lastmod: today, priority: "0.8", changefreq: "monthly" },
        { loc: "/journal", lastmod: today, priority: "0.7", changefreq: "monthly" },
        ...articles.map((article) => ({
          loc: `/journal/${article.slug}`,
          lastmod: article.published,
          priority: "0.6",
          changefreq: "yearly",
        })),
      ];

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${site.url}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
    },
  };
}

/**
 * The hero <picture> is the LCP element, but it only exists once the React
 * bundle has run, so the browser's preload scanner cannot see it. This swaps
 * the <!-- klr:hero-preload --> marker in index.html for a preload that mirrors the
 * <picture>'s srcset/sizes (see src/components/Hero.tsx) using the hashed
 * asset names Rollup actually emitted. Dev mode simply drops the marker.
 */
const HERO_SIZES = "(min-width: 1024px) 45vw, 100vw";
const HERO_WIDTHS = [600, 900, 1200];
const HERO_MARKER = "<!-- klr:hero-preload -->";

function heroPreloadPlugin(): Plugin {
  return {
    name: "klr-hero-preload",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html.replace(HERO_MARKER, "");

        const srcset = HERO_WIDTHS.map((w) => {
          const file = Object.keys(bundle).find((name) =>
            new RegExp(`hero-pool-patio-${w}-[\\w-]+\\.webp$`).test(name),
          );
          return file ? `/${file} ${w}w` : null;
        }).filter(Boolean);

        if (srcset.length !== HERO_WIDTHS.length) {
          this.warn("hero preload skipped: hero-pool-patio-*.webp not all found in bundle");
          return html.replace(HERO_MARKER, "");
        }

        const link =
          `<link rel="preload" as="image" type="image/webp" fetchpriority="high" ` +
          `imagesrcset="${srcset.join(", ")}" imagesizes="${HERO_SIZES}">`;
        return html.replace(HERO_MARKER, link);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // The Lovable MCP codegen externalises anything that does not start with
    // "." or "/", so on Windows it rewrites the entry import as
    // `npm:C:\Users\...` and corrupts supabase/functions/mcp/index.ts on every
    // build. Let the Linux CI build regenerate it; leave the committed file
    // alone locally.
    process.platform !== "win32" && mcpPlugin(),
    sitemapPlugin(),
    heroPreloadPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Only split what every page needs. Supabase is deliberately absent:
        // it is reached solely from the lazily-loaded auth routes, so Rollup
        // keeps it out of the marketing critical path on its own.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["gsap", "lenis"],
        },
      },
    },
  },
}));
