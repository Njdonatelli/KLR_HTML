import { defineTool } from "@lovable.dev/mcp-js";

const INFO = {
  name: "KLR Build",
  description: "Family-owned general B construction company serving Southern California.",
  address: "697 Chimney Rock Drive, Oceanside, CA 92058",
  phone: "(619) 739-1135",
  website: "https://www.klrbuild.com",
  services: [
    "Interior remodels (kitchens, bathrooms, living spaces)",
    "Exterior improvements (decks, siding, curb appeal)",
    "Home additions",
    "New construction",
    "Custom carpentry & finishes",
  ],
};

export default defineTool({
  name: "get_company_info",
  title: "Get KLR Build company info",
  description: "Return contact information and a summary of services offered by KLR Build.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO, null, 2) }],
    structuredContent: INFO,
  }),
});
