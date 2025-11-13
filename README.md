# Consciência - Plataforma Educacional de Assinatura

Uma plataforma educacional moderna construída com Next.js 16 e React 19, oferecendo conteúdo exclusivo, mentoria e recursos de aprendizagem para Pesquisadores, Profissionais, Estudantes e Empresas.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **Tailwind CSS v4** - Framework CSS utilitário
- **TypeScript** - Tipagem estática
- **SWR** - Data fetching client-side

## 🎨 Design System

### Paleta de Cores

- **Cream** (#F5F3E3) - Background claro
- **Charcoal** (#1A1A1A) - Background escuro e texto
- **Coral** (#FF6B5B) - CTAs principais
- **Peach** (#F5C2A0) - Avatares
- **Sage Green** (#B8D4B0) - Acentos

### Componentes

- Botões pill (rounded-full)
- Cards modernos (24px rounded)
- Avatares com background quente
- Navegação responsiva
- Inputs limpos e acessíveis

## 📁 Estrutura do Projeto

```
app/
├── components/
│   ├── ui/              # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   └── Input.tsx
│   ├── layout/          # Componentes de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── home/            # Componentes da home
│       ├── Hero.tsx
│       ├── AudienceSegments.tsx
│       ├── Testimonials.tsx
│       └── CTASection.tsx
├── precos/              # Página de preços
├── login/               # Página de login
├── cadastro/            # Página de cadastro
├── mentores/            # Diretório de mentores
├── globals.css          # Estilos globais e tokens
└── layout.tsx           # Layout raiz
```

## 🛠️ Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar em produção
pnpm start
```

## 📄 Páginas Implementadas

### 1. Landing Page (/)
- Hero section com CTAs
- 4 segmentos de público (Pesquisadores, Profissionais, Estudantes, Empresas)
- Carousel de testimonials
- Integração WhatsApp

### 2. Pricing Page (/precos)
- 3 tiers de assinatura (Básico, Profissional, Enterprise)
- Toggle mensal/anual
- Comparação de features
- FAQ section

### 3. Login (/login)
- Autenticação por email
- Login social (Google, Apple, Facebook)
- Recuperação de senha
- Design moderno e acessível

### 4. Cadastro (/cadastro)
- Registro com seleção de perfil
- Validação de formulário
- Cadastro social
- Aceite de termos

### 5. Mentores (/mentores)
- Diretório de mentores
- Busca e filtros
- Cards com informações detalhadas
- Sistema de conexão

## ♿ Acessibilidade

- WCAG 2.1 AA compliance
- Semântica HTML adequada
- Contraste de cores conforme diretrizes
- Labels e ARIA attributes
- Navegação por teclado
- Focus states visíveis

## 📱 Responsividade

Breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🔗 Integrações

### WhatsApp
Integração para suporte e contato direto via WhatsApp em várias seções da plataforma.

### Pagamentos (Pronto para integração)
Estrutura preparada para integração com Stripe ou outro gateway de pagamento.

### Autenticação (Pronto para integração)
Interface pronta para integração com NextAuth ou outro provider de autenticação.

## 🎯 Features Principais

- ✅ Design system completo e consistente
- ✅ Componentes reutilizáveis e modulares
- ✅ Mobile-first responsive design
- ✅ Dark mode support
- ✅ Transições e animações suaves
- ✅ SEO otimizado
- ✅ Performance otimizada (Core Web Vitals)
- ✅ Acessibilidade WCAG 2.1 AA

## 🚀 Deploy

O projeto está pronto para deploy em:
- Vercel (recomendado)
- Netlify
- AWS
- Qualquer plataforma que suporte Next.js

## 📝 Próximos Passos

1. Integrar com banco de dados (PostgreSQL recomendado)
2. Implementar autenticação real (NextAuth)
3. Configurar gateway de pagamento (Stripe)
4. Adicionar dashboard do usuário
5. Implementar sistema de cursos
6. Adicionar chat/mensagens entre mentores e alunos

## 📄 Licença

Todos os direitos reservados © 2025 Consciência

---

**Desenvolvido com ❤️ usando Next.js 16 e React 19**
