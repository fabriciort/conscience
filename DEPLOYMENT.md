# Guia de Deploy - Plataforma Consciência

## 🚀 Deploy Rápido na Vercel (Recomendado)

### Passo 1: Preparar o Repositório

```bash
# Inicializar git (se ainda não foi feito)
git init
git add .
git commit -m "Initial commit - Plataforma Consciência"

# Criar repositório no GitHub/GitLab
git remote add origin <seu-repositorio>
git push -u origin main
```

### Passo 2: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Project"
3. Conecte seu repositório GitHub/GitLab
4. Configure as variáveis de ambiente (ver .env.example)
5. Clique em "Deploy"

### Variáveis de Ambiente Necessárias

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=...
```

## 📦 Deploy Manual

### Build Local

```bash
# Instalar dependências
pnpm install

# Build para produção
pnpm build

# Testar build localmente
pnpm start
```

### Deploy em Outras Plataformas

#### Netlify

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
```

#### AWS Amplify

1. Conectar repositório
2. Configurar build settings:
   - Build command: `pnpm build`
   - Output directory: `.next`
3. Adicionar variáveis de ambiente

#### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## 🔧 Configurações Pós-Deploy

### 1. Domínio Personalizado

- Configure seu domínio nas configurações da plataforma
- Adicione registros DNS apropriados
- Aguarde propagação (até 48h)

### 2. SSL/HTTPS

- Vercel/Netlify: Automático
- Outras plataformas: Configure Let's Encrypt ou CloudFlare

### 3. Analytics

```typescript
// app/layout.tsx
// Adicionar Google Analytics
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### 4. Monitoramento

- Configure Sentry para error tracking
- Configure Vercel Analytics ou similar
- Configure uptime monitoring (UptimeRobot, Pingdom)

## 🗄️ Banco de Dados

### Setup PostgreSQL (Recomendado)

```bash
# Criar database
createdb consciencia

# Migrar schema (quando implementado)
# pnpm db:migrate
```

### Serviços Recomendados

- **Vercel Postgres**: Integração nativa
- **Supabase**: PostgreSQL + Auth + Storage
- **Neon**: Serverless PostgreSQL
- **Railway**: PostgreSQL gerenciado

## 🔐 Autenticação

### NextAuth.js Setup

```bash
pnpm add next-auth @auth/core
```

Configurar providers no `app/api/auth/[...nextauth]/route.ts`

## 💳 Pagamentos

### Stripe Integration

```bash
pnpm add stripe @stripe/stripe-js
```

Configurar webhooks do Stripe para:
- Confirmação de pagamento
- Cancelamento de assinatura
- Atualização de plano

## 📧 Email

### Serviços Recomendados

- **Resend**: Simples e moderno
- **SendGrid**: Robusto e escalável
- **AWS SES**: Econômico para alto volume

## 🔍 SEO

### Configurações Importantes

```typescript
// app/layout.tsx ou cada page.tsx
export const metadata = {
  metadataBase: new URL('https://consciencia.com.br'),
  title: 'Consciência - Plataforma Educacional',
  description: '...',
  openGraph: {
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

### Sitemap

```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://consciencia.com.br',
      lastModified: new Date(),
    },
    // ... outras páginas
  ]
}
```

## 📊 Performance

### Otimizações Implementadas

- ✅ Server Components (Next.js 16)
- ✅ Lazy loading de componentes
- ✅ Tailwind CSS otimizado
- ✅ Imagens otimizadas (next/image quando necessário)

### Core Web Vitals

Monitore:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm lint
```

## 🌍 CDN e Cache

### CloudFlare

1. Adicione seu domínio ao CloudFlare
2. Configure cache rules:
   - Static assets: Cache tudo
   - API routes: No cache
   - Pages: Cache com revalidação

## 📝 Checklist de Deploy

- [ ] Build local sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado e migrado
- [ ] Autenticação configurada
- [ ] Pagamentos configurados (se aplicável)
- [ ] Domínio personalizado configurado
- [ ] SSL/HTTPS ativo
- [ ] Analytics configurado
- [ ] Monitoring configurado
- [ ] Sitemap gerado
- [ ] robots.txt configurado
- [ ] Testes de performance realizados
- [ ] Testes de acessibilidade realizados

## 🆘 Troubleshooting

### Build Errors

```bash
# Limpar cache
rm -rf .next node_modules
pnpm install
pnpm build
```

### Environment Variables

Certifique-se de usar `NEXT_PUBLIC_` prefix para variáveis client-side.

### Database Connection

Verifique:
- Connection string correta
- Firewall/Network rules
- SSL requirements

## 📞 Suporte

Para questões de deploy, consulte:
- [Next.js Deploy Docs](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)

---

**Pronto para produção!** 🎉

