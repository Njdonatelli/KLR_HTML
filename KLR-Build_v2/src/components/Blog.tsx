import { Link } from "react-router-dom";
import { SectionHeading, Badge } from "@/design-system/klr-build-design-system-40bc4c";
import { articlesNewestFirst, CATEGORY_LABELS } from "@/content/articles";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

const Blog = () => {
  const gridRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-up",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.1,
  });

  return (
    <section
      id="blog"
      style={{
        background: "var(--surface-sunken)",
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading
          eyebrow="The Journal"
          title="Answers to the questions we get on site"
          intro="Field notes on the decisions that come up on nearly every job — what we recommend, and why."
          style={{ marginBottom: "var(--space-12)", maxWidth: 620 }}
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "var(--space-6)" }}
        >
          {articlesNewestFirst.map((article) => (
            <article
              key={article.slug}
              data-reveal-card
              className="group flex flex-col transition-shadow duration-base ease-out-quart hover:shadow-md"
              style={{
                background: "var(--surface-card)",
                border: "var(--border-width) solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--space-8)",
                gap: "var(--space-4)",
              }}
            >
              <div>
                <Badge tone={CATEGORY_TONE[article.category]}>
                  {CATEGORY_LABELS[article.category]}
                </Badge>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h4)",
                  fontWeight: 700,
                  lineHeight: "var(--leading-snug)",
                  color: "var(--text-primary)",
                }}
              >
                <Link
                  to={`/journal/${article.slug}`}
                  className="hover:underline focus-visible:underline"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {article.title}
                </Link>
              </h3>

              <p
                style={{
                  margin: 0,
                  flex: 1,
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--leading-relaxed)",
                  color: "var(--text-secondary)",
                }}
              >
                {article.summary}
              </p>

              <p
                style={{
                  margin: 0,
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
