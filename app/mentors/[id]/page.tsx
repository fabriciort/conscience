'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

// Mock data - in production, this would come from an API/database
const mentorData: Record<string, {
  id: string;
  name: string;
  expertise: string;
  bio: string;
  fullBio: string;
  rating: number;
  reviews: number;
  avatar?: string;
  specialties: string[];
  experience: string;
  education: string[];
  achievements: string[];
  availability: string;
}>} = {
  '1': {
    id: '1',
    name: 'Dr. Ana Silva',
    expertise: 'Ciências Sociais',
    bio: 'Pesquisadora com mais de 15 anos de experiência em estudos sociais e políticas públicas.',
    fullBio: 'Dra. Ana Silva é uma pesquisadora renomada com mais de 15 anos de experiência em estudos sociais e políticas públicas. Ela possui doutorado em Ciências Sociais pela USP e já publicou mais de 50 artigos científicos em revistas internacionais. Sua pesquisa foca em desigualdade social, políticas públicas e metodologias qualitativas.',
    rating: 4.9,
    reviews: 127,
    specialties: ['Pesquisa Qualitativa', 'Políticas Públicas', 'Metodologia', 'Análise de Dados'],
    experience: '15+ anos',
    education: [
      'Doutorado em Ciências Sociais - USP',
      'Mestrado em Sociologia - UFMG',
      'Graduação em Ciências Sociais - PUC-SP',
    ],
    achievements: [
      '50+ artigos publicados em revistas internacionais',
      'Prêmio de Melhor Pesquisa em Ciências Sociais 2020',
      'Consultora da ONU em políticas públicas',
    ],
    availability: 'Segunda a Sexta, 9h às 18h',
  },
  '2': {
    id: '2',
    name: 'João Oliveira',
    expertise: 'Gestão de Projetos',
    bio: 'Especialista em gestão ágil e transformação digital com certificações PMP e Scrum Master.',
    fullBio: 'João Oliveira é um especialista em gestão de projetos com mais de 12 anos de experiência ajudando empresas a transformarem seus processos através de metodologias ágeis. Possui certificações PMP, Scrum Master e Product Owner, e já liderou projetos em empresas de grande porte.',
    rating: 4.8,
    reviews: 89,
    specialties: ['Agile', 'Scrum', 'Transformação Digital', 'Product Management'],
    experience: '12+ anos',
    education: [
      'MBA em Gestão de Projetos - FGV',
      'Certificação PMP - PMI',
      'Certificação Scrum Master - Scrum Alliance',
    ],
    achievements: [
      'Liderou projetos de mais de R$ 50 milhões',
      'Certificado PMP desde 2015',
      'Palestrante em eventos de tecnologia',
    ],
    availability: 'Segunda a Sexta, 10h às 19h',
  },
};

export default function MentorProfilePage() {
  const params = useParams();
  const mentorId = params?.id as string;
  const mentor = mentorData[mentorId];
  const [selectedTab, setSelectedTab] = useState<'about' | 'reviews'>('about');

  if (!mentor) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--cream)]">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-[var(--charcoal)] mb-4">
              Mentor não encontrado
            </h1>
            <Link href="/mentors">
              <Button variant="primary">Voltar ao Diretório</Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/mentors"
          className="inline-flex items-center gap-2 text-[var(--coral)] hover:underline mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao diretório
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="text-center mb-6">
                <Avatar
                  src={mentor.avatar}
                  alt={mentor.name}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-[var(--charcoal)] mb-2">
                  {mentor.name}
                </h1>
                <p className="text-[var(--coral)] font-medium mb-4">
                  {mentor.expertise}
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(mentor.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {mentor.rating} ({mentor.reviews})
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  {mentor.availability}
                </p>
                <Button variant="primary" size="lg" className="w-full mb-4">
                  Agendar Sessão
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-[var(--charcoal)] mb-3">
                  Especialidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--sage)] bg-opacity-30 text-[var(--charcoal)] text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setSelectedTab('about')}
                className={`px-6 py-3 font-medium transition-colors ${
                  selectedTab === 'about'
                    ? 'text-[var(--coral)] border-b-2 border-[var(--coral)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--charcoal)]'
                }`}
              >
                Sobre
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-3 font-medium transition-colors ${
                  selectedTab === 'reviews'
                    ? 'text-[var(--coral)] border-b-2 border-[var(--coral)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--charcoal)]'
                }`}
              >
                Avaliações ({mentor.reviews})
              </button>
            </div>

            {/* About Tab */}
            {selectedTab === 'about' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-4">
                    Biografia
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {mentor.fullBio}
                  </p>
                </Card>

                <Card>
                  <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-4">
                    Formação
                  </h2>
                  <ul className="space-y-3">
                    {mentor.education.map((edu, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-[var(--sage)] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                        <span className="text-[var(--text-secondary)]">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-4">
                    Conquistas
                  </h2>
                  <ul className="space-y-3">
                    {mentor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-[var(--coral)] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span className="text-[var(--text-secondary)]">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {/* Reviews Tab */}
            {selectedTab === 'reviews' && (
              <Card>
                <h2 className="text-2xl font-bold text-[var(--charcoal)] mb-6">
                  Avaliações dos Alunos
                </h2>
                <div className="space-y-6">
                  {/* Mock reviews */}
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start gap-4 mb-3">
                        <Avatar
                          alt={`Usuário ${review}`}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-[var(--charcoal)]">
                              Usuário {review}
                            </h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-[var(--text-secondary)]">
                            Excelente mentor! Muito paciente e com conhecimento profundo na área.
                            As sessões foram muito produtivas e consegui aplicar os aprendizados
                            imediatamente no meu trabalho.
                          </p>
                          <p className="text-sm text-[var(--text-secondary)] mt-2 opacity-70">
                            Há 2 semanas
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
}

