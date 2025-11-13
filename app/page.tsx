import Link from "next/link";
import { audienceSegments } from "@/lib/data/audiences";
import { testimonials } from "@/lib/data/testimonials";
import { getWhatsAppLink } from "@/lib/utils";
import { SegmentSwitcher } from "@/components/segment-switcher";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

const heroStats = [
  { label: "Horas de mentoria", value: "12k+" },
  { label: "Projetos ativos", value: "340" },
  { label: "Satisfação média", value: "4.9/5" },
];

const experienceHighlights = [
  {
    title: "Trilhas inteligentes",
    description:
      "Diagnóstico inicial que recomenda conteúdos e mentorias com base no seu momento de carreira ou pesquisa.",
  },
  {
    title: "Laboratórios imersivos",
    description:
      "Sprints práticos, desafios de impacto e comunidades mediadas para experimentar metodologias de ponta.",
  },
  {
    title: "Mentoria acessível",
    description:
      "Agendamento flexível, opções coletivas ou individuais e acompanhamento contínuo com registro de evolução.",
  },
];

export default function Home() {
  return (
    <div className="bg-[color:var(--background)]">
      <Hero />
      <SegmentSwitcher segments={audienceSegments} />
      <ExperienceHighlights />
      <TestimonialsCarousel testimonials={testimonials} />
      <SupportCTA />
    </div>
  );
}

function Hero() {
  const whatsappLink = getWhatsAppLink(
    "Olá! Quero conhecer a plataforma Consciência.",
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--surface)] via-[color:var(--surface-muted)] to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div className="flex flex-1 flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--peach)]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--charcoal)]">
            Consciência
            <span className="rounded-full bg-[color:var(--coral)] px-2 py-0.5 text-white">
              2025
            </span>
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-5xl md:text-6xl">
            Aprendizagem com impacto real, conectando ciência, mercado e
            propósito.
          </h1>
          <p className="max-w-2xl text-lg text-[color:var(--text-muted)] md:text-xl">
            Consciência é a nova plataforma de assinatura para pesquisadores,
            profissionais, estudantes e empresas que desejam construir projetos
            relevantes com mentoria e comunidade ativa.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="rounded-full bg-[color:var(--coral)] px-8 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
            >
              Ver planos e benefícios
            </Link>
            <Link
              href={whatsappLink}
              rel="noreferrer"
              className="rounded-full border border-[color:var(--border-soft)] px-8 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
            >
              Conversar no WhatsApp
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-4 py-5 shadow-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex flex-1 justify-center md:justify-end">
          <div className="relative h-[420px] w-full max-w-[420px] overflow-hidden rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface)] shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--peach)]/60 via-transparent to-[color:var(--sage)]/70" />
            <div className="relative h-full w-full p-6">
              <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-white/70 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-[color:var(--text-primary)]">
                  Agenda viva de aprendizagens
                </p>
                <ul className="space-y-3 text-sm text-[color:var(--text-muted)]">
                  <li className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3">
                    Mentoria com especialista em inovação regenerativa
                    <span className="mt-1 block text-xs font-semibold text-[color:var(--coral)]">
                      Terça • 19h às 20h
                    </span>
                  </li>
                  <li className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3">
                    Sprint de prototipagem para estudantes
                    <span className="mt-1 block text-xs font-semibold text-[color:var(--coral)]">
                      Quinta • 14h às 17h
                    </span>
                  </li>
                  <li className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3">
                    Corporate Lab • Cultura de aprendizagem contínua
                    <span className="mt-1 block text-xs font-semibold text-[color:var(--coral)]">
                      Sexta • 9h às 12h
                    </span>
                  </li>
                </ul>
                <Link
                  href="/mentores"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--surface)] px-5 py-2 text-sm font-semibold text-[color:var(--text-primary)] shadow-sm transition hover:text-[color:var(--coral)]"
                >
                  Ver agenda completa →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceHighlights() {
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-8 shadow-[var(--shadow-soft)] sm:p-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
              Experiência Consciência
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
              Uma plataforma que reconhece a sua jornada
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[color:var(--text-muted)] sm:text-lg">
              Conteúdos modernos, mentorias curadas e comunidade pulsante, tudo
              desenhado para gerar impacto contínuo. As assinaturas incluem
              diagnósticos, acompanhamento e integração com ferramentas
              corporativas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full bg-[color:var(--peach)]/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--charcoal)]">
              Mobile-first
            </div>
            <div className="rounded-full bg-[color:var(--sage)]/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--charcoal)]">
              Mentorias verificadas
            </div>
            <div className="rounded-full bg-[color:var(--peach)]/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--charcoal)]">
              Comunidade segura
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {experienceHighlights.map((highlight) => (
            <div
              key={highlight.title}
              className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface-muted)] px-6 py-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                  {highlight.description}
                </p>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[color:var(--coral)]">
                Saiba mais →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportCTA() {
  const whatsappLink = getWhatsAppLink(
    "Olá! Quero garantir minha assinatura na Consciência.",
  );

  return (
    <section className="mx-auto mt-24 mb-24 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-gradient-to-r from-[color:var(--peach)] via-[color:var(--sage)] to-[color:var(--cream)] p-8 sm:p-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr),320px] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--charcoal)]">
              Pronta para você
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--charcoal)] sm:text-4xl">
              Comece agora sua jornada com Consciência
            </h2>
            <p className="mt-4 max-w-xl text-base text-[color:var(--charcoal)]/80 sm:text-lg">
              Assine em poucos passos, receba onboarding personalizado e tenha
              apoio via WhatsApp sempre que precisar.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="rounded-full bg-[color:var(--charcoal)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
              >
                Escolher plano
              </Link>
              <Link
                href={whatsappLink}
                className="rounded-full border border-black/20 px-8 py-3 text-sm font-semibold text-[color:var(--charcoal)] transition hover:border-black/40"
              >
                Falar com especialista
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-white/40 bg-white/60 p-6 text-[color:var(--charcoal)] shadow-[var(--shadow-soft)] backdrop-blur">
            <h3 className="text-lg font-semibold">
              O que inclui o onboarding:
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--coral)] text-xs font-semibold text-white">
                  1
                </span>
                Diagnóstico inicial com especialista
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--coral)] text-xs font-semibold text-white">
                  2
                </span>
                Trilha personalizada com conteúdos recomendados
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--coral)] text-xs font-semibold text-white">
                  3
                </span>
                Acesso imediato à comunidade e mentorias
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
