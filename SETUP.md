# 🚀 Setup do Conscience Platform - MVP

## 📋 Checklist de Configuração

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua-url-aqui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui

# Development
NODE_ENV=development
```

**Onde encontrar essas chaves:**
1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Settings → API**
3. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

### 2. Executar RLS Policies no Supabase

No **SQL Editor** do Supabase, execute (nesta ordem):

1. **Policies e Triggers:**
   ```bash
   # Execute o arquivo: supabase/rls-policies.sql
   ```

⚠️ **Importante:** Se você já executou o schema inicial, pule para as policies.

---

### 3. Criar Usuários de Teste

No **Supabase Dashboard**, vá em **Authentication → Users** e crie os seguintes usuários manualmente:

#### **Usuário 1: Viewer (Free)**
- Email: `viewer@test.com`
- Password: `test123456`
- Metadata: `{"role": "viewer", "full_name": "João Silva"}`

#### **Usuário 2: Viewer (Advanced)**
- Email: `premium@test.com`
- Password: `test123456`
- Metadata: `{"role": "viewer", "full_name": "Maria Santos"}`

#### **Usuário 3: Researcher**
- Email: `researcher@test.com`
- Password: `test123456`
- Metadata: `{"role": "researcher", "full_name": "Dra. Ana Costa"}`

#### **Usuário 4: Researcher 2**
- Email: `researcher2@test.com`
- Password: `test123456`
- Metadata: `{"role": "researcher", "full_name": "Dr. Carlos Mendes"}`

---

### 4. Popular Banco de Dados (Seed Data)

No **SQL Editor**, execute:

```bash
# Execute o arquivo: supabase/seed.sql
```

Isso irá criar:
- ✅ Perfis dos usuários
- ✅ Perfis de pesquisadores
- ✅ Vídeos de exemplo (free e premium)
- ✅ Posts de exemplo
- ✅ Histórico de visualizações

---

### 5. Configurar Auth no Supabase (Opcional)

Se quiser testar OAuth (Google/GitHub):

1. **Google OAuth:**
   - Vá em **Authentication → Providers → Google**
   - Ative e adicione Client ID e Secret

2. **GitHub OAuth:**
   - Vá em **Authentication → Providers → GitHub**
   - Ative e adicione Client ID e Secret

---

### 6. Iniciar o Projeto

```bash
# Instalar dependências (se ainda não instalou)
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O projeto estará disponível em: **http://localhost:3000**

---

## 🧪 Testando a Aplicação

### Usando o DevToolbar 🛠️

No canto inferior direito, clique no ícone 🛠️ para abrir o DevToolbar que permite:

- **Login Rápido:** Fazer login instantâneo como viewer, premium ou researcher
- **Trocar Tier:** Alterar seu nível de assinatura (free/essential/advanced/corporate)
- **Quick Links:** Navegar rapidamente entre Platform e Studio

### Fluxos de Teste

#### **Como Viewer (Estudante):**
1. Login: `viewer@test.com` / `test123456`
2. Ir para: `/platform/feed`
3. Visualizar vídeos disponíveis
4. Tentar assistir vídeo premium (verá paywall)
5. Usar DevToolbar para fazer upgrade para "Advanced"
6. Assistir vídeo premium

#### **Como Researcher:**
1. Login: `researcher@test.com` / `test123456`
2. Ir para: `/studio/dashboard`
3. Ver estatísticas
4. Criar novo vídeo: `/studio/videos/new`
5. Listar vídeos: `/studio/videos`
6. Testar preview como visitante

---

## 📁 Estrutura do Projeto

```
conscience/
├── app/
│   ├── (public)/          # Landing page
│   ├── (auth)/            # Login/Signup
│   ├── (platform)/        # Área dos viewers
│   │   ├── feed/          # Feed de vídeos
│   │   ├── watch/[id]/    # Player de vídeo
│   │   └── researchers/   # Lista de pesquisadores
│   └── (studio)/          # Área dos researchers
│       ├── dashboard/     # Dashboard
│       ├── videos/        # Gestão de vídeos
│       └── posts/         # Gestão de posts
├── components/
│   └── dev-toolbar.tsx    # Toolbar de desenvolvimento
├── lib/
│   ├── supabase/          # Configuração Supabase
│   ├── hooks/             # Custom hooks
│   ├── contexts/          # React contexts
│   └── utils/             # Utilidades
└── supabase/
    ├── rls-policies.sql   # Policies RLS
    └── seed.sql           # Dados de teste
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- Login com email/senha
- Magic Link
- OAuth (Google/GitHub) - configurável
- Redirecionamento baseado em perfil

### ✅ Perfis de Usuário
- **Viewer:** Acesso a plataforma de conteúdo
- **Researcher:** Acesso ao Studio

### ✅ Sistema de Tiers
- Free
- Essential
- Advanced
- Corporate Labs

### ✅ Platform (Viewers)
- Feed de vídeos com filtros
- Player de vídeo com paywall
- Controle de acesso por tier

### ✅ Studio (Researchers)
- Dashboard com métricas
- Criação de vídeos
- Listagem de conteúdo
- Analytics básico

### ✅ DevTools
- Login rápido
- Troca de tier
- Links rápidos

---

## 🔒 Segurança (RLS)

Todas as tabelas estão protegidas com Row Level Security:
- ✅ Viewers só veem conteúdo publicado
- ✅ Researchers só editam seu próprio conteúdo
- ✅ Controle de acesso baseado em tier
- ✅ Triggers automáticos para criar perfis

---

## 📝 Próximos Passos (V2)

### Pagamentos
- [ ] Integração com Stripe
- [ ] Webhooks de pagamento
- [ ] Gerenciamento de assinaturas

### Upload de Vídeos
- [ ] Supabase Storage
- [ ] Video encoding
- [ ] CDN

### Features Adicionais
- [ ] Comentários
- [ ] Favoritos
- [ ] Busca avançada
- [ ] Notificações
- [ ] Sistema de mensagens

---

## ⚠️ Troubleshooting

### Erro: "User not found"
- Verifique se o usuário foi criado no Supabase Auth
- Confirme que executou o seed.sql

### Erro: "Insufficient permissions"
- Execute o arquivo rls-policies.sql
- Verifique se RLS está ativado nas tabelas

### DevToolbar não aparece
- Confirme que está em ambiente de desenvolvimento
- Verifique `process.env.NODE_ENV === 'development'`

### Vídeos não aparecem
- Execute o seed.sql
- Verifique se os vídeos estão com `published = true`
- Confirme que o researcher_id existe

---

## 🎉 Pronto!

Seu MVP do Conscience está configurado e funcionando!

**Dúvidas?** Verifique os logs do terminal e do browser console.

**Próximos passos:** Teste todos os fluxos e comece a customizar conforme suas necessidades!

