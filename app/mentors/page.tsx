'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';

interface Mentor {
  id: string;
  name: string;
  expertise: string;
  bio: string;
  rating: number;
  reviews: number;
  avatar?: string;
  specialties: string[];
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Ana Silva',
    expertise: 'Ciências Sociais',
    bio: 'Pesquisadora com mais de 15 anos de experiência em estudos sociais e políticas públicas.',
    rating: 4.9,
    reviews: 127,
    specialties: ['Pesquisa Qualitativa', 'Políticas Públicas', 'Metodologia'],
  },
  {
    id: '2',
    name: 'João Oliveira',
    expertise: 'Gestão de Projetos',
    bio: 'Especialista em gestão ágil e transformação digital com certificações PMP e Scrum Master.',
    rating: 4.8,
    reviews: 89,
    specialties: ['Agile', 'Scrum', 'Transformação Digital'],
  },
  {
    id: '3',
    name: 'Patricia Costa',
    expertise: 'Marketing Digital',
    bio: 'Estrategista de marketing digital com experiência em grandes marcas e startups.',
    rating: 4.9,
    reviews: 156,
    specialties: ['SEO', 'Redes Sociais', 'E-commerce'],
  },
  {
    id: '4',
    name: 'Dr. Carlos Mendes',
    expertise: 'Tecnologia',
    bio: 'Engenheiro de software e pesquisador em inteligência artificial e machine learning.',
    rating: 5.0,
    reviews: 203,
    specialties: ['IA', 'Machine Learning', 'Python'],
  },
  {
    id: '5',
    name: 'Roberto Lima',
    expertise: 'Finanças',
    bio: 'Consultor financeiro especializado em planejamento estratégico e investimentos.',
    rating: 4.7,
    reviews: 94,
    specialties: ['Investimentos', 'Planejamento', 'Análise Financeira'],
  },
  {
    id: '6',
    name: 'Prof. Luiza Alves',
    expertise: 'Educação',
    bio: 'Pedagoga com foco em metodologias ativas e educação inclusiva.',
    rating: 4.8,
    reviews: 112,
    specialties: ['Metodologias Ativas', 'Educação Inclusiva', 'EAD'],
  },
];

const expertiseFilters = [
  'Todos',
  'Ciências Sociais',
  'Gestão de Projetos',
  'Marketing Digital',
  'Tecnologia',
  'Finanças',
  'Educação',
];

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('Todos');

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExpertise =
      selectedExpertise === 'Todos' || mentor.expertise === selectedExpertise;

    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--charcoal)] mb-4">
            Diretório de Mentores
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl">
            Conecte-se com mentores experientes e acelere seu desenvolvimento profissional
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Buscar por nome, área de expertise ou especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {expertiseFilters.map((expertise) => (
              <button
                key={expertise}
                onClick={() => setSelectedExpertise(expertise)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedExpertise === expertise
                    ? 'bg-[var(--coral)] text-white'
                    : 'bg-white border border-gray-300 text-[var(--charcoal)] hover:border-[var(--coral)]'
                }`}
              >
                {expertise}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-[var(--text-secondary)] mb-6">
          {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor encontrado' : 'mentores encontrados'}
        </p>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} hover className="flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar
                    src={mentor.avatar}
                    alt={mentor.name}
                    size="md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--charcoal)] mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-[var(--coral)] font-medium mb-2">
                      {mentor.expertise}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
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
                        {mentor.rating} ({mentor.reviews} avaliações)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--sage)] bg-opacity-30 text-[var(--charcoal)] text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {mentor.specialties.length > 3 && (
                    <span className="px-3 py-1 text-[var(--text-secondary)] text-xs">
                      +{mentor.specialties.length - 3}
                    </span>
                  )}
                </div>

                <Link href={`/mentors/${mentor.id}`} className="mt-auto">
                  <Button variant="primary" className="w-full">
                    Ver Perfil
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-lg text-[var(--text-secondary)]">
              Nenhum mentor encontrado com os filtros selecionados.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedExpertise('Todos');
              }}
            >
              Limpar Filtros
            </Button>
          </Card>
        )}
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
}

