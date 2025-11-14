'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--cream)] border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-[var(--charcoal)]">
            Conscience
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-[var(--charcoal)] hover:text-[var(--coral)] transition-colors">
              Início
            </Link>
            <Link href="/pricing" className="text-[var(--charcoal)] hover:text-[var(--coral)] transition-colors">
              Preços
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Entrar</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Cadastrar</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[var(--charcoal)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-[var(--charcoal)] hover:text-[var(--coral)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-[var(--charcoal)] hover:text-[var(--coral)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Preços
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Entrar</Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full">Cadastrar</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

