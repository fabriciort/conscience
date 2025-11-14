'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/lib/supabase/types';

const navigation = [
  { label: 'Inspiração', href: '/#inspiration' },
  { label: 'Tech', href: '/#tech' },
  { label: 'Experts', href: '/#experts' },
  { label: 'Aprender', href: '/#learn' },
  { label: 'Operações', href: '/#operations' },
];

export const HeaderDynamic = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const loadProfile = async (id: string) => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      setProfile(profileData as Profile);
    };

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await loadProfile(user.id);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await loadProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    router.push('/');
  };

  const getDashboardLink = () => {
    if (profile?.role === 'researcher' || profile?.role === 'admin') {
      return '/studio/dashboard';
    }
    return '/platform/feed';
  };

  const editionLink = '/#newsletter';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold uppercase tracking-[0.35em] text-white"
          >
            The Column
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={editionLink}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white"
          >
            Edição Atual
          </Link>

          {user ? (
            <>
              <Link
                href={getDashboardLink()}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Acessar {profile?.role === 'researcher' ? 'Studio' : 'Plataforma'}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Entrar
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Assinar
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-full p-2 text-white md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/90 px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href={editionLink}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
            >
              Edição Atual
            </Link>

            {user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black"
                >
                  Acessar {profile?.role === 'researcher' ? 'Studio' : 'Plataforma'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white/80"
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black"
                >
                  Assinar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

