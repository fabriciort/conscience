"use client";

import { useState } from "react";
import Link from "next/link";
import type { AudienceSegment } from "@/lib/data/audiences";
import { getWhatsAppLink } from "@/lib/utils";

type SegmentSwitcherProps = {
  segments: AudienceSegment[];
};

export function SegmentSwitcher({ segments }: SegmentSwitcherProps) {
  const [activeId, setActiveId] = useState<AudienceSegment["id"]>(
    segments[0]?.id ?? "researcher",
  );

  const activeSegment = segments.find((segment) => segment.id === activeId);

  return (
    <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--text-muted)]">
          Segmentos Consciência
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-4xl">
          Experiências pensadas para cada jornada
        </h2>
        <p className="max-w-2xl text-base text-[color:var(--text-muted)] sm:text-lg">
          Conteúdos, mentorias e comunidades se transformam de acordo com cada
          objetivo, mantendo fluidez e acessibilidade.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <nav aria-label="Segmentos" className="flex flex-col gap-3">
          {segments.map((segment) => {
            const isActive = activeId === segment.id;
            return (
              <button
                key={segment.id}
                type="button"
                onClick={() => setActiveId(segment.id)}
                className={`flex w-full flex-col rounded-[var(--radius-card)] border px-5 py-4 text-left transition hover:border-[color:var(--coral)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)] ${
                  isActive
                    ? "border-[color:var(--coral)] bg-[color:var(--surface)] shadow-[var(--shadow-soft)]"
                    : "border-[color:var(--border-soft)] bg-[color:var(--surface-muted)]/60"
                }`}
                aria-pressed={isActive}
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
                  {segment.title}
                </span>
                <span className="mt-2 text-sm font-medium text-[color:var(--text-primary)]">
                  {segment.description}
                </span>
                <span
                  className={`mt-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    isActive
                      ? "bg-[color:var(--coral)] text-white"
                      : "bg-[color:var(--surface)] text-[color:var(--text-muted)]"
                  }`}
                >
                  Explorar trilha
                </span>
              </button>
            );
          })}
        </nav>

        {activeSegment && (
          <article className="grid gap-6 rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 md:grid-cols-[minmax(0,1fr),320px]">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">
                {activeSegment.title}
              </h3>
              <ul className="grid gap-3 text-sm text-[color:var(--text-muted)]">
                {activeSegment.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 rounded-2xl bg-[color:var(--surface-muted)]/80 px-4 py-3"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--sage)] text-xs font-semibold text-[color:var(--charcoal)]"
                    >
                      ✓
                    </span>
                    <span className="text-[15px] leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/mentores?segment=${activeSegment.id}`}
                  className="rounded-full bg-[color:var(--coral)] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
                >
                  Conhecer mentores
                </Link>
                <Link
                  href={getWhatsAppLink(activeSegment.whatsappMessage)}
                  className="rounded-full border border-[color:var(--border-soft)] px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)]"
                >
                  Falar no WhatsApp
                </Link>
              </div>
            </div>

            <aside className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-[color:var(--surface-muted)] p-5">
              <div className="aspect-video w-full rounded-[var(--radius-card)] bg-gradient-to-br from-[color:var(--peach)] via-[color:var(--sage)] to-[color:var(--cream)] p-4 text-[color:var(--charcoal)] shadow-[var(--shadow-soft)]">
                <div className="flex h-full w-full flex-col justify-between rounded-[var(--radius-card)] border border-white/40 bg-white/60 p-4 backdrop-blur">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase text-[color:var(--charcoal)]">
                      Preview vídeo
                    </span>
                    <h4 className="mt-3 text-lg font-semibold">
                      {activeSegment.video.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-[color:var(--charcoal)]">
                    <span>Duração {activeSegment.video.duration}</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--coral)] text-white">
                      ►
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
                  Mentores em destaque
                </span>
                <ul className="mt-3 space-y-3">
                  {activeSegment.sampleMentors.map((mentor) => (
                    <li
                      key={mentor.name}
                      className="flex items-center gap-3 rounded-2xl bg-[color:var(--peach)]/60 px-3 py-2 text-sm"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--peach)] font-semibold text-[color:var(--charcoal)]">
                        {mentor.name
                          .split(" ")
                          .map((part) => part.at(0))
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-semibold text-[color:var(--text-primary)]">
                          {mentor.name}
                        </p>
                        <p className="text-xs text-[color:var(--text-muted)]">
                          {mentor.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </article>
        )}
      </div>
    </section>
  );
}

