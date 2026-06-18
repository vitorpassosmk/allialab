# Design System + Layout — ALLiA LAB
**Date**: 2026-06-16
**Session scope**: Phase 1 Foundation — Design System + Layout only
**Branch**: `feat/phase-1-foundation`
**Next sessions**: Hero section MVP → Homepage completa (7 blocos)

---

## Scope

Build the foundational layer that every future component depends on:

1. `app/globals.css` — design tokens via Tailwind v4 `@theme`
2. `lib/fonts.ts` — next/font declarations
3. `lib/motion.ts` — Framer Motion variants library
4. `components/ui/Button.tsx` — primary / secondary / ghost
5. `components/ui/Card.tsx` — surface card
6. `components/ui/Badge.tsx` — category labels
7. `components/layout/Navbar.tsx` — sticky blur, scroll-aware
8. `components/layout/Footer.tsx` — logo + tagline + links + social
9. `app/layout.tsx` — root layout wiring fonts + Navbar + Footer

**Out of scope this session**: Hero, homepage blocks, pages, SEO, GA4.

---

## Assets

| File | Usage |
|---|---|
| `public/trefoil.png` | Navbar symbol (32×32px) |
| `public/logo-full.png` | Footer logo (140px wide) |

Both PNGs have black backgrounds — work naturally on `slate-900` site background.

---

## Layer 1: Design Tokens (`app/globals.css`)

Approach: Tailwind v4 CSS-first via `@theme` block. All tokens become real Tailwind utility classes (`bg-steel-400`, `text-amber-400`, etc.). No `tailwind.config.js` needed.

```css
@import "tailwindcss";

@theme {
  --color-steel-400: #4D8FD6;
  --color-steel-500: #3570B5;
  --color-steel-600: #27568C;

  --color-amber-400: #FF6B2C;
  --color-amber-500: #E85419;

  --color-slate-50:  #EAF0FF;
  --color-slate-300: #8C98BC;
  --color-slate-600: #1C2138;
  --color-slate-700: #121831;
  --color-slate-800: #0C0F1C;
  --color-slate-900: #080A11;

  --color-green-success: #3DD68C;

  --font-display: var(--font-space-grotesk);
  --font-body:    var(--font-inter);
  --font-mono:    var(--font-geist-mono);
}

:root {
  --bg-page:       var(--color-slate-900);
  --bg-surface:    var(--color-slate-800);
  --border-subtle: var(--color-slate-600);
  --text-primary:  var(--color-slate-50);
  --text-muted:    var(--color-slate-300);
  --accent:        var(--color-steel-400);
  --cta:           var(--color-amber-400);
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
}
```

---

## Layer 2: Fonts (`lib/fonts.ts`)

Three fonts via `next/font/google`, exported as CSS variable objects.

- **Space Grotesk** → `--font-space-grotesk` → display headings
- **Inter** → `--font-inter` → body text
- **Geist Mono** → `--font-geist-mono` → labels, data, captions

`display: 'swap'` + `adjustFontFallback: false` on all three to prevent CLS.

Applied in `app/layout.tsx` via `className` on `<html>`:
```tsx
<html className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable}`}>
```

---

## Layer 3: Motion Variants (`lib/motion.ts`)

All animation values live here. Zero inline values in components (DD-003).

| Export | Purpose | Key values |
|---|---|---|
| `fadeUp` | Sections, headings entering | y: 24→0, opacity 0→1, 500ms |
| `fadeIn` | Subtle opacity reveals | opacity 0→1, 400ms |
| `scaleIn` | Cards, modals | scale 0.95→1, opacity 0→1, 400ms |
| `staggerContainer` | Parent wrapper for staggered children | staggerChildren: 0.1 |

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` on all variants (spring-like, brand-defined).

Standard section pattern (every below-fold section):
```tsx
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
>
```

---

## Layer 4: UI Atoms

### Button (`components/ui/Button.tsx`)

Server Component. Props: `variant`, `size`, `asChild`, `className`, all native button attrs.

| Variant | Style | Rule |
|---|---|---|
| `primary` | `bg-amber-400 text-slate-900 hover:bg-amber-500` | One per page, CTA only |
| `secondary` | `border border-steel-400 text-steel-400 hover:bg-steel-400/10` | Secondary actions |
| `ghost` | `text-slate-300 hover:text-slate-50` | Nav links, inline |

Sizes: `sm` (13px/h-8) · `md` (16px/h-10, default) · `lg` (18px/h-12).

`href` prop: when present, renders as `<a>` (or `<Link>` for internal routes); otherwise renders as `<button>`. No Radix dependency needed.

### Card (`components/ui/Card.tsx`)

Server Component. Base: `bg-slate-800 border border-slate-600 rounded-xl p-6`. Accepts `className` for overrides.

### Badge (`components/ui/Badge.tsx`)

Server Component. Two variants:
- `default`: `bg-slate-700 text-slate-300 text-xs font-mono px-2 py-0.5 rounded-full`
- `accent`: `bg-steel-600/30 text-steel-400`

---

## Layer 5: Navbar (`components/layout/Navbar.tsx`)

`'use client'` — scroll state required.

**Layout:**
```
[trefoil 32px] ALLiA LAB    Serviços · Cases · Sobre · Contato    [Diagnóstico gratuito]
```

**Scroll behavior:**
- At rest (scroll = 0): `bg-transparent border-transparent`
- Scrolled (> 10px): `bg-slate-900/80 backdrop-blur-md border-b border-slate-600/50`
- Transition: `transition-all duration-300`

**Left block**: `<Link href="/">` containing `next/image` trefoil (32×32) + "ALLiA LAB" in Space Grotesk weight-600 `text-slate-50`.

**Center**: ghost Button links — Serviços `/servicos` · Cases `/cases` · Sobre `/sobre` · Contato `/contato`.

**Right**: `<Button variant="primary" size="sm" href="/diagnostico">Diagnóstico gratuito</Button>`

**Mobile (< md breakpoint)**:
- Center links hidden
- Hamburger `Menu` icon (lucide) shown
- Tap opens full-width drawer with same links + CTA stacked
- Drawer closes on link click or outside tap

**Motion**: Navbar mounts with `fadeIn` (delay 0.2s) via Framer Motion. Does not block LCP.

---

## Layer 6: Footer (`components/layout/Footer.tsx`)

Server Component — no client state.

**Layout:**
```
[logo-full.png 140px wide]
Inteligência aliada. Impacto real.

Serviços          Empresa         Legal
Sites & Apps      Sobre           Privacidade
Automações        Cases           Termos
Agentes de IA     Diagnóstico
MicroSaaS         Contato
Marketing

────────────────────────────────────────
© 2026 ALLiA LAB · São José dos Campos, SP        [LinkedIn] [Instagram] [WhatsApp]
```

**Styles:**
- Container: `bg-slate-800 border-t border-slate-600`
- Logo: `next/image` width=140, height proportional (auto)
- Tagline: `text-slate-300 font-mono text-sm`
- Column headers: `text-slate-50 font-semibold text-sm`
- Links: `text-slate-300 hover:text-slate-50 text-sm transition-colors`
- Social icons: lucide `Linkedin`, `Instagram` + WhatsApp SVG inline
- Copyright: `text-slate-600 text-xs`

---

## Root Layout (`app/layout.tsx`)

Wires everything together:
- Applies font variables on `<html>`
- Sets `lang="pt-BR"`
- Renders `<Navbar />` above `{children}` and `<Footer />` below
- Metadata: title "ALLiA LAB — Inteligência Aliada. Impacto Real." per copy.md

---

## Implementation Order

0. Install deps: `npm install framer-motion lucide-react`
1. Save PNGs to `public/` (trefoil.png, logo-full.png)
2. `app/globals.css` — replace default content with tokens
3. `lib/fonts.ts` — font declarations
4. `lib/motion.ts` — variants
5. `components/ui/Button.tsx`
6. `components/ui/Card.tsx`
7. `components/ui/Badge.tsx`
8. `components/layout/Navbar.tsx`
9. `components/layout/Footer.tsx`
10. `app/layout.tsx` — wire fonts + Navbar + Footer
11. `app/page.tsx` — replace default content with placeholder (dark bg, centered "Em breve")
12. `npm run dev` — verify no errors
13. `npm run lint` — verify clean
14. Commit: `feat(foundation): design system, tokens, fonts, motion, Navbar, Footer`

---

## Constraints

- `prefers-reduced-motion`: all Framer Motion animations must respect it (handled by Framer automatically via `useReducedMotion`)
- No amber used decoratively — CTA only (brand rule #1)
- Copy: "ALLiA" always capital A,L,L + lowercase i + capital A — enforced in code strings
- No root config files modified (next.config.ts, tsconfig.json, package.json) unless required
