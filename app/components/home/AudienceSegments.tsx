import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui';

interface Segment {
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  color: string;
}

const segments: Segment[] = [
  {
    title: 'Pesquisadores',
    description: 'Acesso a publicações científicas, dados de pesquisa e networking acadêmico.',
    benefits: [
      'Base de dados de artigos científicos',
      'Ferramentas de análise de dados',
      'Comunidade de pesquisadores',
      'Webinars e palestras especializadas',
    ],
    icon: '🔬',
    color: 'bg-sage',
  },
  {
    title: 'Profissionais',
    description: 'Desenvolvimento de carreira com cursos práticos e mentoria especializada.',
    benefits: [
      'Cursos de atualização profissional',
      'Mentoria individual com especialistas',
      'Certificações reconhecidas',
      'Networking com líderes de mercado',
    ],
    icon: '💼',
    color: 'bg-coral',
  },
  {
    title: 'Estudantes',
    description: 'Material didático completo, videoaulas e suporte para seus estudos.',
    benefits: [
      'Videoaulas interativas',
      'Exercícios e simulados',
      'Monitoria online',
      'Material complementar exclusivo',
    ],
    icon: '📚',
    color: 'bg-peach',
  },
  {
    title: 'Empresas',
    description: 'Soluções corporativas para treinamento e desenvolvimento de equipes.',
    benefits: [
      'Treinamento corporativo customizado',
      'Dashboard de acompanhamento',
      'Consultoria especializada',
      'Planos para múltiplos usuários',
    ],
    icon: '🏢',
    color: 'bg-sage',
  },
];

export const AudienceSegments: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-cream mb-4">
            Feito Para Você
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conteúdo e recursos adaptados para cada perfil de usuário
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {segments.map((segment) => (
            <Card key={segment.title} hover padding="lg" className="h-full">
              <div className="flex items-start gap-4 mb-6">
                <div className={`${segment.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
                  {segment.icon}
                </div>
                <div>
                  <CardHeader className="mb-2">
                    <CardTitle as="h3" className="text-xl md:text-2xl">
                      {segment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="text-base">
                    {segment.description}
                  </CardDescription>
                </div>
              </div>

              <CardContent>
                <ul className="space-y-3">
                  {segment.benefits.map((benefit, index) => (
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
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Video Thumbnail Placeholder */}
              <div className="mt-6 bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-coral rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ver vídeo introdutório</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

