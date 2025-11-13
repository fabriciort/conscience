'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Card, CardContent } from '../ui';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Pesquisadora em Biotecnologia',
    content: 'A plataforma Consciência revolucionou minha forma de pesquisar. O acesso aos dados e a comunidade acadêmica são excepcionais.',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Gerente de Projetos',
    content: 'Os cursos e mentorias me ajudaram a conquistar uma promoção. O conteúdo é prático e aplicável ao dia a dia profissional.',
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Estudante de Engenharia',
    content: 'O material didático e as videoaulas são incríveis. Consegui melhorar minhas notas significativamente!',
  },
  {
    id: 4,
    name: 'Carlos Oliveira',
    role: 'Diretor de RH',
    content: 'Implementamos a plataforma para nossa equipe e os resultados foram impressionantes. Recomendo para todas as empresas.',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-cream mb-4">
            O Que Dizem Nossos Alunos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Histórias reais de transformação e sucesso
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <Card padding="lg" className="min-h-[300px] md:min-h-[250px]">
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar 
                    name={testimonials[currentIndex].name}
                    alt={`Foto de ${testimonials[currentIndex].name}`}
                    size="xl"
                    className="mb-6"
                  />
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-charcoal dark:text-cream text-lg">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
              aria-label="Depoimento anterior"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
              aria-label="Próximo depoimento"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Navegação de depoimentos">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-coral w-8' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

