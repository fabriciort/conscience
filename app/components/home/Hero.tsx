import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal dark:text-cream mb-6 leading-tight">
          Transforme Conhecimento em{' '}
          <span className="text-coral">Consciência</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Plataforma educacional completa com conteúdo exclusivo, mentoria personalizada 
          e recursos de aprendizagem para impulsionar sua carreira e expandir seus horizontes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/cadastro">
            <Button variant="primary" size="lg">
              Começar Agora
            </Button>
          </Link>
          <Link href="/precos">
            <Button variant="outline" size="lg">
              Ver Planos
            </Button>
          </Link>
        </div>
        
        {/* WhatsApp CTA */}
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Tem dúvidas?{' '}
            <a 
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a plataforma Consciência."
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:underline font-medium"
            >
              Fale conosco no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

