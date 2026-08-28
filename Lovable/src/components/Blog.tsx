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
  type: "interior" | "exterior";
}

const topics: Record<"interior" | "exterior", string[]> = {
  interior: [
    "Modern Kitchen Renovation Ideas",
    "Creating a Cozy Living Room",
    "Bathroom Design Trends",
    "Home Office Setup Tips",
    "Maximizing Small Spaces",
  ],
  exterior: [
    "Curb Appeal Enhancement",
    "Deck Building Essentials",
    "Landscaping for All Seasons",
    "Exterior Paint Selection",
    "Outdoor Living Spaces",
  ],
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tab, setTab] = useState<"interior" | "exterior">("interior");
  const { toast } = useToast();

  const generateBlogPost = async (topic: string, type: "interior" | "exterior") => {
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

        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            marginBottom: "var(--space-8)",
            flexWrap: "wrap",
          }}
        >
          {(["interior", "exterior"] as const).map((value) => (
            <Button
              key={value}
              variant={tab === value ? "primary" : "ghost"}
              size="sm"
              onClick={() => setTab(value)}
            >
              {value}
            </Button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
                <Badge tone={post.type === "interior" ? "olive" : "bronze"}>
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
