export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  segment: "Pesquisador" | "Profissional" | "Estudante" | "Empresa";
};

export const testimonials: Testimonial[] = [
  {
    id: "researcher-1",
    quote:
      "Com a Consciência consegui estruturar um laboratório vivo que conectou universidades e comunidades ribeirinhas. O suporte metodológico foi essencial.",
    name: "Dr. Vinícius Prado",
    role: "Pesquisador em Sustentabilidade",
    segment: "Pesquisador",
  },
  {
    id: "professional-1",
    quote:
      "Os sprints de aprendizagem me ajudaram a criar uma área de inovação inclusiva. As mentorias são práticas e voltadas a resultados reais.",
    name: "Júlia Fernandes",
    role: "Head de Transformação Digital",
    segment: "Profissional",
  },
  {
    id: "student-1",
    quote:
      "Ganhei confiança para liderar meu primeiro projeto social e consegui bolsa de estudos graças à rede de mentores.",
    name: "Marcos Silva",
    role: "Estudante de Engenharia",
    segment: "Estudante",
  },
  {
    id: "company-1",
    quote:
      "Os laboratórios corporate labs da Consciência aceleraram nossa equipe cross-funcional com frameworks atualizados e acompanhamento dedicado.",
    name: "Renata Lima",
    role: "Diretora de Pessoas & Cultura",
    segment: "Empresa",
  },
];

