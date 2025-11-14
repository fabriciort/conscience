-- ====================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Execute após criar as tabelas
-- ====================================

-- ====================================
-- PROFILES
-- ====================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Todos podem ver perfis públicos
CREATE POLICY "profiles_public_read"
  ON profiles FOR SELECT
  USING (true);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "profiles_own_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Inserção automática via trigger (será criado depois)
CREATE POLICY "profiles_own_insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ====================================
-- RESEARCHER_PROFILES
-- ====================================
ALTER TABLE researcher_profiles ENABLE ROW LEVEL SECURITY;

-- Todos podem ver pesquisadores aprovados
CREATE POLICY "researcher_profiles_approved_read"
  ON researcher_profiles FOR SELECT
  USING (verification_status = 'approved');

-- Pesquisador pode ver seu próprio perfil (mesmo não aprovado)
CREATE POLICY "researcher_profiles_own_read"
  ON researcher_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Pesquisador pode atualizar seu próprio perfil
CREATE POLICY "researcher_profiles_own_update"
  ON researcher_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Pesquisador pode criar seu perfil
CREATE POLICY "researcher_profiles_own_insert"
  ON researcher_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ====================================
-- VIDEOS
-- ====================================
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Todos podem ver vídeos publicados
CREATE POLICY "videos_published_read"
  ON videos FOR SELECT
  USING (published = true);

-- Pesquisador pode ver seus próprios vídeos (incluindo não publicados)
CREATE POLICY "videos_own_read"
  ON videos FOR SELECT
  USING (auth.uid() = researcher_id);

-- Pesquisador pode criar vídeos
CREATE POLICY "videos_own_insert"
  ON videos FOR INSERT
  WITH CHECK (
    auth.uid() = researcher_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('researcher', 'admin')
    )
  );

-- Pesquisador pode atualizar seus vídeos
CREATE POLICY "videos_own_update"
  ON videos FOR UPDATE
  USING (auth.uid() = researcher_id)
  WITH CHECK (auth.uid() = researcher_id);

-- Pesquisador pode deletar seus vídeos
CREATE POLICY "videos_own_delete"
  ON videos FOR DELETE
  USING (auth.uid() = researcher_id);

-- ====================================
-- POSTS
-- ====================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Todos podem ver posts publicados
CREATE POLICY "posts_published_read"
  ON posts FOR SELECT
  USING (published = true);

-- Pesquisador pode ver seus próprios posts
CREATE POLICY "posts_own_read"
  ON posts FOR SELECT
  USING (auth.uid() = researcher_id);

-- Pesquisador pode criar posts
CREATE POLICY "posts_own_insert"
  ON posts FOR INSERT
  WITH CHECK (
    auth.uid() = researcher_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('researcher', 'admin')
    )
  );

-- Pesquisador pode atualizar seus posts
CREATE POLICY "posts_own_update"
  ON posts FOR UPDATE
  USING (auth.uid() = researcher_id)
  WITH CHECK (auth.uid() = researcher_id);

-- Pesquisador pode deletar seus posts
CREATE POLICY "posts_own_delete"
  ON posts FOR DELETE
  USING (auth.uid() = researcher_id);

-- ====================================
-- SUBSCRIPTIONS
-- ====================================
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver suas próprias assinaturas
CREATE POLICY "subscriptions_own_read"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Sistema pode criar assinaturas (via service role ou função)
CREATE POLICY "subscriptions_create"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins podem atualizar assinaturas
CREATE POLICY "subscriptions_admin_update"
  ON subscriptions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- ====================================
-- VIEW_HISTORY
-- ====================================
ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver seu próprio histórico
CREATE POLICY "view_history_own_read"
  ON view_history FOR SELECT
  USING (auth.uid() = user_id);

-- Usuários podem inserir em seu histórico
CREATE POLICY "view_history_own_insert"
  ON view_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Pesquisadores podem ver histórico de seus vídeos
CREATE POLICY "view_history_researcher_read"
  ON view_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = view_history.video_id
      AND videos.researcher_id = auth.uid()
    )
  );

-- ====================================
-- TRIGGER: Auto-create profile on signup
-- ====================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, subscription_tier)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'viewer')::user_role,
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar profile automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================
-- FUNCTION: Get user's current tier
-- ====================================

CREATE OR REPLACE FUNCTION public.get_user_tier(user_id UUID)
RETURNS subscription_tier AS $$
  SELECT subscription_tier
  FROM profiles
  WHERE id = user_id;
$$ LANGUAGE SQL STABLE;

-- ====================================
-- FUNCTION: Check if user can access content
-- ====================================

CREATE OR REPLACE FUNCTION public.can_access_tier(
  user_tier subscription_tier,
  content_tier subscription_tier
)
RETURNS BOOLEAN AS $$
DECLARE
  tier_hierarchy subscription_tier[] := ARRAY['free', 'essential', 'advanced', 'corporate']::subscription_tier[];
  user_index INT;
  content_index INT;
BEGIN
  user_index := array_position(tier_hierarchy, user_tier);
  content_index := array_position(tier_hierarchy, content_tier);
  
  RETURN user_index >= content_index;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ====================================
-- VIEW: Videos with researcher info
-- ====================================

CREATE OR REPLACE VIEW videos_with_researcher AS
SELECT 
  v.*,
  p.full_name as researcher_name,
  p.avatar_url as researcher_avatar,
  rp.bio as researcher_bio,
  rp.expertise as researcher_expertise
FROM videos v
JOIN profiles p ON v.researcher_id = p.id
LEFT JOIN researcher_profiles rp ON v.researcher_id = rp.user_id
WHERE v.published = true;

-- ====================================
-- VIEW: Posts with researcher info
-- ====================================

CREATE OR REPLACE VIEW posts_with_researcher AS
SELECT 
  po.*,
  p.full_name as researcher_name,
  p.avatar_url as researcher_avatar,
  rp.bio as researcher_bio,
  rp.expertise as researcher_expertise
FROM posts po
JOIN profiles p ON po.researcher_id = p.id
LEFT JOIN researcher_profiles rp ON po.researcher_id = rp.user_id
WHERE po.published = true;

-- ====================================
-- GRANT permissions on views
-- ====================================

GRANT SELECT ON videos_with_researcher TO authenticated, anon;
GRANT SELECT ON posts_with_researcher TO authenticated, anon;

-- ====================================
-- CONFIRMAÇÃO
-- ====================================
DO $$
BEGIN
  RAISE NOTICE '✅ RLS Policies criadas com sucesso!';
  RAISE NOTICE '🔒 Todas as tabelas estão protegidas';
  RAISE NOTICE '🔧 Triggers e funções configurados';
END $$;

