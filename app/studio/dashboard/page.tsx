import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Video, Post } from '@/lib/supabase/types';

export default async function StudioDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch researcher's videos
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('researcher_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5) as { data: Video[] | null };

  // Fetch researcher's posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('researcher_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5) as { data: Post[] | null };

  // Calculate stats
  const totalVideos = videos?.length || 0;
  const totalPosts = posts?.length || 0;
  const totalViews = videos?.reduce((sum, v) => sum + (v.view_count || 0), 0) || 0;
  const totalReads = posts?.reduce((sum, p) => sum + (p.read_count || 0), 0) || 0;
  const publishedVideos = videos?.filter((v) => v.published).length || 0;
  const publishedPosts = posts?.filter((p) => p.published).length || 0;

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
          Dashboard
        </h1>
        <p className="text-[color:var(--text-secondary)]">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="🎬"
          label="Total Videos"
          value={totalVideos}
          subtitle={`${publishedVideos} published`}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon="📝"
          label="Total Articles"
          value={totalPosts}
          subtitle={`${publishedPosts} published`}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          icon="👁️"
          label="Total Views"
          value={totalViews}
          subtitle="All time"
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          icon="📖"
          label="Total Reads"
          value={totalReads}
          subtitle="All time"
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/studio/videos/new"
          className="group relative overflow-hidden bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] rounded-xl p-6 hover:shadow-xl hover:shadow-[color:var(--primary)]/20 transition-all"
        >
          <div className="relative z-10">
            <div className="text-4xl mb-3">🎥</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Create New Video
            </h3>
            <p className="text-white/80 text-sm">
              Share your knowledge with video content
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>

        <Link
          href="/studio/posts/new"
          className="group relative overflow-hidden bg-gradient-to-br from-[color:var(--accent)] to-purple-600 rounded-xl p-6 hover:shadow-xl hover:shadow-[color:var(--accent)]/20 transition-all"
        >
          <div className="relative z-10">
            <div className="text-4xl mb-3">✍️</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Write New Article
            </h3>
            <p className="text-white/80 text-sm">
              Create in-depth articles and tutorials
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Videos */}
        <div className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              Recent Videos
            </h2>
            <Link
              href="/studio/videos"
              className="text-sm text-[color:var(--primary)] hover:text-[color:var(--primary-hover)] font-medium"
            >
              View all →
            </Link>
          </div>

          {videos && videos.length > 0 ? (
            <div className="space-y-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[color:var(--surface-hover)] transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--surface-hover)] rounded-lg flex items-center justify-center text-xl">
                    🎬
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[color:var(--text-primary)] truncate">
                        {video.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[color:var(--text-muted)]">
                        {video.view_count || 0} views
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          video.published
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {video.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎥</div>
              <p className="text-sm text-[color:var(--text-secondary)]">
                No videos yet. Create your first one!
              </p>
            </div>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              Recent Articles
            </h2>
            <Link
              href="/studio/posts"
              className="text-sm text-[color:var(--primary)] hover:text-[color:var(--primary-hover)] font-medium"
            >
              View all →
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[color:var(--surface-hover)] transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--surface-hover)] rounded-lg flex items-center justify-center text-xl">
                    📝
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[color:var(--text-primary)] truncate">
                        {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[color:var(--text-muted)]">
                        {post.read_count || 0} reads
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          post.published
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm text-[color:var(--text-secondary)]">
                No articles yet. Write your first one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtitle,
  gradient,
}: {
  icon: string;
  label: string;
  value: number;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6 hover:border-[color:var(--border-hover)] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-[color:var(--text-secondary)] mb-1">
          {label}
        </p>
        <p className="text-3xl font-bold text-[color:var(--text-primary)] mb-1">
          {value}
        </p>
        <p className="text-xs text-[color:var(--text-muted)]">{subtitle}</p>
      </div>
    </div>
  );
}
