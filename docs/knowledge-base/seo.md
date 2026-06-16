# ALLiA LAB — SEO Strategy

## Technical SEO (Non-Negotiable — Phase 1)

### Every Page
- `<title>`: max 60 chars, keyword first
- `<meta name="description">`: 150–160 chars, action-oriented
- `<h1>`: exactly one per page
- `<h2>`/`<h3>`: logical hierarchy
- `next/image`: all images, WebP format, meaningful alt text
- Internal links: anchor text = target keywords

### App Router Implementation
```ts
// /app/layout.tsx — root metadata
export const metadata: Metadata = {
  title: { default: 'ALLiA LAB', template: '%s | ALLiA LAB' },
  description: 'Aliamos IA e estratégia humana...',
  metadataBase: new URL('https://allialab.com.br'),
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'ALLiA LAB' },
}

// /app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://allialab.com.br', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://allialab.com.br/servicos', priority: 0.9 },
    // ...
  ]
}

// /app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://allialab.com.br/sitemap.xml' }
}
```

### Schema.org
```tsx
// Root layout — Organization
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ALLiA LAB',
  description: 'Aliança boutique entre estratégia humana e IA',
  url: 'https://allialab.com.br',
  logo: 'https://allialab.com.br/logo.svg',
  address: { '@type': 'PostalAddress', addressLocality: 'São José dos Campos', addressRegion: 'SP', addressCountry: 'BR' },
  sameAs: ['https://linkedin.com/company/allia-lab'],
}

// /diagnostico — FAQ Schema
// /blog/[slug] — Article Schema
// /cases/[slug] — CreativeWork Schema
```

## Keyword Strategy

### Pillar 1 — Transformação Digital PME
**Primary**: transformação digital PME, digitalização de empresa
**Long-tail**: como digitalizar pequena empresa, ROI transformação digital, tecnologia para PME
**Content**: Por que 70% das PMEs falham | ROI de automatizar | Checklist de maturidade digital

### Pillar 2 — Aliança Humano + IA
**Primary**: IA para empresas, agentes de IA, automação com IA
**Long-tail**: IA sem substituir pessoas, como usar IA nos negócios, agentes IA para empresas
**Content**: IA vai substituir equipe? | O que são agentes de IA | Como usar IA sem perder o humano

### Pillar 3 — Automação de Processos
**Primary**: automação de processos empresariais, n8n brasil, integração de sistemas
**Long-tail**: automação para PME, n8n vs zapier vs make, quanto economiza automatizando
**Content**: N8N vs Zapier 2026 | 5 processos para automatizar | ROI da automação

### Pillar 4 — MicroSaaS
**Primary**: microsaas brasil, produto digital SaaS
**Long-tail**: como criar microsaas, stack microsaas 2026, produto digital recorrente
**Content**: O que é MicroSaaS | Da ideia ao produto | Stack ideal MicroSaaS 2026

## Local SEO (São José dos Campos + Brasil)
- Mention "São José dos Campos" + "Brasil" in homepage footer/about
- Google Business Profile (Phase 2)
- City-specific landing pages if needed (Phase 3)

## Content Calendar (Phase 2 — 4 articles/month)
```
Month 1:
  W1: Por que 70% das PMEs falham na transformação digital
  W2: IA vai substituir minha equipe? A resposta honesta
  W3: N8N vs Zapier vs Make: comparativo 2026
  W4: O que é MicroSaaS e por que é a oportunidade tech-BR

Month 2:
  W1: Quanto custa não automatizar? (ROI calculator embedded)
  W2: O que são agentes de IA e quando fazem sentido
  W3: 5 processos que toda PME deveria automatizar hoje
  W4: Stack ideal para MicroSaaS em 2026
```

## Performance SEO (Core Web Vitals)
- LCP < 2.5s: above-fold images preloaded, fonts `display:swap`
- CLS < 0.1: explicit dimensions on all images/videos
- INP < 200ms: minimize hydration, defer non-critical JS
- Use `next/image` with `priority` prop for hero image
- Font preloading in `<head>` for Space Grotesk

## Link Building Strategy (Phase 2)
- LinkedIn articles linking to blog posts
- Guest posts on tech/PME BR publications
- Case study syndication (Madiã Transportes)
- Newsletter subscribers → email link juice
