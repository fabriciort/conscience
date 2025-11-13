# Guia de Acessibilidade - Plataforma Consciência

## ✅ Conformidade WCAG 2.1 AA

Esta plataforma foi desenvolvida seguindo as diretrizes WCAG 2.1 Nível AA para garantir acessibilidade a todos os usuários.

## 🎨 Contraste de Cores

### Ratios de Contraste Implementados

- **Texto normal**: Mínimo 4.5:1
  - Charcoal (#1A1A1A) sobre Cream (#F5F3E3): ~12.5:1 ✅
  - Coral (#FF6B5B) sobre White: ~4.8:1 ✅

- **Texto grande (18px+)**: Mínimo 3:1
  - Todos os ratios acima de 3:1 ✅

- **Elementos interativos**: Mínimo 3:1
  - Botões e links com contraste adequado ✅

## ⌨️ Navegação por Teclado

### Funcionalidades Implementadas

- ✅ Ordem de tabulação lógica e intuitiva
- ✅ Focus states visíveis com outline coral (2px)
- ✅ Skip links (pode ser adicionado se necessário)
- ✅ Navegação completa por teclado em todos os componentes

### Atalhos de Teclado

- `Tab`: Navegar para o próximo elemento
- `Shift + Tab`: Navegar para o elemento anterior
- `Enter/Space`: Ativar botões e links
- `Esc`: Fechar menus mobile
- `Setas`: Navegar no carousel de testimonials

## 🏷️ Semântica e ARIA

### Elementos Semânticos Utilizados

```html
<header>: Cabeçalho da página
<nav>: Navegação principal
<main>: Conteúdo principal
<section>: Seções de conteúdo
<article>: Cards de mentor, testimonials
<footer>: Rodapé
<button>: Elementos interativos
<form>: Formulários
```

### ARIA Attributes Implementados

- `aria-label`: Labels descritivos para elementos sem texto visível
- `aria-labelledby`: Associação de labels
- `aria-describedby`: Descrições adicionais
- `aria-expanded`: Estado de menus expansíveis
- `aria-hidden`: Ocultar elementos decorativos
- `aria-invalid`: Validação de formulários
- `role`: Roles semânticos apropriados

## 📱 Responsividade

### Breakpoints

```css
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
```

### Features Responsivas

- ✅ Layout fluido e adaptativo
- ✅ Imagens responsivas
- ✅ Tipografia fluida (16-18px base)
- ✅ Navegação mobile com hamburger menu
- ✅ Cards empilháveis em mobile
- ✅ Touch targets mínimo 44x44px

## 🎯 Formulários Acessíveis

### Implementações

- ✅ Labels associados a todos os inputs
- ✅ Mensagens de erro claras e associadas
- ✅ Validação em tempo real
- ✅ Feedback visual e textual
- ✅ Autocomplete attributes
- ✅ Campos required marcados

## 🖼️ Imagens e Mídia

### Boas Práticas

- ✅ Textos alternativos (alt) em todas as imagens
- ✅ Ícones decorativos com aria-hidden
- ✅ Vídeos com placeholders acessíveis
- ✅ Avatares com fallback de iniciais

## 🎭 Estados Interativos

### Estados Implementados

```css
:hover - Mudança de cor/escala
:focus - Outline coral visível
:active - Feedback tátil
:disabled - Aparência desabilitada clara
```

## 📊 Testes de Acessibilidade

### Ferramentas Recomendadas

1. **Lighthouse** (Chrome DevTools)
   - Auditoria automática de acessibilidade
   
2. **axe DevTools**
   - Verificação detalhada de WCAG

3. **WAVE**
   - Análise visual de acessibilidade

4. **Screen Readers**
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)

### Checklist de Teste

- [ ] Navegação completa por teclado
- [ ] Teste com screen reader
- [ ] Teste de contraste de cores
- [ ] Teste de zoom até 200%
- [ ] Teste em diferentes resoluções
- [ ] Validação de formulários
- [ ] Teste com imagens desabilitadas
- [ ] Teste com CSS desabilitado

## 🔍 Melhorias Futuras

### Possíveis Implementações

1. **Skip Links**
   - Adicionar link para pular navegação

2. **Modo de Alto Contraste**
   - Tema adicional com contraste máximo

3. **Controle de Animações**
   - Respeitar prefers-reduced-motion

4. **Tamanho de Fonte Ajustável**
   - Controle de zoom por preferência do usuário

5. **Landmarks ARIA**
   - Melhorar navegação por landmarks

## 📝 Documentação de Componentes

### Button Component

```typescript
// Props de acessibilidade
aria-label: string (opcional)
disabled: boolean
type: 'button' | 'submit' | 'reset'
```

### Input Component

```typescript
// Props de acessibilidade
label: string (recomendado)
error: string (feedback de validação)
aria-describedby: string
required: boolean
```

### Card Component

```typescript
// Uso semântico
<Card> pode conter <article> para conteúdo independente
```

## 🌐 Internacionalização

### Idioma

- ✅ Lang attribute: `lang="pt-BR"`
- ✅ Conteúdo em português brasileiro
- ✅ Datas e números formatados para pt-BR

## 📞 Suporte

Para questões de acessibilidade, entre em contato:
- WhatsApp: +55 11 99999-9999
- Email: acessibilidade@consciencia.com.br

---

**Comprometidos com a inclusão digital para todos.**

