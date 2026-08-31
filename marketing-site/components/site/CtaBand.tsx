import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="bg-charcoal px-6 py-16 text-center">
      <div className="max-w-[720px] mx-auto">
        <p className="font-label text-eyebrow font-semibold tracking-label uppercase text-tan mb-2.5">
          Choose Local
        </p>
        <h2 className="font-display font-extrabold text-h3 text-white m-0 mb-7">
          Ready to see what your yard can be?
        </h2>
        <Button variant="tan" size="lg" href="/contact">
          Schedule a Visit
        </Button>
      </div>
    </section>
  );
}
