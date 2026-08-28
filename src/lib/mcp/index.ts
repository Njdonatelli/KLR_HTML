import { auth, defineMcp } from "@lovable.dev/mcp-js";
import generateBlogPostTool from "./tools/generate-blog-post";
import companyInfoTool from "./tools/company-info";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "klr-build-mcp",
  title: "KLR Build MCP",
  version: "0.1.0",
  instructions:
    "Tools for KLR Build, a family-owned general B construction company. Use `get_company_info` for contact details and services, and `generate_blog_post` to draft interior or exterior home-improvement articles.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [companyInfoTool, generateBlogPostTool],
});
