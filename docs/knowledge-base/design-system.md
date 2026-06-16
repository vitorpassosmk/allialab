# ALLiA LAB — Design System Reference

## Color System

### Palette (Tailwind v4 — CSS custom properties)
```css
@theme {
  /* Aço / Steel — accent, links, data */
  --color-steel-50: #EAF2FB;
  --color-steel-100: #C6DEF4;
  --color-steel-200: #9FC5EA;
  --color-steel-300: #75AAE0;
  --color-steel-400: #4D8FD6;  /* ← primary accent */
  --color-steel-500: #3570B5;
  --color-steel-600: #27568C;
  --color-steel-700: #1A3D66;
  --color-steel-800: #0E2E5C;
  --color-steel-900: #08203F;

  /* Âmbar / Amber — CTA e ação EXCLUSIVAMENTE */
  --color-amber-50: #FFEDE3;
  --color-amber-100: #FFD2BB;
  --color-amber-200: #FFB590;
  --color-amber-300: #FF9059;
  --color-amber-400: #FF6B2C;  /* ← CTA bg */
  --color-amber-500: #E85419;  /* ← CTA hover */
  --color-amber-600: #BD4011;
  --color-amber-700: #8F2F0C;
  --color-amber-800: #5E1F07;
  --color-amber-900: #3A1304;

  /* Slate — fundos, superfícies, textos */
  --color-slate-50: #EAF0FF;   /* ← texto principal */
  --color-slate-100: #C4CCDE;
  --color-slate-200: #AEB9D0;
  --color-slate-300: #8C98BC;  /* ← texto secundário */
  --color-slate-400: #5A6480;
  --color-slate-500: #3A4264;
  --color-slate-600: #1C2138;  /* ← borda sutil */
  --color-slate-700: #121831;
  --color-slate-800: #0C0F1C;  /* ← superfície/card */
  --color-slate-900: #080A11;  /* ← bg da página */

  /* Sucesso */
  --color-green-success: #3DD68C;
}
```

### Semantic Tokens (Tailwind classes to use)
```
bg-slate-900        → página
bg-slate-800        → card / panel
bg-slate-700        → card hover
border-slate-600    → borda padrão
text-slate-50       → texto principal
text-slate-300      → texto secundário / muted
text-steel-400      → accent / link
bg-amber-400        → CTA button bg
hover:bg-amber-500  → CTA hover
text-green-success  → sucesso / confirmação
```

### Golden Rule — Amber
> Amber aparece **exclusivamente** em ações de conversão.
> Um CTA primário por tela (acima da dobra) + um CTA no final.
> Nunca: decoração, ícone, borda, tag, badge.

---

## Typography

### Font Loading (`/lib/fonts.ts`)
```ts
import { Space_Grotesk, Inter, Geist_Mono } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

### Scale (Tailwind classes)
```
text-7xl font-bold font-display    → Display XL (56px) — Hero headline
text-5xl font-bold font-display    → H1 (40px)
text-4xl font-bold font-display    → H2 (30px)
text-2xl font-semibold font-display → H3 (22px)
text-lg font-normal font-body      → Body L (18px)
text-base font-normal font-body    → Body (16px)
text-xs font-medium font-mono      → Caption (13px)
```

---

## Motion Library (`/lib/motion.ts`)

```ts
import type { Variants } from 'framer-motion'

// Spring easing — ALL animations use this
export const spring = { type: 'spring', stiffness: 100, damping: 20 }
export const ease = [0.16, 1, 0.3, 1] as const

// Section reveal
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

// Scale in (cards, badges)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
}

// Trefoil loop line draw (SVG)
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1,
    transition: { pathLength: { duration: 2, ease }, opacity: { duration: 0.3 } }
  },
}

// Standard viewport config
export const viewport = { once: true, margin: '-80px' }
```

---

## Component Specs

### Button
```tsx
// Primary — amber — ONE per page
<Button variant="primary">Diagnóstico gratuito</Button>
// → bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold
//   px-6 py-3 rounded-lg transition-colors

// Secondary — steel outline
<Button variant="secondary">Ver cases</Button>
// → border border-steel-400 text-steel-400 hover:bg-steel-400/10
//   px-6 py-3 rounded-lg transition-colors

// Ghost — inline/nav
<Button variant="ghost">Saiba mais →</Button>
// → text-slate-300 hover:text-slate-50 transition-colors
```

### Card
```tsx
// bg-slate-800 border border-slate-600 rounded-xl p-6
// hover:border-steel-400/50 hover:bg-slate-700 transition-all
```

### Navbar
```tsx
// sticky top-0 z-50
// backdrop-blur-md bg-slate-900/80 border-b border-slate-600
// Logo left | Nav center | CTA amber right
```

---

## Spacing & Layout
```
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section padding: py-20 lg:py-32
Gap between cards: gap-6
Border radius: rounded-lg (8px) buttons/inputs | rounded-xl (12px) cards
```

## Breakpoints
```
Mobile: < 640px (sm)
Tablet: 640–1024px (md/lg)
Desktop: > 1024px (xl)
Mobile-first approach mandatory
```

## Dark Mode
> Native dark mode. No light mode. No toggle.
> Background is ALWAYS slate-900. Never white.

---

## References (Visual Inspiration)
- **ateliware.com/pt-br**: Tech + human balance, dark mode, result-oriented
- **uds.com.br**: Authority, clear service hierarchy, social proof
- **vercel.com / linear.app / stripe.com**: Design maturity, minimal but premium
- **Key differentiator**: ALLiA is more personal/boutique than all of the above
