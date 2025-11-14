import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Profile } from '@/lib/supabase/types';

interface ResearcherWithProfile {
  user_id: string;
  bio: string | null;
  expertise: string[] | null;
  institution: string | null;
  profile: Profile;
  video_count?: number;
  post_count?: number;
}

export default async function ResearchersListPage() {
  const supabase = await createClient();

  // Get all approved researchers with their profiles
  const { data: researchers } = await supabase
    .from('researcher_profiles')
    .select(`
      user_id,
      bio,
      expertise,
      institution,
      profile:profiles!user_id (
        id,
        full_name,
        avatar_url,
        email
      )
    `)
    .eq('verification_status', 'approved');

  // Get content counts for each researcher
  const researchersWithCounts = await Promise.all(
    (researchers || []).map(async (researcher) => {
      const [videosResult, postsResult] = await Promise.all([
        supabase
          .from('videos')
          .select('id', { count: 'exact', head: true })
          .eq('researcher_id', researcher.user_id)
          .eq('published', true),
        supabase
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('researcher_id', researcher.user_id)
          .eq('published', true),
      ]);

      return {
        ...researcher,
        video_count: videosResult.count || 0,
        post_count: postsResult.count || 0,
      };
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
          Nossos Pesquisadores
        </h1>
        <p className="mt-2 text-[color:var(--text-muted)]">
          Conheça os especialistas que compartilham conhecimento na plataforma
        </p>
      </div>

      {/* Researchers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {researchersWithCounts.map((researcher) => (
          <ResearcherCard key={researcher.user_id} researcher={researcher} />
        ))}
      </div>

      {researchersWithCounts.length === 0 && (
        <div className="rounded-lg border border-dashed border-[color:var(--border-soft)] p-12 text-center">
          <p className="text-lg text-[color:var(--text-muted)]">
            Nenhum pesquisador disponível no momento
          </p>
        </div>
      )}
    </div>
  );
}

function ResearcherCard({ researcher }: { researcher: ResearcherWithProfile }) {
  const profile = researcher.profile as Profile;

  return (
    <Link
      href={`/platform/researchers/${researcher.user_id}`}
      className="group rounded-lg border border-[color:var(--border-soft)] bg-white p-6 transition hover:shadow-lg"
    >
      {/* Avatar & Name */}
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--coral)] text-2xl font-semibold text-white">
          {profile.full_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--coral)]">
            {profile.full_name}
          </h3>
          {researcher.institution && (
            <p className="text-sm text-[color:var(--text-muted)]">
              {researcher.institution}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      {researcher.bio && (
        <p className="mt-4 text-sm text-[color:var(--text-muted)] line-clamp-3">
          {researcher.bio}
        </p>
      )}

      {/* Expertise */}
      {researcher.expertise && researcher.expertise.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {researcher.expertise.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {skill}
            </span>
          ))}
          {researcher.expertise.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              +{researcher.expertise.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 flex items-center gap-4 border-t border-[color:var(--border-soft)] pt-4 text-sm text-[color:var(--text-muted)]">
        <span>🎬 {researcher.video_count} vídeos</span>
        <span>📝 {researcher.post_count} posts</span>
      </div>

      <div className="mt-4 flex items-center text-sm font-medium text-[color:var(--coral)]">
        Ver perfil completo →
      </div>
    </Link>
  );
}

