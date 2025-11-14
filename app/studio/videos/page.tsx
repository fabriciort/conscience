import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Video } from '@/lib/supabase/types';

export default async function StudioVideosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('researcher_id', user.id)
    .order('created_at', { ascending: false }) as { data: Video[] | null };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
            My Videos
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            Manage your video content
          </p>
        </div>
        <Link
          href="/studio/videos/new"
          className="px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + New Video
        </Link>
      </div>

      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] overflow-hidden hover:border-[color:var(--border-hover)] transition-colors"
            >
              <div className="aspect-video bg-[color:var(--surface-hover)] flex items-center justify-center text-4xl">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  '🎬'
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[color:var(--text-primary)] line-clamp-2 mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[color:var(--text-muted)]">
                    {video.view_count || 0} views
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
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
        <div className="flex flex-col items-center justify-center py-16 text-center bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)]">
          <div className="text-6xl mb-4">🎥</div>
          <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-2">
            No videos yet
          </h3>
          <p className="text-[color:var(--text-secondary)] mb-6">
            Create your first video to get started
          </p>
          <Link
            href="/studio/videos/new"
            className="px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Video
          </Link>
        </div>
      )}
    </div>
  );
}
