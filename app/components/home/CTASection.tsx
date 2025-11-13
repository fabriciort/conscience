import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-coral text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Pronto Para Começar Sua Jornada?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Junte-se a milhares de pessoas que já estão transformando conhecimento em consciência.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/cadastro">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-coral hover:bg-cream"
            >
              Criar Conta Grátis
            </Button>
          </Link>
          <a 
            href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os planos da Consciência."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-coral"
            >
              Falar com Especialista
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

