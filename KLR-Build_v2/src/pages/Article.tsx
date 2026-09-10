import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/design-system/klr-build-design-system-40bc4c";
import { CATEGORY_LABELS, getArticle } from "@/content/articles";
import { site } from "@/config/site";
import { useSeo } from "@/hooks/useSeo";
import NotFound from "./NotFound";

const CATEGORY_TONE = {
  hardscape: "tan",
  planting: "olive",
  lighting: "bronze",
  process: "navy",
} as const;

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug ?? "");

  useSeo({
    title: article ? `${article.title} | ${site.name}` : `Not found | ${site.name}`,
    description: article?.summary ?? "",
    path: `/journal/${slug ?? ""}`,
    type: "article",
  });

  if (!article) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.published,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col bg-card">
      <Navigation />

      <main id="content" tabIndex={-1} className="flex-1 pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "var(--space-12) var(--space-6)",
          }}
        >
          <Link
            to="/journal"
            style={{
              display: "inline-block",
              marginBottom: "var(--space-8)",
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-caption)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--text-accent)",
            }}
          >
            ← All articles
          </Link>

          <Badge tone={CATEGORY_TONE[article.category]}>
            {CATEGORY_LABELS[article.category]}
          </Badge>

          <h1
            style={{
              margin: "var(--space-4) 0 var(--space-4)",
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 800,
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-primary)",
            }}
          >
            {article.title}
          </h1>

          <p
            style={{
              margin: "0 0 var(--space-10)",
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-caption)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            <time dateTime={article.published}>{formatDate(article.published)}</time>
            {" · "}
            {article.readingMinutes} min read
          </p>

          {article.body.map((paragraph, index) => (
            <p
              key={index}
              style={{
                margin: "0 0 var(--space-6)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--text-secondary)",
              }}
            >
              {paragraph}
            </p>
          ))}

          <aside
            style={{
              marginTop: "var(--space-12)",
              padding: "var(--space-8)",
              background: "var(--surface-sunken)",
              border: "var(--border-width) solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--text-secondary)",
              }}
            >
              Working through this on your own property? Call{" "}
              <a href={`tel:${site.phone.e164}`} style={{ color: "var(--text-accent)", textDecoration: "underline", textUnderlineOffset: "0.2em" }}>
                {site.phone.display}
              </a>{" "}
              or{" "}
              <Link to="/#contact" style={{ color: "var(--text-accent)", textDecoration: "underline", textUnderlineOffset: "0.2em" }}>
                request a walkthrough
              </Link>
              . No charge, no pressure.
            </p>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
