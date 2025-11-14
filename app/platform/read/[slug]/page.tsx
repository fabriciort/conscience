import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { canAccessContent } from '@/lib/utils/access-control';
import type { Post, Profile } from '@/lib/supabase/types';

interface PostWithResearcher extends Post {
  researcher?: {
    full_name: string;
    avatar_url: string | null;
    id: string;
  };
}

export default async function ReadPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

  const userTier = profile?.subscription_tier || 'free';

  // Get post with researcher info
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      researcher:profiles!researcher_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    notFound();
  }

  const typedPost = post as unknown as PostWithResearcher;
  const hasAccess = canAccessContent(userTier, typedPost.required_tier);

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Post Header */}
      <article>
        <header className="mb-8">
          {/* Title */}
            <h1 className="text-4xl font-bold text-[color:var(--text-primary)] mb-4">
            {typedPost.title}
          </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <Link
                href={`/platform/researchers/${typedPost.researcher?.id}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] flex items-center justify-center text-lg font-semibold text-white">
                {typedPost.researcher?.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-[color:var(--text-primary)]">
                  {typedPost.researcher?.full_name}
                </p>
                  <p className="text-sm text-[color:var(--text-secondary)]">
                    Researcher
                  </p>
                </div>
                </Link>

              <div className="ml-auto flex items-center gap-4">
                <span className="text-sm text-[color:var(--text-secondary)]">
                  {typedPost.read_count || 0} reads
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getTierColor(typedPost.required_tier)}`}>
                  {getTierName(typedPost.required_tier)}
                </span>
              </div>
            </div>

            {/* Cover Image */}
            {typedPost.cover_image_url && (
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img
                  src={typedPost.cover_image_url}
                  alt={typedPost.title}
                  className="w-full h-full object-cover"
                />
          </div>
            )}
        </header>

          {/* Content or Paywall */}
        {hasAccess ? (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mt-8 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold text-[color:var(--text-primary)] mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-[color:var(--text-secondary)] leading-relaxed mb-4" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-[color:var(--primary)] hover:text-[color:var(--primary-hover)] underline" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-[color:var(--text-secondary)] space-y-2 mb-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside text-[color:var(--text-secondary)] space-y-2 mb-4" {...props} />
                  ),
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code className="px-2 py-0.5 bg-[color:var(--surface)] rounded text-[color:var(--primary)] font-mono text-sm" {...props} />
                    ) : (
                      <code className="block p-4 bg-[color:var(--surface)] rounded-lg text-[color:var(--text-primary)] font-mono text-sm overflow-x-auto mb-4" {...props} />
                    ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-[color:var(--primary)] pl-4 italic text-[color:var(--text-secondary)] my-4" {...props} />
                  ),
                }}
              >
                {typedPost.content}
              </ReactMarkdown>
          </div>
        ) : (
            <div className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-12 text-center">
            <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-3">
                Upgrade to Continue Reading
              </h3>
              <p className="text-[color:var(--text-secondary)] mb-6 max-w-md mx-auto">
                This article requires a {getTierName(typedPost.required_tier)} subscription or higher to access the full content.
            </p>
            <Link
              href="/pricing"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
                View Plans
            </Link>
          </div>
        )}

        {/* Tags */}
        {typedPost.tags && typedPost.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[color:var(--border)]">
              <h3 className="text-sm font-semibold text-[color:var(--text-secondary)] uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {typedPost.tags.map((tag) => (
                <span
                  key={tag}
                    className="px-4 py-2 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-lg text-sm text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-hover)] transition-colors"
                >
                    {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

        {/* CTA */}
        {!hasAccess && (
          <div className="mt-8 bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              Unlock Full Access
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Get unlimited access to all articles, videos, and exclusive content from our researchers.
            </p>
            <Link
              href="/pricing"
              className="inline-block px-8 py-3 bg-white text-[color:var(--primary)] font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              View All Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function getTierName(tier: string): string {
  const names: Record<string, string> = {
    free: 'Free',
    essential: 'Essential',
    advanced: 'Advanced',
    corporate: 'Corporate',
  };
  return names[tier] || tier;
}

function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    free: 'bg-gray-500/10 text-gray-400',
    essential: 'bg-purple-500/10 text-purple-400',
    advanced: 'bg-rose-500/10 text-rose-400',
    corporate: 'bg-amber-500/10 text-amber-400',
  };
  return colors[tier] || 'bg-gray-500/10 text-gray-400';
}
