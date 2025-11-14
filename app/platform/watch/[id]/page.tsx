import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { canAccessContent } from '@/lib/utils/access-control';
import type { Video, Profile } from '@/lib/supabase/types';

interface VideoWithResearcher extends Video {
  researcher?: {
    full_name: string;
    avatar_url: string | null;
    id: string;
  };
}

export default async function WatchVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  // Get video with researcher info
  const { data: video, error } = await supabase
    .from('videos')
    .select(`
      *,
      researcher:profiles!researcher_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('id', id)
    .eq('published', true)
    .single();

  if (error || !video) {
    notFound();
  }

  const typedVideo = video as unknown as VideoWithResearcher;
  const hasAccess = canAccessContent(userTier, typedVideo.required_tier);

  // Get video embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be/')
        ? url.split('youtu.be/')[1].split('?')[0]
        : new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1].split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
      {/* Video Player or Paywall */}
      {hasAccess ? (
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
                  src={getEmbedUrl(typedVideo.video_url)}
                  className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
                ></iframe>
        </div>
      ) : (
              <div className="relative aspect-video bg-[color:var(--surface)] rounded-xl overflow-hidden border border-[color:var(--border)]">
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-black/60">
                  <div className="text-center max-w-md px-6">
            <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Upgrade to Access
                    </h3>
                    <p className="text-white/80 mb-6">
                      This video requires a {getTierName(typedVideo.required_tier)} subscription or higher.
            </p>
            <Link
              href="/pricing"
                      className="inline-block px-8 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
                      View Plans
            </Link>
                  </div>
          </div>
        </div>
      )}

      {/* Video Info */}
            <div>
              <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">
              {typedVideo.title}
            </h1>
            
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href={`/platform/researchers/${typedVideo.researcher?.id}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] flex items-center justify-center text-lg font-semibold text-white">
              {typedVideo.researcher?.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-[color:var(--text-primary)]">
                {typedVideo.researcher?.full_name}
              </p>
                    <p className="text-sm text-[color:var(--text-secondary)]">
                      Researcher
                    </p>
                  </div>
              </Link>

                <div className="ml-auto flex items-center gap-4">
                  <span className="text-sm text-[color:var(--text-secondary)]">
                    {typedVideo.view_count || 0} views
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getTierColor(typedVideo.required_tier)}`}>
                    {getTierName(typedVideo.required_tier)}
                  </span>
          </div>
        </div>

        {typedVideo.description && (
                <div className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6">
                  <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-3">
                    About
            </h2>
                  <p className="text-[color:var(--text-secondary)] whitespace-pre-wrap">
              {typedVideo.description}
            </p>
          </div>
        )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
        {/* Tags */}
        {typedVideo.tags && typedVideo.tags.length > 0 && (
              <div className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6">
                <h3 className="text-lg font-semibold text-[color:var(--text-primary)] mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {typedVideo.tags.map((tag) => (
                <span
                  key={tag}
                      className="px-3 py-1.5 bg-[color:var(--surface-hover)] rounded-lg text-sm text-[color:var(--text-secondary)]"
                >
                      {tag}
                </span>
              ))}
            </div>
          </div>
        )}

            {/* CTA */}
            {!hasAccess && (
              <div className="bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  Want full access?
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Upgrade your plan to unlock this content and more.
                </p>
                <Link
                  href="/pricing"
                  className="block text-center px-6 py-3 bg-white text-[color:var(--primary)] font-semibold rounded-lg hover:bg-white/90 transition-colors"
                >
                  Upgrade Now
                </Link>
              </div>
            )}
          </div>
        </div>
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
