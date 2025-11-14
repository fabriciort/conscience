'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { UserRole } from '@/lib/supabase/types';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/platform/feed`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    // If signup successful
    if (data.user) {
      // For researchers, create researcher profile
      if (role === 'researcher') {
        await supabase.from('researcher_profiles').insert({
          user_id: data.user.id,
          verification_status: 'pending',
        });
      }

      alert('✅ Conta criada! Verifique seu email para confirmar.');
      router.push('/auth/login');
    }

    setIsLoading(false);
  };

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          role: role, // Pass role as query param
        },
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
            Vamos construir juntos ✨
          </h1>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            Crie sua conta para destravar mentorias, desafios e comunidades de aprendizagem.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[color:var(--text-primary)] mb-3">
            Como você quer se cadastrar?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('viewer')}
              className={`rounded-lg border-2 p-4 text-left transition ${
                role === 'viewer'
                  ? 'border-[color:var(--coral)] bg-[color:var(--coral)]/5'
                  : 'border-[color:var(--border-soft)] hover:border-[color:var(--coral)]/50'
              }`}
            >
              <div className="text-2xl mb-1">👤</div>
              <div className="font-semibold text-sm">Estudante/Visitante</div>
              <div className="text-xs text-[color:var(--text-muted)] mt-1">
                Acessar conteúdo e mentorias
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('researcher')}
              className={`rounded-lg border-2 p-4 text-left transition ${
                role === 'researcher'
                  ? 'border-[color:var(--coral)] bg-[color:var(--coral)]/5'
                  : 'border-[color:var(--border-soft)] hover:border-[color:var(--coral)]/50'
              }`}
            >
              <div className="text-2xl mb-1">🎓</div>
              <div className="font-semibold text-sm">Pesquisador</div>
              <div className="text-xs text-[color:var(--text-muted)] mt-1">
                Criar e compartilhar conteúdo
              </div>
            </button>
          </div>
        </div>

        {/* Social Signup */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialSignup('google')}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[color:var(--border-soft)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </button>

          <button
            onClick={() => handleSocialSignup('github')}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--charcoal)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continuar com GitHub
          </button>
        </div>

        <div className="relative my-6 text-center text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color:var(--border-soft)]" />
          <span className="relative inline-flex bg-[color:var(--background)] px-4">
            ou cadastre-se com e-mail
          </span>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[color:var(--text-primary)]">
              Nome completo
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-4 py-2 text-[color:var(--text-primary)] focus:border-[color:var(--coral)] focus:outline-none focus:ring-2 focus:ring-[color:var(--coral)]/20"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[color:var(--text-primary)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-4 py-2 text-[color:var(--text-primary)] focus:border-[color:var(--coral)] focus:outline-none focus:ring-2 focus:ring-[color:var(--coral)]/20"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[color:var(--text-primary)]">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-4 py-2 text-[color:var(--text-primary)] focus:border-[color:var(--coral)] focus:outline-none focus:ring-2 focus:ring-[color:var(--coral)]/20"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {role === 'researcher' && (
            <div className="rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-semibold text-blue-900">ℹ️ Conta de Pesquisador</p>
              <p className="mt-1 text-blue-700">
                Após o cadastro, você precisará enviar documentos para verificação antes de ter acesso ao Studio.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-[color:var(--coral)] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--coral)]/90 disabled:opacity-50"
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[color:var(--text-muted)]">
          Já tem conta?{' '}
          <Link href="/auth/login" className="font-semibold text-[color:var(--coral)] hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
