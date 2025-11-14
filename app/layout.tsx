import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from '@/lib/contexts/UserContext';
import { DevToolbar } from '@/components/dev-toolbar';

export const metadata: Metadata = {
  title: 'Conscience - Plataforma de Conhecimento e Mentoria',
  description: 'Plataforma de assinatura para pesquisadores, profissionais, estudantes e empresas que desejam construir projetos relevantes com mentoria e comunidade ativa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>
          {children}
          <DevToolbar />
        </UserProvider>
      </body>
    </html>
  );
}

