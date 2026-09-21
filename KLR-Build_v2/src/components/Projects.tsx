import type { CSSProperties } from "react";
import { SectionHeading, Button } from "@/design-system/klr-build-design-system-40bc4c";
import { site } from "@/config/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import beforeJpg from "@/assets/projects/front-yard-before.jpg";
import before600 from "@/assets/projects/front-yard-before-600.webp";
import before792 from "@/assets/projects/front-yard-before-792.webp";

import afterJpg from "@/assets/projects/front-yard-after.jpg";
import after600 from "@/assets/projects/front-yard-after-600.webp";
import after900 from "@/assets/projects/front-yard-after-900.webp";
import after1400 from "@/assets/projects/front-yard-after-1400.webp";

import loungeJpg from "@/assets/projects/covered-patio-lounge.jpg";
import lounge600 from "@/assets/projects/covered-patio-lounge-600.webp";
import lounge900 from "@/assets/projects/covered-patio-lounge-900.webp";
import lounge1400 from "@/assets/projects/covered-patio-lounge-1400.webp";

import barJpg from "@/assets/projects/covered-patio-bar.jpg";
import bar600 from "@/assets/projects/covered-patio-bar-600.webp";
import bar900 from "@/assets/projects/covered-patio-bar-900.webp";
import bar1400 from "@/assets/projects/covered-patio-bar-1400.webp";

import walkwayJpg from "@/assets/projects/front-walkway.jpg";
import walkway700 from "@/assets/projects/front-walkway-700.webp";
import walkway1000 from "@/assets/projects/front-walkway-1000.webp";

import gradingJpg from "@/assets/projects/site-grading.jpg";
import grading600 from "@/assets/projects/site-grading-600.webp";
import grading820 from "@/assets/projects/site-grading-820.webp";

/**
 * Real project photography, pulled from KLR's own presentation deck.
 *
 * Captions describe only what is visible in each frame. No project names,
 * square footages, locations, budgets, or schedule claims appear here —
 * none of that has been supplied, and the previous version of this page
 * invented all of it.
 */

interface Shot {
  jpg: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const gallery: Shot[] = [
  {
    jpg: loungeJpg,
    srcSet: `${lounge600} 600w, ${lounge900} 900w, ${lounge1400} 1400w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1400,
    height: 1050,
    alt: "Covered patio with a wood-slat ceiling, recessed lighting, ceiling fan, mounted television, built-in bench seating and an oval dining table, opening onto a level lawn",
    caption:
      "Covered patio and outdoor living room — porcelain paving, built-in seating, and a level lawn running to the fence line.",
  },
  {
    jpg: barJpg,
    srcSet: `${bar600} 600w, ${bar900} 900w, ${bar1400} 1400w`,
    sizes: "(min-width: 1024px) 50vw, 100vw",
    width: 1400,
    height: 1050,
    alt: "The same covered patio from the opposite side, showing a counter-height bar with stools against the house, sliding glass doors, and a pendant light over the dining table",
    caption:
      "The other side of the same patio — a counter-height bar built into the wall, set against full-height sliders.",
  },
  {
    jpg: walkwayJpg,
    srcSet: `${walkway700} 700w, ${walkway1000} 1000w`,
    sizes: "(min-width: 1024px) 33vw, 100vw",
    width: 1000,
    height: 1333,
    alt: "Front entry walkway of poured concrete pads separated by gravel joints, bordered by river rock, ornamental grasses and low-voltage path lights",
    caption:
      "Front entry — concrete pads on gravel joints, river-rock borders, ornamental grasses, and path lighting.",
  },
  {
    jpg: gradingJpg,
    srcSet: `${grading600} 600w, ${grading820} 820w`,
    sizes: "(min-width: 1024px) 33vw, 100vw",
    width: 820,
    height: 615,
    alt: "A track loader and mini excavator working a graded dirt yard behind a new wood fence, with spoil piles and fresh track marks",
    caption:
      "Grading and drainage, before anything decorative goes in. This stage decides whether the finished work lasts.",
  },
];

const Projects = () => {
  const beforeAfterRef = useScrollReveal({ variant: "fade-up" });
  const gridRef = useScrollReveal<HTMLDivElement>({
    variant: "fade-up",
    staggerChildren: "[data-reveal-card]",
    staggerDelay: 0.1,
  });
  const ctaRef = useScrollReveal({ variant: "fade-up" });

  const captionStyle: CSSProperties = {
    margin: 0,
    padding: "var(--space-5) var(--space-6)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--leading-relaxed)",
    color: "var(--text-secondary)",
  };

  const cardStyle: CSSProperties = {
    background: "var(--surface-card)",
    border: "var(--border-width) solid var(--border-subtle)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
  };

  const labelStyle: CSSProperties = {
    margin: "0 0 var(--space-3)",
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-eyebrow)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    color: "var(--text-accent)",
  };

  return (
    <section
      id="projects"
      className="py-24"
      style={{ background: "var(--surface-inverse)" }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent builds"
          intro="KLR runs the whole job through one team — design, HOA submission, construction, planting, and the final walkthrough."
          onDark
          style={{ marginBottom: "var(--space-12)", maxWidth: 620 }}
        />

        {/* Before / after — same address, same camera position. */}
        <figure ref={beforeAfterRef} className="m-0 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={cardStyle}>
              <p style={{ ...labelStyle, padding: "var(--space-4) var(--space-6) 0" }}>Before</p>
              <picture>
                <source type="image/webp" srcSet={`${before600} 600w, ${before792} 792w`} sizes="(min-width: 768px) 50vw, 100vw" />
                <img
                  src={beforeJpg}
                  width={792}
                  height={746}
                  loading="lazy"
                  decoding="async"
                  alt="A newly built two-storey house with a bare dirt front yard, no planting, and an empty concrete driveway"
                  className="w-full h-auto"
                />
              </picture>
            </div>

            <div style={cardStyle}>
              <p style={{ ...labelStyle, padding: "var(--space-4) var(--space-6) 0" }}>After</p>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${after600} 600w, ${after900} 900w, ${after1400} 1400w`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <img
                  src={afterJpg}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  alt="The same house at dusk with a finished front yard: paver steps and landing, a block seat wall, planted beds, gravel mulch and low-voltage path lighting"
                  className="w-full h-auto"
                />
              </picture>
            </div>
          </div>
          <figcaption style={{ ...captionStyle, paddingLeft: 0, paddingRight: 0, color: "var(--stone-300)" }}>
            Same house, same camera position. Paver steps and landing, a block seat wall to hold the
            grade, planting beds, gravel mulch, and path lighting on a timer.
          </figcaption>
        </figure>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((shot) => (
            <figure key={shot.alt} data-reveal-card className="m-0" style={cardStyle}>
              <picture>
                <source type="image/webp" srcSet={shot.srcSet} sizes={shot.sizes} />
                <img
                  src={shot.jpg}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  alt={shot.alt}
                  className="w-full h-auto"
                />
              </picture>
              <figcaption style={captionStyle}>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="mt-16 flex flex-col gap-6 items-start"
          style={{
            maxWidth: 760,
            padding: "var(--space-8)",
            background: "var(--surface-card)",
            border: "var(--border-width) solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h4)",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Want to walk one of these?
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--text-secondary)",
            }}
          >
            Call and we'll give you addresses of finished jobs nearby, plus clients who have agreed
            to talk about theirs. Seeing the work in person tells you more than any photograph.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href={`tel:${site.phone.e164}`}>Call {site.phone.display}</Button>
            <Button href="/#contact" variant="secondary">
              Request a walkthrough
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
