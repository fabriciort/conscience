'use client';

import React, { useState } from 'react';
import { Header, Footer } from '../components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '../components/ui';

interface PricingTier {
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  featured?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Básico',
    description: 'Perfeito para começar sua jornada de aprendizado',
    priceMonthly: 49,
    priceYearly: 490,
    features: [
      'Acesso a cursos básicos',
      'Comunidade exclusiva',
      'Certificados digitais',
      'Suporte por email',
      'Material complementar',
    ],
    cta: 'Começar Agora',
  },
  {
    name: 'Profissional',
    description: 'Ideal para profissionais que buscam crescimento',
    priceMonthly: 99,
    priceYearly: 990,
    featured: true,
    features: [
      'Todos os recursos do Básico',
      'Acesso a todos os cursos',
      'Mentoria em grupo (2x/mês)',
      'Webinars ao vivo',
      'Networking events',
      'Material avançado',
      'Suporte prioritário',
    ],
    cta: 'Assinar Agora',
  },
  {
    name: 'Enterprise',
    description: 'Soluções completas para empresas e equipes',
    priceMonthly: 299,
    priceYearly: 2990,
    features: [
      'Todos os recursos do Profissional',
      'Mentoria individual (4x/mês)',
      'Consultoria personalizada',
      'Dashboard de gestão',
      'Múltiplos usuários',
      'Treinamento corporativo',
      'API de integração',
      'Suporte 24/7',
    ],
    cta: 'Falar com Vendas',
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal dark:text-cream mb-6">
              Planos e Preços
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Escolha o plano perfeito para suas necessidades. Comece grátis por 7 dias.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-coral text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-coral'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  billingPeriod === 'yearly'
                    ? 'bg-coral text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-coral'
                }`}
              >
                Anual
              </button>
            </div>
            
            {billingPeriod === 'yearly' && (
              <p className="mt-4 text-sage font-medium">
                ✨ Economize até 17% com o plano anual
              </p>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier) => {
              const price = billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceYearly;
              const displayPrice = billingPeriod === 'yearly' ? price / 12 : price;

              return (
                <Card 
                  key={tier.name}
                  featured={tier.featured}
                  padding="lg"
                  className={`flex flex-col h-full relative ${tier.featured ? 'transform md:-translate-y-4' : ''}`}
                >
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Mais Popular
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                    <CardDescription className="text-base">{tier.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-charcoal dark:text-cream">
                          {formatPrice(displayPrice)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">/mês</span>
                      </div>
                      {billingPeriod === 'yearly' && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {formatPrice(price)} cobrado anualmente
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg 
                            className="w-6 h-6 text-coral flex-shrink-0 mt-0.5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      variant={tier.featured ? 'primary' : 'outline'}
                      size="lg"
                      fullWidth
                      onClick={() => {
                        if (tier.name === 'Enterprise') {
                          window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o plano Enterprise.', '_blank');
                        } else {
                          window.location.href = '/cadastro';
                        }
                      }}
                    >
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 md:mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-cream mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-6">
              <Card padding="lg">
                <h3 className="text-xl font-bold text-charcoal dark:text-cream mb-2">
                  Posso cancelar a qualquer momento?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.
                </p>
              </Card>
              
              <Card padding="lg">
                <h3 className="text-xl font-bold text-charcoal dark:text-cream mb-2">
                  Existe período de teste gratuito?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim, todos os planos incluem 7 dias de teste gratuito para você conhecer a plataforma.
                </p>
              </Card>

              <Card padding="lg">
                <h3 className="text-xl font-bold text-charcoal dark:text-cream mb-2">
                  Quais formas de pagamento são aceitas?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Aceitamos cartões de crédito, débito, PIX e boleto bancário.
                </p>
              </Card>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Ainda tem dúvidas?
            </p>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Tenho dúvidas sobre os planos da Consciência."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Fale Conosco no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

