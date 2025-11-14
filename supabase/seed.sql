-- ====================================
-- SEED DATA para Development/Testing
-- Execute este arquivo no SQL Editor do Supabase
-- ====================================

-- IMPORTANTE: Primeiro, crie os usuários no Supabase Auth Dashboard ou via API
-- Depois execute este script para criar os perfis

-- ====================================
-- Usuário 1: Viewer (Free Tier)
-- Email: viewer@test.com
-- Password: test123456
-- ====================================
INSERT INTO profiles (id, email, full_name, role, subscription_tier)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'viewer@test.com',
  'João Silva',
  'viewer',
  'free'
) ON CONFLICT (id) DO NOTHING;

-- ====================================
-- Usuário 2: Viewer (Advanced Tier)
-- Email: premium@test.com
-- Password: test123456
-- ====================================
INSERT INTO profiles (id, email, full_name, role, subscription_tier)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'premium@test.com',
  'Maria Santos',
  'viewer',
  'advanced'
) ON CONFLICT (id) DO NOTHING;

-- Subscription ativa para usuário premium
INSERT INTO subscriptions (user_id, tier, starts_at, expires_at, is_active, payment_provider)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'advanced',
  NOW(),
  NOW() + INTERVAL '1 year',
  true,
  'mock'
) ON CONFLICT DO NOTHING;

-- ====================================
-- Usuário 3: Researcher (Approved)
-- Email: researcher@test.com
-- Password: test123456
-- ====================================
INSERT INTO profiles (id, email, full_name, role, subscription_tier, avatar_url)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'researcher@test.com',
  'Dra. Ana Costa',
  'researcher',
  'free',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO researcher_profiles (user_id, bio, expertise, institution, verification_status, approved_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Pesquisadora especializada em mudanças climáticas e sustentabilidade ambiental. Doutora pelo MIT com mais de 15 anos de experiência em projetos de impacto social.',
  ARRAY['Mudanças Climáticas', 'Sustentabilidade', 'Pesquisa Aplicada', 'Análise de Dados'],
  'Universidade Federal do Brasil',
  'approved',
  NOW()
) ON CONFLICT (user_id) DO NOTHING;

-- ====================================
-- Usuário 4: Outro Researcher
-- Email: researcher2@test.com
-- Password: test123456
-- ====================================
INSERT INTO profiles (id, email, full_name, role, subscription_tier, avatar_url)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'researcher2@test.com',
  'Dr. Carlos Mendes',
  'researcher',
  'free',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO researcher_profiles (user_id, bio, expertise, institution, verification_status, approved_at)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'Especialista em inteligência artificial e machine learning aplicados à saúde. Professor universitário e consultor de inovação.',
  ARRAY['Inteligência Artificial', 'Machine Learning', 'Saúde Digital', 'Inovação'],
  'Instituto de Tecnologia Avançada',
  'approved',
  NOW()
) ON CONFLICT (user_id) DO NOTHING;

-- ====================================
-- VÍDEOS DE EXEMPLO
-- ====================================

-- Vídeos da Dra. Ana Costa (FREE)
INSERT INTO videos (researcher_id, title, description, video_url, thumbnail_url, duration_seconds, required_tier, tags, published, published_at)
VALUES
(
  '33333333-3333-3333-3333-333333333333',
  'Introdução às Mudanças Climáticas',
  'Entenda os conceitos básicos sobre mudanças climáticas e seu impacto no planeta. Neste vídeo introdutório, exploramos as causas, consequências e possíveis soluções.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/climate1/1280/720',
  420,
  'free',
  ARRAY['Clima', 'Meio Ambiente', 'Introdução'],
  true,
  NOW() - INTERVAL '7 days'
),
(
  '33333333-3333-3333-3333-333333333333',
  'O Papel da Sustentabilidade',
  'Como a sustentabilidade pode transformar nossa relação com o meio ambiente. Exemplos práticos e cases de sucesso.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/sustain1/1280/720',
  600,
  'free',
  ARRAY['Sustentabilidade', 'Meio Ambiente'],
  true,
  NOW() - INTERVAL '5 days'
);

-- Vídeos da Dra. Ana Costa (ADVANCED)
INSERT INTO videos (researcher_id, title, description, video_url, thumbnail_url, duration_seconds, required_tier, tags, published, published_at)
VALUES
(
  '33333333-3333-3333-3333-333333333333',
  'Metodologias Avançadas de Análise Climática',
  'Técnicas estatísticas e ferramentas de modelagem para pesquisa climática. Conteúdo avançado para pesquisadores e profissionais.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/advanced1/1280/720',
  1200,
  'advanced',
  ARRAY['Análise', 'Metodologia', 'Avançado'],
  true,
  NOW() - INTERVAL '3 days'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Machine Learning para Previsão Climática',
  'Aplicando algoritmos de ML para prever padrões climáticos. Workshop prático com exemplos de código.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/ml1/1280/720',
  1800,
  'advanced',
  ARRAY['Machine Learning', 'IA', 'Avançado'],
  true,
  NOW() - INTERVAL '1 day'
);

-- Vídeos do Dr. Carlos Mendes (FREE)
INSERT INTO videos (researcher_id, title, description, video_url, thumbnail_url, duration_seconds, required_tier, tags, published, published_at)
VALUES
(
  '44444444-4444-4444-4444-444444444444',
  'IA na Saúde: Uma Introdução',
  'Como a inteligência artificial está revolucionando o setor de saúde. Casos práticos e oportunidades.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/health1/1280/720',
  480,
  'free',
  ARRAY['IA', 'Saúde', 'Introdução'],
  true,
  NOW() - INTERVAL '6 days'
),
(
  '44444444-4444-4444-4444-444444444444',
  'Fundamentos de Machine Learning',
  'Os conceitos básicos de ML explicados de forma simples e prática.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/ml2/1280/720',
  540,
  'free',
  ARRAY['Machine Learning', 'Fundamentos'],
  true,
  NOW() - INTERVAL '4 days'
);

-- Vídeos do Dr. Carlos Mendes (ESSENTIAL)
INSERT INTO videos (researcher_id, title, description, video_url, thumbnail_url, duration_seconds, required_tier, tags, published, published_at)
VALUES
(
  '44444444-4444-4444-4444-444444444444',
  'Deep Learning: Teoria e Prática',
  'Mergulhe no mundo das redes neurais profundas. Teoria, implementação e casos de uso.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://picsum.photos/seed/deep1/1280/720',
  1500,
  'essential',
  ARRAY['Deep Learning', 'Redes Neurais'],
  true,
  NOW() - INTERVAL '2 days'
);

-- ====================================
-- POSTS DE EXEMPLO
-- ====================================

INSERT INTO posts (researcher_id, title, slug, content, excerpt, cover_image_url, required_tier, tags, published, published_at)
VALUES
(
  '33333333-3333-3333-3333-333333333333',
  'O Futuro da Pesquisa Climática',
  'futuro-da-pesquisa-climatica',
  '# O Futuro da Pesquisa Climática

## Introdução

A pesquisa climática está em um momento crucial. Com o avanço das tecnologias...

## Novas Metodologias

As ferramentas de análise de dados estão revolucionando como estudamos o clima...

## Conclusão

O futuro da pesquisa climática depende de colaboração e inovação.',
  'Uma análise profunda sobre as tendências e inovações na pesquisa climática moderna.',
  'https://picsum.photos/seed/post1/1200/630',
  'free',
  ARRAY['Clima', 'Pesquisa', 'Futuro'],
  true,
  NOW() - INTERVAL '8 days'
),
(
  '44444444-4444-4444-4444-444444444444',
  'IA Ética: Desafios e Oportunidades',
  'ia-etica-desafios-oportunidades',
  '# IA Ética: Desafios e Oportunidades

## O Debate Atual

A ética em IA é um dos tópicos mais discutidos atualmente...

## Principais Desafios

Viés algorítmico, privacidade de dados, transparência...

## Caminho à Frente

Precisamos de frameworks robustos e colaboração interdisciplinar.',
  'Explorando os desafios éticos da inteligência artificial e como superá-los.',
  'https://picsum.photos/seed/post2/1200/630',
  'essential',
  ARRAY['IA', 'Ética', 'Tecnologia'],
  true,
  NOW() - INTERVAL '3 days'
);

-- ====================================
-- VIEW HISTORY (Simulando engajamento)
-- ====================================

-- João (viewer free) assistiu vídeos gratuitos
INSERT INTO view_history (user_id, video_id, watched_duration_seconds, completed)
SELECT 
  '11111111-1111-1111-1111-111111111111',
  id,
  duration_seconds,
  true
FROM videos
WHERE required_tier = 'free'
LIMIT 3;

-- Maria (viewer advanced) assistiu vídeos free e advanced
INSERT INTO view_history (user_id, video_id, watched_duration_seconds, completed)
SELECT 
  '22222222-2222-2222-2222-222222222222',
  id,
  duration_seconds / 2,
  false
FROM videos
WHERE required_tier IN ('free', 'essential', 'advanced')
LIMIT 5;

-- Atualizar view counts
UPDATE videos SET view_count = (
  SELECT COUNT(*) FROM view_history WHERE video_id = videos.id
);

-- ====================================
-- CONFIRMAÇÃO
-- ====================================
DO $$
BEGIN
  RAISE NOTICE '✅ Seed data criado com sucesso!';
  RAISE NOTICE '📧 Use estes emails para login:';
  RAISE NOTICE '   - viewer@test.com (senha: test123456)';
  RAISE NOTICE '   - premium@test.com (senha: test123456)';
  RAISE NOTICE '   - researcher@test.com (senha: test123456)';
  RAISE NOTICE '   - researcher2@test.com (senha: test123456)';
END $$;

