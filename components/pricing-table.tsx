"use client";

import { useMemo, useState } from "react";
import type { BillingCycle, Plan } from "@/lib/data/pricing";
import { formatCurrencyBRL, getWhatsAppLink } from "@/lib/utils";

type PricingTableProps = {
  plans: Plan[];
};

export function PricingTable({ plans }: PricingTableProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState(
    plans.find((plan) => plan.isFeatured)?.id ?? plans[0]?.id,
  );

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId),
    [plans, selectedPlanId],
  );

  return (
    <section className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
            Planos e benefícios
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
            Flexibilidade para crescer com Consciência
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[color:var(--text-muted)] sm:text-lg">
            Escolha entre modalidades mensais ou anuais com economia, suporte
            dedicado e integrações corporativas. Sem taxas ocultas.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-muted)] p-1">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              billingCycle === "monthly"
                ? "bg-[color:var(--surface)] shadow-sm text-[color:var(--text-primary)]"
                : "text-[color:var(--text-muted)]"
            }`}
          >
            Mensal
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              billingCycle === "annual"
                ? "bg-[color:var(--surface)] shadow-sm text-[color:var(--text-primary)]"
                : "text-[color:var(--text-muted)]"
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const price =
            billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;

          return (
            <article
              key={plan.id}
              className={`flex h-full flex-col rounded-[var(--radius-card)] border p-6 transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[color:var(--coral)] ${
                plan.isFeatured
                  ? "border-[color:var(--coral)] bg-[color:var(--surface)] shadow-[var(--shadow-soft)]"
                  : "border-[color:var(--border-soft)] bg-[color:var(--surface-muted)]/70 hover:border-[color:var(--coral)]"
              }`}
            >
              <header className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
                  {plan.name}
                </h2>
                {plan.isFeatured && (
                  <span className="rounded-full bg-[color:var(--coral)] px-3 py-1 text-xs font-semibold uppercase text-white">
                    Recomendado
                  </span>
                )}
              </header>
              <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-[color:var(--text-primary)]">
                  {formatCurrencyBRL(price)}
                </span>
                <span className="text-xs text-[color:var(--text-muted)]">
                  {billingCycle === "monthly" ? "/mês" : "/ano"}
                </span>
              </div>

              {billingCycle === "annual" && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--coral)]">
                  Economia de{" "}
                  {formatCurrencyBRL(plan.priceMonthly * 12 - plan.priceAnnual)}
                </p>
              )}

              <ul className="mt-6 space-y-3 text-sm text-[color:var(--text-muted)]">
                {plan.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={`flex items-start gap-3 rounded-2xl px-3 py-2 ${
                      feature.highlighted
                        ? "bg-[color:var(--sage)]/60"
                        : "bg-[color:var(--surface)]"
                    }`}
                  >
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--coral)]/20 text-xs font-semibold text-[color:var(--coral)]">
                      ✓
                    </span>
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
                {plan.bestFor.map((audience) => (
                  <span
                    key={audience}
                    className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 font-semibold"
                  >
                    {audience}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                className={`focus-ring mt-6 flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  isSelected
                    ? "border-transparent bg-[color:var(--coral)] text-white shadow-lg"
                    : "border-[color:var(--border-soft)] bg-[color:var(--surface)] text-[color:var(--text-primary)] hover:border-[color:var(--coral)]"
                }`}
                aria-pressed={isSelected}
              >
                {isSelected ? "Plano selecionado" : plan.ctaLabel}
              </button>
            </article>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="mt-10 rounded-[var(--radius-card)] border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                Plano escolhido
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--text-primary)]">
                {selectedPlan.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[color:var(--text-muted)]">
                Nossa equipe de onboarding entra em contato em até 3 horas
                úteis via WhatsApp para personalizar sua jornada.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppLink(
                  `Olá! Quero avançar com o plano ${selectedPlan.name} da Consciência.`,
                )}
                className="rounded-full bg-[color:var(--coral)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
              >
                Seguir com assinatura
              </a>
              <a
                href={getWhatsAppLink(
                  `Tenho dúvidas sobre o plano ${selectedPlan.name} da Consciência.`,
                )}
                className="rounded-full border border-[color:var(--border-soft)] px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)]"
              >
                Tirar dúvidas
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

