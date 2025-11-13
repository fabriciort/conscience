'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from '../components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
      // Redirect to dashboard or show error
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card padding="lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Bem-vindo de volta</CardTitle>
              <CardDescription>
                Entre na sua conta para continuar
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  label="Email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  fullWidth
                  autoComplete="email"
                />

                <Input
                  type="password"
                  label="Senha"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  fullWidth
                  autoComplete="current-password"
                />

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-coral focus:ring-coral focus:ring-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Lembrar de mim</span>
                  </label>
                  <Link 
                    href="/recuperar-senha" 
                    className="text-coral hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Entrar
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                      Ou continue com
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Entrar com Google"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    className="flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Entrar com Apple"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Entrar com Facebook"
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Não tem uma conta?{' '}
                <Link href="/cadastro" className="text-coral hover:underline font-medium">
                  Cadastre-se gratuitamente
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

