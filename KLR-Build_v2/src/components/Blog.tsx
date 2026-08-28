import { useState } from "react";
import {
  SectionHeading,
  Button,
  Badge,
} from "@/design-system/klr-build-design-system-40bc4c";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  title: string;
  content: string;
  type: "exterior" | "landscaping";
}

const topics: Record<"exterior" | "landscaping", string[]> = {
  exterior: [
    "Curb Appeal Enhancement",
    "Deck Building Essentials",
    "Landscaping for All Seasons",
    "Exterior Paint Selection",
    "Outdoor Living Spaces",
  ],
  landscaping: [
    "Drought-Tolerant Planting Guides",
    "Modern Hardscape Trends",
    "Outdoor Lighting Strategies",
  ],
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tab, setTab] = useState<"exterior" | "landscaping">("exterior");
  const { toast } = useToast();

  const generateBlogPost = async (topic: string, type: "exterior" | "landscaping") => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-post", {
        body: { topic, type },
      });

      if (error) throw error;

      if (data.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
        return;
      }

      setBlogPosts((prev) => [{ title: data.title, content: data.content, type }, ...prev]);
      toast({ title: "Article ready", description: `A new piece on ${topic}.` });
    } catch (error) {
      console.error("Error generating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to generate the article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
          intro="Pick a topic and we'll draft a practical, cost-aware guide from our field notes."
          style={{ marginBottom: "var(--space-10)", maxWidth: 620 }}
        />

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 border border-border shadow-sm">
            {(["exterior", "landscaping"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  tab === value
                    ? "bg-[#6b5235] text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "var(--space-4)",
          }}
        >
          {topics[tab].map((topic) => (
            <Button
              key={topic}
              variant="secondary"
              disabled={isGenerating}
              onClick={() => generateBlogPost(topic, tab)}
            >
              {topic}
            </Button>
          ))}
        </div>

        {isGenerating && (
          <p
            style={{
              marginTop: "var(--space-8)",
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-eyebrow)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            Drafting the article…
          </p>
        )}

        {blogPosts.length === 0 && !isGenerating && (
          <p
            style={{
              marginTop: "var(--space-8)",
              marginBottom: 0,
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            No articles drafted yet — choose a topic above to start one.
          </p>
        )}

        {blogPosts.length > 0 && (
          <div
            style={{
              marginTop: "var(--space-16)",
              display: "grid",
              gap: "var(--space-6)",
              maxWidth: 760,
            }}
          >
            {blogPosts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                style={{
                  background: "var(--surface-card)",
                  border: "var(--border-width) solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--space-8)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                  alignItems: "flex-start",
                }}
              >
                <Badge tone={post.type === "exterior" ? "olive" : "bronze"}>
                  {post.type} improvement
                </Badge>
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
                  {post.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    lineHeight: "var(--leading-relaxed)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {post.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
