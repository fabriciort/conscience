'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' as 'researcher' | 'professional' | 'student' | 'company',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // TODO: Implement actual signup logic
    console.log('Signup attempt:', formData);
    setIsLoading(false);
  };

  const handleSocialSignup = (provider: 'google' | 'apple' | 'facebook') => {
    // TODO: Implement social signup
    console.log(`Signup with ${provider}`);
  };

  const userTypeLabels = {
    researcher: 'Pesquisador',
    professional: 'Profissional',
    student: 'Estudante',
    company: 'Empresa',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 md:py-16 px-4">
        <div className="w-full max-w-md">
          <Card className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--charcoal)] mb-2">
                Criar conta
              </h1>
              <p className="text-[var(--text-secondary)]">
                Junte-se à comunidade Consciência
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="name"
                name="name"
                type="text"
                label="Nome completo"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-[var(--charcoal)] mb-2">
                  Tipo de usuário
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent text-[var(--charcoal)] bg-white"
                >
                  {Object.entries(userTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirmar senha"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="mt-1 w-4 h-4 text-[var(--coral)] border-gray-300 rounded focus:ring-[var(--coral)]"
                />
                <label htmlFor="terms" className="text-sm text-[var(--text-secondary)]">
                  Eu concordo com os{' '}
                  <Link href="/terms" className="text-[var(--coral)] hover:underline">
                    Termos de Serviço
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-[var(--coral)] hover:underline">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[var(--text-secondary)]">
                    Ou continue com
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialSignup('google')}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  aria-label="Signup with Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialSignup('apple')}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  aria-label="Signup with Apple"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialSignup('facebook')}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  aria-label="Signup with Facebook"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[var(--coral)] font-semibold hover:underline">
                Entrar
              </Link>
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

