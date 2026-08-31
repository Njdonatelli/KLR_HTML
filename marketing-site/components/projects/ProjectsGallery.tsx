"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/lib/content";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export function ProjectsGallery() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2.5 mb-10">
        {categories.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className={`cursor-pointer font-label text-[0.75rem] font-semibold tracking-label uppercase rounded-pill px-3.5 py-1.25 border transition-colors ${
                active
                  ? "bg-navy text-white border-navy"
                  : "bg-transparent text-navy border-border-strong hover:bg-stone-100"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.title}>
            {/* Placeholder until project photography is ready. */}
            <div
              aria-hidden="true"
              className="aspect-[4/3] rounded-md border border-dashed border-border-strong bg-stone-100 flex items-center justify-center mb-4"
            >
              <span className="font-label text-eyebrow font-semibold tracking-label uppercase text-stone-600 text-center px-6">
                Project photo
              </span>
            </div>
            <Badge tone={p.tone}>{p.tag}</Badge>
            <h2 className="font-display font-bold text-h4 text-charcoal mt-3 mb-1">{p.title}</h2>
            <p className="font-body text-body-sm text-text-secondary m-0">{p.location}, CA</p>
          </article>
        ))}
      </div>
    </div>
  );
}
