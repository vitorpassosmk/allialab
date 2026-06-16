# Hero Section — Design Spec
**Date**: 2026-06-16
**Phase**: Phase 1 — Foundation
**Block**: Homepage Block 01

---

## Summary

Full-viewport Hero section for the ALLiA LAB homepage. Split layout (text left, trefoil right) with staggered `fadeUp` entrance animation. PNG trefoil with radial steel glow. Mobile collapses to single centered column with trefoil hidden.

---

## Copy (verbatim from `/docs/knowledge-base/copy.md`)

| Element | Content |
|---|---|
| Headline | A IA não vai te substituir. Nós vamos te multiplicar. |
| Sub | Aliamos estratégia humana e inteligência artificial para gerar crescimento real — sem jargão, sem promessa vazia. |
| CTA primário | Diagnóstico gratuito → `/diagnostico` |
| CTA secundário | Ver cases → `/cases` |

---

## Component

**File**: `components/sections/Hero.tsx`
**Directive**: `'use client'` (Framer Motion)
**No sub-components** — everything inline for MVP.

---

## Layout

```
<section>
  min-h-screen · flex items-center · pt-16 (navbar clearance) · bg-slate-900

  <div>
    max-w-7xl · mx-auto · px-6
    grid lg:grid-cols-[55fr_45fr] · gap-12 · items-center

    [Left column — text]
    <motion.div staggerContainer>
      <motion.h1 fadeUp>   Display XL · Space Grotesk 700 · text-slate-50
      <motion.p  fadeUp>   Body L · Inter 400 · text-slate-300 · mt-6
      <motion.div fadeUp>  flex gap-4 · mt-10
        Button primary lg  "Diagnóstico gratuito" → /diagnostico
        Button secondary lg "Ver cases"            → /cases

    [Right column — visual]
    <motion.div scaleIn delay:0.3>
      relative · hidden lg:flex · items-center · justify-center

      <div>  absolute · w-[480px] h-[480px] · rounded-full
             style={{ background: 'radial-gradient(circle, rgba(39,86,140,0.25) 0%, transparent 70%)' }}
             (inline style — Tailwind v4 arbitrary gradients with opacity are verbose)

      <Image src="/trefoil.png" width=320 height=320 priority
             alt="ALLiA LAB — três loops: Humano · IA · Sistemas"
             className="relative z-10"
```

---

## Animation

**Coreografia** (stagger paralelo — opção A):

```
staggerContainer: delayChildren 0.1s · staggerChildren 0.12s
  h1    → fadeUp  (t ≈ 0.10s)
  p     → fadeUp  (t ≈ 0.22s)
  CTAs  → fadeUp  (t ≈ 0.34s)

Right column (independent):
  motion.div → scaleIn · delay: 0.3s
```

All variants sourced from `/lib/motion.ts`. Zero new animation values inline.

**Reduced motion**: `useReducedMotion()` from Framer Motion. When `true`, set `initial` equal to `animate` on all motion elements (no opacity/transform transitions).

---

## Responsiveness

| Breakpoint | Behavior |
|---|---|
| `< lg` (< 1024px) | 1 column · text centered (`text-center`, `items-center`) · trefoil hidden (`hidden`) |
| `lg+` (≥ 1024px) | 2 columns 55/45 · text left-aligned · trefoil visible |

Trefoil hidden on mobile to guarantee CTA stays above the fold.

---

## Typography

| Element | Class |
|---|---|
| h1 | `font-display text-5xl lg:text-6xl font-bold text-slate-50 leading-tight` |
| p  | `font-body text-lg text-slate-300 max-w-lg` |

---

## Accessibility

- Single `<h1>` on the page (confirmed — `app/page.tsx` has no other h1).
- Image `alt` describes the trefoil meaning, not just "logo".
- Both buttons have explicit visible text — no extra `aria-label` needed.
- `useReducedMotion()` disables all motion for users who prefer it.

---

## Integration in `app/page.tsx`

Replace the current placeholder with:

```tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Blocks 02–07 follow */}
    </main>
  )
}
```

---

## Out of Scope (MVP)

- Scroll indicator / chevron arrow
- Video background or Lottie trefoil animation
- Word-by-word headline animation
- Animated gradient mesh background
