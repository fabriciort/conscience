export type AudienceSegment = {
  id: "researcher" | "professional" | "student" | "company";
  title: string;
  description: string;
  benefits: string[];
  video: {
    title: string;
    duration: string;
  };
  sampleMentors: Array<{
    name: string;
    role: string;
  }>;
  whatsappMessage: string;
};

export const audienceSegments: AudienceSegment[] = [
  {
    id: "researcher",
    title: "Pesquisadores",
    description:
      "Transforme descobertas acadêmicas em impacto social com programas de pesquisa aplicada e financiamento colaborativo.",
    benefits: [
      "Match automatizado com laboratórios e hubs de inovação",
      "Banco de dados dinâmico de editais e fomento",
      "Mentoria individual com cientistas seniores",
    ],
    video: {
      title: "Pesquisa aplicada na Amazônia",
      duration: "6 min",
    },
    sampleMentors: [
      { name: "Dra. Helena Ramos", role: "Cientista de Dados Climáticos" },
      { name: "Prof. Mateus Ibarra", role: "Coordenador de P&D" },
    ],
    whatsappMessage:
      "Olá! Quero conhecer os programas para pesquisadores da Conscience.",
  },
  {
    id: "professional",
    title: "Profissionais",
    description:
      "Atualize habilidades emergentes com projetos guiados, diagnósticos de competência e mentores de mercado.",
    benefits: [
      "Trilhas adaptadas ao seu objetivo de carreira",
      "Feedback contínuo e relatórios de evolução",
      "Comunidade multissetorial com networking ativo",
    ],
    video: {
      title: "Storytelling com dados para líderes",
      duration: "4 min",
    },
    sampleMentors: [
      { name: "Igor Nogueira", role: "Head de Inovação" },
      { name: "Camila Duarte", role: "Tech Lead em IA" },
    ],
    whatsappMessage:
      "Olá! Quero saber como a Conscience apoia profissionais em transição.",
  },
  {
    id: "student",
    title: "Estudantes",
    description:
      "Comece projetos impactantes com desafios reais, maratonas criativas e comunidade acolhedora.",
    benefits: [
      "Planos de estudo personalizados por área",
      "Mentorias coletivas semanais",
      "Bolsa Conscience para protagonismo jovem",
    ],
    video: {
      title: "Construindo um projeto social desde o zero",
      duration: "5 min",
    },
    sampleMentors: [
      { name: "Rebeca Sato", role: "Mentora de Projetos Sociais" },
      { name: "Leo Braga", role: "Facilitador STEAM" },
    ],
    whatsappMessage:
      "Oi! Quero entender como a Conscience ajuda estudantes a construir projetos.",
  },
  {
    id: "company",
    title: "Empresas",
    description:
      "Desenvolva culturas de aprendizagem contínua e programas de inovação com curadoria estratégica.",
    benefits: [
      "Academias internas personalizadas",
      "Análises de impacto e competências",
      "Mentores exclusivos com NDA",
    ],
    video: {
      title: "Lab Conscience para squads corporativos",
      duration: "7 min",
    },
    sampleMentors: [
      { name: "Amanda Costa", role: "Consultora de Cultura de Inovação" },
      { name: "Rafael Lopes", role: "Especialista em Aprendizagem Corporativa" },
    ],
    whatsappMessage:
      "Olá! Quero conversar sobre programas corporativos da Conscience.",
  },
];

