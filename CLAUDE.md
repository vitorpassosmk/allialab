# ALLiA LAB — Website Project
> **START EVERY SESSION**: Read `TODO.md` to locate current phase and pending tasks.

## Operational Rules (ALWAYS FOLLOW)

**TODO.md — mandatory updates**
- After completing any task: mark it `[x]` in TODO.md immediately
- After any architectural decision: add entry to Decision Log with date + rationale
- At session start: read TODO.md to locate current phase before touching any file
- At session end: update status of every task touched during the session

**File safety — zero destructive actions**
- NEVER delete, overwrite, or truncate CLAUDE.md, TODO.md, or any file in /docs/knowledge-base/
- NEVER modify root config files (next.config.ts, tsconfig.json, package.json) without explicit instruction
- NEVER edit CLAUDE.md itself unless explicitly instructed. If a change to CLAUDE.md seems necessary, STOP and ask the user first.
- NEVER run `rm`, `rmdir`, or destructive git commands (reset --hard, clean -fd) without explicit confirmation
- When refactoring: create the new version first, confirm it works, then remove the old one
- When in doubt about a destructive action: STOP and ask

**File hygiene — keep files current**
- Remove completed setup steps from TODO.md once the phase is fully done (keep Decision Log)
- Update CLAUDE.md if a stack decision changes (e.g. library swap) — edit the relevant line, do not add duplicate entries
- If a KB file in /docs/knowledge-base/ contains outdated info, flag it with a comment `<!-- OUTDATED: reason -->` and ask before rewriting
- Never add noise to CLAUDE.md: every line must earn its context budget

## Commands
```bash
npm run dev          # localhost:3000
npm run build        # production build
npm run lint         # eslint + tsc
npm run analyze      # bundle analyzer (@next/bundle-analyzer)
npx lighthouse http://localhost:3000 --output json
```

## Stack
- **Framework**: Next.js 15 (App Router) + TypeScript strict
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Animation**: Framer Motion v11 (motion-first design)
- **Font loading**: `next/font` — Space Grotesk (display), Inter (body), Geist Mono (data)
- **Icons**: lucide-react
- **Forms**: react-hook-form + zod
- **Email**: Resend SDK
- **Analytics**: GA4 via `@next/third-parties/google`
- **Deploy**: Vercel (auto from main branch)

## File Structure
```
/app
  layout.tsx              # Root layout: fonts, metadata, GA4
  page.tsx                # Homepage (7 blocks)
  /sobre/page.tsx
  /servicos/page.tsx      # + /[slug]/page.tsx
  /cases/page.tsx         # + /[slug]/page.tsx
  /diagnostico/page.tsx   # Lead magnet
  /contato/page.tsx
  /blog/page.tsx          # + /[slug]/page.tsx (Phase 2)
/components
  /ui                     # Atomic: Button, Card, Badge, Input
  /sections               # Composed: Hero, Pillars, Services, Method, CaseBand, CTA
  /layout                 # Navbar, Footer
/lib
  fonts.ts                # next/font declarations
  motion.ts               # Framer Motion variants library
  seo.ts                  # generateMetadata helpers
/docs
  knowledge-base/         # Brand KB — read before writing any copy
  TODO.md                 # Lives here in /docs, symlinked to root
```

## Design Tokens (Tailwind config — exact values)
```js
steel:  { 400:'#4D8FD6', 500:'#3570B5', 600:'#27568C' }
amber:  { 400:'#FF6B2C', 500:'#E85419' }           // ← CTA only
slate:  { 50:'#EAF0FF', 300:'#8C98BC', 600:'#1C2138',
          700:'#121831', 800:'#0C0F1C', 900:'#080A11' }
green:  { success: '#3DD68C' }
```
**Semantic mapping:**
| Token | Value | Use |
|---|---|---|
| bg-page | slate-900 | Page background |
| bg-surface | slate-800 | Cards, panels |
| border-subtle | slate-600 | All borders |
| text-primary | slate-50 | Body text |
| text-muted | slate-300 | Secondary text |
| accent | steel-400 | Links, icons |
| cta | amber-400 | CTA buttons ONLY |

## Typography Scale
```
Display XL: 56/64px 700 Space Grotesk  → Hero headline
H1:         40/48px 700 Space Grotesk  → Page titles
H2:         30/38px 700 Space Grotesk  → Sections
H3:         22/30px 600 Space Grotesk  → Subsections
Body L:     18/28px 400 Inter          → Lead text
Body:       16/26px 400 Inter          → Default
Caption:    13/18px 500 Geist Mono     → Labels, data
```

## Brand Rules (NON-NEGOTIABLE)
1. **Amber = CTA only.** Never decorative. One CTA per page above fold.
2. **Brand name**: Always `ALLiA` (capital A,L,L + lowercase i + capital A). Never "Allia", "ALLIA".
3. **Tagline**: "Inteligência aliada. Impacto real." — footer + under logo.
4. **Hero headline**: "A IA não vai te substituir. Nós vamos te multiplicar."
5. **Voice**: Confiante, direto, resultado > processo. No jargão ("soluções inovadoras").
6. **We sell outcomes, never deliverables.** Sites → presença. Automação → sua equipe livre.
7. **Motion**: `cubic-bezier(0.16,1,0.3,1)`, 300-500ms. Respect `prefers-reduced-motion`.
8. **Trefoil**: Three interlocked loops = Human + IA + Sistemas. Use as visual motif.

## Component Conventions
```tsx
// All section components accept className prop
interface SectionProps { className?: string; children?: React.ReactNode }

// Framer Motion: always use variants from /lib/motion.ts
// Never inline animation values in components

// Buttons: variant prop = 'primary' | 'secondary' | 'ghost'
// primary → amber-400 bg (one per page)
// secondary → steel border
// ghost → no bg, inline nav

// Cards: bg-slate-800, border border-slate-600, rounded-xl p-6
```

## SEO Requirements (Every Page)
- Unique `<title>` and `<meta description>` via `generateMetadata()`
- One `<h1>` per page
- `Schema.org`: Organization (homepage), Article (blog), FAQ (diagnostico, faq)
- `next/image` for all images (WebP, proper alt)
- `sitemap.ts` + `robots.ts` at `/app`
- OG image via `opengraph-image.tsx`

## Performance Requirements
- Lighthouse ≥ 90 all categories (CI gate via Vercel)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- No layout shift from fonts (`display: swap` + size-adjust)
- Lazy-load sections below fold with `React.lazy` + Suspense

## Key Copy (use verbatim from KB)
- `/docs/knowledge-base/copy.md` — all headlines, CTAs, descriptions
- `/docs/knowledge-base/brand.md` — positioning, personas, values
- **Never invent copy.** If copy doesn't exist in KB, stop and ask.

## Git Convention
```
feat(homepage): add hero section with motion
fix(navbar): sticky blur on iOS Safari
perf(fonts): preload Space Grotesk subset
```
Branch: `feat/phase-1-foundation` → PR to `main` → auto-deploy Vercel
