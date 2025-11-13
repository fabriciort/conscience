"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Mentor } from "@/lib/data/mentors";
import { getWhatsAppLink } from "@/lib/utils";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao carregar mentores");
  }
  return (await response.json()) as { mentors: Mentor[] };
};

const segmentOptions = [
  { value: "", label: "Todos os segmentos" },
  { value: "researcher", label: "Pesquisadores" },
  { value: "professional", label: "Profissionais" },
  { value: "student", label: "Estudantes" },
  { value: "company", label: "Empresas" },
];

export function MentorDirectory() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [segment, setSegment] = useState(() => searchParams.get("segment") ?? "");

  const { data, error, isLoading } = useSWR(
    `/api/mentores?q=${encodeURIComponent(search)}&segment=${segment}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const mentors = useMemo(() => data?.mentors ?? [], [data]);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    mentors.forEach((mentor) => mentor.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [mentors]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
            Rede de mentores
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
            Especialistas que caminham com você
          </h1>
          <p className="mt-2 max-w-2xl text-base text-[color:var(--text-muted)] sm:text-lg">
            Conecte-se com profissionais reconhecidos em pesquisa aplicada,
            inovação, educação e cultura organizacional.
          </p>
        </div>

        <Link
          href={getWhatsAppLink("Olá! Quero apoio para escolher mentores.")}
          className="rounded-full border border-[color:var(--border-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)]"
        >
          Falar com curadoria
        </Link>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-[1fr,240px]">
        <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-4 py-4 sm:px-6">
          <label className="flex-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
              Buscar por nome ou área
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex: inovação, dados climáticos..."
              className="focus-ring mt-1 w-full rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none"
            />
          </label>

          <label className="text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
              Segmento
            </span>
            <select
              value={segment}
              onChange={(event) => setSegment(event.target.value)}
              className="focus-ring mt-1 w-full rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
            >
              {segmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-4 py-4 sm:px-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
            Temas em alta
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[color:var(--text-muted)]">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearch(tag)}
                className="focus-ring rounded-full bg-[color:var(--surface-muted)] px-3 py-2 transition hover:text-[color:var(--coral)]"
              >
                #{tag}
              </button>
            ))}
            {uniqueTags.length === 0 && (
              <span className="text-[color:var(--text-muted)]">carregando…</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {isLoading && (
          <div className="col-span-full rounded-[var(--radius-card)] border border-dashed border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 text-sm text-[color:var(--text-muted)]">
            Carregando mentores...
          </div>
        )}

        {error && (
          <div className="col-span-full rounded-[var(--radius-card)] border border-[color:var(--coral)] bg-[color:var(--peach)]/60 p-6 text-sm text-[color:var(--charcoal)]">
            Não foi possível carregar a lista de mentores. Tente novamente em
            instantes.
          </div>
        )}

        {!isLoading && !error && mentors.length === 0 && (
          <div className="col-span-full rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 text-sm text-[color:var(--text-muted)]">
            Nenhum mentor encontrado para sua busca. Ajuste os filtros ou fale
            com a curadoria.
          </div>
        )}

        {mentors.map((mentor) => (
          <article
            key={mentor.id}
            className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[color:var(--peach)] text-lg font-semibold text-[color:var(--charcoal)]">
                {mentor.name
                  .split(" ")
                  .map((part) => part.at(0))
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1">
                <Link
                  href={`/mentores/${mentor.slug}`}
                  className="text-lg font-semibold text-[color:var(--text-primary)] hover:text-[color:var(--coral)]"
                >
                  {mentor.name}
                </Link>
                <p className="text-sm text-[color:var(--text-muted)]">
                  {mentor.title}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-[color:var(--text-muted)]">
                  {mentor.segmentFocus.map((segmentFocus) => (
                    <span
                      key={segmentFocus}
                      className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 uppercase"
                    >
                      {segmentFocus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-[color:var(--text-muted)]">{mentor.bio}</p>

            <ul className="grid gap-2 text-xs text-[color:var(--text-muted)] md:grid-cols-2">
              <li>
                <span className="font-semibold text-[color:var(--text-primary)]">
                  Expertise:
                </span>{" "}
                {mentor.expertise.join(", ")}
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text-primary)]">
                  Idiomas:
                </span>{" "}
                {mentor.languages.join(", ")}
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text-primary)]">
                  Sessões:
                </span>{" "}
                {mentor.sessionsDelivered}
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text-primary)]">
                  Avaliação:
                </span>{" "}
                {mentor.rating.toFixed(2)}
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/mentores/${mentor.slug}`}
                className="rounded-full bg-[color:var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Ver perfil completo
              </Link>
              <Link
                href={getWhatsAppLink(mentor.whatsappMessage)}
                className="rounded-full border border-[color:var(--border-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)]"
              >
                Agendar pelo WhatsApp
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

