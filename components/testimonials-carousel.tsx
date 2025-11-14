"use client";

import { useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/lib/data/testimonials";

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
};

export function TestimonialsCarousel({
  testimonials,
  autoPlayInterval = 7000,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);

  const orderedTestimonials = useMemo(
    () => testimonials.filter(Boolean),
    [testimonials],
  );

  useEffect(() => {
    if (orderedTestimonials.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % orderedTestimonials.length);
    }, autoPlayInterval);

    return () => {
      clearInterval(timer);
    };
  }, [orderedTestimonials.length, autoPlayInterval]);

  if (orderedTestimonials.length === 0) {
    return null;
  }

  const testimonial = orderedTestimonials[current];

  return (
    <section className="mx-auto mt-20 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
            Histórias reais
          </p>
          <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
            Comunidade Conscience em movimento
          </h2>
        </header>

        <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)]">
          <div className="grid gap-6 p-8 md:grid-cols-[minmax(0,1fr),260px]">
            <div className="flex flex-col justify-between">
              <blockquote className="text-lg leading-relaxed text-[color:var(--text-primary)] sm:text-xl">
                “{testimonial.quote}”
              </blockquote>
              <footer className="mt-6 text-sm text-[color:var(--text-muted)]">
                <p className="font-semibold text-[color:var(--text-primary)]">
                  {testimonial.name}
                </p>
                <p>{testimonial.role}</p>
                <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-[color:var(--peach)]/70 px-3 py-1 text-xs font-semibold text-[color:var(--charcoal)]">
                  {testimonial.segment}
                </p>
              </footer>
            </div>

            <aside className="relative flex items-center justify-center rounded-[var(--radius-card)] bg-[color:var(--surface-muted)] p-6">
              <div className="absolute inset-0 rounded-[var(--radius-card)] bg-gradient-to-br from-[color:var(--coral)]/10 via-transparent to-[color:var(--sage)]/20" />
              <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--peach)] text-2xl font-semibold text-[color:var(--charcoal)]">
                {testimonial.name
                  .split(" ")
                  .map((part) => part.at(0))
                  .join("")
                  .slice(0, 2)}
              </div>
            </aside>
          </div>

          <div className="flex items-center justify-between border-t border-[color:var(--border-soft)] bg-[color:var(--surface-muted)] px-6 py-3 text-xs text-[color:var(--text-muted)]">
            <span>
              Depoimento {current + 1} de {orderedTestimonials.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrent(
                    (prev) =>
                      (prev - 1 + orderedTestimonials.length) %
                      orderedTestimonials.length,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-soft)] text-sm font-semibold transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
                aria-label="Depoimento anterior"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrent(
                    (prev) => (prev + 1) % orderedTestimonials.length,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-soft)] text-sm font-semibold transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
                aria-label="Próximo depoimento"
              >
                →
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

