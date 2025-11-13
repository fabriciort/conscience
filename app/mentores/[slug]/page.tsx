import { notFound } from "next/navigation";
import Link from "next/link";
import { mentorsDirectory } from "@/lib/data/mentors";
import { getWhatsAppLink } from "@/lib/utils";

type MentorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: MentorPageProps) {
  const { slug } = params;
  const mentor = mentorsDirectory.find((item) => item.slug === slug);

  if (!mentor) {
    return {
      title: "Mentor não encontrado",
    };
  }

  return {
    title: `${mentor.name} • Mentor Consciência`,
    description: mentor.bio,
  };
}

export default async function MentorProfile({ params }: MentorPageProps) {
  const { slug } = params;
  const mentor = mentorsDirectory.find((item) => item.slug === slug);

  if (!mentor) {
    notFound();
  }

  const whatsappLink = getWhatsAppLink(mentor.whatsappMessage);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <Link
        href="/mentores"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--coral)]"
      >
        ← Voltar para mentores
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-[320px,1fr]">
        <aside className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 text-[color:var(--text-primary)] shadow-[var(--shadow-soft)]">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-[32px] bg-[color:var(--peach)] text-2xl font-semibold text-[color:var(--charcoal)]">
              {mentor.name
                .split(" ")
                .map((part) => part.at(0))
                .join("")
                .slice(0, 2)}
            </div>
            <h1 className="mt-4 text-2xl font-semibold">{mentor.name}</h1>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              {mentor.title}
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-[color:var(--text-muted)]">
            <p>
              <strong className="text-[color:var(--text-primary)]">
                Idiomas:
              </strong>{" "}
              {mentor.languages.join(", ")}
            </p>
            <p>
              <strong className="text-[color:var(--text-primary)]">
                Sessões realizadas:
              </strong>{" "}
              {mentor.sessionsDelivered}
            </p>
            <p>
              <strong className="text-[color:var(--text-primary)]">
                Avaliação média:
              </strong>{" "}
              {mentor.rating.toFixed(2)}
            </p>
            <p>
              <strong className="text-[color:var(--text-primary)]">
                Tempo de resposta:
              </strong>{" "}
              {mentor.responseTime}
            </p>
            <p>
              <strong className="text-[color:var(--text-primary)]">
                Disponibilidade:
              </strong>{" "}
              {mentor.availability.days.join(", ")} • Timezones{" "}
              {mentor.availability.timezones.join(", ")}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={whatsappLink}
              className="rounded-full bg-[color:var(--coral)] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Agendar mentoria
            </Link>
            <Link
              href={getWhatsAppLink(
                `Olá! Quero mais detalhes sobre ${mentor.name} na Consciência.`,
              )}
              className="rounded-full border border-[color:var(--border-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)]"
            >
              Falar com curadoria
            </Link>
          </div>
        </aside>

        <main className="space-y-8">
          <section className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
              Sobre
            </h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">
              {mentor.bio}
            </p>
          </section>

          <section className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
              Temas de mentoria
            </h2>
            <ul className="mt-3 grid gap-2 text-sm text-[color:var(--text-muted)] sm:grid-cols-2">
              {mentor.expertise.map((topic) => (
                <li
                  key={topic}
                  className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
              Segmentos atendidos
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase text-[color:var(--text-muted)]">
              {mentor.segmentFocus.map((segmentFocus) => (
                <span
                  key={segmentFocus}
                  className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2"
                >
                  {segmentFocus}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

