import { createClient } from '@/lib/supabase/server';
import { formatViewCount } from '@/lib/utils/dev-helpers';

export default async function StudioAnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all videos and posts
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('researcher_id', user?.id)
    .order('view_count', { ascending: false });

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('researcher_id', user?.id)
    .order('read_count', { ascending: false });

  // Get view history
  const videoIds = videos?.map((v) => v.id) || [];
  const { data: viewHistory } = await supabase
    .from('view_history')
    .select('*')
    .in('video_id', videoIds)
    .order('created_at', { ascending: false })
    .limit(100);

  // Calculate stats
  const totalViews = videos?.reduce((sum, v) => sum + (v.view_count || 0), 0) || 0;
  const totalReads = posts?.reduce((sum, p) => sum + (p.read_count || 0), 0) || 0;
  const totalVideos = videos?.length || 0;
  const totalPosts = posts?.length || 0;
  const publishedVideos = videos?.filter((v) => v.published).length || 0;
  const publishedPosts = posts?.filter((p) => p.published).length || 0;
  
  const avgViewsPerVideo = totalVideos > 0 ? Math.round(totalViews / totalVideos) : 0;
  const avgReadsPerPost = totalPosts > 0 ? Math.round(totalReads / totalPosts) : 0;

  // Completion rate
  const completedViews = viewHistory?.filter((v) => v.completed).length || 0;
  const completionRate = viewHistory && viewHistory.length > 0 
    ? Math.round((completedViews / viewHistory.length) * 100) 
    : 0;

  // Top performing content
  const topVideos = videos?.slice(0, 5) || [];
  const topPosts = posts?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
          Analytics
        </h1>
        <p className="mt-2 text-[color:var(--text-muted)]">
          Acompanhe o desempenho do seu conteúdo
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Visualizações"
          value={formatViewCount(totalViews)}
          subtitle={`${avgViewsPerVideo} média/vídeo`}
          icon="👁️"
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total de Leituras"
          value={formatViewCount(totalReads)}
          subtitle={`${avgReadsPerPost} média/post`}
          icon="📖"
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Taxa de Conclusão"
          value={`${completionRate}%`}
          subtitle={`${completedViews} vídeos completos`}
          icon="✅"
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Conteúdo Total"
          value={`${totalVideos + totalPosts}`}
          subtitle={`${publishedVideos + publishedPosts} publicados`}
          icon="📊"
          color="from-amber-500 to-amber-600"
        />
      </div>

      {/* Top Performing Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Videos */}
        <div className="rounded-lg border border-[color:var(--border-soft)] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">
            🏆 Top 5 Vídeos
          </h2>
          
          {topVideos.length > 0 ? (
            <div className="space-y-3">
              {topVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex items-center gap-3 rounded-lg border border-[color:var(--border-soft)] p-3"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--coral)] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[color:var(--text-primary)] line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-xs text-[color:var(--text-muted)]">
                      {formatViewCount(video.view_count)} visualizações
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--text-muted)]">
              Nenhum vídeo publicado ainda
            </p>
          )}
        </div>

        {/* Top Posts */}
        <div className="rounded-lg border border-[color:var(--border-soft)] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">
            🏆 Top 5 Posts
          </h2>
          
          {topPosts.length > 0 ? (
            <div className="space-y-3">
              {topPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 rounded-lg border border-[color:var(--border-soft)] p-3"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--coral)] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[color:var(--text-primary)] line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-xs text-[color:var(--text-muted)]">
                      {formatViewCount(post.read_count)} leituras
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--text-muted)]">
              Nenhum post publicado ainda
            </p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-[color:var(--border-soft)] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-[color:var(--text-primary)]">
          📈 Atividade Recente
        </h2>
        
        {viewHistory && viewHistory.length > 0 ? (
          <div className="space-y-2">
            {viewHistory.slice(0, 10).map((view) => {
              const video = videos?.find((v) => v.id === view.video_id);
              return (
                <div
                  key={view.id}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--border-soft)] p-3 text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[color:var(--text-primary)]">
                      {video?.title || 'Vídeo'}
                    </p>
                    <p className="text-xs text-[color:var(--text-muted)]">
                      {new Date(view.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {view.completed ? (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        ✓ Completo
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                        Em andamento
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[color:var(--text-muted)]">
            Nenhuma visualização registrada ainda
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[color:var(--border-soft)] bg-white shadow-sm">
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <p className="text-3xl font-bold text-[color:var(--text-primary)]">
              {value}
            </p>
            <p className="text-sm font-medium text-[color:var(--text-muted)]">
              {title}
            </p>
            <p className="text-xs text-[color:var(--text-muted)]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

