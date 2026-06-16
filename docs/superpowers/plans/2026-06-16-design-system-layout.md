# Design System + Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build lib/fonts, lib/motion, UI atoms (Button/Card/Badge), Navbar, Footer, and wire everything into the root layout — completing the Phase 1 design system foundation.

**Architecture:** Sequential build from lib/ utilities → UI atoms → layout components → root layout wiring. Each layer is independently verifiable via TypeScript compilation. Visual verification at the end via `npm run dev`.

**Tech Stack:** Next.js 15 App Router, Tailwind v4 (tokens already in globals.css), Framer Motion v11, Lucide React, next/font/google.

## Global Constraints

- Brand name in all strings: `ALLiA LAB` — capital A, L, L · lowercase i · capital A. Never "Allia", "ALLIA".
- Amber (`#FF6B2C`) = CTA only, never decorative. One primary Button per page.
- Zero inline animation values in components — all variants must come from `lib/motion.ts`.
- Do NOT modify `next.config.ts`, `tsconfig.json` (except `npm install` touching package.json).
- `app/globals.css` already has all tokens — do NOT touch it.
- `app/layout.tsx` already has metadata and font class wiring — only add Navbar + Footer.
- All copy must come verbatim from `docs/knowledge-base/copy.md`. Never invent copy.
- `prefers-reduced-motion`: Framer Motion handles this automatically — no extra code needed.

---

## File Map

| Status | File | Responsibility |
|--------|------|----------------|
| **Create** | `lib/fonts.ts` | next/font declarations — Space Grotesk, Inter, Geist Mono |
| **Create** | `lib/motion.ts` | Framer Motion variants — fadeUp, fadeIn, scaleIn, staggerContainer |
| **Create** | `components/ui/Button.tsx` | primary / secondary / ghost variants + href→Link rendering |
| **Create** | `components/ui/Card.tsx` | surface card — bg-slate-800, border-slate-600, rounded-xl |
| **Create** | `components/ui/Badge.tsx` | category labels — default and accent variants |
| **Create** | `components/layout/Navbar.tsx` | sticky blur, scroll-aware, trefoil + text, 4 nav links, mobile drawer |
| **Create** | `components/layout/Footer.tsx` | full logo, tagline, 3 link columns, social icons |
| **Modify** | `app/layout.tsx` | Add `<Navbar />` and `<Footer />` — metadata and fonts already set |
| **Replace** | `app/page.tsx` | Placeholder dark page (Hero goes here next session) |
| **Add** | `public/trefoil.png` | Trefoil symbol PNG (user saves manually) |
| **Add** | `public/logo-full.png` | Full logo PNG (user saves manually) |

---

### Task 1: Install dependencies + save PNG assets

**Files:**
- Modify: `package.json` (via npm install)
- Create: `public/trefoil.png` ← **user saves manually**
- Create: `public/logo-full.png` ← **user saves manually**

**Interfaces:**
- Produces: `framer-motion` and `lucide-react` available for import in all subsequent tasks

- [ ] **Step 1: Install framer-motion and lucide-react**

```bash
npm install framer-motion lucide-react
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Save PNG files to public/**

Save the two logo PNGs shared in the conversation to:
- `public/trefoil.png` — the trefoil symbol only (no text)
- `public/logo-full.png` — trefoil + ALLiA LAB text

Both files have black backgrounds, which blends into the dark site.

- [ ] **Step 3: Verify installation**

```bash
node -e "require('./node_modules/framer-motion/package.json'); require('./node_modules/lucide-react/package.json'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json public/trefoil.png public/logo-full.png
git commit -m "feat(deps): install framer-motion and lucide-react, add logo assets"
```

---

### Task 2: Font declarations (`lib/fonts.ts`)

**Files:**
- Create: `lib/fonts.ts`

**Interfaces:**
- Produces: `spaceGrotesk`, `inter`, `geistMono` — exported as `NextFontWithVariable` objects
- Consumed by: `app/layout.tsx` (already imports these exact names — do not rename)

- [ ] **Step 1: Create lib/fonts.ts**

```ts
import { Space_Grotesk, Inter, Geist_Mono } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  adjustFontFallback: false,
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  adjustFontFallback: false,
})
```

`adjustFontFallback: false` prevents CLS from fallback font metric adjustments. `display: 'swap'` ensures text is visible while fonts load.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (or only pre-existing errors unrelated to fonts.ts).

- [ ] **Step 3: Commit**

```bash
git add lib/fonts.ts
git commit -m "feat(fonts): add Space Grotesk, Inter, Geist Mono via next/font"
```

---

### Task 3: Motion variants (`lib/motion.ts`)

**Files:**
- Create: `lib/motion.ts`

**Interfaces:**
- Produces: `fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer` — all typed as `Variants` from framer-motion
- Consumed by: any `'use client'` component that animates

- [ ] **Step 1: Create lib/motion.ts**

```ts
import type { Variants } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

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

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors related to motion.ts.

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "feat(motion): add Framer Motion variants library"
```

---

### Task 4: Button component (`components/ui/Button.tsx`)

**Files:**
- Create: `components/ui/Button.tsx`

**Interfaces:**
- Produces: `Button` default export — props: `variant`, `size`, `href`, `className`, `children`, `onClick`, `type`, `disabled`
- Consumed by: Navbar, Footer, and all page sections

- [ ] **Step 1: Create components/ui/ directory and Button.tsx**

```tsx
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-amber-400 text-slate-900 font-semibold hover:bg-amber-500 active:bg-amber-600',
  secondary:
    'border border-steel-400 text-steel-400 hover:bg-steel-400/10 active:bg-steel-400/20',
  ghost: 'text-slate-300 hover:text-slate-50',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-lg transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat(ui): add Button component with primary/secondary/ghost variants"
```

---

### Task 5: Card and Badge components

**Files:**
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Badge.tsx`

**Interfaces:**
- Produces: `Card` — props: `className`, `children`
- Produces: `Badge` — props: `variant` (`'default' | 'accent'`), `className`, `children`
- Consumed by: Services, Pillars, Diferenciais sections (next sessions)

- [ ] **Step 1: Create components/ui/Card.tsx**

```tsx
interface CardProps {
  className?: string
  children: React.ReactNode
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div
      className={`bg-slate-800 border border-slate-600 rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create components/ui/Badge.tsx**

```tsx
interface BadgeProps {
  variant?: 'default' | 'accent'
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-slate-700 text-slate-300',
  accent: 'bg-steel-600/30 text-steel-400',
}

export default function Badge({
  variant = 'default',
  className = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/Card.tsx components/ui/Badge.tsx
git commit -m "feat(ui): add Card and Badge components"
```

---

### Task 6: Navbar (`components/layout/Navbar.tsx`)

**Files:**
- Create: `components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `Button` from `components/ui/Button`
- Produces: `Navbar` default export — no props, `'use client'`
- Consumed by: `app/layout.tsx`

- [ ] **Step 1: Create components/layout/ directory and Navbar.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Cases', href: '/cases' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-600/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/trefoil.png"
            alt="ALLiA LAB símbolo"
            width={32}
            height={32}
            priority
          />
          <span className="font-display font-semibold text-slate-50 text-base tracking-tight">
            ALLiA LAB
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-slate-50 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            href="/diagnostico"
            className="hidden md:inline-flex"
          >
            Diagnóstico gratuito
          </Button>
          <button
            className="md:hidden text-slate-300 hover:text-slate-50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-600/50 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-slate-50 text-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" size="md" href="/diagnostico">
            Diagnóstico gratuito
          </Button>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat(navbar): sticky blur navbar with scroll-aware bg and mobile drawer"
```

---

### Task 7: Footer (`components/layout/Footer.tsx`)

**Files:**
- Create: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `next/image`, `next/link`, `lucide-react`
- Produces: `Footer` default export — no props, Server Component
- Consumed by: `app/layout.tsx`

- [ ] **Step 1: Create components/layout/Footer.tsx**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Instagram } from 'lucide-react'

const services = [
  { label: 'Sites & Apps', href: '/servicos/sites-apps' },
  { label: 'Automações & IA', href: '/servicos/automacoes' },
  { label: 'Agentes de IA', href: '/servicos/agentes-ia' },
  { label: 'MicroSaaS', href: '/servicos/microsaas' },
  { label: 'Marketing Digital', href: '/servicos/marketing' },
]

const company = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Cases', href: '/cases' },
  { label: 'Diagnóstico', href: '/diagnostico' },
  { label: 'Contato', href: '/contato' },
]

const legal = [
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Termos', href: '/termos' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Image
              src="/logo-full.png"
              alt="ALLiA LAB"
              width={140}
              height={60}
              className="mb-4"
            />
            <p className="text-slate-300 font-mono text-sm leading-relaxed">
              Inteligência aliada. Impacto real.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-slate-50 font-semibold text-sm mb-4 uppercase tracking-widest">
              Serviços
            </h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-slate-50 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-slate-50 font-semibold text-sm mb-4 uppercase tracking-widest">
              Empresa
            </h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-slate-50 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-50 font-semibold text-sm mb-4 uppercase tracking-widest">
              Legal
            </h3>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-slate-50 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-600 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 ALLiA LAB · São José dos Campos, SP
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/company/allia-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-steel-400 transition-colors"
              aria-label="LinkedIn da ALLiA LAB"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://instagram.com/allia.lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-steel-400 transition-colors"
              aria-label="Instagram da ALLiA LAB"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/5512999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-steel-400 transition-colors"
              aria-label="WhatsApp da ALLiA LAB"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat(footer): add footer with logo, tagline, link columns, social icons"
```

---

### Task 8: Wire layout + placeholder page

**Files:**
- Modify: `app/layout.tsx` — add Navbar and Footer imports
- Replace: `app/page.tsx` — remove default Next.js content

**Interfaces:**
- Consumes: `Navbar` from `components/layout/Navbar`, `Footer` from `components/layout/Footer`

- [ ] **Step 1: Update app/layout.tsx to add Navbar and Footer**

Replace the file content with:

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { spaceGrotesk, inter, geistMono } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'ALLiA LAB — Inteligência Aliada. Impacto Real.',
    template: '%s | ALLiA LAB',
  },
  description:
    'Aliamos IA e estratégia humana para gerar crescimento real para PMEs. Sites, automações, agentes e MicroSaaS. São José dos Campos e todo o Brasil.',
  metadataBase: new URL('https://allialab.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ALLiA LAB',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Replace app/page.tsx with dark placeholder**

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

`pt-16` offsets the fixed Navbar height (h-16).

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat(layout): wire Navbar and Footer into root layout"
```

---

### Task 9: Final verification

**Files:** none — verification only

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no errors, no warnings (or only pre-existing ones not introduced by this work).

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:

1. Dark background (`#080A11`) fills the viewport
2. Navbar visible at top — trefoil 32px + "ALLiA LAB" text on left, 4 nav links center (desktop), amber "Diagnóstico gratuito" button right
3. Navbar is transparent at page top; scroll down → blur + border appears
4. Mobile (<768px): nav links hidden, hamburger icon appears; tap opens drawer with links + amber CTA
5. Footer visible at bottom: logo-full, tagline in mono, 3 link columns, social icons, copyright
6. No console errors in browser devtools

- [ ] **Step 3: Update TODO.md — mark completed tasks**

In `TODO.md`, mark these as `[x]`:
- `Configure Tailwind v4 CSS-first` (already done)
- `Add design tokens to app/globals.css`
- `Install deps: framer-motion lucide-react ...` (partial — remaining deps for Phase 1: react-hook-form zod @next/third-parties resend)
- `Configure next/font`
- `/lib/fonts.ts`
- `/lib/motion.ts`
- `/components/ui/Button.tsx`
- `/components/ui/Card.tsx`
- `/components/ui/Badge.tsx`
- `/components/layout/Navbar.tsx`
- `/components/layout/Footer.tsx`

Add a Decision Log entry:
```
### DD-007 — PNG logos with black background
**Date**: 2026-06-16
**Decision**: Use PNG files (trefoil.png, logo-full.png) directly — no SVG conversion.
**Rationale**: SVG not available; PNG black backgrounds are invisible on slate-900 site.
**Rule**: trefoil.png in Navbar (32px), logo-full.png in Footer (140px wide).
```

- [ ] **Step 4: Final commit**

```bash
git add TODO.md
git commit -m "chore(todo): mark Phase 1 design system tasks complete"
```

---

## Self-Review Checklist

- **Spec coverage**: globals.css tokens ✅ (already done — skipped) · fonts ✅ · motion ✅ · Button ✅ · Card ✅ · Badge ✅ · Navbar ✅ · Footer ✅ · layout wiring ✅ · placeholder page ✅
- **Placeholders**: WhatsApp number is `5512999999999` — placeholder to be replaced when real number is confirmed (see env var `NEXT_PUBLIC_WHATSAPP` in TODO.md). Social profile URLs are also placeholder — update before launch.
- **Type consistency**: `Button` props use `variant`, `size`, `href` throughout all tasks. `Card` uses `className` + `children`. `Badge` uses `variant` + `className` + `children`. All consistent.
- **Import paths**: All use `@/` alias (configured in tsconfig.json via create-next-app). ✅
- **`'use client'`**: Navbar has it (scroll state). Footer is Server Component (no directive). ✅
- **Amber rule**: Only used in Button `primary` variant. Navbar CTA uses `variant="primary"`. Footer has no amber. ✅
