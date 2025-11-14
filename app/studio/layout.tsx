import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function StudioLayout({
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
    .select('*, researcher_profile:researcher_profiles(*)')
    .eq('id', user.id)
    .single();

  // Only researchers and admins can access studio
  if (profile?.role !== 'researcher' && profile?.role !== 'admin') {
    redirect('/platform/feed');
  }

  const navItems = [
    { href: '/studio/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/studio/videos', label: 'Videos', icon: '🎬' },
    { href: '/studio/posts', label: 'Articles', icon: '📝' },
    { href: '/studio/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="flex min-h-screen bg-[color:var(--background)]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-[color:var(--border)] bg-[color:var(--surface)] lg:block">
        <div className="flex h-16 items-center border-b border-[color:var(--border)] px-6">
          <Link
            href="/studio/dashboard"
            className="text-xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent"
          >
            Studio
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text-primary)] transition-colors group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/platform/feed"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--border)] px-4 py-3 text-sm font-medium text-[color:var(--text-primary)] hover:bg-[color:var(--surface-hover)] transition-colors"
          >
            ← View as Visitor
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4 lg:hidden">
              <Link
                href="/studio/dashboard"
                className="text-lg font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] bg-clip-text text-transparent"
              >
                Studio
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-[color:var(--text-primary)]">
                  {profile?.full_name}
                </p>
                <p className="text-xs text-[color:var(--text-secondary)]">
                  Researcher
                </p>
              </div>
              <Link
                href="/platform/settings"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                {profile?.full_name?.charAt(0).toUpperCase()}
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
