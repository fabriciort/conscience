export type Mentor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  segmentFocus: Array<"Pesquisadores" | "Profissionais" | "Estudantes" | "Empresas">;
  expertise: string[];
  bio: string;
  tags: string[];
  languages: string[];
  rating: number;
  sessionsDelivered: number;
  responseTime: string;
  availability: {
    days: string[];
    timezones: string[];
  };
  whatsappMessage: string;
};

export const mentorsDirectory: Mentor[] = [
  {
    id: "helena-ramos",
    slug: "helena-ramos",
    name: "Dra. Helena Ramos",
    title: "Cientista de Dados Climáticos",
    segmentFocus: ["Pesquisadores", "Empresas"],
    expertise: [
      "Pesquisa aplicada",
      "Ciência de dados climáticos",
      "Modelagem de impacto socioambiental",
    ],
    bio: "Doutora pelo MIT, lidera projetos de monitoramento climático no Norte do Brasil e auxilia equipes a transformar dados em políticas públicas.",
    tags: ["Pesquisadores", "Impacto social", "Dados"],
    languages: ["Português", "Inglês"],
    rating: 4.9,
    sessionsDelivered: 240,
    responseTime: "Menos de 12h",
    availability: {
      days: ["Terça", "Quarta", "Quinta"],
      timezones: ["GMT-3", "GMT-4"],
    },
    whatsappMessage:
      "Olá! Gostaria de agendar uma mentoria com a Dra. Helena Ramos pela Consciência.",
  },
  {
    id: "igor-nogueira",
    slug: "igor-nogueira",
    name: "Igor Nogueira",
    title: "Head de Inovação",
    segmentFocus: ["Profissionais", "Empresas"],
    expertise: [
      "Gestão de inovação",
      "Design de serviços",
      "Storytelling com dados",
    ],
    bio: "Mentor senior com 15 anos em transformação digital e criação de labs corporativos. Facilita squads multidisciplinares em 7 países.",
    tags: ["Inovação", "Liderança", "Estratégia"],
    languages: ["Português", "Espanhol"],
    rating: 4.8,
    sessionsDelivered: 310,
    responseTime: "Até 24h",
    availability: {
      days: ["Segunda", "Quarta", "Sábado"],
      timezones: ["GMT-3"],
    },
    whatsappMessage:
      "Olá! Desejo saber disponibilidade de mentoria com Igor Nogueira via Consciência.",
  },
  {
    id: "rebeca-sato",
    slug: "rebeca-sato",
    name: "Rebeca Sato",
    title: "Mentora de Projetos Sociais",
    segmentFocus: ["Estudantes", "Pesquisadores"],
    expertise: [
      "Gestão de projetos",
      "Design thinking",
      "Mobilização comunitária",
    ],
    bio: "Especialista em protagonismo jovem e experiências STEAM. Conduziu mais de 400 mentorias de impacto social.",
    tags: ["Juventude", "Projetos", "STEAM"],
    languages: ["Português", "Japonês"],
    rating: 5,
    sessionsDelivered: 415,
    responseTime: "Menos de 6h",
    availability: {
      days: ["Terça", "Quinta", "Domingo"],
      timezones: ["GMT-3", "GMT-1"],
    },
    whatsappMessage:
      "Oi! Quero agendar uma mentoria com a Rebeca Sato pela Consciência.",
  },
  {
    id: "amanda-costa",
    slug: "amanda-costa",
    name: "Amanda Costa",
    title: "Consultora de Cultura de Inovação",
    segmentFocus: ["Empresas", "Profissionais"],
    expertise: [
      "Cultura organizacional",
      "Programas de aprendizagem",
      "Facilitação de workshops",
    ],
    bio: "Apoia empresas a criarem academias internas de aprendizagem contínua, com foco em diversidade e impacto.",
    tags: ["Cultura", "Aprendizagem", "Empresas"],
    languages: ["Português", "Inglês"],
    rating: 4.95,
    sessionsDelivered: 198,
    responseTime: "Até 18h",
    availability: {
      days: ["Segunda", "Quinta", "Sexta"],
      timezones: ["GMT-3", "GMT-5"],
    },
    whatsappMessage:
      "Olá! Quero conversar sobre mentoria com Amanda Costa dentro da Consciência.",
  },
];

