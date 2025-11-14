import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Post } from '@/lib/supabase/types';

export default async function StudioPostsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('researcher_id', user.id)
    .order('created_at', { ascending: false }) as { data: Post[] | null };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
            My Articles
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            Manage your article content
          </p>
        </div>
        <Link
          href="/studio/posts/new"
          className="px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + New Article
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6 hover:border-[color:var(--border-hover)] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-[color:var(--surface-hover)] rounded-lg flex items-center justify-center text-2xl">
                  📝
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                    <p className="text-sm text-[color:var(--text-secondary)] line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[color:var(--text-muted)]">
                      {post.read_count || 0} reads
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        post.published
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[color:var(--surface-hover)] rounded text-xs text-[color:var(--text-muted)]"
                          >
                            {tag}
                  </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)]">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-2">
            No articles yet
          </h3>
          <p className="text-[color:var(--text-secondary)] mb-6">
            Write your first article to get started
          </p>
          <Link
            href="/studio/posts/new"
            className="px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Write Article
          </Link>
        </div>
      )}
    </div>
  );
}
