'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Preços', href: '/precos' },
    { name: 'Mentores', href: '/mentores' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 dark:bg-charcoal/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-bold text-charcoal dark:text-cream hover:text-coral transition-colors"
          >
            Consciência
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal dark:text-cream hover:text-coral transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button variant="primary" size="sm">
                Começar Agora
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-charcoal dark:text-cream hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menu de navegação"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-charcoal dark:text-cream hover:text-coral transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Link href="/login" className="block">
                <Button variant="ghost" size="md" fullWidth>
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" className="block">
                <Button variant="primary" size="md" fullWidth>
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

