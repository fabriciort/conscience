import { PricingTable } from "@/components/pricing-table";
import { plans } from "@/lib/data/pricing";

export const metadata = {
  title: "Planos Consciência • Assinaturas para cada jornada",
  description:
    "Compare planos de assinatura Consciência com mentorias, trilhas e suporte para pesquisadores, profissionais, estudantes e empresas.",
};

export default function PricingPage() {
  return (
    <div className="pb-24 pt-12">
      <PricingTable plans={plans} />
      <FAQ />
    </div>
  );
}

function FAQ() {
  const items = [
    {
      question: "Posso migrar de plano quando quiser?",
      answer:
        "Sim. Você pode migrar a qualquer momento e o valor é ajustado proporcionalmente no próximo ciclo. Nossa equipe auxilia para que não haja interrupção de acesso.",
    },
    {
      question: "O plano Enterprise permite contrato corporativo?",
      answer:
        "Oferecemos contrato personalizado com condições especiais, integração com SSO e relatórios avançados. Entre em contato para um desenho sob medida.",
    },
    {
      question: "Há desconto para estudantes?",
      answer:
        "Sim, estudantes aprovados na Bolsa Consciência recebem até 50% de subsídio no plano Essencial mediante apresentação de documentação.",
    },
  ];

  return (
    <section className="mx-auto mt-16 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-8 shadow-sm sm:p-12">
        <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
          Perguntas frequentes
        </h2>
        <ul className="mt-8 space-y-6">
          {items.map((item) => (
            <li key={item.question} className="space-y-2">
              <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">
                {item.question}
              </h3>
              <p className="text-sm text-[color:var(--text-muted)]">
                {item.answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

