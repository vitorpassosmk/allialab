# ALLiA LAB — Prompt de Inicialização para o Claude Code

Cole este prompt na primeira sessão do Claude Code, dentro do diretório do projeto.

---

## PROMPT

Você é um desenvolvedor senior full-stack e especialista em design de produto. 
Você vai construir o site da ALLiA LAB — uma boutique de aliança entre IA e estratégia humana.

**LEIA ESSES ARQUIVOS ANTES DE QUALQUER COISA:**
1. `CLAUDE.md` — arquitetura, tokens, convenções e regras inegociáveis
2. `TODO.md` — fase atual e próximas tarefas
3. `docs/knowledge-base/brand.md` — identidade e posicionamento
4. `docs/knowledge-base/copy.md` — toda a copy (USE VERBATIM)
5. `docs/knowledge-base/design-system.md` — tokens, motion, componentes
6. `docs/knowledge-base/seo.md` — estratégia e implementação

---

## MISSÃO — FASE 1 FUNDAÇÃO

Construa o site da ALLiA LAB do zero, com excelência de execução em cada detalhe.
Este site é o portfólio da empresa. Cada pixel prova competência. Não existe "bom o suficiente".

### Contexto de negócio
- A ALLiA LAB é uma boutique premium de aliança humano + IA + sistemas
- Público: PMEs tradicionais (Carlos), gestoras de inovação (Marina), founders (Rafael)
- Diferencial único: vende IA como amplificação, não substituição
- O site é o principal ativo de vendas no MVP — precisa converter

### Stack (não negocie isso)
- Next.js 15 (App Router, TypeScript strict)
- Tailwind CSS v4 (CSS-first: tokens como CSS custom properties em globals.css)
- Framer Motion v11 (motion-first, spring animations)
- next/font: Space Grotesk (display), Inter (body), Geist Mono (mono)
- lucide-react (icons)
- Vercel (deploy automático)

---

## PASSO 1 — Setup do Projeto

```bash
npx create-next-app@latest allia-lab \
  --typescript \
  --eslint \
  --app \
  --tailwind \
  --turbopack \
  --src-dir=false \
  --import-alias="@/*"
cd allia-lab
npm install framer-motion lucide-react react-hook-form zod resend @next/third-parties
npm install -D @types/node prettier eslint-config-prettier
```

Configure `tsconfig.json` com `"strict": true`.

Configure `.prettierrc`:
```json
{ "semi": false, "singleQuote": true, "tabWidth": 2, "printWidth": 100 }
```

---

## PASSO 2 — Design System

### `app/globals.css`
Implemente os CSS custom properties completos do design system:
- Cores: steel (50-900), amber (50-900), slate (50-900), green-success
- Fontes: --font-display, --font-body, --font-mono
- Tailwind v4 syntax: `@theme { --color-steel-400: #4D8FD6; ... }`
- Base styles: `* { box-sizing: border-box }`, body `bg-slate-900 text-slate-50`
- Scrollbar customization (dark, slate-700 track, steel-400 thumb)

### `lib/fonts.ts`
- Space Grotesk: variable `--font-display`, weights 400/500/600/700
- Inter: variable `--font-body`  
- Geist Mono: variable `--font-mono`
- All with `display: 'swap'`

### `lib/motion.ts`
Implement the complete variants library:
- `fadeUp` — section reveal
- `staggerContainer` — parent with staggerChildren: 0.1
- `scaleIn` — cards
- `drawPath` — SVG path animation (for trefoil)
- `slideInLeft` / `slideInRight` — split sections
- `spring` config object
- `viewport` config: `{ once: true, margin: '-80px' }`
- Export `MotionConfig` wrapper with `reducedMotion="user"`

### `components/ui/Button.tsx`
Three variants: primary (amber), secondary (steel outline), ghost.
- Add `asChild` prop pattern for link buttons
- Amber primary: `bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-6 py-3 rounded-lg`
- Secondary: `border border-steel-400 text-steel-400 hover:bg-steel-400/10 px-6 py-3 rounded-lg`
- All transitions: `transition-all duration-200`

### `components/ui/Card.tsx`
- `bg-slate-800 border border-slate-600 rounded-xl p-6`
- `hover:border-steel-400/50 hover:bg-slate-700 transition-all duration-300`
- Optional `glow` prop: steel glow on hover (box-shadow)

### `components/ui/Badge.tsx`
- Tiny label: `text-xs font-mono text-steel-400 border border-steel-400/30 rounded-full px-3 py-1`

---

## PASSO 3 — Layout Components

### `components/layout/Navbar.tsx` (`'use client'`)
- Sticky top-0 z-50
- `backdrop-blur-md bg-slate-900/80` — ativa blur ao scroll (useScrollY)
- `border-b border-slate-600/0` → `border-slate-600/80` com scroll
- Left: ALLiA LAB logo (SVG trefoil + wordmark)
- Center: nav links (Serviços, Cases, Sobre, Blog)
- Right: `<Button variant="primary">Diagnóstico gratuito</Button>`
- Mobile: hamburger menu, full-screen overlay
- Active link: `text-steel-400` (usePathname)

### `components/layout/Footer.tsx` (Server Component)
- `bg-slate-900 border-t border-slate-600`
- 3 colunas: Logo + tagline | Links | Contato + Social
- Logo: SVG + "ALLiA LAB" + "Inteligência aliada. Impacto real." em slate-300
- Bottom bar: copyright + "Feito com aliança no Brasil 🇧🇷"

---

## PASSO 4 — Homepage (`app/page.tsx`)

**REGRA CRÍTICA**: A homepage conta uma história de venda em 7 atos, não um catálogo.
Ordem: emoção → conceito → serviços → método → prova → diferencial → conversão.

Use copy VERBATIM de `docs/knowledge-base/copy.md`.

### Block 01 — Hero (`components/sections/Hero.tsx`) `'use client'`
```
Layout: full viewport height (min-h-screen), flex col, justify-center
Background: bg-slate-900 com subtle radial gradient em steel-900/20 no canto superior direito
Visual: Animated trefoil SVG à direita (drawPath variants, 3 loops em steel-400, amber-400, slate-300)
Headline: "A IA não vai te substituir." em slate-50, "Nós vamos te multiplicar." em steel-400
Tipo: Space Grotesk, font-bold, text-5xl lg:text-7xl, leading-tight
Sub: slate-300, text-lg lg:text-xl, max-w-xl, mt-6
CTAs: mt-10, flex gap-4 — Primary (amber) + Secondary (steel)
Badge acima: "ALIANÇA HUMANO × IA × SISTEMAS" em geist mono, steel-400/60 border
Scroll indicator: animated arrow em slate-300 no bottom
```

### Block 02 — Pillars (`components/sections/Pillars.tsx`) `'use client'`
```
Eyebrow: "A ALIANÇA EM TRÊS DIMENSÕES" — badge component
Headline: "Humana · IA · Sistemas" — H2 Space Grotesk
3 cards em grid (1 col mobile → 3 col desktop)
Cada card: ícone (trefoil loop SVG customizado) + título + descrição + border-left em steel-400
Card Humana: border-amber-400 (diferente intencionalmente — elemento humano em quente)
Card IA: border-steel-400
Card Sistemas: border-slate-400
Animação: stagger reveal ao entrar no viewport
Connector line entre os 3 cards no desktop (CSS ::after pseudo-element, dashed, steel-400/30)
```

### Block 03 — Services (`components/sections/Services.tsx`) `'use client'`
```
Headline: "Não vendemos horas. Construímos alianças."
5 service cards em grid 2-col (mobile) → 3-col (desktop, último card centralizado)
Cada card: ícone lucide + categoria badge + título + descrição + "Saiba mais →" em steel-400
Hover: card sobe (translateY(-4px)), border vira steel-400, ícone anima
```

### Block 04 — Method (`components/sections/Method.tsx`) `'use client'`
```
Fundo: bg-slate-800 (contrast section)
Headline: "Como a aliança funciona"
4 steps em linha horizontal (desktop) / vertical (mobile)
Cada step: número grande em steel-400/20 (background) + número pequeno em steel-400 + título + descrição
Conector visual entre steps: linha fina dashed em steel-400/30
Animação: stagger left-to-right com slide, cada step 200ms delay
```

### Block 05 — Case Anchor (`components/sections/CaseAnchor.tsx`) `'use client'`
```
Eyebrow: "CASE ÂNCORA" + badge
Headline: "Resultado não se promete. Se mostra."
Card editorial grande: bg-slate-800, border-steel-400/50
Left: Client info (Madiã Transportes, setor, cidade)
Right: Números/resultados (PLACEHOLDER até ter dados reais — usar UI com "Em breve")
Bottom: Depoimento (se disponível) + CTA "Ver case completo"
Nota para Vitor: Substituir placeholders pelos dados reais do case antes de publicar
```

### Block 06 — Diferenciais (`components/sections/Differentials.tsx`) `'use client'`
```
Headline: "Por que ALLiA"
4 cards em 2x2 grid
Cada card: ícone (lucide) + título + descrição
Sem hover especial — clean, informativo
```

### Block 07 — CTA Final (`components/sections/CTAFinal.tsx`) `'use client'`
```
Full-width section, bg-slate-800 com gradient overlay
Centro: Headline + Sub + dois CTAs (amber + WhatsApp verde)
WhatsApp: link `https://wa.me/55XXXXXXXXXXX` (NEXT_PUBLIC_WHATSAPP env var)
Animação: scale in + fade
Nenhum link seco — garantir que o WhatsApp number venha de env var
```

---

## PASSO 5 — Páginas Core

### `app/layout.tsx`
```tsx
- Aplica fonts (variáveis CSS)
- Aplica MotionConfig com reducedMotion="user"
- Schema.org Organization (JSON-LD)
- GA4 via GoogleAnalytics component (env-gated: só se NEXT_PUBLIC_GA_ID existir)
- Root metadata com template e defaults
```

### `app/sobre/page.tsx`
- Hero: headline + sub + propósito
- Section Missão/Visão/Valores (cards grid)
- Section 3 Pilares (reutiliza Pillars component)
- generateMetadata com dados de copy.md

### `app/diagnostico/page.tsx`
- Hero com headline + sub
- Form 10 perguntas (react-hook-form + zod)
- Submit → Resend API route (`/api/diagnostico/route.ts`)
- Success state animado
- Schema.org FAQ

### `app/contato/page.tsx`
- Headline + 3 opções: Formulário | WhatsApp | Calendly embed

---

## PASSO 6 — SEO Técnico

```
app/sitemap.ts         → todas as rotas estáticas
app/robots.ts          → allow all, sitemap URL
app/opengraph-image.tsx → OG image dinâmica com ALLiA LAB branding

Cada page.tsx que tem generateMetadata:
- title único (< 60 chars)
- description única (150-160 chars)
- canonical URL
- OG image
```

---

## PASSO 7 — Deploy

```bash
# Configure Vercel
vercel --prod

# Environment variables no Vercel dashboard:
RESEND_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_WHATSAPP=55XXXXXXXXXXX
CALENDLY_URL=https://calendly.com/allia-lab/diagnostico
```

---

## REGRAS DE QUALIDADE (INEGOCIÁVEIS)

1. **Amber = CTA e apenas CTA.** Se tiver amber em qualquer lugar que não seja botão de conversão → corrija.
2. **Copy do KB.** Nunca invente texto. Se o KB não tem, use placeholder marcado com `// TODO: copy needed`.
3. **Mobile-first.** Todo componente funciona em 375px antes de qualquer breakpoint.
4. **`prefers-reduced-motion`**: Wrap todas as animações em `MotionConfig reducedMotion="user"`.
5. **Server vs Client correto.** Seções estáticas = Server Components. Animação/interatividade = `'use client'`.
6. **Images**: `next/image` obrigatório. Nunca `<img>`. Sempre `alt` descritivo. Hero = `priority`.
7. **Sem lorem ipsum** em produção. Placeholders claramente marcados com `[PLACEHOLDER]`.
8. **Commits atômicos** por componente/feature. Nunca commitar tudo junto.
9. **TODO.md**: marque tasks como `[x]` ao concluir. Adicione decisões no Decision Log.
10. **Lighthouse gate**: rode `npx lighthouse http://localhost:3000` antes de cada PR.

---

## GLOSSÁRIO DO PROJETO

| Termo | Significado |
|---|---|
| Trefoil | O logotipo das 3 alças entrelaçadas — Human + IA + Sistemas |
| Aliança | O conceito central: não vendemos IA, vendemos a aliança |
| Amber | Cor laranja #FF6B2C — reservada EXCLUSIVAMENTE para CTAs |
| Steel | Cor azul #4D8FD6 — accent, links, detalhes técnicos |
| Slate-900 | Background escuro da página (#080A11) |
| KB | Knowledge Base em /docs/knowledge-base/ |
| PME | Pequenas e Médias Empresas — público primário (Carlos persona) |
| CTA | Call to Action — sempre em amber, um por dobra |

---

## START

Execute os passos em ordem. Após cada passo principal, faça commit.
Primeiro resultado esperado: design system + Navbar + Hero rodando no localhost:3000.
