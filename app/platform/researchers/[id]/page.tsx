import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatViewCount, formatDuration } from '@/lib/utils/dev-helpers';
import { getTierColor, getTierDisplayName } from '@/lib/utils/access-control';
import type { Profile, ResearcherProfile, Video, Post } from '@/lib/supabase/types';

export default async function ResearcherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Get researcher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single() as { data: Profile | null };

  if (!profile) {
    notFound();
  }

  const { data: researcherProfile } = await supabase
    .from('researcher_profiles')
    .select('*')
    .eq('user_id', id)
    .eq('verification_status', 'approved')
    .single() as { data: ResearcherProfile | null };

  if (!researcherProfile) {
    notFound();
  }

  // Get researcher's published videos
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('researcher_id', id)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(6) as { data: Video[] | null };

  // Get researcher's published posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('researcher_id', id)
    .eq('published', true)
    .order('published_at', { ascending: false})
    .limit(6) as { data: Post[] | null };

  // Calculate stats
  const totalVideos = videos?.length || 0;
  const totalPosts = posts?.length || 0;
  const totalViews = videos?.reduce((sum, v) => sum + (v.view_count || 0), 0) || 0;
  const totalReads = posts?.reduce((sum, p) => sum + (p.read_count || 0), 0) || 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Profile Header */}
      <div className="rounded-lg border border-[color:var(--border-soft)] bg-white p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--coral)] text-5xl font-semibold text-white">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
              {profile.full_name}
            </h1>
            
            {researcherProfile.institution && (
              <p className="mt-2 text-lg text-[color:var(--text-muted)]">
                {researcherProfile.institution}
              </p>
            )}

            {researcherProfile.bio && (
              <p className="mt-4 text-[color:var(--text-muted)]">
                {researcherProfile.bio}
              </p>
            )}

            {/* Expertise */}
            {researcherProfile.expertise && researcherProfile.expertise.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {researcherProfile.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[color:var(--peach)]/30 px-3 py-1 text-sm font-medium text-[color:var(--charcoal)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-2xl font-bold text-[color:var(--text-primary)]">
                  {totalVideos}
                </p>
                <p className="text-sm text-[color:var(--text-muted)]">Vídeos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[color:var(--text-primary)]">
                  {totalPosts}
                </p>
                <p className="text-sm text-[color:var(--text-muted)]">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[color:var(--text-primary)]">
                  {formatViewCount(totalViews)}
                </p>
                <p className="text-sm text-[color:var(--text-muted)]">Visualizações</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[color:var(--text-primary)]">
                  {formatViewCount(totalReads)}
                </p>
                <p className="text-sm text-[color:var(--text-muted)]">Leituras</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      {videos && videos.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[color:var(--text-primary)]">
              Vídeos Recentes
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/platform/watch/${video.id}`}
                className="group overflow-hidden rounded-lg border border-[color:var(--border-soft)] bg-white transition hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--peach)] to-[color:var(--sage)]">
                      <span className="text-4xl">🎬</span>
                    </div>
                  )}
                  
                  {video.duration_seconds && (
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                      {formatDuration(video.duration_seconds)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-[color:var(--text-primary)] line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <div className="mt-2 flex items-center justify-between text-xs text-[color:var(--text-muted)]">
                    <span>{formatViewCount(video.view_count)} visualizações</span>
                    {video.required_tier !== 'free' && (
                      <span className={`rounded-full px-2 py-0.5 ${getTierColor(video.required_tier)}`}>
                        {getTierDisplayName(video.required_tier)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Posts Section */}
      {posts && posts.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[color:var(--text-primary)]">
              Posts Recentes
            </h2>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/platform/read/${post.slug}`}
                className="block rounded-lg border border-[color:var(--border-soft)] bg-white p-6 transition hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  {post.cover_image_url && (
                    <div className="h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-[color:var(--text-primary)]">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-[color:var(--text-muted)] line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="mt-2 flex items-center gap-3 text-xs text-[color:var(--text-muted)]">
                      <span>{formatViewCount(post.read_count)} leituras</span>
                      {post.required_tier !== 'free' && (
                        <>
                          <span>•</span>
                          <span className={`rounded-full px-2 py-0.5 ${getTierColor(post.required_tier)}`}>
                            {getTierDisplayName(post.required_tier)}
                          </span>
                        </>
                      )}
                      {post.published_at && (
                        <>
                          <span>•</span>
                          <span>{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!videos || videos.length === 0) && (!posts || posts.length === 0) && (
        <div className="mt-8 rounded-lg border border-dashed border-[color:var(--border-soft)] p-12 text-center">
          <p className="text-lg text-[color:var(--text-muted)]">
            Este pesquisador ainda não publicou nenhum conteúdo
          </p>
        </div>
      )}
    </div>
  );
}

