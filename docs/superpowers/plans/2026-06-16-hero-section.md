# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Homepage Block 01 — a full-viewport Hero section with split layout, staggered entrance animation, and PNG trefoil with radial glow.

**Architecture:** Single `'use client'` component at `components/sections/Hero.tsx`. All animation variants sourced from `lib/motion.ts` (one new export added). Wired into `app/page.tsx` replacing the current placeholder.

**Tech Stack:** Next.js 15 App Router, Framer Motion v11, Tailwind CSS v4, `next/image`, TypeScript strict.

## Global Constraints

- Copy is **verbatim** — never alter headline, sub, or CTA text (source: `docs/knowledge-base/copy.md`)
- Brand name always `ALLiA` — capital A,L,L + lowercase i + capital A
- Amber (`#FF6B2C`) is CTA-only — one primary CTA above fold
- All animation variants must live in `lib/motion.ts` — zero inline animation values in components
- `prefers-reduced-motion` must be respected via `useReducedMotion()`
- `next/image` for all images with descriptive `alt`
- Single `<h1>` per page
- Motion easing: `[0.16, 1, 0.3, 1]`, duration 300–500ms

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `lib/motion.ts` | Add `scaleInDelayed` variant (scaleIn + 0.3s delay) |
| Create | `components/sections/Hero.tsx` | Full Hero section component |
| Modify | `app/page.tsx` | Replace placeholder with `<Hero />` |

---

## Task 1: Add `scaleInDelayed` to motion.ts

**Files:**
- Modify: `lib/motion.ts`

**Interfaces:**
- Produces: `scaleInDelayed` — a `Variants` object identical to `scaleIn` but with `delay: 0.3` in its `visible` transition. Consumed by Hero's right-column `motion.div`.

> **Why not use `scaleIn` + a `transition` prop?** In Framer Motion, a `transition` prop on a `motion` element fully overrides the variant-level `transition`, dropping the `duration` and `ease` defined in `scaleIn.visible`. Adding `scaleInDelayed` to `motion.ts` keeps all values centralized and avoids this override footgun.

- [ ] **Step 1: Open `lib/motion.ts` and append `scaleInDelayed` after `scaleIn`**

The file currently ends at line 46 (`export const viewport = ...`). Add after `scaleIn` (after line 20):

```ts
export const scaleInDelayed: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease, delay: 0.3 } },
}
```

Full updated `lib/motion.ts`:

```ts
import type { Variants } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1] as const

export const spring = { type: 'spring', stiffness: 100, damping: 20 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
}

export const scaleInDelayed: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease, delay: 0.3 } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2, ease }, opacity: { duration: 0.3 } },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

export const viewport = { once: true, margin: '-80px' }
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see "ease is not assignable to EasingDefinition" — `ease` is typed as `const` tuple which Framer Motion accepts; this is a known false positive in some TS configs, ignore if the app runs.

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "feat(motion): add scaleInDelayed variant for Hero trefoil"
```

---

## Task 2: Create Hero component

**Files:**
- Create: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes:
  - `fadeUp`, `scaleInDelayed`, `staggerContainer` from `lib/motion.ts`
  - `Button` from `components/ui/Button` — accepts `variant: 'primary' | 'secondary'`, `size: 'lg'`, `href: string`
  - `next/image` `Image` component
  - `useReducedMotion` from `framer-motion`
- Produces: `export default function Hero()` — React component, no props

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { fadeUp, scaleInDelayed, staggerContainer } from '@/lib/motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section className="min-h-screen flex items-center pt-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[55fr_45fr] gap-12 items-center py-20">

        {/* Left column — text */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl lg:text-6xl font-bold text-slate-50 leading-tight"
          >
            A IA não vai te substituir.{' '}
            <span className="text-steel-400">Nós vamos te multiplicar.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-slate-300 max-w-lg mt-6"
          >
            Aliamos estratégia humana e inteligência artificial para gerar
            crescimento real — sem jargão, sem promessa vazia.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Button variant="primary" size="lg" href="/diagnostico">
              Diagnóstico gratuito
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              Ver cases
            </Button>
          </motion.div>
        </motion.div>

        {/* Right column — trefoil */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={scaleInDelayed}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div
            className="absolute w-[480px] h-[480px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(39,86,140,0.25) 0%, transparent 70%)',
            }}
          />
          <Image
            src="/trefoil.png"
            alt="ALLiA LAB — três loops: Humano · IA · Sistemas"
            width={320}
            height={320}
            priority
            className="relative z-10"
          />
        </motion.div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run lint to catch type errors**

```bash
npm run lint
```

Expected: no errors or warnings. Common issues to watch:
- `'motion' is defined but never used` — won't happen; `motion` is used as JSX namespace
- `Image` missing `alt` — already set

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(homepage): add Hero section component"
```

---

## Task 3: Wire Hero into page.tsx and verify

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Hero` default export from `components/sections/Hero`
- Produces: Updated `app/page.tsx` that renders `<Hero />` as the first block

- [ ] **Step 1: Replace `app/page.tsx`**

Current content (placeholder):
```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-slate-600 font-mono text-sm">
        ALLiA LAB · Em construção.
      </p>
    </div>
  )
}
```

New content:
```tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Blocks 02–07: Pillars, Services, Method, Case, Diferenciais, CTA Final */}
    </main>
  )
}
```

- [ ] **Step 2: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:

| Check | Expected |
|---|---|
| Headline renders | "A IA não vai te substituir. Nós vamos te multiplicar." — second sentence in `steel-400` blue |
| Subtext renders | "Aliamos estratégia humana e inteligência artificial..." in `slate-300` |
| Primary CTA | Orange/amber button "Diagnóstico gratuito" — links to `/diagnostico` |
| Secondary CTA | Steel-border button "Ver cases" — links to `/cases` |
| Trefoil | Visible on desktop (≥ 1024px), hidden on mobile |
| Glow | Subtle steel blue radial behind trefoil |
| Animation | Elements fade up in sequence on page load |
| Mobile (< 1024px) | Single column, text centered, no trefoil |
| Reduced motion | Toggle OS setting → elements appear instantly without animation |

> **Note on trefoil.png**: If `/public/trefoil.png` does not exist yet, the `<Image>` will 404. The page still renders correctly — only the trefoil slot will be broken. Per DD-007, this file must be saved manually by the user. No code change needed.

- [ ] **Step 3: Run production build to catch any SSR issues**

```bash
npm run build
```

Expected: Build completes with no errors. A warning about `useReducedMotion` being client-only is safe to ignore if present.

- [ ] **Step 4: Update TODO.md — mark Hero as complete**

In `TODO.md`, change:
```
- [ ] **01 Hero** → headline + sub + amber CTA + trefoil motion
```
to:
```
- [x] **01 Hero** → headline + sub + amber CTA + trefoil motion
```

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx docs/TODO.md
git commit -m "feat(homepage): wire Hero into root page, mark TODO complete"
```

---

## Self-Review

**Spec coverage:**
- ✅ Split layout 55/45 — `grid lg:grid-cols-[55fr_45fr]`
- ✅ Text left + trefoil right — confirmed in column structure
- ✅ PNG trefoil with `scaleInDelayed` — Task 2
- ✅ Radial gradient glow — inline style with `rgba(39,86,140,0.25)`
- ✅ Stagger parallel (option A) — `staggerContainer` wraps h1, p, CTAs
- ✅ Mobile: 1 column, centered, trefoil hidden — `hidden lg:flex` + `lg:items-start lg:text-left`
- ✅ `useReducedMotion()` — `initial` set to `'visible'` when true
- ✅ Copy verbatim — headline, sub, both CTAs match `copy.md` exactly
- ✅ Single h1 — only one `<h1>` in the component
- ✅ `priority` on Image — above fold, correct
- ✅ No inline animation values — `scaleInDelayed` in `motion.ts`

**Placeholder scan:** None found.

**Type consistency:**
- `scaleInDelayed` defined in Task 1, consumed in Task 2 — names match exactly.
- `Button` props `variant`, `size`, `href` match the existing component signature.
- `staggerContainer`, `fadeUp` imported names match `motion.ts` exports.
