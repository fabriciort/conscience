# Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999

# Stripe Payment Integration (for future implementation)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Authentication Providers (for future implementation)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Database (for future implementation - raw SQL)
DATABASE_URL=postgresql://user:password@localhost:5432/conscience_db

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Variáveis Obrigatórias

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Número do WhatsApp para contato (formato: código do país + DDD + número, sem espaços ou caracteres especiais)

## Variáveis Opcionais (para implementações futuras)

- Variáveis do Stripe para processamento de pagamentos
- Variáveis de autenticação social (Google, Apple, Facebook)
- URL do banco de dados para queries SQL diretas

