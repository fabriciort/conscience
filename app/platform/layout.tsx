import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Profile } from '@/lib/supabase/types';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: Profile | null };

  const handleLogout = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/platform/feed"
              className="text-xl font-bold text-[color:var(--text-primary)] hover:text-[color:var(--primary)] transition-colors"
            >
              Conscience
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/platform/feed"
                className="text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                Feed
              </Link>
              <Link
                href="/platform/researchers"
                className="text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                Researchers
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Tier Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[color:var(--surface-hover)] border border-[color:var(--border)]">
              <div className="w-2 h-2 rounded-full bg-[color:var(--primary)]"></div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                {profile?.subscription_tier || 'free'}
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
            <Link
              href="/platform/settings"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
                {profile?.full_name?.charAt(0).toUpperCase()}
            </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
