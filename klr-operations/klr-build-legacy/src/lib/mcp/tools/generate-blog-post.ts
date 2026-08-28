import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "generate_blog_post",
  title: "Generate a home improvement blog post",
  description:
    "Generate a KLR Build blog article about an interior or exterior home improvement topic using Lovable AI. Returns a ~300-400 word article with practical tips, cost guidance, and actionable advice.",
  inputSchema: {
    topic: z.string().describe("The blog post topic, e.g. 'Modern Kitchen Renovation Ideas'."),
    type: z.enum(["interior", "exterior"]).describe("Whether the topic is interior or exterior home improvement."),
  },
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: true },
  handler: async ({ topic, type }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { content: [{ type: "text", text: "LOVABLE_API_KEY is not configured on the server." }], isError: true };
    }

    const systemPrompt =
      "You are an expert home improvement writer for KLR Build, a family-owned general B construction company in Oceanside, CA. Write engaging, practical blog posts that provide real value to homeowners. Include specific tips, cost estimates, and actionable advice. Keep the tone professional yet conversational.";

    const userPrompt =
      type === "interior"
        ? `Write a comprehensive blog post about ${topic} for interior home improvement. Include practical tips, design ideas, and budget considerations. Make it around 300-400 words.`
        : `Write a comprehensive blog post about ${topic} for exterior home improvement. Include practical tips, materials recommendations, and maintenance advice. Make it around 300-400 words.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        content: [{ type: "text", text: `AI gateway error (${response.status}): ${text}` }],
        isError: true,
      };
    }

    const data = await response.json();
    const content: string = data.choices?.[0]?.message?.content ?? "";
    return {
      content: [{ type: "text", text: `# ${topic}\n\n${content}` }],
      structuredContent: { title: topic, type, article: content },
    };
  },
});
