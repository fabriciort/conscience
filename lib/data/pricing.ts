export type BillingCycle = "monthly" | "annual";

export type Plan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  ctaLabel: string;
  features: Array<{
    label: string;
    highlighted?: boolean;
  }>;
  bestFor: string[];
  isFeatured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Essencial",
    description:
      "Recursos fundamentais para estudantes e curiosos começarem a explorar conhecimento aplicado.",
    priceMonthly: 79,
    priceAnnual: 790,
    ctaLabel: "Começar agora",
    bestFor: ["Estudantes", "Curiosos", "Mentorias em grupo"],
    features: [
      { label: "Trilhas guiadas com desafios semanais" },
      { label: "2 mentorias coletivas/mês" },
      { label: "Laboratório de projetos compartilhados" },
      { label: "Certificados verificados" },
    ],
  },
  {
    id: "growth",
    name: "Avançado",
    description:
      "Plano completo para profissionais e pesquisadores ampliarem impacto com apoio dedicado.",
    priceMonthly: 179,
    priceAnnual: 1790,
    ctaLabel: "Destacado",
    isFeatured: true,
    bestFor: ["Profissionais", "Pesquisadores", "Projetos aplicados"],
    features: [
      { label: "Mentor especialista dedicado", highlighted: true },
      { label: "Estúdios temáticos e laboratórios premium" },
      { label: "Clube Consciência com encontros quinzenais" },
      { label: "Ferramentas de diagnóstico de habilidades" },
      { label: "Prioridade no suporte via WhatsApp" },
    ],
  },
  {
    id: "enterprise",
    name: "Corporate Labs",
    description:
      "Integração e curadoria estratégica para equipes organizacionais e programas de inovação.",
    priceMonthly: 420,
    priceAnnual: 4200,
    ctaLabel: "Falar com o time",
    bestFor: ["Empresas", "Labs de inovação", "Treinamentos customizados"],
    features: [
      { label: "Onboarding personalizado e workshops in-company" },
      { label: "Dashboard de impacto e analytics" },
      { label: "Biblioteca de cases corporativos" },
      { label: "Mentores exclusivos e NDA incluído" },
    ],
  },
];

