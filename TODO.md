# ALLiA LAB — Project TODO & Decision Log
> Claude Code: read this file at the start of every session.
> Update status whenever a task changes. Document WHY, not just WHAT.

---

## 🚦 Current Phase: PHASE 1 — Foundation
**Goal**: Site no ar. MVP motion-first. Staging até semana 3.
**Branch**: `feat/phase-1-foundation`
**Timeline**: Semanas 1–6

---

## Phase 1 — Foundation (Semanas 1–6)

### Setup & Infrastructure
- [x] `npx create-next-app@latest allia-lab --typescript --eslint --app --tailwind --turbopack`
- [x] Configure Tailwind v4 CSS-first (`@import "tailwindcss"` in globals.css)
- [x] Add design tokens to `app/globals.css` (CSS custom properties)
- [x] Install deps: `framer-motion lucide-react` (react-hook-form, zod, @next/third-parties, resend → Phase 1 pages)
- [x] Configure `next/font` (Space Grotesk, Inter, Geist Mono)
- [x] Set up `eslint` + `typescript strict`
- [x] Initialize git, create `feat/phase-1-foundation` branch
- [x] Connect Vercel project → `allialab.vercel.app` ao vivo, production = `master`

### Design System
- [x] `app/globals.css` → CSS custom properties for all tokens
- [x] `/lib/fonts.ts` → font declarations
- [x] `/lib/motion.ts` → Framer Motion variants library (fadeUp, fadeIn, stagger, scaleIn)
- [x] `/components/ui/Button.tsx` → primary/secondary/ghost variants
- [x] `/components/ui/Card.tsx` → surface card with border
- [x] `/components/ui/Badge.tsx` → category labels (default + accent variants)

### Layout Components
- [x] `/components/layout/Navbar.tsx` → sticky blur, logo + nav + amber CTA + mobile drawer
- [x] `/components/layout/Footer.tsx` → logo + tagline + links + social

### Homepage (7 Blocks) — `/app/page.tsx`
- [x] **01 Hero** → headline + sub + amber CTA + trefoil motion
- [x] **02 Pillars** → 3 interlocked columns (Human · IA · Sistemas)
- [ ] **03 Services** → 5-card grid + hover reveal
- [ ] **04 Method** → 4 steps (Diagnóstico→Estratégia→Construção→Evolução)
- [ ] **05 Case Âncora** → Madiã Transportes card (numbers + results)
- [ ] **06 Diferenciais** → 4 differentiators vs. commodity agencies
- [ ] **07 CTA Final** → full-width band + amber + WhatsApp link

### Core Pages
- [ ] `/sobre/page.tsx` → Propósito + 3 Pilares + Valores
- [ ] `/servicos/page.tsx` → Grid overview
  - [ ] `/servicos/sites-apps/page.tsx`
  - [ ] `/servicos/automacoes/page.tsx`
  - [ ] `/servicos/agentes-ia/page.tsx`
  - [ ] `/servicos/microsaas/page.tsx`
  - [ ] `/servicos/marketing/page.tsx`
- [ ] `/cases/page.tsx`
  - [ ] `/cases/madia-transportes/page.tsx`
- [ ] `/diagnostico/page.tsx` → Lead magnet form (10–12 perguntas)
- [ ] `/contato/page.tsx` → form + WhatsApp + Calendly embed

### SEO & Technical
- [ ] `/app/sitemap.ts`
- [ ] `/app/robots.ts`
- [ ] `generateMetadata()` for all static pages
- [ ] Schema.org Organization in root layout
- [ ] `/app/opengraph-image.tsx`
- [ ] GA4 via `@next/third-parties/google`
- [ ] Hotjar snippet (env-gated)

---

## Phase 2 — Authority & Content (Semanas 7–14)
- [ ] `/blog/page.tsx` + `/blog/[slug]/page.tsx` (MDX)
- [ ] 4 pillar articles (see KB → seo.md)
- [ ] `/faq/page.tsx` → FAQ Schema.org
- [ ] Framer Motion polish (Lottie trefoil, page transitions)
- [ ] Newsletter form (Resend integration)
- [ ] LinkedIn post scheduler setup
- [ ] A/B test CTAs (Vercel Edge Config)
- [ ] Lighthouse CI gate → Vercel build check

## Phase 3 — Optimization & Scale (Semanas 15–24)
- [ ] Heatmap analysis → UX adjustments
- [ ] New real cases (template ready)
- [ ] Landing pages per service (SEO long-tail)
- [ ] Google + Meta paid traffic setup
- [ ] Email nurturing sequences (Resend)
- [ ] Core Web Vitals audit + fixes

## Phase 4 — Products & Ecosystem (6–12 months)
- [ ] `/produtos/page.tsx` → SYNKLY, ALLiA Dispatch
- [ ] Partner portal
- [ ] EN/ES expansion
- [ ] MicroSaaS marketplace

---

## ✅ Decision Log

### DD-001 — Tailwind v4 over v3
**Date**: Phase 1 start
**Decision**: Use Tailwind v4 with CSS-first config (`@theme` directive in globals.css)
**Rationale**: v4 uses native CSS custom properties; tokens live in CSS, not JS config.
This makes the design system directly accessible to Framer Motion and plain CSS.
**Tradeoff**: Some v3 plugins not yet compatible; use `@tailwindcss/forms` v0.5+ only.

### DD-002 — App Router (not Pages Router)
**Decision**: Next.js 15 App Router exclusively.
**Rationale**: RSC reduces JS bundle. Layout system enables shared Navbar/Footer without
prop drilling. generateMetadata per-route is superior to _document.tsx approach.

### DD-003 — Framer Motion for animation (not CSS-only)
**Decision**: Framer Motion for scroll-triggered, spring, stagger animations.
**Rationale**: The motion-first identity requires spring physics (cubic-bezier alone can't).
Trefoil interlocking animation requires orchestrated sequence. Bundle cost justified.
**Rule**: All variants centralized in `/lib/motion.ts`. Zero inline animation values.

### DD-004 — MDX for Blog (Phase 2)
**Decision**: `next-mdx-remote` with Contentlayer-style file routing.
**Rationale**: Vitor writes articles. MDX = markdown with React components.
No CMS dependency in MVP. Add Sanity if team grows.

### DD-005 — Resend for email
**Decision**: Resend SDK for diagnostico form + newsletter.
**Rationale**: Best DX for Next.js + React Email. Free tier covers Phase 1.

### DD-006 — Copy from KB only
**Decision**: Claude Code must never invent copy. Source: `/docs/knowledge-base/copy.md`.
**Rationale**: Brand voice is precise (see brandbook). Wrong tone = brand dilution.

### DD-007 — SVG logo assets
**Date**: 2026-06-17
**Decision**: Use SVG assets from `/public/`. Navbar: `allia-symbol.svg` (32×32). Footer: `allia-logo-vertical.svg` (140×40).
**Rationale**: SVGs are now available and committed. Scale perfectly at all densities.
**Status**: Files present in `/public/`.

---

## 📊 Architecture Notes

**Motion pattern for sections (standard):**
```tsx
// Every section below the fold
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
>
```

**Server vs Client components:**
- Sections with animation → `'use client'`
- Static content sections → Server Component (default)
- Navbar → `'use client'` (scroll state)
- Footer → Server Component

**Environment variables needed:**
```
RESEND_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_WHATSAPP=
CALENDLY_URL=
```

---

## 🚀 Immediate Next Step
> **Session checkpoint (2026-06-17)**: Setup + design system + layout + Hero completos. Vercel conectada (`allialab.vercel.app`).
> **Antes de continuar**: verificar/commitar `components/sections/Pillars.tsx` e `components/ui/TrefoilLogo.tsx` (existem mas não commitados). Atualizar `Hero.tsx` para usar `/trefoil.svg` em vez de `/trefoil.png`.
> **Next**: Block 03 Services → `components/sections/Services.tsx` (5 cards, copy do KB).
> Seguir a ordem: Services → Method → CaseAnchor → Differentials → CTAFinal.
> **Pendente do usuário**: confirmar dados reais do case Madiã Transportes (números/resultados).
