import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Home, Palette, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  title: string;
  content: string;
  type: "interior" | "exterior";
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const topics = {
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

  const generateBlogPost = async (topic: string, type: "interior" | "exterior") => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-post", {
        body: { topic, type },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      const newPost: BlogPost = {
        title: data.title,
        content: data.content,
        type,
      };

      setBlogPosts((prev) => [newPost, ...prev]);
      
      toast({
        title: "Blog Post Generated!",
        description: "AI has created a new article about " + topic,
      });
    } catch (error) {
      console.error("Error generating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to generate blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="blog" className="py-20 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-accent" size={32} />
            <h2 className="text-4xl md:text-5xl">AI-Powered Home Improvement Blog</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Click any topic below to generate an expert article about interior or exterior home improvements
          </p>
        </div>

        <Tabs defaultValue="interior" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="interior" className="flex items-center gap-2">
              <Palette size={20} />
              Interior
            </TabsTrigger>
            <TabsTrigger value="exterior" className="flex items-center gap-2">
              <Home size={20} />
              Exterior
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interior" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {topics.interior.map((topic) => (
                <Button
                  key={topic}
                  onClick={() => generateBlogPost(topic, "interior")}
                  disabled={isGenerating}
                  variant="outline"
                  className="h-auto py-4 hover:border-accent hover:bg-accent/5 transition-all"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exterior" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {topics.exterior.map((topic) => (
                <Button
                  key={topic}
                  onClick={() => generateBlogPost(topic, "exterior")}
                  disabled={isGenerating}
                  variant="outline"
                  className="h-auto py-4 hover:border-accent hover:bg-accent/5 transition-all"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {isGenerating && (
          <div className="flex items-center justify-center gap-3 my-8 animate-scale-in">
            <Loader2 className="animate-spin text-accent" size={24} />
            <p className="text-lg">Generating article with AI...</p>
          </div>
        )}

        {blogPosts.length > 0 && (
          <div className="mt-12 space-y-6 max-w-4xl mx-auto">
            <h3 className="text-3xl font-semibold text-center mb-8">Generated Articles</h3>
            {blogPosts.map((post, index) => (
              <Card key={index} className="border-2 hover:border-accent transition-all animate-slide-up">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.type === "interior" ? (
                      <Palette className="text-accent" size={20} />
                    ) : (
                      <Home className="text-accent" size={20} />
                    )}
                    <span className="text-sm font-semibold text-accent uppercase">
                      {post.type} Improvement
                    </span>
                  </div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-foreground whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
