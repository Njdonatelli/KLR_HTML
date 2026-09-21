/**
 * Journal articles.
 *
 * Static, hand-written, and versioned with the site. This replaced an
 * on-demand AI generator that spent API credits on every anonymous visitor
 * and produced nothing a crawler could ever index.
 *
 * No dollar figures appear here on purpose — pricing is a conversation with
 * the homeowner, not a number on a marketing page.
 */

export interface Article {
  slug: string;
  title: string;
  /** Used for the card blurb and the meta description. */
  summary: string;
  category: "hardscape" | "planting" | "lighting" | "process";
  /** ISO date. Drives sort order and the sitemap's lastmod. */
  published: string;
  readingMinutes: number;
  body: string[];
}

export const CATEGORY_LABELS: Record<Article["category"], string> = {
  hardscape: "Hardscape",
  planting: "Planting",
  lighting: "Lighting",
  process: "Process",
};

export const articles: Article[] = [
  {
    slug: "drought-tolerant-planting-north-san-diego",
    title: "Drought-tolerant planting that still looks like a garden",
    summary:
      "Low-water landscaping in North County does not have to mean gravel and three agaves. Here is how we structure a planting plan that survives a dry September and still reads as lush.",
    category: "planting",
    published: "2026-07-14",
    readingMinutes: 4,
    body: [
      "The most common thing we hear on a first walkthrough is some version of: I want to cut the water bill, but I do not want the yard to look like a parking lot. Fair. A lot of drought-tolerant work in North County went hard in one direction — decomposed granite, a few agaves, done — and homeowners have been looking at the result for a decade.",
      "The fix is structure, not species. A planting plan that holds up through a dry September needs three layers working together, and most of the failed low-water yards we get called to rescue are missing two of them.",
      "Start with the anchors. These are the plants that carry the yard visually when nothing is blooming — westringia, rhus, arbutus, a mature olive if the space can hold one. They do the job a hedge or a lawn edge used to do. Get these placed first and the rest of the plan has something to sit against.",
      "Then the middle layer, which is where most of the color lives. Salvias, buckwheat, penstemon, kangaroo paw. These are the plants that make people stop and say the yard looks full. They are also the ones that die first when the irrigation is wrong, which is why we do not treat irrigation as an afterthought bolted on at the end.",
      "Last, groundcover — and this is the layer people skip to save money. Bare soil bakes, sheds water, and grows weeds. Covering it with a living layer or a proper mulch depth is the difference between a plan that gets easier every year and one that gets harder.",
      "A note on soil. Most of the lots we work on in Oceanside and Vista have clay somewhere in the profile, and clay plus a drip emitter running on a lawn schedule is how you drown a plant that is advertised as drought tolerant. Native and Mediterranean plants generally want deep, infrequent water — not a little every day. When we set the controller, we set it for that, and we tell the homeowner what to expect in the first summer versus the third.",
      "The honest timeline: a low-water yard looks sparse for the first season. That is not a mistake in the plan, it is what right-sized plant spacing looks like before the plants fill in. Anyone who makes it look finished on day one has planted it too tight, and you will be paying someone to thin it in three years.",
      "If you are weighing this against keeping the lawn, walk the yard and note which parts of it anyone actually stands on. The answer is usually smaller than the lawn. Keep that part, and put the plan everywhere else.",
    ],
  },
  {
    slug: "pavers-vs-stamped-concrete-patio",
    title: "Pavers or stamped concrete: how we actually decide",
    summary:
      "Both make a good patio. They fail differently, they age differently, and they repair very differently — which is what should drive the choice.",
    category: "hardscape",
    published: "2026-06-02",
    readingMinutes: 4,
    body: [
      "This is the decision that stalls more backyard projects than any other, usually because the comparison gets framed as which one is better. Neither is. They are two different systems, and the right one depends on your soil, your access, and how you feel about maintenance.",
      "Stamped concrete is a monolithic slab. It goes down fast, it gives you a continuous surface with no joints to weed, and a good crew can match a stone or plank pattern closely enough that most people cannot tell from standing height. It is also the option that gives you the cleanest look under a pergola or against a modern house.",
      "The catch is that a slab is one piece. When it cracks — and control joints manage where, not whether — you are patching a colored, textured surface, and a patch never disappears. Colored concrete also fades unevenly with sun exposure, so the section under the eave and the section in full afternoon sun will drift apart over the years. Resealing slows that down. It does not stop it.",
      "Pavers are the opposite trade. They sit on a compacted base with sand joints, which means the surface flexes instead of cracking when the ground moves. On a lot with expansive clay or a slope that is still settling, that flexibility is worth a lot. And when a section does move, or a tree root lifts a corner, you pull the affected pavers, fix the base, and put the same pavers back. The repair is genuinely invisible.",
      "The maintenance is real though. Joints need sand topped up, and depending on the joint material you will deal with some weeds or ants. Polymeric sand cuts that down substantially and is what we spec by default, but it is not zero.",
      "Where we push hard one way or the other: on a pool deck, pavers, almost always — the surface stays cooler underfoot, and the ability to lift a section to reach a line you did not know was there has saved more than one client a demolition. On a narrow side yard with terrible access, stamped concrete, because pumping a slab is easier than wheelbarrowing base rock forty times.",
      "The thing nobody mentions in the sales pitch for either: the base is the project. Whichever surface goes on top, what determines whether the patio is flat in ten years is how well the sub-base was compacted and how the water gets away from the house. If a bid is meaningfully cheaper than the others, that is where the money came out. Ask what the base section is and how it drains, and compare the answers rather than the totals.",
    ],
  },
  {
    slug: "outdoor-lighting-people-actually-use",
    title: "Outdoor lighting people actually turn on",
    summary:
      "Most landscape lighting gets installed, admired for a month, and then quietly ignored. The difference is almost always where the light is pointed and how it is switched.",
    category: "lighting",
    published: "2026-05-19",
    readingMinutes: 3,
    body: [
      "We have walked plenty of yards with a lighting system in the ground that the homeowner has stopped using. The fixtures work. The transformer hums along. Nobody flips it on. That is a design failure, not an equipment failure, and it comes down to three things.",
      "First, glare. If you can see the bulb from where you sit, the system is working against you. Your eye adapts to the brightest thing in view, and everything past it goes black — so a yard with visible fixtures actually feels smaller at night than one with fewer, better-aimed lights. Every fixture should be shielded, aimed away from seating, or hidden behind planting. When we commission a system we sit in every chair on the patio and look around before we call it done.",
      "Second, uplighting everything. A row of identical uplights along the house reads as a car dealership. Light is more interesting when it has a job: grazing a stone wall to show the texture, washing a specimen tree from two sides so it has depth, marking a step so nobody guesses at it. Pick the four or five things in the yard worth looking at after dark and light those. Leave the rest dark on purpose — the contrast is the whole effect.",
      "Third, and this is the one that decides whether the system gets used: switching. If turning on the yard means walking to a transformer in the side yard, it will not happen. Zones on an astronomic timer that follows sunset, plus a control the homeowner can reach from the couch, turns lighting from an event into something that is just on when they walk outside.",
      "On hardware, low-voltage is the default for good reasons — safe to work near planting, easy to extend later, and the fixtures are serviceable. Warm color temperature, in the 2700K range. Anything cooler makes planting look grey and skin look worse, and it is the fastest way to make a warm backyard feel like a loading dock.",
      "One practical note: run more wire than the plan needs and leave loops at the ends of runs. Yards change. A tree you light from two sides today will want three in five years, and pulling new wire through a finished planting bed is a bad afternoon.",
    ],
  },
  {
    slug: "hoa-approval-backyard-remodel",
    title: "Getting an HOA to say yes the first time",
    summary:
      "An HOA rejection usually costs weeks, not money. Most of them are avoidable, and the avoidable ones fail for the same handful of reasons.",
    category: "process",
    published: "2026-04-08",
    readingMinutes: 3,
    body: [
      "A lot of North County lots sit inside an HOA, and the architectural submission is the step homeowners most often want to handle themselves to save time. It usually costs time instead. Committees meet on a fixed schedule, so a package that gets kicked back for a missing drawing does not lose a day — it loses a cycle.",
      "The rejections we see fall into a short list. No dimensioned site plan, so the committee cannot verify setbacks. Material and color specified in words rather than samples or spec sheets. Nothing showing where water goes, which is the question every committee asks about hardscape. Structure heights left off entirely, which is fatal for a pergola or a four-season room. And missing contractor license and insurance documentation, which is a paperwork issue that stops a technically perfect design cold.",
      "So we assemble the package the way the committee reads it: a scaled site plan with setbacks called out, elevations for anything vertical, renderings that show the finished condition from the neighbors' sight lines, actual material and color specs rather than descriptions, a drainage plan, and the license and insurance paperwork current as of the submission date.",
      "The renderings do more work than people expect. A committee reviewing a written description has to imagine the result, and committees that have to imagine tend to say no. Showing them the thing removes the guessing.",
      "Two pieces of practical advice. Read your own CC&Rs before the design is finalized, not after — height limits, permitted materials, and equipment screening requirements are usually spelled out, and it is far cheaper to design inside them than to redesign around a rejection. And find out when the committee actually meets. Submitting three days after a meeting can mean sitting on a finished design for a month.",
      "Worth being clear about scope: HOA approval and a city permit are separate things, and one does not substitute for the other. A structure or a wall over a certain height generally needs a building permit from the city regardless of what your HOA said, and the requirements differ between jurisdictions in the county. We sort out which approvals a specific project needs during design, before anything is ordered.",
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const articlesNewestFirst = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);
