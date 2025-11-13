'use client';

import React, { useState, useMemo } from 'react';
import { Header, Footer } from '../components/layout';
import { Card, CardTitle, CardContent, CardFooter, Button, Input, Avatar } from '../components/ui';

interface Mentor {
  id: number;
  name: string;
  title: string;
  expertise: string[];
  bio: string;
  rating: number;
  students: number;
  avatar?: string;
  availability: 'available' | 'limited' | 'unavailable';
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Dra. Ana Silva',
    title: 'Pesquisadora em Biotecnologia',
    expertise: ['Biotecnologia', 'Pesquisa Científica', 'Publicações'],
    bio: 'PhD em Biotecnologia com 15 anos de experiência em pesquisa e publicações internacionais.',
    rating: 4.9,
    students: 127,
    availability: 'available',
  },
  {
    id: 2,
    name: 'Prof. Carlos Oliveira',
    title: 'Especialista em Gestão de Projetos',
    expertise: ['Gestão de Projetos', 'Liderança', 'Agile'],
    bio: 'Consultor empresarial com certificações PMP e Scrum Master, 20 anos no mercado.',
    rating: 4.8,
    students: 243,
    availability: 'available',
  },
  {
    id: 3,
    name: 'Maria Santos',
    title: 'Engenheira de Software Sênior',
    expertise: ['Desenvolvimento Web', 'JavaScript', 'React'],
    bio: 'Engenheira de software em grandes techs, especialista em desenvolvimento frontend moderno.',
    rating: 4.9,
    students: 189,
    availability: 'limited',
  },
  {
    id: 4,
    name: 'Dr. João Costa',
    title: 'Diretor de Recursos Humanos',
    expertise: ['RH', 'Desenvolvimento Organizacional', 'Recrutamento'],
    bio: 'Executivo de RH com experiência em empresas multinacionais e transformação cultural.',
    rating: 4.7,
    students: 95,
    availability: 'available',
  },
  {
    id: 5,
    name: 'Profa. Beatriz Lima',
    title: 'Especialista em Marketing Digital',
    expertise: ['Marketing Digital', 'SEO', 'Mídias Sociais'],
    bio: 'Estrategista de marketing digital com cases de sucesso em diversas indústrias.',
    rating: 4.8,
    students: 312,
    availability: 'available',
  },
  {
    id: 6,
    name: 'Dr. Pedro Almeida',
    title: 'Cientista de Dados',
    expertise: ['Data Science', 'Machine Learning', 'Python'],
    bio: 'Cientista de dados com foco em ML e AI, professor universitário e pesquisador.',
    rating: 4.9,
    students: 156,
    availability: 'limited',
  },
];

const allExpertise = Array.from(new Set(mentors.flatMap(m => m.expertise))).sort();

export default function MentoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor => {
      const matchesSearch = 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesExpertise = 
        selectedExpertise === 'all' || 
        mentor.expertise.includes(selectedExpertise);
      
      const matchesAvailability = 
        selectedAvailability === 'all' || 
        mentor.availability === selectedAvailability;
      
      return matchesSearch && matchesExpertise && matchesAvailability;
    });
  }, [searchTerm, selectedExpertise, selectedAvailability]);

  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      available: { text: 'Disponível', color: 'bg-sage text-charcoal' },
      limited: { text: 'Vagas Limitadas', color: 'bg-peach text-charcoal' },
      unavailable: { text: 'Indisponível', color: 'bg-gray-300 text-gray-600' },
    };
    return badges[availability as keyof typeof badges];
  };

  const handleConnectMentor = (mentorId: number) => {
    console.log(`Connecting to mentor ${mentorId}`);
    // Implement connection logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal dark:text-cream mb-6">
              Nossos Mentores
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Conecte-se com especialistas experientes que vão guiar sua jornada de aprendizado
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 md:mb-12">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Buscar por nome, especialidade ou área..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                className="text-base"
              />

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="expertise-filter" className="sr-only">
                    Filtrar por especialidade
                  </label>
                  <select
                    id="expertise-filter"
                    value={selectedExpertise}
                    onChange={(e) => setSelectedExpertise(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-charcoal dark:text-cream focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Todas as Especialidades</option>
                    {allExpertise.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label htmlFor="availability-filter" className="sr-only">
                    Filtrar por disponibilidade
                  </label>
                  <select
                    id="availability-filter"
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-charcoal dark:text-cream focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">Todas as Disponibilidades</option>
                    <option value="available">Disponível</option>
                    <option value="limited">Vagas Limitadas</option>
                  </select>
                </div>
              </div>

              {/* Results count */}
              <p className="text-center text-gray-600 dark:text-gray-400">
                {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor encontrado' : 'mentores encontrados'}
              </p>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredMentors.map(mentor => {
              const badge = getAvailabilityBadge(mentor.availability);
              
              return (
                <Card key={mentor.id} hover padding="lg" className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar 
                      name={mentor.name}
                      alt={`Foto de ${mentor.name}`}
                      size="lg"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-1 truncate">
                        {mentor.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {mentor.title}
                      </p>
                    </div>
                  </div>

                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {mentor.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                      <div>
                        {mentor.students} alunos
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant={mentor.availability === 'available' ? 'primary' : 'outline'}
                      size="md"
                      fullWidth
                      onClick={() => handleConnectMentor(mentor.id)}
                      disabled={mentor.availability === 'unavailable'}
                    >
                      {mentor.availability === 'unavailable' ? 'Indisponível' : 'Conectar'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <svg 
                className="w-16 h-16 mx-auto mb-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-charcoal dark:text-cream mb-2">
                Nenhum mentor encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente ajustar seus filtros ou buscar por outros termos
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 md:mt-24 text-center">
            <Card padding="lg" className="max-w-2xl mx-auto bg-coral text-white border-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Quer se tornar um mentor?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Compartilhe seu conhecimento e ajude outros profissionais a crescerem em suas carreiras.
              </p>
              <a 
                href="https://wa.me/5511999999999?text=Olá! Gostaria de me tornar um mentor na plataforma Consciência."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-coral hover:bg-cream"
                >
                  Fale Conosco
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

