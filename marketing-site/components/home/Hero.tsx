import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="home" className="bg-navy px-6 pt-24 pb-22">
      <div className="max-w-site mx-auto grid gap-12 items-center lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-label text-eyebrow font-semibold tracking-label uppercase text-tan mb-4">
            A Family Company
          </p>
          <h1 className="font-display font-black text-h1 leading-[1.02] tracking-tight text-white m-0">
            Great spaces come to life here.
          </h1>
          <p className="font-body text-body-lg leading-relaxed text-stone-200 mt-5.5 mb-8 max-w-[480px]">
            KLR Build LLC is a family-owned company specializing in exterior and interior living
            spaces. Quality, integrity, and reliability aren&rsquo;t just words here — they&rsquo;re
            the standard.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button variant="tan" size="lg" href="#contact">
              Schedule a Visit
            </Button>
            <Button variant="secondary" size="lg" onDark href="#process">
              See Our Process
            </Button>
          </div>
        </div>
        {/* Placeholder until project photography is ready — the blueprint's open dependency. */}
        <div
          aria-hidden="true"
          className="hidden lg:flex h-[340px] rounded-lg border border-dashed border-white/30 bg-navy-light/40 items-center justify-center"
        >
          <span className="font-label text-eyebrow font-semibold tracking-label uppercase text-stone-200 text-center px-8">
            Finished patio or backyard project photo
          </span>
        </div>
      </div>
    </section>
  );
}
