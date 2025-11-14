import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { canAccessContent } from '@/lib/utils/access-control';
import type { Profile, Video, Post } from '@/lib/supabase/types';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'post';
  thumbnail_url?: string | null;
  cover_image_url?: string | null;
  excerpt?: string | null;
  description?: string | null;
  required_tier: string;
  tags?: string[] | null;
  view_count?: number;
  read_count?: number;
  researcher: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  created_at: string;
  slug?: string;
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; category?: string }>;
}) {
  const { filter = 'all', category } = await searchParams;
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
    
  if (!profile) {
    redirect('/auth/login');
  }

  const userTier = profile.subscription_tier || 'free';

  // Fetch videos
  const { data: videos } = await supabase
    .from('videos')
    .select(`
      *,
      researcher:profiles!researcher_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20) as { data: any[] | null };

  // Fetch posts
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      researcher:profiles!researcher_id (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20) as { data: any[] | null };

  // Combine and format content
  let allContent: ContentItem[] = [];

  if (videos) {
    allContent = [
      ...allContent,
      ...videos.map((v) => ({
        ...v,
        type: 'video' as const,
        researcher: Array.isArray(v.researcher) ? v.researcher[0] : v.researcher,
      })),
    ];
  }

  if (posts) {
    allContent = [
      ...allContent,
      ...posts.map((p) => ({
        ...p,
        type: 'post' as const,
        researcher: Array.isArray(p.researcher) ? p.researcher[0] : p.researcher,
      })),
    ];
  }

  // Filter content
  if (filter === 'videos') {
    allContent = allContent.filter((c) => c.type === 'video');
  } else if (filter === 'posts') {
    allContent = allContent.filter((c) => c.type === 'post');
  }

  if (category) {
    allContent = allContent.filter((c) =>
      c.tags?.some((tag) => tag.toLowerCase() === category.toLowerCase())
    );
  }

  // Sort by date
  allContent.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Get unique categories
  const allTags = allContent.flatMap((c) => c.tags || []);
  const categories = Array.from(new Set(allTags)).slice(0, 10);

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
            Explore Content
        </h1>
          <p className="text-[color:var(--text-secondary)]">
            Discover videos and articles from our researchers
        </p>
      </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <FilterButton
            href="/platform/feed?filter=all"
            active={filter === 'all'}
            label="All Content"
          />
          <FilterButton
            href="/platform/feed?filter=videos"
            active={filter === 'videos'}
            label="Videos"
          />
          <FilterButton
            href="/platform/feed?filter=posts"
            active={filter === 'posts'}
            label="Articles"
          />
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-[color:var(--text-secondary)] uppercase tracking-wide mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/platform/feed?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-[color:var(--primary)] text-white'
                      : 'bg-[color:var(--surface)] text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-hover)]'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        {allContent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">📚</div>
            <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-2">
              No content yet
            </h3>
            <p className="text-[color:var(--text-secondary)]">
              Check back soon for new videos and articles
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContent.map((content) => (
              <ContentCard
                key={`${content.type}-${content.id}`}
                content={content}
                userTier={userTier}
              />
        ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
        active
          ? 'bg-[color:var(--primary)] text-white shadow-lg shadow-[color:var(--primary)]/20'
          : 'bg-[color:var(--surface)] text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-hover)]'
      }`}
    >
      {label}
    </Link>
  );
}

function ContentCard({
  content,
  userTier,
}: {
  content: ContentItem;
  userTier: string;
}) {
  const hasAccess = canAccessContent(userTier, content.required_tier);
  const link =
    content.type === 'video'
      ? `/platform/watch/${content.id}`
      : `/platform/read/${content.slug}`;

  const thumbnail =
    content.type === 'video' ? content.thumbnail_url : content.cover_image_url;

  return (
    <Link
      href={link}
      className="group relative bg-[color:var(--surface)] rounded-xl overflow-hidden border border-[color:var(--border)] hover:border-[color:var(--border-hover)] transition-all hover:shadow-xl hover:shadow-black/20"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[color:var(--surface-hover)] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {content.type === 'video' ? '🎥' : '📄'}
          </div>
        )}

        {/* Lock overlay if no access */}
        {!hasAccess && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm font-semibold text-white">
                {getTierDisplayName(content.required_tier)} Required
              </div>
            </div>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-md text-xs font-semibold text-white">
            {content.type === 'video' ? '▶ Video' : '📝 Article'}
          </span>
            </div>

        {/* Tier badge */}
        {content.required_tier !== 'free' && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getTierColorClass(
                content.required_tier
              )}`}
            >
              {getTierDisplayName(content.required_tier)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[color:var(--text-primary)] line-clamp-2 mb-2 group-hover:text-[color:var(--primary)] transition-colors">
          {content.title}
        </h3>
        
        {(content.description || content.excerpt) && (
          <p className="text-sm text-[color:var(--text-secondary)] line-clamp-2 mb-3">
            {content.description || content.excerpt}
          </p>
        )}

        {/* Researcher Info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[color:var(--primary)] flex items-center justify-center text-xs font-semibold text-white">
            {content.researcher?.full_name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-[color:var(--text-secondary)]">
            {content.researcher?.full_name}
          </span>
        </div>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {content.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[color:var(--surface-hover)] rounded text-xs text-[color:var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function getTierDisplayName(tier: string): string {
  const names: Record<string, string> = {
    free: 'Free',
    essential: 'Essential',
    advanced: 'Advanced',
    corporate: 'Corporate',
  };
  return names[tier] || tier;
}

function getTierColorClass(tier: string): string {
  const colors: Record<string, string> = {
    free: 'bg-gray-600/80 backdrop-blur-sm text-white',
    essential: 'bg-purple-600/80 backdrop-blur-sm text-white',
    advanced: 'bg-rose-600/80 backdrop-blur-sm text-white',
    corporate: 'bg-amber-600/80 backdrop-blur-sm text-white',
  };
  return colors[tier] || 'bg-gray-600/80 backdrop-blur-sm text-white';
}
