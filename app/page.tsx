import Link from "next/link";
import { HeaderDynamic } from "@/components/layout/HeaderDynamic";
import { Footer } from "@/components/layout/Footer";

type Story = {
  title: string;
  description?: string;
  author: string;
  readTime: string;
  category: string;
  date?: string;
  link: string;
  tags?: string[];
};

type EditorialSection = {
  id: string;
  name: string;
  description: string;
  highlight: Story & { accent?: string };
  items: Story[];
};

const heroStats = [
  { label: "Assinantes ativos", value: "38k" },
  { label: "Mentorias publicadas", value: "940+" },
  { label: "Experts globais", value: "120" },
];

const categoryFilters = [
  "Design",
  "Learn",
  "News",
  "Experts",
  "Operações",
  "IA",
  "No-Code",
  "Custom Apps",
];

const featuredStory = {
  title: "Como escolher o melhor builder de apps com IA para seu negócio",
  description:
    "Framework definitivo para comparar plataformas, medir ROI e lançar produtos de dados em semanas, não meses.",
  author: "Nina Costa",
  readTime: "8 min",
  category: "Guia estratégico",
  date: "14 Nov 2025",
  link: "/platform/feed",
  tools: ["Bubble", "Glide", "Notion", "Zapier"],
};

const trendingStories: Story[] = [
  {
    title: "Playbook para levar observabilidade a times não técnicos",
    author: "Ricardo Mello",
    readTime: "6 min",
    category: "Operações",
    link: "/platform/feed?feature=observability",
  },
  {
    title: "O que muda em UX com IA copilota nos bastidores",
    author: "Helena Duarte",
    readTime: "5 min",
    category: "Design Systems",
    link: "/platform/feed?feature=ux-ai",
  },
  {
    title: "Inside Conscience: como medimos adoção de comunidades",
    author: "Equipe Research Ops",
    readTime: "7 min",
    category: "Inside data",
    link: "/platform/feed?feature=community",
  },
];

const editorialSections: EditorialSection[] = [
  {
    id: "inspiration",
    name: "Inspiration",
    description: "Explorando como empresas usam low-code para lançar experiências em tempo recorde.",
    highlight: {
      title: "Por que toda equipe de produto precisa de um laboratório narrativo",
      description:
        "Estudo completo de como uma healthtech transformou dados dispersos em storytelling acionável com squads híbridos.",
      author: "Moema Vidal",
      readTime: "10 min",
      category: "Case real",
      date: "Edição #42",
      link: "/platform/read/lab-narrativas",
      tags: ["Story", "Labs", "Produto"],
    },
    items: [
      {
        title: "Como a GenteLab criou editoriais semanais com Glide e IA",
        author: "Equipe Editorial",
        readTime: "4 min",
        category: "Inside build",
        link: "/platform/read/editoriais",
      },
      {
        title: "Os 3 rituais que mantêm comunidades B2B engajadas",
        author: "Ana Bezerra",
        readTime: "6 min",
        category: "Community",
        link: "/platform/read/rituais",
      },
      {
        title: "Checklist visual para aprovar novos pilotos de IA generativa",
        author: "Gabriel Prado",
        readTime: "5 min",
        category: "Playbook",
        link: "/platform/read/checklist-ia",
      },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    description: "Profundidade técnica em ferramentas, integrações e governança de dados.",
    highlight: {
      title: "O novo stack No-Code + AI para 2026",
      description:
        "Mapeamos patterns de autenticação, backups e limites de escala para cada plataforma de destaque.",
      author: "Time Platform",
      readTime: "12 min",
      category: "Radar",
      link: "/platform/read/radar-2026",
      tags: ["Stack", "Infra", "Playbook"],
    },
    items: [
      {
        title: "Como criar um data lake leve só com ferramentas visuais",
        author: "Rafael Kal",
        readTime: "7 min",
        category: "Infraestrutura",
        link: "/platform/read/data-lake",
      },
      {
        title: "Blueprint para times que querem migrar de planilhas para apps",
        author: "Bruna Costa",
        readTime: "5 min",
        category: "Blueprint",
        link: "/platform/read/blueprint-planilhas",
      },
      {
        title: "Erros que travam integrações com APIs em apps low-code",
        author: "Time DevRel",
        readTime: "6 min",
        category: "DevRel",
        link: "/platform/read/erros-api",
      },
    ],
  },
  {
    id: "experts",
    name: "Experts",
    description: "Conversas com quem desenha pesquisas, produtos e operações de impacto.",
    highlight: {
      title: "Jessica Vergara explica como construiu uma cultura low-code",
      description:
        "Da validação com squads mistos ao comitê de governança: aprendizados de uma chief research officer.",
      author: "Magazine Conscience",
      readTime: "9 min",
      category: "Entrevista",
      link: "/platform/read/entrevista-jessica",
      tags: ["Pessoas", "Governança"],
    },
    items: [
      {
        title: "Por que startups estão contratando conselheiros de dados",
        author: "Daniel Prado",
        readTime: "4 min",
        category: "Carreira",
        link: "/platform/read/conselheiros",
      },
      {
        title: "Os bastidores do multi-hub da One Platform",
        author: "Equipe Stories",
        readTime: "6 min",
        category: "Histórias",
        link: "/platform/read/multihub",
      },
      {
        title: "Como a Cleanby escalou uma agência solo para 7 dígitos",
        author: "Rogério Tanaka",
        readTime: "5 min",
        category: "Business",
        link: "/platform/read/cleanby",
      },
    ],
  },
  {
    id: "learn",
    name: "Learn",
    description: "Tutoriais guiados para montar apps, dashboards e experiências de pesquisa aplicada.",
    highlight: {
      title: "Construindo um dashboard sem código para o seu time híbrido",
      description:
        "Guia passo a passo com componentes reutilizáveis, métricas essenciais e integrações com Notion.",
      author: "Clara Salles",
      readTime: "11 min",
      category: "Tutorial",
      link: "/platform/read/dashboard",
      tags: ["Dashboards", "Tutorial"],
    },
    items: [
      {
        title: "Templates para kickoff de clientes em 3 etapas",
        author: "Studio Ops",
        readTime: "4 min",
        category: "Templates",
        link: "/platform/read/kickoff",
      },
      {
        title: "Como combinar Glide + Make para automatizar onboarding",
        author: "Lucas Hora",
        readTime: "6 min",
        category: "Automação",
        link: "/platform/read/onboarding",
      },
      {
        title: "Checklist visual para revisar acessibilidade em apps no-code",
        author: "Flávia Monteiro",
        readTime: "5 min",
        category: "Acessibilidade",
        link: "/platform/read/acessibilidade",
      },
    ],
  },
];

const miniSections = [
  {
    id: "operations",
    title: "Operations",
    description: "Playbooks para equipes que navegam lançamentos semanais e rituais compartilhados.",
    items: [
      {
        title: "Crie um sistema de gestão do conhecimento com base viva",
        author: "Helio Duarte",
        readTime: "5 min",
        category: "Knowledge",
        link: "/platform/read/knowledge",
      },
      {
        title: "Por que o DevRel precisa de métricas de comunidade",
        author: "Equipe Insights",
        readTime: "4 min",
        category: "Community Ops",
        link: "/platform/read/devrel",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Seleção curada de plataformas, extensões e fluxos prontos para testar agora.",
    items: [
      {
        title: "5 builders com IA para transformar operações em 48h",
        author: "Labs Conscience",
        readTime: "6 min",
        category: "AI Tools",
        link: "/platform/read/ia-builders",
      },
      {
        title: "Como a Wetravel reduziu churn com notificações low-code",
        author: "Nath Stopa",
        readTime: "5 min",
        category: "Customer Ops",
        link: "/platform/read/wetravel",
      },
    ],
  },
];

const newsletterHighlights = [
  "Prévia exclusiva das gravações do Studio",
  "Convites para eventos ao vivo e mentorias abertas",
  "Modelos editáveis em Figma, Notion e Glide",
];

export default function Home() {
  return (
    <>
      <HeaderDynamic />
      <main className="bg-[#050505] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <EditorialHero />
          <FeaturedStories />
          <CategoryBrowser />
          {editorialSections.map((section) => (
            <EditorialSection key={section.id} section={section} />
          ))}
          <MiniSections />
          <NewsletterBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}

function EditorialHero() {
  return (
    <section className="space-y-10">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
        The Column
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] tracking-[0.3em] text-white/70">
          Issue 42
        </span>
      </p>
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-[68px] md:leading-[1.05]">
            Shaping the future of software development with Conscience.
          </h1>
          <p className="mt-5 text-lg text-white/70 sm:text-xl">
            Conversas profundas, frameworks acionáveis e ferramentas para quem cria apps, dados e narrativas com velocidade.
          </p>
          <form className="mt-10 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="hero-email" className="sr-only">
              Email
            </label>
            <input
              id="hero-email"
              type="email"
              required
              placeholder="Digite seu e-mail"
              className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Assinar
            </button>
          </form>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 px-5 py-4"
              >
                <dt className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/5 via-white/10 to-transparent p-6">
          <div className="rounded-[28px] border border-white/10 bg-black/60 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              Destaques desta edição
            </p>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                  AI
                </span>
                Como startups estão construindo copilotos para operações internas.
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                  Ops
                </span>
                Ferramentas para medir saúde de comunidades B2B direto no app.
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                  Lab
                </span>
                Agenda imersiva de laboratórios com pesquisadores convidados.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedStories() {
  return (
    <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <article className="flex flex-col justify-between rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-6 shadow-[var(--shadow-soft)]">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
            <span>{featuredStory.category}</span>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase">
              {featuredStory.date}
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            {featuredStory.title}
          </h2>
          <p className="mt-4 text-base text-white/70">
            {featuredStory.description}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap gap-3">
            {featuredStory.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <div>
              <p className="font-semibold text-white">{featuredStory.author}</p>
              <p>{featuredStory.readTime} de leitura</p>
            </div>
            <Link
              href={featuredStory.link}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Ler matéria
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </article>

      <div className="space-y-4">
        {trendingStories.map((story) => (
          <Link
            key={story.title}
            href={story.link}
            className="group flex items-center gap-4 rounded-[28px] border border-white/5 bg-white/10 p-5 transition hover:border-white/20"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {story.category}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-white/90">
                {story.title}
              </p>
              <p className="text-sm text-white/60">
                {story.author} • {story.readTime}
              </p>
            </div>
            <span className="text-xl text-white/40 group-hover:text-white">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryBrowser() {
  return (
    <section className="mt-12 border-y border-white/10 py-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        Navegue por categoria
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {categoryFilters.map((category) => (
          <button
            key={category}
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

function EditorialSection({ section }: { section: EditorialSection }) {
  return (
    <section id={section.id} className="mt-20 scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            {section.name}
          </p>
          <p className="mt-2 text-sm text-white/60">{section.description}</p>
        </div>
        <Link
          href={`/platform/feed?section=${section.id}`}
          className="text-sm font-semibold text-white/70 transition hover:text-white"
        >
          Ver mais →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <article className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
            <span>{section.highlight.category}</span>
            {section.highlight.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-3xl font-semibold text-white">
            {section.highlight.title}
          </h3>
          <p className="mt-4 text-base text-white/70">{section.highlight.description}</p>
          <div className="mt-8 flex items-center justify-between text-sm text-white/70">
            <div>
              <p className="font-semibold text-white">{section.highlight.author}</p>
              <p>{section.highlight.readTime}</p>
            </div>
            <Link
              href={section.highlight.link}
              className="inline-flex items-center gap-2 rounded-full border border-white px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Ler agora
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </article>

        <div className="space-y-4">
          {section.items.map((story) => (
            <Link
              key={story.title}
              href={story.link}
              className="group rounded-3xl border border-white/5 bg-white/[0.08] p-5 transition hover:border-white/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                {story.category}
              </p>
              <p className="mt-2 text-lg font-semibold text-white group-hover:text-white/90">
                {story.title}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {story.author} • {story.readTime}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniSections() {
  return (
    <section className="mt-20 grid gap-8 lg:grid-cols-2">
      {miniSections.map((section) => (
        <article
          key={section.id}
          id={section.id}
          className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-6 scroll-mt-24"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {section.title}
              </p>
              <p className="mt-2 text-sm text-white/70">{section.description}</p>
            </div>
            <Link
              href={`/platform/feed?section=${section.id}`}
              className="text-sm font-semibold text-white/70 transition hover:text-white"
            >
              Read more
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {section.items.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/40 p-4 transition hover:border-white/20"
              >
                <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {item.category}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-white/60">
                    {item.author} • {item.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function NewsletterBanner() {
  return (
    <section
      id="newsletter"
      className="mt-24 rounded-[var(--radius-card)] border border-white/10 bg-gradient-to-r from-white/10 via-transparent to-white/5 p-8"
    >
      <div className="grid gap-6 md:grid-cols-[1.3fr,0.7fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Newsletter
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-white">
            Assine para receber a próxima edição ainda esta semana.
          </h3>
          <p className="mt-3 text-sm text-white/70">
            Conteúdos sem spam, apenas análises práticas e convites para experiências ao vivo da Conscience.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="nome@empresa.com"
              className="h-12 flex-1 rounded-full border border-white/15 bg-black/30 px-5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Receber
            </button>
          </form>
        </div>
        <ul className="space-y-3 rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
          {newsletterHighlights.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}